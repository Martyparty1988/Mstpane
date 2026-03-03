'use client';

import { useLiveQuery } from 'dexie-react-hooks';
import { projectRepository } from '../../data/repositories/projectRepository';
import { ChevronLeft, MapPin, Zap, LayoutGrid, Info } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export function ProjectDetail({ projectId }: { projectId: string }) {
  const router = useRouter();
  const project = useLiveQuery(() => projectRepository.getById(projectId), [projectId]);

  if (project === undefined) {
    return <div className="p-4 text-center text-gray-500">Načítání detailu...</div>;
  }

  if (project === null || !project) {
    return (
      <div className="p-4 text-center">
        <p className="text-gray-500 mb-4">Projekt nebyl nalezen.</p>
        <button onClick={() => router.back()} className="text-blue-500 font-medium">Zpět</button>
      </div>
    );
  }

  return (
    <div className="pb-24 min-h-screen bg-gray-50">
      <div className="px-4 pt-12 pb-4 bg-white/80 backdrop-blur-xl sticky top-0 z-10 border-b border-gray-100 flex items-center gap-3">
        <button 
          onClick={() => router.back()}
          className="w-10 h-10 flex items-center justify-center -ml-2 text-gray-900"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-semibold tracking-tight text-gray-900 truncate">
          {project.name}
        </h1>
      </div>

      <div className="p-4 space-y-6">
        {/* Basic Info */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">Informace</h2>
          
          <div className="space-y-4">
            {project.location && (
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-blue-500" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Lokalita</div>
                  <div className="text-gray-900 font-medium">{project.location}</div>
                </div>
              </div>
            )}
            
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center shrink-0">
                <Zap className="w-4 h-4 text-amber-500" />
              </div>
              <div>
                <div className="text-sm text-gray-500">Cílový výkon</div>
                <div className="text-gray-900 font-medium">{project.targetPowerMW} MW</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                <LayoutGrid className="w-4 h-4 text-emerald-500" />
              </div>
              <div>
                <div className="text-sm text-gray-500">Parametry panelů</div>
                <div className="text-gray-900 font-medium">{project.panelsPerString} panelů / string</div>
                <div className="text-gray-500 text-sm">{project.panelWp} Wp / panel</div>
              </div>
            </div>

            {project.description && (
              <div className="flex items-start gap-3 pt-2 border-t border-gray-50">
                <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center shrink-0">
                  <Info className="w-4 h-4 text-gray-500" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Popis</div>
                  <div className="text-gray-900 text-sm mt-1">{project.description}</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Link 
            href={`/projects/${project.id}/map`}
            className="bg-black text-white rounded-2xl p-4 flex flex-col items-center justify-center gap-2 active:scale-[0.98] transition-transform"
          >
            <LayoutGrid className="w-6 h-6" />
            <span className="font-medium">Mapa stavby</span>
          </Link>
          
          <button className="bg-white text-gray-900 border border-gray-200 rounded-2xl p-4 flex flex-col items-center justify-center gap-2 active:scale-[0.98] transition-transform">
            <Zap className="w-6 h-6" />
            <span className="font-medium">Výkon</span>
          </button>
        </div>
      </div>
    </div>
  );
}
