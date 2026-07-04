'use client'

import { Education as EducationType } from '@/lib/types'
import { GraduationCap, Calendar, Award } from 'lucide-react'

interface EducationProps {
  education: EducationType[]
}

export default function Education({ education }: EducationProps) {
  return (
    <section id="education" className="section-padding">
      <div className="container-max">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Education
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Academic foundation and continuous learning journey
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {education.map((edu, index) => (
            <div 
              key={edu.id} 
              className="card card-hover animate-slide-up"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="flex items-start gap-6">
                <div className="p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex-shrink-0">
                  <GraduationCap className="w-8 h-8 text-white" />
                </div>
                
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {edu.degree}
                  </h3>
                  <h4 className="text-xl font-semibold gradient-text mb-3">
                    {edu.institution}
                  </h4>
                  
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <Calendar size={16} />
                      <span>{edu.duration}</span>
                    </div>
                    {edu.gpa && (
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <Award size={16} />
                        <span>GPA: {edu.gpa}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full" style={{width: '90%'}}></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}