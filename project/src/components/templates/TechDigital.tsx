import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { CertificateTemplate, CertificateData } from '../../types';

interface CertificateTemplateProps {
  template: CertificateTemplate;
  data: CertificateData;
  id?: string;
}

export const TechDigital: React.FC<CertificateTemplateProps> = ({ template, data, id }) => {
  const fontClass = {
    serif: 'certificate-serif',
    'sans-serif': 'certificate-sans',
    script: 'certificate-script',
  }[template.fontFamily] || 'certificate-sans';

  return (
    <div
      id={id}
      className="w-[1122px] h-[794px] relative text-white"
      style={{
        backgroundColor: template.backgroundColor || '#0d1117',
        backgroundImage: `
          radial-gradient(circle at 25% 25%, rgba(0, 212, 255, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 75% 75%, rgba(0, 212, 255, 0.05) 0%, transparent 50%),
          linear-gradient(45deg, rgba(0, 212, 255, 0.02) 0%, transparent 100%)
        `,
      }}
    >
      {/* Grid background pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 212, 255, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 212, 255, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      ></div>
      
      {/* Glowing border */}
      <div 
        className="absolute inset-4 border-2 rounded-lg"
        style={{
          borderColor: template.accentColor || '#00d4ff',
          boxShadow: `0 0 20px ${template.accentColor || '#00d4ff'}40, inset 0 0 20px ${template.accentColor || '#00d4ff'}20`,
        }}
      ></div>
      
      {/* Corner elements */}
      <div className="absolute top-8 left-8 w-8 h-8">
        <div 
          className="w-full h-1 mb-2"
          style={{ backgroundColor: template.accentColor || '#00d4ff' }}
        ></div>
        <div 
          className="w-1 h-6"
          style={{ backgroundColor: template.accentColor || '#00d4ff' }}
        ></div>
      </div>
      <div className="absolute top-8 right-8 w-8 h-8">
        <div 
          className="w-full h-1 mb-2"
          style={{ backgroundColor: template.accentColor || '#00d4ff' }}
        ></div>
        <div 
          className="w-1 h-6 ml-auto"
          style={{ backgroundColor: template.accentColor || '#00d4ff' }}
        ></div>
      </div>
      <div className="absolute bottom-8 left-8 w-8 h-8">
        <div 
          className="w-1 h-6 mb-2"
          style={{ backgroundColor: template.accentColor || '#00d4ff' }}
        ></div>
        <div 
          className="w-full h-1"
          style={{ backgroundColor: template.accentColor || '#00d4ff' }}
        ></div>
      </div>
      <div className="absolute bottom-8 right-8 w-8 h-8">
        <div 
          className="w-1 h-6 mb-2 ml-auto"
          style={{ backgroundColor: template.accentColor || '#00d4ff' }}
        ></div>
        <div 
          className="w-full h-1"
          style={{ backgroundColor: template.accentColor || '#00d4ff' }}
        ></div>
      </div>
      
      {/* Logos */}
      {template.logoPlacement === 'top' && (
        <div className="absolute top-12 left-16 right-16 flex justify-between items-center">
          {template.logo1 && (
            <img src={template.logo1.url} alt={template.logo1.name} className="h-16 w-16 object-contain" />
          )}
          {template.logo2 && (
            <img src={template.logo2.url} alt={template.logo2.name} className="h-16 w-16 object-contain" />
          )}
        </div>
      )}
      
      {/* Digital badge */}
      <div className="absolute top-16 left-1/2 transform -translate-x-1/2">
        <div 
          className="w-24 h-24 rounded-full border-2 flex items-center justify-center relative"
          style={{
            borderColor: template.accentColor || '#00d4ff',
            boxShadow: `0 0 30px ${template.accentColor || '#00d4ff'}60`,
          }}
        >
          <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor" style={{ color: template.accentColor || '#00d4ff' }}>
            <path d="M9 12L11 14L15 10M21 12C21 16.97 16.97 21 12 21C7.03 21 3 16.97 3 12C3 7.03 7.03 3 12 3C16.97 3 21 7.03 21 12Z"/>
          </svg>
          {/* Rotating ring */}
          <div 
            className="absolute inset-0 rounded-full border-2 border-transparent animate-spin"
            style={{
              borderTopColor: template.accentColor || '#00d4ff',
              animationDuration: '3s',
            }}
          ></div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex flex-col items-center pt-44 px-16">
        <h1 className={`text-5xl font-bold ${fontClass} mb-6 text-center tracking-wide`}>
          {template.title || 'Digital Certificate'}
        </h1>
        
        <div className="flex items-center mb-8">
          <div className="w-16 h-px" style={{ backgroundColor: template.accentColor || '#00d4ff' }}></div>
          <div className="mx-4 w-2 h-2 rounded-full" style={{ backgroundColor: template.accentColor || '#00d4ff' }}></div>
          <div className="w-16 h-px" style={{ backgroundColor: template.accentColor || '#00d4ff' }}></div>
        </div>
        
        <p className={`text-xl ${fontClass} mb-8 text-center font-light tracking-wide`}>
          {template.prefixText || 'This validates that'}
        </p>
        
        <h2 
          className={`text-5xl font-bold ${fontClass} mb-8 text-center tracking-wider`}
          style={{ color: template.accentColor || '#00d4ff' }}
        >
          {data.participantName}
        </h2>
        
        <div className="text-center mb-8 space-y-4">
          <p className={`text-lg ${fontClass} font-light`}>
            {template.bodyText || 'has successfully completed the technology program'}
          </p>
          <h3 className={`text-3xl font-semibold ${fontClass} tracking-wide`}>
            {data.courseName}
          </h3>
          <p className={`text-lg ${fontClass} font-light font-mono`}>
            {data.completionDate}
          </p>
        </div>
        
        <p className={`text-lg ${fontClass} text-center mb-8 max-w-3xl font-light leading-relaxed`}>
          {template.footerText || 'Verified through our secure digital platform. This certificate represents mastery of cutting-edge technology skills.'}
        </p>
        
        {/* Tech indicators */}
        <div className="flex items-center space-x-6 mb-8">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#00ff41' }}></div>
            <span className="text-sm font-mono">VERIFIED</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: template.accentColor || '#00d4ff' }}></div>
            <span className="text-sm font-mono">BLOCKCHAIN</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#ff6b6b' }}></div>
            <span className="text-sm font-mono">SECURE</span>
          </div>
        </div>
        
        {/* Hash display */}
        <div className="bg-black bg-opacity-50 rounded px-4 py-2 mb-8">
          <span className="text-sm font-mono" style={{ color: template.accentColor || '#00d4ff' }}>
            HASH: {data.certificateId.replace(/-/g, '').toLowerCase()}
          </span>
        </div>
      </div>
      
      {/* Signatures */}
      <div className="absolute bottom-16 left-16 right-16 flex justify-between items-end">
        <div className="text-center">
          {template.signature1.signatureImageUrl && (
            <img src={template.signature1.signatureImageUrl} alt="Signature 1" className="h-12 w-32 object-contain mb-2" />
          )}
          <div className="w-32 h-px mb-2" style={{ backgroundColor: template.accentColor || '#00d4ff' }}></div>
          <p className={`text-sm ${fontClass} font-semibold`} style={{ color: template.accentColor || '#00d4ff' }}>{template.signature1.name}</p>
          <p className={`text-xs ${fontClass} font-light`}>{template.signature1.title}</p>
        </div>
        
        <div className="text-center">
          {template.signature2.signatureImageUrl && (
            <img src={template.signature2.signatureImageUrl} alt="Signature 2" className="h-12 w-32 object-contain mb-2" />
          )}
          <div className="w-32 h-px mb-2" style={{ backgroundColor: template.accentColor || '#00d4ff' }}></div>
          <p className={`text-sm ${fontClass} font-semibold`} style={{ color: template.accentColor || '#00d4ff' }}>{template.signature2.name}</p>
          <p className={`text-xs ${fontClass} font-light`}>{template.signature2.title}</p>
        </div>
      </div>
      
      {/* QR Code and Certificate ID */}
      <div className="absolute bottom-8 right-16 text-center">
        <div 
          className="bg-white p-2 rounded border-2"
          style={{ borderColor: template.accentColor || '#00d4ff' }}
        >
          <QRCodeSVG value={data.certificateId} size={48} />
        </div>
        <p className="text-xs mt-2 font-mono" style={{ color: template.accentColor || '#00d4ff' }}>{data.certificateId}</p>
      </div>
      
      {/* Institution name */}
      <div className="absolute bottom-8 left-16">
        <p className={`text-sm ${fontClass} font-semibold`} style={{ color: template.accentColor || '#00d4ff' }}>{template.institutionName}</p>
      </div>
      
      {/* Bottom logos */}
      {template.logoPlacement === 'bottom' && (
        <div className="absolute bottom-24 left-16 right-16 flex justify-between items-center">
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