import React, { useState, useCallback, useEffect, useRef } from 'react';
import { generateKaomoji } from '../services/geminiService';
import { KaomojiCard } from './KaomojiCard';
import type { Kaomoji } from '../types';

type GeneratorMode = 'full' | 'preview';

export interface GeneratorSettings {
  tone: 'cute' | 'cool' | 'dramatic' | 'playful';
  complexity: 'simple' | 'balanced' | 'complex';
}

const SETTINGS_DEFAULTS: GeneratorSettings = {
  tone: 'cute',
  complexity: 'balanced',
};

export const DEFAULT_GENERATOR_SETTINGS: GeneratorSettings = {
  ...SETTINGS_DEFAULTS,
};

export const createDefaultGeneratorSettings = (): GeneratorSettings => ({
  ...SETTINGS_DEFAULTS,
});

export interface GeneratorPreviewRequest {
  prompt: string;
  settings: GeneratorSettings;
}

interface GeneratorProps {
  mode?: GeneratorMode;
  initialPrompt?: string;
  initialSettings?: GeneratorSettings;
  autoGenerateToken?: number;
  onPreviewSubmit?: (request: GeneratorPreviewRequest) => void;
}

const LoadingSpinner: React.FC = () => (
  <div className="w-8 h-8 border-4 border-slate-300 border-t-cyan-400 border-solid rounded-full animate-spin"></div>
);

const examplePrompts = [
  'wizard casting a spell',
  'surprised owl',
  'robot DJ',
  'person bowing respectfully',
];

const toneOptionLabels: Record<GeneratorSettings['tone'], string> = {
  cute: 'Cute & Friendly',
  cool: 'Cool & Collected',
  dramatic: 'Dramatic & Bold',
  playful: 'Playful & Energetic',
};

const toneInstructions: Record<GeneratorSettings['tone'], string> = {
  cute: 'cute, charming, and full of warmth',
  cool: 'calm, composed, and effortlessly stylish',
  dramatic: 'bold, expressive, and cinematic',
  playful: 'energetic, fun, and mischievous',
};

const complexityOptionLabels: Record<GeneratorSettings['complexity'], string> = {
  simple: 'Simple & Minimal',
  balanced: 'Balanced Detail',
  complex: 'Highly Detailed',
};

const complexityInstructions: Record<GeneratorSettings['complexity'], string> = {
  simple: 'a minimal design that is easy to copy',
  balanced: 'a balanced level of detail',
  complex: 'an intricate design packed with characters and flair',
};

const buildPromptWithSettings = (basePrompt: string, settings: GeneratorSettings): string => {
  const toneInstruction = toneInstructions[settings.tone];
  const complexityInstruction = complexityInstructions[settings.complexity];
  return `${basePrompt}. The kaomoji should feel ${toneInstruction} with ${complexityInstruction}.`;
};

