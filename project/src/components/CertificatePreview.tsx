import React from 'react';
import { CertificateTemplate, CertificateData } from '../types';
import { ClassicElegance } from './templates/ClassicElegance';
import { ModernMinimal } from './templates/ModernMinimal';
import { CorporateGold } from './templates/CorporateGold';
import { AcademicExcellence } from './templates/AcademicExcellence';
import { TechDigital } from './templates/TechDigital';

interface CertificatePreviewProps {
  template: CertificateTemplate;
  data: CertificateData;
  id?: string;
  className?: string;
}

export const CertificatePreview: React.FC<CertificatePreviewProps> = ({ 
  template, 
  data, 
  id = 'certificate-preview',
  className = '' 
}) => {
  const renderTemplate = () => {
    const props = { template, data, id };
    
    switch (template.name) {
      case 'classic-elegance':
        return <ClassicElegance {...props} />;
      case 'modern-minimal':
        return <ModernMinimal {...props} />;
      case 'corporate-gold':
        return <CorporateGold {...props} />;
      case 'academic-excellence':
        return <AcademicExcellence {...props} />;
      case 'tech-digital':
        return <TechDigital {...props} />;
      default:
        return <ClassicElegance {...props} />;
    }
  };

  return (
    <div className={`certificate-preview ${className}`}>
      {renderTemplate()}
    </div>
  );
};