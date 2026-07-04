import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const { roleUrl } = await request.json();
    
    const defaultRolePath = path.join(process.cwd(), 'data', 'default-role.json');
    await fs.writeFile(defaultRolePath, JSON.stringify({ defaultUrl: roleUrl }));
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to set default' }, { status: 500 });
  }
}