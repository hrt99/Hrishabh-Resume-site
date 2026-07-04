import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET() {
  try {
    const rolesPath = path.join(process.cwd(), 'data', 'roles.json');
    const rolesData = await fs.readFile(rolesPath, 'utf8');
    const roles = JSON.parse(rolesData);
    
    const publicRoles = roles.map((role: any) => ({
      id: role.id,
      name: role.name,
      url: role.url,
      title: role.title,
      introLetter: role.introLetter
    }));
    
    return NextResponse.json(publicRoles);
  } catch (error) {
    return NextResponse.json([]);
  }
}