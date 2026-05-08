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

  const primary = template.primaryColor || '#1a1a1a';
  const accent = template.accentColor || '#2563eb';
  const secondary = template.secondaryColor || '#6b7280';
  const bg = template.backgroundColor || '#ffffff';

  return (
    <div
      id={id}
      className="w-[1122px] h-[794px] relative overflow-hidden"
      style={{ backgroundColor: bg, color: primary }}
    >
      {/* Outer border */}
      <div className="absolute inset-0" style={{ border: `2px solid ${primary}` }} />

      {/* Left accent column */}
      <div
        className="absolute top-0 left-0 bottom-0"
        style={{ width: 8, background: `linear-gradient(to bottom, ${accent}, ${primary})` }}
      />

      {/* Top right accent block */}
      <div
        className="absolute top-0 right-0"
        style={{ width: 120, height: 8, background: `linear-gradient(to left, ${accent}, ${primary})` }}
      />

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
              backgroundColor: '#fff',
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
              backgroundColor: '#fff',
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

      {/* ── MAIN CONTENT (left-aligned, structured) ── */}
      <div
        className="absolute flex flex-col justify-center"
        style={{ top: 0, left: 40, right: 40, bottom: 110 }}
      >

        {/* CERTIFICATE label */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
          <div style={{ width: 32, height: 2, backgroundColor: accent }} />
          <span style={{ fontSize: 11, letterSpacing: '0.25em', textTransform: 'uppercase', color: accent, fontWeight: 600 }}>
            Certificate of Achievement
          </span>
        </div>

        {/* Institution */}
        <p style={{ fontSize: 13, letterSpacing: '0.12em', textTransform: 'uppercase', color: secondary, marginBottom: 10, fontWeight: 500 }}>
          {template.institutionName}
        </p>

        {/* Large title */}
        <h1
          className={fontClass}
          style={{ fontSize: 52, fontWeight: 300, color: primary, marginBottom: 18, lineHeight: 1.1, letterSpacing: '-0.01em' }}
        >
          {template.title || 'Certificate'}
        </h1>

        {/* Thin divider */}
        <div style={{ width: 48, height: 2, backgroundColor: accent, marginBottom: 20 }} />

        {/* Prefix */}
        <p style={{ fontSize: 14, color: secondary, marginBottom: 6, fontStyle: 'italic' }}>
          {template.prefixText || 'This is to certify that'}
        </p>

        {/* Name — large, bold */}
        <h2
          className={fontClass}
          style={{ fontSize: 44, fontWeight: 700, color: accent, marginBottom: 14, lineHeight: 1.1, letterSpacing: '0.01em' }}
        >
          {data.participantName}
        </h2>

        {/* Body */}
        <p style={{ fontSize: 14, color: secondary, marginBottom: 4, maxWidth: 600, lineHeight: 1.6 }}>
          {template.bodyText || 'has successfully completed'}
        </p>

        {/* Course */}
        <h3
          className={fontClass}
          style={{ fontSize: 24, fontWeight: 600, color: primary, marginBottom: 4 }}
        >
          {data.courseName}
        </h3>

        {/* Date */}
        <p style={{ fontSize: 13, color: secondary, marginBottom: 18 }}>
          {new Date(data.completionDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        {/* Footer */}
        <p style={{ fontSize: 12, color: secondary, maxWidth: 520, lineHeight: 1.65, fontStyle: 'italic' }}>
          {template.footerText || 'In recognition of outstanding achievement and dedication.'}
        </p>
      </div>

      {/* ── SIGNATURES ── */}
      <div
        className="absolute flex justify-between items-end"
        style={{ bottom: 42, left: 40, right: 40, height: 64 }}
      >
        {[template.signature1, template.signature2, template.signature3].map((sig, i) => (
          <div key={i} style={{ flex: 1, textAlign: 'center', padding: '0 10px' }}>
            {sig?.signatureImageUrl && (
              <img src={sig.signatureImageUrl} alt="" style={{ height: 32, objectFit: 'contain', display: 'block', margin: '0 auto 4px' }} />
            )}
            <div style={{ width: 72, height: 1, backgroundColor: primary, margin: '0 auto 5px', opacity: 0.4 }} />
            <p style={{ fontSize: 11, fontWeight: 600, color: primary }}>{sig?.name || `Signatory ${i + 1}`}</p>
            <p style={{ fontSize: 10, color: secondary }}>{sig?.title || 'Title'}</p>
          </div>
        ))}
      </div>

      {/* ── BOTTOM BAR ── */}
      <div
        className="absolute flex justify-between items-center"
        style={{ bottom: 14, left: 40, right: 40 }}
      >
        <p style={{ fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: secondary, opacity: 0.6 }}>
          ID: {data.certificateId}
        </p>
        <QRCodeSVG value={data.certificateId} size={40} fgColor={primary} bgColor="transparent" />
      </div>

      {/* Bottom logos */}
      {template.logoPlacement === 'bottom' && (template.logo1 || template.logo2) && (
        <div className="absolute flex items-center justify-between" style={{ bottom: 110, left: 40, right: 40, height: 50 }}>
          {template.logo1 ? <img src={template.logo1.url} alt="" style={{ maxHeight: 46, maxWidth: 110, objectFit: 'contain' }} /> : <div />}
          {template.logo2 ? <img src={template.logo2.url} alt="" style={{ maxHeight: 46, maxWidth: 110, objectFit: 'contain' }} /> : <div />}
        </div>
      )}
    </div>
  );
};