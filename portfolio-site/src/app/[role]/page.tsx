import { promises as fs } from 'fs'
import path from 'path'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Experience from '@/components/Experience'
import Education from '@/components/Education'
import SkillsWithLogos from '@/components/SkillsWithLogos'
import Projects from '@/components/Projects'
import Achievements from '@/components/Achievements'
import Certificates from '@/components/Certificates'
import Contact from '@/components/Contact'
import MouseSparkles from '@/components/MouseSparkles'
import ParticleBackground from '@/components/ParticleBackground'
import ScrollAnimations from '@/components/ScrollAnimations'
import IntroWrapper from '@/components/IntroWrapper'
import RoleDownloadButton from '@/components/RoleDownloadButton'
import { PortfolioData } from '@/lib/types'

async function getValidRoles(): Promise<string[]> {
  try {
    const rolesPath = path.join(process.cwd(), 'data', 'roles.json')
    const rolesData = await fs.readFile(rolesPath, 'utf8')
    const roles = JSON.parse(rolesData)
    return roles.map((role: any) => role.url)
  } catch {
    return ['pbi-dev-2024', 'az-data-eng-pro', 'az-admin-expert']
  }
}

async function getPortfolioData(role: string): Promise<PortfolioData> {
  try {
    const filePath = path.join(process.cwd(), 'data', `${role}.json`)
    const fileContents = await fs.readFile(filePath, 'utf8')
    return JSON.parse(fileContents)
  } catch (error) {
    throw new Error('Portfolio data not found')
  }
}

async function getRoleResume(role: string): Promise<string | null> {
  try {
    const rolesPath = path.join(process.cwd(), 'data', 'roles.json')
    const rolesData = await fs.readFile(rolesPath, 'utf8')
    const roles = JSON.parse(rolesData)
    const roleData = roles.find((r: any) => r.url === role)
    return roleData?.resumeFile || null
  } catch {
    return null
  }
}

export default async function RolePage({ params }: { params: { role: string } }) {
  const validRoles = await getValidRoles()
  
  if (!validRoles.includes(params.role)) {
    notFound()
  }

  const portfolioData = await getPortfolioData(params.role)
  const roleResume = await getRoleResume(params.role)

  return (
    <IntroWrapper introLetter={portfolioData.introLetter || 'H'}>
      <main className="min-h-screen relative">
        <ParticleBackground />
        <Header />
        <MouseSparkles />
        <ScrollAnimations />
        <Hero personalInfo={portfolioData.personalInfo} roleResume={roleResume} />
        <Experience experiences={portfolioData.experience} />
        <Education education={portfolioData.education} />
        <SkillsWithLogos skills={portfolioData.skills} />
        <Projects projects={portfolioData.projects} />
        <Achievements achievements={portfolioData.achievements || []} />
        <Certificates certificates={portfolioData.certificates || []} personalInfo={portfolioData.personalInfo} />
        <Contact personalInfo={portfolioData.personalInfo} />
        
        <footer className="relative bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 text-white py-12 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 animate-gradient-shift"></div>
          <div className="container-max text-center relative z-10">
            <div className="mb-6">
              <h3 className="text-2xl font-bold gradient-text-azure mb-2 animate-neon-glow">
                {portfolioData.personalInfo.name}
              </h3>
              <p className="text-blue-200 animate-wave">
                {portfolioData.personalInfo.title.split('|').map((part, index, array) => (
                  <span key={index} className="inline-block">
                    <span className="whitespace-nowrap">{part.trim()}</span>
                    {index < array.length - 1 && (
                      <span className="text-sm mx-1 text-blue-300/40 font-light"> | </span>
                    )}
                  </span>
                ))}
              </p>
            </div>
            <div className="flex justify-center space-x-6 mb-6">
              {[
                { logo: 'AZURE.png', name: 'Azure' },
                { logo: 'AWS.png', name: 'AWS' },
                { logo: 'PYTHON.jpg', name: 'Python' },
                { logo: 'POWER BI.png', name: 'Power BI' },
                { logo: 'DATABRICKS.png', name: 'Databricks' },
                { logo: 'SNOWFLAKE.png', name: 'Snowflake' },
                { logo: 'AIRFLOW.png', name: 'Airflow' },
                { logo: 'SQL.png', name: 'SQL' }
              ].map((tech, i) => (
                <div key={i} className="group cursor-pointer" title={tech.name}>
                  <div className="w-8 h-8 relative opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                    <Image src={`/Skill Images/${tech.logo}`} alt={tech.name} fill className="object-contain" />
                  </div>
                </div>
              ))}
            </div>
            <p className="text-gray-200 mb-2 font-medium">
              © 2025 {portfolioData.personalInfo.name}. All rights reserved.
            </p>
            <p className="text-gray-300 text-sm">
              Built with ❤️ using Next.js 14, TypeScript, and Tailwind CSS
            </p>
          </div>
        </footer>
      </main>
    </IntroWrapper>
  )
}