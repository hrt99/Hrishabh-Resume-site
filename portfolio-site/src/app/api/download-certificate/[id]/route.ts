import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const certificateId = params.id
    
    // Read portfolio data to find certificate
    const dataPath = path.join(process.cwd(), 'data', 'portfolio.json')
    const data = await fs.readFile(dataPath, 'utf8')
    const portfolioData = JSON.parse(data)
    
    const certificate = portfolioData.certificates.find((cert: any) => cert.id === certificateId)
    if (!certificate || !certificate.file) {
      return NextResponse.json({ error: 'Certificate not found' }, { status: 404 })
    }

    const filePath = path.join(process.cwd(), 'public', 'uploads', certificate.file)
    
    try {
      const fileBuffer = await fs.readFile(filePath)
      
      return new NextResponse(fileBuffer, {
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': `attachment; filename="${certificate.file}"`,
        },
      })
    } catch {
      return NextResponse.json({ error: 'Certificate file not found' }, { status: 404 })
    }
  } catch (error) {
    console.error('Error downloading certificate:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}