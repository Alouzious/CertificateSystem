import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Award, Users, FileCheck } from 'lucide-react';
import { CertificatePreview } from './CertificatePreview';
import { CertificateTemplate, CertificateData } from '../types';

interface HeroProps {
  onStartCreating: () => void;
  onViewTemplates: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartCreating, onViewTemplates }) => {
  // Demo certificate for preview
  const demoTemplate: CertificateTemplate = {
    id: 'demo',
    name: 'classic-elegance',
    displayName: 'Classic Elegance',
    title: 'Certificate of Excellence',
    institutionName: 'Professional Institute',
    prefixText: 'This is to certify that',
    bodyText: 'has successfully completed the course',
    footerText: 'In recognition of outstanding achievement and dedication.',
    primaryColor: '#0f1b35',
    secondaryColor: '#1a2847',
    accentColor: '#d4af37',
    backgroundColor: '#fefcf3',
    fontFamily: 'serif',
    borderStyle: 'classic',
    logoPlacement: 'top',
    signature1: {
      name: 'Dr. Sarah Johnson',
      title: 'Director',
    },
    signature2: {
      name: 'Prof. Michael Brown',
      title: 'Dean',
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const demoData: CertificateData = {
    participantName: 'Alexandra Smith',
    courseName: 'Advanced Digital Marketing',
    completionDate: '2024-01-15',
    certificateId: 'CERT-2024-ADM-001',
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
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

  const floatingVariants = {
    float: {
      y: [-10, 10, -10],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  const stats = [
    { icon: Users, label: '5 Premium Templates', value: '5' },
    { icon: FileCheck, label: 'PDF & PNG Export', value: '2' },
    { icon: Award, label: '100% Professional', value: '100%' },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-64 h-64 bg-blue-200 dark:bg-blue-800 rounded-full opacity-20 blur-3xl"
          animate={floatingVariants.float}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200 dark:bg-purple-800 rounded-full opacity-20 blur-3xl"
          animate={floatingVariants.float}
          transition={{ delay: 1 }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-yellow-200 dark:bg-yellow-800 rounded-full opacity-10 blur-3xl"
          animate={floatingVariants.float}
          transition={{ delay: 0.5 }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Content */}
          <motion.div
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="space-y-6">
              <motion.div
                className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium"
                whileHover={{ scale: 1.05 }}
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Premium Certificate Generator
              </motion.div>

              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Create Certificates
                </span>
                <br />
                <span className="text-gray-900 dark:text-white">That Inspire</span>
              </h1>

              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl">
                Design professional, beautiful certificates in minutes. Choose from premium templates, 
                customize every detail, and generate high-quality PDFs instantly.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
              <motion.button
                onClick={onStartCreating}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Creating
              </motion.button>
              <motion.button
                onClick={onViewTemplates}
                className="px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-semibold text-lg hover:border-blue-500 hover:text-blue-600 dark:hover:border-blue-400 dark:hover:text-blue-400 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                View Templates
              </motion.button>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="flex items-center space-x-3"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="p-3 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-lg">
                    <stat.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right side - Certificate Preview */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <motion.div
              className="relative transform perspective-1000"
              whileHover={{ rotateY: 5, scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              {/* Certificate preview with 3D effect */}
              <div className="relative transform-gpu">
                {/* Shadow */}
                <div className="absolute inset-0 bg-black/10 transform translate-x-4 translate-y-4 rounded-lg blur-xl" />
                
                {/* Certificate */}
                <div className="relative bg-white rounded-lg overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-700 transform scale-[0.4] origin-center">
                  <CertificatePreview 
                    template={demoTemplate} 
                    data={demoData} 
                    id="hero-certificate"
                  />
                </div>

                {/* Floating elements */}
                <motion.div
                  className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                >
                  <Award className="w-6 h-6 text-white" />
                </motion.div>

                <motion.div
                  className="absolute -bottom-4 -left-4 w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full"
                  animate={floatingVariants.float}
                  transition={{ delay: 2 }}
                />

                <motion.div
                  className="absolute top-1/2 -right-8 w-6 h-6 bg-gradient-to-r from-pink-400 to-red-500 rounded-full"
                  animate={floatingVariants.float}
                  transition={{ delay: 1.5 }}
                />
              </div>
            </motion.div>

            {/* Floating badges */}
            <motion.div
              className="absolute -top-12 -left-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 border border-gray-200 dark:border-gray-700"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2 }}
            >
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Live Preview
                </span>
              </div>
            </motion.div>

            <motion.div
              className="absolute -bottom-8 -right-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 border border-gray-200 dark:border-gray-700"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5 }}
            >
              <div className="flex items-center space-x-2">
                <FileCheck className="w-4 h-4 text-blue-500" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  PDF Ready
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-gray-400 dark:border-gray-600 rounded-full flex justify-center"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-1 h-3 bg-gray-400 dark:bg-gray-600 rounded-full mt-2" />
        </motion.div>
      </motion.div>
    </section>
  );
};