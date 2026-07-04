'use client'

import { useState } from 'react'
import DragDropUpload from './DragDropUpload'
import { FileText, Award, Download, Trash2 } from 'lucide-react'

interface FileUploadSectionProps {
  onFileUpload: (file: File, type: 'resume' | 'certificate' | 'achievement' | 'project') => void
  resumeFile?: string
  certificates?: Array<{ id: string; name: string; file?: string }>
}

export default function FileUploadSection({ onFileUpload, resumeFile, certificates = [] }: FileUploadSectionProps) {
  const [uploadedFiles, setUploadedFiles] = useState<{ [key: string]: File }>({})

  const handleFileUpload = (file: File, type: 'resume' | 'certificate' | 'achievement' | 'project') => {
    const key = `${type}-${Date.now()}`
    setUploadedFiles(prev => ({ ...prev, [key]: file }))
    onFileUpload(file, type)
  }

  const removeUploadedFile = (key: string) => {
    setUploadedFiles(prev => {
      const newFiles = { ...prev }
      delete newFiles[key]
      return newFiles
    })
  }

  return (
    <div className="space-y-8">
      {/* Resume Upload */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <FileText size={20} />
          Resume Upload
        </h3>
        <DragDropUpload
          onFileUpload={handleFileUpload}
          type="resume"
          accept=".pdf,.doc,.docx"
        />
        {resumeFile && (
          <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="text-green-600" size={20} />
                <div>
                  <p className="font-medium text-green-800 dark:text-green-200">Current Resume</p>
                  <p className="text-sm text-green-600 dark:text-green-400">{resumeFile}</p>
                </div>
              </div>
              <a
                href={`/api/download-resume`}
                className="text-blue-600 hover:text-blue-800 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Download size={20} />
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Certificate Upload */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Award size={20} />
          Certificate Upload
        </h3>
        <DragDropUpload
          onFileUpload={handleFileUpload}
          type="certificate"
          accept=".pdf,.jpg,.jpeg,.png"
        />
        
        {/* Uploaded Files Display */}
        {Object.entries(uploadedFiles).length > 0 && (
          <div className="mt-6 space-y-3">
            <h4 className="font-medium text-gray-900 dark:text-white">Recently Uploaded</h4>
            {Object.entries(uploadedFiles).map(([key, file]) => (
              <div key={key} className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="flex items-center gap-3">
                  {key.startsWith('resume') ? (
                    <FileText className="text-blue-600" size={20} />
                  ) : (
                    <Award className="text-blue-600" size={20} />
                  )}
                  <div>
                    <p className="font-medium text-blue-800 dark:text-blue-200">{file.name}</p>
                    <p className="text-sm text-blue-600 dark:text-blue-400">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => removeUploadedFile(key)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Existing Certificates */}
        {certificates.length > 0 && (
          <div className="mt-6 space-y-3">
            <h4 className="font-medium text-gray-900 dark:text-white">Existing Certificates</h4>
            {certificates.map((cert) => (
              <div key={cert.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center gap-3">
                  <Award className="text-gray-600 dark:text-gray-400" size={20} />
                  <div>
                    <p className="font-medium text-gray-800 dark:text-gray-200">{cert.name}</p>
                    {cert.file && (
                      <p className="text-sm text-gray-600 dark:text-gray-400">{cert.file}</p>
                    )}
                  </div>
                </div>
                {cert.file && (
                  <a
                    href={`/api/download-certificate/${cert.id}`}
                    className="text-blue-600 hover:text-blue-800 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Download size={16} />
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Upload Instructions */}
      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">Upload Guidelines</h4>
        <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
          <li>• Resume: PDF, DOC, or DOCX format (max 10MB)</li>
          <li>• Certificates: PDF, JPG, JPEG, or PNG format (max 5MB each)</li>
          <li>• Files are automatically saved and can be downloaded later</li>
          <li>• Drag and drop multiple files or click to browse</li>
        </ul>
      </div>
    </div>
  )
}