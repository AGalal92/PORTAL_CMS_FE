// app/projects/[id]/page.js (Server Component)
import { projectsData } from "./projectsData";
import ProjectDetails from "./ProjectDetails";

export async function generateStaticParams() {
  return projectsData.map((project) => ({
    id: project.id, // This should match the dynamic segment name ([id])
  }));
}

export default function Page({ params }) {
  const { id } = params;
  const project = projectsData.find((p) => p.id === id);

  if (!project) {
    return <h1 className="text-center text-red-500 text-3xl">Project Not Found</h1>;
  }

  return <ProjectDetails project={project} />;
}