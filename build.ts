const fs = require('node:fs')
const path = require('node:path')
const fse = require('fs-extra')
const cp = require("child_process")

function copyCurrentDirectoryToDist(filePath: string) {
  fse.copySync(filePath, filePath + '.original')

  const content = fse.readFileSync(filePath, "utf8")
  const isServerActionFile = content.startsWith('\'use server\'')

  const splits = content.split(/'use bash'/)
  let result = splits[0]
  for (let i = 1; i < splits.length; i++) {
    const endOfBashCode = findClosingBrace(splits[i])
    const bashCode = splits[i].slice(0, endOfBashCode)
    if (!isServerActionFile) {
      result += `"use server"\n`
    }

    // this works but, what what cost?
    result += `return require('child_process').execSync(\`${bashCode}\`).toString()`
    result += splits[i].slice(endOfBashCode, splits[i].length)
  }
  fse.writeFileSync(filePath, result, "utf8")
}

function findClosingBrace(string: String) {
  let codeBlocksCounter = 0
  let characterCounter = 0
  while (characterCounter < string.length) {
    const ch = string[characterCounter]
    if (ch === "{") codeBlocksCounter++
    else if (ch === "}") codeBlocksCounter--
    if (codeBlocksCounter == -1) return characterCounter
    characterCounter++
  }
  return null
}

function resetToOriginalState(filePath: string) {
  const path = require('node:path')
  const fse = require('fs-extra')
  const finalFileName = filePath.replace('.original', '')
  fse.removeSync(finalFileName)
  fse.moveSync(filePath, finalFileName)
}

function build() {
  fromDir(path.join(__dirname, 'src'), '.js', copyCurrentDirectoryToDist)
  fromDir(path.join(__dirname, 'src'), '.tsx', copyCurrentDirectoryToDist)

  try {
    const output = cp.spawnSync('next', ['build'])
    console.log(output.stdout.toString())
  } catch (e) {
    console.log(e)
  } finally {
    console.log('cleanup')
    fromDir(path.join(__dirname, 'src'), '.js.original', resetToOriginalState)
    fromDir(path.join(__dirname, 'src'), '.tsx.original', resetToOriginalState)
  }
}

function fromDir(startPath: any, filter: any, callback: any) {
  if (!fs.existsSync(startPath)) {
    console.log("no dir ", startPath)
    return
  }

  const files = fs.readdirSync(startPath)
  for (let i = 0; i < files.length; i++) {
    const filename = path.join(startPath, files[i])
    const stat = fs.lstatSync(filename)
    if (stat.isDirectory() && filename.startsWith('node_modules') === false && filename.startsWith('.next') === false) {
      fromDir(filename, filter, callback) //recurse
    } else if (filename.endsWith(filter)) {
      callback(filename)
    }
  }
}

build()
