'use client';

import { useState, useEffect } from 'react';
import { Trash2, Edit, Plus, Download, Upload } from 'lucide-react';

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

export default function RoleManager() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    summary: '',
    introLetter: 'H'
  });
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const response = await fetch('/api/admin/roles');
      const data = await response.json();
      setRoles(data);
    } catch (error) {
      console.error('Error fetching roles:', error);
    }
  };

  const generateUrl = (name: string) => {
    return name.toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '') + '-' + Math.random().toString(36).substr(2, 6);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const roleData = {
      ...formData,
      url: editingRole ? editingRole.url : generateUrl(formData.name),
      id: editingRole ? editingRole.id : Date.now().toString()
    };

    try {
      const response = await fetch('/api/admin/roles', {
        method: editingRole ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(roleData)
      });

      if (response.ok) {
        fetchRoles();
        setShowForm(false);
        setEditingRole(null);
        setFormData({ name: '', title: '', summary: '', introLetter: 'H' });
      }
    } catch (error) {
      console.error('Error saving role:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this role?')) {
      try {
        await fetch(`/api/admin/roles?id=${id}`, { method: 'DELETE' });
        fetchRoles();
      } catch (error) {
        console.error('Error deleting role:', error);
      }
    }
  };

  const handleEdit = (role: Role) => {
    setEditingRole(role);
    setFormData({
      name: role.name,
      title: role.title,
      summary: role.summary,
      introLetter: role.introLetter
    });
    setShowForm(true);
  };

  const handleResumeUpload = async (roleId: string, file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('roleId', roleId);

    try {
      await fetch('/api/admin/roles/resume', {
        method: 'POST',
        body: formData
      });
      fetchRoles();
    } catch (error) {
      console.error('Error uploading resume:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Role Management</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus size={20} />
          Add Role
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4">
            {editingRole ? 'Edit Role' : 'Create New Role'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Role Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Job Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Summary</label>
              <textarea
                value={formData.summary}
                onChange={(e) => setFormData({...formData, summary: e.target.value})}
                className="w-full p-2 border rounded h-24"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Intro Letter</label>
              <input
                type="text"
                maxLength={1}
                value={formData.introLetter}
                onChange={(e) => setFormData({...formData, introLetter: e.target.value.toUpperCase()})}
                className="w-20 p-2 border rounded text-center"
                required
              />
            </div>
            <div className="flex gap-2">
              <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
                {editingRole ? 'Update' : 'Create'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingRole(null);
                  setFormData({ name: '', title: '', summary: '', introLetter: 'H' });
                }}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid gap-4">
        {roles.map((role) => (
          <div key={role.id} className="bg-white p-4 rounded-lg shadow border">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{role.name}</h3>
                <p className="text-gray-600">{role.title}</p>
                <p className="text-sm text-gray-500 mt-1">{role.summary}</p>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm bg-blue-100 px-2 py-1 rounded font-mono">
                      yoursite.com/{role.url}
                    </span>
                    <button
                      onClick={() => {
                        const url = `${window.location.origin}/${role.url}`;
                        navigator.clipboard.writeText(url);
                        setCopiedUrl(role.url);
                        setTimeout(() => setCopiedUrl(null), 2000);
                      }}
                      className={`text-xs px-2 py-1 rounded transition-colors ${
                        copiedUrl === role.url 
                          ? 'bg-green-200 text-green-800' 
                          : 'bg-gray-200 hover:bg-gray-300'
                      }`}
                    >
                      {copiedUrl === role.url ? '✓ Copied!' : 'Copy URL'}
                    </button>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm bg-purple-100 px-2 py-1 rounded">
                      Letter: {role.introLetter}
                    </span>
                    {role.resumeFile && (
                      <span className="text-sm bg-green-100 px-2 py-1 rounded">
                        Resume: {role.resumeFile}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={async () => {
                    await fetch('/api/admin/set-default', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ roleUrl: role.url })
                    });
                    alert('Set as default for main site!');
                  }}
                  className="p-2 text-purple-600 hover:bg-purple-50 rounded"
                  title="Set as Default"
                >
                  ⭐
                </button>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleResumeUpload(role.id, file);
                  }}
                  className="hidden"
                  id={`resume-${role.id}`}
                />
                <label
                  htmlFor={`resume-${role.id}`}
                  className="p-2 text-green-600 hover:bg-green-50 rounded cursor-pointer"
                  title="Upload Resume"
                >
                  <Upload size={16} />
                </label>
                <button
                  onClick={() => handleEdit(role)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                  title="Edit"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => handleDelete(role.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded"
                  title="Delete"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}