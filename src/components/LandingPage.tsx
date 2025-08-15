"use client";

import React from 'react'
import {motion} from 'framer-motion'
import { Trophy } from 'lucide-react';
import { Users, Zap, Plus } from 'lucide-react';
import { TokenBalance } from "@/components/TokenBalance";


export const LandingPage = () => {
  return (
    <main className='container mx-auto px-4 py-4 sm:py-8 max-w-7xl'>
      <div className='text-center mb-8 sm:mb-12'>
        <motion.h1
          initial = {{opacity: 0, y: 20}}
          animate = {{opacity: 1, y: 0}}
          className='text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4'
        >
          Welcome to{' '}
            <span className='bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent'>
              Chainstream
            </span>
        </motion.h1>

        <motion.p
          initial = {{opacity: 0, y: 20}}
          animate = {{opacity: 1, y: 0}}
          transition={{ delay: 0.2 }}
          className='text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 px-4'
        >
          Share content, earn tokens, and build your webs identity
        </motion.p>

        {/**Stats */}
        <motion.div
          initial = {{opacity: 0, y: 20}}
          animate = {{opacity: 1, y: 0}}
          transition={{ delay: 0.3 }}
          className='grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12'
        >
          <div className='bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-lg border border-gray-200 dark:border-gray-700'>
            <div className='flex items-center justify-center mb-3'>
              <Users className='h-8 w-8 text-purple-500'/>
            </div>
            <h3 className='text-xl sm:text-2xl font-bold text-gray-900 dark:text-white'>12,534</h3>
            <p className='text-gray-600 dark:text-gray-300 text-sm sm:text-base'>Active Creators</p>
          </div>

          <div className='bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-lg border border-grey-200 dark:border-gray-700'>
            <div className='flex item-center justify-center mb-3'>
              <Trophy className='h-8 w-8 text-purple-500'/>
            </div>
            <h3 className='text-xl sm:text-2xl font-bold text-gray-900 dark:text-white'>89,231</h3>
            <p className='text-gray-600 dark:text-gray-300 text-sm sm:text-base'>NFTs Minted</p>
          </div>

          <div className='bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-lg border border-grey-200 dark:border-gray-700'>
            <div className='flex item-center justify-center mb-3'>
              <Zap className='h-8 w-8 text-purple-500'/>
            </div>
            <h3 className='text-xl sm:text-2xl font-bold text-gray-900 dark:text-white'>2.4M</h3>
            <p className='text-gray-600 dark:text-gray-300 text-sm sm:text-base'>Tokens Earned</p>
          </div>
        </motion.div>   
      </div>

      {/**Sidebar */}
      <div className='grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8'>
        <div className='lg:col-span-1 space-y-4 sm:space-y-6'>
          <TokenBalance />

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={ () => alert('Connect Wallet') }
            className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-2 sm:py-3 px-4 rounded-xl font-medium hover:from-purple-600 hover:to-blue-600 transition-all flex items-center justify-center space-x-2 text-sm sm:text-base"
          >
            <Plus className="h-5 w-5" />
            <span>Create Content</span>
          </motion.button>
        </div>
      </div>

    </main>
  )
}
