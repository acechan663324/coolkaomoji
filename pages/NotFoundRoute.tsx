import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

export const NotFoundRoute: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Page Not Found | Kaomoji World</title>
        <meta
          name="description"
          content="The page you are looking for could not be found. Explore kaomoji, emoji, symbols, and AI generators at Kaomoji World."
        />
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <div className="mx-auto max-w-3xl space-y-6 text-center">
        <p className="text-5xl">(╯︵╰,)</p>
        <h1 className="text-3xl font-semibold text-slate-700">We couldn't find that page</h1>
        <p className="text-slate-500">
          The address might be mistyped or the content may have moved. Head back to the homepage or explore another
          collection.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            to="/"
            className="rounded-full bg-gradient-to-r from-cyan-400 via-sky-500 to-fuchsia-500 px-6 py-2 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5"
          >
            Go Home
          </Link>
          <Link
            to="/how-to-use"
            className="rounded-full border border-white/60 bg-white/60 px-6 py-2 text-sm font-semibold text-slate-600 backdrop-blur-xl transition-transform duration-200 hover:-translate-y-0.5 hover:text-cyan-500"
          >
            Learn Kaomoji Basics
          </Link>
        </div>
      </div>
    </>
  );
};
