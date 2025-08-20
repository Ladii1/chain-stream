"use client";

import React from 'react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Heart, MessageCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAccount } from 'wagmi';


interface Comment {
  id: string;
  author: {
    username: string;
    avatar: string;
    address: string;
  };
  content: string;
  createdAt: Date;
  likes: number;
}

interface CommentModalProps {
  isOpen: boolean;
  onClose: () => void;
  contentTitle: string;
  contentId: string;
}

export const CommentModal = ({ isOpen, onClose, contentTitle, contentId }: CommentModalProps) => {
  const { address } = useAccount();
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      author: {
        username: 'web3_enthusiast',
        avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150',
        address: '0x742d35Cc6634C0532925a3b8D6AC8d2a46A6D6C6',
      },
      content: 'Great content! Really enjoyed reading this perspective on Web3 development.',
      createdAt: new Date(Date.now() - 3600000),
      likes: 5,
    },
    {
      id: '2',
      author: {
        username: 'crypto_dev23567',
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
        address: '0x742d35Cc6634C0532925a3b8D6AC8d2a46A6D6C6',
      },
      content: 'Thanks for sharing! This helped me understand the concepts better. Looking forward to more content like this.',
      createdAt: new Date(Date.now() - 7200000),
      likes: 3,
    },
  ]);

  const handleSubmitComment = () => {
    if (!address) {
      toast.error('Please connect your wallet to comment');
      return;
    }

    if (!newComment.trim()) {
      toast.error('Please enter a comment');
      return;
    }

    const comment: Comment = {
      id: Date.now().toString(),
      author: {
        username: 'you',
        avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150',
        address: address,
      },
      content: newComment.trim(),
      createdAt: new Date(),
      likes: 0,
    };

    setComments([comment, ...comments]);
    setNewComment('');
    toast.success('Comment posted!');
  };

  const handleLikeComment = (commentId: string) => {
    if (!address) {
      toast.error('Please connect your wallet to like comments');
      return;
    }

    setComments(comments.map(comment =>
      comment.id === commentId
        ? { ...comment, likes: comment.likes + 1 }
        : comment
    ));
    toast.success('Comment liked!');
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

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-200 dark:border-gray-800 w-full max-w-2xl max-h-[80vh] flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Comments
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 truncate">
                    {contentTitle}
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>

              {/* Comments List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {comments.length > 0 ? (
                  comments.map((comment) => (
                    <div key={comment.id} className="flex space-x-3">
                      <img
                        src={comment.author.avatar}
                        alt={comment.author.username}
                        className="h-8 w-8 rounded-full flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-medium text-gray-900 dark:text-white text-sm">
                            {comment.author.username}
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {formatAddress(comment.author.address)}
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {formatTimeAgo(comment.createdAt)}
                          </span>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">
                          {comment.content}
                        </p>
                        <button
                          onClick={() => handleLikeComment(comment.id)}
                          className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                        >
                          <Heart className="h-3 w-3" />
                          <span>{comment.likes}</span>
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <MessageCircle className="h-12 w-12 text-gray-400 dark:text-gray-600 mx-auto mb-3" />
                    <p className="text-gray-500 dark:text-gray-400">
                      No comments yet. Be the first to comment!
                    </p>
                  </div>
                )}
              </div>

              {/* Comment Input */}
              <div className="p-6 border-t border-gray-200 dark:border-gray-700">
                {address ? (
                  <div className="flex space-x-3">
                    <img
                      src="https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150"
                      alt="Your avatar"
                      className="h-8 w-8 rounded-full flex-shrink-0"
                    />
                    <div className="flex-1">
                      <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Write a comment..."
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
                        rows={3}
                        maxLength={500}
                      />
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {newComment.length}/500
                        </span>
                        <button
                          onClick={handleSubmitComment}
                          disabled={!newComment.trim()}
                          className="flex items-center space-x-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Send className="h-4 w-4" />
                          <span>Post</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-gray-500 dark:text-gray-400 mb-3">
                      Connect your wallet to join the conversation
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
