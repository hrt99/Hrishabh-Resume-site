'use client'

import { useState, useEffect } from 'react'
import { Lock, Save, Plus, Trash2, Upload, Eye, EyeOff } from 'lucide-react'
import { PortfolioData } from '@/lib/types'
import FileManager from '@/components/admin/FileManager'
import RoleManager from '@/components/admin/RoleManager'

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<PortfolioData | null>(null)
  const [activeTab, setActiveTab] = useState('personal')

  useEffect(() => {
    // Always show login first
    setIsAuthenticated(false)
  }, [])

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/admin/data')
      if (response.status === 401) {
        setIsAuthenticated(false)
        return
      }
      if (response.ok) {
        setIsAuthenticated(true)
        const portfolioData = await response.json()
        setData(portfolioData)
      } else {
        setIsAuthenticated(false)
      }
    } catch (error) {
      console.error('Auth check failed:', error)
      setIsAuthenticated(false)
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      })

      if (response.ok) {
        setIsAuthenticated(true)
        await checkAuth()
      } else {
        alert('Invalid password')
      }
    } catch (error) {
      alert('Login failed')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    if (!data) return
    
    setLoading(true)
    try {
      const response = await fetch('/api/admin/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      if (response.ok) {
        alert('Data saved successfully!')
      } else {
        alert('Failed to save data')
      }
    } catch (error) {
      alert('Error saving data')
    } finally {
      setLoading(false)
    }
  }

  const handleFileUpload = async (file: File, type: 'resume' | 'certificate' | 'achievement' | 'project') => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('type', type)

    try {
      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData
      })
      
      if (response.ok) {
        const result = await response.json()
        alert(`${type} uploaded successfully!`)
        if (type === 'resume' && data) {
          setData({ ...data, resumeFile: result.filename })
        }
      } else {
        alert(`Failed to upload ${type}`)
      }
    } catch (error) {
      console.error('Upload failed:', error)
      alert('Upload failed')
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
          <div className="text-center mb-8">
            <Lock className="w-12 h-12 text-primary-600 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Panel</h1>
            <p className="text-gray-600 dark:text-gray-400">Enter password to access</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Admin Password"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white pr-12"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary justify-center"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>


        </div>
      </div>
    )
  }

  if (!data) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  const tabs = [
    { id: 'personal', label: 'Personal', icon: '👤' },
    { id: 'experience', label: 'Experience', icon: '💼' },
    { id: 'skills', label: 'Skills', icon: '🛠️' },
    { id: 'projects', label: 'Projects', icon: '🚀' },
    { id: 'certificates', label: 'Certificates', icon: '🏆' },
    { id: 'uploads', label: 'Files', icon: '📁' },
    { id: 'roles', label: 'Roles', icon: '🎭' },
    { id: 'settings', label: 'Settings', icon: '⚙️' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900">
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg border-b border-gray-200/50 dark:border-gray-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Portfolio Admin</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your portfolio content and settings</p>
            </div>
            <div className="flex gap-4">
              <button 
                onClick={handleSave} 
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed" 
                disabled={loading}
              >
                <Save size={18} />
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
              <button 
                onClick={() => {
                  document.cookie = 'admin-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
                  window.location.reload()
                }}
                className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-300"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50">
          <div className="border-b border-gray-200/50 dark:border-gray-700/50">
            <nav className="flex space-x-1 px-6 py-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-lg font-medium text-sm transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105'
                      : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700/50'
                  }`}
                >
                  <span className="text-lg">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-8">
            {activeTab === 'personal' && (
              <PersonalInfoForm data={data} setData={setData} />
            )}
            {activeTab === 'experience' && (
              <ExperienceForm data={data} setData={setData} />
            )}
            {activeTab === 'skills' && (
              <SkillsForm data={data} setData={setData} />
            )}
            {activeTab === 'projects' && (
              <ProjectsForm data={data} setData={setData} />
            )}
            {activeTab === 'certificates' && (
              <CertificatesForm data={data} setData={setData} />
            )}
            {activeTab === 'uploads' && (
              <FileManager 
                onFileUpload={handleFileUpload}
              />
            )}
            {activeTab === 'roles' && (
              <RoleManager />
            )}
            {activeTab === 'settings' && (
              <SettingsForm />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function PersonalInfoForm({ data, setData }: { data: PortfolioData, setData: (data: PortfolioData) => void }) {
  const updatePersonalInfo = (field: string, value: string) => {
    setData({
      ...data,
      personalInfo: { ...data.personalInfo, [field]: value }
    })
  }

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white">Personal Information</h3>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name</label>
          <input
            type="text"
            value={data.personalInfo.name}
            onChange={(e) => updatePersonalInfo('name', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Title</label>
          <input
            type="text"
            value={data.personalInfo.title}
            onChange={(e) => updatePersonalInfo('title', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
          <input
            type="email"
            value={data.personalInfo.email}
            onChange={(e) => updatePersonalInfo('email', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone</label>
          <input
            type="text"
            value={data.personalInfo.phone}
            onChange={(e) => updatePersonalInfo('phone', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Location</label>
          <input
            type="text"
            value={data.personalInfo.location}
            onChange={(e) => updatePersonalInfo('location', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">LinkedIn</label>
          <input
            type="url"
            value={data.personalInfo.linkedin}
            onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">GitHub</label>
          <input
            type="url"
            value={data.personalInfo.github}
            onChange={(e) => updatePersonalInfo('github', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Summary</label>
        <textarea
          rows={4}
          value={data.personalInfo.summary}
          onChange={(e) => updatePersonalInfo('summary', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
      </div>
    </div>
  )
}

function ExperienceForm({ data, setData }: { data: PortfolioData, setData: (data: PortfolioData) => void }) {
  const addExperience = () => {
    const newExp = {
      id: Date.now().toString(),
      company: '',
      position: '',
      duration: '',
      description: [''],
      technologies: []
    }
    setData({ ...data, experience: [...data.experience, newExp] })
  }

  const updateExperience = (index: number, field: string, value: any) => {
    const updated = [...data.experience]
    updated[index] = { ...updated[index], [field]: value }
    setData({ ...data, experience: updated })
  }

  const removeExperience = (index: number) => {
    const updated = data.experience.filter((_, i) => i !== index)
    setData({ ...data, experience: updated })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Work Experience</h3>
        <button onClick={addExperience} className="btn-primary">
          <Plus size={16} />
          Add Experience
        </button>
      </div>

      {data.experience.map((exp, index) => (
        <div key={exp.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
          <div className="flex justify-between items-start mb-4">
            <h4 className="font-medium text-gray-900 dark:text-white">Experience {index + 1}</h4>
            <button
              onClick={() => removeExperience(index)}
              className="text-red-600 hover:text-red-800"
            >
              <Trash2 size={16} />
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="Company"
              value={exp.company}
              onChange={(e) => updateExperience(index, 'company', e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <input
              type="text"
              placeholder="Position"
              value={exp.position}
              onChange={(e) => updateExperience(index, 'position', e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>

          <input
            type="text"
            placeholder="Duration (e.g., 2022 - Present)"
            value={exp.duration}
            onChange={(e) => updateExperience(index, 'duration', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white mb-4"
          />

          <textarea
            placeholder="Description (one point per line)"
            rows={4}
            value={exp.description.join('\n')}
            onChange={(e) => updateExperience(index, 'description', e.target.value.split('\n'))}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white mb-4"
          />

          <input
            type="text"
            placeholder="Technologies (comma separated)"
            value={exp.technologies.join(', ')}
            onChange={(e) => updateExperience(index, 'technologies', e.target.value.split(',').map(t => t.trim()))}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
      ))}
    </div>
  )
}

function SkillsForm({ data, setData }: { data: PortfolioData, setData: (data: PortfolioData) => void }) {
  const addSkillCategory = () => {
    const newCategory = { category: '', skills: [] }
    setData({ ...data, skills: [...data.skills, newCategory] })
  }

  const updateSkillCategory = (index: number, field: string, value: any) => {
    const updated = [...data.skills]
    updated[index] = { ...updated[index], [field]: value }
    setData({ ...data, skills: updated })
  }

  const removeSkillCategory = (index: number) => {
    const updated = data.skills.filter((_, i) => i !== index)
    setData({ ...data, skills: updated })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Skills</h3>
        <button onClick={addSkillCategory} className="btn-primary">
          <Plus size={16} />
          Add Category
        </button>
      </div>

      {data.skills.map((skillCat, index) => (
        <div key={index} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
          <div className="flex justify-between items-start mb-4">
            <h4 className="font-medium text-gray-900 dark:text-white">Category {index + 1}</h4>
            <button
              onClick={() => removeSkillCategory(index)}
              className="text-red-600 hover:text-red-800"
            >
              <Trash2 size={16} />
            </button>
          </div>

          <input
            type="text"
            placeholder="Category Name"
            value={skillCat.category}
            onChange={(e) => updateSkillCategory(index, 'category', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white mb-4"
          />

          <input
            type="text"
            placeholder="Skills (comma separated)"
            value={skillCat.skills.join(', ')}
            onChange={(e) => updateSkillCategory(index, 'skills', e.target.value.split(',').map(s => s.trim()))}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
      ))}
    </div>
  )
}

function ProjectsForm({ data, setData }: { data: PortfolioData, setData: (data: PortfolioData) => void }) {
  const [projectFiles, setProjectFiles] = useState<string[]>([])

  useEffect(() => {
    // Load project files
    fetch('/api/admin/files')
      .then(res => res.json())
      .then(data => {
        setProjectFiles(data.projects?.map((f: any) => f.name) || [])
      })
      .catch(console.error)
  }, [])

  const addProject = () => {
    const newProject = {
      id: Date.now().toString(),
      title: '',
      description: '',
      technologies: [],
      githubUrl: '',
      liveUrl: '',
      showCode: false,
      showLinks: false,
      certificateUrl: '',
      certificateFile: ''
    }
    setData({ ...data, projects: [...data.projects, newProject] })
  }

  const updateProject = (index: number, field: string, value: any) => {
    const updated = [...data.projects]
    updated[index] = { ...updated[index], [field]: value }
    setData({ ...data, projects: updated })
  }

  const removeProject = (index: number) => {
    const updated = data.projects.filter((_, i) => i !== index)
    setData({ ...data, projects: updated })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Projects</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Manage your project portfolio and visibility settings</p>
        </div>
        <button onClick={addProject} className="btn-primary flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300">
          <Plus size={16} />
          Add Project
        </button>
      </div>

      {data.projects.map((project, index) => (
        <div key={project.id} className="border border-gray-200 dark:border-gray-600 rounded-xl p-6 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 shadow-lg">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                {index + 1}
              </div>
              <h4 className="font-semibold text-gray-900 dark:text-white text-lg">Project {index + 1}</h4>
            </div>
            <button
              onClick={() => removeProject(index)}
              className="p-2 text-red-600 hover:text-red-800 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg transition-all duration-300"
              title="Delete Project"
            >
              <Trash2 size={18} />
            </button>
          </div>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Project Title"
              value={project.title}
              onChange={(e) => updateProject(index, 'title', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            />

            <textarea
              placeholder="Project Description"
              rows={4}
              value={project.description}
              onChange={(e) => updateProject(index, 'description', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
            />

            <input
              type="text"
              placeholder="Technologies (comma separated)"
              value={project.technologies.join(', ')}
              onChange={(e) => updateProject(index, 'technologies', e.target.value.split(',').map(t => t.trim()))}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            />

            {/* Visibility Controls */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <h5 className="font-medium text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <Eye size={16} />
                Visibility Settings
              </h5>
              <div className="grid md:grid-cols-2 gap-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={project.showCode || false}
                      onChange={(e) => updateProject(index, 'showCode', e.target.checked)}
                      className="sr-only"
                    />
                    <div className={`w-11 h-6 rounded-full transition-colors duration-300 ${project.showCode ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'}`}>
                      <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${project.showCode ? 'translate-x-5' : 'translate-x-0.5'} mt-0.5`}></div>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Show Code Links</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={project.showLinks || false}
                      onChange={(e) => updateProject(index, 'showLinks', e.target.checked)}
                      className="sr-only"
                    />
                    <div className={`w-11 h-6 rounded-full transition-colors duration-300 ${project.showLinks ? 'bg-purple-600' : 'bg-gray-300 dark:bg-gray-600'}`}>
                      <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${project.showLinks ? 'translate-x-5' : 'translate-x-0.5'} mt-0.5`}></div>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Show Live Links</span>
                </label>
              </div>
            </div>

            {/* URLs - Only show if toggles are enabled */}
            {(project.showCode || project.showLinks) && (
              <div className="grid md:grid-cols-2 gap-4">
                {project.showCode && (
                  <input
                    type="url"
                    placeholder="GitHub URL"
                    value={project.githubUrl || ''}
                    onChange={(e) => updateProject(index, 'githubUrl', e.target.value)}
                    className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  />
                )}
                {project.showLinks && (
                  <input
                    type="url"
                    placeholder="Live Demo URL"
                    value={project.liveUrl || ''}
                    onChange={(e) => updateProject(index, 'liveUrl', e.target.value)}
                    className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                  />
                )}
              </div>
            )}

            {/* Certificate File Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Certificate File</label>
              <select
                value={project.certificateFile || ''}
                onChange={(e) => {
                  const selectedFile = e.target.value
                  updateProject(index, 'certificateFile', selectedFile)
                  if (selectedFile) {
                    updateProject(index, 'certificateUrl', `/api/admin/download?file=Projects%2F${encodeURIComponent(selectedFile)}`)
                  } else {
                    updateProject(index, 'certificateUrl', '')
                  }
                }}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
              >
                <option value="">Select certificate file (optional)</option>
                {projectFiles.map(fileName => (
                  <option key={fileName} value={fileName}>
                    {fileName}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      ))}

      {data.projects.length === 0 && (
        <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600">
          <div className="text-gray-400 mb-4">
            <Plus size={48} className="mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No Projects Yet</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">Add your first project to get started</p>
          <button onClick={addProject} className="btn-primary">
            Add Your First Project
          </button>
        </div>
      )}
    </div>
  )
}

function SettingsForm() {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()
    if (newPassword !== confirmPassword) {
      alert('New passwords do not match')
      return
    }
    
    setLoading(true)
    try {
      const response = await fetch('/api/admin/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword })
      })
      
      if (response.ok) {
        alert('Password changed successfully!')
        setCurrentPassword('')
        setNewPassword('')
        setConfirmPassword('')
      } else {
        const error = await response.json()
        alert(error.error || 'Failed to change password')
      }
    } catch (error) {
      alert('Error changing password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <div className="admin-card p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-red-500 to-pink-600 rounded-lg text-white">
            🔒
          </div>
          Change Password
        </h3>
        
        <form onSubmit={handlePasswordChange} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Current Password</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="form-input"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="form-input"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Confirm New Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="form-input"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="admin-button-primary px-6 py-3"
          >
            {loading ? 'Changing...' : 'Change Password'}
          </button>
        </form>
      </div>
      
      <div className="admin-card p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg text-white">
            ℹ️
          </div>
          Admin Information
        </h3>
        <div className="space-y-3 text-gray-600 dark:text-gray-400">
          <p>• Password changes are for demo purposes only</p>
          <p>• The actual login password remains "password"</p>
          <p>• Contact info changes can be made in the Personal tab</p>
        </div>
      </div>
    </div>
  )
}

function CertificatesForm({ data, setData }: { data: PortfolioData, setData: (data: PortfolioData) => void }) {
  const addCertificate = () => {
    const newCert = {
      id: Date.now().toString(),
      name: '',
      issuer: '',
      date: '',
      url: ''
    }
    setData({ ...data, certificates: [...data.certificates, newCert] })
  }

  const updateCertificate = (index: number, field: string, value: any) => {
    const updated = [...data.certificates]
    updated[index] = { ...updated[index], [field]: value }
    setData({ ...data, certificates: updated })
  }

  const removeCertificate = (index: number) => {
    const updated = data.certificates.filter((_, i) => i !== index)
    setData({ ...data, certificates: updated })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Certificates</h3>
        <button onClick={addCertificate} className="btn-primary">
          <Plus size={16} />
          Add Certificate
        </button>
      </div>

      {data.certificates.map((cert, index) => (
        <div key={cert.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
          <div className="flex justify-between items-start mb-4">
            <h4 className="font-medium text-gray-900 dark:text-white">Certificate {index + 1}</h4>
            <button
              onClick={() => removeCertificate(index)}
              className="text-red-600 hover:text-red-800"
            >
              <Trash2 size={16} />
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="Certificate Name"
              value={cert.name}
              onChange={(e) => updateCertificate(index, 'name', e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <input
              type="text"
              placeholder="Issuer"
              value={cert.issuer}
              onChange={(e) => updateCertificate(index, 'issuer', e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Date (e.g., 2023)"
              value={cert.date}
              onChange={(e) => updateCertificate(index, 'date', e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <input
              type="url"
              placeholder="Verification URL (optional)"
              value={cert.url || ''}
              onChange={(e) => updateCertificate(index, 'url', e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
        </div>
      ))}
    </div>
  )
}