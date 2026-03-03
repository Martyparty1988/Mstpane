'use client';

import React, { Suspense } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ProjectList } from '../features/projects/ProjectList';
import { ProjectDetail } from '../features/projects/ProjectDetail';
import { BottomNav } from '../shared/ui/BottomNav';

// We wrap the router in a client-only component to avoid SSR issues with HashRouter
export function AppShell() {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <HashRouter>
      <div className="min-h-screen bg-gray-50 pb-safe">
        <Suspense fallback={<div className="p-4 text-center">Načítání...</div>}>
          <Routes>
            <Route path="/projects" element={<ProjectList />} />
            <Route path="/projects/:projectId" element={<ProjectDetailWrapper />} />
            <Route path="/" element={<Navigate to="/projects" replace />} />
            {/* Fallback for other routes can be added here */}
            <Route path="*" element={<Navigate to="/projects" replace />} />
          </Routes>
        </Suspense>
        <BottomNav />
      </div>
    </HashRouter>
  );
}

// Wrapper to bridge react-router-dom params to our ProjectDetail component
import { useParams } from 'react-router-dom';

function ProjectDetailWrapper() {
  const { projectId } = useParams<{ projectId: string }>();
  if (!projectId) return null;
  return <ProjectDetail projectId={projectId} />;
}
