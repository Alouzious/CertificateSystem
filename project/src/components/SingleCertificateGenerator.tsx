import { useState } from 'react';
import { CertificateTemplate, CertificateData, CertificateRecord } from '../types';
import { Download, Eye, FileText } from 'lucide-react';
import Certificate from './Certificate';
import { generatePDF } from '../utils/pdfGenerator';
import { generateCertificateId } from '../utils/storage';

interface SingleCertificateGeneratorProps {
  templates: CertificateTemplate[];
  onGenerate: (record: CertificateRecord) => void;
}

const SingleCertificateGenerator = ({ templates, onGenerate }: SingleCertificateGeneratorProps) => {
  // Find first available template or default to empty
  const defaultTemplateId = templates.length > 0 ? templates[0].id : '';

  const [formData, setFormData] = useState({
    participantName: 'Alouzious',
    courseName: '',
    completionDate: '2025-12-11',
    templateId: defaultTemplateId,
  });

  const [showPreview, setShowPreview] = useState(false);
  const [certificateData, setCertificateData] = useState<CertificateData | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const selectedTemplate = templates.find((t) => t.id === formData.templateId);

  const handlePreview = () => {
    if (!selectedTemplate || !formData.participantName || !formData.courseName) {
      alert('Please fill in all required fields');
      return;
    }

    const certData: CertificateData = {
      participantName: formData.participantName,
      courseName: formData.courseName,
      completionDate: formData.completionDate,
      certificateId: generateCertificateId(),
    };

    setCertificateData(certData);
    setShowPreview(true);
  };

  const handleGenerate = async () => {
    if (!certificateData || !selectedTemplate) return;

    setIsGenerating(true);
    try {
      const fileName = `${formData.participantName.replace(/\s+/g, '_')}_Certificate.pdf`;
      await generatePDF('certificate-preview', fileName);

      const record: CertificateRecord = {
        id: generateCertificateId(),
        certificateId: certificateData.certificateId,
        participantName: formData.participantName,
        courseName: formData.courseName,
        completionDate: formData.completionDate,
        templateId: selectedTemplate.id,
        templateTitle: selectedTemplate.title,
        generatedAt: new Date().toISOString(),
      };

      onGenerate(record);

      setFormData({
        participantName: '',
        courseName: '',
        completionDate: new Date().toISOString().split('T')[0],
        templateId: formData.templateId,
      });
      setShowPreview(false);
      setCertificateData(null);
    } catch (error) {
      console.error('Error generating certificate:', error);
      alert('Failed to generate certificate. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div>
      <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <FileText className="w-8 h-8 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-800">Generate Single Certificate</h2>
        </div>

        {templates.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-4">
              No templates available. Please create a template first.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Template *
              </label>
              <select
                value={formData.templateId}
                onChange={(e) => setFormData({ ...formData, templateId: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Participant Name *
                </label>
                <input
                  type="text"
                  value={formData.participantName}
                  onChange={(e) => setFormData({ ...formData, participantName: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="John Doe"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Course Name *
                </label>
                <input
                  type="text"
                  value={formData.courseName}
                  onChange={(e) => setFormData({ ...formData, courseName: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Web Development"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Completion Date *
                </label>
                <input
                  type="date"
                  value={formData.completionDate}
                  onChange={(e) => setFormData({ ...formData, completionDate: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={handlePreview}
                disabled={!formData.templateId || !formData.participantName || !formData.courseName}
                className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg hover:shadow-xl"
              >
                <Eye className="w-5 h-5" />
                Preview Certificate
              </button>
            </div>
          </div>
        )}
      </div>

      {showPreview && certificateData && selectedTemplate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-8 z-50 overflow-auto">
          <div className="bg-white rounded-lg p-8 max-w-6xl w-full max-h-[90vh] overflow-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800">Certificate Preview</h3>
              <div className="flex gap-3">
                <button
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  {isGenerating ? 'Generating...' : 'Generate PDF'}
                </button>
                <button
                  onClick={() => setShowPreview(false)}
                  className="px-6 py-3 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>

            <div className="overflow-x-auto border border-gray-200 rounded-lg p-4 bg-gray-50">
              <div className="inline-block min-w-min scale-75 origin-top-left">
                <Certificate
                  template={selectedTemplate}
                  data={certificateData}
                  id="certificate-preview"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleCertificateGenerator;
