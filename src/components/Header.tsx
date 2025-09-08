"use client"

import React from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { House, Search, User,Plus, Coins } from 'lucide-react';
import Link from 'next/link';
import {MobileMenu} from "./MobileMenu"
import { useAccount } from 'wagmi';
import { ThemeToggle } from './ThemeToggle';

export const Header = () => {
  const {address} = useAccount();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80  backdrop-blur-md border-gray-200 dark:border-gray-800">
        <div className='container mx-auto px-4 py-3 max-w-7xl'>
            <div className='flex item-center justify-between'>
                <Link href="/" className="flex items-center space-x-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-blue-600">
                    <Coins className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    ChainStream
                  </span>
                </Link>

                <nav className='hidden md:flex item-center space-x-6'>
                  <Link href="/" className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                    <House className='w-4 h-4' />
                    <span>Home</span>
                  </Link>
                  <Link href="/explore" className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                    <Search className='w-4 h-4'/>
                    <span>Explore</span>
                  </Link>
                  {address && (
                    <>
                      <Link href="/create" className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                        <Plus className='w-4 h-4'/>
                        <span>Create</span>
                      </Link>
                      <Link href="/profile" className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                        <User className='w-4 h-4'/>
                        <span>Profile</span>
                      </Link>
                    </>
                  )}
                </nav>

                <div className='flex items-center space-x-4'>
                  <div className="hidden md:block">
                    <ThemeToggle />
                  </div>
                  <MobileMenu />
                  <div className='hidden md:block'>
                    <ConnectButton />
                  </div>
                </div>
            </div>
        </div>
    </header>
  )
}
