import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { CertificateTemplate, CertificateData } from '../../types';

interface CertificateTemplateProps {
  template: CertificateTemplate;
  data: CertificateData;
  id?: string;
}

export const ClassicElegance: React.FC<CertificateTemplateProps> = ({ template, data, id }) => {
  const fontClass = {
    serif: 'certificate-serif',
    'sans-serif': 'certificate-sans',
    script: 'certificate-script',
  }[template.fontFamily] || 'certificate-serif';

  return (
    <div
      id={id}
      className="w-[1122px] h-[794px] relative bg-cream border-double border-navy"
      style={{
        borderWidth: '12px',
        backgroundColor: template.backgroundColor || '#fefcf3',
        color: template.primaryColor || '#0f1b35',
      }}
    >
      {/* Outer border */}
      <div className="absolute inset-6 border-4 border-dashed border-navy opacity-60"></div>
      
      {/* Corner ornaments */}
      <div className="absolute top-4 left-4 text-gold text-4xl">✦</div>
      <div className="absolute top-4 right-4 text-gold text-4xl">✦</div>
      <div className="absolute bottom-4 left-4 text-gold text-4xl">✦</div>
      <div className="absolute bottom-4 right-4 text-gold text-4xl">✦</div>
      
      {/* Logos */}
      {template.logoPlacement === 'top' && (
        <div className="absolute top-8 left-8 right-8 flex justify-between items-center">
          {template.logo1 && (
            <img src={template.logo1.url} alt={template.logo1.name} className="h-16 w-16 object-contain" />
          )}
          {template.logo2 && (
            <img src={template.logo2.url} alt={template.logo2.name} className="h-16 w-16 object-contain" />
          )}
        </div>
      )}
      
      {/* Institution seal/header */}
      <div className="flex flex-col items-center pt-24 px-16">
        <div className="w-32 h-32 rounded-full border-4 border-navy flex items-center justify-center mb-8">
          <div className="w-24 h-24 bg-navy rounded-full flex items-center justify-center text-cream">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L3.09 8.26L12 22L20.91 8.26L12 2ZM12 4.44L18.18 9.14L12 19.56L5.82 9.14L12 4.44ZM12 6L8 9.5L12 17L16 9.5L12 6Z"/>
            </svg>
          </div>
        </div>
        
        <h1 className={`text-5xl font-bold ${fontClass} mb-4 text-center`}>
          {template.title || 'Certificate of Achievement'}
        </h1>
        
        <div className="flex items-center mb-6">
          <div className="w-24 h-0.5 bg-gold"></div>
          <div className="mx-4 text-gold text-2xl">❋</div>
          <div className="w-24 h-0.5 bg-gold"></div>
        </div>
        
        <p className={`text-xl ${fontClass} mb-8 text-center max-w-2xl`}>
          {template.prefixText || 'This is to certify that'}
        </p>
        
        <h2 className={`text-4xl font-bold ${fontClass} mb-6 text-center`} style={{ color: template.accentColor || '#d4af37' }}>
          {data.participantName}
        </h2>
        
        <div className="text-center mb-8">
          <p className={`text-lg ${fontClass} mb-2`}>
            {template.bodyText || 'has successfully completed the course'}
          </p>
          <h3 className={`text-2xl font-semibold ${fontClass} mb-4`}>
            {data.courseName}
          </h3>
          <p className={`text-lg ${fontClass}`}>
            on {data.completionDate}
          </p>
        </div>
        
        <p className={`text-lg ${fontClass} text-center mb-8 max-w-2xl`}>
          {template.footerText || 'In recognition of dedication and achievement in the field of study.'}
        </p>
      </div>
      
      {/* Signatures */}
      <div className="absolute bottom-20 left-16 right-16 flex justify-between items-end">
        <div className="text-center">
          {template.signature1.signatureImageUrl && (
            <img src={template.signature1.signatureImageUrl} alt="Signature 1" className="h-12 w-32 object-contain mb-2" />
          )}
          <div className="w-32 h-0.5 bg-navy mb-2"></div>
          <p className={`text-sm ${fontClass} font-semibold`}>{template.signature1.name}</p>
          <p className={`text-xs ${fontClass}`}>{template.signature1.title}</p>
        </div>
        
        <div className="text-center">
          {template.signature2.signatureImageUrl && (
            <img src={template.signature2.signatureImageUrl} alt="Signature 2" className="h-12 w-32 object-contain mb-2" />
          )}
          <div className="w-32 h-0.5 bg-navy mb-2"></div>
          <p className={`text-sm ${fontClass} font-semibold`}>{template.signature2.name}</p>
          <p className={`text-xs ${fontClass}`}>{template.signature2.title}</p>
        </div>
      </div>
      
      {/* QR Code and Certificate ID */}
      <div className="absolute bottom-8 right-8 text-center">
        <QRCodeSVG value={data.certificateId} size={48} />
        <p className="text-xs mt-1 font-mono">{data.certificateId}</p>
      </div>
      
      {/* Institution name */}
      <div className="absolute bottom-8 left-8">
        <p className={`text-sm ${fontClass} font-semibold`}>{template.institutionName}</p>
      </div>
      
      {/* Bottom logos */}
      {template.logoPlacement === 'bottom' && (
        <div className="absolute bottom-20 left-8 right-8 flex justify-between items-center">
          {template.logo1 && (
            <img src={template.logo1.url} alt={template.logo1.name} className="h-12 w-12 object-contain" />
          )}
          {template.logo2 && (
            <img src={template.logo2.url} alt={template.logo2.name} className="h-12 w-12 object-contain" />
          )}
        </div>
      )}
    </div>
  );
};