import React, { useState } from 'react';
import { generateKaomoji } from '../services/geminiService';
import { KaomojiCard } from './KaomojiCard';
import type { Kaomoji } from '../types';

const LoadingSpinner: React.FC = () => (
  <div className="w-8 h-8 border-4 border-slate-300 border-t-cyan-400 border-solid rounded-full animate-spin"></div>
);

export const Generator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [generatedKaomoji, setGeneratedKaomoji] = useState<Kaomoji | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const examplePrompts = [
    'wizard casting a spell',
    'surprised owl',
    'robot DJ',
    'person bowing respectfully',
  ];

  const handleGenerate = async (promptOverride?: string) => {
    const finalPrompt = promptOverride || prompt;
    if (!finalPrompt.trim() || isLoading) return;
    
    if(promptOverride) {
      setPrompt(finalPrompt);
    }

    setIsLoading(true);
    setError(null);
    setGeneratedKaomoji(null);

    try {
      const result = await generateKaomoji(finalPrompt);
      setGeneratedKaomoji({ name: 'AI Generated', value: result });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleGenerate();
    }
  }

  const handleCopy = (value: string) => {
    navigator.clipboard.writeText(value);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-lg">
      <h2 className="text-3xl font-bold text-center mb-2 text-fuchsia-500">AI Kaomoji Generator</h2>
      <p className="text-center text-slate-600 mb-6">Describe a kaomoji and let AI bring it to life!</p>
      
      <div className="space-y-4">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="e.g., 'a cat hiding in a box'"
          className="w-full px-4 py-3 bg-gray-50 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 transition duration-300"
          disabled={isLoading}
        />
        <button
          onClick={() => handleGenerate()}
          disabled={isLoading || !prompt.trim()}
          className="w-full px-6 py-3 bg-fuchsia-600 text-white font-semibold rounded-lg hover:bg-fuchsia-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition duration-300 flex items-center justify-center gap-2"
        >
          {isLoading ? <LoadingSpinner /> : 'Generate'}
        </button>
      </div>

      <div className="mt-4 text-center">
        <div className="flex flex-wrap gap-2 justify-center">
          <span className="text-slate-500 text-sm self-center">Try an example:</span>
          {examplePrompts.map((p) => (
            <button
              key={p}
              onClick={() => handleGenerate(p)}
              className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-sm hover:bg-slate-200 transition-colors duration-200"
              disabled={isLoading}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 min-h-[144px] flex items-center justify-center bg-gray-100 rounded-lg p-4">
        {isLoading && <LoadingSpinner />}
        {error && <p className="text-red-500 text-center">{error}</p>}
        {generatedKaomoji && (
           <KaomojiCard
            kaomoji={generatedKaomoji}
            onCopy={() => handleCopy(generatedKaomoji.value)}
            onGoToDetail={() => { /* AI generated kaomojis do not have a detail page */ }}
            className="w-48"
          />
        )}
        {!isLoading && !error && !generatedKaomoji && (
          <p className="text-slate-400">Your generated kaomoji will appear here...</p>
        )}
      </div>
    </div>
  );
};
