## Next.js `use bash`
Use Bash right inside of your Next.js project. 
Just like `use server` (not really).

You can use it in React Server Components just like this: 

```javascript
return (
  <button
    formAction={async () => {
      'use bash'
      echo "Hello from Bash"
    }}>
    Say hello
  </button>
)
```

And if you want to it can even work with React Client Components
```javascript
// actions.js
'use server'

export async function bashHelloWorld() {
  'use bash'
  echo "Hello from Bash"
}
```

```javascript
// page.tsx
import { bashHelloWorld } from "../actions";
```

## Build 
You can build the implementation by

```bash
npm run build
npm start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Credits
This is heavily ~copied~ insipired by `nextjs use bash`:

* https://github.com/bufferhead-code/nextjs-use-bash


## Disclaimer
Do not use it in production. We are all here for the memes.
