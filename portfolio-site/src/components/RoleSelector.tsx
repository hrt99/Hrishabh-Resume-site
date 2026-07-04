'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Role {
  id: string;
  name: string;
  url: string;
  title: string;
  introLetter: string;
}

export default function RoleSelector() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const response = await fetch('/api/roles');
      const data = await response.json();
      setRoles(data);
    } catch (error) {
      console.error('Error fetching roles:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleSelect = (roleUrl: string) => {
    router.push(`/${roleUrl}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            Welcome to My Portfolio
          </h1>
          <p className="text-xl text-gray-300">
            Please select the role you're interested in:
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roles.map((role) => (
            <div
              key={role.id}
              onClick={() => handleRoleSelect(role.url)}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 cursor-pointer hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  {role.introLetter}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {role.name}
                </h3>
                <p className="text-gray-300 text-sm">
                  {role.title}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <button
            onClick={() => router.push('/general')}
            className="text-gray-400 hover:text-white transition-colors"
          >
            Or view general portfolio →
          </button>
        </div>
      </div>
    </div>
  );
}