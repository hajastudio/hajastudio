
import React from 'react';
import { PRODUCTION_PIPELINE } from '../constants';
import { ProjectStatus } from '../types';

interface StatusBarProps {
  currentStatus: ProjectStatus;
}

const StatusBar: React.FC<StatusBarProps> = ({ currentStatus }) => {
  const currentIndex = PRODUCTION_PIPELINE.indexOf(currentStatus);

  return (
    <div className="w-full">
      <div className="flex items-center">
        {PRODUCTION_PIPELINE.map((status, index) => {
          const isCompleted = index < currentIndex;
          const isActive = index === currentIndex;
          const isUpcoming = index > currentIndex;

          return (
            <React.Fragment key={status}>
              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isCompleted ? 'bg-purple-500' : isActive ? 'bg-purple-400 ring-4 ring-purple-400/50 animate-pulse' : 'bg-gray-600'
                  }`}
                >
                  {isCompleted ? (
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <span className={`w-3 h-3 rounded-full ${isActive ? 'bg-white' : 'bg-gray-400'}`}></span>
                  )}
                </div>
                <p className={`text-xs mt-2 text-center ${isActive ? 'text-purple-300 font-bold' : isCompleted ? 'text-gray-300' : 'text-gray-500'}`}>
                  {status}
                </p>
              </div>
              {index < PRODUCTION_PIPELINE.length - 1 && (
                <div className={`flex-1 h-1 mx-2 transition-colors duration-500 ${isCompleted ? 'bg-purple-500' : 'bg-gray-600'}`}></div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default StatusBar;
