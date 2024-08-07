'use-client'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { IoMenu } from 'react-icons/io5'
import {
  MdOutlinePendingActions,
  MdAccountTree,
  MdBugReport,
} from 'react-icons/md'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Kanban',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#FFFFFF]`}>
        <Providers>
          <div className="flex w-fit flex-col bg-[#323232] bg-fixed bg-no-repeat">
            <div className="w-screen">
              <div className="flex h-fit flex-row justify-between bg-[#323232] bg-cover bg-fixed bg-no-repeat px-20 max-md:px-2">
                <div className="flex flex-row items-center gap-6 py-4 text-xl text-white">
                  <IoMenu size={36} color="#FFFFFF" />
                  <p className="font-medium">Tasks</p>
                </div>
                <div className="flex flex-row items-center gap-6 pr-10 max-md:pr-0">
                  <MdOutlinePendingActions size={36} color="#FFFFFF" />
                  <MdAccountTree size={36} color="#FFFFFF" />
                  <MdBugReport size={36} color="#FFFFFF" />
                </div>
              </div>
            </div>
            {children}
          </div>
        </Providers>
      </body>
    </html>
  )
}
