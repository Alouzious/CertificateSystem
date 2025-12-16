import Papa from 'papaparse';
import { BulkCertificateData } from '../types';

export const parseCSV = (file: File): Promise<BulkCertificateData[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        try {
          const data = results.data.map((row: any) => ({
            name: row.name || row.Name || '',
            course: row.course || row.Course || '',
            date: row.date || row.Date || '',
          }));
          resolve(data);
        } catch (error) {
          reject(error);
        }
      },
      error: (error) => {
        reject(error);
      },
    });
  });
};

export const downloadCSVTemplate = (): void => {
  const csvContent = 'name,course,date\nJohn Doe,Web Development,2024-01-15\nJane Smith,Data Science,2024-01-20';
  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'certificate-template.csv';
  a.click();
  window.URL.revokeObjectURL(url);
};
