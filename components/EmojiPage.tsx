import React, { useState, useMemo } from 'react';
import { emojiData } from '../constants/emoji';

const BackButton: React.FC<{ onBack: () => void }> = ({ onBack }) => (
    <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-cyan-600 transition-colors duration-200 group mb-8">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:-translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        Back to Search
    </button>
);

interface EmojiPageProps {
    onBack: () => void;
}

export const EmojiPage: React.FC<EmojiPageProps> = ({ onBack }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [copiedEmoji, setCopiedEmoji] = useState<string | null>(null);

    const handleCopy = (emoji: string) => {
        navigator.clipboard.writeText(emoji);
        setCopiedEmoji(emoji);
        const timer = setTimeout(() => {
          setCopiedEmoji(null);
        }, 2000);
        return () => clearTimeout(timer);
    };

    const filteredCategories = useMemo(() => {
        if (!searchTerm.trim()) {
            return emojiData;
        }
        const lowercasedFilter = searchTerm.toLowerCase();
        
        return emojiData
            .map(category => {
                const filteredEmojis = category.emojis.filter(
                    emoji =>
                        emoji.name.toLowerCase().includes(lowercasedFilter) ||
                        emoji.emoji.includes(lowercasedFilter)
                );
                return { ...category, emojis: filteredEmojis };
            })
            .filter(category => category.emojis.length > 0);
    }, [searchTerm]);

    return (
        <div className="animate-fade-in max-w-7xl mx-auto">
            <BackButton onBack={onBack} />
            <div className="text-center mb-10">
                <h1 className="text-5xl font-extrabold text-slate-800 mb-4">Emoji Library</h1>
                <p className="text-xl text-slate-600">Search, discover, and copy your favorite emojis.</p>
            </div>

            <div className="sticky top-16 bg-gray-50/80 backdrop-blur-sm py-4 z-20 mb-8">
                 <div className="relative max-w-2xl mx-auto">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-4">
                        <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                        </svg>
                    </span>
                    <input
                        type="text"
                        placeholder="Search for an emoji..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-white border border-slate-300 rounded-full text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition duration-300"
                    />
                </div>
            </div>

            {filteredCategories.length > 0 ? (
                <div className="space-y-12">
                    {filteredCategories.map(category => (
                        <section key={category.name}>
                            <h2 className="text-2xl font-bold text-slate-700 mb-6">{category.name}</h2>
                            <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-2">
                                {category.emojis.map(({ emoji, name }) => (
                                    <div key={name} className="relative">
                                        <button
                                            onClick={() => handleCopy(emoji)}
                                            title={name}
                                            className="w-full aspect-square flex items-center justify-center text-3xl bg-white rounded-lg border border-slate-200 hover:shadow-md hover:border-cyan-400 hover:-translate-y-1 transition-all duration-200"
                                            aria-label={`Copy emoji: ${name}`}
                                        >
                                            {emoji}
                                        </button>
                                        {copiedEmoji === emoji && (
                                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs font-semibold px-2 py-1 rounded-md shadow-lg animate-fade-in-out">
                                                Copied!
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    ))}
                </div>
            ) : (
                <div className="text-center text-slate-500 py-16">
                    <p className="text-4xl mb-4">🤷</p>
                    <p className="text-xl">No emojis found. Try a different search term!</p>
                </div>
            )}
        </div>
    );
};
