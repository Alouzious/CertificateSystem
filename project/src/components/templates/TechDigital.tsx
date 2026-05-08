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

  const accent = template.accentColor || '#3b82f6';
  const bg = template.backgroundColor || '#0f172a';
  const secondary = template.secondaryColor || '#1e293b';

  return (
    <div
      id={id}
      className="w-[1122px] h-[794px] relative overflow-hidden"
      style={{ backgroundColor: bg, color: '#f1f5f9' }}
    >
      {/* Subtle dot-grid background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)`,
          backgroundSize: '28px 28px',
        }}
      />

      {/* Dark gradient overlay — gives depth */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at 70% 20%, ${secondary}cc 0%, transparent 60%)`,
        }}
      />

      {/* Outer border */}
      <div className="absolute inset-0" style={{ border: `1.5px solid rgba(255,255,255,0.12)` }} />

      {/* Accent border inset */}
      <div className="absolute" style={{ inset: '8px', border: `1px solid ${accent}22` }} />

      {/* Top accent bar */}
      <div
        className="absolute top-0 left-0 right-0"
        style={{ height: 4, background: `linear-gradient(90deg, ${bg}, ${accent}, ${bg})` }}
      />

      {/* Geometric corner brackets — no glow */}
      {/* Top-left */}
      <div className="absolute" style={{ top: 18, left: 18 }}>
        <div style={{ width: 24, height: 2, backgroundColor: accent }} />
        <div style={{ width: 2, height: 22, backgroundColor: accent }} />
      </div>
      {/* Top-right */}
      <div className="absolute" style={{ top: 18, right: 18 }}>
        <div style={{ width: 24, height: 2, backgroundColor: accent, marginLeft: 'auto' }} />
        <div style={{ width: 2, height: 22, backgroundColor: accent, marginLeft: 'auto' }} />
      </div>
      {/* Bottom-left */}
      <div className="absolute" style={{ bottom: 18, left: 18 }}>
        <div style={{ width: 2, height: 22, backgroundColor: accent }} />
        <div style={{ width: 24, height: 2, backgroundColor: accent }} />
      </div>
      {/* Bottom-right */}
      <div className="absolute" style={{ bottom: 18, right: 18 }}>
        <div style={{ width: 2, height: 22, backgroundColor: accent, marginLeft: 'auto' }} />
        <div style={{ width: 24, height: 2, backgroundColor: accent, marginLeft: 'auto' }} />
      </div>

      {/* ── LOGO ZONE ── */}
      {template.logoPlacement === 'top' && (template.logo1 || template.logo2) && (
        <div
          className="absolute flex items-center justify-between"
          style={{ top: 26, left: 55, right: 55, height: 56 }}
        >
          {template.logo1
            ? <img src={template.logo1.url} alt={template.logo1.name} style={{ maxHeight: 50, maxWidth: 120, objectFit: 'contain', filter: 'brightness(0) invert(1) opacity(0.85)' }} />
            : <div />}
          {template.logo2
            ? <img src={template.logo2.url} alt={template.logo2.name} style={{ maxHeight: 50, maxWidth: 120, objectFit: 'contain', filter: 'brightness(0) invert(1) opacity(0.85)' }} />
            : <div />}
        </div>
      )}

      {/* ── MAIN CONTENT ── */}
      <div
        className="absolute flex flex-col items-center"
        style={{ top: 14, left: 55, right: 55, bottom: 112 }}
      >
        {/* Spacer */}
        <div style={{ height: template.logoPlacement === 'top' && (template.logo1 || template.logo2) ? 88 : 38 }} />

        {/* Verified badge — clean, no glow */}
        <div style={{ marginBottom: 14 }}>
          <div
            style={{
              width: 60, height: 60, borderRadius: '50%',
              border: `2px solid ${accent}`,
              backgroundColor: `${accent}18`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
        </div>

        {/* Institution */}
        <p style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: accent, marginBottom: 8, opacity: 0.85 }}>
          {template.institutionName}
        </p>

        {/* Title */}
        <h1
          className={fontClass}
          style={{ fontSize: 36, fontWeight: 700, color: '#f1f5f9', textAlign: 'center', marginBottom: 8, lineHeight: 1.15, letterSpacing: '0.01em' }}
        >
          {template.title || 'Digital Certificate'}
        </h1>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
          <div style={{ width: 50, height: 1, backgroundColor: accent, opacity: 0.5 }} />
          <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: accent }} />
          <div style={{ width: 50, height: 1, backgroundColor: accent, opacity: 0.5 }} />
        </div>

        {/* Prefix */}
        <p style={{ fontSize: 14, color: 'rgba(241,245,249,0.6)', marginBottom: 6, fontStyle: 'italic', letterSpacing: '0.02em' }}>
          {template.prefixText || 'This is to certify that'}
        </p>

        {/* Name */}
        <h2
          className={fontClass}
          style={{ fontSize: 40, fontWeight: 700, color: accent, textAlign: 'center', marginBottom: 10, lineHeight: 1.1, letterSpacing: '0.02em' }}
        >
          {data.participantName}
        </h2>

        {/* Body */}
        <p style={{ fontSize: 14, color: 'rgba(241,245,249,0.7)', textAlign: 'center', marginBottom: 4, maxWidth: 580, lineHeight: 1.55 }}>
          {template.bodyText || 'has successfully completed the technology program'}
        </p>

        {/* Course */}
        <h3
          className={fontClass}
          style={{ fontSize: 22, fontWeight: 600, color: '#f1f5f9', textAlign: 'center', marginBottom: 4 }}
        >
          {data.courseName}
        </h3>

        {/* Date */}
        <p style={{ fontSize: 13, color: 'rgba(241,245,249,0.55)', marginBottom: 12, fontFamily: 'monospace' }}>
          {new Date(data.completionDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        {/* Footer */}
        <p style={{ fontSize: 12, color: 'rgba(241,245,249,0.45)', textAlign: 'center', maxWidth: 520, lineHeight: 1.65, fontStyle: 'italic' }}>
          {template.footerText || 'Issued in recognition of demonstrated expertise and successful completion of the program.'}
        </p>
      </div>

      {/* ── SIGNATURES ── */}
      <div
        className="absolute flex justify-between items-end"
        style={{ bottom: 42, left: 55, right: 55, height: 68 }}
      >
        {[template.signature1, template.signature2, template.signature3].map((sig, i) => (
          <div key={i} style={{ flex: 1, textAlign: 'center', padding: '0 10px' }}>
            {sig?.signatureImageUrl && (
              <img src={sig.signatureImageUrl} alt="" style={{ height: 32, objectFit: 'contain', display: 'block', margin: '0 auto 4px', filter: 'brightness(0) invert(1) opacity(0.8)' }} />
            )}
            <div style={{ width: 80, height: 1, backgroundColor: accent, margin: '0 auto 5px', opacity: 0.5 }} />
            <p style={{ fontSize: 11, fontWeight: 600, color: accent }}>{sig?.name || `Signatory ${i + 1}`}</p>
            <p style={{ fontSize: 10, color: 'rgba(241,245,249,0.45)' }}>{sig?.title || 'Title'}</p>
          </div>
        ))}
      </div>

      {/* ── BOTTOM ── */}
      <div
        className="absolute flex justify-between items-center"
        style={{ bottom: 15, left: 55, right: 55 }}
      >
        <p style={{ fontSize: 9, letterSpacing: '0.12em', color: accent, opacity: 0.4, textTransform: 'uppercase', fontFamily: 'monospace' }}>
          ID: {data.certificateId}
        </p>
        <div style={{ backgroundColor: '#fff', padding: 3, borderRadius: 2 }}>
          <QRCodeSVG value={data.certificateId} size={40} fgColor={bg} />
        </div>
      </div>

      {/* Bottom logos */}
      {template.logoPlacement === 'bottom' && (template.logo1 || template.logo2) && (
        <div className="absolute flex items-center justify-between" style={{ bottom: 112, left: 55, right: 55, height: 50 }}>
          {template.logo1 ? <img src={template.logo1.url} alt="" style={{ maxHeight: 46, maxWidth: 110, objectFit: 'contain', filter: 'brightness(0) invert(1) opacity(0.8)' }} /> : <div />}
          {template.logo2 ? <img src={template.logo2.url} alt="" style={{ maxHeight: 46, maxWidth: 110, objectFit: 'contain', filter: 'brightness(0) invert(1) opacity(0.8)' }} /> : <div />}
        </div>
      )}
    </div>
  );
};