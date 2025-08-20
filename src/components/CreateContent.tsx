"use client"

import React from 'react'
import { useState } from 'react';
import { useAccount } from 'wagmi';
import { Upload, Type, Image, Video, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

interface CreateContentProps {
  onSubmit: (content: {
    title: string;
    description: string;
    contentType: 'article' | 'image' | 'video';
    contentUrl: string;
    tags: string[];
  }) => void;
}

export const CreateContent = ({ onSubmit }: CreateContentProps) => {

  const [contentType, setContentType] = useState<'article' | 'image' | 'video'>('article');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [contentUrl, setContentUrl] = useState('');
  const [tags, setTags] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const { address } = useAccount();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!address) {
      toast.error('Please connect your wallet');
      return;
    }

    if (!title || !description || !contentUrl) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsUploading(true);

    try {
      const tagArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag);
      
      await onSubmit({
        title,
        description,
        contentType,
        contentUrl,
        tags: tagArray,
      });

      // Reset form
      setTitle('');
      setDescription('');
      setContentUrl('');
      setTags('');
      
      toast.success('Content created and minted successfully!');
    } catch (error) {
      toast.error('Failed to create content');
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, upload to IPFS or cloud storage
      const url = URL.createObjectURL(file);
      setContentUrl(url);
      toast.success('File uploaded successfully!');
    }
  };

  const contentTypes = [
    { type: 'article' as const, icon: Type, label: 'Article' },
    { type: 'image' as const, icon: Image, label: 'Image' },
    { type: 'video' as const, icon: Video, label: 'Video' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6"
    >
      <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">Create New Content</h2>

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        {/* Content Type Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Content Type
          </label>
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {contentTypes.map(({ type, icon: Icon, label }) => (
              <button
                key={type}
                type="button"
                onClick={() => setContentType(type)}
                className={`p-3 sm:p-4 rounded-lg border-2 transition-all ${
                  contentType === type
                    ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400'
                    : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 text-gray-700 dark:text-gray-300'
                }`}
              >
                <Icon className="h-5 w-5 sm:h-6 sm:w-6 mx-auto mb-1 sm:mb-2" />
                <span className="text-xs sm:text-sm font-medium">{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="Enter a compelling title..."
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="Describe your content..."
          />
        </div>

        {/* Content Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {contentType === 'article' ? 'Article Content' : 'Upload File'}
          </label>
          
          {contentType === 'article' ? (
            <textarea
              value={contentUrl}
              onChange={(e) => setContentUrl(e.target.value)}
              rows={8}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Write your article content here..."
            />
          ) : (
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 sm:p-6 hover:border-purple-400 dark:hover:border-purple-500 transition-colors">
              <div className="text-center">
                <Upload className="h-8 w-8 sm:h-12 sm:w-12 text-gray-400 dark:text-gray-500 mx-auto mb-2 sm:mb-4" />
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Upload your {contentType} file
                </p>
                <input
                  type="file"
                  accept={contentType === 'image' ? 'image/*' : 'video/*'}
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer bg-purple-500 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors text-sm"
                >
                  Choose File
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Tags */}
        <div>
          <label htmlFor="tags" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Tags (comma-separated)
          </label>
          <input
            type="text"
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="web3, blockchain, art, technology..."
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isUploading || !address}
          className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-2 sm:py-3 px-4 rounded-lg font-medium hover:from-purple-600 hover:to-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 text-sm sm:text-base"
        >
          {isUploading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Creating & Minting...</span>
            </>
          ) : (
            <span>Create & Mint NFT</span>
          )}
        </button>
      </form>
    </motion.div>
  );
}
