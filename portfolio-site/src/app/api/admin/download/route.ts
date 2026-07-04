import { NextRequest, NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const filePath = searchParams.get('file')
    
    if (!filePath || !existsSync(filePath)) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 })
    }

    const fileBuffer = await readFile(filePath)
    const fileName = path.basename(filePath)
    const fileExtension = path.extname(filePath).toLowerCase()
    
    let contentType = 'application/octet-stream'
    if (fileExtension === '.pdf') {
      contentType = 'application/pdf'
    } else if (['.jpg', '.jpeg'].includes(fileExtension)) {
      contentType = 'image/jpeg'
    } else if (fileExtension === '.png') {
      contentType = 'image/png'
    }

    return new NextResponse(new Blob([Uint8Array.from(fileBuffer)]), {
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `inline; filename="${fileName}"`,
        'Cache-Control': 'public, max-age=31536000'
      }
    })
  } catch (error) {
    console.error('Failed to serve file:', error)
    return NextResponse.json({ error: 'Failed to serve file' }, { status: 500 })
  }
}