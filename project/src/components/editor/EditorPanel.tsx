import React, { useState, useMemo } from 'react';
import { Download, FileDown, Palette, Type, Settings, Image as ImageIcon } from 'lucide-react';
import { CertificateTemplate, CertificateData, TemplateName, FontFamily, LogoPlacement } from '../../types';
import { LogoUploader } from './LogoUploader';
import { SignatureManager } from './SignatureManager';
import { generatePDF, generatePNG } from '../../utils/pdfGenerator';
import { generateCertificateId } from '../../utils/storage';

interface EditorPanelProps {
  template: CertificateTemplate;
  data: CertificateData;
  onTemplateChange: (template: CertificateTemplate) => void;
  onDataChange: (data: CertificateData) => void;
}

const TEMPLATE_OPTIONS: { value: TemplateName; label: string; description: string }[] = [
  { value: 'classic-elegance', label: 'Classic Elegance', description: 'Traditional and sophisticated' },
  { value: 'modern-minimal', label: 'Modern Minimal', description: 'Clean and contemporary' },
  { value: 'corporate-gold', label: 'Corporate Gold', description: 'Professional with gold accents' },
  { value: 'academic-excellence', label: 'Academic Excellence', description: 'Scholarly and distinguished' },
  { value: 'tech-digital', label: 'Tech Digital', description: 'Modern technology theme' },
];

