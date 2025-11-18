import React from 'react';

export const KaomojiInfo: React.FC = () => {
  return (
    <div className="mt-8 rounded-[24px] border border-white/60 bg-white/60 p-6 backdrop-blur-2xl">
      <h3 className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-400">What is a Kaomoji?</h3>
      <div className="mt-4 space-y-3 text-sm leading-relaxed text-slate-600">
        <p>
          <strong>Kaomoji</strong> (顔文字) is a popular style of Japanese emoticon that uses characters from various languages to create expressive faces.
        </p>
        <p>
          Unlike Western emoticons like <code>:)</code>, kaomojis are read horizontally and are often much more elaborate, conveying complex emotions and actions like <code>( ´ ∀ ` *)</code> or <code>(╯°□°）╯︵ ┻━┻</code>.
        </p>
        <p>
          They originated in Japan in the 1980s and have since become a beloved part of internet culture worldwide.
        </p>
      </div>
    </div>
  );
};
