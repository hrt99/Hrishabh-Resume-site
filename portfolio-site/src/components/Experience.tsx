'use client'

import { Experience as ExperienceType } from '@/lib/types'
import { Calendar, MapPin } from 'lucide-react'

interface ExperienceProps {
  experiences: ExperienceType[]
}

export default function Experience({ experiences }: ExperienceProps) {
  return (
    <section id="experience" className="section-padding bg-gradient-to-br from-white via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900">
      
      <div className="container-max relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            💼 Work Experience
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            My professional journey and key accomplishments in data engineering
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mt-6 rounded-full animate-gradient-shift"></div>
        </div>

        <div className="relative">
          {/* Enhanced Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 hidden md:block rounded-full animate-gradient-shift"></div>
          
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div key={exp.id} className="relative">
                {/* Enhanced Timeline dot */}
                <div className="absolute left-6 w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full border-4 border-white dark:border-gray-900 shadow-lg hidden md:block animate-pulse"></div>
                
                <div className="card glass-morphism card-hover animate-float-up ml-0 md:ml-20 relative overflow-hidden" style={{ animationDelay: `${index * 0.2}s` }}>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="flex flex-col md:flex-row md:items-start gap-8 relative z-10">
                    <div className="md:w-1/3">
                      <div className="inline-block px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full text-sm font-medium mb-4 animate-bounce-gentle">
                        {index === 0 ? '✨ Current Role' : '📅 Previous Role'}
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 hover:text-transparent hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:bg-clip-text transition-all duration-300">
                        {exp.position}
                      </h3>
                      <h4 className="text-xl font-semibold gradient-text mb-4 animate-shimmer">
                        {exp.company}
                      </h4>
                      <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300 mb-6">
                        <Calendar size={18} className="text-blue-600 dark:text-blue-400" />
                        <span className="font-semibold">{exp.duration}</span>
                      </div>
                    </div>

                    <div className="md:w-2/3">
                      <ul className="space-y-4 mb-8">
                        {exp.description.map((desc, i) => (
                          <li key={i} className="flex items-start gap-4 text-gray-800 dark:text-gray-200 text-lg">
                            <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mt-1 flex-shrink-0 shadow-sm"></div>
                            <span className="leading-relaxed font-medium text-justify hyphens-auto">{desc}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="flex flex-wrap gap-3">
                        {exp.technologies.map((tech, techIndex) => (
                          <span
                            key={tech}
                            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 animate-slide-up"
                            style={{ animationDelay: `${(index * 0.2) + (techIndex * 0.1)}s` }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}