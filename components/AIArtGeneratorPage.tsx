import React, { useState } from 'react';
import { generateDigitalArt } from '../services/geminiService';

const BackButton: React.FC<{ onBack: () => void }> = ({ onBack }) => (
    <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-cyan-600 transition-colors duration-200 group mb-8">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:-translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        Back to Home
    </button>
);

const LoadingSpinner: React.FC = () => (
  <div className="w-8 h-8 border-4 border-slate-300 border-t-cyan-400 border-solid rounded-full animate-spin"></div>
);

interface AIArtGeneratorPageProps {
    onBack: () => void;
}

export const AIArtGeneratorPage: React.FC<AIArtGeneratorPageProps> = ({ onBack }) => {
    const [prompt, setPrompt] = useState('');
    const [width, setWidth] = useState(50);
    const [generatedArt, setGeneratedArt] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isCopied, setIsCopied] = useState(false);

    const examplePrompts = [
        'A serene mountain landscape at sunrise, with a soaring eagle',
        'Cosmic cat floating in space among stars and planets',
        'Enchanted forest with glowing mushrooms and a hidden path',
        'A bustling cyberpunk city street at night with neon signs',
    ];

    const handleGenerate = async (promptOverride?: string) => {
        const finalPrompt = promptOverride || prompt;
        if (!finalPrompt.trim() || isLoading) return;

        if (promptOverride) {
            setPrompt(finalPrompt);
        }

        setIsLoading(true);
        setError(null);
        setGeneratedArt('');

        try {
            const result = await generateDigitalArt(finalPrompt, width);
            setGeneratedArt(result);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleCopy = () => {
        if (!generatedArt) return;
        navigator.clipboard.writeText(generatedArt);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    return (
        <div className="animate-fade-in max-w-4xl mx-auto">
            <BackButton onBack={onBack} />
            <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 border border-slate-200">
                <header className="text-center mb-10">
                    <h1 className="text-5xl font-extrabold text-slate-800 mb-4">
                        AI Digital Art Generator
                    </h1>
                    <p className="text-xl text-slate-600">Describe a scene, and let AI paint it with symbols, emojis, and kaomojis.</p>
                </header>

                <div className="space-y-6">
                    <div>
                        <label htmlFor="art-prompt" className="block text-lg font-semibold text-slate-700 mb-2">Your Vision</label>
                        <textarea
                            id="art-prompt"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="e.g., 'A tranquil japanese garden with a stone lantern and koi pond'"
                            className="w-full px-4 py-3 bg-gray-50 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 transition duration-300 h-32 resize-y"
                            disabled={isLoading}
                        />
                    </div>

                    <div>
                        <label htmlFor="art-width" className="block text-lg font-semibold text-slate-700 mb-2">
                            Art Width ({width} characters)
                        </label>
                        <input
                            id="art-width"
                            type="range"
                            min="30"
                            max="100"
                            value={width}
                            onChange={(e) => setWidth(Number(e.target.value))}
                            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                            disabled={isLoading}
                        />
                    </div>

                    <button
                        onClick={() => handleGenerate()}
                        disabled={isLoading || !prompt.trim()}
                        className="w-full px-6 py-4 bg-fuchsia-600 text-white text-lg font-bold rounded-lg hover:bg-fuchsia-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition duration-300 flex items-center justify-center gap-3"
                    >
                        {isLoading ? <LoadingSpinner /> : '✨ Generate Art'}
                    </button>
                </div>

                 <div className="mt-6 text-center">
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

                <div className="mt-10">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold text-slate-800">Generated Art</h2>
                        {generatedArt && !isLoading && (
                             <button
                                onClick={handleCopy}
                                className={`px-4 py-2 rounded-md text-sm font-semibold transition-colors duration-200 ${
                                isCopied
                                    ? 'bg-emerald-500 text-white'
                                    : 'bg-cyan-500 text-white hover:bg-cyan-600'
                                }`}
                            >
                                {isCopied ? 'Copied!' : 'Copy Art'}
                            </button>
                        )}
                    </div>
                    <div className="bg-slate-900 text-white rounded-lg p-4 min-h-[200px] flex items-center justify-center overflow-x-auto">
                        {isLoading && <LoadingSpinner />}
                        {error && <p className="text-red-400 text-center">{error}</p>}
                        {!isLoading && !error && !generatedArt && (
                            <p className="text-slate-400">Your digital art will appear here...</p>
                        )}
                        {generatedArt && (
                            <pre className="font-mono text-sm whitespace-pre">{generatedArt}</pre>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};
