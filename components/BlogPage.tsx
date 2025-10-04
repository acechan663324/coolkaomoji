import React from 'react';

const BackButton: React.FC<{ onBack: () => void }> = ({ onBack }) => (
    <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-cyan-600 transition-colors duration-200 group mb-8">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:-translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        Back to Search
    </button>
);

const PlaceholderCard = () => (
    <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm animate-pulse">
        <div className="h-4 bg-slate-200 rounded w-3/4 mb-4"></div>
        <div className="space-y-2">
            <div className="h-3 bg-slate-200 rounded w-full"></div>
            <div className="h-3 bg-slate-200 rounded w-full"></div>
            <div className="h-3 bg-slate-200 rounded w-5/6"></div>
        </div>
        <div className="h-3 bg-slate-200 rounded w-1/3 mt-6"></div>
    </div>
)

interface BlogPageProps {
    onBack: () => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({ onBack }) => {
    return (
        <div className="animate-fade-in max-w-4xl mx-auto">
            <BackButton onBack={onBack} />
            <div className="text-center">
                <h1 className="text-5xl font-extrabold text-slate-800 mb-4">The Kaomoji Blog</h1>
                <p className="text-xl text-slate-600 mb-12">Insights, History, and Fun with Text Faces!</p>
                
                <div className="border-4 border-dashed border-slate-300 rounded-xl p-12 mb-12 text-center">
                    <h2 className="text-3xl font-bold text-slate-500">Coming Soon!</h2>
                    <p className="text-slate-500 mt-4">We're preparing some exciting articles for you. Stay tuned!</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                    <PlaceholderCard />
                    <PlaceholderCard />
                    <PlaceholderCard />
                    <PlaceholderCard />
                </div>
            </div>
        </div>
    );
};