export const Generator: React.FC<GeneratorProps> = ({
  mode = 'full',
  initialPrompt = '',
  initialSettings,
  autoGenerateToken,
  onPreviewSubmit,
}) => {
  const [prompt, setPrompt] = useState(initialPrompt);
  const [settings, setSettings] = useState<GeneratorSettings>(
    initialSettings ? { ...initialSettings } : createDefaultGeneratorSettings(),
  );
  const [generatedKaomoji, setGeneratedKaomoji] = useState<Kaomoji | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const lastAutoGenerateTokenRef = useRef<number | undefined>();

  const handleGenerate = useCallback(
    async (promptOverride?: string, settingsOverride?: GeneratorSettings) => {
      const basePrompt = promptOverride ?? prompt;
      const trimmedPrompt = basePrompt.trim();
      if (!trimmedPrompt) {
        return;
      }

      if (promptOverride !== undefined) {
        setPrompt(promptOverride);
      }

      const effectiveSettings = settingsOverride ?? settings;

      if (mode === 'preview') {
        onPreviewSubmit?.({
          prompt: trimmedPrompt,
          settings: { ...effectiveSettings },
        });
        return;
      }

      if (isLoading) {
        return;
      }

      setIsLoading(true);
      setError(null);
      setGeneratedKaomoji(null);

      try {
        const promptWithSettings = buildPromptWithSettings(trimmedPrompt, effectiveSettings);
        const result = await generateKaomoji(promptWithSettings);
        setGeneratedKaomoji({ name: 'AI Generated', value: result });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      } finally {
        setIsLoading(false);
      }
    },
    [prompt, settings, mode, onPreviewSubmit, isLoading],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        void handleGenerate();
      }
    },
    [handleGenerate],
  );

  const handleCopy = (value: string) => {
    navigator.clipboard.writeText(value);
  };

  useEffect(() => {
    if (
      mode === 'full' &&
      autoGenerateToken !== undefined &&
      autoGenerateToken !== lastAutoGenerateTokenRef.current
    ) {
      lastAutoGenerateTokenRef.current = autoGenerateToken;
      const nextPrompt = initialPrompt ?? '';
      const nextSettings = initialSettings ? { ...initialSettings } : createDefaultGeneratorSettings();
      setPrompt(nextPrompt);
      setSettings(nextSettings);

      if (nextPrompt.trim()) {
        void handleGenerate(nextPrompt, nextSettings);
      } else {
        setGeneratedKaomoji(null);
        setError(null);
      }
    }
  }, [autoGenerateToken, handleGenerate, initialPrompt, initialSettings, mode]);

  useEffect(() => {
    if (mode === 'preview') {
      const nextPrompt = initialPrompt ?? '';
      const nextSettings = initialSettings ? { ...initialSettings } : createDefaultGeneratorSettings();
      setPrompt(nextPrompt);
      setSettings(nextSettings);
    }
  }, [initialPrompt, initialSettings, mode]);

  const handleToneChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as GeneratorSettings['tone'];
    setSettings((prev) => ({
      ...prev,
      tone: value,
    }));
  };

  const handleComplexityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as GeneratorSettings['complexity'];
    setSettings((prev) => ({
      ...prev,
      complexity: value,
    }));
  };

  const buttonDisabled = mode === 'full' ? isLoading || !prompt.trim() : !prompt.trim();

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-lg">
      <h2 className="text-3xl font-bold text-center mb-2 text-fuchsia-500">AI Kaomoji Generator</h2>
      <p className="text-center text-slate-600 mb-6">Describe a kaomoji and let AI bring it to life!</p>
      
      <div className="flex flex-col gap-4">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="e.g., 'a cat hiding in a box'"
          className="w-full px-4 py-3 bg-gray-50 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 transition duration-300"
          disabled={mode === 'full' ? isLoading : false}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium text-slate-600">Mood</span>
            <select
              value={settings.tone}
              onChange={handleToneChange}
              className="px-3 py-2 border border-slate-300 rounded-lg bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 transition duration-200"
            >
              {Object.entries(toneOptionLabels).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium text-slate-600">Complexity</span>
            <select
              value={settings.complexity}
              onChange={handleComplexityChange}
              className="px-3 py-2 border border-slate-300 rounded-lg bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 transition duration-200"
            >
              {Object.entries(complexityOptionLabels).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <button
          onClick={() => handleGenerate()}
          disabled={buttonDisabled}
          className="w-full px-6 py-3 bg-fuchsia-600 text-white font-semibold rounded-lg hover:bg-fuchsia-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition duration-300 flex items-center justify-center gap-2"
        >
          {mode === 'full' && isLoading ? <LoadingSpinner /> : 'Generate'}
        </button>
      </div>

      {mode === 'full' && (
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
      )}

      {mode === 'full' && (
        <div className="mt-6 min-h-[144px] flex items-center justify-center bg-gray-100 rounded-lg p-4">
          {isLoading && <LoadingSpinner />}
          {error && <p className="text-red-500 text-center">{error}</p>}
          {generatedKaomoji && (
            <KaomojiCard
              kaomoji={generatedKaomoji}
              onCopy={() => handleCopy(generatedKaomoji.value)}
              onGoToDetail={() => {
                /* AI generated kaomojis do not have a detail page */
              }}
              className="w-48"
            />
          )}
          {!isLoading && !error && !generatedKaomoji && (
            <p className="text-slate-400">Your generated kaomoji will appear here...</p>
          )}
        </div>
      )}
    </div>
  );
};
