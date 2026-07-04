'use client';

import { Download } from 'lucide-react';

interface RoleDownloadButtonProps {
  roleResume?: string | null;
  className?: string;
}

export default function RoleDownloadButton({ roleResume, className = '' }: RoleDownloadButtonProps) {
  const handleDownload = () => {
    if (roleResume) {
      window.open(`/resumes/roles/${roleResume}`, '_blank');
    } else {
      window.open('/api/download-resume', '_blank');
    }
  };

  return (
    <button
      onClick={handleDownload}
      className={`btn-primary group ${className}`}
    >
      <Download size={20} className="group-hover:animate-bounce" />
      Download Resume
    </button>
  );
}