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

  const primary = template.primaryColor || '#0f1b35';
  const accent = template.accentColor || '#c9a84c';
  const bg = template.backgroundColor || '#fefcf3';

  return (
    <div
      id={id}
      className="w-[1122px] h-[794px] relative overflow-hidden"
      style={{ backgroundColor: bg, color: primary, fontFamily: 'Georgia, serif' }}
    >
      {/* Outer border — thick double */}
      <div
        className="absolute inset-0"
        style={{ border: `14px double ${primary}` }}
      />
      {/* Inner gold hairline */}
      <div
        className="absolute"
        style={{ inset: '20px', border: `2px solid ${accent}` }}
      />

      {/* Corner ornaments */}
      {[
        { top: 6, left: 6 },
        { top: 6, right: 6 },
        { bottom: 6, left: 6 },
        { bottom: 6, right: 6 },
      ].map((pos, i) => (
        <div
          key={i}
          className="absolute text-3xl leading-none select-none"
          style={{ ...pos, color: accent, lineHeight: 1 }}
        >
          ❧
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

      {/* ── MAIN CONTENT ZONE (y: 28→640) ── */}
      <div
        className="absolute flex flex-col items-center"
        style={{ top: 28, left: 50, right: 50, bottom: 120 }}
      >
        {template.logoPlacement === 'top' && (template.logo1 || template.logo2) && (
          <div style={{ height: 68 }} />
        )}

        {/* Crest */}
        <div style={{ marginTop: 16, marginBottom: 12 }}>
          <div
            style={{
              width: 68, height: 68,
              borderRadius: '50%',
              border: `3px solid ${primary}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              backgroundColor: bg,
            }}
          >
            <div
              style={{
                width: 52, height: 52,
                borderRadius: '50%',
                backgroundColor: primary,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <svg width="30" height="30" viewBox="0 0 24 24" fill={bg}>
                <path d="M12 2L3.09 8.26L12 22L20.91 8.26L12 2Z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Institution name */}
        <p style={{ fontSize: 13, letterSpacing: '0.18em', textTransform: 'uppercase', color: primary, marginBottom: 6 }}>
          {template.institutionName}
        </p>

        {/* Title */}
        <h1 style={{ fontSize: 36, fontWeight: 700, textAlign: 'center', color: primary, marginBottom: 8, lineHeight: 1.15 }}>
          {template.title || 'Certificate of Achievement'}
        </h1>

        {/* Gold divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
          <div style={{ width: 80, height: 1.5, background: `linear-gradient(to right, transparent, ${accent})` }} />
          <span style={{ color: accent, fontSize: 18 }}>✦</span>
          <div style={{ width: 80, height: 1.5, background: `linear-gradient(to left, transparent, ${accent})` }} />
        </div>

        {/* Prefix */}
        <p style={{ fontSize: 15, fontStyle: 'italic', marginBottom: 6, color: primary, opacity: 0.85 }}>
          {template.prefixText || 'This is to certify that'}
        </p>

        {/* Participant name */}
        <h2 style={{ fontSize: 38, fontWeight: 700, color: accent, marginBottom: 10, textAlign: 'center', lineHeight: 1.1 }}>
          {data.participantName}
        </h2>

        {/* Body text */}
        <p style={{ fontSize: 14, textAlign: 'center', marginBottom: 4, maxWidth: 640, lineHeight: 1.6 }}>
          {template.bodyText || 'has successfully completed the course'}
        </p>

        {/* Course name */}
        <h3 style={{ fontSize: 22, fontWeight: 600, textAlign: 'center', marginBottom: 4, color: primary }}>
          {data.courseName}
        </h3>

        {/* Date */}
        <p style={{ fontSize: 13, marginBottom: 14, opacity: 0.75 }}>
          {new Date(data.completionDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        {/* Footer text */}
        <p style={{ fontSize: 12, fontStyle: 'italic', textAlign: 'center', maxWidth: 560, lineHeight: 1.55, color: primary, opacity: 0.7 }}>
          {template.footerText || 'In recognition of dedication and achievement in the field of study.'}
        </p>
      </div>

      {/* ── SIGNATURES (absolute, bottom 100px zone) ── */}
      <div
        className="absolute flex justify-between items-end"
        style={{ bottom: 44, left: 60, right: 60, height: 72 }}
      >
        {[template.signature1, template.signature2, template.signature3].map((sig, i) => (
          <div key={i} style={{ flex: 1, textAlign: 'center', padding: '0 12px' }}>
            {sig?.signatureImageUrl && (
              <img src={sig.signatureImageUrl} alt="" style={{ height: 36, objectFit: 'contain', marginBottom: 4, display: 'block', margin: '0 auto 4px' }} />
            )}
            <div style={{ width: 80, height: 1, backgroundColor: primary, margin: '0 auto 4px', opacity: 0.6 }} />
            <p style={{ fontSize: 11, fontWeight: 600, color: primary }}>{sig?.name || `Signatory ${i + 1}`}</p>
            <p style={{ fontSize: 10, color: primary, opacity: 0.7, fontStyle: 'italic' }}>{sig?.title || 'Title'}</p>
          </div>
        ))}
      </div>

      {/* ── BOTTOM BAR ── */}
      <div className="absolute" style={{ bottom: 26, left: 50, right: 50, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <p style={{ fontSize: 9, letterSpacing: '0.1em', color: primary, opacity: 0.5, textTransform: 'uppercase' }}>
            Certificate ID
          </p>
          <p style={{ fontSize: 10, fontFamily: 'monospace', color: primary, opacity: 0.65 }}>{data.certificateId}</p>
        </div>
        <QRCodeSVG value={data.certificateId} size={44} fgColor={primary} bgColor="transparent" />
      </div>

      {/* Bottom logos */}
      {template.logoPlacement === 'bottom' && (template.logo1 || template.logo2) && (
        <div className="absolute flex items-center justify-between" style={{ bottom: 100, left: 50, right: 50, height: 50 }}>
          {template.logo1 ? <img src={template.logo1.url} alt="" style={{ maxHeight: 46, maxWidth: 100, objectFit: 'contain' }} /> : <div />}
          {template.logo2 ? <img src={template.logo2.url} alt="" style={{ maxHeight: 46, maxWidth: 100, objectFit: 'contain' }} /> : <div />}
        </div>
      )}
    </div>
  );
};