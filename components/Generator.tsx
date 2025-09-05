
import React, { useState } from 'react';
import { generateKaomoji } from '../services/geminiService';
import { KaomojiCard } from './KaomojiCard';

const LoadingSpinner: React.FC = () => (
  <div className="w-8 h-8 border-4 border-slate-500 border-t-cyan-400 border-solid rounded-full animate-spin"></div>
);

export const Generator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [generatedKaomoji, setGeneratedKaomoji] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

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
    setCopied(false);

    try {
      const result = await generateKaomoji(finalPrompt);
      setGeneratedKaomoji(result);
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

  const handleCopy = () => {
    if (generatedKaomoji) {
      navigator.clipboard.writeText(generatedKaomoji);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 md:p-8">
      <h2 className="text-3xl font-bold text-center mb-2 text-fuchsia-400">Create with AI</h2>
      <p className="text-center text-slate-400 mb-6">Describe the kaomoji you want to create.</p>
      
      <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="e.g., a happy cat drinking coffee"
          disabled={isLoading}
          className="flex-grow w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 transition duration-300 disabled:opacity-50"
        />
        <button
          onClick={() => handleGenerate()}
          disabled={isLoading || !prompt.trim()}
          className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white font-bold rounded-lg hover:from-purple-600 hover:to-fuchsia-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
        >
          {isLoading ? (
             <LoadingSpinner />
          ) : (
            'Generate'
          )}
        </button>
      </div>
      
      <div className="max-w-2xl mx-auto mt-4 text-center">
        <p className="text-sm text-slate-500 mb-2">
            Try an example:
        </p>
        <div className="flex flex-wrap gap-2 justify-center">
            {examplePrompts.map((p) => (
                <button
                    key={p}
                    onClick={() => handleGenerate(p)}
                    disabled={isLoading}
                    className="px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-sm hover:bg-slate-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {p}
                </button>
            ))}
        </div>
      </div>

      <div className="mt-6 min-h-[120px] flex items-center justify-center">
        {error && (
          <div className="text-center text-red-400 bg-red-900/50 border border-red-700 rounded-lg p-4">
            <p className="font-bold">Oops! Something went wrong.</p>
            <p>{error}</p>
          </div>
        )}
        {generatedKaomoji && (
          <div className="w-full max-w-xs animate-fade-in">
            {/* FIX: Added onClick handler to copy kaomoji and display "Copied!" message. */}
            <KaomojiCard
              kaomoji={generatedKaomoji}
              onClick={handleCopy}
              title="Click to copy"
            >
              {copied && (
                <span className="text-cyan-400 font-bold transition-opacity duration-300 opacity-100">
                  Copied!
                </span>
              )}
            </KaomojiCard>
          </div>
        )}
      </div>
    </section>
  );
};
