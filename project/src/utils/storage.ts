import { CertificateTemplate, CertificateRecord } from '../types';

const TEMPLATES_KEY = 'certificate_templates';
const RECORDS_KEY = 'certificate_records';

export const storageUtils = {
  getTemplates: (): CertificateTemplate[] => {
    const data = localStorage.getItem(TEMPLATES_KEY);
    return data ? JSON.parse(data) : [];
  },

  saveTemplates: (templates: CertificateTemplate[]): void => {
    localStorage.setItem(TEMPLATES_KEY, JSON.stringify(templates));
  },

  addTemplate: (template: CertificateTemplate): void => {
    const templates = storageUtils.getTemplates();
    templates.push(template);
    storageUtils.saveTemplates(templates);
  },

  updateTemplate: (id: string, updatedTemplate: CertificateTemplate): void => {
    const templates = storageUtils.getTemplates();
    const index = templates.findIndex(t => t.id === id);
    if (index !== -1) {
      templates[index] = updatedTemplate;
      storageUtils.saveTemplates(templates);
    }
  },

  deleteTemplate: (id: string): void => {
    const templates = storageUtils.getTemplates();
    const filtered = templates.filter(t => t.id !== id);
    storageUtils.saveTemplates(filtered);
  },

  getRecords: (): CertificateRecord[] => {
    const data = localStorage.getItem(RECORDS_KEY);
    return data ? JSON.parse(data) : [];
  },

  saveRecords: (records: CertificateRecord[]): void => {
    localStorage.setItem(RECORDS_KEY, JSON.stringify(records));
  },

  addRecord: (record: CertificateRecord): void => {
    const records = storageUtils.getRecords();
    records.push(record);
    storageUtils.saveRecords(records);
  },

  addRecords: (newRecords: CertificateRecord[]): void => {
    const records = storageUtils.getRecords();
    records.push(...newRecords);
    storageUtils.saveRecords(records);
  },

  exportData: (): string => {
    const templates = storageUtils.getTemplates();
    const records = storageUtils.getRecords();
    return JSON.stringify({ templates, records }, null, 2);
  },

  importData: (jsonData: string): void => {
    const data = JSON.parse(jsonData);
    if (data.templates) {
      storageUtils.saveTemplates(data.templates);
    }
    if (data.records) {
      storageUtils.saveRecords(data.records);
    }
  },
};

export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const generateCertificateId = (): string => {
  const prefix = 'CERT';
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substr(2, 5).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
};
