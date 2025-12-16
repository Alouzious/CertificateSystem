import { useEffect } from 'react';
import Dashboard from './components/Dashboard';
import { storageUtils } from './utils/storage';
import { CertificateTemplate } from './types';

const initializeSampleTemplates = () => {
  const existingTemplates = storageUtils.getTemplates();
  if (existingTemplates.length === 0) {
    const sampleTemplates: CertificateTemplate[] = [
      {
        id: 'sample-1',
        title: 'Certificate of Achievement',
        institutionName: 'Academy of Excellence',
        bodyText: 'This certifies that',
        footerText: 'Awarded in recognition of outstanding achievement and dedication',
        primaryColor: '#1e3a5f',
        secondaryColor: '#2c5282',
        accentColor: '#d4af37',
        backgroundColor: '#fefcf3',
        signatureName: 'Dr. Jane Smith',
        signatureTitle: 'Director of Education',
        logoUrl: '',
        borderStyle: 'elegant',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'sample-2',
        title: 'Certificate of Completion',
        institutionName: 'Professional Training Institute',
        bodyText: 'This certificate is proudly presented to',
        footerText: 'In recognition of successful course completion',
        primaryColor: '#0f4c3a',
        secondaryColor: '#1a7f64',
        accentColor: '#c9a961',
        backgroundColor: '#fffef7',
        signatureName: 'Prof. Michael Johnson',
        signatureTitle: 'Head of Programs',
        logoUrl: '',
        borderStyle: 'classic',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'sample-3',
        title: 'Certificate of Excellence',
        institutionName: 'Global Learning Center',
        bodyText: 'This is to certify that',
        footerText: 'Demonstrating exceptional skill and commitment',
        primaryColor: '#6b2c3e',
        secondaryColor: '#8f3952',
        accentColor: '#b8860b',
        backgroundColor: '#fdf9f3',
        signatureName: 'Sarah Williams',
        signatureTitle: 'Chief Academic Officer',
        logoUrl: '',
        borderStyle: 'modern',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];

    sampleTemplates.forEach((template) => {
      storageUtils.addTemplate(template);
    });
  }
};

function App() {
  useEffect(() => {
    initializeSampleTemplates();
  }, []);

  return <Dashboard />;
}

export default App;
