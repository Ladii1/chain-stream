"use client"

import React from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { House, Search, User,Plus } from 'lucide-react';
import Link from 'next/link';
import {MobileMenu} from "@/components/MobileMenu"

export const Header = () => {
  return (
    <header className="sticky w-full top-0 border-b bg-black/80 backdrop-blur-md">
        <div className='container mx-auto px-4 py-3 max-w-7xl'>
            <div className='flex item-center justify-between'>
                <Link href="#" className="flex items-center space-x-2">
                  <span>ChainStream</span>
                </Link>

                <nav className='hidden md:flex item-center space-x-6'>
                  
                </nav>
                <Link href="#" className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                  <House className='w-4 h-4' />
                  <span>Home</span>
                </Link>
                <Link href="#" className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                  <Search className='w-4 h-4'/>
                  <span>Explore</span>
                </Link>
                <Link href="#" className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                  <Plus className='w-4 h-4'/>
                  <span>Create</span>
                </Link>
                <Link href="#" className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                  <User className='w-4 h-4'/>
                  <span>Profile</span>
                </Link>

                <div className='flex items-center space-x-4'>
                  <Link href="#" className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                    <span> dark toggle</span>
                  </Link>
                  <div className='hidden md:block'>
                    <ConnectButton />
                  </div>
                  <MobileMenu/>
                </div>
                
            </div>
        </div>
    </header>
    
  )
}
