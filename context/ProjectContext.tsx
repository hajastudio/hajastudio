import React, { createContext, useState, useContext, ReactNode } from 'react';
// Fix: Import ProjectStatus to use the enum for type safety.
import { Project, CreativeBrief, Concept, ProjectStatus } from '../types';
import { MOCK_PROJECTS } from '../data/mockData';

interface ProjectContextType {
  projects: Project[];
  getProjectById: (id: string) => Project | undefined;
  addProject: (brief: CreativeBrief) => Project;
  updateProject: (updatedProject: Project) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);

  const getProjectById = (id: string): Project | undefined => {
    return projects.find(p => p.id === id);
  };

  const addProject = (brief: CreativeBrief): Project => {
    const newProject: Project = {
      id: `proj-${Date.now()}`,
      title: brief.title,
      brief,
      // Fix: A new project created from a brief should start with the BRIEF status.
      // This also resolves the TypeScript error by using the ProjectStatus enum instead of string literals.
      status: ProjectStatus.BRIEF,
      lastUpdated: new Date().toISOString(),
      thumbnailUrl: `https://picsum.photos/seed/${Date.now()}/400/300`
    };
    setProjects(prevProjects => [newProject, ...prevProjects]);
    return newProject;
  };

  const updateProject = (updatedProject: Project) => {
    setProjects(prevProjects => 
      prevProjects.map(p => p.id === updatedProject.id ? { ...updatedProject, lastUpdated: new Date().toISOString() } : p)
    );
  };

  return (
    <ProjectContext.Provider value={{ projects, getProjectById, addProject, updateProject }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = (): ProjectContextType => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProjects must be used within a ProjectProvider');
  }
  return context;
};
