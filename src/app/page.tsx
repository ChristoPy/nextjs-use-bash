import UseBashClientComponent from "./components/UseBashClientComponent";

export default function Home() {
  return (
    <main className="min-h-screen p-24 bg-white">
      <form>
        <button
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          formAction={async () => {
            'use bash'
            echo "Hello from Bash!"
          }}>
          Run Form Action
        </button>
      </form>

      <UseBashClientComponent />
    </main>
  )
}
