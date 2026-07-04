import { promises as fs } from 'fs'
import path from 'path'
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
import { PortfolioData } from '@/lib/types'

async function getPortfolioData(): Promise<PortfolioData> {
  try {
    const filePath = path.join(process.cwd(), 'data', 'portfolio.json')
    const fileContents = await fs.readFile(filePath, 'utf8')
    return JSON.parse(fileContents)
  } catch (error) {
    console.error('Error reading portfolio data:', error)
    return {
      personalInfo: {
        name: 'Hrishabh Tripathi',
        title: 'Data Engineer',
        email: 'contact@example.com',
        phone: '+1 (555) 123-4567',
        location: 'Your City, Country',
        linkedin: 'https://linkedin.com/in/hrishabh-tripathi',
        github: 'https://github.com/hrishabh-tripathi',
        summary: 'Experienced Data Engineer with expertise in building scalable data pipelines and analytics solutions.'
      },
      experience: [],
      education: [],
      skills: [],
      projects: [],
      certificates: [],
      achievements: []
    }
  }
}

export default async function Home() {
  const portfolioData = await getPortfolioData()

  return (
    <IntroWrapper>
      <main id="top" className="min-h-screen relative">
        <ParticleBackground />
        <Header />
        <MouseSparkles />
        <ScrollAnimations />
        <Hero personalInfo={portfolioData.personalInfo} />
        <Experience experiences={portfolioData.experience} />
        <Education education={portfolioData.education} />
        <SkillsWithLogos skills={portfolioData.skills} />
        <Projects projects={portfolioData.projects} />
        <Achievements achievements={portfolioData.achievements || []} />
        <Certificates certificates={portfolioData.certificates} />
        <Contact personalInfo={portfolioData.personalInfo} />
        
        <footer className="relative bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 text-white py-12 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 animate-gradient-shift"></div>
          <div className="container-max text-center relative z-10">
            <div className="mb-6">
              <h3 className="text-2xl font-bold gradient-text-azure mb-2 animate-neon-glow">
                {portfolioData.personalInfo.name}
              </h3>
              <p className="text-blue-200 animate-wave">
                {portfolioData.personalInfo.title}
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
                <div
                  key={i}
                  className="group cursor-pointer"
                  title={tech.name}
                >
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