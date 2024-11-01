import { ReactNode } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons'

export default function SortButton({
  value,
  handleToggle,
  children,
}: {
  value: string
  handleToggle: () => void
  children: ReactNode
}) {
  return (
    <button
      onClick={handleToggle}
      className="flex items-center gap-2 text-gray-400"
    >
      <div className="flex flex-col items-center">
        <FontAwesomeIcon
          icon={faCaretUp}
          className={`mb-[-0.25rem] text-base ${value === 'asc' ? 'text-black' : 'text-gray-300'}`}
          style={{ fontSize: '1rem' }}
        />
        <FontAwesomeIcon
          icon={faCaretDown}
          className={`mt-[-0.25rem] text-base ${value === 'desc' ? 'text-black' : 'text-gray-300'}`}
        />
      </div>
      {children}
    </button>
  )
}
