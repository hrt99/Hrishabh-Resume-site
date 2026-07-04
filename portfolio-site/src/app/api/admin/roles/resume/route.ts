import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const roleId = formData.get('roleId') as string;

    if (!file || !roleId) {
      return NextResponse.json({ error: 'File and roleId required' }, { status: 400 });
    }

    const resumeDir = path.join(process.cwd(), 'public', 'resumes', 'roles');
    await fs.mkdir(resumeDir, { recursive: true });

    const fileName = `${roleId}-${file.name}`;
    const filePath = path.join(resumeDir, fileName);
    
    const bytes = await file.arrayBuffer();
    await fs.writeFile(filePath, Buffer.from(bytes));

    const rolesPath = path.join(process.cwd(), 'data', 'roles.json');
    const rolesData = await fs.readFile(rolesPath, 'utf8');
    const roles = JSON.parse(rolesData);
    
    const roleIndex = roles.findIndex((r: any) => r.id === roleId);
    if (roleIndex !== -1) {
      roles[roleIndex].resumeFile = fileName;
      await fs.writeFile(rolesPath, JSON.stringify(roles, null, 2));
    }

    return NextResponse.json({ success: true, fileName });
  } catch (error) {
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}