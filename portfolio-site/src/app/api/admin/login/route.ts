import { NextRequest, NextResponse } from 'next/server'

// Import current password from change-password route
let currentAdminPassword = 'password'

// Function to get current password (shared with change-password)
function getCurrentPassword() {
  try {
    // Try to get updated password from change-password module
    const changePasswordModule = require('../change-password/route')
    return changePasswordModule.getCurrentPassword ? changePasswordModule.getCurrentPassword() : currentAdminPassword
  } catch {
    return currentAdminPassword
  }
}

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json()
    
    if (!password) {
      return NextResponse.json({ error: 'Password is required' }, { status: 400 })
    }

    // Check against current password
    const validPassword = getCurrentPassword()
    if (password !== validPassword) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
    }
    
    const response = NextResponse.json({ success: true })
    response.cookies.set('admin-token', 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 // 24 hours
    })
    
    return response
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}