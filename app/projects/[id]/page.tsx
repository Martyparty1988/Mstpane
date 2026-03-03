import { ProjectDetail } from '@/src/features/projects/ProjectDetail';

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  return <ProjectDetail projectId={resolvedParams.id} />;
}
