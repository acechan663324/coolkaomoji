import React from 'react';

export const KaomojiInfo: React.FC = () => {
  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold text-slate-800 mb-4 tracking-wide">What is a Kaomoji?</h3>
      <div className="space-y-3 text-sm text-slate-600 leading-relaxed">
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