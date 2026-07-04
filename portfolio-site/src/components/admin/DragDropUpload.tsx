'use client'

import { useState, useCallback } from 'react'
import { Upload, X, FileText, Award } from 'lucide-react'

interface DragDropUploadProps {
  onFileUpload: (file: File, type: 'resume' | 'certificate' | 'achievement' | 'project') => void
  type: 'resume' | 'certificate' | 'achievement' | 'project'
  accept?: string
}

export default function DragDropUpload({ onFileUpload, type, accept = '.pdf,.doc,.docx,.jpg,.jpeg,.png' }: DragDropUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    
    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      const file = files[0]
      setUploadedFile(file)
      onFileUpload(file, type)
    }
  }, [onFileUpload, type])

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      const file = files[0]
      setUploadedFile(file)
      onFileUpload(file, type)
    }
  }, [onFileUpload, type])

  const removeFile = () => {
    setUploadedFile(null)
  }

  return (
    <div className="w-full">
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 ${
          isDragOver
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
            : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {uploadedFile ? (
          <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="flex items-center gap-3">
              {type === 'resume' ? <FileText className="text-green-600" size={24} /> : 
               type === 'certificate' ? <Award className="text-green-600" size={24} /> :
               type === 'achievement' ? <Award className="text-purple-600" size={24} /> :
               <FileText className="text-blue-600" size={24} />}
              <div>
                <p className="font-medium text-green-800 dark:text-green-200">{uploadedFile.name}</p>
                <p className="text-sm text-green-600 dark:text-green-400">
                  {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            <button
              onClick={removeFile}
              className="text-red-500 hover:text-red-700 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        ) : (
          <>
            <div className="mb-4">
              {type === 'resume' ? <FileText className="mx-auto text-gray-400" size={48} /> : 
               type === 'certificate' ? <Award className="mx-auto text-gray-400" size={48} /> :
               type === 'achievement' ? <Award className="mx-auto text-purple-400" size={48} /> :
               <FileText className="mx-auto text-blue-400" size={48} />}
            </div>
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2 capitalize">
              Upload {type}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Drag and drop your {type} here, or click to browse
            </p>
            <input
              type="file"
              accept={accept}
              onChange={handleFileSelect}
              className="hidden"
              id={`file-upload-${type}`}
            />
            <label
              htmlFor={`file-upload-${type}`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
            >
              <Upload size={20} />
              Choose File
            </label>
          </>
        )}
      </div>
    </div>
  )
}