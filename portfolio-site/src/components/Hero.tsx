'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Github, Linkedin, Mail, MapPin, Phone, Download } from 'lucide-react'
import { PersonalInfo } from '@/lib/types'
import DownloadButton from './DownloadButton'

interface HeroProps {
  personalInfo: PersonalInfo
  roleResume?: string | null
}

export default function Hero({ personalInfo, roleResume }: HeroProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <section id="about" className="min-h-screen flex items-center section-padding bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-slate-800 dark:to-gray-900 relative overflow-hidden">
      {/* Tech Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Professional Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <defs>
              <pattern id="grid" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#64748b" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)"/>
          </svg>
        </div>
        

        

        
        {/* Parallax Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-32 h-32 bg-blue-500/5 rounded-full" data-parallax="0.3"></div>
          <div className="absolute bottom-20 left-20 w-24 h-24 bg-slate-500/5 rounded-full" data-parallax="0.5"></div>
          <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-blue-600/5 rounded" data-parallax="0.7"></div>
        </div>
      </div>
      
      <div className="container-max relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div className="space-y-6 lg:space-y-8 animate-slide-left hero-content">
            <div className="space-y-4 lg:space-y-6">
              <div className="inline-block">
                <span className="px-4 lg:px-6 py-2 lg:py-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-blue-200 dark:border-blue-700 text-gray-800 dark:text-white rounded-full text-sm lg:text-base font-semibold mb-4 lg:mb-6 inline-block shadow-lg">
                  👋 Welcome to my portfolio
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-gray-900 dark:text-white leading-tight">
                Hi, I'm{' '}
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-slate-700 via-blue-700 to-slate-700 bg-clip-text text-transparent font-extrabold relative z-10 break-words">
                    {personalInfo.name}
                  </span>
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/10 to-slate-600/10 rounded blur-sm"></div>
                </span>
              </h1>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-700 dark:text-gray-300 animate-slide-up" style={{animationDelay: '0.2s'}}>
                {personalInfo.title.split('|').map((part, index, array) => (
                  <span key={index}>
                    {part.trim()}
                    {index < array.length - 1 && (
                      <span className="text-sm sm:text-base md:text-lg mx-2 text-gray-400 dark:text-gray-500 font-normal">|</span>
                    )}
                  </span>
                ))}
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-gray-700 dark:text-gray-300 leading-relaxed max-w-2xl font-medium bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm p-4 lg:p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                {personalInfo.summary}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row flex-wrap gap-4 lg:gap-6">
              <a href="#contact" className="btn-primary group animate-float-up" style={{animationDelay: '0.6s'}}>
                <Mail size={20} className="group-hover:rotate-12 transition-transform" />
                Get In Touch
              </a>
              <div className="animate-float-up" style={{animationDelay: '0.8s'}}>
                {roleResume ? (
                  <button
                    onClick={() => window.open(`/resumes/roles/${roleResume}`, '_blank')}
                    className="btn-primary group shadow-2xl hover:shadow-3xl"
                  >
                    <Download size={20} className="group-hover:animate-bounce" />
                    Download Resume
                  </button>
                ) : (
                  <DownloadButton 
                    size="xl" 
                    showText={true}
                    className="shadow-2xl hover:shadow-3xl"
                  >
                    Download Resume
                  </DownloadButton>
                )}
              </div>
            </div>

            <div className="flex flex-wrap gap-6 pt-4">
              <div className="flex items-center gap-2 text-gray-800 dark:text-gray-200 font-semibold">
                <Phone size={18} className="text-green-600 dark:text-green-400" />
                <span>{personalInfo.phone}</span>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-primary-600 hover:text-white transition-colors"
              >
                <Linkedin size={20} />
              </a>
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-primary-600 hover:text-white transition-colors"
              >
                <Github size={20} />
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                className="p-3 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-primary-600 hover:text-white transition-colors"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end animate-slide-right">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
              {/* Floating background elements */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full animate-pulse opacity-20"></div>
              <div className="absolute inset-2 bg-gradient-to-br from-purple-400 to-pink-600 rounded-full animate-pulse opacity-30" style={{animationDelay: '1s'}}></div>
              
              <div className="relative w-full h-full gradient-border-animated rounded-full flex items-center justify-center p-1 floating">
                <div className="w-full h-full bg-gradient-to-br from-blue-500 via-purple-600 to-pink-600 rounded-full flex items-center justify-center p-2 animate-gradient-shift">
                  {personalInfo.profileImage ? (
                    <img
                      src={personalInfo.profileImage}
                      alt={personalInfo.name}
                      className="w-full h-full rounded-full object-cover border-4 border-white shadow-2xl"
                    />
                  ) : (
                    <div className="w-full h-full rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm flex items-center justify-center text-7xl font-bold shadow-2xl border-4 border-white">
                      <span className="text-gray-800 dark:text-white font-extrabold">
                        {personalInfo.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Enhanced Status indicator */}
              <div className="absolute -bottom-4 sm:-bottom-6 -right-4 sm:-right-6 px-3 py-2 sm:px-6 sm:py-3 bg-green-600/90 backdrop-blur-sm rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-base lg:text-lg shadow-lg animate-float-up border border-green-500">
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-300 rounded-full mr-2 animate-ping"></div>
                <span className="text-white font-semibold hidden sm:inline">Available for Work</span>
                <span className="text-white font-semibold sm:hidden">Available</span>
              </div>
              
              {/* Professional Tech Logos - Hidden on mobile to prevent overflow */}
              <div className="hidden md:block">
              <div className="absolute -top-8 -left-8 w-16 h-16 bg-white dark:bg-gray-800 rounded-2xl flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 animate-glow cloud-float border-2 border-blue-200 dark:border-blue-800" style={{animationDelay: '0.5s'}} title="Microsoft Azure">
                <div className="w-10 h-10 relative">
                  <Image src="/Skill Images/AZURE.png" alt="Azure" fill className="object-contain" />
                </div>
              </div>
              <div className="absolute top-8 -right-12 w-16 h-16 bg-white dark:bg-gray-800 rounded-2xl flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 animate-glow cloud-float border-2 border-orange-200 dark:border-orange-800" style={{animationDelay: '1.5s'}} title="Amazon Web Services">
                <div className="w-10 h-10 relative">
                  <Image src="/Skill Images/AWS.png" alt="AWS" fill className="object-contain" />
                </div>
              </div>
              <div className="absolute -bottom-12 left-8 w-16 h-16 bg-white dark:bg-gray-800 rounded-2xl flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 data-pulse border-2 border-blue-200 dark:border-blue-800" style={{animationDelay: '2.5s'}} title="Python">
                <div className="w-10 h-10 relative">
                  <Image src="/Skill Images/PYTHON.jpg" alt="Python" fill className="object-contain" />
                </div>
              </div>
              <div className="absolute top-1/2 -left-12 w-12 h-12 bg-white dark:bg-gray-800 rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 floating border-2 border-yellow-200 dark:border-yellow-800" style={{animationDelay: '3s'}} title="Power BI">
                <div className="w-8 h-8 relative">
                  <Image src="/Skill Images/POWER BI.png" alt="Power BI" fill className="object-contain" />
                </div>
              </div>
              <div className="absolute -top-4 right-1/4 w-12 h-12 bg-white dark:bg-gray-800 rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 animate-bounce-gentle border-2 border-red-200 dark:border-red-800" style={{animationDelay: '3.5s'}} title="Databricks">
                <div className="w-8 h-8 relative">
                  <Image src="/Skill Images/DATABRICKS.png" alt="Databricks" fill className="object-contain" />
                </div>
              </div>
              <div className="absolute bottom-1/4 -right-8 w-14 h-14 bg-white dark:bg-gray-800 rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 animate-rotate-slow border-2 border-cyan-200 dark:border-cyan-800" style={{animationDelay: '4s'}} title="Snowflake">
                <div className="w-9 h-9 relative">
                  <Image src="/Skill Images/SNOWFLAKE.png" alt="Snowflake" fill className="object-contain" />
                </div>
              </div>
              <div className="absolute top-1/3 right-8 w-10 h-10 bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 cloud-float border-2 border-green-200 dark:border-green-800" style={{animationDelay: '5s'}} title="Apache Airflow">
                <div className="w-6 h-6 relative">
                  <Image src="/Skill Images/AIRFLOW.png" alt="Airflow" fill className="object-contain" />
                </div>
              </div>
              <div className="absolute bottom-8 -left-4 w-12 h-12 bg-white dark:bg-gray-800 rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 data-pulse border-2 border-gray-200 dark:border-gray-600" style={{animationDelay: '6s'}} title="SQL Database">
                <div className="w-8 h-8 relative">
                  <Image src="/Skill Images/SQL.png" alt="SQL" fill className="object-contain" />
              </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}