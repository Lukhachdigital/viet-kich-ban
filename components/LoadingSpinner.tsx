
import React from 'react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-gray-800/50 rounded-lg p-8 border-2 border-dashed border-gray-700">
      <div className="w-16 h-16 border-4 border-t-transparent border-indigo-500 rounded-full animate-spin"></div>
      <p className="mt-4 text-lg text-gray-300">AI is crafting your script...</p>
      <p className="text-sm text-gray-500">This might take a moment.</p>
    </div>
  );
};
