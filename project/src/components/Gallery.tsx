import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { CertificatePreview } from './CertificatePreview';
import { CertificateTemplate, CertificateData, TemplateName } from '../types';

interface GalleryProps {
  onSelectTemplate: (templateName: TemplateName) => void;
}

export const Gallery: React.FC<GalleryProps> = ({ onSelectTemplate }) => {
  // Demo data for all templates
  const demoData: CertificateData = {
    participantName: 'Alexandra Johnson',
    courseName: 'Professional Development Program',
    completionDate: '2024-01-15',
    certificateId: 'CERT-2024-PRO-001',
  };

  const templates: Array<{ template: CertificateTemplate; description: string; features: string[] }> = [
    {
      template: {
        id: 'classic-elegance',
        name: 'classic-elegance',
        displayName: 'Classic Elegance',
        title: 'Certificate of Achievement',
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
        signature1: { name: 'Dr. Sarah Johnson', title: 'Director' },
        signature2: { name: 'Prof. Michael Brown', title: 'Dean' },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      description: 'Traditional and sophisticated design with elegant typography and ornate borders.',
      features: ['Cream background', 'Gold accents', 'Ornamental corners', 'Classic serif fonts']
    },
    {
      template: {
        id: 'modern-minimal',
        name: 'modern-minimal',
        displayName: 'Modern Minimal',
        title: 'Certificate',
        institutionName: 'Design Academy',
        prefixText: 'This is to certify that',
        bodyText: 'has successfully completed',
        footerText: 'In recognition of outstanding achievement and dedication.',
        primaryColor: '#333333',
        secondaryColor: '#666666',
        accentColor: '#4A90E2',
        backgroundColor: '#ffffff',
        fontFamily: 'sans-serif',
        borderStyle: 'simple',
        logoPlacement: 'top',
        signature1: { name: 'Alex Rivera', title: 'Creative Director' },
        signature2: { name: 'Jordan Smith', title: 'Head of Design' },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      description: 'Clean and contemporary design with lots of whitespace and modern typography.',
      features: ['Pure white background', 'Minimal borders', 'Clean typography', 'Geometric accents']
    },
    {
      template: {
        id: 'corporate-gold',
        name: 'corporate-gold',
        displayName: 'Corporate Gold',
        title: 'Certificate of Excellence',
        institutionName: 'Corporate Training Center',
        prefixText: 'This is to certify that',
        bodyText: 'has demonstrated exceptional performance in',
        footerText: 'Awarded in recognition of outstanding achievement and professional excellence.',
        primaryColor: '#0f1b35',
        secondaryColor: '#1a2847',
        accentColor: '#d4af37',
        backgroundColor: '#0f1b35',
        fontFamily: 'serif',
        borderStyle: 'elegant',
        logoPlacement: 'top',
        signature1: { name: 'Robert Wilson', title: 'CEO' },
        signature2: { name: 'Linda Davis', title: 'VP Training' },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      description: 'Professional corporate design with luxurious gold accents on a dark background.',
      features: ['Dark navy background', 'Gold borders', 'Corporate styling', 'Professional layout']
    },
    {
      template: {
        id: 'academic-excellence',
        name: 'academic-excellence',
        displayName: 'Academic Excellence',
        title: 'Certificate of Academic Excellence',
        institutionName: 'Academic Institution',
        prefixText: 'This is to certify that',
        bodyText: 'has successfully completed the academic program',
        footerText: 'Granted in recognition of scholarly achievement and academic distinction.',
        primaryColor: '#8b0000',
        secondaryColor: '#a0522d',
        accentColor: '#b8860b',
        backgroundColor: '#f8f7f4',
        fontFamily: 'serif',
        borderStyle: 'double',
        logoPlacement: 'top',
        signature1: { name: 'Dr. Emily Clarke', title: 'Dean of Studies' },
        signature2: { name: 'Prof. James Anderson', title: 'Academic Director' },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      description: 'Scholarly design with academic traditions, featuring ornate borders and formal styling.',
      features: ['Academic colors', 'Ornate borders', 'Formal typography', 'Scholarly seals']
    },
    {
      template: {
        id: 'tech-digital',
        name: 'tech-digital',
        displayName: 'Tech Digital',
        title: 'Digital Certificate',
        institutionName: 'Tech Academy',
        prefixText: 'This validates that',
        bodyText: 'has successfully completed the technology program',
        footerText: 'Verified through our secure digital platform.',
        primaryColor: '#ffffff',
        secondaryColor: '#1e1e1e',
        accentColor: '#00d4ff',
        backgroundColor: '#0d1117',
        fontFamily: 'sans-serif',
        borderStyle: 'modern',
        logoPlacement: 'top',
        signature1: { name: 'Sam Tech', title: 'CTO' },
        signature2: { name: 'Alex Code', title: 'Lead Engineer' },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      description: 'Futuristic design with glowing effects and modern technology aesthetics.',
      features: ['Dark tech background', 'Glowing borders', 'Cyber aesthetics', 'Digital indicators']
    }
  ];

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

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 py-16 px-6">
      <motion.div
        className="container mx-auto max-w-7xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div variants={cardVariants} className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-6">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Template Gallery
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Choose from our collection of professionally designed certificate templates. 
            Each template is carefully crafted to meet different needs and styles.
          </p>
        </motion.div>

        {/* Template Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {templates.map((item, index) => (
            <motion.div
              key={item.template.id}
              variants={cardVariants}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden group hover:shadow-2xl transition-all duration-300"
              whileHover={{ y: -5 }}
            >
              {/* Template Preview */}
              <div className="relative overflow-hidden bg-gray-100 dark:bg-gray-700 p-8">
                <div className="transform scale-[0.25] origin-center w-full flex justify-center">
                  <CertificatePreview
                    template={item.template}
                    data={demoData}
                    id={`gallery-${item.template.id}`}
                  />
                </div>
                
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  <motion.button
                    onClick={() => onSelectTemplate(item.template.name)}
                    className="opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300 px-6 py-3 bg-white text-gray-900 rounded-lg font-semibold shadow-lg hover:shadow-xl flex items-center space-x-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>Use Template</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>

              {/* Template Info */}
              <div className="p-8">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {item.template.displayName}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 uppercase tracking-wide">
                    Key Features
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {item.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full" />
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                <motion.button
                  onClick={() => onSelectTemplate(item.template.name)}
                  className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>Select Template</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div variants={cardVariants} className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">
              Need a Custom Template?
            </h2>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              All templates are fully customizable. Change colors, fonts, logos, and text to match your brand perfectly.
            </p>
            <motion.button
              onClick={() => onSelectTemplate('classic-elegance')}
              className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Customizing
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};