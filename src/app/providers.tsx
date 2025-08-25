"use client"

import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'
import {type ReactNode} from "react"
import { WagmiProvider } from 'wagmi'
import { ThemeProvider } from 'next-themes';
import config from "@/lib/rainbowKitConfig"
import '@rainbow-me/rainbowkit/styles.css';

export const Providers = (props:{children: ReactNode}) => {
    const [queryClient] = useState (()=> new QueryClient())

  return (
    <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <RainbowKitProvider>
              {props.children}
            </RainbowKitProvider>
          </ThemeProvider>
        </QueryClientProvider>
    </WagmiProvider>
  )
}

