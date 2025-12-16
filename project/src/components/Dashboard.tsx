import { useState, useEffect } from 'react';
import { CertificateTemplate, CertificateRecord } from '../types';
import { storageUtils, generateId } from '../utils/storage';
import { FileText, Package, History, Layout, Download, Upload } from 'lucide-react';
import TemplateList from './TemplateList';
import TemplateEditor from './TemplateEditor';
import SingleCertificateGenerator from './SingleCertificateGenerator';
import BulkCertificateGenerator from './BulkCertificateGenerator';
import CertificateHistory from './CertificateHistory';

type Tab = 'templates' | 'single' | 'bulk' | 'history';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<Tab>('templates');
  const [templates, setTemplates] = useState<CertificateTemplate[]>([]);
  const [records, setRecords] = useState<CertificateRecord[]>([]);
  const [editingTemplate, setEditingTemplate] = useState<CertificateTemplate | null>(null);
  const [showTemplateEditor, setShowTemplateEditor] = useState(false);

  useEffect(() => {
    setTemplates(storageUtils.getTemplates());
    setRecords(storageUtils.getRecords());
  }, []);

  const handleSaveTemplate = (template: CertificateTemplate) => {
    if (template.id) {
      storageUtils.updateTemplate(template.id, template);
    } else {
      const newTemplate = { ...template, id: generateId() };
      storageUtils.addTemplate(newTemplate);
    }
    setTemplates(storageUtils.getTemplates());
    setShowTemplateEditor(false);
    setEditingTemplate(null);
  };

  const handleDeleteTemplate = (id: string) => {
    storageUtils.deleteTemplate(id);
    setTemplates(storageUtils.getTemplates());
  };

  const handleEditTemplate = (template: CertificateTemplate) => {
    setEditingTemplate(template);
    setShowTemplateEditor(true);
  };

  const handleCreateTemplate = () => {
    setEditingTemplate(null);
    setShowTemplateEditor(true);
  };

  const handleGenerateCertificate = (record: CertificateRecord) => {
    storageUtils.addRecord(record);
    setRecords(storageUtils.getRecords());
  };

  const handleBulkGenerate = (newRecords: CertificateRecord[]) => {
    storageUtils.addRecords(newRecords);
    setRecords(storageUtils.getRecords());
  };

  const handleExportData = () => {
    const data = storageUtils.exportData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `certificate-system-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleImportData = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const data = event.target?.result as string;
            storageUtils.importData(data);
            setTemplates(storageUtils.getTemplates());
            setRecords(storageUtils.getRecords());
            alert('Data imported successfully!');
          } catch (error) {
            alert('Failed to import data. Please check the file format.');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const tabs = [
    { id: 'templates' as Tab, label: 'Templates', icon: Layout },
    { id: 'single' as Tab, label: 'Generate Single', icon: FileText },
    { id: 'bulk' as Tab, label: 'Bulk Generate', icon: Package },
    { id: 'history' as Tab, label: 'History', icon: History },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">
                Certificate Generation System
              </h1>
              <p className="text-gray-600">
                Create, customize, and generate professional certificates
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleImportData}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all flex items-center gap-2"
              >
                <Upload className="w-4 h-4" />
                Import
              </button>
              <button
                onClick={handleExportData}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>

          <div className="flex gap-4 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setShowTemplateEditor(false);
                }}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="animate-fadeIn">
          {activeTab === 'templates' && !showTemplateEditor && (
            <TemplateList
              templates={templates}
              onEdit={handleEditTemplate}
              onDelete={handleDeleteTemplate}
              onCreate={handleCreateTemplate}
            />
          )}

          {activeTab === 'templates' && showTemplateEditor && (
            <TemplateEditor
              template={editingTemplate || undefined}
              onSave={handleSaveTemplate}
              onCancel={() => {
                setShowTemplateEditor(false);
                setEditingTemplate(null);
              }}
            />
          )}

          {activeTab === 'single' && (
            <SingleCertificateGenerator
              templates={templates}
              onGenerate={handleGenerateCertificate}
            />
          )}

          {activeTab === 'bulk' && (
            <BulkCertificateGenerator
              templates={templates}
              onGenerate={handleBulkGenerate}
            />
          )}

          {activeTab === 'history' && <CertificateHistory records={records} />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
