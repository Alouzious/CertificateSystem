import { useState } from 'react';
import { CertificateTemplate } from '../types';
import { Edit, Trash2, Plus, Eye, Download } from 'lucide-react';
import Certificate from './Certificate';
import { generatePDF } from '../utils/pdfGenerator';

interface TemplateListProps {
  templates: CertificateTemplate[];
  onEdit: (template: CertificateTemplate) => void;
  onDelete: (id: string) => void;
  onCreate: () => void;
}

const TemplateList = ({ templates, onEdit, onDelete, onCreate }: TemplateListProps) => {
  const [previewTemplate, setPreviewTemplate] = useState<CertificateTemplate | null>(null);
  const [previewName, setPreviewName] = useState('Alouzious');
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadPDF = async () => {
    if (!previewTemplate) return;
    
    setIsDownloading(true);
    try {
      const fileName = `${previewTemplate.title.replace(/\s+/g, '_')}_${previewName.replace(/\s+/g, '_')}.pdf`;
      await generatePDF('certificate-for-download', fileName);
    } catch (error) {
      console.error('Error downloading certificate:', error);
      alert('PDF download issue: If you added a logo image, try using a CORS-friendly image URL or remove the logo to proceed.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Certificate Templates</h2>
        <button
          onClick={onCreate}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all flex items-center gap-2 shadow-lg hover:shadow-xl"
        >
          <Plus className="w-5 h-5" />
          Create New Template
        </button>
      </div>

      {templates.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <p className="text-gray-500 text-lg mb-4">No templates yet</p>
          <button
            onClick={onCreate}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all inline-flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Create Your First Template
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => (
            <div
              key={template.id}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all overflow-hidden border border-gray-200"
            >
              <div
                className="h-32 flex items-center justify-center text-white text-2xl font-bold"
                style={{ backgroundColor: template.primaryColor }}
              >
                {template.title}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {template.institutionName}
                </h3>
                <div className="flex gap-2 mb-4 flex-wrap">
                  <span className="px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-600">
                    {template.borderStyle}
                  </span>
                  <span
                    className="px-3 py-1 rounded-full text-xs text-white"
                    style={{ backgroundColor: template.accentColor }}
                  >
                    Custom Colors
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Created: {new Date(template.createdAt).toLocaleDateString()}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setPreviewTemplate(template)}
                    className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    Preview
                  </button>
                  <button
                    onClick={() => onEdit(template)}
                    className="flex-1 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors flex items-center justify-center gap-2"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      if (confirm('Are you sure you want to delete this template?')) {
                        onDelete(template.id);
                      }
                    }}
                    className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {previewTemplate && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-8 z-50"
          onClick={() => setPreviewTemplate(null)}
        >
          <div
            className="bg-white rounded-lg p-8 max-w-6xl max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold text-gray-800">Template Preview</h3>
              <div className="flex gap-2">
                <button
                  onClick={handleDownloadPDF}
                  disabled={isDownloading}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  {isDownloading ? 'Downloading...' : 'Download PDF'}
                </button>
                <button
                  onClick={() => setPreviewTemplate(null)}
                  className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preview with name:
              </label>
              <input
                type="text"
                value={previewName}
                onChange={(e) => setPreviewName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter a name to preview"
              />
            </div>

            <div className="overflow-x-auto">
              <div className="inline-block min-w-min scale-75 origin-top-left">
                <Certificate
                  template={previewTemplate}
                  data={{
                    participantName: previewName,
                    courseName: 'Sample Course Name',
                    completionDate: new Date().toISOString(),
                    certificateId: 'CERT-PREVIEW-12345',
                  }}
                  id="preview-modal-certificate"
                />
              </div>
            </div>

            {/* Hidden full-size certificate for PDF download */}
            <div className="hidden">
              <Certificate
                template={previewTemplate}
                data={{
                  participantName: previewName,
                  courseName: 'Sample Course Name',
                  completionDate: new Date().toISOString(),
                  certificateId: 'CERT-PREVIEW-12345',
                }}
                id="certificate-for-download"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplateList;