export const EditorPanel: React.FC<EditorPanelProps> = ({
  template,
  data,
  onTemplateChange,
  onDataChange,
}) => {
  const [activeSection, setActiveSection] = useState<'content' | 'design' | 'logos' | 'signatures'>('content');
  const [isExporting, setIsExporting] = useState(false);

  const handleTemplateNameChange = (name: TemplateName) => {
    const selectedTemplate = TEMPLATE_OPTIONS.find(t => t.value === name);
    if (selectedTemplate) {
      onTemplateChange({
        ...template,
        name,
        displayName: selectedTemplate.label,
      });
    }
  };

  const handleExportPDF = async () => {
    try {
      setIsExporting(true);
      await generatePDF('certificate-preview', `${data.participantName}-certificate.pdf`);
    } catch (error) {
      alert('Failed to export PDF. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportPNG = async () => {
    try {
      setIsExporting(true);
      await generatePNG('certificate-preview', `${data.participantName}-certificate.png`);
    } catch (error) {
      alert('Failed to export PNG. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const regenerateCertificateId = () => {
    onDataChange({
      ...data,
      certificateId: generateCertificateId(),
    });
  };

  const sectionButtons = [
    { key: 'content', icon: Type, label: 'Content' },
    { key: 'design', icon: Palette, label: 'Design' },
    { key: 'logos', icon: ImageIcon, label: 'Logos' },
    { key: 'signatures', icon: Settings, label: 'Signatures' },
  ] as const;

  return (
    <div className="w-full max-w-md bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Certificate Editor</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Customize your certificate</p>
      </div>

      {/* Section Navigation */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-2 gap-2">
          {sectionButtons.map(({ key, icon: Icon, label }) => (
            <button
              key={key}
              onClick={() => setActiveSection(key)}
              className={`flex items-center justify-center p-3 rounded-lg text-sm font-medium transition-colors ${
                activeSection === key
                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                  : 'bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600'
              }`}
            >
              <Icon className="w-4 h-4 mr-2" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-6">
        {activeSection === 'content' && (
          <div className="space-y-6">
            {/* Template Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Certificate Template
              </label>
              <select
                value={template.name}
                onChange={(e) => handleTemplateNameChange(e.target.value as TemplateName)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                {TEMPLATE_OPTIONS.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {TEMPLATE_OPTIONS.find(t => t.value === template.name)?.description}
              </p>
            </div>

            {/* Participant Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Participant Information</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Recipient Name
                </label>
                <input
                  type="text"
                  value={data.participantName}
                  onChange={(e) => onDataChange({ ...data, participantName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Enter recipient name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Course/Achievement Title
                </label>
                <input
                  type="text"
                  value={data.courseName}
                  onChange={(e) => onDataChange({ ...data, courseName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Enter course or achievement"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Completion Date
                </label>
                <input
                  type="date"
                  value={data.completionDate}
                  onChange={(e) => onDataChange({ ...data, completionDate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Issuing Organization
                </label>
                <input
                  type="text"
                  value={template.institutionName}
                  onChange={(e) => onTemplateChange({ ...template, institutionName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Enter organization name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Certificate ID
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={data.certificateId}
                    onChange={(e) => onDataChange({ ...data, certificateId: e.target.value })}
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm"
                  />
                  <button
                    onClick={regenerateCertificateId}
                    className="px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    New
                  </button>
                </div>
              </div>
            </div>

            {/* Certificate Text */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Certificate Text</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={template.title}
                  onChange={(e) => onTemplateChange({ ...template, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Certificate of Achievement"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Prefix Text
                </label>
                <input
                  type="text"
                  value={template.prefixText || ''}
                  onChange={(e) => onTemplateChange({ ...template, prefixText: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="This is to certify that"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Body Text
                </label>
                <textarea
                  value={template.bodyText}
                  onChange={(e) => onTemplateChange({ ...template, bodyText: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  rows={3}
                  placeholder="has successfully completed..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Footer Text
                </label>
                <textarea
                  value={template.footerText}
                  onChange={(e) => onTemplateChange({ ...template, footerText: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  rows={2}
                  placeholder="In recognition of..."
                />
              </div>
            </div>
          </div>
        )}

        {activeSection === 'design' && (
          <div className="space-y-6">
            {/* Font Settings */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Typography</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Font Family
                </label>
                <select
                  value={template.fontFamily}
                  onChange={(e) => onTemplateChange({ ...template, fontFamily: e.target.value as FontFamily })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="serif">Serif (Traditional)</option>
                  <option value="sans-serif">Sans-serif (Modern)</option>
                  <option value="script">Script (Elegant)</option>
                </select>
              </div>
            </div>

            {/* Color Settings */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Colors</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Primary Color
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="color"
                      value={template.primaryColor}
                      onChange={(e) => onTemplateChange({ ...template, primaryColor: e.target.value })}
                      className="w-12 h-10 border border-gray-300 dark:border-gray-600 rounded cursor-pointer"
                    />
                    <input
                      type="text"
                      value={template.primaryColor}
                      onChange={(e) => onTemplateChange({ ...template, primaryColor: e.target.value })}
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Secondary Color
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="color"
                      value={template.secondaryColor}
                      onChange={(e) => onTemplateChange({ ...template, secondaryColor: e.target.value })}
                      className="w-12 h-10 border border-gray-300 dark:border-gray-600 rounded cursor-pointer"
                    />
                    <input
                      type="text"
                      value={template.secondaryColor}
                      onChange={(e) => onTemplateChange({ ...template, secondaryColor: e.target.value })}
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Accent Color
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="color"
                      value={template.accentColor}
                      onChange={(e) => onTemplateChange({ ...template, accentColor: e.target.value })}
                      className="w-12 h-10 border border-gray-300 dark:border-gray-600 rounded cursor-pointer"
                    />
                    <input
                      type="text"
                      value={template.accentColor}
                      onChange={(e) => onTemplateChange({ ...template, accentColor: e.target.value })}
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Background Color
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="color"
                      value={template.backgroundColor}
                      onChange={(e) => onTemplateChange({ ...template, backgroundColor: e.target.value })}
                      className="w-12 h-10 border border-gray-300 dark:border-gray-600 rounded cursor-pointer"
                    />
                    <input
                      type="text"
                      value={template.backgroundColor}
                      onChange={(e) => onTemplateChange({ ...template, backgroundColor: e.target.value })}
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'logos' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Logo Settings</h3>
              
              {/* Logo Placement */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Logo Placement
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="top"
                      checked={template.logoPlacement === 'top'}
                      onChange={(e) => onTemplateChange({ ...template, logoPlacement: e.target.value as LogoPlacement })}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Top</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="bottom"
                      checked={template.logoPlacement === 'bottom'}
                      onChange={(e) => onTemplateChange({ ...template, logoPlacement: e.target.value as LogoPlacement })}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Bottom</span>
                  </label>
                </div>
              </div>

              {/* Logo 1 */}
              <LogoUploader
                label="Logo 1 (Left)"
                logo={template.logo1}
                onUpload={(logo) => onTemplateChange({ ...template, logo1: logo })}
                onRemove={() => onTemplateChange({ ...template, logo1: undefined })}
              />

              {/* Logo 2 */}
              <LogoUploader
                label="Logo 2 (Right)"
                logo={template.logo2}
                onUpload={(logo) => onTemplateChange({ ...template, logo2: logo })}
                onRemove={() => onTemplateChange({ ...template, logo2: undefined })}
              />
            </div>
          </div>
        )}

        {activeSection === 'signatures' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Signature Settings</h3>
            
            <SignatureManager
              label="Signature 1"
              signature={template.signature1}
              onChange={(signature) => onTemplateChange({ ...template, signature1: signature })}
            />

            <SignatureManager
              label="Signature 2"
              signature={template.signature2}
              onChange={(signature) => onTemplateChange({ ...template, signature2: signature })}
            />
          </div>
        )}
      </div>

      {/* Export Actions */}
      <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
        <div className="space-y-3">
          <button
            onClick={handleExportPDF}
            disabled={isExporting}
            className="w-full flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download className="w-5 h-5 mr-2" />
            {isExporting ? 'Exporting...' : 'Download PDF'}
          </button>
          
          <button
            onClick={handleExportPNG}
            disabled={isExporting}
            className="w-full flex items-center justify-center px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FileDown className="w-5 h-5 mr-2" />
            {isExporting ? 'Exporting...' : 'Download PNG'}
          </button>
        </div>
      </div>
    </div>
  );
};