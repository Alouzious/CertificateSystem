import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, Image } from 'lucide-react';
import { LogoData } from '../../types';

interface LogoUploaderProps {
  label: string;
  logo?: LogoData;
  onUpload: (logo: LogoData) => void;
  onRemove: () => void;
}

export const LogoUploader: React.FC<LogoUploaderProps> = ({ 
  label, 
  logo, 
  onUpload, 
  onRemove 
}) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('File size must be less than 2MB');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          onUpload({
            url: reader.result as string,
            name: file.name,
          });
        }
      };
      reader.readAsDataURL(file);
    }
  }, [onUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.svg', '.gif']
    },
    maxFiles: 1,
    multiple: false,
  });

  if (logo) {
    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
        <div className="relative group">
          <img 
            src={logo.url} 
            alt={logo.name} 
            className="w-full h-24 object-contain bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg"
          />
          <button
            onClick={onRemove}
            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X size={16} />
          </button>
          <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
            {logo.name}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
          isDragActive
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
            : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 bg-gray-50 dark:bg-gray-800'
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center space-y-2">
          {isDragActive ? (
            <Upload className="w-8 h-8 text-blue-500" />
          ) : (
            <Image className="w-8 h-8 text-gray-400" />
          )}
          <div className="text-sm text-gray-600 dark:text-gray-300">
            {isDragActive ? (
              <p>Drop the logo here...</p>
            ) : (
              <div>
                <p>Click to upload logo</p>
                <p className="text-xs text-gray-500 mt-1">PNG, JPG, SVG up to 2MB</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};