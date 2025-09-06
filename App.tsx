
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ProjectProvider } from './context/ProjectContext';
import Header from './components/Header';
import DashboardPage from './pages/DashboardPage';
import NewProjectPage from './pages/NewProjectPage';
import ProjectDetailPage from './pages/ProjectDetailPage';

const App: React.FC = () => {
  return (
    <ProjectProvider>
      <HashRouter>
        <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
          <Header />
          <main className="p-4 sm:p-6 lg:p-8">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/projects/new" element={<NewProjectPage />} />
              <Route path="/projects/:projectId" element={<ProjectDetailPage />} />
            </Routes>
          </main>
        </div>
      </HashRouter>
    </ProjectProvider>
  );
};

export default App;
