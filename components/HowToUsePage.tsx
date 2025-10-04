import React from 'react';

const BackButton: React.FC<{ onBack: () => void }> = ({ onBack }) => (
    <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-cyan-600 transition-colors duration-200 group mb-8">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:-translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        Back to Search
    </button>
);

const CopyIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-cyan-500 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
);
const SearchIcon = () => (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-cyan-500 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
);
const SimilarIcon = () => (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-cyan-500 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
);
const AIGenerateIcon = () => (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-fuchsia-500 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
);

interface HowToUsePageProps {
    onBack: () => void;
}

export const HowToUsePage: React.FC<HowToUsePageProps> = ({ onBack }) => {
    return (
        <div className="animate-fade-in max-w-4xl mx-auto">
            <BackButton onBack={onBack} />
            <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 border border-slate-200">
                <header className="text-center mb-12">
                    <h1 className="text-5xl font-extrabold text-slate-800 mb-4">
                        How to Use <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500">Kaomoji World</span>
                    </h1>
                    <p className="text-xl text-slate-600">Your guide to finding and creating the perfect kaomoji.</p>
                </header>

                <div className="space-y-10">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="flex-shrink-0"><SearchIcon /></div>
                        <div>
                            <h2 className="text-2xl font-bold text-slate-800 mb-2">1. Search for a Kaomoji</h2>
                            <p className="text-slate-600 leading-relaxed">Use the search bar at the top of the page to find exactly what you're looking for. You can search by emotion (e.g., "happy", "sad", "angry"), an animal ("cat", "dog"), or an action ("dance", "shrug", "cry"). The results will instantly filter to show you the most relevant categories and kaomojis.</p>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="flex-shrink-0"><CopyIcon /></div>
                        <div>
                            <h2 className="text-2xl font-bold text-slate-800 mb-2">2. Copy with a Single Click</h2>
                            <p className="text-slate-600 leading-relaxed">Once you've found a kaomoji you love, simply click the "Copy" button. It will be instantly saved to your clipboard, ready to be pasted into Discord, Twitter, or any other chat. The button will turn green and say "Copied!" to let you know it worked.</p>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="flex-shrink-0"><SimilarIcon /></div>
                        <div>
                            <h2 className="text-2xl font-bold text-slate-800 mb-2">3. Discover Similar Styles</h2>
                            <p className="text-slate-600 leading-relaxed">Curious about a specific kaomoji? Click the "Related" button or on the kaomoji itself. This takes you to a dedicated page where you can see other kaomojis from the same category and use our AI to generate unique variations you won't find anywhere else.</p>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="flex-shrink-0"><AIGenerateIcon /></div>
                        <div>
                            <h2 className="text-2xl font-bold text-slate-800 mb-2">4. Generate Your Own with AI</h2>
                            <p className="text-slate-600 leading-relaxed">Unleash your creativity with the AI Kaomoji Generator! Found on the right side of the main page, this tool lets you describe any kaomoji you can imagine (e.g., "a happy robot drinking coffee"). The AI will then create a brand new, unique kaomoji just for you.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
