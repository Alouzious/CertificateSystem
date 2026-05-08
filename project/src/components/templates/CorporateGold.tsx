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

  const primary = template.primaryColor || '#0f1b35';
  const accent = template.accentColor || '#c9a84c';
  const secondary = template.secondaryColor || '#1a2c50';
  const bg = template.backgroundColor || '#0f1b35';

  return (
    <div
      id={id}
      className="w-[1122px] h-[794px] relative overflow-hidden"
      style={{
        background: `linear-gradient(155deg, ${bg} 0%, ${secondary} 60%, ${bg} 100%)`,
        color: '#ffffff',
      }}
    >
      {/* Gold top bar */}
      <div
        className="absolute top-0 left-0 right-0"
        style={{ height: 6, background: `linear-gradient(90deg, transparent, ${accent}, ${accent}, transparent)` }}
      />
      {/* Gold bottom bar */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{ height: 6, background: `linear-gradient(90deg, transparent, ${accent}, ${accent}, transparent)` }}
      />

      {/* Outer gold border */}
      <div className="absolute" style={{ inset: '12px', border: `1.5px solid ${accent}`, opacity: 0.7 }} />
      {/* Inner border */}
      <div className="absolute" style={{ inset: '18px', border: `0.5px solid ${accent}`, opacity: 0.3 }} />

      {/* Diamond corner marks */}
      {[
        { top: 22, left: 22 },
        { top: 22, right: 22 },
        { bottom: 22, left: 22 },
        { bottom: 22, right: 22 },
      ].map((pos, i) => (
        <div
          key={i}
          className="absolute text-lg select-none"
          style={{ ...pos, color: accent, lineHeight: 1 }}
        >
          ◆
        </div>
      ))}

      {/* ── LOGO ZONE (top) ── */}
      {template.logoPlacement === 'top' && (template.logo1 || template.logo2) && (
        <div
          className="absolute flex items-center justify-between"
          style={{ top: 20, left: 52, right: 52, height: 100 }}
        >
          {template.logo1 ? (
            <div style={{
              width: 80, height: 80, borderRadius: '50%',
              border: `3px solid ${accent}`,
              backgroundColor: '#ffffff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              overflow: 'hidden',
              boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
              flexShrink: 0,
            }}>
              <img
                src={template.logo1.url}
                alt={template.logo1.name}
                style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 8, boxSizing: 'border-box' }}
              />
            </div>
          ) : <div />}

          {template.logo2 ? (
            <div style={{
              width: 80, height: 80, borderRadius: '50%',
              border: `3px solid ${accent}`,
              backgroundColor: '#ffffff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              overflow: 'hidden',
              boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
              flexShrink: 0,
            }}>
              <img
                src={template.logo2.url}
                alt={template.logo2.name}
                style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 8, boxSizing: 'border-box' }}
              />
            </div>
          ) : <div />}
        </div>
      )}

      {/* ── MAIN CONTENT ── */}
      <div
        className="absolute flex flex-col items-center"
        style={{ top: 14, left: 55, right: 55, bottom: 110 }}
      >

        {/* Gold seal — inline (no absolute, no overlap) */}
        <div style={{ marginBottom: 14 }}>
          <div
            style={{
              width: 72, height: 72, borderRadius: '50%',
              background: `radial-gradient(circle at 35% 35%, ${accent}, #8b6914)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: `0 2px 8px rgba(0,0,0,0.4)`,
            }}
          >
            <div
              style={{
                width: 54, height: 54, borderRadius: '50%',
                backgroundColor: primary,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill={accent}>
                <path d="M12 2L15.09 8.26L22 9L17 14.74L18.18 22L12 18.77L5.82 22L7 14.74L2 9L8.91 8.26L12 2Z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Institution */}
        <p style={{ fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: accent, marginBottom: 10, opacity: 0.9 }}>
          {template.institutionName}
        </p>

        {/* Title */}
        <h1
          className={fontClass}
          style={{ fontSize: 36, fontWeight: 700, color: accent, textAlign: 'center', marginBottom: 10, lineHeight: 1.15 }}
        >
          {template.title || 'Certificate of Excellence'}
        </h1>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
          <div style={{ width: 60, height: 1, backgroundColor: accent, opacity: 0.6 }} />
          <span style={{ color: accent, fontSize: 14 }}>◇</span>
          <div style={{ width: 60, height: 1, backgroundColor: accent, opacity: 0.6 }} />
        </div>

        {/* Prefix */}
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)', fontStyle: 'italic', marginBottom: 6 }}>
          {template.prefixText || 'This is to certify that'}
        </p>

        {/* Name */}
        <h2
          className={fontClass}
          style={{ fontSize: 38, fontWeight: 700, color: accent, textAlign: 'center', marginBottom: 10, lineHeight: 1.1 }}
        >
          {data.participantName}
        </h2>

        {/* Body */}
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)', textAlign: 'center', marginBottom: 4, maxWidth: 580, lineHeight: 1.55 }}>
          {template.bodyText || 'has demonstrated exceptional performance in'}
        </p>

        {/* Course */}
        <h3
          className={fontClass}
          style={{ fontSize: 22, fontWeight: 600, color: '#ffffff', textAlign: 'center', marginBottom: 4 }}
        >
          {data.courseName}
        </h3>

        {/* Date */}
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', marginBottom: 12 }}>
          {new Date(data.completionDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        {/* Footer */}
        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', textAlign: 'center', maxWidth: 540, lineHeight: 1.6, fontStyle: 'italic' }}>
          {template.footerText || 'Awarded in recognition of outstanding achievement and professional excellence.'}
        </p>
      </div>

      {/* ── SIGNATURES ── */}
      <div
        className="absolute flex justify-between items-end"
        style={{ bottom: 42, left: 55, right: 55, height: 65 }}
      >
        {[template.signature1, template.signature2, template.signature3].map((sig, i) => (
          <div key={i} style={{ flex: 1, textAlign: 'center', padding: '0 10px' }}>
            {sig?.signatureImageUrl && (
              <img src={sig.signatureImageUrl} alt="" style={{ height: 32, objectFit: 'contain', display: 'block', margin: '0 auto 4px', filter: 'brightness(0) invert(1)' }} />
            )}
            <div style={{ width: 80, height: 1, backgroundColor: accent, margin: '0 auto 5px', opacity: 0.7 }} />
            <p style={{ fontSize: 11, fontWeight: 600, color: accent }}>{sig?.name || `Signatory ${i + 1}`}</p>
            <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.55)' }}>{sig?.title || 'Title'}</p>
          </div>
        ))}
      </div>

      {/* ── BOTTOM ── */}
      <div
        className="absolute flex justify-between items-center"
        style={{ bottom: 16, left: 55, right: 55 }}
      >
        <p style={{ fontSize: 9, letterSpacing: '0.1em', color: accent, opacity: 0.55, textTransform: 'uppercase' }}>
          ID: {data.certificateId}
        </p>
        <div style={{ backgroundColor: '#fff', padding: 4, borderRadius: 3 }}>
          <QRCodeSVG value={data.certificateId} size={40} fgColor={primary} />
        </div>
      </div>

      {/* Bottom logos */}
      {template.logoPlacement === 'bottom' && (template.logo1 || template.logo2) && (
        <div className="absolute flex items-center justify-between" style={{ bottom: 110, left: 55, right: 55, height: 50 }}>
          {template.logo1 ? <img src={template.logo1.url} alt="" style={{ maxHeight: 46, maxWidth: 110, objectFit: 'contain', filter: 'brightness(0) invert(1)' }} /> : <div />}
          {template.logo2 ? <img src={template.logo2.url} alt="" style={{ maxHeight: 46, maxWidth: 110, objectFit: 'contain', filter: 'brightness(0) invert(1)' }} /> : <div />}
        </div>
      )}
    </div>
  );
};