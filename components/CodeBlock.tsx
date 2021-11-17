import { ClipboardCopyIcon } from '@heroicons/react/outline'
import React, { ReactElement } from 'react'

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  > {
  children: string
}

export default function CodeBlock({ children }: Props): ReactElement {
  return (
    <div className="relative">
      <div className="overflow-x-auto pr-20">{children}</div>
      <button
        type="button"
        className="absolute top-0 right-0 inline-flex items-center px-2 py-1 border border-transparent shadow-sm text-xs leading-4 font-medium rounded-md text-white bg-dark-400 hover:bg-dark-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Copy
        <ClipboardCopyIcon
          className="ml-2 -mr-0.5 h-4 w-4"
          aria-hidden="true"
        />
      </button>
    </div>
  )
}
