// ModalNewColumnComponent.tsx
import React from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  HStack,
  Box,
} from '@chakra-ui/react'

interface ColorOption {
  value: string
}

interface ModalNewColumnComponentProps {
  isOpen: boolean
  onClose: () => void
  title: string
  handleTitleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  colors: ColorOption[]
  color: string
  selectColor: (color: string) => void
  createNewColumn: () => void
}

const ModalNewColumnComponent: React.FC<ModalNewColumnComponentProps> = ({
  isOpen,
  onClose,
  title,
  handleTitleChange,
  colors,
  color,
  selectColor,
  createNewColumn,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Adicionar coluna</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <p className="pb-1 font-medium">Título:</p>
          <Input
            value={title}
            onChange={handleTitleChange}
            placeholder="Digite o título da coluna"
            size="md"
          />
          <p className="pb-1 pt-4 font-medium">Cor:</p>
          <HStack spacing={2}>
            {colors.map((colorOption) => (
              <Box
                key={colorOption.value}
                backgroundColor={colorOption.value}
                borderRadius="full"
                p={3}
                borderWidth={color === colorOption.value ? 2 : 1}
                borderColor={
                  color === colorOption.value ? '#323232' : 'gray.200'
                }
                onClick={() => selectColor(colorOption.value)}
              ></Box>
            ))}
          </HStack>
        </ModalBody>
        <ModalFooter>
          <Button
            borderColor="#323232"
            variant="outline"
            mr={3}
            onClick={createNewColumn}
          >
            Adicionar
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ModalNewColumnComponent
