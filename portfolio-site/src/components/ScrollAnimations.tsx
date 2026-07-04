'use client'

import { useEffect } from 'react'

export default function ScrollAnimations() {
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY
      const windowHeight = window.innerHeight

      // Parallax backgrounds
      const hero = document.querySelector('#about')
      if (hero) {
        const rate = scrolled * -0.3
        ;(hero as HTMLElement).style.transform = `translateY(${rate}px)`
      }

      // Cinematic section transitions
      const sections = document.querySelectorAll('section')
      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect()
        const progress = Math.max(0, Math.min(1, (windowHeight - rect.top) / windowHeight))
        
        if (rect.top < windowHeight && rect.bottom > 0) {
          const opacity = Math.max(0.1, progress)
          const translateY = (1 - progress) * 20
          
          section.style.opacity = opacity.toString()
          section.style.transform = `translateY(${translateY}px)`
        }
      })

      // Parallax elements within sections
      const parallaxElements = document.querySelectorAll('[data-parallax]')
      parallaxElements.forEach((element) => {
        const rect = element.getBoundingClientRect()
        const speed = parseFloat(element.getAttribute('data-parallax') || '0.5')
        const yPos = -(scrolled - rect.top) * speed
        ;(element as HTMLElement).style.transform = `translateY(${yPos}px)`
      })


    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return null
}