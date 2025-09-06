
import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-900/80 backdrop-blur-sm border-b border-gray-700/50 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <Link to="/dashboard" className="flex items-center space-x-2">
               <svg className="w-8 h-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 3.104l7.5 4.33v8.662l-7.5 4.33-7.5-4.33V7.434l7.5-4.33z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.25 7.434v8.662l7.5 4.33 7.5-4.33V7.434M17.25 11.764L9.75 16.094l-7.5-4.33" />
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 3.104V16.094" />
              </svg>
              <h1 className="text-xl font-bold text-white">
                Haja<span className="text-purple-400">®</span>Verso
              </h1>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-400">Free Plan | 1000 Tokens</div>
            <img 
              className="h-8 w-8 rounded-full" 
              src="https://picsum.photos/seed/user/100/100" 
              alt="User Avatar" 
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
