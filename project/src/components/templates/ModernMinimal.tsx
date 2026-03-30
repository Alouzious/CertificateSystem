import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { CertificateTemplate, CertificateData } from '../../types';

interface CertificateTemplateProps {
  template: CertificateTemplate;
  data: CertificateData;
  id?: string;
}

export const ModernMinimal: React.FC<CertificateTemplateProps> = ({ template, data, id }) => {
  const fontClass = {
    serif: 'certificate-serif',
    'sans-serif': 'certificate-sans',
    script: 'certificate-script',
  }[template.fontFamily] || 'certificate-sans';

  return (
    <div
      id={id}
      className="w-[1122px] h-[794px] relative bg-white border-4"
      style={{
        backgroundColor: template.backgroundColor || '#ffffff',
        borderColor: template.primaryColor || '#333333',
        color: template.primaryColor || '#333333',
      }}
    >
      {/* Top accent bar */}
      <div
        className="w-full h-2 absolute top-0 left-0"
        style={{
          background: `linear-gradient(90deg, ${template.primaryColor || '#333333'}, ${template.accentColor || '#666666'})`,
        }}
      ></div>
      
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
      
      {/* Main content */}
      <div className="flex flex-col items-center justify-center h-full px-16 py-24">
        <h1 className={`text-6xl font-light ${fontClass} mb-12 text-center tracking-wide`}>
          {template.title || 'Certificate'}
        </h1>
        
        <div className="w-32 h-0.5 mb-12" style={{ backgroundColor: template.accentColor || '#666666' }}></div>
        
        <p className={`text-xl font-light ${fontClass} mb-8 text-center`}>
          {template.prefixText || 'This is to certify that'}
        </p>
        
        <h2 className={`text-5xl font-bold ${fontClass} mb-12 text-center tracking-wider`} style={{ color: template.accentColor || '#666666' }}>
          {data.participantName}
        </h2>
        
        <div className="text-center mb-12 space-y-4">
          <p className={`text-lg font-light ${fontClass}`}>
            {template.bodyText || 'has successfully completed'}
          </p>
          <h3 className={`text-3xl font-medium ${fontClass}`}>
            {data.courseName}
          </h3>
          <p className={`text-lg font-light ${fontClass}`}>
            {data.completionDate}
          </p>
        </div>
        
        <div className="w-32 h-0.5 mb-8" style={{ backgroundColor: template.accentColor || '#666666' }}></div>
        
        <p className={`text-base font-light ${fontClass} text-center max-w-2xl leading-relaxed`}>
          {template.footerText || 'In recognition of outstanding achievement and dedication.'}
        </p>
      </div>
      
      {/* Signatures */}
      <div className="absolute bottom-16 left-16 right-16 flex justify-between items-end">
        <div className="text-center">
          {template.signature1.signatureImageUrl && (
            <img src={template.signature1.signatureImageUrl} alt="Signature 1" className="h-12 w-32 object-contain mb-2" />
          )}
          <div className="w-32 h-px mb-2" style={{ backgroundColor: template.primaryColor || '#333333' }}></div>
          <p className={`text-sm ${fontClass} font-medium`}>{template.signature1.name}</p>
          <p className={`text-xs ${fontClass} font-light`}>{template.signature1.title}</p>
        </div>
        
        <div className="text-center">
          {template.signature2.signatureImageUrl && (
            <img src={template.signature2.signatureImageUrl} alt="Signature 2" className="h-12 w-32 object-contain mb-2" />
          )}
          <div className="w-32 h-px mb-2" style={{ backgroundColor: template.primaryColor || '#333333' }}></div>
          <p className={`text-sm ${fontClass} font-medium`}>{template.signature2.name}</p>
          <p className={`text-xs ${fontClass} font-light`}>{template.signature2.title}</p>
        </div>
      </div>
      
      {/* QR Code and Certificate ID */}
      <div className="absolute bottom-8 right-8 text-center">
        <QRCodeSVG value={data.certificateId} size={48} />
        <p className="text-xs mt-1 font-mono">{data.certificateId}</p>
      </div>
      
      {/* Institution name */}
      <div className="absolute bottom-8 left-8">
        <p className={`text-sm ${fontClass} font-medium`}>{template.institutionName}</p>
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