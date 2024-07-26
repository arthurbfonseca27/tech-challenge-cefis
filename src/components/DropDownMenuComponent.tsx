import { Option } from '@/types'
import { Tag, TagLabel } from '@chakra-ui/react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { FaChevronDown, FaCheck } from 'react-icons/fa'
import PriorityComponent from './PriorityComponent'

interface DropDownMenuComponentProps {
  options?: Option[]
  label?: string
  placeholder?: string
  selected: Option | null
  onSelectedChanges: (option: Option) => void
}

const DropDownMenuComponent = ({
  options,
  label,
  selected,
  onSelectedChanges,
  placeholder,
}: DropDownMenuComponentProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const ref = useRef<HTMLDivElement | null>(null)

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    },
    [ref],
  )

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [handleClickOutside])

  const toggleDropdown = () => {
    setIsOpen((prevState) => !prevState)
  }

  return (
    <div ref={ref}>
      <div className="w-64">
        {label && (
          <label className="block items-center text-left text-sm font-medium text-gray-900">
            {label}
          </label>
        )}
        <div className="relative w-full">
          <button
            onClick={toggleDropdown}
            className="mt-1 flex cursor-pointer items-center bg-white px-3 py-2 text-left text-sm transition duration-500 ease-in-out focus:outline-none"
          >
            <div className="flex w-full items-center justify-between">
              {selected ? (
                <div className="flex items-center gap-x-2">
                  {selected.priority ? (
                    <Tag borderRadius="full" bgColor="#F5F5F5">
                      <PriorityComponent
                        horizontal={true}
                        priority={selected.priority}
                      />
                      <div className="px-1"></div>
                      <TagLabel>{selected.title}</TagLabel>
                    </Tag>
                  ) : (
                    <div className="flex flex-col">
                      <Tag borderRadius="full" bgColor={selected.color}>
                        <TagLabel>{selected.title}</TagLabel>
                      </Tag>
                    </div>
                  )}
                </div>
              ) : (
                <span className="block truncate font-normal text-gray-400">
                  {placeholder}
                </span>
              )}
              <div className="pl-2">
                <FaChevronDown size={12} color="#BEBEBE" />
              </div>
            </div>
          </button>
          {isOpen && (
            <ul className="focus::outline-none absolute z-10 mt-1 h-[100px] w-full min-w-[100px] max-w-[220px] overflow-y-auto rounded-md bg-white py-1 text-sm shadow-lg ring-black ring-opacity-5">
              {options?.map((option) => (
                <li
                  onClick={() => {
                    onSelectedChanges(option)
                    setIsOpen(false)
                  }}
                  key={option.id}
                  className={`${
                    selected?.id === option.id && 'bg-slate-100'
                  } relative flex cursor-pointer select-none items-center justify-between px-3 py-2 text-gray-900 transition-all hover:bg-slate-50`}
                >
                  <div className="flex items-center gap-x-2">
                    {option.priority ? (
                      <Tag borderRadius="full" bgColor="#F5F5F5">
                        <PriorityComponent
                          horizontal={true}
                          priority={option.priority}
                        />
                        <div className="px-1"></div>
                        <TagLabel>{option.title}</TagLabel>
                      </Tag>
                    ) : (
                      <div className="flex flex-col">
                        <Tag borderRadius="full" bgColor={option.color}>
                          <TagLabel>{option.title}</TagLabel>
                        </Tag>
                      </div>
                    )}
                  </div>
                  {selected?.id === option.id && (
                    <FaCheck size={12} color="#BEBEBE" />
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

export default DropDownMenuComponent
