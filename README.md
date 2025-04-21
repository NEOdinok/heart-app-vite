❤️ Heart Rate App
A simple heart rate visualizer built with:

⚡ Vite

⚛️ React 19

🧩 TypeScript

🎨 ShadCN UI (Radix + TailwindCSS)

🛡 Mock Service Worker (MSW)

📦 pnpm for package management

🚀 Getting Started

1. Install dependencies
   bash
   Copy
   Edit
   pnpm install
2. Run the app locally
   bash
   Copy
   Edit
   pnpm dev
   The app will be available at http://localhost:5173.

📦 Scripts

Command Description
pnpm dev Start the development server
pnpm build Build the app for production
pnpm preview Preview the production build
pnpm lint Run ESLint to check code style
🛠 Tech Stack
React 19 with Functional Components

TypeScript for type safety

Vite for fast development experience

TailwindCSS and ShadCN UI for styling

Mock Service Worker (MSW) for WebSocket mocking

pnpm as the package manager

📂 Project Structure
bash
Copy
Edit
src/
├── components/ # UI components
├── hooks/ # Custom hooks (e.g., useWebSocket)
├── lib/ # Global constants and utility functions
├── mocks/ # MSW handlers and browser setup
├── assets/ # Static assets (icons, images)
└── types/ # TypeScript types
📜 License
This project is for learning and demo purposes.
Feel free to fork and customize!

✨ Notes
Uses WebSocket mock server powered by MSW.

All heart rate values are clamped between 26 BPM and 250 BPM.

Heart color changes based on heart rate thresholds.
