'use client'

import { useState } from 'react'
import Image from 'next/image'

// Map of technologies from YOUR ACTUAL resume with available logo images
const techCategories = {
  'Cloud Platforms': [
    { name: 'AZURE.png', title: 'Microsoft Azure', color: 'from-blue-500 to-cyan-500' },
    { name: 'AWS.png', title: 'Amazon Web Services', color: 'from-orange-500 to-yellow-500' }
  ],
  'Data & Analytics Platforms': [
    { name: 'DATABRICKS.png', title: 'Azure Databricks', color: 'from-red-500 to-orange-500' },
    { name: 'SNOWFLAKE.png', title: 'Snowflake', color: 'from-cyan-400 to-blue-500' },
    { name: 'POWER BI.png', title: 'Power BI', color: 'from-yellow-500 to-orange-500' },
    { name: 'ORACLE.png', title: 'Oracle Database', color: 'from-red-600 to-red-700' },
    { name: 'DB2.png', title: 'IBM Db2', color: 'from-blue-700 to-cyan-600' }
  ],
  'ETL & Orchestration': [
    { name: 'AIRFLOW.png', title: 'Apache Airflow', color: 'from-teal-500 to-green-500' },
    { name: 'INFORMATICA.png', title: 'Informatica PowerCenter', color: 'from-purple-600 to-pink-600' },
    { name: 'CONTROL M.png', title: 'Control-M', color: 'from-indigo-600 to-purple-600' },
    { name: 'Power Automate.png', title: 'Power Automate', color: 'from-blue-500 to-purple-500' }
  ],
  'Programming & Scripting': [
    { name: 'PYTHON.jpg', title: 'Python', color: 'from-blue-600 to-yellow-400' },
    { name: 'SQL.png', title: 'SQL', color: 'from-gray-600 to-blue-600' },
    { name: 'POWERSHELL.png', title: 'PowerShell', color: 'from-blue-700 to-indigo-600' },
    { name: 'VBA.png', title: 'VBA', color: 'from-green-600 to-blue-600' }
  ],
  'Development & Operations': [
    { name: 'LINUX.jpg', title: 'Linux', color: 'from-gray-800 to-black' },
    { name: 'ECLIPSE.png', title: 'Eclipse IDE', color: 'from-purple-700 to-indigo-700' },
    { name: 'JIRA.jpg', title: 'Jira', color: 'from-blue-600 to-indigo-600' }
  ],
  'Mainframe': [
    { name: 'IBM Zos.jpg', title: 'IBM z/OS', color: 'from-blue-800 to-gray-700' }
  ]
}

interface Skill {
  category: string
  skills: string[]
}

interface SkillsWithLogosProps {
  skills: Skill[]
}

export default function SkillsWithLogos({ skills }: SkillsWithLogosProps) {
  const [activeCategory, setActiveCategory] = useState(0)

  return (
    <section id="skills" className="section-padding bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-900/20 dark:via-purple-900/20 dark:to-pink-900/20">
      <div className="container-max">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            🚀 Technology Stack
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Comprehensive expertise across modern data engineering, cloud platforms, and enterprise tools
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mx-auto mt-6 rounded-full animate-gradient-shift"></div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {skills?.map((skill, index) => (
            <button
              key={index}
              onClick={() => setActiveCategory(index)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                activeCategory === index
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {skill.category}
            </button>
          )) || []}
        </div>

        {/* Skills List */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {skills[activeCategory]?.skills?.map((skillName, index) => (
            <span
              key={skillName}
              className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {skillName}
            </span>
          )) || []}
        </div>
        
        {/* Technology Categories */}
        <div className="space-y-12">
          {Object.entries(techCategories).map(([category, techs], categoryIndex) => (
            <div key={category} className="animate-slide-up" style={{ animationDelay: `${categoryIndex * 0.2}s` }}>
              <h3 className="text-2xl font-bold text-center mb-8 text-gray-800 dark:text-white">
                {category === 'Cloud Platforms' && '☁️'}
                {category === 'Data & Analytics Platforms' && '📊'}
                {category === 'ETL & Orchestration' && '🔄'}
                {category === 'Programming & Scripting' && '💻'}
                {category === 'Development & Operations' && '🛠️'}
                {' '}{category}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 justify-items-center">
                {techs.map((tech, index) => (
                  <div
                    key={tech.name}
                    className="group cursor-pointer animate-slide-up"
                    style={{ animationDelay: `${(categoryIndex * 0.2) + (index * 0.1)}s` }}
                  >
                    <div className={`bg-gradient-to-br ${tech.color} p-1 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-110 hover:rotate-3`}>
                      <div className="bg-white dark:bg-gray-800 rounded-xl p-4">
                        <div className="w-16 h-16 relative mx-auto group-hover:animate-pulse">
                          <Image
                            src={`/Skill Images/${tech.name}`}
                            alt={tech.title}
                            fill
                            className="object-contain group-hover:brightness-125 transition-all duration-300"
                          />
                        </div>
                      </div>
                    </div>
                    <p className="text-center mt-3 font-semibold text-gray-700 dark:text-gray-300 text-sm group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300">
                      {tech.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>


      </div>
    </section>
  )
}