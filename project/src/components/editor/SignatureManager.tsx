import React, { useState, useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { Upload, Edit3, RotateCcw, Check } from 'lucide-react';
import { SignatureData } from '../../types';

interface SignatureManagerProps {
  label: string;
  signature: SignatureData;
  onChange: (signature: SignatureData) => void;
}

export const SignatureManager: React.FC<SignatureManagerProps> = ({
  label,
  signature,
  onChange,
}) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'draw'>('upload');
  const signatureCanvasRef = useRef<SignatureCanvas>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleNameChange = (name: string) => {
    onChange({ ...signature, name });
  };

  const handleTitleChange = (title: string) => {
    onChange({ ...signature, title });
  };

  const handleSignatureUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 1024 * 1024) {
        alert('File size must be less than 1MB');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          onChange({
            ...signature,
            signatureImageUrl: reader.result as string,
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClearCanvas = () => {
    if (signatureCanvasRef.current) {
      signatureCanvasRef.current.clear();
    }
  };

  const handleSaveSignature = () => {
    if (signatureCanvasRef.current && !signatureCanvasRef.current.isEmpty()) {
      const signatureDataURL = signatureCanvasRef.current.toDataURL();
      onChange({
        ...signature,
        signatureImageUrl: signatureDataURL,
      });
    }
  };

  const handleRemoveSignature = () => {
    onChange({
      ...signature,
      signatureImageUrl: undefined,
    });
  };

  return (
    <div className="space-y-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{label}</h3>
      
      {/* Name and Title fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Name
          </label>
          <input
            type="text"
            value={signature.name}
            onChange={(e) => handleNameChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="Enter name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Title/Position
          </label>
          <input
            type="text"
            value={signature.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="Enter title"
          />
        </div>
      </div>

      {/* Signature tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('upload')}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'upload'
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            <Upload className="w-4 h-4 inline mr-2" />
            Upload Signature
          </button>
          <button
            onClick={() => setActiveTab('draw')}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'draw'
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            <Edit3 className="w-4 h-4 inline mr-2" />
            Draw Signature
          </button>
        </nav>
      </div>

      {/* Tab content */}
      {activeTab === 'upload' ? (
        <div className="space-y-4">
          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/jpg"
              onChange={handleSignatureUpload}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full px-4 py-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-center hover:border-gray-400 dark:hover:border-gray-500 transition-colors bg-gray-50 dark:bg-gray-700"
            >
              <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Click to upload signature image
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                PNG, JPG up to 1MB
              </p>
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="border border-gray-300 dark:border-gray-600 rounded-lg bg-white">
            <SignatureCanvas
              ref={signatureCanvasRef}
              canvasProps={{
                width: 350,
                height: 120,
                className: 'signature-canvas w-full h-full max-w-full',
              }}
              backgroundColor="white"
            />
          </div>
          <div className="flex space-x-2">
            <button
              onClick={handleClearCanvas}
              className="flex items-center px-3 py-2 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <RotateCcw className="w-4 h-4 mr-1" />
              Clear
            </button>
            <button
              onClick={handleSaveSignature}
              className="flex items-center px-3 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              <Check className="w-4 h-4 mr-1" />
              Save Signature
            </button>
          </div>
        </div>
      )}

      {/* Signature preview */}
      {signature.signatureImageUrl && (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Current Signature
          </label>
          <div className="relative group">
            <img
              src={signature.signatureImageUrl}
              alt="Signature preview"
              className="w-full h-20 object-contain bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg"
            />
            <button
              onClick={handleRemoveSignature}
              className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};