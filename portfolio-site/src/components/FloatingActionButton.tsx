'use client'

import { useState } from 'react'
import { Gamepad2, Brain, Zap, X, Menu } from 'lucide-react'

export default function FloatingActionButton() {
  const [isOpen, setIsOpen] = useState(false)

  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsOpen(false)
    }
  }

  const actions = [
    {
      icon: <Brain className="w-5 h-5" />,
      label: "Skills Quiz",
      color: "from-purple-500 to-pink-500",
      onClick: () => scrollToSection('#skills-quiz')
    },
    {
      icon: <Gamepad2 className="w-5 h-5" />,
      label: "Tech Game",
      color: "from-blue-500 to-cyan-500",
      onClick: () => scrollToSection('#tech-game')
    },
    {
      icon: <Zap className="w-5 h-5" />,
      label: "Quick Demo",
      color: "from-yellow-500 to-orange-500",
      onClick: () => alert('🚀 Coming Soon: Interactive Portfolio Demo!')
    }
  ]

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {/* Action Buttons */}
      <div className={`flex flex-col gap-3 mb-4 transition-all duration-300 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={action.onClick}
            className={`flex items-center gap-3 px-4 py-3 bg-gradient-to-r ${action.color} text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-slide-up`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {action.icon}
            <span className="text-sm font-medium whitespace-nowrap">{action.label}</span>
          </button>
        ))}
      </div>

      {/* Main FAB */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center ${isOpen ? 'rotate-45' : ''}`}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>
    </div>
  )
}