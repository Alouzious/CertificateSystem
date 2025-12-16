import { useState } from 'react';
import { CertificateTemplate } from '../types';
import { Plus, X } from 'lucide-react';
import Certificate from './Certificate';

interface TemplateEditorProps {
  template?: CertificateTemplate;
  onSave: (template: CertificateTemplate) => void;
  onCancel: () => void;
}

const TemplateEditor = ({ template, onSave, onCancel }: TemplateEditorProps) => {
  const [formData, setFormData] = useState<CertificateTemplate>(
    template || {
      id: '',
      title: 'Blockchain & Web3 Introduction Course Completion Certificate',
      institutionName: 'Stellar Online Kampala Kahoot',
      prefixText: 'This certifies that',
      bodyText: 'has successfully completed the comprehensive course "Introduction to Blockchain and Web3" on 11th Dec 2025. Through dedicated study and hands-on practice, they have demonstrated proficiency in blockchain fundamentals, smart contracts, decentralized applications, and Web3 technologies.',
      footerText: 'Awarded in recognition of outstanding achievement',
      primaryColor: '#1a1a1a',
      secondaryColor: '#2c5282',
      accentColor: '#d4af37',
      backgroundColor: '#fefcf3',
      signatureName: '',
      signatureTitle: '',
      logoUrl: '',
      borderStyle: 'elegant',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  );

  const [showPreview, setShowPreview] = useState(false);
  const [previewName, setPreviewName] = useState('Alouzious');

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      alert('File size too large. Please upload an image smaller than 2MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setFormData((prev) => ({ ...prev, logoUrl: result }));
    };
    reader.onerror = () => {
      alert('Failed to read the file. Please try again.');
    };
    reader.readAsDataURL(file);
  };

  const handleChange = (field: keyof CertificateTemplate, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      updatedAt: new Date().toISOString(),
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          {template ? 'Edit Template' : 'Create New Template'}
        </h2>
        <button
          onClick={onCancel}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Template Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Institution Name
            </label>
            <input
              type="text"
              value={formData.institutionName}
              onChange={(e) => handleChange('institutionName', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Prefix Text (before participant name)
            </label>
            <input
              type="text"
              value={formData.prefixText || ''}
              onChange={(e) => handleChange('prefixText', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="This certifies that"
            />
            <p className="text-xs text-gray-500 mt-1">
              This text appears before the participant's name (e.g., "This certifies that")
            </p>
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Body Text (after participant name)
            </label>
            <textarea
              value={formData.bodyText}
              onChange={(e) => handleChange('bodyText', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              This text appears after the participant's name (e.g., "has successfully completed...")
            </p>
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Footer Text
            </label>
            <input
              type="text"
              value={formData.footerText}
              onChange={(e) => handleChange('footerText', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Signature Name
            </label>
            <input
              type="text"
              value={formData.signatureName}
              onChange={(e) => handleChange('signatureName', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Signature Title
            </label>
            <input
              type="text"
              value={formData.signatureTitle}
              onChange={(e) => handleChange('signatureTitle', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Logo Image (Optional)
            </label>
            <div className="flex items-center gap-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {formData.logoUrl && (
                <div className="flex items-center gap-2">
                  <img
                    src={formData.logoUrl}
                    alt="Logo preview"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, logoUrl: '' }))}
                    className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Upload a logo image from your computer (max 2MB). Supports PNG, JPG, SVG.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Border Style
            </label>
            <select
              value={formData.borderStyle}
              onChange={(e) => handleChange('borderStyle', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="classic">Classic</option>
              <option value="modern">Modern</option>
              <option value="elegant">Elegant</option>
              <option value="simple">Simple</option>
            </select>
          </div>
        </div>

        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Color Scheme</h3>
          <div className="grid grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Primary Color
              </label>
              <input
                type="color"
                value={formData.primaryColor}
                onChange={(e) => handleChange('primaryColor', e.target.value)}
                className="w-full h-12 rounded-lg cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Secondary Color
              </label>
              <input
                type="color"
                value={formData.secondaryColor}
                onChange={(e) => handleChange('secondaryColor', e.target.value)}
                className="w-full h-12 rounded-lg cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Accent Color
              </label>
              <input
                type="color"
                value={formData.accentColor}
                onChange={(e) => handleChange('accentColor', e.target.value)}
                className="w-full h-12 rounded-lg cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Background
              </label>
              <input
                type="color"
                value={formData.backgroundColor}
                onChange={(e) => handleChange('backgroundColor', e.target.value)}
                className="w-full h-12 rounded-lg cursor-pointer"
              />
            </div>
          </div>
        </div>

        <div className="pt-6 border-t space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Preview Participant Name
            </label>
            <input
              type="text"
              value={previewName}
              onChange={(e) => setPreviewName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter name to preview"
            />
            <p className="text-xs text-gray-500 mt-1">
              Enter a participant name to see how it will appear on the certificate
            </p>
          </div>

          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={() => setShowPreview(!showPreview)}
              className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              {showPreview ? 'Hide Preview' : 'Show Preview'}
            </button>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={onCancel}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Save Template
              </button>
            </div>
          </div>
        </div>
      </form>

      {showPreview && (
        <div className="mt-8 border-t pt-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Preview</h3>
          <div className="overflow-x-auto">
            <div className="inline-block min-w-min scale-50 origin-top-left">
              <Certificate
                template={formData}
                data={{
                  participantName: 'John Doe',
                  courseName: 'Sample Course Name',
                  completionDate: new Date().toISOString(),
                  certificateId: 'CERT-PREVIEW-12345',
                }}
                id="preview-certificate"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplateEditor;
