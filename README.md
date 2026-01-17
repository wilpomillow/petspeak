# pet_speak

Single-page Next.js app for translating English into cosy "pet-sound" speak with deterministic rules and built-in audio (Web Speech API).

## Tech
- Next.js 16.1.2 (App Router)
- React 19
- Tailwind CSS
- Framer Motion

## Run
```bash
npm i
npm run dev
```

## Notes on React Bits usage
This project includes locally-implemented components inspired by React Bits patterns:
- Aurora-like animated background
- Blur-to-sharp text reveal

If you prefer to install official React Bits components into this repo, the React Bits project supports shadcn/jsrepo-based installs (see reactbits.dev / their GitHub README). You can swap `src/components/AuroraBackground.tsx` and `src/components/BlurRevealText.tsx` accordingly.

## Security hygiene
After install, you can run:
```bash
npm audit
npm audit fix
```
