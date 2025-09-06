
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProjects } from '../context/ProjectContext';
import { CreativeBrief } from '../types';

const NewProjectPage: React.FC = () => {
  const navigate = useNavigate();
  const { addProject } = useProjects();
  const [brief, setBrief] = useState<CreativeBrief>({
    title: '',
    logline: '',
    genre: '',
    targetAudience: '',
    keyThemes: '',
    visualStyle: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBrief(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProject = addProject(brief);
    navigate(`/projects/${newProject.id}`);
  };
  
  const InputField: React.FC<{ name: keyof CreativeBrief; label: string; placeholder: string; isTextArea?: boolean }> = ({ name, label, placeholder, isTextArea = false }) => (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-purple-300">{label}</label>
      {isTextArea ? (
        <textarea
          id={name}
          name={name}
          value={brief[name]}
          onChange={handleChange}
          placeholder={placeholder}
          rows={3}
          className="mt-1 block w-full bg-gray-800 border-gray-600 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm text-white p-2"
          required
        />
      ) : (
        <input
          type="text"
          id={name}
          name={name}
          value={brief[name]}
          onChange={handleChange}
          placeholder={placeholder}
          className="mt-1 block w-full bg-gray-800 border-gray-600 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm text-white p-2"
          required
        />
      )}
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-white mb-2">Create New Project</h2>
      <p className="text-gray-400 mb-6">This is your Creative Brief. Provide the vision, and our AI Production Conductor will handle the rest.</p>
      
      <form onSubmit={handleSubmit} className="bg-gray-800/50 p-8 rounded-lg shadow-lg space-y-6">
        <InputField name="title" label="Project Title" placeholder="e.g., Starlight Odyssey" />
        <InputField name="logline" label="Logline" placeholder="A one-sentence summary of your story." isTextArea />
        <InputField name="genre" label="Genre" placeholder="e.g., Sci-Fi, Fantasy, Comedy" />
        <InputField name="targetAudience" label="Target Audience" placeholder="e.g., Young Adults, Families, Adults" />
        <InputField name="keyThemes" label="Key Themes" placeholder="e.g., Friendship, Betrayal, Discovery" />
        <InputField name="visualStyle" label="Visual Style" placeholder="e.g., Ghibli-esque, Cyberpunk, Art Deco" isTextArea />

        <div className="flex justify-end">
          <button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-lg transition-transform duration-200 transform hover:scale-105">
            Create & Generate Concepts
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewProjectPage;
