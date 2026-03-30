import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { CertificateTemplate, CertificateData } from '../../types';

interface CertificateTemplateProps {
  template: CertificateTemplate;
  data: CertificateData;
  id?: string;
}

export const AcademicExcellence: React.FC<CertificateTemplateProps> = ({ template, data, id }) => {
  const fontClass = {
    serif: 'certificate-serif',
    'sans-serif': 'certificate-sans',
    script: 'certificate-script',
  }[template.fontFamily] || 'certificate-serif';

  return (
    <div
      id={id}
      className="w-[1122px] h-[794px] relative"
      style={{
        backgroundColor: template.backgroundColor || '#f8f7f4',
        color: template.primaryColor || '#2c1810',
      }}
    >
      {/* Ornate border */}
      <div className="absolute inset-4 border-8 border-double" style={{ borderColor: template.primaryColor || '#8b0000' }}>
        <div className="absolute inset-2 border-2" style={{ borderColor: template.accentColor || '#b8860b' }}></div>
      </div>
      
      {/* Corner decorative elements */}
      <div className="absolute top-2 left-2 w-16 h-16" style={{ color: template.accentColor || '#b8860b' }}>
        <svg viewBox="0 0 100 100" fill="currentColor">
          <path d="M10 10 L90 10 L90 30 L30 30 L30 90 L10 90 Z"/>
          <circle cx="50" cy="50" r="15" fill="none" stroke="currentColor" strokeWidth="2"/>
        </svg>
      </div>
      <div className="absolute top-2 right-2 w-16 h-16 rotate-90" style={{ color: template.accentColor || '#b8860b' }}>
        <svg viewBox="0 0 100 100" fill="currentColor">
          <path d="M10 10 L90 10 L90 30 L30 30 L30 90 L10 90 Z"/>
          <circle cx="50" cy="50" r="15" fill="none" stroke="currentColor" strokeWidth="2"/>
        </svg>
      </div>
      <div className="absolute bottom-2 left-2 w-16 h-16 -rotate-90" style={{ color: template.accentColor || '#b8860b' }}>
        <svg viewBox="0 0 100 100" fill="currentColor">
          <path d="M10 10 L90 10 L90 30 L30 30 L30 90 L10 90 Z"/>
          <circle cx="50" cy="50" r="15" fill="none" stroke="currentColor" strokeWidth="2"/>
        </svg>
      </div>
      <div className="absolute bottom-2 right-2 w-16 h-16 rotate-180" style={{ color: template.accentColor || '#b8860b' }}>
        <svg viewBox="0 0 100 100" fill="currentColor">
          <path d="M10 10 L90 10 L90 30 L30 30 L30 90 L10 90 Z"/>
          <circle cx="50" cy="50" r="15" fill="none" stroke="currentColor" strokeWidth="2"/>
        </svg>
      </div>
      
      {/* Red ribbon accent */}
      <div 
        className="absolute top-20 left-1/2 transform -translate-x-1/2 w-64 h-12 flex items-center justify-center"
        style={{ backgroundColor: template.primaryColor || '#8b0000' }}
      >
        <span className="font-bold text-lg tracking-wider" style={{ color: '#ffffff', textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>EXCELLENCE</span>
        {/* Ribbon tails */}
        <div 
          className="absolute -left-6 top-0 w-0 h-0 border-transparent"
          style={{ 
            borderTopWidth: '24px', 
            borderBottomWidth: '24px', 
            borderRightWidth: '24px',
            borderRightColor: template.primaryColor || '#8b0000' 
          }}
        ></div>
        <div 
          className="absolute -right-6 top-0 w-0 h-0 border-transparent"
          style={{ 
            borderTopWidth: '24px', 
            borderBottomWidth: '24px', 
            borderLeftWidth: '24px',
            borderLeftColor: template.primaryColor || '#8b0000' 
          }}
        ></div>
      </div>
      
      {/* Logos */}
      {template.logoPlacement === 'top' && (
        <div className="absolute top-8 left-16 right-16 flex justify-between items-center">
          {template.logo1 && (
            <img src={template.logo1.url} alt={template.logo1.name} className="h-16 w-16 object-contain" />
          )}
          {template.logo2 && (
            <img src={template.logo2.url} alt={template.logo2.name} className="h-16 w-16 object-contain" />
          )}
        </div>
      )}
      
      {/* Academic crest */}
      <div className="flex flex-col items-center pt-40 px-16">
        <div className="w-32 h-32 mb-8 relative">
          <div 
            className="w-full h-full rounded-full border-4 flex items-center justify-center"
            style={{ borderColor: template.primaryColor || '#8b0000', backgroundColor: template.accentColor || '#b8860b' }}
          >
            <svg width="64" height="64" viewBox="0 0 24 24" fill="white">
              <path d="M12 3L1 9L5 11.18V17.18L12 21L19 17.18V11.18L21 10.09V17H23V9L12 3ZM18.82 9L12 12.72L5.18 9L12 5.28L18.82 9ZM17 15.99L12 18.72L7 15.99V12.27L12 15L17 12.27V15.99Z"/>
            </svg>
          </div>
        </div>
        
        <h1 className={`text-5xl font-bold ${fontClass} mb-4 text-center`} style={{ color: template.primaryColor || '#8b0000' }}>
          {template.title || 'Certificate of Academic Excellence'}
        </h1>
        
        <div className="flex items-center mb-8">
          <div className="w-16 h-1 bg-gradient-to-r" style={{ 
            background: `linear-gradient(to right, ${template.primaryColor || '#8b0000'}, ${template.accentColor || '#b8860b'})` 
          }}></div>
          <div className="mx-4 text-2xl" style={{ color: template.accentColor || '#b8860b' }}>❈</div>
          <div className="w-16 h-1 bg-gradient-to-l" style={{ 
            background: `linear-gradient(to left, ${template.primaryColor || '#8b0000'}, ${template.accentColor || '#b8860b'})` 
          }}></div>
        </div>
        
        <p className={`text-xl ${fontClass} mb-8 text-center italic`}>
          {template.prefixText || 'This is to certify that'}
        </p>
        
        <h2 className={`text-4xl font-bold ${fontClass} mb-6 text-center`} style={{ color: template.accentColor || '#b8860b' }}>
          {data.participantName}
        </h2>
        
        <div className="text-center mb-8 space-y-3">
          <p className={`text-lg ${fontClass}`}>
            {template.bodyText || 'has successfully completed the academic program'}
          </p>
          <h3 className={`text-2xl font-semibold ${fontClass} italic`} style={{ color: template.primaryColor || '#8b0000' }}>
            {data.courseName}
          </h3>
          <p className={`text-lg ${fontClass}`}>
            on the {data.completionDate}
          </p>
        </div>
        
        <p className={`text-lg ${fontClass} text-center mb-6 max-w-3xl italic`}>
          {template.footerText || 'Granted in recognition of scholarly achievement and academic distinction, with all the rights and privileges pertaining thereto.'}
        </p>
        
        {/* Academic seals */}
        <div className="flex space-x-8 mb-8">
          <div className="w-12 h-12 rounded-full border-2 flex items-center justify-center" style={{ borderColor: template.primaryColor || '#8b0000' }}>
            <span className="text-xs font-bold" style={{ color: template.primaryColor || '#8b0000' }}>SEAL</span>
          </div>
          <div className="w-12 h-12 rounded-full border-2 flex items-center justify-center" style={{ borderColor: template.accentColor || '#b8860b' }}>
            <span className="text-xs font-bold" style={{ color: template.accentColor || '#b8860b' }}>SEAL</span>
          </div>
        </div>
      </div>
      
      {/* Signatures */}
      <div className="absolute bottom-16 left-16 right-16 flex justify-between items-end">
        <div className="text-center">
          {template.signature1.signatureImageUrl && (
            <img src={template.signature1.signatureImageUrl} alt="Signature 1" className="h-12 w-32 object-contain mb-2" />
          )}
          <div className="w-32 h-0.5 mb-2" style={{ backgroundColor: template.primaryColor || '#8b0000' }}></div>
          <p className={`text-sm ${fontClass} font-semibold`} style={{ color: template.primaryColor || '#8b0000' }}>{template.signature1.name}</p>
          <p className={`text-xs ${fontClass} italic`}>{template.signature1.title}</p>
        </div>
        
        <div className="text-center">
          {template.signature2.signatureImageUrl && (
            <img src={template.signature2.signatureImageUrl} alt="Signature 2" className="h-12 w-32 object-contain mb-2" />
          )}
          <div className="w-32 h-0.5 mb-2" style={{ backgroundColor: template.primaryColor || '#8b0000' }}></div>
          <p className={`text-sm ${fontClass} font-semibold`} style={{ color: template.primaryColor || '#8b0000' }}>{template.signature2.name}</p>
          <p className={`text-xs ${fontClass} italic`}>{template.signature2.title}</p>
        </div>
      </div>
      
      {/* QR Code and Certificate ID */}
      <div className="absolute bottom-8 right-16 text-center">
        <QRCodeSVG value={data.certificateId} size={48} />
        <p className="text-xs mt-1 font-mono">{data.certificateId}</p>
      </div>
      
      {/* Institution name */}
      <div className="absolute bottom-8 left-16">
        <p className={`text-sm ${fontClass} font-semibold`} style={{ color: template.primaryColor || '#8b0000' }}>{template.institutionName}</p>
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