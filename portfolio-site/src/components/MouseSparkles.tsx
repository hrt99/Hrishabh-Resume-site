'use client'

import { useEffect, useState } from 'react'

interface Sparkle {
  id: number
  x: number
  y: number
  size: number
  color: string
  opacity: number
}

export default function MouseSparkles() {
  const [sparkles, setSparkles] = useState<Sparkle[]>([])
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
      
      // Create new sparkle
      const newSparkle: Sparkle = {
        id: Date.now() + Math.random(),
        x: e.clientX + (Math.random() - 0.5) * 20,
        y: e.clientY + (Math.random() - 0.5) * 20,
        size: Math.random() * 4 + 2,
        color: ['#3b82f6', '#8b5cf6', '#ec4899', '#06b6d4', '#10b981'][Math.floor(Math.random() * 5)],
        opacity: 1
      }

      setSparkles(prev => [...prev.slice(-20), newSparkle])
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setSparkles(prev => 
        prev.map(sparkle => ({
          ...sparkle,
          opacity: sparkle.opacity - 0.05,
          y: sparkle.y - 1
        })).filter(sparkle => sparkle.opacity > 0)
      )
    }, 50)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {sparkles.map(sparkle => (
        <div
          key={sparkle.id}
          className="absolute rounded-full animate-ping"
          style={{
            left: sparkle.x,
            top: sparkle.y,
            width: sparkle.size,
            height: sparkle.size,
            backgroundColor: sparkle.color,
            opacity: sparkle.opacity,
            transform: 'translate(-50%, -50%)'
          }}
        />
      ))}
    </div>
  )
}