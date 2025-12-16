export interface CertificateTemplate {
  id: string;
  title: string;
  institutionName: string;
  prefixText?: string;
  bodyText: string;
  footerText: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  signatureName?: string;
  signatureTitle?: string;
  logoUrl?: string;
  borderStyle: 'classic' | 'modern' | 'elegant' | 'simple';
  createdAt: string;
  updatedAt: string;
}

export interface CertificateData {
  participantName: string;
  courseName: string;
  completionDate: string;
  certificateId: string;
  additionalInfo?: string;
}

export interface CertificateRecord {
  id: string;
  certificateId: string;
  participantName: string;
  courseName: string;
  completionDate: string;
  templateId: string;
  templateTitle: string;
  generatedAt: string;
}

export interface BulkCertificateData {
  name: string;
  course: string;
  date: string;
}
