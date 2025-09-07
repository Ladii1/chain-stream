'use client';

import React from 'react'
import { Content } from '@/types'
import { Heart, MessageCircle, Share2, Trophy, ExternalLink, Flag, MoreHorizontal } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { CommentModal } from './CommentModal';
import { ShareModal } from './ShareModal';
import { ReportModal } from './ReportModal';
import toast from 'react-hot-toast';
import { useAccount } from 'wagmi';

interface ContentCardProps {
  content: Content;
  onUpvote?: (contentId: string) => void;
  onTip?: (contentId: string, amount: number) => void;
}

export const ContentCard = ({ content, onUpvote, onTip }: ContentCardProps) => {

  const [isUpvoted, setIsUpvoted] = useState(false);
  const [tipAmount, setTipAmount] = useState(1);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const { address } = useAccount();

  const handleUpvote = async () => {
    if (!address) {
        toast.error('Please connect your wallet');
        return;
    }
    
    setIsUpvoted(!isUpvoted);
    onUpvote?.(content.id);
    toast.success('Upvoted! +1 token earned');
  };

  const handleTip = async () => {
    if (!address) {
        toast.error('Please connect your wallet');
        return;
    }
    
    onTip?.(content.id, tipAmount);
    toast.success(`Tipped ${tipAmount} tokens!`);
  };

  const handleComment = () => {
    setIsCommentModalOpen(true);
  };

  const handleShare = () => {
    setIsShareModalOpen(true);
  };

  const handleReport = () => {
    setIsReportModalOpen(true);
    setShowMoreOptions(false);
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    return 'Just now';
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-all"
    >
        {/**Content preview */}
        <div className="relative">
            {content.contentType === 'image' && (
                <img 
                    src={content.contentUrl} 
                    alt={content.title}
                    className='w-full h-48 sm:h-64 object-cover'
                />
            )}

            {content.contentType === 'video' && (
                <video 
                    src={content.contentUrl} 
                    controls
                    className='w-full h-48 sm:h-64 object-cover'
                    style={{ display: content.contentType === 'video' ? 'block' : 'none' }}
                />
            )}

            {content.contentType === 'article' && (
                <div className='h-24 sm:h-32 bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-4'>
                    <div className='text-center'>
                        <h3 className='text-sm sm:text-lg font-semibold text-gray-800 mb-1 sm:mb:2 line-clamp-1 sm:line-clamp-none'>{content.title}</h3>
                        <p className='text-xs sm:text-sm text-gray-600 line-clamp-2 hidden sm:block'>{content.description}</p>
                    </div>
                </div>
            )}

            {/**Badge */}
            {content.tokenId && (
                <div className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-purple-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                    <Trophy className="h-3 w-3" />
                    <span>Minted</span>
                </div>
            )}

            {/**Option menu */}
            <div className="absolute top-2 sm:top-3 left-2 sm:left-3">
                <div className="relative">
                    <button
                        onClick={() => setShowMoreOptions(!showMoreOptions)}
                        className="p-1.5 bg-black/20 hover:bg-black/30 text-white rounded-full transition-colors backdrop-blur-sm"
                    >
                        <MoreHorizontal className="h-4 w-4"/>
                    </button>

                    {showMoreOptions && (
                        <div className="absolute top-full left-0 mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-10 min-w-[120px]">
                            <button
                                onClick={handleReport}
                                className="w-full px-3 py-2 text-left text-sm text-red-600 dark:text-red-400 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center space-x-2"
                            >
                                <Flag className="h-3 w-3" />
                                <span>Report</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>

        {/**content info */}
        <div className="p-3 sm:p-4">
            <div className="flex items-center space-x-3 mb-3">
                <img
                    src={content.author.avatar}
                    alt={content.author.username}
                    className="h-6 w-6 sm:h-8 sm:w-8 rounded-full"
                />
                <div>
                    <p className="font-medium text-gray-900 dark:text-white text-sm sm:text-base">{content.author.username}</p>
                    <p className="text-xs text-gray-500">{formatTimeAgo(content.createdAt)}</p>
                </div>
            </div>

            <h3 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm sm:text-base line-clamp-2">{content.title}</h3>
            <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm mb-3 line-clamp-2">{content.description}</p>

            {/**Tags */}
            <div className="flex flex-wrap gap-1 mb-3 max-w-full overflow-hidden">
                {content.tags.map((tag, index) => (
                    <span
                        key={index}
                        className='px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full whitespace-nowrap'
                    >
                        #{tag}
                    </span>
                ))}
            </div>

            {/** actions*/}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
                <div className="flex items-center space-x-2 sm:space-x-4 flex-wrap">
                    <button 
                        onClick={handleUpvote}
                        className={`flex items-center space-x-1 px-3 py-1 rounded-full transition-colors ${
                        isUpvoted
                         ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400'
                         : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20'
                        }`}
                    >
                        <Heart className={`h-4 w-4 ${isUpvoted ? 'fill-current' : ''}`} />
                        <span className="text-xs sm:text-sm">{content.upvotes}</span>
                    </button>

                    <button 
                        onClick={handleComment}
                        className="flex items-center space-x-1 px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                        <MessageCircle className="h-4 w-4"/>
                        <span className="text-xs sm:text-sm hidden sm:inline">Comment</span>
                    </button>

                    <button 
                        onClick={handleShare}
                        className="flex items-center space-x-1 px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                        <Share2 className="h-4 w-4"/>
                        <span className="text-xs sm:text-sm hidden sm:inline">Share</span>
                    </button>
                </div>

                {/*Tip Section*/}
                {address && (
                    <div className="flex items-center space-x-2 w-full sm:w-auto">
                        <input
                            type='number'
                            value={tipAmount}
                            min="1"
                            onChange={(e) => setTipAmount(Number(e.target.value))}
                            className="w-12 sm:w-16 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded text-xs sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                        <button 
                            onClick={handleTip}
                            className="px-3 py-1 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full text-xs sm:text-sm hover:from-purple-600 hover:to-blue-600 transition-all flex-shrink-0"
                        >
                            Tip
                        </button>
                    </div>
                )}
            </div>
            
            
            {/*blockchain  info*/}
            {content.transactionHash && (
                <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
                    <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>On-Chain</span>
                        <a 
                            href={`https://etherscan.io/tx/${content.transactionHash}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-1 hover:text-purple-600 dark:hover:text-purple-400"
                        >
                            <ExternalLink className="h-3 w-3"/>
                            <span className="hidden sm:inline">View on Etherscan</span>
                            <span className="sm:hidden">Etherscan</span>
                        </a>
                    </div>
                </div>
            )}
        </div>
        
        {/*Modals*/}
        <CommentModal 
            isOpen={isCommentModalOpen}
            onClose={() => setIsCommentModalOpen(false)}
            contentTitle={content.title}
            contentId={content.id}
        />

        <ShareModal 
            isOpen={isShareModalOpen}
            onClose={() => setIsShareModalOpen(false)}
            contentTitle={content.title}
            contentId={content.id}
        />

        <ReportModal 
            isOpen={isReportModalOpen}
            onClose={() => setIsReportModalOpen(false)}
            reportType='content'
            targetTitle={content.title}
            targetId={content.id}
            targetAuthor={content.author.username}
        />

    </motion.div>
  )
}
