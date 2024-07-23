import { Box, Select } from '@chakra-ui/react'

interface SelectComponentProps {
  title: string
  options: string[]
}

const SelectComponent: React.FC<SelectComponentProps> = ({
  title,
  options,
}) => {
  return (
    <div className="flex w-9/12 flex-col items-start">
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
      <Select placeholder="Todos" size="lg" borderRadius="lg">
        {options.map((option, index) => (
          <option value="option1" key={index}>
            {option}
          </option>
        ))}
      </Select>
    </div>
  )
}

export default SelectComponent
