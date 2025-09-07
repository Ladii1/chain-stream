"use client"
import React, { useEffect, useState } from 'react'
import { Header } from '@/components/Header'
import {motion} from "framer-motion"
import { Search, Funnel, Clock, Heart, TrendingUp, Trophy  } from 'lucide-react';
import { Content } from '@/types';
import { ContentCard } from '@/components/ContentCard';

const page = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'trending' | 'recent' | 'popular'>('trending');
  const [contents, setContents] = useState<Content[]>([]);
  const [selectedTag, setSelectedTag] = useState<string>('');
  const [filteredContents, setFilteredContents] = useState<Content[]>([]);

  const popularTags = ['web3', 'blockchain', 'nft', 'defi', 'art', 'gaming', 'ai', 'crypto', 'metaverse', 'trading'];
  
  //Mock data for demonstration- replace with real data fetching ????
  const mockContents: Content[] = [
    {
      id: '1',
      title: 'The Future of Web3 Social Media',
      description: 'Exploring how blockchain technology is revolutionizing social interactions and content ownership.',
      contentType: 'article',
      contentUrl: 'https://example.com/article1',
      author: {
        id: '1',
        address: '0x742d35Cc6634C0532925a3b8D6AC8d2a46A6D6C6',
        username: 'web3_pioneer',
        bio: 'Building the decentralized future',
        avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150',
        tokenBalance: '1500',
        joinedAt: new Date(),
      },
      tokenId: 'nft_001',
      transactionHash: '0x1234567890abcdef1234567890abcdef12345678',
      upvotes: 142,
      tips: 85,
      createdAt: new Date(Date.now() - 3600000),
      tags: ['web3', 'blockchain', 'social-media'],
    },
    {
      id: '2',
      title: 'Digital Art Revolution',
      description: 'My latest NFT artwork showcasing the beauty of decentralized creativity.',
      contentType: 'image',
      contentUrl: 'https://images.pexels.com/photos/1193743/pexels-photo-1193743.jpeg?auto=compress&cs=tinysrgb&w=800',
      author: {
        id: '2',
        address: '0x742d35Cc6634C0532925a3b8D6AC8d2a46A6D6C6',
        username: 'crypto_artist',
        bio: 'NFT artist and blockchain enthusiast',
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
        tokenBalance: '2300',
        joinedAt: new Date(),
      },
      tokenId: 'nft_002',
      transactionHash: '0xabcdef1234567890abcdef1234567890abcdef12',
      upvotes: 328,
      tips: 189,
      createdAt: new Date(Date.now() - 7200000),
      tags: ['nft', 'art', 'digital'],
    },
    {
      id: '3',
      title: 'Building DeFi Applications',
      description: 'A comprehensive guide to developing decentralized finance applications on Ethereum.',
      contentType: 'video',
      contentUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
      author: {
        id: '3',
        address: '0x742d35Cc6634C0532925a3b8D6AC8d2a46A6D6C6',
        username: 'defi_dev',
        bio: 'DeFi developer and educator',
        avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
        tokenBalance: '890',
        joinedAt: new Date(),
      },
      upvotes: 276,
      tips: 134,
      createdAt: new Date(Date.now() - 10800000),
      tags: ['defi', 'ethereum', 'tutorial'],
    },
    {
      id: '4',
      title: 'Metaverse Gaming Experience',
      description: 'Exploring the intersection of gaming and virtual worlds in the metaverse.',
      contentType: 'video',
      contentUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
      author: {
        id: '4',
        address: '0x742d35Cc6634C0532925a3b8D6AC8d2a46A6D6C6',
        username: 'meta_gamer',
        bio: 'Metaverse explorer and game developer',
        avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150',
        tokenBalance: '1890',
        joinedAt: new Date(),
      },
      upvotes: 198,
      tips: 67,
      createdAt: new Date(Date.now() - 14400000),
      tags: ['metaverse', 'gaming', 'vr'],
    },
    {
      id: '5',
      title: 'Crypto Trading Strategies',
      description: 'Advanced trading techniques for cryptocurrency markets and risk management.',
      contentType: 'article',
      contentUrl: 'https://example.com/article2',
      author: {
        id: '5',
        address: '0x742d35Cc6634C0532925a3b8D6AC8d2a46A6D6C6',
        username: 'crypto_trader',
        bio: 'Professional trader and market analyst',
        avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150',
        tokenBalance: '3450',
        joinedAt: new Date(),
      },
      upvotes: 89,
      tips: 45,
      createdAt: new Date(Date.now() - 18000000),
      tags: ['trading', 'crypto', 'finance'],
    },
    {
      id: '6',
      title: 'AI and Blockchain Integration',
      description: 'How artificial intelligence is being integrated with blockchain technology.',
      contentType: 'image',
      contentUrl: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
      author: {
        id: '6',
        address: '0x742d35Cc6634C0532925a3b8D6AC8d2a46A6D6C6',
        username: 'ai_researcher',
        bio: 'AI researcher and blockchain developer',
        avatar: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=150',
        tokenBalance: '2100',
        joinedAt: new Date(),
      },
      upvotes: 156,
      tips: 78,
      createdAt: new Date(Date.now() - 21600000),
      tags: ['ai', 'blockchain', 'technology'],
    },
  ]

  useEffect(()=> {
    setContents(mockContents);
  }, []);

  useEffect(() => {
    let filtered = [...contents];

    //this filters by the search
    if(searchQuery){
      filtered = filtered.filter(content =>
        content.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        content.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        content.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    //this filters by selected tag
    if(selectedTag){
      filtered = filtered.filter(content => content.tags.includes(selectedTag));
    }

    //this sorts the content based on the selected sort option
    switch (sortBy) {
      case 'trending':
        filtered.sort((a,b) => (b.upvotes + b.tips)- (a.upvotes + a.tips));
        break;
      case 'recent':
        filtered.sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'popular':
        filtered.sort((a,b) => b.upvotes - a.upvotes);
        break;
    }

    setFilteredContents(filtered);
  }, [searchQuery, sortBy, selectedTag, contents]);

  const handleUpvote = (contentId: string) => {
    //handle upvote logic here
    setContents(contents.map(content =>
      content.id === contentId
        ? {...content, upvotes: content.upvotes + 1}
        : content
    ));
  }

  const handleTip = (contentId: string, amount: number) => {
    //handle tip logic here
    setContents(contents.map(content =>
      content.id === contentId
        ? {...content, tips: content.tips + amount}
        : content
    ));
  }

  const getSortIcon = () => {
    switch (sortBy) {
      case 'trending':
        return <TrendingUp className='h-4 w-4'/>;
      case 'recent':
        return <Clock className='h-4 w-4 '/>;
      case 'popular':
        return <Heart className='h-4 w-4'/>;
      default:
        return null;
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 transition-colors">
      
      <Header />

      <main className='container mx-auto px-4 py-4 sm:py-8 max-w-7xl'>
        <div className="mb-6 sm:mb-8">
          <motion.div
            initial={{opacity:0, y:20}}
            animate={{opacity:1, y:0}}
            className='text-left mb-6 sm:mb-8'
          >
            <h1 className='font-bold text-3xl text-gray-900 mb-2'>Explore Content</h1>
            <p className='text-gray-600 text-lg max-w-2xl'>Discover amazing content from creators around the world</p>
          </motion.div>
        </div>

        {/**Search bar */}
        <motion.div
          initial={{opacity:0, y:20}}
          animate={{opacity:1, y:0}}
          transition={{delay:0.1}}
          className='bg-white border border-gray-200 rounded-xl p-4 sm:p-6 mb-6 shadow-sm'
        >
          <div className='relative mt-4'>
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"/>
            <input
              type="text"
              placeholder='Search content...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='w-full border border-gray-300 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900'
            />
          </div>
          {/**Sort */}
          <div className='flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mt-4'>
            <div className='flex items-center space-x-2'>
              <Funnel className='h-5 w-5 text-gray-500'/>
              <span className="text-sm font-medium text-gray-700" >Sort by:</span>
              <div className='flex space-x-1'>
                {[
                  {key: 'trending', label: 'Trending'},
                  {key: 'recent', label: 'Recent'},
                  {key: 'popular', label: 'Popular'},
                ].map((option) => (
                  <button
                    key={option.key}
                    onClick={() => setSortBy(option.key as any)}
                    className={`px-3 py-1 rounded-full text-sm transition-colors flex items-center space-x-1 ${
                      sortBy === option.key
                        ? 'bg-purple-100 text-purple-700'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {sortBy === option.key && getSortIcon()}
                    <span>{option.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
          {/**clear the filter */}
          {(searchQuery || selectedTag) && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedTag('');
              }}
              className='text-sm text-purple-600 hover:text-purple-700'
            >
              Clear filters
            </button>
          )}
          {/**Popular tags */}
          <div className='mt-4 pt-4 border-t border-gray-200 '>
            <p className='text-sm font-medium text-gray-700 mb-2'>Popular tags:</p>
            <div className='flex flex-wrap gap-2'>
              {popularTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag === selectedTag ? '' : tag)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    selectedTag === tag
                      ? 'bg-purple-100 text-purple-700'
                      : 'bg-gray-100 text-gray-600 hover:bg-purple-50'
                  }`}
                >
                  #{tag}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial = {{opacity: 0, y: 20}}
          animate = {{opacity: 1, y: 0}}
          transition={{delay: 0.2}}
        >
          <p className='text-sm text-gray-600'>
            {filteredContents.length} {filteredContents.length === 1 ? 'result' : 'results'} found
            {selectedTag && (
              <span className='ml-2'>
                for <span className='font-semibold'>#{selectedTag}</span>
              </span>
            )}
          </p>
        </motion.div>

        {/**Content grid */}
        <div className="space-y-4 sm:space-y-6">
          {filteredContents.length > 0 ? (
            filteredContents.map((content, index) => (
              <motion.div
                key={content.id}
                initial={{opacity:0, y:20}}
                animate={{opacity:1, y:0}}
                transition={{delay: index * 0.1}}
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
              initial={{opacity:0, y:20}}
              animate={{opacity:1, y:0}}
              className='text-center py-12'
            >
              <Trophy className='h-16 w-16 text-gray-400 mx-auto mb-4'/>
              <h3 className='text-lg font-medium text-gray-900 mb-2'>
                No content found
              </h3>
              <p className='text-gray-600'>
                Try adjusting your search or filter.
              </p>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  )
}

export default page