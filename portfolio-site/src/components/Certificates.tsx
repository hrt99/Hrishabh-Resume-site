'use client'

import { Certificate, PersonalInfo } from '@/lib/types'
import { Award, Download, ExternalLink, Calendar } from 'lucide-react'

interface CertificatesProps {
  certificates: Certificate[]
  personalInfo?: PersonalInfo
}

export default function Certificates({ certificates, personalInfo }: CertificatesProps) {
  console.log('Certificates data:', certificates);
  return (
    <section id="certificates" className="section-padding">
      <div className="container-max">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            🏆 Professional Certifications
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Industry-recognized certifications validating expertise in cloud platforms, data engineering, and analytics
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-500 to-orange-500 mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificates.map((cert, index) => (
            <div 
              key={cert.id} 
              className="card group hover:scale-105 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className={`p-3 rounded-lg flex-shrink-0 ${
                  cert.issuer === 'Microsoft' ? 'bg-blue-100 dark:bg-blue-900/20' :
                  cert.issuer === 'Amazon Web Services' ? 'bg-orange-100 dark:bg-orange-900/20' :
                  cert.issuer === 'LOMA' ? 'bg-green-100 dark:bg-green-900/20' :
                  'bg-purple-100 dark:bg-purple-900/20'
                }`}>
                  <Award className={`w-6 h-6 ${
                    cert.issuer === 'Microsoft' ? 'text-blue-600 dark:text-blue-400' :
                    cert.issuer === 'Amazon Web Services' ? 'text-orange-600 dark:text-orange-400' :
                    cert.issuer === 'LOMA' ? 'text-green-600 dark:text-green-400' :
                    'text-purple-600 dark:text-purple-400'
                  }`} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {cert.name}
                  </h3>
                  <p className="text-primary-600 dark:text-primary-400 font-medium mb-2">
                    {cert.issuer}
                  </p>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm">
                      <Calendar size={14} />
                      <span>Issued: {cert.date}</span>
                    </div>
                    {cert.expires && (
                      <div className="text-gray-500 dark:text-gray-500 text-xs">
                        Expires: {cert.expires}
                      </div>
                    )}
                    {cert.credentialId && (
                      <div className="text-gray-500 dark:text-gray-500 text-xs font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                        ID: {cert.credentialId}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                {(cert as any).file && (
                  <a
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-900/30 px-3 py-2 rounded-lg transition-colors font-medium"
                  >
                    <Download size={14} />
                    Download PDF
                  </a>
                )}
                {cert.url && (
                  <a
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  >
                    <ExternalLink size={14} />
                    Verify
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {personalInfo?.accredible && (
          <div className="mt-12 text-center">
            <a
              href={personalInfo.accredible}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <Award size={24} />
              <span>View More Credentials on Accredible</span>
              <ExternalLink size={20} />
            </a>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-4">
              Additional certifications and digital badges available on my Accredible profile
            </p>
          </div>
        )}

        {certificates.length === 0 && (
          <div className="text-center py-12">
            <Award className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">
              No certificates uploaded yet. Use the admin panel to add your certifications.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}