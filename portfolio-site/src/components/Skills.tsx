'use client'

import { Skill } from '@/lib/types'
import { Code, Database, Cloud, Wrench } from 'lucide-react'

interface SkillsProps {
  skills: Skill[]
}

const categoryIcons: { [key: string]: any } = {
  'Programming Languages': Code,
  'Big Data Technologies': Database,
  'Cloud Platforms': Cloud,
  'Databases': Database,
  'Tools': Wrench,
}

export default function Skills({ skills }: SkillsProps) {
  return (
    <section id="skills" className="section-padding bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-purple-900">
      <div className="container-max">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Technical Skills
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Technologies and tools I work with to build robust data solutions
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-600 mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {skills.map((skillCategory, index) => {
            const IconComponent = categoryIcons[skillCategory.category] || Code
            
            return (
              <div 
                key={skillCategory.category} 
                className="card card-hover animate-slide-up group"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:gradient-text transition-all duration-300">
                    {skillCategory.category}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-3">
                  {skillCategory.skills.map((skill, skillIndex) => (
                    <span
                      key={skill}
                      className="px-4 py-2 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 text-gray-700 dark:text-gray-300 rounded-xl text-sm font-semibold hover:from-blue-100 hover:to-purple-100 dark:hover:from-blue-900 dark:hover:to-purple-900 hover:text-blue-800 dark:hover:text-blue-200 transition-all duration-300 cursor-default transform hover:scale-105 shadow-sm hover:shadow-md"
                      style={{ animationDelay: `${(index * 0.15) + (skillIndex * 0.05)}s` }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}