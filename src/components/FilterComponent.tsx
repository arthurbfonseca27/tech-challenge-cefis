// Components used for filter the available data
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
    <div className="flex w-96 flex-col items-start truncate outline-none max-md:w-72 max-md:flex-col max-md:justify-start max-md:justify-center">
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
          <div className="flex max-w-fit flex-row items-center justify-start truncate">
            {getButtonLabel()}
          </div>
        </MenuButton>
        <MenuList minWidth="240px" zIndex="20" _active={{ bg: '#FFFFFF' }}>
          <MenuOptionGroup
            type="checkbox"
            onChange={handleChange}
            value={selectedValues}
          >
            <MenuItemOption key="all" value="all" _active={{ bg: '#FFFFFF' }}>
              Todos
            </MenuItemOption>
            {options.map((option, index) => (
              <MenuItemOption
                key={index}
                value={option.value}
                _active={{ bg: '#FFFFFF' }}
              >
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
