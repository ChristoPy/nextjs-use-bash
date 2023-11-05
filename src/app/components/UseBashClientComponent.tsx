'use client'

import { useState } from "react";
import { bashHelloWorld } from "../actions";

export default function UseBashClientComponent() {
  const [output, setOutput] = useState('');

  async function onClick() {
    const out: string = await bashHelloWorld();
    setOutput(out);
  }

  return (
    <div>
      <div>
        <div className="mt-2">
          <textarea
            disabled
            rows={4}
            name="output"
            id="output"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            defaultValue={output}
          />
        </div>
      </div>
      <button
        type="button"
        onClick={onClick}
        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Execute Server Action
      </button>
    </div>
  )
}