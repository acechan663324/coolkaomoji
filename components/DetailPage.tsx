import React, { useState, useEffect, useMemo } from 'react';
import { generateKaomojiVariations, generateKaomojiDescription } from '../services/geminiService';
import { kaomojiData } from '../constants/kaomoji';
import type { Kaomoji, KaomojiSubCategory } from '../types';
import { KaomojiCard } from './KaomojiCard';
import { Generator } from './Generator';

interface DetailPageProps {
  kaomoji: Kaomoji;
  onBack: () => void;
  onKaomojiSelect: (kaomoji: Kaomoji) => void;
}

const SkeletonCard: React.FC = () => (
    <div className="bg-white border border-slate-200 rounded-lg p-4 h-36 w-full flex items-center justify-center animate-pulse">
        <div className="w-24 h-6 bg-slate-200 rounded-md"></div>
    </div>
);

export const DetailPage: React.FC<DetailPageProps> = ({ kaomoji, onBack, onKaomojiSelect }) => {
    const [variations, setVariations] = useState<Kaomoji[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [generationAttempted, setGenerationAttempted] = useState(false);
    
    const [description, setDescription] = useState<string>('');
    const [isDescriptionLoading, setIsDescriptionLoading] = useState(true);
    const [descriptionError, setDescriptionError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDescription = async () => {
            setIsDescriptionLoading(true);
            setDescriptionError(null);
            try {
                const desc = await generateKaomojiDescription(kaomoji.value);
                setDescription(desc);
            } catch (err) {
                setDescriptionError(err instanceof Error ? err.message : 'An unknown error occurred.');
            } finally {
                setIsDescriptionLoading(false);
            }
        };
    
        fetchDescription();
        // Reset variations when kaomoji changes
        setGenerationAttempted(false);
        setVariations([]);
    }, [kaomoji.value]);

    const handleGenerateVariations = async () => {
        setGenerationAttempted(true);
        setIsLoading(true);
        setError(null);
        try {
            const result = await generateKaomojiVariations(kaomoji.value);
            setVariations(result.map(v => ({ name: 'AI Variation', value: v })));
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    };

    const relatedKaomoji = useMemo(() => {
        let foundCategory: KaomojiSubCategory | undefined;
        for (const topCategory of kaomojiData) {
            const subCat = topCategory.subCategories.find(sc => sc.kaomojis.some(k => k.value === kaomoji.value));
            if (subCat) {
                foundCategory = subCat;
                break;
            }
        }
        if (!foundCategory) return [];

        return foundCategory.kaomojis
            .filter(k => k.value !== kaomoji.value)
            .sort(() => 0.5 - Math.random()) 
            .slice(0, 5);
    }, [kaomoji.value]);

    const handleCopy = (value: string) => {
        navigator.clipboard.writeText(value);
    };

    return (
        <main className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3 animate-fade-in">
                <header className="mb-8">
                    <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-cyan-600 transition-colors duration-200 group">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:-translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                        </svg>
                        Back to Search
                    </button>
                </header>

                <section className="text-center mb-12">
                    <h1 className="text-3xl font-bold text-slate-800 mb-2">{kaomoji.name}</h1>
                    <div className="inline-block w-64">
                         <KaomojiCard
                            kaomoji={kaomoji}
                            onCopy={handleCopy}
                            onGoToDetail={() => {}} // No need to go to detail from its own page
                            className="h-40"
                          />
                    </div>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-4 text-cyan-600 border-b-2 border-slate-200 pb-2">About this Kaomoji</h2>
                    {isDescriptionLoading && (
                        <div className="animate-pulse space-y-2">
                            <div className="h-4 bg-slate-200 rounded w-full"></div>
                            <div className="h-4 bg-slate-200 rounded w-5/6"></div>
                        </div>
                    )}
                    {descriptionError && <p className="text-red-500">{descriptionError}</p>}
                    {!isDescriptionLoading && !descriptionError && (
                        <p className="text-slate-600 leading-relaxed">{description}</p>
                    )}
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-4 text-fuchsia-500 border-b-2 border-slate-200 pb-2">AI-Generated Variations</h2>
                    
                    {!generationAttempted && !isLoading && (
                        <div className="text-center py-4">
                            <button
                                onClick={handleGenerateVariations}
                                className="px-6 py-3 bg-fuchsia-600 text-white font-semibold rounded-lg hover:bg-fuchsia-700 transition duration-300"
                            >
                                Generate with AI
                            </button>
                        </div>
                    )}

                    {isLoading && (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[...Array(4)].map((_, i) => <SkeletonCard key={i} />)}
                        </div>
                    )}
                    
                    {generationAttempted && !isLoading && (
                        <>
                            {error && <p className="text-red-500 text-center py-4">{error}</p>}
                            {!error && variations.length > 0 && (
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {variations.map((v, i) => (
                                       <KaomojiCard 
                                          key={i}
                                          kaomoji={v}
                                          onCopy={handleCopy}
                                          onGoToDetail={() => {}} // No detail page for AI variations
                                        />
                                    ))}
                                </div>
                            )}
                            {!error && variations.length === 0 && (
                                <p className="text-slate-500 text-center py-4">Could not generate variations for this kaomoji.</p>
                            )}
                        </>
                    )}
                </section>

                {relatedKaomoji.length > 0 && (
                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-cyan-600 border-b-2 border-slate-200 pb-2">Related Kaomoji</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            {relatedKaomoji.map((k) => (
                               <KaomojiCard 
                                  key={k.value}
                                  kaomoji={k}
                                  onCopy={handleCopy}
                                  onGoToDetail={onKaomojiSelect}
                                />
                            ))}
                        </div>
                    </section>
                )}
            </div>
            <aside className="lg:col-span-1 lg:sticky lg:top-24 h-fit">
                <Generator />
            </aside>
        </main>
    );
};
