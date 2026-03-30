import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, CheckCircle, XCircle, Calendar, User, BookOpen, Award, QrCode } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { storageUtils } from '../utils/storage';
import { CertificateRecord } from '../types';

export const VerificationPage: React.FC = () => {
  const [certificateId, setCertificateId] = useState('');
  const [searchResult, setSearchResult] = useState<CertificateRecord | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    if (!certificateId.trim()) {
      return;
    }

    setIsSearching(true);
    setSearched(false);

    // Simulate search delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const records = storageUtils.getRecords();
    const found = records.find(record => 
      record.certificateId.toLowerCase() === certificateId.toLowerCase().trim()
    );

    setSearchResult(found || null);
    setIsSearching(false);
    setSearched(true);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900 py-12 px-6">
      <motion.div
        className="container mx-auto max-w-4xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mb-6">
            <Award className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Certificate Verification
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Enter a certificate ID to verify its authenticity and view details
          </p>
        </motion.div>

        {/* Search Section */}
        <motion.div variants={itemVariants} className="mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label htmlFor="certificateId" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Certificate ID
                </label>
                <input
                  id="certificateId"
                  type="text"
                  value={certificateId}
                  onChange={(e) => setCertificateId(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter certificate ID (e.g., CERT-2024-ABC-123)"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div className="sm:self-end">
                <motion.button
                  onClick={handleSearch}
                  disabled={isSearching || !certificateId.trim()}
                  className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all duration-300"
                  whileHover={!isSearching && certificateId.trim() ? { scale: 1.05 } : {}}
                  whileTap={!isSearching && certificateId.trim() ? { scale: 0.95 } : {}}
                >
                  {isSearching ? (
                    <div className="flex items-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Searching...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <Search className="w-5 h-5 mr-2" />
                      Verify
                    </div>
                  )}
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Results Section */}
        {searched && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            {searchResult ? (
              <>
                {/* Verification Status - Valid */}
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl p-8">
                  <div className="flex items-center justify-center mb-6">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                      className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center"
                    >
                      <CheckCircle className="w-8 h-8 text-white" />
                    </motion.div>
                  </div>
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-green-800 dark:text-green-200 mb-2">
                      Certificate Verified
                    </h2>
                    <p className="text-green-700 dark:text-green-300">
                      This certificate is authentic and valid
                    </p>
                  </div>
                </div>

                {/* Certificate Details */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
                    <h3 className="text-2xl font-bold">Certificate Details</h3>
                  </div>
                  
                  <div className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <div className="flex items-start space-x-3">
                          <User className="w-5 h-5 text-gray-400 mt-1" />
                          <div>
                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                              Recipient
                            </dt>
                            <dd className="text-lg font-semibold text-gray-900 dark:text-white">
                              {searchResult.participantName}
                            </dd>
                          </div>
                        </div>

                        <div className="flex items-start space-x-3">
                          <BookOpen className="w-5 h-5 text-gray-400 mt-1" />
                          <div>
                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                              Course/Achievement
                            </dt>
                            <dd className="text-lg font-semibold text-gray-900 dark:text-white">
                              {searchResult.courseName}
                            </dd>
                          </div>
                        </div>

                        <div className="flex items-start space-x-3">
                          <Calendar className="w-5 h-5 text-gray-400 mt-1" />
                          <div>
                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                              Completion Date
                            </dt>
                            <dd className="text-lg font-semibold text-gray-900 dark:text-white">
                              {new Date(searchResult.completionDate).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </dd>
                          </div>
                        </div>

                        <div className="flex items-start space-x-3">
                          <Award className="w-5 h-5 text-gray-400 mt-1" />
                          <div>
                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                              Template
                            </dt>
                            <dd className="text-lg font-semibold text-gray-900 dark:text-white">
                              {searchResult.templateName}
                            </dd>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div className="flex items-start space-x-3">
                          <QrCode className="w-5 h-5 text-gray-400 mt-1" />
                          <div>
                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                              Certificate ID
                            </dt>
                            <dd className="text-sm font-mono text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded">
                              {searchResult.certificateId}
                            </dd>
                          </div>
                        </div>

                        <div className="flex items-start space-x-3">
                          <Calendar className="w-5 h-5 text-gray-400 mt-1" />
                          <div>
                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                              Generated On
                            </dt>
                            <dd className="text-lg font-semibold text-gray-900 dark:text-white">
                              {new Date(searchResult.generatedAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </dd>
                          </div>
                        </div>

                        {/* QR Code */}
                        <div className="flex justify-center">
                          <div className="bg-white p-4 rounded-lg border">
                            <QRCodeSVG value={searchResult.certificateId} size={120} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              // Verification Status - Invalid
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-8">
                <div className="flex items-center justify-center mb-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                    className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center"
                  >
                    <XCircle className="w-8 h-8 text-white" />
                  </motion.div>
                </div>
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-red-800 dark:text-red-200 mb-2">
                    Certificate Not Found
                  </h2>
                  <p className="text-red-700 dark:text-red-300 mb-4">
                    The certificate ID "{certificateId}" could not be verified.
                  </p>
                  <div className="bg-red-100 dark:bg-red-900/40 rounded-lg p-4 text-left">
                    <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2">Possible reasons:</h4>
                    <ul className="text-sm text-red-700 dark:text-red-300 space-y-1">
                      <li>• Certificate ID may be incorrectly entered</li>
                      <li>• Certificate may not have been generated through this system</li>
                      <li>• Certificate may have been revoked or expired</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* Help Section */}
        <motion.div variants={itemVariants} className="mt-16">
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Need Help?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600 dark:text-gray-300">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Certificate ID Format</h4>
                <p>Certificate IDs typically follow the format: CERT-YYYY-XXX-NNN</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Where to Find ID</h4>
                <p>The certificate ID is usually located at the bottom of the certificate, near the QR code.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};