
import React from 'react';
import type { ScriptData, Scene } from '../types';
import { CopyButton } from './CopyButton';

interface ResultsDisplayProps {
  scriptData: ScriptData;
}

const SceneCard: React.FC<{ scene: Scene }> = ({ scene }) => {
  let prettyJsonPrompt = '';
  try {
    const parsed = JSON.parse(scene.jsonPrompt);
    prettyJsonPrompt = JSON.stringify(parsed, null, 2);
  } catch (e) {
    prettyJsonPrompt = scene.jsonPrompt; // Fallback to raw string if not valid JSON
  }

  return (
    <div className="bg-gray-800/70 p-5 rounded-lg border border-gray-700 backdrop-blur-sm transition-all duration-300 hover:border-indigo-500/50">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-xl font-bold text-indigo-400">Cảnh {scene.sceneNumber}</h3>
        <span className="bg-gray-700 text-gray-300 text-xs font-medium px-2.5 py-1 rounded-full">8s Video</span>
      </div>
      <p className="text-gray-300 mb-4">{scene.description}</p>
      
      <div className="bg-gray-900 rounded-lg p-4">
        <div className="flex justify-between items-center mb-2">
          <h4 className="text-sm font-semibold text-gray-400">VEO 3.1 Prompt (JSON)</h4>
          <CopyButton textToCopy={scene.jsonPrompt} />
        </div>
        <pre className="text-xs text-green-300 whitespace-pre-wrap break-all overflow-x-auto">
          <code>{prettyJsonPrompt}</code>
        </pre>
      </div>
    </div>
  );
};


export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ scriptData }) => {
  return (
    <div className="space-y-8">
      <div className="text-center p-6 bg-gray-800 rounded-xl border border-gray-700">
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">{scriptData.title}</h2>
        <p className="mt-2 text-gray-400">{scriptData.logline}</p>
      </div>
      <div className="space-y-4">
        {scriptData.scenes.map((scene) => (
          <SceneCard key={scene.sceneNumber} scene={scene} />
        ))}
      </div>
    </div>
  );
};
