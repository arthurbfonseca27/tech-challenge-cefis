// app/providers.tsx
'use client'

import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { modalAnatomy as parts } from '@chakra-ui/anatomy'
import {
  createMultiStyleConfigHelpers,
  defineStyle,
} from '@chakra-ui/styled-system'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys)

const xl = defineStyle({
  width: '50vw', // Increase width
  maxWidth: 'none', // Remove maximum width restriction
  maxHeight: 'fit', // Remove maximum height restriction
  px: '2',
  py: '2',
  fontSize: 'xl',
})

const sm = defineStyle({
  fontSize: 'sm',
  py: '6',
})

const sizes = {
  xl: definePartsStyle({ header: sm, dialog: xl }),
}

export const modalTheme = defineMultiStyleConfig({
  sizes,
})

const theme = extendTheme({
  components: {
    Modal: modalTheme,
  },
})

export function Providers({ children }: { children: React.ReactNode }) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>
}
