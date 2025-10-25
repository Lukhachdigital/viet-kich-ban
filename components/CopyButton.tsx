
import React, { useState, useCallback } from 'react';

interface CopyButtonProps {
  textToCopy: string;
}

export const CopyButton: React.FC<CopyButtonProps> = ({ textToCopy }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(textToCopy).then(() => {
      setIsCopied(true);
      // setTimeout(() => setIsCopied(false), 2000); // Removed this line
    });
  }, [textToCopy]);

  return (
    <button
      onClick={handleCopy}
      disabled={isCopied}
      className={`px-3 py-1 text-xs font-medium rounded-md transition-all duration-200 flex items-center space-x-1
        ${isCopied 
          ? 'bg-green-600 text-white cursor-default' 
          : 'bg-gray-600 text-gray-200 hover:bg-gray-500'
        }`}
    >
      {isCopied ? (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      )}
      <span>{isCopied ? 'Đã chép' : 'Chép'}</span>
    </button>
  );
};
