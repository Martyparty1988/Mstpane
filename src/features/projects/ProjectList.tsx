'use client';

import { useLiveQuery } from 'dexie-react-hooks';
import { projectRepository } from '../../data/repositories/projectRepository';
import Link from 'next/link';
import { Plus, MapPin, Zap } from 'lucide-react';
import { format } from 'date-fns';

export function ProjectList() {
  const projects = useLiveQuery(() => projectRepository.getAll());

  if (projects === undefined) {
    return <div className="p-4 text-center text-gray-500">Načítání projektů...</div>;
  }

  return (
    <div className="pb-24">
      <div className="px-4 pt-12 pb-4 bg-white/80 backdrop-blur-xl sticky top-0 z-10 border-b border-gray-100">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900">Projekty</h1>
          <Link 
            href="/projects/new" 
            className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center shadow-sm"
          >
            <Plus className="w-5 h-5" />
          </Link>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {projects.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            Zatím nemáte žádné projekty.
          </div>
        ) : (
          projects.map(project => (
            <Link 
              key={project.id} 
              href={`/projects/${project.id}`}
              className="block bg-white p-4 rounded-2xl shadow-sm border border-gray-100 active:scale-[0.98] transition-transform"
            >
              <h2 className="text-lg font-medium text-gray-900 mb-1">{project.name}</h2>
              
              <div className="flex flex-col gap-2 mt-3 text-sm text-gray-500">
                {project.location && (
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4" />
                    <span>{project.location}</span>
                  </div>
                )}
                <div className="flex items-center gap-1.5">
                  <Zap className="w-4 h-4" />
                  <span>{project.targetPowerMW} MW cílový výkon</span>
                </div>
              </div>
              
              <div className="mt-4 pt-3 border-t border-gray-50 text-xs text-gray-400">
                Vytvořeno {format(new Date(project.createdAt), 'd. M. yyyy')}
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
