import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

export async function GET() {
  try {
    // Read portfolio data to get resume filename
    const dataPath = path.join(process.cwd(), 'data', 'portfolio.json')
    const data = await fs.readFile(dataPath, 'utf8')
    const portfolioData = JSON.parse(data)
    
    const resumeFile = portfolioData.resumeFile
    if (!resumeFile) {
      return NextResponse.json({ error: 'Resume not found' }, { status: 404 })
    }

    // Try to find the resume file in uploads or root directory
    let filePath = path.join(process.cwd(), 'public', 'uploads', resumeFile)
    
    try {
      await fs.access(filePath)
    } catch {
      // If not in uploads, try root directory
      filePath = path.join(process.cwd(), '..', resumeFile)
      try {
        await fs.access(filePath)
      } catch {
        return NextResponse.json({ error: 'Resume file not found' }, { status: 404 })
      }
    }

    const fileBuffer = await fs.readFile(filePath)
    
    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${resumeFile}"`,
      },
    })
  } catch (error) {
    console.error('Error downloading resume:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}