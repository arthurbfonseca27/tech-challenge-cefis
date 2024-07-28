import {
  Menu,
  MenuButton,
  MenuList,
  MenuItemOption,
  MenuOptionGroup,
  Button,
  Box,
} from '@chakra-ui/react'
import { FaChevronDown } from 'react-icons/fa'
import React, { useState } from 'react'

interface SelectOption {
  label: string
  value: string
}

interface SelectComponentProps {
  title: string
  options: SelectOption[]
  onChange?: (values: string[]) => void
}

const SelectComponent: React.FC<SelectComponentProps> = ({
  title,
  options,
  onChange,
}) => {
  const [selectedValues, setSelectedValues] = useState<string[]>([])

  const handleChange = (values: string | string[]) => {
    if (Array.isArray(values)) {
      if (values.includes('all')) {
        if (selectedValues.length === options.length) {
          // Unselect all
          setSelectedValues([])
          onChange?.([])
        } else {
          // Select all items
          const allValues = options.map((option) => option.value)
          setSelectedValues(allValues)
          onChange?.(allValues)
        }
      } else {
        // Select specific items
        setSelectedValues(values)
        onChange?.(values)
      }
    }
  }

  const getButtonLabel = () => {
    if (
      selectedValues.length === options.length ||
      selectedValues.length === 0
    ) {
      return 'Todos'
    }
    return options
      .filter((option) => selectedValues.includes(option.value))
      .map((option) => option.label)
      .join(', ')
  }

  return (
    <div className="flex w-full flex-col items-start outline-none max-md:flex-col max-sm:w-full max-sm:justify-start max-sm:justify-center">
      <Box
        position="relative"
        top="2.5"
        left="4"
        px="1.5"
        zIndex="10"
        bg="#FFFFFF"
      >
        <p className="items-start text-sm">{title}</p>
      </Box>
      <Menu closeOnSelect={false}>
        <MenuButton
          as={Button}
          rightIcon={<FaChevronDown size={12} color="#67676733" />}
          variant="outline"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          fontSize="16px"
          fontWeight="normal"
          width="100%"
          size="lg"
          _hover={{ bg: '#FFFFFF' }}
          _active={{ bg: '#FFFFFF' }}
        >
          <div className="flex flex-row items-center justify-start truncate">
            {getButtonLabel()}
          </div>
        </MenuButton>
        <MenuList minWidth="240px">
          <MenuOptionGroup
            type="checkbox"
            onChange={handleChange}
            value={selectedValues}
          >
            <MenuItemOption key="all" value="all">
              Todos
            </MenuItemOption>
            {options.map((option, index) => (
              <MenuItemOption key={index} value={option.value}>
                {option.label}
              </MenuItemOption>
            ))}
          </MenuOptionGroup>
        </MenuList>
      </Menu>
    </div>
  )
}

export default SelectComponent
