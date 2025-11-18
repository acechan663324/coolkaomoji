
import React from 'react';

const BackButton: React.FC<{ onBack: () => void }> = ({ onBack }) => (
    <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-cyan-600 transition-colors duration-200 group mb-8">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:-translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        Back to Search
    </button>
);

interface BlogPageProps {
    onBack: () => void;
}

const Article: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <article className="bg-white p-8 rounded-xl border border-slate-200 text-left">
        <h2 className="text-3xl font-bold text-slate-800 mb-6 border-b-2 border-slate-200 pb-4">{title}</h2>
        <div className="prose prose-slate max-w-none prose-h3:text-cyan-600 prose-h3:font-semibold prose-strong:text-slate-700 prose-pre:bg-slate-100 prose-pre:p-3 prose-pre:rounded-md prose-pre:text-sm prose-code:font-mono">
            {children}
        </div>
    </article>
);


export const BlogPage: React.FC<BlogPageProps> = ({ onBack }) => {
    return (
        <div className="animate-fade-in max-w-4xl mx-auto">
            <BackButton onBack={onBack} />
            <header className="text-center mb-12">
                <h1 className="text-5xl font-extrabold text-slate-800 mb-4">The Kaomoji Blog</h1>
                <p className="text-xl text-slate-600">Insights, History, and Fun with Text Faces!</p>
            </header>

            <div className="space-y-12">
                <Article title="Unleash Your Inner Artist: Introducing the AI Digital Art Generator!">
                    <p>
                        We're thrilled to announce a brand-new feature on Kaomoji World: the <strong>AI Digital Art Generator!</strong> Ever imagined a scene and wished you could see it painted with symbols, emojis, and kaomojis? Now you can. This powerful new tool, accessible via the "AI Art" link in the navigation, uses generative AI to transform your text descriptions into unique and stunning digital art.
                    </p>

                    <h3>How It Works</h3>
                    <p>
                        Powered by Google's advanced Gemini model, the AI Art Generator interprets your creative prompts and constructs a visual piece line by line. It's not just finding images; it's painting with characters. You control the vision, and the AI handles the brushstrokes.
                    </p>

                    <h3>How to Create Your Masterpiece</h3>
                    <p>
                        Getting started is easy:
                    </p>
                    <ol>
                        <li>Navigate to the <strong>AI Art</strong> page from the main menu.</li>
                        <li>In the "Your Vision" text box, write a detailed description of the art you want to create. The more descriptive, the better!</li>
                        <li>Use the "Art Width" slider to control the width (in characters) of each line in your artwork. This is great for adjusting the level of detail.</li>
                        <li>Click the <strong>✨ Generate Art</strong> button and watch your idea come to life in the display box below.</li>
                    </ol>
                    <p>Once generated, you can easily copy the entire piece with the "Copy Art" button to share it anywhere.</p>

                    <h3>Examples to Get You Started</h3>
                    
                    <h4>1. A Serene Landscape</h4>
                    <p>Let's create a peaceful scene. We can describe the key elements we want to see.</p>
                    <p><strong>Prompt:</strong> <code>A tranquil japanese garden with a stone lantern, a cherry blossom tree, and a koi pond.</code></p>
                    <p><strong>Result:</strong> The AI will combine elements like <code>🌸</code> for blossoms, <code>🐟</code> for koi, and various block characters to build the structure of the garden, creating a beautiful and calm picture.</p>
                    <pre>
{`          , - ~ ~ ~ - .
      (      🌸      )
   (   |\\   /|_     )
  (    |  |'|  |    )
 (  '  |' |'|' |   ' )
(     '|' |'|' |'     )
〰〰🐟〰〰〰〰〰〰〰〰〰〰`}
                    </pre>

                    <h4>2. A Dynamic Cityscape</h4>
                    <p>You can also create complex, high-energy scenes. Let's try a futuristic city.</p>
                    <p><strong>Prompt:</strong> <code>Cyberpunk city skyline at night, with towering neon skyscrapers and flying cars.</code></p>
                    <p><strong>Result:</strong> Expect to see a vibrant mix of block characters (<code>█ ▓ ▒</code>) forming buildings, colorful symbols for neon lights, and perhaps small kaomoji-like shapes for flying vehicles, capturing that futuristic feel.</p>
                    <pre>
{`|~|_| |~|🌃| |~/~
|_|_| | |~~~| |\\\\ 
| | | | | 🏙️| |~~\\\\
  -o- | |   | |  \\\\
      | |~~~| |   `}
                    </pre>

                    <h4>3. An Adorable Animal Scene</h4>
                    <p>The generator is also great at creating cute and simple subjects. The key is to describe the mood and posture.</p>
                    <p><strong>Prompt:</strong> <code>A fluffy cat sleeping on a stack of books, looking warm and cozy.</code></p>
                    <p><strong>Result:</strong> The AI will use characters to form the shape of a cat <code>(=^･ω･^=)</code>, combined with symbols representing books <code>📖</code> or stacked lines, and maybe some "zzz"s to show it's asleep.</p>
                    <pre>
{`      Z
     Z
    Z
  (=-ω-)_旦
 c(,_uu_)📚`}
                    </pre>
                    <p>
                        Your imagination is the only limit. Try generating your favorite characters, landscapes, or abstract concepts. We can't wait to see what you create!
                    </p>
                </Article>

                <Article title="The Expressive World of Kaomoji (顔文字)">
                    <p>
                        Welcome to the delightful universe of kaomoji! Unlike Western emoticons like <code>:)</code> that are read sideways, kaomoji are Japanese-style emoticons read horizontally, like <code>(^_^)</code>. They are crafted using a rich combination of characters from different languages to create incredibly detailed and nuanced expressions.
                    </p>
                    
                    <h3>Origins and History</h3>
                    <p>
                        Kaomoji originated in Japan in the 1980s on early internet forums like ASCII NET. Users creatively combined standard keyboard characters to express emotions that plain text couldn't convey. This grassroots creativity led to an explosion of styles, from simple smiles to complex, multi-character scenes like the infamous table flip: <code>(╯°□°）╯︵ ┻━┻</code>.
                    </p>

                    <h3>Main Types of Kaomoji</h3>
                    <p>
                        Our site organizes thousands of kaomoji into intuitive categories to help you find the perfect one. The main categories include:
                    </p>
                    <ul>
                        <li><strong>Positive Emotions:</strong> Covering everything from <strong>Joy</strong> <code>( ´ ∀ ` *)</code> to <strong>Love</strong> <code>(♡μ_μ)</code>.</li>
                        <li><strong>Negative Emotions:</strong> Expressing <strong>Anger</strong> <code>(＃`Д´)</code>, <strong>Sadness</strong> <code>(T_T)</code>, and more.</li>
                        <li><strong>Neutral Emotions:</strong> For when you're feeling indifferent with a <strong>Shrug</strong> <code>¯\_(ツ)_/¯</code> or confused.</li>
                        <li><strong>Animals:</strong> A huge collection of creatures like <strong>Cats</strong> <code>(=^･ω･^=)</code> and <strong>Bears</strong> <code>ʕ•ᴥ•ʔ</code>.</li>
                    </ul>

                    <h3>How to Use on Kaomoji World</h3>
                    <p>
                        Finding and using kaomoji here is simple. You can either browse the categories on the main page or use the search bar to look for a specific mood or character. Once you find one you like, just click the <strong>"Copy"</strong> button. It’s now on your clipboard, ready to be pasted! For more options, click on the kaomoji itself or the <strong>"Related"</strong> button to see similar styles.
                    </p>

                    <h3>Where Can You Use Kaomoji?</h3>
                    <p>
                        Almost anywhere you can type! They are incredibly popular on social media platforms like Twitter and Instagram, messaging apps like Discord and Slack, and in online gaming chats to add personality and flair.
                    </p>
                </Article>

                <Article title="Emoji: From Pixels to a Global Language">
                    <p>
                        Emojis are the small pictographs that have become an indispensable part of modern digital communication. From a simple smiley to a complex flag, emojis help us add tone, emotion, and context to our messages, crossing language barriers in a way words sometimes can't.
                    </p>
                    
                    <h3>Origins and History</h3>
                    <p>
                        The first widely used emojis were created in 1999 by Japanese artist Shigetaka Kurita for NTT DoCoMo's mobile internet platform. However, it was their standardization by the <strong>Unicode Consortium</strong> and adoption by major tech companies like Apple and Google in the early 2010s that led to their global explosion. This standardization ensured that an emoji sent from an iPhone would look similar on an Android device or a web browser.
                    </p>

                    <h3>Main Types of Emoji</h3>
                    <p>
                        Our emoji library is organized into standard, easy-to-browse categories:
                    </p>
                    <ul>
                        <li><strong>Smileys & Emotion:</strong> The classic yellow faces expressing a full range of feelings.</li>
                        <li><strong>People & Body:</strong> Human figures, gestures like <strong>thumbs up</strong> 👍, and body parts.</li>
                        <li><strong>Animals & Nature:</strong> A digital zoo of animals, plants, and weather.</li>
                        <li><strong>Food & Drink:</strong> From fruits 🍎 to pizza 🍕 and coffee ☕.</li>
                        <li><strong>Symbols:</strong> Includes hearts ❤️, signs, and other symbolic characters.</li>
                    </ul>

                    <h3>How to Use on Kaomoji World</h3>
                    <p>
                        Navigate to our dedicated <strong>Emoji</strong> page. You can use the search bar at the top to quickly find what you're looking for (e.g., "heart", "laughing"). Simply click on any emoji in the grid, and it will be instantly copied to your clipboard, confirmed by a "Copied!" tooltip.
                    </p>

                    <h3>Where Can You Use Emoji?</h3>
                    <p>
                        Everywhere! Emojis are natively supported on virtually all modern devices and platforms, including iOS, Android, Windows, macOS, and all major social media apps, email clients, and messaging services.
                    </p>
                </Article>

                <Article title="Beyond the Alphabet: A Guide to Special Symbols">
                    <p>
                        Beyond the letters and numbers on your keyboard lies a vast universe of special symbols. These characters, ranging from mathematical operators to currency signs and geometric shapes, can be used to add precision, style, and uniqueness to your text.
                    </p>
                    
                    <h3>Origins and History</h3>
                    <p>
                        Many symbols have ancient origins. For example, currency signs like the pound sign (£) evolved over centuries, while mathematical symbols like pi (π) were adopted by mathematicians to create a universal language for their work. The digital accessibility of these symbols is thanks to <strong>Unicode</strong>, a standard that assigns a unique code to every character, ensuring they can be displayed consistently across different devices and platforms.
                    </p>

                    <h3>Main Types of Symbols</h3>
                    <p>Our Symbol library categorizes these useful characters for easy access:</p>
                    <ul>
                        <li><strong>Currency:</strong> Find symbols for various world currencies, like the Euro (€), Yen (¥), and Dollar ($).</li>
                        <li><strong>Math & Logic:</strong> A collection of operators and symbols like Infinity (∞), Pi (π), and Not Equal (≠).</li>
                        <li><strong>Arrows:</strong> A huge variety of arrows (→, ↔, ↩) for pointing and direction.</li>
                        <li><strong>Stars & Flowers:</strong> Decorative symbols (★, ✿, ✨) to add flair to your text.</li>
                        <li><strong>Greek Alphabet:</strong> Essential for scientific and mathematical notation (α, β, Σ).</li>
                    </ul>

                    <h3>How to Use on Kaomoji World</h3>
                    <p>
                        Head to the <strong>Symbol</strong> page. Like our other libraries, you can search for a symbol by name (e.g., "copyright", "arrow", "star"). A single click on any symbol copies it to your clipboard, making it easy to paste wherever you need it.
                    </p>

                    <h3>Where Can You Use Symbols?</h3>
                    <p>
                        Symbols are incredibly versatile. Use them to create unique usernames for games and social media, format text in documents, write mathematical equations, or add decorative touches to your messages and posts.
                    </p>
                </Article>

                <Article title="Create Your Own: An Intro to Our AI Kaomoji Generator">
                    <p>
                        Ever wanted a kaomoji that perfectly captures a unique idea but doesn't exist yet? With the power of generative AI, now you can create your own! Our AI tools use a powerful model (Gemini) to understand your descriptions and craft entirely new kaomoji from scratch.
                    </p>
                    
                    <h3>The Technology Behind It</h3>
                    <p>
                        Our generator is powered by Google's Gemini model. We've trained this AI to understand the structure, components, and emotional meaning of kaomoji. When you provide a text prompt, it doesn't just search a database; it assembles characters in a creative way to build a new kaomoji that matches your description.
                    </p>

                    <h3>Our AI Tools: Two Ways to Create</h3>
                    <p>
                        We offer two fantastic AI features on our site:
                    </p>
                    <ol>
                        <li><strong>The AI Generator:</strong> Located on the right sidebar of the homepage, this tool lets you generate a kaomoji from any description. Simply type what you want to see (e.g., "a grumpy librarian" or "a dancing robot") into the input box and click <strong>"Generate"</strong>. The AI will create a brand new kaomoji just for you.</li>
                        <li><strong>AI Variations:</strong> When you click on any existing kaomoji to view its detail page, you'll see a button that says <strong>"Generate with AI"</strong>. Clicking this will prompt the AI to create several creative variations based on that specific kaomoji's style, giving you fresh alternatives.</li>
                    </ol>

                    <h3>Where Can You Use Your AI Creations?</h3>
                    <p>
                        Anywhere you would use a regular kaomoji! The best part is that you'll be using a completely unique emoticon that you brought to life. Share your creations with friends on Discord, Twitter, or in your text messages to show off your creativity.
                    </p>
                </Article>
            </div>
        </div>
    );
};
