import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { IoIosSearch } from 'react-icons/io'
import React from 'react'
import SelectComponent from '@/components/SelectComponent'

const SearchComponent = () => {
  return (
    <div className="flex w-screen flex-row">
      <div className="flex w-[80%] flex-row items-center justify-center gap-x-4 pb-6 outline-none">
        <div className="w-4/12 pt-5">
          <InputGroup size="lg" bg="#F5F5F5" borderRadius="lg">
            <InputLeftElement pointerEvents="none">
              <IoIosSearch color="#000000" size={24} />
            </InputLeftElement>
            <Input
              placeholder="Id, título ou descrição"
              pl="12"
              fontSize="16px"
              borderColor="#67676766"
            />
          </InputGroup>
        </div>
        <SelectComponent
          title="Executante"
          options={['Lucas Pereira', 'Carla Souza', 'Felipe Lima']}
        />
        <SelectComponent
          title="Solicitante"
          options={['Alice Johnson', 'Bob Smith', 'Ethan Hunt']}
        />
        <SelectComponent
          title="Projetos"
          options={['CEFIS', 'NinePay', 'Kanban Board']}
        />
        <SelectComponent
          title="Tipo"
          options={['Não iniciada', 'Iniciada', 'Concluída']}
        />
      </div>
    </div>
  )
}

export default SearchComponent
