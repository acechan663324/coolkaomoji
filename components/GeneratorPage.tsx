import React from 'react';
import { Generator, type GeneratorSettings, createDefaultGeneratorSettings } from './Generator';

interface GeneratorPageProps {
  initialPrompt?: string;
  initialSettings?: GeneratorSettings;
  autoGenerateToken?: number;
  onBack: () => void;
}

export const GeneratorPage: React.FC<GeneratorPageProps> = ({
  initialPrompt = '',
  initialSettings,
  autoGenerateToken,
  onBack,
}) => {
  const resolvedSettings = initialSettings ? { ...initialSettings } : createDefaultGeneratorSettings();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 transition-colors duration-200"
        aria-label="Back to home"
      >
        <span aria-hidden="true">←</span>
        Back to Home
      </button>

      <header className="space-y-3">
        <h1 className="text-3xl font-bold text-slate-800">AI Kaomoji Generator</h1>
        <p className="text-slate-600">
          Craft the perfect kaomoji with AI assistance. Fine-tune the mood and complexity, then let the
          generator suggest a custom emotive design for you.
        </p>
      </header>

      <Generator
        mode="full"
        initialPrompt={initialPrompt}
        initialSettings={resolvedSettings}
        autoGenerateToken={autoGenerateToken}
      />
    </div>
  );
};
