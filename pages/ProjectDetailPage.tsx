
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProjects } from '../context/ProjectContext';
import { Project, ProjectStatus, Concept } from '../types';
import StatusBar from '../components/StatusBar';
import Spinner from '../components/Spinner';
import { generateConcepts, generateScript } from '../services/geminiService';

const ProjectDetailPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { getProjectById, updateProject } = useProjects();
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (projectId) {
      const foundProject = getProjectById(projectId);
      setProject(foundProject || null);
    }
  }, [projectId, getProjectById]);
  
  const handleGenerateConcepts = async () => {
    if (!project) return;
    setIsLoading(true);
    setError(null);
    try {
      const concepts = await generateConcepts(project.brief);
      const updated = { ...project, concepts, status: ProjectStatus.CONCEPT };
      updateProject(updated);
      setProject(updated);
    } catch (e) {
      setError("Failed to generate concepts. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleApproveConcept = async (concept: Concept) => {
    if (!project) return;
    setIsLoading(true);
    setError(null);
    try {
        const script = await generateScript(concept);
        const updated = { ...project, approvedConcept: concept, script: script, status: ProjectStatus.WORLD_BIBLE };
        updateProject(updated);
        setProject(updated);
    } catch(e) {
        setError("Failed to generate script. Please try again.");
    } finally {
        setIsLoading(false);
    }
  };


  if (!project) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold">Project not found</h2>
        <Link to="/dashboard" className="text-purple-400 hover:underline mt-4 inline-block">
          Back to Dashboard
        </Link>
      </div>
    );
  }

  const renderContent = () => {
    switch (project.status) {
      case ProjectStatus.BRIEF:
        return (
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-4">Brief Submitted</h3>
            <p className="text-gray-400 mb-6">Your creative brief is ready. Let's generate some initial concepts.</p>
            {isLoading ? <Spinner message="Generating creative concepts..."/> : <button onClick={handleGenerateConcepts} className="btn-primary">Generate Concepts</button>}
          </div>
        );
      case ProjectStatus.CONCEPT:
        return (
          <div>
            <h3 className="text-xl font-bold mb-4 text-center text-purple-300">Choose Your Concept</h3>
             {isLoading && <div className="absolute inset-0 bg-gray-900/50 flex items-center justify-center z-10"><Spinner message="Generating script..."/></div>}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {project.concepts?.map((concept, index) => (
                <div key={index} className="bg-gray-800 p-6 rounded-lg flex flex-col">
                  <h4 className="font-bold text-lg text-white">{concept.title}</h4>
                  <p className="text-sm italic text-gray-400 my-2">"{concept.logline}"</p>
                  <p className="text-sm text-gray-300 flex-grow">{concept.synopsis}</p>
                  <button onClick={() => handleApproveConcept(concept)} disabled={isLoading} className="mt-4 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg w-full transition disabled:bg-gray-500">
                    Approve & Generate Script
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      case ProjectStatus.WORLD_BIBLE:
        return (
          <div>
            <h3 className="text-xl font-bold mb-4 text-center text-purple-300">Script & World Bible</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-1 bg-gray-800 p-6 rounded-lg">
                    <h4 className="font-bold text-lg text-white">{project.approvedConcept?.title}</h4>
                    <p className="text-sm italic text-gray-400 my-2">"{project.approvedConcept?.logline}"</p>
                    <p className="text-sm text-gray-300">{project.approvedConcept?.synopsis}</p>
                    <button className="mt-6 w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg">Generate Concept Art</button>
                </div>
                <div className="md:col-span-2 bg-gray-800 p-6 rounded-lg">
                    <h4 className="font-bold text-lg text-white mb-4">Opening Scene</h4>
                    <pre className="text-sm text-gray-300 whitespace-pre-wrap font-sans bg-gray-900/50 p-4 rounded-md overflow-x-auto">{project.script}</pre>
                </div>
            </div>
          </div>
        );
      default:
        return <div className="text-center p-8 bg-gray-800 rounded-lg"><p className="text-gray-400">This stage is under construction. Current status: <span className="font-bold text-purple-300">{project.status}</span></p></div>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <Link to="/dashboard" className="text-purple-400 hover:underline mb-4 inline-block">&larr; Back to Dashboard</Link>
        <h2 className="text-4xl font-bold text-white">{project.title}</h2>
      </div>
      <div className="bg-gray-800/50 p-6 rounded-lg mb-8 shadow-lg">
        <StatusBar currentStatus={project.status} />
      </div>
      
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg relative">
        {error && <div className="bg-red-500/20 text-red-300 p-3 rounded-md mb-4 text-center">{error}</div>}
        {renderContent()}
      </div>
    </div>
  );
};

export default ProjectDetailPage;
