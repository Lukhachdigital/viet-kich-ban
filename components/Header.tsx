
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="text-center">
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-600">
        AI Video Script & Prompt Generator
      </h1>
      <p className="mt-4 text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
        Biến ý tưởng của bạn thành kịch bản video chi tiết cùng các prompt chuyên nghiệp để tạo video với AI.
      </p>
    </header>
  );
};
