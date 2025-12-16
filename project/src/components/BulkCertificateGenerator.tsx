import { useState, useRef } from 'react';
import { CertificateTemplate, CertificateData, CertificateRecord } from '../types';
import { Upload, Download, FileText, Package } from 'lucide-react';
import Certificate from './Certificate';
import { generatePDFBlob } from '../utils/pdfGenerator';
import { generateCertificateId } from '../utils/storage';
import { parseCSV, downloadCSVTemplate } from '../utils/csvParser';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

interface BulkCertificateGeneratorProps {
  templates: CertificateTemplate[];
  onGenerate: (records: CertificateRecord[]) => void;
}

const BulkCertificateGenerator = ({ templates, onGenerate }: BulkCertificateGeneratorProps) => {
  const [templateId, setTemplateId] = useState('');
  const [csvData, setCsvData] = useState<Array<{ name: string; course: string; date: string }>>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0 });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const selectedTemplate = templates.find((t) => t.id === templateId);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const data = await parseCSV(file);
      setCsvData(data);
    } catch (error) {
      console.error('Error parsing CSV:', error);
      alert('Failed to parse CSV file. Please check the format.');
    }
  };

  const handleBulkGenerate = async () => {
    if (!selectedTemplate || csvData.length === 0) {
      alert('Please select a template and upload a CSV file');
      return;
    }

    setIsGenerating(true);
    setProgress({ current: 0, total: csvData.length });

    try {
      const zip = new JSZip();
      const records: CertificateRecord[] = [];

      for (let i = 0; i < csvData.length; i++) {
        const entry = csvData[i];
        setProgress({ current: i + 1, total: csvData.length });

        const certData: CertificateData = {
          participantName: entry.name,
          courseName: entry.course,
          completionDate: entry.date,
          certificateId: generateCertificateId(),
        };

        const container = document.createElement('div');
        container.style.position = 'absolute';
        container.style.left = '-9999px';
        document.body.appendChild(container);

        const certElement = document.createElement('div');
        certElement.id = `bulk-cert-${i}`;
        container.appendChild(certElement);

        const root = await import('react-dom/client');
        const reactRoot = root.createRoot(certElement);

        await new Promise<void>((resolve) => {
          reactRoot.render(
            <Certificate
              template={selectedTemplate}
              data={certData}
              id={`bulk-cert-${i}`}
            />
          );
          setTimeout(resolve, 100);
        });

        await new Promise((resolve) => setTimeout(resolve, 500));

        const blob = await generatePDFBlob(`bulk-cert-${i}`);
        const fileName = `${entry.name.replace(/\s+/g, '_')}_Certificate.pdf`;
        zip.file(fileName, blob);

        records.push({
          id: generateCertificateId(),
          certificateId: certData.certificateId,
          participantName: entry.name,
          courseName: entry.course,
          completionDate: entry.date,
          templateId: selectedTemplate.id,
          templateTitle: selectedTemplate.title,
          generatedAt: new Date().toISOString(),
        });

        reactRoot.unmount();
        document.body.removeChild(container);
      }

      const zipBlob = await zip.generateAsync({ type: 'blob' });
      saveAs(zipBlob, 'certificates.zip');

      onGenerate(records);
      setCsvData([]);
      setTemplateId('');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Error generating certificates:', error);
      alert('Failed to generate certificates. Please try again.');
    } finally {
      setIsGenerating(false);
      setProgress({ current: 0, total: 0 });
    }
  };

  return (
    <div>
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex items-center gap-3 mb-6">
          <Package className="w-8 h-8 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-800">Bulk Certificate Generation</h2>
        </div>

        {templates.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-4">
              No templates available. Please create a template first.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">CSV Format Requirements</h3>
              <p className="text-sm text-blue-800 mb-3">
                Your CSV file should have three columns: <strong>name</strong>, <strong>course</strong>, and <strong>date</strong>
              </p>
              <button
                onClick={downloadCSVTemplate}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download CSV Template
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Template *
              </label>
              <select
                value={templateId}
                onChange={(e) => setTemplateId(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isGenerating}
                required
              >
                <option value="">Choose a template...</option>
                {templates.map((template) => (
                  <option key={template.id} value={template.id}>
                    {template.title} - {template.institutionName}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload CSV File *
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="csv-upload"
                  disabled={isGenerating}
                />
                <label
                  htmlFor="csv-upload"
                  className="cursor-pointer flex flex-col items-center gap-3"
                >
                  <Upload className="w-12 h-12 text-gray-400" />
                  <div>
                    <p className="text-lg font-medium text-gray-700">
                      Click to upload CSV file
                    </p>
                    <p className="text-sm text-gray-500">or drag and drop</p>
                  </div>
                </label>
              </div>
            </div>

            {csvData.length > 0 && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="w-5 h-5 text-green-600" />
                  <h3 className="font-semibold text-green-900">
                    CSV Loaded Successfully
                  </h3>
                </div>
                <p className="text-sm text-green-800">
                  {csvData.length} certificate{csvData.length !== 1 ? 's' : ''} ready to generate
                </p>
                <div className="mt-3 max-h-40 overflow-y-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-green-100">
                      <tr>
                        <th className="px-3 py-2 text-left">Name</th>
                        <th className="px-3 py-2 text-left">Course</th>
                        <th className="px-3 py-2 text-left">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {csvData.slice(0, 5).map((row, idx) => (
                        <tr key={idx} className="border-t border-green-200">
                          <td className="px-3 py-2">{row.name}</td>
                          <td className="px-3 py-2">{row.course}</td>
                          <td className="px-3 py-2">{row.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {csvData.length > 5 && (
                    <p className="text-xs text-green-700 mt-2 text-center">
                      ... and {csvData.length - 5} more
                    </p>
                  )}
                </div>
              </div>
            )}

            {isGenerating && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="font-semibold text-blue-900 mb-3">Generating Certificates...</h3>
                <div className="w-full bg-blue-200 rounded-full h-4 overflow-hidden">
                  <div
                    className="bg-blue-600 h-full transition-all duration-300"
                    style={{
                      width: `${(progress.current / progress.total) * 100}%`,
                    }}
                  />
                </div>
                <p className="text-sm text-blue-800 mt-2 text-center">
                  {progress.current} of {progress.total} certificates generated
                </p>
              </div>
            )}

            <div className="flex justify-end">
              <button
                onClick={handleBulkGenerate}
                disabled={!templateId || csvData.length === 0 || isGenerating}
                className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg hover:shadow-xl"
              >
                <Download className="w-5 h-5" />
                {isGenerating ? 'Generating...' : 'Generate All Certificates'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BulkCertificateGenerator;
