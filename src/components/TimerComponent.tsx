import React, { useState, useEffect } from 'react'
import {
  FaRegPlayCircle,
  FaRegPauseCircle,
  FaCheckCircle,
} from 'react-icons/fa'
import { Tag, TagLabel, TagLeftIcon, IconButton } from '@chakra-ui/react'

const TimerComponent = () => {
  const [time, setTime] = useState(0)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined

    if (isActive) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1)
      }, 1000)
    } else if (!isActive && time !== 0) {
      clearInterval(interval)
    }

    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [isActive, time])

  const toggle = () => {
    setIsActive(!isActive)
  }

  const reset = () => {
    setTime(0)
    setIsActive(false)
  }

  const hours = Math.floor(time / 3600)
  const minutes = Math.floor((time % 3600) / 60)
  const seconds = time % 60

  return (
    <div className="flex flex-row items-center justify-between gap-2">
      <div className="items-center text-sm font-semibold text-[#00000066]">
        {`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}
      </div>
      {isActive ? (
        <div className="flex flex-row items-center">
          <button onClick={toggle} className="flex flex-row items-center">
            <div className="flex flex-row items-center gap-2">
              <Tag
                variant="solid"
                bgColor="#E17222"
                borderRadius="full"
                size="md"
                border="0px"
                borderColor="transparent"
                color="#FFFFFF"
              >
                <TagLeftIcon as={FaRegPauseCircle} size="full" />
                <TagLabel color="#FFFFFF">Pausar</TagLabel>
              </Tag>
            </div>
          </button>
        </div>
      ) : (
        <IconButton
          onClick={toggle}
          bgColor="transparent"
          size="xs"
          _hover={{ bg: 'transparent' }}
          aria-label="Start timer"
          icon={<FaRegPlayCircle color="#394A5333" size="full" />}
        />
      )}
      {time !== 0 && (
        <div className="animate-fade-left animate-ease-in-out">
          <IconButton
            onClick={reset}
            bgColor="transparent"
            size="xs"
            py="0px"
            _hover={{ bg: 'transparent' }}
            aria-label="Reset timer"
            icon={<FaCheckCircle color="#00D964" size="full" />}
          />
        </div>
      )}
    </div>
  )
}

export default TimerComponent
