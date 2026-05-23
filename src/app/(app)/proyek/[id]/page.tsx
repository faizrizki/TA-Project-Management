import ProjectDetail from "@/modules/project/components/ProjectDetail";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProyekDetailPage({ params }: PageProps) {
  const { id } = await params;

  return <ProjectDetail projectId={id} />;
}
