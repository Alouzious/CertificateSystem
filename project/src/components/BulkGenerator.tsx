import React, { useState, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, AnimatePresence } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import { Upload, Download, FileText, Users, Check, AlertCircle, Trash2 } from 'lucide-react';
import Papa from 'papaparse';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { BulkCertificateRow, CertificateTemplate, CertificateData } from '../types';
import { generatePDFBlob } from '../utils/pdfGenerator';
import { storageUtils, generateCertificateId } from '../utils/storage';
import { CertificatePreview } from './CertificatePreview';

interface BulkGeneratorProps {
  template: CertificateTemplate;
  onTemplateChange: (template: CertificateTemplate) => void;
}

export const BulkGenerator: React.FC<BulkGeneratorProps> = ({ template, onTemplateChange }) => {
  const [csvData, setCsvData] = useState<BulkCertificateRow[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [errors, setErrors] = useState<string[]>([]);
  const hiddenCertificateRef = useRef<HTMLDivElement>(null);

  // CSV template
  const csvTemplate = `name,course,date,org,description
John Doe,Web Development Bootcamp,2024-01-15,Tech Academy,Completed with distinction
Jane Smith,Data Science Course,2024-01-20,Data Institute,Advanced certification
Michael Johnson,Digital Marketing,2024-01-25,Marketing Hub,Professional certificate`;

  const onDrop = React.useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        complete: (results) => {
          const data = results.data as BulkCertificateRow[];
          const validData = data.filter(row => row.name && row.course && row.date);
          setCsvData(validData);
          
          const errorCount = data.length - validData.length;
          if (errorCount > 0) {
            setErrors([`${errorCount} rows were skipped due to missing required fields`]);
          } else {
            setErrors([]);
          }
        },
        error: (error) => {
          setErrors([`Failed to parse CSV: ${error.message}`]);
        },
      });
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.ms-excel': ['.csv'],
    },
    maxFiles: 1,
    multiple: false,
  });

  const downloadTemplate = () => {
    const blob = new Blob([csvTemplate], { type: 'text/csv' });
    saveAs(blob, 'certificate_template.csv');
  };

  const validateRow = (row: BulkCertificateRow): string[] => {
    const errors: string[] = [];
    if (!row.name?.trim()) errors.push('Name is required');
    if (!row.course?.trim()) errors.push('Course is required');
    if (!row.date?.trim()) errors.push('Date is required');
    return errors;
  };

  const generateAllCertificates = async () => {
    if (csvData.length === 0) return;

    setIsGenerating(true);
    setProgress(0);
    setErrors([]);

    const zip = new JSZip();
    const records = [];

    try {
      for (let i = 0; i < csvData.length; i++) {
        const row = csvData[i];
        const rowErrors = validateRow(row);
        
        if (rowErrors.length > 0) {
          setErrors(prev => [...prev, `Row ${i + 1}: ${rowErrors.join(', ')}`]);
          continue;
        }

        const certificateData: CertificateData = {
          participantName: row.name,
          courseName: row.course,
          completionDate: row.date,
          certificateId: generateCertificateId(),
          issuerOrg: row.org || template.institutionName,
          description: row.description,
        };

        // Create a temporary element for PDF generation
        const tempDiv = document.createElement('div');
        tempDiv.style.position = 'absolute';
        tempDiv.style.left = '-9999px';
        tempDiv.id = `bulk-cert-${i}`;
        document.body.appendChild(tempDiv);

        // Render the certificate
        const root = createRoot(tempDiv);
        
        await new Promise<void>((resolve) => {
          root.render(
            React.createElement(CertificatePreview, {
              template,
              data: certificateData,
              id: `bulk-cert-${i}`,
            })
          );
          
          // Wait for DOM paint using requestAnimationFrame then rAF again to ensure two render cycles
          requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
        });

        try {
          const pdfBlob = await generatePDFBlob(`bulk-cert-${i}`);
          const fileName = `${row.name.replace(/[^a-zA-Z0-9]/g, '_')}_certificate.pdf`;
          zip.file(fileName, pdfBlob);

          // Save record
          records.push({
            id: certificateData.certificateId,
            certificateId: certificateData.certificateId,
            participantName: certificateData.participantName,
            courseName: certificateData.courseName,
            completionDate: certificateData.completionDate,
            templateId: template.id,
            templateName: template.displayName,
            generatedAt: new Date().toISOString(),
          });

          setProgress(((i + 1) / csvData.length) * 100);
        } catch (error) {
          console.error(`Failed to generate certificate for ${row.name}:`, error);
          setErrors(prev => [...prev, `Failed to generate certificate for ${row.name}`]);
        }

        // Clean up
        root.unmount();
        document.body.removeChild(tempDiv);
      }

      // Save all records
      storageUtils.addRecords(records);

      // Generate and download zip
      const zipBlob = await zip.generateAsync({ type: 'blob' });
      saveAs(zipBlob, `certificates_${new Date().toISOString().split('T')[0]}.zip`);

    } catch (error) {
      console.error('Bulk generation failed:', error);
      setErrors(prev => [...prev, 'Bulk generation failed. Please try again.']);
    } finally {
      setIsGenerating(false);
      setProgress(0);
    }
  };

  const removeRow = (index: number) => {
    setCsvData(csvData.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Bulk Certificate Generator
        </h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Upload a CSV file with participant data to generate multiple certificates at once.
        </p>
      </motion.div>

      {/* Template Download */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6"
      >
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
              CSV Template
            </h3>
            <p className="text-blue-800 dark:text-blue-200 text-sm mb-4">
              Download our template to ensure your CSV has the correct format.
            </p>
            <div className="text-xs text-blue-700 dark:text-blue-300 font-mono bg-blue-100 dark:bg-blue-900/40 p-3 rounded">
              Required: name, course, date<br />
              Optional: org, description
            </div>
          </div>
          <button
            onClick={downloadTemplate}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Download className="w-4 h-4 mr-2" />
            Download Template
          </button>
        </div>
      </motion.div>

      {/* File Upload */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Upload CSV File
        </h3>
        
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            isDragActive
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
              : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 bg-gray-50 dark:bg-gray-900/20'
          }`}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center space-y-3">
            <Upload className="w-12 h-12 text-gray-400" />
            <div className="text-lg font-medium text-gray-700 dark:text-gray-300">
              {isDragActive ? 'Drop the CSV file here' : 'Drop CSV file here or click to browse'}
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              CSV files only, up to 10MB
            </p>
          </div>
        </div>
      </motion.div>

      {/* Errors */}
      <AnimatePresence>
        {errors.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4"
          >
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
              <div>
                <h4 className="text-red-800 dark:text-red-200 font-medium mb-2">
                  Validation Errors
                </h4>
                <ul className="space-y-1">
                  {errors.map((error, index) => (
                    <li key={index} className="text-red-700 dark:text-red-300 text-sm">
                      • {error}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Data Preview */}
      <AnimatePresence>
        {csvData.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
          >
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Data Preview ({csvData.length} participants)
                </h3>
                <button
                  onClick={generateAllCertificates}
                  disabled={isGenerating || csvData.length === 0}
                  className="flex items-center px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  {isGenerating ? 'Generating...' : 'Generate All Certificates'}
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-900">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Course
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Organization
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {csvData.map((row, index) => {
                    const rowErrors = validateRow(row);
                    const isValid = rowErrors.length === 0;
                    
                    return (
                      <tr key={index} className={isValid ? '' : 'bg-red-50 dark:bg-red-900/10'}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {row.name || <span className="text-red-500">Missing</span>}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {row.course || <span className="text-red-500">Missing</span>}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {row.date || <span className="text-red-500">Missing</span>}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {row.org || template.institutionName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {isValid ? (
                            <span className="flex items-center text-sm text-green-600">
                              <Check className="w-4 h-4 mr-1" />
                              Valid
                            </span>
                          ) : (
                            <span className="flex items-center text-sm text-red-600">
                              <AlertCircle className="w-4 h-4 mr-1" />
                              Invalid
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => removeRow(index)}
                            className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress */}
      <AnimatePresence>
        {isGenerating && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6"
          >
            <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-4">
              Generating Certificates...
            </h3>
            <div className="w-full bg-blue-200 dark:bg-blue-800 rounded-full h-3 mb-2">
              <motion.div
                className="bg-blue-600 h-3 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <p className="text-blue-800 dark:text-blue-200 text-sm">
              {Math.round(progress)}% complete
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hidden certificate for PDF generation */}
      <div ref={hiddenCertificateRef} className="absolute -left-[9999px] -top-[9999px]" />
    </div>
  );
};