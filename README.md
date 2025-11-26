<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1MH3LQIcAL47-d52cZ-JHupY0x_Ubh9bl

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `VITE_OPENAI_API_KEY` (or `OPENAI_API_KEY`) in [.env.local](.env.local) to your OpenAI API key.  
   - Optional: override the default model by setting `VITE_OPENAI_MODEL` (defaults to `gpt-4o-mini`).
3. Run the app:
   `npm run dev`
4. (Optional) Regenerate the sitemap before deploying:
   `npm run generate:sitemap`

### Deploying to Pages or other hosts

- Add an environment variable named `VITE_OPENAI_API_KEY` (or `OPENAI_API_KEY`) in your hosting provider's dashboard so the build step can inject the key.  
- Optionally expose `VITE_OPENAI_MODEL` if you want to use a different OpenAI model.  
- Existing `VITE_GEMINI_API_KEY` values are ignored unless the OpenAI variables are missing, so you can keep older configs as a fallback.
