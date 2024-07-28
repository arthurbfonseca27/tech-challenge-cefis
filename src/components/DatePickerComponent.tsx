import React from 'react'
import DatePicker, { registerLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { Input } from '@chakra-ui/react'
import { useTaskStore } from '../store/tasks/index'
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from 'react-icons/md'
import { ptBR } from 'date-fns/locale'

registerLocale('pt-BR', ptBR)

const years = Array.from({ length: 101 }, (_, i) => i + 2000)
const months = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
]

const DatePickerComponent: React.FC = () => {
  const { dateTask, setDateTask } = useTaskStore()

  const handleDateChange = (date: Date | null) => {
    setDateTask(date)
  }

  return (
    <div>
      <div>
        <DatePicker
          selected={dateTask}
          onChange={handleDateChange}
          placeholderText="Selecione a data"
          locale="pt-BR"
          renderCustomHeader={({
            date,
            changeYear,
            changeMonth,
            decreaseMonth,
            increaseMonth,
            prevMonthButtonDisabled,
            nextMonthButtonDisabled,
          }) => (
            <div className="m-2 flex justify-center gap-2">
              <button
                onClick={decreaseMonth}
                disabled={prevMonthButtonDisabled}
              >
                <MdKeyboardArrowLeft />
              </button>
              <select
                className="rounded border"
                value={date.getFullYear()}
                onChange={({ target: { value } }) =>
                  changeYear(parseInt(value))
                }
              >
                {years.map((option: number) => (
                  <option
                    className="rounded border"
                    key={option}
                    value={option}
                  >
                    {option}
                  </option>
                ))}
              </select>

              <select
                className="rounded border"
                value={months[date.getMonth()]}
                onChange={({ target: { value } }) =>
                  changeMonth(months.indexOf(value))
                }
              >
                {months.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>

              <button
                onClick={increaseMonth}
                disabled={nextMonthButtonDisabled}
              >
                <MdKeyboardArrowRight />
              </button>
            </div>
          )}
          dateFormat="dd/MM/yyyy"
          customInput={
            <Input
              width="fit"
              border="0px"
              placeholder="Selecione uma data"
              borderColor="#a3aab5"
              focusBorderColor="#a3aab5"
              borderRadius="4px"
              size="sm"
            />
          }
        />
      </div>
    </div>
  )
}

export default DatePickerComponent
