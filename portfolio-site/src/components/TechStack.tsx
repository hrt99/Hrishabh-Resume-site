'use client'

import { useState } from 'react'
import { Cloud, Database, BarChart3, Workflow, Code, Server } from 'lucide-react'
import Image from 'next/image'

const techCategories = [
  {
    id: 'cloud',
    name: 'Cloud Platforms',
    icon: <Cloud className="w-8 h-8" />,
    color: 'from-blue-500 to-cyan-500',
    technologies: [
      'Microsoft Azure', 'AWS', 'Azure Data Factory', 'Azure Databricks', 'Azure Monitor', 'Azure SQL Database', 'Azure Data Lake Gen2', 'Azure Blob Storage', 'AWS Glue', 'AWS Redshift', 'AWS S3'
    ]
  },
  {
    id: 'data',
    name: 'Data & Analytics',
    icon: <Database className="w-8 h-8" />,
    color: 'from-purple-500 to-pink-500',
    technologies: [
      'Power BI', 'Azure Synapse', 'Snowflake', 'Oracle Database', 'SQL Server', 'Tableau', 'PostgreSQL', 'MongoDB', 'Redis'
    ]
  },
  {
    id: 'etl',
    name: 'ETL & Orchestration',
    icon: <Workflow className="w-8 h-8" />,
    color: 'from-green-500 to-emerald-500',
    technologies: [
      'Azure Data Factory', 'Apache Airflow', 'Tidal', 'Control-M', 'Informatica PowerCenter', 'Informatica ETL', 'SSIS', 'dbt'
    ]
  },
  {
    id: 'programming',
    name: 'Programming & Tools',
    icon: <Code className="w-8 h-8" />,
    color: 'from-orange-500 to-red-500',
    technologies: [
      'Python', 'SQL', 'Java', 'PowerShell', 'VBA', 'Power Query', 'Bash', 'JavaScript', 'C#', 'Scala'
    ]
  }
]

export default function TechStack() {
  const [activeCategory, setActiveCategory] = useState('cloud')

  return (
    <section className="section-padding bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900">
      <div className="container-max">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Technology Stack
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Comprehensive expertise across modern data engineering and cloud technologies
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {techCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center gap-3 px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                activeCategory === category.id
                  ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {category.icon}
              {category.name}
            </button>
          ))}
        </div>

        {/* Technology Grid */}
        <div className="flex flex-wrap justify-center gap-3">
          {techCategories
            .find(cat => cat.id === activeCategory)
            ?.technologies.map((tech, index) => (
              <span
                key={tech}
                className={`px-4 py-2 bg-gradient-to-r ${
                  techCategories.find(cat => cat.id === activeCategory)?.color
                } text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-slide-up`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {tech}
              </span>
            ))}
        </div>
        
        {/* Animated Logo Showcase */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">
            🚀 Technology Logos
          </h3>
          <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-6">
            {Array.from({ length: 16 }, (_, i) => {
              const logoFiles = [
                'download.png', 'download (1).png', 'download (2).png', 'download (3).png',
                'download (4).png', 'download (5).png', 'download (6).png', 'download (7).png',
                'download (8).png', 'download (9).png', 'download (10).png', 'download (11).png',
                'download (12).png', 'download.jpg', 'download (1).jpg', 'download (2).jpg'
              ]
              return (
                <div
                  key={i}
                  className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-110 hover:rotate-3 animate-slide-up group cursor-pointer"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className="w-12 h-12 relative mx-auto group-hover:animate-bounce">
                    <Image
                      src={`/Skill Images/${logoFiles[i]}`}
                      alt={`Technology ${i + 1}`}
                      fill
                      className="object-contain group-hover:brightness-110 transition-all duration-300"
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Floating Logo Animation */}
        <div className="relative mt-16 h-32 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex space-x-12">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="w-16 h-16 relative opacity-30 hover:opacity-80 transition-all duration-500 cursor-pointer floating animate-rotate-slow"
                  style={{animationDelay: `${i * 0.5}s`}}
                >
                  <Image
                    src={`/Skill Images/download${i > 0 ? ` (${i})` : ''}.png`}
                    alt={`Tech ${i + 1}`}
                    fill
                    className="object-contain hover:scale-125 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}