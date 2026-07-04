import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const ROLES_FILE = path.join(process.cwd(), 'data', 'roles.json');

interface Role {
  id: string;
  name: string;
  url: string;
  title: string;
  summary: string;
  introLetter: string;
  resumeFile?: string;
  createdAt: string;
}

async function ensureRolesFile() {
  try {
    await fs.access(ROLES_FILE);
  } catch {
    await fs.writeFile(ROLES_FILE, JSON.stringify([]));
  }
}

async function getRoles(): Promise<Role[]> {
  await ensureRolesFile();
  const data = await fs.readFile(ROLES_FILE, 'utf8');
  return JSON.parse(data);
}

async function saveRoles(roles: Role[]) {
  await fs.writeFile(ROLES_FILE, JSON.stringify(roles, null, 2));
}

export async function GET() {
  try {
    const roles = await getRoles();
    return NextResponse.json(roles);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch roles' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const roleData = await request.json();
    const roles = await getRoles();
    
    const newRole: Role = {
      ...roleData,
      createdAt: new Date().toISOString()
    };
    
    // Copy base portfolio data
    const basePortfolioPath = path.join(process.cwd(), 'data', 'portfolio.json');
    let baseData;
    try {
      const baseContent = await fs.readFile(basePortfolioPath, 'utf8');
      baseData = JSON.parse(baseContent);
    } catch {
      baseData = { experience: [], education: [], skills: [], projects: [], certificates: [], achievements: [] };
    }
    
    roles.push(newRole);
    await saveRoles(roles);
    
    // Set as default role (most recent)
    const defaultRolePath = path.join(process.cwd(), 'data', 'default-role.json');
    await fs.writeFile(defaultRolePath, JSON.stringify({ defaultUrl: newRole.url }));
    
    const portfolioData = {
      ...baseData,
      personalInfo: {
        ...baseData.personalInfo,
        title: roleData.title,
        summary: roleData.summary
      },
      introLetter: roleData.introLetter
    };
    
    const portfolioPath = path.join(process.cwd(), 'data', `${roleData.url}.json`);
    await fs.writeFile(portfolioPath, JSON.stringify(portfolioData, null, 2));
    
    return NextResponse.json(newRole);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create role' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const roleData = await request.json();
    const roles = await getRoles();
    
    const index = roles.findIndex(r => r.id === roleData.id);
    if (index === -1) {
      return NextResponse.json({ error: 'Role not found' }, { status: 404 });
    }
    
    roles[index] = { ...roles[index], ...roleData };
    await saveRoles(roles);
    
    return NextResponse.json(roles[index]);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update role' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'Role ID required' }, { status: 400 });
    }
    
    const roles = await getRoles();
    const role = roles.find(r => r.id === id);
    
    if (!role) {
      return NextResponse.json({ error: 'Role not found' }, { status: 404 });
    }
    
    // Delete portfolio file
    const portfolioPath = path.join(process.cwd(), 'data', `${role.url}.json`);
    try {
      await fs.unlink(portfolioPath);
    } catch {}
    
    const updatedRoles = roles.filter(r => r.id !== id);
    await saveRoles(updatedRoles);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete role' }, { status: 500 });
  }
}