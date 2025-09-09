"use client"
import React, { useState } from 'react'
import { Header } from '@/components/Header'
import { motion } from 'framer-motion'
import { Content } from '@/types'
import { TokenBalance } from '@/components/TokenBalance'
import { Trophy, Heart, Zap, Calendar, Copy, PenLine } from 'lucide-react'
import { ContentCard } from '@/components/ContentCard'

const page = () => {

  const [userContents, setUserContents] = useState<Content[]>([]);

  const handleUpvote = (contentId: string) => {
    setUserContents(userContents.map(content =>
      content.id === contentId
        ? {...content, upvotes: content.upvotes +1 }
        : content
    ))
  }

  const handleTip = (contentId: string, amount: number) => {
    setUserContents(userContents.map(content =>
      content.id === contentId
        ? {...content, tips: content.tips + amount }
        : content
    ))
  }

  return (
    <div className='min-h-screen bg-gray-50 transition-colors'>
      
      <Header />

      <main className='container mx-auto px-4 py-8 max-w-6xl'>
        <div className='grid grid-cols-1 lg:grid-cols-4 gap-8'>
          {/**Sidebar profile detail */}
          <div className='lg:col-span-1 space-y-6'>
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
                    className='w-full flex items-center justify-center space-x-2 bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600 transition-colors'
                  >
                    <PenLine className="h-4 w-4"/>
                    <span>Edit Profile</span>
                  </button> 
                </div>
              </div>
            </motion.div>

            {/**Token Balance */}
            <TokenBalance />

            {/**Quick Stats */}
            <motion.div
              initial={{opacity: 0, y: -20}}
              animate={{opacity: 1, y: 0}}
              transition={{delay: 0.1}}
              className='bg-white rounded-xl p-6 shadow-sm border border-gray-200'
            >
              <h3 className='font-semibold text-gray-900 mb-4'>Quick Stats</h3>
              <div className='space-y-3'>
                <div className='flex justify-between items-center'>
                  <span className='text-gray-600 text-sm'>Articles</span>
                  <span className='font-medium text-gray-900 '>
                    {userContents.filter(c => c.contentType === 'article').length}
                  </span>
                </div>
                <div className='flex justify-between items-center'>
                  <span className='text-gray-600 text-sm'>Images</span>
                  <span className='font-medium text-gray-900 '>
                    {userContents.filter(c => c.contentType === 'image').length}
                  </span>
                </div>
                <div className='flex justify-between items-center'>
                  <span className='text-gray-600 text-sm'>Videos</span>
                  <span className='font-medium text-gray-900 '>
                    {userContents.filter(c => c.contentType === 'video').length}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        

          {/** The Content Feed */}
          <div className='lg:col-span-3'>
            <motion.div
              initial={{opacity: 0, y: 20}}
              animate={{opacity: 1, y: 0}}
              className='mb-6'
            >
              <h2 className='text-2xl font-bold text-gray-900 mb-2'>
                My Content
              </h2>
              <p className='text-gray-600'>
                All the content you've created and minted as NFTs
              </p>
            </motion.div>

            <div className='space-y-6'>
              {userContents.length > 0 ? (
                userContents.map((content, index) => (
                  <motion.div
                    key={content.id}
                    initial={{opacity:0,y:20}}
                    animate={{opacity:1,y:0}}
                    transition={{delay:0.1*index}}
                  >
                    <ContentCard
                     content={content}
                      onUpvote={handleUpvote}
                      onTip={handleTip}
                    />
                  </motion.div>
                ))
              ) : (
                <motion.div
                  initial={{opacity:0}}
                  animate={{opacity:1}}
                  className='text-center py-12 bg-white rounded-xl border border-gray-200'
                >
                  <Trophy className='h-16 w-16 text-gray-400 mx-auto mb-4'/>
                  <h3 className='text-lg font-medium text-gray-900 mb-2'>
                    No content yet
                  </h3>
                  <p className='text-gray-600 mb-6'>
                    Start creating content to build your Web3 Portfolio
                  </p>
                  <button className='bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-2 rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all'>
                    Create Your Fist Post
                  </button>
                </motion.div>
              )}
            </div>  
          </div>
        </div>
        
        {/**Edit Profil */}
        {/**Report Profil */}
        {/**Onboarding */}
      </main>
    </div>
  )
}

export default page