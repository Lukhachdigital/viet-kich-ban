import React, { useState, useCallback } from 'react';
import { IdeaInput } from './components/IdeaInput';
import { ResultsDisplay } from './components/ResultsDisplay';
import { Header } from './components/Header';
import { LoadingSpinner } from './components/LoadingSpinner';
import { generateScriptAndPrompts } from './services/geminiService';
import type { ScriptData } from './types';

const App: React.FC = () => {
  const [idea, setIdea] = useState<string>('Nếu hiện tại không có Internet thì con người sẽ như thế nào?');
  const [duration, setDuration] = useState<number>(1); // Default duration now 1 minute
  const [style, setStyle] = useState<string>('Điện ảnh');
  const [scriptData, setScriptData] = useState<ScriptData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState<string>('');

  const handleGenerate = useCallback(async () => {
    if (!apiKey) {
      setError('Vui lòng nhập OpenAI API Key của bạn.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setScriptData(null);

    try {
      const result = await generateScriptAndPrompts(idea, duration, style, apiKey);
      setScriptData(result);
    } catch (e: any) {
      console.error(e);
      setError(`Đã xảy ra lỗi khi tạo kịch bản: ${e.message}. Vui lòng thử lại.`);
    } finally {
      setIsLoading(false);
    }
  }, [idea, duration, style, apiKey]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
      <main className="container mx-auto px-4 py-8 md:py-12">
        <Header />
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 lg:gap-12">
          <div>
            <IdeaInput
              idea={idea}
              setIdea={setIdea}
              duration={duration}
              setDuration={setDuration}
              style={style}
              setStyle={setStyle}
              apiKey={apiKey}
              setApiKey={setApiKey}
              onGenerate={handleGenerate}
              isLoading={isLoading}
            />
          </div>
          <div className="mt-8 lg:mt-0">
            {isLoading && <LoadingSpinner />}
            {error && <div className="bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded-lg text-center">{error}</div>}
            {scriptData && !isLoading && <ResultsDisplay scriptData={scriptData} />}
            {!scriptData && !isLoading && !error && (
              <div className="flex items-center justify-center h-full bg-gray-800/50 rounded-lg p-8 border-2 border-dashed border-gray-700">
                <p className="text-gray-400 text-center">Kịch bản bạn tạo sẽ xuất hiện ở đây.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;