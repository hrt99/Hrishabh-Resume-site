import { NextRequest, NextResponse } from 'next/server'
import { readdir, stat, unlink } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'

export async function GET() {
  try {
    const baseDir = process.cwd()
    const directories = {
      certificates: path.join(baseDir, 'Certificates'),
      achievements: path.join(baseDir, 'Achievements'),
      projects: path.join(baseDir, 'Projects')
    }

    const result: { [key: string]: any[] } = {}

    for (const [category, dirPath] of Object.entries(directories)) {
      result[category] = []
      
      if (existsSync(dirPath)) {
        const files = await readdir(dirPath)
        
        for (const file of files) {
          const filePath = path.join(dirPath, file)
          const stats = await stat(filePath)
          
          if (stats.isFile()) {
            result[category].push({
              name: file,
              path: filePath,
              size: stats.size,
              type: category.slice(0, -1)
            })
          }
        }
      }
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error('Failed to load files:', error)
    return NextResponse.json({ error: 'Failed to load files' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { filePath } = await request.json()
    
    if (!filePath || !existsSync(filePath)) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 })
    }

    await unlink(filePath)
    return NextResponse.json({ success: true, message: 'File deleted successfully' })
  } catch (error) {
    console.error('Failed to delete file:', error)
    return NextResponse.json({ error: 'Failed to delete file' }, { status: 500 })
  }
}