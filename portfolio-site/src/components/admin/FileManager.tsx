'use client'

import { useState, useEffect } from 'react'
import { Upload, Download, Trash2, Eye, FileText, Award, Star } from 'lucide-react'
import DragDropUpload from './DragDropUpload'

interface FileItem {
  name: string
  path: string
  size: number
  type: 'certificate' | 'achievement' | 'project'
}

interface FileManagerProps {
  onFileUpload: (file: File, type: 'resume' | 'certificate' | 'achievement' | 'project') => void
}

export default function FileManager({ onFileUpload }: FileManagerProps) {
  const [files, setFiles] = useState<{ [key: string]: FileItem[] }>({
    certificates: [],
    achievements: [],
    projects: []
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadFiles()
  }, [])

  const loadFiles = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/admin/files')
      if (response.ok) {
        const data = await response.json()
        setFiles(data)
      }
    } catch (error) {
      console.error('Failed to load files:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleFileUpload = async (file: File, type: 'resume' | 'certificate' | 'achievement' | 'project') => {
    await onFileUpload(file, type)
    loadFiles() // Refresh file list
  }

  const deleteFile = async (filePath: string, type: string) => {
    if (!confirm('Are you sure you want to delete this file?')) return

    try {
      const response = await fetch('/api/admin/files', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filePath, type })
      })

      if (response.ok) {
        loadFiles()
        alert('File deleted successfully')
      } else {
        alert('Failed to delete file')
      }
    } catch (error) {
      console.error('Delete failed:', error)
      alert('Delete failed')
    }
  }

  const downloadFile = (filePath: string) => {
    window.open(`/api/admin/download?file=${encodeURIComponent(filePath)}`, '_blank')
  }

  const getIcon = (type: string) => {
    switch (type) {
      case 'certificates': return <Award className="text-yellow-600" size={20} />
      case 'achievements': return <Star className="text-purple-600" size={20} />
      case 'projects': return <FileText className="text-blue-600" size={20} />
      default: return <FileText className="text-gray-600" size={20} />
    }
  }

  const getUploadType = (category: string): 'certificate' | 'achievement' | 'project' => {
    switch (category) {
      case 'certificates': return 'certificate'
      case 'achievements': return 'achievement'
      case 'projects': return 'project'
      default: return 'certificate'
    }
  }

  return (
    <div className="space-y-8">
      {/* Resume Upload */}
      <div className="admin-card p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white">
            <FileText size={20} />
          </div>
          Resume Upload
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">Upload your latest resume in PDF format</p>
        <DragDropUpload
          onFileUpload={handleFileUpload}
          type="resume"
          accept=".pdf,.doc,.docx"
        />
      </div>

      {/* File Categories */}
      {Object.entries(files).map(([category, fileList]) => (
        <div key={category} className="admin-card p-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3 capitalize">
            <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg text-white">
              {getIcon(category)}
            </div>
            {category}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {category === 'certificates' && 'Upload your professional certifications and course completion certificates'}
            {category === 'achievements' && 'Upload awards, recognitions, and achievement documents'}
            {category === 'projects' && 'Upload project completion certificates and related documentation'}
          </p>
          
          {/* Upload Area */}
          <div className="mb-6">
            <DragDropUpload
              onFileUpload={handleFileUpload}
              type={getUploadType(category)}
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
            />
          </div>

          {/* File List */}
          {fileList.length > 0 ? (
            <div className="grid gap-4">
              {fileList.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-xl border border-gray-200 dark:border-gray-600 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white">
                      {getIcon(category)}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">{file.name}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {(file.size / 1024 / 1024).toFixed(2)} MB • Uploaded
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => downloadFile(file.path)}
                      className="admin-button admin-button-primary p-2"
                      title="Download"
                    >
                      <Download size={16} />
                    </button>
                    <button
                      onClick={() => window.open(`/api/admin/download?file=${encodeURIComponent(file.path)}`, '_blank')}
                      className="admin-button admin-button-success p-2"
                      title="Preview"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      onClick={() => deleteFile(file.path, category)}
                      className="admin-button admin-button-danger p-2"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600">
              <div className="text-gray-400 mb-4">
                {getIcon(category)}
              </div>
              <p className="text-gray-600 dark:text-gray-400 font-medium">No {category} uploaded yet</p>
              <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">Drag and drop files above to get started</p>
            </div>
          )}
        </div>
      ))}

      {/* Upload Guidelines */}
      <div className="admin-card p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800">
        <h4 className="font-bold text-blue-800 dark:text-blue-200 mb-4 flex items-center gap-2">
          <div className="p-1 bg-blue-600 rounded text-white">
            📋
          </div>
          File Management Guidelines
        </h4>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="p-1 bg-yellow-500 rounded text-white text-sm">🏆</div>
              <div>
                <p className="font-semibold text-blue-800 dark:text-blue-200">Certificates</p>
                <p className="text-sm text-blue-700 dark:text-blue-300">Professional certifications (PDF, JPG, PNG)</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-1 bg-purple-500 rounded text-white text-sm">⭐</div>
              <div>
                <p className="font-semibold text-blue-800 dark:text-blue-200">Achievements</p>
                <p className="text-sm text-blue-700 dark:text-blue-300">Awards, recognitions, and accomplishments</p>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="p-1 bg-green-500 rounded text-white text-sm">🚀</div>
              <div>
                <p className="font-semibold text-blue-800 dark:text-blue-200">Projects</p>
                <p className="text-sm text-blue-700 dark:text-blue-300">Project completion certificates and docs</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-1 bg-blue-500 rounded text-white text-sm">📄</div>
              <div>
                <p className="font-semibold text-blue-800 dark:text-blue-200">Resume</p>
                <p className="text-sm text-blue-700 dark:text-blue-300">Latest resume in PDF format</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 p-3 bg-blue-100 dark:bg-blue-800/30 rounded-lg">
          <p className="text-sm text-blue-700 dark:text-blue-300 font-medium">
            💡 <strong>Tip:</strong> Files are automatically organized and can be linked to portfolio sections
          </p>
        </div>
      </div>
    </div>
  )
}