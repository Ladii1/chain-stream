"use client"

import React from 'react'
import { useState, useRef } from 'react'
import Link from 'next/link';
import { Menu, X, House, Search, User, Plus } from 'lucide-react';
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { motion, AnimatePresence } from 'framer-motion'

export const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false)
  const MenuRef = useRef(null);

  const menuItems = [
    { href: '#', icon: House, label: 'Home' },
    { href: '#', icon: Search, label: 'Search' },
    { href: '#', icon: User, label: 'Profile' },
    { href: '#', icon: Plus, label: 'Create' },
  ]

  const menuVariants = {
    open: { opacity: 1, height: "auto", transition: { duration: 0.3 } },
    closed: { opacity: 0, height: 0, transition: { duration: 0.3 } },
  };

  const iconVariants = {
    open: { rotate: 90, scale: 1.2, transition: { duration: 0.3 } },
    closed: { rotate: 0, scale: 1, transition: { duration: 0.3 } },
  };

  return (
    <div className='md:hidden'>

     <motion.button
        onClick={() => setIsOpen(!isOpen)}
        variants={iconVariants}
        animate={isOpen ? "open" : "closed"}
        className="focus:outline-none"
      >
        {isOpen ? (
          <X className="h-5 w-5 text-gray-600 dark:text-gray-300" />
        ) : (
          <Menu className="h-5 w-5 text-gray-600 dark:text-gray-300" />
        )}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="md:hidden border-t overflow-hidden absolute top-16 left-0 right-0 z-30 bg-background/95 backdrop-blur"
            ref={MenuRef}
          >
            {menuItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className='flex items-center space-x-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors'
                >
                  <item.icon className='h-4 w-4' />
                  <span className='font-medium'>{item.label}</span>
                </Link>
              </motion.div>
            ))}

            <div className='border-t border-gray-200 dark:border-gray-800'></div>
            <div className='py-2'>
              <ConnectButton />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}