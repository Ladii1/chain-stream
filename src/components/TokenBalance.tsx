"use client"
import React from 'react'
import { useEffect, useState } from 'react'
import {motion} from 'framer-motion'
import { Coins } from 'lucide-react';
import { TrendingUp } from 'lucide-react';


export const TokenBalance = () => {
    const [balance, setBalance] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = setTimeout(() => {
            setBalance(1234.56);
            setIsLoading(false);
        }, 2000);
        
        return () => clearTimeout(fetchData);
    }, []);

  return (
    <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className='bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl p-4 sm:p-6 shadow-lg'
    >
        <div className='flex items-center justify-between'>
            <div>
                <p className='text-purple-100 text-xs sm:text-sm font-medium'>Your Balance</p>
                <div className='flex items-center space-x-2 mt-1'>
                    <Coins className='w-5 h-5 sm:h-6 sm:w-6' />
                    <span className='text-lg sm:text-2xl font-bold'>
                        {isLoading ? '...' : balance} CST
                    </span>
                </div>

                <div className='hidden sm:block text-right '>
                    <div className='flex items-center space-x-1 text-green-300'>
                        <TrendingUp className='w-4 h-4 sm:w-5 sm:h-5' />
                        <span className='text-xs sm:text-sm'>+12.5% </span>
                    </div>
                    <p className='text-xs text-purple-100 mt-1'>Last 24 hours</p>
                </div>
                <div className="sm:hidden">
                    <div className="flex items-center space-x-1 text-green-200">
                        <TrendingUp className="h-3 w-3" />
                        <span className="text-xs">+12.5%</span>
                    </div>
                </div>

            </div>
        </div>
    </motion.div>
  )
}
