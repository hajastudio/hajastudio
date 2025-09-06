
import React from 'react';
import { Link } from 'react-router-dom';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const timeAgo = (date: string) => {
    const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " years ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " minutes ago";
    return Math.floor(seconds) + " seconds ago";
  };

  return (
    <Link to={`/projects/${project.id}`} className="block group">
      <div className="bg-gray-800 rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20">
        <img src={project.thumbnailUrl} alt={project.title} className="w-full h-48 object-cover" />
        <div className="p-4">
          <h3 className="text-lg font-bold text-white truncate group-hover:text-purple-400 transition-colors duration-200">{project.title}</h3>
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs font-semibold bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full">{project.status}</span>
            <p className="text-xs text-gray-400">{timeAgo(project.lastUpdated)}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
