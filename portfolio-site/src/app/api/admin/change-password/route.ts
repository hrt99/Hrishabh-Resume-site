import { NextRequest, NextResponse } from 'next/server'

// Store current password in memory
let currentAdminPassword = 'password'

function checkAuth(request: NextRequest): boolean {
  const token = request.cookies.get('admin-token')?.value
  return token === 'authenticated'
}

export async function POST(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { currentPassword, newPassword } = await request.json()

    // Check current password
    if (currentPassword !== currentAdminPassword) {
      return NextResponse.json({ error: 'Current password is incorrect' }, { status: 401 })
    }

    // Update password in memory
    currentAdminPassword = newPassword
    console.log('Password changed to:', newPassword)

    return NextResponse.json({ 
      message: 'Password changed successfully'
    })
  } catch (error) {
    console.error('Password change error:', error)
    return NextResponse.json({ error: 'Failed to change password' }, { status: 500 })
  }
}

// Helper function to get current password for login (not exported from route)
function getCurrentPassword() {
  return currentAdminPassword
}