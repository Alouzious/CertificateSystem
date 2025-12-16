import { CertificateTemplate, CertificateData } from '../types';

interface CertificateProps {
  template: CertificateTemplate;
  data: CertificateData;
  id?: string;
}

const Certificate = ({ template, data, id = 'certificate' }: CertificateProps) => {
  const getBorderStyle = () => {
    const baseStyle = 'absolute inset-0';

    switch (template.borderStyle) {
      case 'classic':
        return `${baseStyle} border-8 border-double`;
      case 'modern':
        return `${baseStyle} border-4`;
      case 'elegant':
        return `${baseStyle} border-[12px]`;
      case 'simple':
        return `${baseStyle} border-2`;
      default:
        return `${baseStyle} border-4`;
    }
  };

  const getInnerBorderStyle = () => {
    if (template.borderStyle === 'elegant') {
      return 'absolute inset-4 border-2 border-opacity-30';
    }
    if (template.borderStyle === 'classic') {
      return 'absolute inset-6 border-4 border-opacity-40';
    }
    return '';
  };

  // Render complete text: prefix + styled name + body
  const renderBodyWithStyledName = () => {
    const prefix = template.prefixText || '';
    const body = template.bodyText;
    
    return (
      <>
        {prefix && <span>{prefix} </span>}
        <span
          className="inline-block text-5xl font-serif font-bold italic mx-2 my-1"
          style={{ 
            color: template.accentColor,
            textShadow: '0 1px 2px rgba(0,0,0,0.1)',
            letterSpacing: '0.02em'
          }}
        >
          {data.participantName}
        </span>
        <span> {body}</span>
      </>
    );
  };

  return (
    <div
      id={id}
      className="relative w-[1122px] h-[794px] p-16"
      style={{ backgroundColor: template.backgroundColor }}
    >
      <div
        className={getBorderStyle()}
        style={{ borderColor: template.primaryColor }}
      />
      {getInnerBorderStyle() && (
        <div
          className={getInnerBorderStyle()}
          style={{ borderColor: template.accentColor }}
        />
      )}

      <div className="relative z-10 flex flex-col items-center justify-between h-full">
        <div className="text-center space-y-3 flex-shrink-0 mt-4">
          {template.logoUrl && (
            <img
              src={template.logoUrl}
              alt="Institution Logo"
              className="w-28 h-28 mx-auto object-cover mb-3 rounded-full"
            />
          )}
          <h1
            className="text-5xl font-serif font-bold tracking-wide"
            style={{ color: template.primaryColor }}
          >
            {template.institutionName}
          </h1>
          <h2
            className="text-xl mt-0 leading-relaxed"
            style={{ 
              color: template.accentColor,
              fontFamily: 'Georgia, "Garamond", "Bodoni MT", serif',
              fontWeight: '600',
              letterSpacing: '0.08em',
              textShadow: '1px 1px 0 rgba(0,0,0,0.05), 2px 2px 0 rgba(0,0,0,0.05)',
              fontStyle: 'normal',
              textTransform: 'none',
              lineHeight: '1.6',
              wordSpacing: '0.1em'
            }}
          >
            {template.title}
          </h2>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center space-y-6 max-w-4xl px-8">
          <div className="text-center w-full">
            <p
              className="text-base leading-relaxed mx-auto"
              style={{ 
                color: template.primaryColor,
                lineHeight: '1.8',
                letterSpacing: '0.01em',
                wordSpacing: '0.15em',
                textAlign: 'center',
                fontFamily: 'Georgia, serif',
                fontWeight: '400',
                maxWidth: '90%'
              }}
            >
              {renderBodyWithStyledName()}
            </p>
          </div>
        </div>

        <div className="flex justify-between items-end w-full flex-shrink-0">
          <div className="text-left space-y-2">
            <p
              className="text-sm"
              style={{ color: template.primaryColor }}
            >
              Date: {new Date(data.completionDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
            <p
              className="text-xs opacity-70"
              style={{ color: template.primaryColor }}
            >
              Certificate ID: {data.certificateId}
            </p>
          </div>

          {template.signatureName && (
            <div className="text-center">
              <div
                className="border-t-2 w-48 mb-2"
                style={{ borderColor: template.primaryColor }}
              />
              <p
                className="font-semibold text-lg"
                style={{ color: template.primaryColor }}
              >
                {template.signatureName}
              </p>
              {template.signatureTitle && (
                <p
                  className="text-sm"
                  style={{ color: template.primaryColor }}
                >
                  {template.signatureTitle}
                </p>
              )}
            </div>
          )}
        </div>

        {template.footerText && (
          <div className="text-center mt-4">
            <p
              className="text-sm italic"
              style={{ color: template.primaryColor }}
            >
              {template.footerText}
            </p>
          </div>
        )}
      </div>

      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, ${template.accentColor} 1px, transparent 1px)`,
          backgroundSize: '30px 30px',
        }}
      />
    </div>
  );
};

export default Certificate;
