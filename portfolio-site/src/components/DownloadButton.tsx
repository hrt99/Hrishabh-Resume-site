'use client'

import { useState } from 'react'
import { Download } from 'lucide-react'

interface DownloadButtonProps {
  className?: string
  children?: React.ReactNode
  showText?: boolean
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

export default function DownloadButton({ className = '', children, showText = false, size = 'lg' }: DownloadButtonProps) {
  const [downloadSuccess, setDownloadSuccess] = useState(false)

  const handleDownload = () => {
    // Direct download link
    const link = document.createElement('a')
    link.href = '/Hrishabh_Tripathi_Data_Engineer.pdf'
    link.download = 'Hrishabh_Tripathi_Data_Engineer.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    setDownloadSuccess(true)
    setTimeout(() => setDownloadSuccess(false), 3000)
  }

  const getSizeClasses = () => {
    switch(size) {
      case 'sm': return 'px-4 py-2 text-sm'
      case 'md': return 'px-6 py-3 text-base'
      case 'lg': return 'px-8 py-4 text-lg'
      case 'xl': return 'px-12 py-6 text-xl'
      default: return 'px-8 py-4 text-lg'
    }
  }

  const getIconSize = () => {
    switch(size) {
      case 'sm': return 16
      case 'md': return 20
      case 'lg': return 28
      case 'xl': return 36
      default: return 28
    }
  }

  return (
    <button 
      onClick={handleDownload}
      className={`relative overflow-hidden ${getSizeClasses()} bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 border-2 border-green-500 ${className}`}
    >
      <div className="flex items-center justify-center gap-3">
        <div className={`p-2 bg-white/20 rounded-xl transition-all duration-500 ${downloadSuccess ? 'scale-125 rotate-12' : ''}`}>
          <Download size={getIconSize()} className={`text-white transition-all duration-500 ${downloadSuccess ? 'animate-bounce' : ''}`} />
        </div>
        {showText && (
          <span className="font-bold">
            {children || 'Download Resume'}
          </span>
        )}
      </div>
      {downloadSuccess && (
        <>
          <div className="absolute inset-0 bg-green-400/30 animate-ping rounded-2xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl animate-bounce">✅</div>
        </>
      )}
    </button>
  )
}