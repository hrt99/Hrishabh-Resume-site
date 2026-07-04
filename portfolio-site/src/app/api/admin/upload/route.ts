import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const type = formData.get('type') as string

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Determine target directory based on type
    let targetDir: string
    if (type === 'resume') {
      targetDir = path.join(process.cwd(), 'public', 'uploads')
    } else if (type === 'certificate') {
      targetDir = path.join(process.cwd(), 'Certificates')
    } else if (type === 'achievement') {
      targetDir = path.join(process.cwd(), 'Achievements')
    } else if (type === 'project') {
      targetDir = path.join(process.cwd(), 'Projects')
    } else {
      targetDir = path.join(process.cwd(), 'public', 'uploads')
    }

    // Create directory if it doesn't exist
    if (!existsSync(targetDir)) {
      await mkdir(targetDir, { recursive: true })
    }

    // Use original filename for organized directories, timestamped for uploads
    let filename: string
    if (type === 'resume') {
      const timestamp = Date.now()
      const extension = path.extname(file.name)
      filename = `${type}_${timestamp}${extension}`
    } else {
      filename = file.name
    }
    
    const filepath = path.join(targetDir, filename)

    // Write file
    await writeFile(filepath, buffer)

    return NextResponse.json({ 
      success: true, 
      filename,
      filepath,
      message: `${type} uploaded successfully` 
    })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}