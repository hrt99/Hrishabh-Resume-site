'use client'

import { useState, useEffect } from 'react'
import { Moon, Sun, Menu, X } from 'lucide-react'
import DownloadButton from './DownloadButton'

export default function Header() {
  const [darkMode, setDarkMode] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true'
    setDarkMode(isDark)
    document.documentElement.classList.toggle('dark', isDark)
  }, [])

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode
    setDarkMode(newDarkMode)
    localStorage.setItem('darkMode', newDarkMode.toString())
    document.documentElement.classList.toggle('dark', newDarkMode)
  }

  const navItems = [
    { href: '#about', label: 'About' },
    { href: '#experience', label: 'Experience' },
    { href: '#education', label: 'Education' },
    { href: '#skills', label: 'Skills' },
    { href: '#projects', label: 'Projects' },
    { href: '#certificates', label: 'Certificates' },
    { href: '#contact', label: 'Contact' },
  ]

  return (
    <header className="fixed top-0 w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl z-50 border-b border-gray-200/50 dark:border-gray-700/50 shadow-lg">
      <nav className="max-w-[1400px] mx-auto px-3 sm:px-4 lg:px-6 flex items-center justify-between py-4 lg:py-5">
        {/* Logo Section */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={toggleDarkMode}
            className="hidden lg:flex p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <a 
            href="#top"
            className="text-lg lg:text-xl xl:text-2xl font-bold gradient-text transition-transform duration-300 cursor-pointer whitespace-nowrap"
          >
            Hrishabh Tripathi
          </a>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-1 xl:gap-2 flex-shrink-0 flex-nowrap">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm xl:text-base text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium px-2 xl:px-3 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 whitespace-nowrap"
            >
              {item.label}
            </a>
          ))}
          <DownloadButton 
            size="sm" 
            showText={true}
            className="!px-2 xl:!px-3 !py-2 !text-xs xl:!text-sm ml-1"
          >
            Resume
          </DownloadButton>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center gap-2 flex-shrink-0">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-t border-gray-200 dark:border-gray-700 shadow-lg">
          <div className="px-4 py-3 space-y-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="block py-3 px-2 text-base text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <div className="pt-3 pb-1">
              <DownloadButton 
                size="md" 
                showText={true}
                className="w-full justify-center"
              >
                Download Resume
              </DownloadButton>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}