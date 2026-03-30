import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CertificateTemplate, CertificateData, TemplateName, ThemeContextType } from '../types';
import { storageUtils, generateId, generateCertificateId } from '../utils/storage';
import { Header } from './Header';
import { Hero } from './Hero';
import { CertificatePreview } from './CertificatePreview';
import { EditorPanel } from './editor/EditorPanel';
import { VerificationPage } from './VerificationPage';
import { Gallery } from './Gallery';
import { BulkGenerator } from './BulkGenerator';

// Theme Context
const ThemeContext = React.createContext<ThemeContextType>({
  isDark: false,
  toggleDark: () => {},
});

export const useTheme = () => React.useContext(ThemeContext);

export const Dashboard: React.FC = () => {
  const [isDark, setIsDark] = useState(false);
  const [currentSection, setCurrentSection] = useState('');
  
  // Certificate state
  const [template, setTemplate] = useState<CertificateTemplate>({
    id: generateId(),
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
  });

  const [certificateData, setCertificateData] = useState<CertificateData>({
    participantName: 'John Smith',
    courseName: 'Professional Development Course',
    completionDate: new Date().toISOString().split('T')[0],
    certificateId: generateCertificateId(),
  });

  // Load dark mode preference
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setIsDark(savedDarkMode);
    updateDarkMode(savedDarkMode);
  }, []);

  const updateDarkMode = (dark: boolean) => {
    if (dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const toggleDark = () => {
    const newDarkMode = !isDark;
    setIsDark(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
    updateDarkMode(newDarkMode);
  };

  const handleNavigation = (section: string) => {
    setCurrentSection(section);
    
    // Handle hash routing
    if (section === '') {
      window.location.hash = '';
    } else {
      window.location.hash = section;
    }
  };

  const handleSelectTemplate = (templateName: TemplateName) => {
    // Update template based on selection
    const templateConfigs: Record<TemplateName, Partial<CertificateTemplate>> = {
      'classic-elegance': {
        name: 'classic-elegance',
        displayName: 'Classic Elegance',
        title: 'Certificate of Achievement',
        primaryColor: '#0f1b35',
        secondaryColor: '#1a2847',
        accentColor: '#d4af37',
        backgroundColor: '#fefcf3',
        fontFamily: 'serif',
      },
      'modern-minimal': {
        name: 'modern-minimal',
        displayName: 'Modern Minimal',
        title: 'Certificate',
        primaryColor: '#333333',
        secondaryColor: '#666666',
        accentColor: '#4A90E2',
        backgroundColor: '#ffffff',
        fontFamily: 'sans-serif',
      },
      'corporate-gold': {
        name: 'corporate-gold',
        displayName: 'Corporate Gold',
        title: 'Certificate of Excellence',
        primaryColor: '#0f1b35',
        secondaryColor: '#1a2847',
        accentColor: '#d4af37',
        backgroundColor: '#0f1b35',
        fontFamily: 'serif',
      },
      'academic-excellence': {
        name: 'academic-excellence',
        displayName: 'Academic Excellence',
        title: 'Certificate of Academic Excellence',
        primaryColor: '#8b0000',
        secondaryColor: '#a0522d',
        accentColor: '#b8860b',
        backgroundColor: '#f8f7f4',
        fontFamily: 'serif',
      },
      'tech-digital': {
        name: 'tech-digital',
        displayName: 'Tech Digital',
        title: 'Digital Certificate',
        primaryColor: '#ffffff',
        secondaryColor: '#1e1e1e',
        accentColor: '#00d4ff',
        backgroundColor: '#0d1117',
        fontFamily: 'sans-serif',
      },
    };

    const config = templateConfigs[templateName];
    setTemplate(prev => ({
      ...prev,
      ...config,
      updatedAt: new Date().toISOString(),
    }));
    
    // Navigate to generate section
    handleNavigation('generate');
  };

  const themeValue: ThemeContextType = {
    isDark,
    toggleDark,
  };

  // Handle hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      setCurrentSection(hash);
    };

    window.addEventListener('hashchange', handleHashChange);
    
    // Set initial section from hash
    const initialHash = window.location.hash.slice(1);
    setCurrentSection(initialHash);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const renderContent = () => {
    switch (currentSection) {
      case 'verify':
        return <VerificationPage />;
      
      case 'gallery':
        return <Gallery onSelectTemplate={handleSelectTemplate} />;
      
      case 'templates':
        return <Gallery onSelectTemplate={handleSelectTemplate} />;
      
      case 'generate':
        return (
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
            <div className="container mx-auto px-6 py-8">
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Editor Panel */}
                <div className="xl:col-span-1">
                  <EditorPanel
                    template={template}
                    data={certificateData}
                    onTemplateChange={setTemplate}
                    onDataChange={setCertificateData}
                  />
                </div>
                
                {/* Certificate Preview */}
                <div className="xl:col-span-2">
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Live Preview</h2>
                    <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-4 overflow-auto">
                      <div className="flex justify-center">
                        <div className="transform-gpu" style={{ transform: 'scale(0.5)', transformOrigin: 'center top' }}>
                          <CertificatePreview
                            template={template}
                            data={certificateData}
                            id="certificate-preview"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'bulk':
        return (
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
            <BulkGenerator
              template={template}
              onTemplateChange={setTemplate}
            />
          </div>
        );
      
      default:
        return (
          <>
            <Hero
              onStartCreating={() => handleNavigation('generate')}
              onViewTemplates={() => handleNavigation('gallery')}
            />
            {/* Additional landing page content can go here */}
          </>
        );
    }
  };

  return (
    <ThemeContext.Provider value={themeValue}>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        <Header
          isDark={isDark}
          toggleDark={toggleDark}
          currentSection={currentSection}
          onNavigate={handleNavigation}
        />
        
        <main className="relative">
          <motion.div
            key={currentSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderContent()}
          </motion.div>
        </main>
      </div>
    </ThemeContext.Provider>
  );
};
