import React from 'react';

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="relative rounded-full border border-white/60 bg-white/50 p-[1px] shadow-[0_12px_40px_rgba(15,23,42,0.12)] backdrop-blur-2xl">
      <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-5">
        <svg
          className="h-5 w-5 text-slate-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          ></path>
        </svg>
      </span>
      <input
        type="text"
        placeholder="Search for 'happy', 'cat', 'dance'..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full rounded-full border border-white/40 bg-white/70 py-3 pl-12 pr-5 text-base text-slate-700 placeholder-slate-400 shadow-inner focus:border-transparent focus:outline-none focus:ring-4 focus:ring-cyan-200/70"
      />
    </div>
  );
};
