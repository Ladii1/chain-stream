"use client"
import React, { useState } from 'react'
import { Header } from '@/components/Header'
import { Plus, Sparkles, Zap } from 'lucide-react';
import {motion} from "framer-motion"
import { CreateContent } from '@/components/CreateContent';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';


const page = () => {
  const [isCreating, setIsCreating] = useState(false);
  const router = useRouter();

  const handleCreateContent = async (contentData:any) => {
    setIsCreating(true);

    try {
      await new Promise (resolve => setTimeout(resolve, 2000));

      toast.success('Conted created successfully!')
      //Redirects to home after successful creation
      setTimeout(() => {
        router.push('/');
      },1000);
    } catch (error) {
      toast.error('Failed to creat content');
    } finally {
      setIsCreating(false)
    }
  };

  return (
    <div className='min-h-screen '>
      <Header />
      <main className='container mx-auto px-4 py-8 max-w-4xl'>
        
          <motion.div
            initial={{opacity:0, y:20}}
            animate={{opacity:1, y:0}}
            className='text-center mb-8'
          >
            <div className='flex items-center justify-center mb-4'>
              <div className='bg-gradient-to-r from-purple-500 to-blue-500 rounded-full p-3'>
                <Plus className='h-8 w-8 text-white'/>
              </div> 
            </div>
            <h1 className='font-bold text-3xl text-gray-900 mb-4'>Create New Content</h1>
            <p className='text-gray-600 text-lg max-w-2xl mx-auto'>
              Share your creativity with the world and mint it as an NFT on the blockchain
            </p>
          </motion.div>

          {/**Benefit */}
          <motion.div
            initial={{opacity:0, y:20}}
            animate={{opacity:1, y:0}}
            transition={{delay:0.2}}
            className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'
          >
            <div className='bg-blue-200 border border-gray-200 rounded-xl shadow-sm p-6 text-center '>
              <Sparkles className='h-8 w-8 text-purple-500 mx-auto mb-3' />
              <h3 className='font-semibold text-gray-900 mb-2'> Mint as NFT</h3>
              <p className='text-sm text-gray-600'>
                Your content is automatically minted as an NFT, proving ownership and authenticity
              </p>
            </div>
            <div className='bg-blue-200 border border-gray-200 rounded-xl shadow-sm p-6 text-center '>
              <Zap className='h-8 w-8 text-blue-500 mx-auto mb-3'/>
              <h3 className='font-semibold text-gray-900 mb-2'> Earn Tokens</h3>
              <p className='text-sm text-gray-600'>
                Receive CST tokens for creating content and engaging with the community
              </p>
            </div>
            <div className='bg-blue-200 border border-gray-200 rounded-xl shadow-sm p-6 text-center '>
              <Plus className='h-8 w-8 text-green-500 mx-auto mb-3'/>
              <h3 className='font-semibold text-gray-900 mb-2'>Get Tips</h3>
              <p className='text-sm text-gray-600'>Receive tips from other users who appreciate your content</p>
            </div>
          </motion.div>

          {/**Content form */}
          <motion.div
           initial = {{opacity: 0, y: 20}}
           animate = {{opacity: 1, y: 0}}
           transition={{delay: 0.3}}
          >
            <CreateContent onSubmit={handleCreateContent}/>
          </motion.div>

          {/**Tips for success */}
          <motion.div
            initial={{opacity: 0, y: 20}}
            animate={{opacity:1, y:0}}
            transition={{delay: 0.3}}
            className='mt-2 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 mt-8'
          >
            <h3 className='font-semibold text-gray-900 mb-4 '>💡 Tips for Success</h3>
            <ul className='text-gray-900 space-y-2 text-sm '>
              <li>• Use engaging titles that clearly describe your content</li>
              <li>• Add relevant tags to help others discover your work</li>
              <li>• High-quality images and videos perform better</li>
              <li>• Engage with the community to build your following</li>
              <li>• Original contents get more upvotes and tips</li>
            </ul>
          </motion.div>
        
      </main>

    </div>
  )
}

export default page