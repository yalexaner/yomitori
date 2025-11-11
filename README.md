# Yomitori (読みとり) - Japanese Flashcard Generator

A desktop application for creating Anki flashcards from Japanese images using AI-powered OCR.

## Features

- 📸 **Image Upload**: Upload images containing Japanese text
- 🤖 **AI-Powered OCR**: Automatic text extraction using Google Gemini
- 🔊 **Audio Generation**: Automatic pronunciation with Google Cloud TTS
- 📝 **Multiple Card Types**: Recognition, Recall, and Production cards
- 📚 **Local Database**: SQLite database for offline functionality
- 📤 **Anki Export**: Direct CSV export compatible with Anki

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite + Tailwind CSS
- **Desktop**: Electron 28
- **Backend**: Express.js + Node.js
- **Database**: SQLite + Prisma ORM
- **AI**: Vercel AI SDK + Google Gemini + Google Cloud TTS

## Prerequisites

- Node.js 20+
- pnpm 8+
- Google Gemini API key
- Google Cloud account with Text-to-Speech API enabled

## Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd yomitori
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   Then edit `.env` and add your API keys:
   - `GOOGLE_GENERATIVE_AI_API_KEY`: Your Google Gemini API key
   - `GOOGLE_APPLICATION_CREDENTIALS`: Path to your Google Cloud credentials JSON

4. **Initialize the database**
   ```bash
   pnpm prisma:generate
   pnpm prisma:migrate
   ```

5. **Start development servers**
   ```bash
   # Terminal 1: Start Vite dev server
   pnpm dev

   # Terminal 2: Start Express backend
   pnpm server

   # Terminal 3: Start Electron
   pnpm electron:dev

   # Or run all at once:
   pnpm dev:all
   ```

## Development Scripts

```bash
# Frontend development
pnpm dev                 # Start Vite dev server
pnpm build               # Build frontend + Electron

# Backend development
pnpm server              # Start Express server (watch mode)
pnpm server:build        # Build server

# Electron
pnpm electron:dev        # Start Electron in dev mode
pnpm electron:build      # Build Electron app for current platform
pnpm electron:build:win  # Build for Windows
pnpm electron:build:mac  # Build for macOS

# Database
pnpm prisma:generate     # Generate Prisma Client
pnpm prisma:migrate      # Run database migrations
pnpm prisma:studio       # Open Prisma Studio (DB GUI)

# Code Quality
pnpm lint                # Run ESLint
pnpm format              # Format code with Prettier
pnpm type-check          # TypeScript type checking
```

## Project Structure

```
yomitori/
├── electron/          # Electron main process
├── src/               # React frontend
│   ├── components/    # React components
│   ├── pages/         # Page components
│   ├── hooks/         # Custom hooks
│   ├── services/      # API services
│   └── styles/        # CSS files
├── server/            # Express backend
│   ├── routes/        # API routes
│   ├── controllers/   # Route controllers
│   ├── services/      # Business logic
│   └── middleware/    # Express middleware
├── prisma/            # Database schema & migrations
├── data/              # Runtime data (gitignored)
│   ├── flashcards.db  # SQLite database
│   ├── uploads/       # Uploaded images
│   ├── audio/         # Generated audio files
│   └── exports/       # Temporary exports
└── docs/              # Documentation
```

## Development Phases

This project is being built in phases:

- ✅ **Phase 1**: Project Setup (COMPLETED)
- ⏳ **Phase 2**: Database & Core Backend (NEXT)
- ⏳ **Phase 3**: AI Integration
- ⏳ **Phase 4**: Card Generation Logic
- ⏳ **Phase 5**: Audio Generation
- ⏳ **Phase 6**: Frontend - Upload & Processing
- ⏳ **Phase 7**: Frontend - Library & Management
- ⏳ **Phase 8**: Export System
- ⏳ **Phase 9**: Polish & Testing
- ⏳ **Phase 10**: Distribution

See [docs/todo.md](docs/todo.md) for detailed task breakdown.

## API Endpoints

### Health Check
- `GET /api/health` - Check if API is running

More endpoints will be added in Phase 2.

## Contributing

See [docs/spec.md](docs/spec.md) for the complete technical specification.

## License

MIT

## Author

Built with ❤️ for Japanese language learners
