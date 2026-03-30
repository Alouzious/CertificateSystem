export type TemplateName = 'classic-elegance' | 'modern-minimal' | 'corporate-gold' | 'academic-excellence' | 'tech-digital';
export type FontFamily = 'serif' | 'sans-serif' | 'script';
export type LogoPlacement = 'top' | 'bottom';
export type BorderStyleType = 'classic' | 'modern' | 'elegant' | 'simple' | 'double';

export interface LogoData {
  url: string;
  name: string;
}

export interface SignatureData {
  name: string;
  title: string;
  signatureImageUrl?: string; // drawn or uploaded
}

export interface CertificateTemplate {
  id: string;
  name: TemplateName;
  displayName: string;
  title: string;
  institutionName: string;
  prefixText?: string;
  bodyText: string;
  footerText: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  fontFamily: FontFamily;
  borderStyle: BorderStyleType;
  logo1?: LogoData;
  logo2?: LogoData;
  logoPlacement: LogoPlacement;
  signature1: SignatureData;
  signature2: SignatureData;
  createdAt: string;
  updatedAt: string;
}

export interface CertificateData {
  participantName: string;
  courseName: string;
  completionDate: string;
  certificateId: string;
  issuerOrg?: string;
  description?: string;
  additionalInfo?: string;
}

export interface CertificateRecord {
  id: string;
  certificateId: string;
  participantName: string;
  courseName: string;
  completionDate: string;
  templateId: string;
  templateName: string;
  generatedAt: string;
  verificationUrl?: string;
}

export interface BulkCertificateRow {
  name: string;
  course: string;
  date: string;
  org?: string;
  description?: string;
}

export interface ThemeContextType {
  isDark: boolean;
  toggleDark: () => void;
}
