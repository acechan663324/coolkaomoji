import React, { useState, useEffect } from 'react';
import { generateCategoryDescription } from '../services/geminiService';
import type { Kaomoji, KaomojiCategory } from '../types';
import { KaomojiCard } from './KaomojiCard';
import { Footer } from './Footer';
import { Generator } from './Generator';
import { AdsenseAd } from './AdsenseAd';

interface CategoryPageProps {
  category: KaomojiCategory;
  onKaomojiSelect: (kaomoji: Kaomoji) => void;
  onBack: () => void;
  copiedValue: string | null;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({ category, onKaomojiSelect, onBack, copiedValue }) => {
    const [description, setDescription] = useState<string>('');
    const [isDescriptionLoading, setIsDescriptionLoading] = useState(true);
    const [descriptionError, setDescriptionError] = useState<string | null>(null);

    useEffect(() => {
        const originalTitle = document.title;
        // Clean up category name for the title
        const cleanCategoryName = category.category.replace(/^[^\w\s]+/, '').trim();
        document.title = `${cleanCategoryName} | Kaomoji World`;
    
        return () => {
          document.title = originalTitle;
        };
    }, [category.category]);

    useEffect(() => {
        const fetchDescription = async () => {
            setIsDescriptionLoading(true);
            setDescriptionError(null);
            try {
                const desc = await generateCategoryDescription(category.category);
                setDescription(desc);
            } catch (err) {
                setDescriptionError(err instanceof Error ? err.message : 'An unknown error occurred.');
            } finally {
                setIsDescriptionLoading(false);
            }
        };
    
        fetchDescription();
    }, [category.category]);

    const handleCopy = (value: string) => {
        navigator.clipboard.writeText(value);
    };

    return (
        <div className="bg-gray-50 text-slate-800 font-sans relative">
            {/* Left Ad Sidebar */}
            <aside className="hidden 2xl:block fixed top-20 left-8 w-[160px] h-[600px]">
                <AdsenseAd client="ca-pub-3685000706717214" slot="2760671227" style={{ width: '160px', height: '600px' }} />
            </aside>

            {/* Right Ad Sidebar */}
            <aside className="hidden 2xl:block fixed top-20 right-8 w-[160px] h-[600px]">
                <AdsenseAd client="ca-pub-3685000706717214" slot="2760671227" style={{ width: '160px', height: '600px' }} />
            </aside>

            <div className="container mx-auto px-4 py-8">
                <main className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Left Column (Content) */}
                    <div className="lg:col-span-3 animate-fade-in">
                        <header className="mb-8">
                            <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-cyan-600 transition-colors duration-200 group">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:-translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                                </svg>
                                Back to All Categories
                            </button>
                        </header>

                        <section className="mb-12">
                            <h1 className="text-4xl font-bold text-slate-800 mb-4">{category.category}</h1>
                            {isDescriptionLoading && (
                                <div className="animate-pulse space-y-2">
                                    <div className="h-4 bg-slate-200 rounded w-full"></div>
                                    <div className="h-4 bg-slate-200 rounded w-5/6"></div>
                                </div>
                            )}
                            {descriptionError && <p className="text-red-500">{descriptionError}</p>}
                            {!isDescriptionLoading && !descriptionError && (
                                <p className="text-slate-600 leading-relaxed text-lg">{description}</p>
                            )}
                        </section>

                        <section>
                           <div className="flex flex-wrap items-start justify-start gap-4">
                                {category.kaomojis.map((kaomoji) => (
                                <KaomojiCard 
                                    key={`${category.category}-${kaomoji.value}`} 
                                    kaomoji={kaomoji.value} 
                                    onClick={() => onKaomojiSelect(kaomoji)}
                                    title={kaomoji.name}
                                >
                                    {copiedValue === kaomoji.value && (
                                        <span className="text-cyan-500 font-bold transition-opacity duration-300 opacity-100">
                                            Copied!
                                        </span>
                                    )}
                                </KaomojiCard>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Right Sidebar (Generator) */}
                    <aside className="lg:col-span-1 lg:sticky lg:top-8 h-fit">
                        <Generator />
                    </aside>
                </main>
            </div>
            <Footer />
        </div>
    );
};
