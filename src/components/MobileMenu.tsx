"use client"

import React from 'react'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link';
import { Menu, X, House, Search, User, Plus, Moon, Sun } from 'lucide-react';
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { motion, AnimatePresence } from 'framer-motion'
import { useAccount } from 'wagmi';
import { useTheme } from 'next-themes';

export const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false)
  const MenuRef = useRef<HTMLDivElement>(null);
  const { address } = useAccount();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (MenuRef.current && !MenuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isOpen]);
  const menuItems = [
    { href: '/', icon: House, label: 'Home' },
    { href: '/explore', icon: Search, label: 'Explore' },
    ...(address ? [
      { href: '/create', icon: Plus, label: 'Create' },
      { href: '#', icon: User, label: 'Profile' },
    ] : []),
  ];

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

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
            className="md:hidden absolute overflow-hidden border border-gray-200 dark:border-gray-800 rounded-xl shadow-lg top-16 mt-2 w-64 right-2 z-50 bg-white/95 dark:bg-black/95 backdrop-blur"
            ref={MenuRef}
          >
            {/* Navigation Items */}
            <div className='py-2'>
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
            </div>
            
            <div className='border-t border-gray-200 dark:border-gray-800'></div>

            {/* wallet and theme Section */}
              <div className="py-2">
                {/* Theme Toggle */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: menuItems.length * 0.05 }}
                >
                  <button
                    onClick={toggleTheme}
                    className="flex items-center space-x-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors w-full"
                  >
                    {mounted && theme === 'dark' ? (
                      <Sun className="h-4 w-4 text-yellow-500" />
                    ) : (
                      <Moon className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                    )}
                    <span className="font-medium">
                      {mounted && theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                    </span>
                  </button>
                </motion.div>

                {/* Connect Wallet */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (menuItems.length + 1) * 0.05 }}
                  className="px-4 py-3"
                >
                  <div className="w-full">
                    <ConnectButton.Custom>
                      {({
                        account,
                        chain,
                        openAccountModal,
                        openChainModal,
                        openConnectModal,
                        authenticationStatus,
                        mounted: rainbowMounted,
                      }) => {
                        const ready = rainbowMounted && authenticationStatus !== 'loading';
                        const connected =
                          ready &&
                          account &&
                          chain &&
                          (!authenticationStatus ||
                            authenticationStatus === 'authenticated');

                        return (
                          <div
                            {...(!ready && {
                              'aria-hidden': true,
                              'style': {
                                opacity: 0,
                                pointerEvents: 'none',
                                userSelect: 'none',
                              },
                            })}
                          >
                            {(() => {
                              if (!connected) {
                                return (
                                  <button
                                    onClick={() => {
                                      openConnectModal();
                                      setIsOpen(false);
                                    }}
                                    className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-2.5 px-4 rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all font-medium text-sm"
                                  >
                                    Connect Wallet
                                  </button>
                                );
                              }

                              if (chain.unsupported) {
                                return (
                                  <button
                                    onClick={() => {
                                      openChainModal();
                                      setIsOpen(false);
                                    }}
                                    className="w-full bg-red-500 text-white py-2.5 px-4 rounded-lg hover:bg-red-600 transition-colors font-medium text-sm"
                                  >
                                    Wrong network
                                  </button>
                                );
                              }

                              return (
                                <div className="space-y-2">
                                  <button
                                    onClick={() => {
                                      openChainModal();
                                      setIsOpen(false);
                                    }}
                                    className="w-full flex items-center justify-between p-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                                  >
                                    <div className="flex items-center space-x-2">
                                      {chain.hasIcon && (
                                        <div
                                          style={{
                                            background: chain.iconBackground,
                                            width: 16,
                                            height: 16,
                                            borderRadius: 999,
                                            overflow: 'hidden',
                                          }}
                                        >
                                          {chain.iconUrl && (
                                            <img
                                              alt={chain.name ?? 'Chain icon'}
                                              src={chain.iconUrl}
                                              style={{ width: 16, height: 16 }}
                                            />
                                          )}
                                        </div>
                                      )}
                                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        {chain.name}
                                      </span>
                                    </div>
                                  </button>

                                  <button
                                    onClick={() => {
                                      openAccountModal();
                                      setIsOpen(false);
                                    }}
                                    className="w-full flex items-center justify-between p-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                                  >
                                    <div className="flex items-center space-x-2">
                                      <div className="w-4 h-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
                                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        {account.displayName}
                                      </span>
                                    </div>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">
                                      {account.displayBalance
                                        ? ` (${account.displayBalance})`
                                        : ''}
                                    </span>
                                  </button>
                                </div>
                              );
                            })()}
                          </div>
                        );
                      }}
                    </ConnectButton.Custom>
                  </div>
                </motion.div>
              </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}