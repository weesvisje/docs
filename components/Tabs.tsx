import classNames from 'classnames'
import React, { useEffect, useState } from 'react'
import { DetailedHTMLProps, HTMLAttributes } from 'react'

interface TabProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  value: string
}

export function Tab(props: TabProps): React.ReactElement {
  return <div {...props}>{props.children}</div>
}

interface TabsProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  groupId?: string
  children: React.ReactElement<TabProps>[]
  labels?: { [key: string]: string }
}

export default function Tabs(props: TabsProps) {
  const childValues = React.Children.map(props.children, (child) => {
    return child.props.value
  })

  const [selectedValue, setSelectedValue] = useState<string | undefined>()

  useEffect(() => {
    const cachedGroupId = localStorage.getItem('groupId')
    if (cachedGroupId) {
      setSelectedValue(cachedGroupId)
    } else {
      setSelectedValue(childValues[0])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    localStorage.setItem('groupId', selectedValue)
  }, [selectedValue])

  const labels = props.labels || {}

  return (
    <div>
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
        <select
          id="tabs"
          name="tabs"
          className="block w-full focus:ring-primary-500 focus:border-primary-500 border-gray-300 rounded-md"
          defaultValue={childValues.find(() => selectedValue)}
        >
          {childValues.map((childValue) => (
            <option key={childValue}>{labels[childValue] || childValue}</option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <nav className="flex space-x-4" aria-label="Tabs">
          {childValues.map((childValue) => (
            <button
              onClick={() => {
                setSelectedValue(childValue)
              }}
              key={childValue}
              className={classNames(
                childValue === selectedValue
                  ? 'bg-primary-100 text-primary-700'
                  : 'text-gray-500 hover:text-gray-700',
                'px-3 py-2 font-medium text-sm rounded-md',
              )}
              aria-current={childValue === selectedValue ? 'page' : undefined}
            >
              {labels[childValue] || childValue}
            </button>
          ))}
        </nav>
      </div>
      {React.Children.map(props.children, (child) => {
        return (
          <div
            className={classNames(
              child.props.value === selectedValue ? 'block' : 'hidden',
            )}
          >
            {child}
          </div>
        )
      })}
    </div>
  )
}
