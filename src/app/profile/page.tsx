"use client"
import React from 'react'
import { Header } from '@/components/Header'
import { motion } from 'framer-motion'
import { Trophy, Heart, Zap, Calendar, Copy, PenLine } from 'lucide-react'

const page = () => {
  return (
    <div className='min-h-screen bg-grey-50 transition-colors'>
      
      <Header />

      <main className='container mx-auto px-4 py-8 max-w-6xl'>
        <div className='grid grid-cols-1 lg:grid-cols-4 gap-8'>
          {/**Sidebar profile detail */}
          <motion.div
            initial={{opacity: 0, y: -20}}
            animate={{opacity: 1, y: 0}}
            className='bg-white rounded-xl p-6 border border-gray-200 shadow-sm'
          >
            <div className='text-center mb-6'>
              <img />
              <h1 className='text-xl font-bold text-gray-900 mb-2'>
                username
              </h1>
              <div className='flex items-center justify-center space-x-2 test-sm text-gray-500 mb-4'>
                <span> wallet address</span>
                <button
                  onClick={() => console.log('Test!!!!')}
                  className='p-1 hover:bg-gray-100 rounded transition-colors'
                >
                  <Copy className='h-3 w-3'/>
                </button>
              </div>
              <p className='text-gray-600 text-sm leading-relaxed'>
                User bio
              </p>
            </div>

            <div className='space-y-3 text-sm'>
              <div className='flex items-center space-x-3 text-gray-600'>
                <Calendar className='h-4 w-4'/>
                <span>Joined dd/year</span>
              </div>
              <div className='flex items-center space-x-3 text-gray-600'>
                <Trophy className='h-4 w-4'/>
                <span>3 content created</span>
              </div>
              <div className='flex items-center space-x-3 text-gray-600'>
                <Heart className='h-4 w-4'/>
                <span>Total votes</span>
              </div>
              <div className='flex items-center space-x-3 text-gray-600'>
                <Zap className='h-4 w-4'/>
                <span>Tips Recieved</span>
              </div>
            </div>

            <div className='mt-6 pt-6 border-t border-gray-200'>
              <div className='space-y-3'>
                <button
                  onClick={() => console.log("working")} 
                  className='w-full flex items-center justify center space-x-2 bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600 transition-colors'
                >
                  <PenLine className="h-4 w-4"/>
                  <span>Edit Profile</span>
                </button>
                
              </div>
            </div>

          </motion.div>
        </div>
      </main>
    </div>
  )
}

export default page