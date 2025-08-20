'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Flag, AlertTriangle, Send } from 'lucide-react';
import { useAccount } from 'wagmi';
import toast from 'react-hot-toast';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  reportType: 'content' | 'profile';
  targetId: string;
  targetTitle: string;
  targetAuthor?: string;
}

const REPORT_REASONS = {
  content: [
    { id: 'spam', label: 'Spam or repetitive content' },
    { id: 'inappropriate', label: 'Inappropriate or offensive content' },
    { id: 'copyright', label: 'Copyright infringement' },
    { id: 'misinformation', label: 'False or misleading information' },
    { id: 'harassment', label: 'Harassment or bullying' },
    { id: 'violence', label: 'Violence or harmful content' },
    { id: 'other', label: 'Other (please specify)' },
  ],
  profile: [
    { id: 'impersonation', label: 'Impersonation or fake account' },
    { id: 'harassment', label: 'Harassment or bullying' },
    { id: 'spam', label: 'Spam or bot account' },
    { id: 'inappropriate', label: 'Inappropriate profile content' },
    { id: 'scam', label: 'Scam or fraudulent activity' },
    { id: 'other', label: 'Other (please specify)' },
  ],
};

export function ReportModal({ 
  isOpen, 
  onClose, 
  reportType, 
  targetId, 
  targetTitle, 
  targetAuthor 
}: ReportModalProps) {
  const { address } = useAccount();
  const [selectedReason, setSelectedReason] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const reasons = REPORT_REASONS[reportType];

  const handleSubmit = async () => {
    if (!address) {
      toast.error('Please connect your wallet to report');
      return;
    }

    if (!selectedReason) {
      toast.error('Please select a reason for reporting');
      return;
    }

    setIsSubmitting(true);

    try {
      // Create report object
      const report = {
        id: `report_${Date.now()}`,
        reporterId: address,
        reportType,
        targetId,
        targetTitle,
        targetAuthor,
        reason: selectedReason,
        additionalInfo: additionalInfo.trim(),
        timestamp: new Date().toISOString(),
        status: 'pending',
      };

      // Log to console (in production, this would be sent to your backend/database)
      console.log('🚨 Content Report Submitted:', report);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      toast.success('Report submitted successfully. Thank you for helping keep our community safe.');
      
      // Reset form and close modal
      setSelectedReason('');
      setAdditionalInfo('');
      onClose();
      
    } catch (error) {
      toast.error('Failed to submit report. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setSelectedReason('');
      setAdditionalInfo('');
      onClose();
    }
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
            onClick={handleClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-200 dark:border-gray-800 w-full max-w-md max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-3">
                  <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded-full">
                    <Flag className="h-5 w-5 text-red-600 dark:text-red-400" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                      Report {reportType === 'content' ? 'Content' : 'Profile'}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Help us keep the community safe
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleClose}
                  disabled={isSubmitting}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors disabled:opacity-50"
                >
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Target Info */}
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Reporting {reportType}:
                  </p>
                  <p className="text-sm text-gray-900 dark:text-white font-medium line-clamp-2">
                    {targetTitle}
                  </p>
                  {targetAuthor && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      by {targetAuthor}
                    </p>
                  )}
                </div>

                {/* Reason Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Why are you reporting this {reportType}? <span className="text-red-500">*</span>
                  </label>
                  <div className="space-y-2">
                    {reasons.map((reason) => (
                      <label
                        key={reason.id}
                        className="flex items-start space-x-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors"
                      >
                        <input
                          type="radio"
                          name="reason"
                          value={reason.id}
                          checked={selectedReason === reason.id}
                          onChange={(e) => setSelectedReason(e.target.value)}
                          className="mt-0.5 h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 dark:border-gray-600"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          {reason.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Additional Information */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Additional information <span className="text-gray-400">(Optional)</span>
                  </label>
                  <textarea
                    value={additionalInfo}
                    onChange={(e) => setAdditionalInfo(e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
                    placeholder="Please provide any additional context that might help us understand the issue..."
                    maxLength={500}
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {additionalInfo.length}/500 characters
                  </p>
                </div>

                {/* Warning */}
                <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3">
                  <div className="flex items-start space-x-2">
                    <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs font-medium text-amber-800 dark:text-amber-200">
                        Important
                      </p>
                      <p className="text-xs text-amber-700 dark:text-amber-300 mt-1">
                        False reports may result in action against your account. Please only report content that violates our community guidelines.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={handleClose}
                  disabled={isSubmitting}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting || !selectedReason}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      <span>Submit Report</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}