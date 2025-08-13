import React from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit'

export const Header = () => {
  return (
    <header className="sticky w-full top-0 border-b bg-black/80 backdrop-blur-md">
        <div className='container mx-auto px-4 py-3 max-w-7xl'>
            <div className='flex item-center justify-between'>
                <span>Name</span>
                <span>Home</span>
                <span>Explore</span>
                <span>Create</span>
                <span>Profile</span>
                <span>toggle</span>
                <ConnectButton />
            </div>
        </div>
    </header>
    
  )
}
