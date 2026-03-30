import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { CertificateTemplate, CertificateData } from '../../types';

interface CertificateTemplateProps {
  template: CertificateTemplate;
  data: CertificateData;
  id?: string;
}

export const CorporateGold: React.FC<CertificateTemplateProps> = ({ template, data, id }) => {
  const fontClass = {
    serif: 'certificate-serif',
    'sans-serif': 'certificate-sans',
    script: 'certificate-script',
  }[template.fontFamily] || 'certificate-serif';

  return (
    <div
      id={id}
      className="w-[1122px] h-[794px] relative text-white"
      style={{
        backgroundColor: template.backgroundColor || '#0f1b35',
        background: `linear-gradient(135deg, ${template.backgroundColor || '#0f1b35'} 0%, ${template.secondaryColor || '#1a2847'} 100%)`,
      }}
    >
      {/* Gold border */}
      <div className="absolute inset-4 border-4 border-gold"></div>
      <div className="absolute inset-6 border border-gold opacity-50"></div>
      
      {/* Gold gradient header */}
      <div 
        className="absolute top-0 left-0 right-0 h-16"
        style={{
          background: `linear-gradient(90deg, ${template.accentColor || '#d4af37'} 0%, ${template.primaryColor || '#ffd700'} 50%, ${template.accentColor || '#d4af37'} 100%)`,
        }}
      ></div>
      
      {/* Corner decorations */}
      <div className="absolute top-8 left-8 text-gold text-2xl">◆</div>
      <div className="absolute top-8 right-8 text-gold text-2xl">◆</div>
      <div className="absolute bottom-8 left-8 text-gold text-2xl">◆</div>
      <div className="absolute bottom-8 right-8 text-gold text-2xl">◆</div>
      
      {/* Logos */}
      {template.logoPlacement === 'top' && (
        <div className="absolute top-20 left-12 right-12 flex justify-between items-center">
          {template.logo1 && (
            <img src={template.logo1.url} alt={template.logo1.name} className="h-16 w-16 object-contain" />
          )}
          {template.logo2 && (
            <img src={template.logo2.url} alt={template.logo2.name} className="h-16 w-16 object-contain" />
          )}
        </div>
      )}
      
      {/* Embossed seal */}
      <div className="absolute top-24 left-1/2 transform -translate-x-1/2">
        <div className="w-28 h-28 rounded-full bg-gold flex items-center justify-center shadow-2xl">
          <div className="w-20 h-20 rounded-full bg-navy flex items-center justify-center text-gold">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L15.09 8.26L22 9L17 14.74L18.18 22L12 18.77L5.82 22L7 14.74L2 9L8.91 8.26L12 2Z"/>
            </svg>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex flex-col items-center pt-36 px-16">
        <h1 className={`text-5xl font-bold ${fontClass} mb-6 text-center text-gold`}>
          {template.title || 'Certificate of Excellence'}
        </h1>
        
        <div className="flex items-center mb-8">
          <div className="w-20 h-0.5 bg-gold"></div>
          <div className="mx-4 text-gold text-xl">◇</div>
          <div className="w-20 h-0.5 bg-gold"></div>
        </div>
        
        <p className={`text-xl ${fontClass} mb-8 text-center`}>
          {template.prefixText || 'This is to certify that'}
        </p>
        
        <h2 className={`text-4xl font-bold ${fontClass} mb-6 text-center text-gold`}>
          {data.participantName}
        </h2>
        
        <div className="text-center mb-8 space-y-3">
          <p className={`text-lg ${fontClass}`}>
            {template.bodyText || 'has demonstrated exceptional performance in'}
          </p>
          <h3 className={`text-2xl font-semibold ${fontClass} text-gold`}>
            {data.courseName}
          </h3>
          <p className={`text-lg ${fontClass}`}>
            Completed on {data.completionDate}
          </p>
        </div>
        
        <p className={`text-lg ${fontClass} text-center mb-8 max-w-2xl`}>
          {template.footerText || 'Awarded in recognition of outstanding achievement and professional excellence.'}
        </p>
        
        {/* Corporate badge */}
        <div className="flex items-center space-x-2 mb-6">
          <div className="w-6 h-6 bg-gold rounded-full"></div>
          <span className={`text-sm ${fontClass} text-gold font-semibold`}>CERTIFIED PROFESSIONAL</span>
          <div className="w-6 h-6 bg-gold rounded-full"></div>
        </div>
      </div>
      
      {/* Signatures */}
      <div className="absolute bottom-20 left-16 right-16 flex justify-between items-end">
        <div className="text-center">
          {template.signature1.signatureImageUrl && (
            <img src={template.signature1.signatureImageUrl} alt="Signature 1" className="h-12 w-32 object-contain mb-2" />
          )}
          <div className="w-32 h-0.5 bg-gold mb-2"></div>
          <p className={`text-sm ${fontClass} font-semibold text-gold`}>{template.signature1.name}</p>
          <p className={`text-xs ${fontClass}`}>{template.signature1.title}</p>
        </div>
        
        <div className="text-center">
          {template.signature2.signatureImageUrl && (
            <img src={template.signature2.signatureImageUrl} alt="Signature 2" className="h-12 w-32 object-contain mb-2" />
          )}
          <div className="w-32 h-0.5 bg-gold mb-2"></div>
          <p className={`text-sm ${fontClass} font-semibold text-gold`}>{template.signature2.name}</p>
          <p className={`text-xs ${fontClass}`}>{template.signature2.title}</p>
        </div>
      </div>
      
      {/* QR Code and Certificate ID */}
      <div className="absolute bottom-8 right-12 text-center">
        <div className="bg-white p-2 rounded">
          <QRCodeSVG value={data.certificateId} size={48} />
        </div>
        <p className="text-xs mt-2 font-mono text-gold">{data.certificateId}</p>
      </div>
      
      {/* Institution name */}
      <div className="absolute bottom-8 left-12">
        <p className={`text-sm ${fontClass} font-semibold text-gold`}>{template.institutionName}</p>
      </div>
      
      {/* Bottom logos */}
      {template.logoPlacement === 'bottom' && (
        <div className="absolute bottom-28 left-12 right-12 flex justify-between items-center">
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