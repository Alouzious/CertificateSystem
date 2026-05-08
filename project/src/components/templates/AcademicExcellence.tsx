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

  const primary = template.primaryColor || '#7b0000';
  const accent = template.accentColor || '#b8860b';
  const bg = template.backgroundColor || '#fdf8f0';

  return (
    <div
      id={id}
      className="w-[1122px] h-[794px] relative overflow-hidden"
      style={{ backgroundColor: bg, color: primary, fontFamily: 'Georgia, serif' }}
    >
      {/* Thick outer border */}
      <div className="absolute inset-0" style={{ border: `10px solid ${primary}` }} />
      {/* Inner double border */}
      <div className="absolute" style={{ inset: '14px', border: `2px double ${accent}` }} />
      {/* Hairline */}
      <div className="absolute" style={{ inset: '20px', border: `0.5px solid ${accent}`, opacity: 0.4 }} />

      {/* Corner ornaments — L-bracket style */}
      {[
        { top: 8, left: 8 },
        { top: 8, right: 8 },
        { bottom: 8, left: 8 },
        { bottom: 8, right: 8 },
      ].map((pos, i) => (
        <div
          key={i}
          className="absolute select-none"
          style={{ ...pos, color: accent, fontSize: 28, lineHeight: 1 }}
        >
          ✦
        </div>
      ))}

      {/* ── CRIMSON TOP RIBBON ── */}
      <div
        className="absolute flex items-center justify-center"
        style={{ top: 26, left: '50%', transform: 'translateX(-50%)', width: 200, height: 32, backgroundColor: primary }}
      >
        <span style={{ fontSize: 11, letterSpacing: '0.25em', color: '#fff', fontWeight: 700, textTransform: 'uppercase' }}>
          Excellence
        </span>
        {/* ribbon left tail */}
        <div style={{ position: 'absolute', left: -16, top: 0, width: 0, height: 0, borderTop: '16px solid transparent', borderBottom: '16px solid transparent', borderRight: `16px solid ${primary}` }} />
        {/* ribbon right tail */}
        <div style={{ position: 'absolute', right: -16, top: 0, width: 0, height: 0, borderTop: '16px solid transparent', borderBottom: '16px solid transparent', borderLeft: `16px solid ${primary}` }} />
      </div>

      {/* ── LOGO ZONE ── */}
      {template.logoPlacement === 'top' && (template.logo1 || template.logo2) && (
        <div
          className="absolute flex items-center justify-between"
          style={{ top: 28, left: 52, right: 52, height: 52 }}
        >
          {template.logo1
            ? <img src={template.logo1.url} alt={template.logo1.name} style={{ maxHeight: 48, maxWidth: 110, objectFit: 'contain' }} />
            : <div />}
          {template.logo2
            ? <img src={template.logo2.url} alt={template.logo2.name} style={{ maxHeight: 48, maxWidth: 110, objectFit: 'contain' }} />
            : <div />}
        </div>
      )}

      {/* ── MAIN CONTENT ── */}
      <div
        className="absolute flex flex-col items-center"
        style={{ top: 26, left: 52, right: 52, bottom: 112 }}
      >
        {/* Space for ribbon + logos */}
        <div style={{ height: template.logoPlacement === 'top' && (template.logo1 || template.logo2) ? 90 : 46 }} />

        {/* Academic crest — compact */}
        <div style={{ marginBottom: 10 }}>
          <div
            style={{
              width: 60, height: 60, borderRadius: '50%',
              border: `3px solid ${primary}`,
              backgroundColor: accent,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <svg width="30" height="30" viewBox="0 0 24 24" fill="white">
              <path d="M12 3L1 9L5 11.18V17.18L12 21L19 17.18V11.18L21 10.09V17H23V9L12 3ZM18.82 9L12 12.72L5.18 9L12 5.28L18.82 9ZM17 15.99L12 18.72L7 15.99V12.27L12 15L17 12.27V15.99Z" />
            </svg>
          </div>
        </div>

        {/* Institution */}
        <p style={{ fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase', color: primary, marginBottom: 8, opacity: 0.75 }}>
          {template.institutionName}
        </p>

        {/* Title */}
        <h1
          className={fontClass}
          style={{ fontSize: 32, fontWeight: 700, color: primary, textAlign: 'center', marginBottom: 8, lineHeight: 1.2 }}
        >
          {template.title || 'Certificate of Academic Excellence'}
        </h1>

        {/* Ornate divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <div style={{ width: 50, height: 1, background: `linear-gradient(to right, transparent, ${accent})` }} />
          <span style={{ color: accent, fontSize: 16 }}>❈</span>
          <div style={{ width: 50, height: 1, background: `linear-gradient(to left, transparent, ${accent})` }} />
        </div>

        {/* Prefix */}
        <p style={{ fontSize: 14, fontStyle: 'italic', color: primary, marginBottom: 5, opacity: 0.8 }}>
          {template.prefixText || 'This is to certify that'}
        </p>

        {/* Name */}
        <h2
          className={fontClass}
          style={{ fontSize: 36, fontWeight: 700, color: accent, textAlign: 'center', marginBottom: 8, lineHeight: 1.1 }}
        >
          {data.participantName}
        </h2>

        {/* Body */}
        <p style={{ fontSize: 13, textAlign: 'center', color: primary, marginBottom: 3, maxWidth: 600, lineHeight: 1.55 }}>
          {template.bodyText || 'has successfully completed the academic program'}
        </p>

        {/* Course */}
        <h3
          className={fontClass}
          style={{ fontSize: 20, fontWeight: 600, color: primary, fontStyle: 'italic', textAlign: 'center', marginBottom: 3 }}
        >
          {data.courseName}
        </h3>

        {/* Date */}
        <p style={{ fontSize: 12, color: primary, opacity: 0.7, marginBottom: 10 }}>
          {new Date(data.completionDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        {/* Footer */}
        <p
          className={fontClass}
          style={{ fontSize: 11, fontStyle: 'italic', textAlign: 'center', color: primary, opacity: 0.65, maxWidth: 540, lineHeight: 1.6 }}
        >
          {template.footerText || 'Granted in recognition of scholarly achievement and academic distinction.'}
        </p>
      </div>

      {/* ── SIGNATURES ── */}
      <div
        className="absolute flex justify-between items-end"
        style={{ bottom: 44, left: 55, right: 55, height: 65 }}
      >
        {[template.signature1, template.signature2, template.signature3].map((sig, i) => (
          <div key={i} style={{ flex: 1, textAlign: 'center', padding: '0 10px' }}>
            {sig?.signatureImageUrl && (
              <img src={sig.signatureImageUrl} alt="" style={{ height: 32, objectFit: 'contain', display: 'block', margin: '0 auto 4px' }} />
            )}
            <div style={{ width: 80, height: 1, backgroundColor: primary, margin: '0 auto 5px', opacity: 0.5 }} />
            <p style={{ fontSize: 11, fontWeight: 600, color: primary }}>{sig?.name || `Signatory ${i + 1}`}</p>
            <p style={{ fontSize: 10, color: primary, opacity: 0.65, fontStyle: 'italic' }}>{sig?.title || 'Title'}</p>
          </div>
        ))}
      </div>

      {/* ── BOTTOM ── */}
      <div
        className="absolute flex justify-between items-center"
        style={{ bottom: 18, left: 55, right: 55 }}
      >
        <p style={{ fontSize: 9, letterSpacing: '0.08em', color: primary, opacity: 0.45, textTransform: 'uppercase' }}>
          ID: {data.certificateId}
        </p>
        <QRCodeSVG value={data.certificateId} size={42} fgColor={primary} bgColor="transparent" />
      </div>

      {/* Bottom logos */}
      {template.logoPlacement === 'bottom' && (template.logo1 || template.logo2) && (
        <div className="absolute flex items-center justify-between" style={{ bottom: 112, left: 55, right: 55, height: 50 }}>
          {template.logo1 ? <img src={template.logo1.url} alt="" style={{ maxHeight: 46, maxWidth: 110, objectFit: 'contain' }} /> : <div />}
          {template.logo2 ? <img src={template.logo2.url} alt="" style={{ maxHeight: 46, maxWidth: 110, objectFit: 'contain' }} /> : <div />}
        </div>
      )}
    </div>
  );
};