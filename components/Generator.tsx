import React, { useState, useCallback, useEffect, useRef } from 'react';
import { generateKaomoji } from '../services/openAIService';
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
  const promptInputRef = useRef<HTMLInputElement>(null);

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
    <div className="relative overflow-hidden rounded-[28px] border border-white/60 bg-white/60 p-6 backdrop-blur-2xl sm:p-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(173,216,255,0.3),_transparent_65%)]" />
      <div className="relative">
        <h2 className="text-center text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-500 to-fuchsia-500">AI Kaomoji Generator</h2>
        <p className="mt-2 text-center text-sm text-slate-500">Describe a kaomoji and let AI bring it to life.</p>
      
        <div className="mt-6 flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="kaomoji-generator-prompt"
              className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-400"
            >
              Prompt
            </label>
            <div
              className="relative cursor-text rounded-2xl border border-white/60 bg-white/70 p-[1px]"
              onClick={() => promptInputRef.current?.focus()}
              role="presentation"
            >
              <input
                id="kaomoji-generator-prompt"
                ref={promptInputRef}
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="e.g., 'a cat hiding in a box'"
                className="w-full rounded-[22px] border border-white/50 bg-white/80 px-5 py-4 text-sm text-slate-700 placeholder-slate-400 focus:border-transparent focus:outline-none focus:ring-4 focus:ring-cyan-200/70"
                disabled={mode === 'full' ? isLoading : false}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="flex w-full cursor-pointer flex-col gap-2">
              <span className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-400">Mood</span>
              <select
                value={settings.tone}
                onChange={handleToneChange}
                className="w-full rounded-2xl border border-white/60 bg-white/70 px-3 py-3 text-sm text-slate-600 backdrop-blur-xl transition duration-200 focus:border-transparent focus:outline-none focus:ring-4 focus:ring-cyan-200/70"
              >
                {Object.entries(toneOptionLabels).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex w-full cursor-pointer flex-col gap-2">
              <span className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-400">Complexity</span>
              <select
                value={settings.complexity}
                onChange={handleComplexityChange}
                className="w-full rounded-2xl border border-white/60 bg-white/70 px-3 py-3 text-sm text-slate-600 backdrop-blur-xl transition duration-200 focus:border-transparent focus:outline-none focus:ring-4 focus:ring-cyan-200/70"
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
            className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 via-sky-500 to-fuchsia-500 px-6 py-3 text-sm font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {mode === 'full' && isLoading ? <LoadingSpinner /> : 'Generate'}
          </button>
        </div>
      </div>

      {mode === 'full' && (
        <div className="relative mt-6 text-center">
          <div className="flex flex-wrap justify-center gap-2">
            <span className="self-center text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Try an example</span>
            {examplePrompts.map((p) => (
              <button
                key={p}
                onClick={() => handleGenerate(p)}
                className="rounded-full border border-white/60 bg-white/60 px-3 py-1 text-xs font-medium text-slate-600 backdrop-blur-xl transition-transform duration-200 hover:-translate-y-0.5 hover:text-cyan-500"
                disabled={isLoading}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      )}

      {mode === 'full' && (
        <div className="mt-6 flex min-h-[144px] items-center justify-center rounded-2xl border border-white/50 bg-white/50 p-4 backdrop-blur-xl">
          {isLoading && <LoadingSpinner />}
          {error && <p className="text-center text-sm text-red-500">{error}</p>}
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
            <p className="text-sm text-slate-400">Your generated kaomoji will appear here...</p>
          )}
        </div>
      )}
    </div>
  );
};
