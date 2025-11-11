# Japanese Flashcard Generator - Technical Specification

**Version:** 1.0  
**Date:** November 11, 2025  
**Project Type:** Desktop Application (Electron + React + TypeScript)

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Core Features](#core-features)
3. [User Flows](#user-flows)
4. [Technical Architecture](#technical-architecture)
5. [Database Schema](#database-schema)
6. [API Design](#api-design)
7. [AI/ML Integration](#aiml-integration)
8. [Component Architecture](#component-architecture)
9. [File Structure](#file-structure)
10. [External Dependencies](#external-dependencies)
11. [Development Phases](#development-phases)
12. [Future Enhancements](#future-enhancements)

---

## Project Overview

### Purpose
A desktop application that helps Japanese language learners create Anki flashcards efficiently by uploading images containing Japanese text, automatically recognizing the text using AI, and generating properly formatted CSV files for import into Anki with audio pronunciation.

### Target Users
- Japanese language learners at any level
- Students using Anki for spaced repetition
- Users who prefer visual learning with images
- People learning hiragana, katakana, and kanji

### Key Value Propositions
1. **Automated OCR**: Use AI to extract Japanese text from images automatically
2. **Multiple Card Types**: Generate multiple flashcard types per word for comprehensive learning
3. **Audio Pronunciation**: Automatic text-to-speech generation for proper pronunciation
4. **Anki Integration**: Direct CSV export compatible with Anki's import system
5. **Local-First**: Desktop app with local database, works offline after audio generation

---

## Core Features

### MVP (Minimum Viable Product)

#### 1. Image Upload & Management
- **Multiple Image Upload**: Users can upload multiple images at once
- **Supported Formats**: PNG, JPG, JPEG, WEBP
- **Preview**: Display uploaded images in a gallery view
- **Delete**: Remove images before processing

#### 2. AI-Powered Text Recognition
- **Automatic OCR**: Extract Japanese text from images using Google Gemini 1.5 Flash
- **Mixed Script Support**: Recognize hiragana, katakana, and kanji in the same image
- **Structured Output**: Extract not just text but metadata (word type, context)
- **Manual Entry**: Option to manually add words without image upload

#### 3. Flashcard Generation
For each vocabulary word, generate multiple card types:

**Card Type 1: Recognition (Japanese → English)**
- Front: Japanese word (kanji/kana as written)
- Back: English translation
- Audio: Plays after revealing answer

**Card Type 2: Recall (English → Japanese)**
- Front: English meaning
- Back: Japanese word
- Audio: Plays after revealing answer

**Card Type 3: Production (English → Type Japanese)**
- Front: English meaning
- Back: User input field (in Anki)
- Shows correct answer with audio

For alphabet learning (individual hiragana/katakana/kanji):

**Card Type 1: Recognition (Character → Sound)**
- Front: Japanese character (あ)
- Back: Romanization ("a")
- Audio: Plays after reveal

**Card Type 2: Recall (Sound → Character)**
- Front: Romanization ("a")
- Back: Japanese character (あ)
- Audio: Plays after reveal

**Card Type 3: Production (Sound → Type Character)**
- Front: Romanization ("a")
- Back: User input field
- Shows correct answer with audio

#### 4. Flashcard Data Management
- **Edit Before Save**: Review and edit OCR results
- **Field Customization**: 
  - Japanese word (kanji/kana)
  - Kana reading (furigana)
  - Romaji (optional)
  - English translation
  - Word type (noun, verb, adjective, etc.)
- **Database Storage**: All flashcards saved locally in SQLite
- **Delete/Edit**: Modify or remove flashcards after creation

#### 5. Audio Generation
- **Text-to-Speech**: Generate pronunciation audio using Google Cloud TTS
- **Japanese Voice**: Native Japanese voice models
- **Local Storage**: Audio files stored with flashcard data
- **File Format**: MP3 for Anki compatibility

#### 6. Preview & Export
- **Preview Mode**: Review all flashcards before export
- **Filtering**: Filter by word type, date created, or custom tags
- **CSV Export**: Generate Anki-compatible CSV file
- **Multi-File Export**: Option to export by card type or all together
- **Audio Export**: Package audio files with CSV

### Future Features (Post-MVP)

#### 1. Enhanced Organization
- **Tags/Categories**: Custom tagging system
- **Decks**: Organize flashcards into separate decks
- **Search**: Full-text search across all flashcards
- **Sorting**: Sort by date, difficulty, word type

#### 2. Learning Features
- **Example Sentences**: Add context sentences for vocabulary
- **Difficulty Levels**: Mark words as beginner/intermediate/advanced
- **Progress Tracking**: Track which words have been exported

#### 3. UI/UX Enhancements
- **Drag & Drop**: Drag images directly into the app
- **Keyboard Shortcuts**: Power user shortcuts for all actions
- **Dark Mode**: Dark theme support
- **Undo/Redo**: Full undo/redo functionality

#### 4. Advanced Features
- **Batch Operations**: Delete/edit multiple cards at once
- **Import Instructions**: Built-in guide for Anki import
- **Cloud Sync**: Optional cloud backup (distant future)
- **Alternative TTS**: Option to use ElevenLabs for higher quality voices

---

## User Flows

### Flow 1: Create Flashcards from Images

```
1. User opens application
2. User clicks "Upload Images" or "New Flashcard Set"
3. User selects one or multiple image files
4. Images display in gallery view
5. User clicks "Process Images"
6. AI analyzes images and extracts Japanese text
7. Loading indicator shows progress
8. Results screen displays:
   - Recognized text for each image
   - Suggested translations
   - Editable fields for each word
9. User reviews and edits as needed
10. User clicks "Generate Flashcards"
11. System generates multiple card types per word
12. System generates audio pronunciation
13. Flashcards saved to database
14. Success message displayed
15. User navigates to "Library" to review
```

### Flow 2: Manual Flashcard Creation

```
1. User clicks "Add Manual Entry"
2. Form displays with fields:
   - Japanese word
   - Kana reading
   - Romaji (optional)
   - English translation
   - Word type
   - Example sentence (future)
3. User fills in fields
4. User clicks "Generate Audio"
5. System generates pronunciation
6. User previews audio
7. User clicks "Save"
8. System generates card types
9. Flashcard saved to database
```

### Flow 3: Export to Anki

```
1. User navigates to "Library" view
2. User sees all created flashcards
3. User optionally filters/searches
4. User selects flashcards to export (or "Export All")
5. User clicks "Export to CSV"
6. Export dialog shows:
   - Export format options
   - Include/exclude audio
   - Card types to include
7. User configures export settings
8. User clicks "Export"
9. System generates CSV file(s)
10. System packages audio files
11. Save dialog opens
12. User chooses save location
13. Export completes
14. Success message with instructions
```

### Flow 4: Edit Existing Flashcard

```
1. User navigates to "Library"
2. User finds flashcard to edit
3. User clicks flashcard or "Edit" button
4. Edit modal/screen opens
5. User modifies fields
6. User clicks "Regenerate Audio" if pronunciation changed
7. User clicks "Save Changes"
8. System updates database
9. System regenerates card types if needed
10. Success message displayed
```

---

## Technical Architecture

### Architecture Pattern
**Client-Server Architecture with Local Backend**

```
┌─────────────────────────────────────────────┐
│           Electron Main Process             │
│  - Window Management                        │
│  - File System Access                       │
│  - IPC Communication                        │
└────────────┬────────────────────────────────┘
             │
             ├─────────────────┬──────────────────────┐
             │                 │                      │
┌────────────▼─────────┐  ┌───▼──────────┐  ┌────────▼────────┐
│  React Frontend      │  │ Express API  │  │  SQLite + Prisma│
│  (Renderer Process)  │  │   Server     │  │    Database     │
│  - UI Components     │  │  - Routes    │  │  - Data Layer   │
│  - State Management  │  │  - Business  │  │                 │
│  - API Client        │  │    Logic     │  │                 │
└──────────────────────┘  └──────┬───────┘  └─────────────────┘
                                 │
                    ┌────────────▼──────────────┐
                    │   External Services       │
                    │  - Vercel AI SDK          │
                    │  - Google Gemini API      │
                    │  - Google Cloud TTS API   │
                    └───────────────────────────┘
```

### Technology Stack

#### Frontend
- **Framework**: React 18.3+
- **Language**: TypeScript 5.0+
- **Build Tool**: Vite 5.0+
- **Styling**: Tailwind CSS 3.4+
- **Routing**: React Router 6.20+
- **State Management**: React Context API + useReducer (or Zustand if needed)
- **HTTP Client**: Axios or Fetch API
- **Form Handling**: React Hook Form + Zod validation

#### Desktop
- **Framework**: Electron 28+
- **Process**: Main + Renderer
- **IPC**: electron-ipc for frontend-backend communication

#### Backend
- **Runtime**: Node.js 20+
- **Framework**: Express.js 4.18+
- **Language**: TypeScript 5.0+
- **API Pattern**: RESTful API
- **Middleware**: 
  - cors (for dev)
  - express.json() for JSON parsing
  - multer for file uploads
  - helmet for security

#### Database
- **Database**: SQLite 3
- **ORM**: Prisma 5.0+
- **Migrations**: Prisma Migrate
- **Type Safety**: Full TypeScript integration

#### AI/ML Services
- **AI SDK**: Vercel AI SDK v5
- **OCR/Text Recognition**: Google Gemini 1.5 Flash via @ai-sdk/google
- **Schema Validation**: Zod 3.22+
- **Text-to-Speech**: Google Cloud Text-to-Speech API
- **Audio Format**: MP3 (Anki compatible)

#### Development Tools
- **IDE**: WebStorm (recommended) or VS Code
- **Package Manager**: pnpm 8+
- **Linting**: ESLint 8+ with TypeScript rules
- **Formatting**: Prettier 3+
- **Type Checking**: TypeScript strict mode
- **Testing**: Vitest (unit), Playwright (e2e) - future

---

## Database Schema

### Prisma Schema Definition

```prisma
// schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = "file:./flashcards.db"
}

// Main flashcard/vocabulary entry
model Flashcard {
  id              String   @id @default(cuid())
  
  // Japanese text fields
  wordKanji       String   // 食べる
  wordKana        String   // たべる
  wordRomaji      String?  // taberu (optional)
  
  // Translation
  meaningEnglish  String   // "to eat"
  
  // Metadata
  wordType        String   // "verb", "noun", "adjective", "particle", "character"
  level           String?  // "beginner", "intermediate", "advanced"
  
  // Audio
  audioFilePath   String?  // path to MP3 file
  audioGenerated  Boolean  @default(false)
  
  // Context (future)
  exampleSentence String?
  notes           String?
  
  // Relations
  sourceImages    FlashcardImage[]
  tags            FlashcardTag[]
  generatedCards  GeneratedCard[]
  
  // Timestamps
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  
  @@index([wordType])
  @@index([createdAt])
}

// Generated card types from a flashcard
model GeneratedCard {
  id            String   @id @default(cuid())
  flashcardId   String
  flashcard     Flashcard @relation(fields: [flashcardId], references: [id], onDelete: Cascade)
  
  // Card type: "recognition_jp_en", "recall_en_jp", "production_en_jp"
  // For alphabet: "recognition_char_sound", "recall_sound_char", "production_sound_char"
  cardType      String
  
  // Front/Back content (pre-rendered for CSV export)
  frontContent  String
  backContent   String
  
  // Whether this card was exported
  exported      Boolean  @default(false)
  exportedAt    DateTime?
  
  createdAt     DateTime @default(now())
  
  @@index([flashcardId])
  @@index([cardType])
}

// Source images that were processed
model SourceImage {
  id              String   @id @default(cuid())
  filename        String
  originalPath    String
  storedPath      String   // where we saved it locally
  mimeType        String
  fileSize        Int      // bytes
  
  // Processing status
  processed       Boolean  @default(false)
  processingError String?
  
  // Relations
  flashcards      FlashcardImage[]
  
  createdAt       DateTime @default(now())
  
  @@index([processed])
}

// Many-to-many: Flashcards can come from multiple images
model FlashcardImage {
  flashcardId String
  imageId     String
  flashcard   Flashcard   @relation(fields: [flashcardId], references: [id], onDelete: Cascade)
  image       SourceImage @relation(fields: [imageId], references: [id], onDelete: Cascade)
  
  @@id([flashcardId, imageId])
}

// Tags for organization (future)
model Tag {
  id          String   @id @default(cuid())
  name        String   @unique
  color       String?  // hex color for UI
  
  flashcards  FlashcardTag[]
  
  createdAt   DateTime @default(now())
}

// Many-to-many: Flashcards can have multiple tags
model FlashcardTag {
  flashcardId String
  tagId       String
  flashcard   Flashcard @relation(fields: [flashcardId], references: [id], onDelete: Cascade)
  tag         Tag       @relation(fields: [tagId], references: [id], onDelete: Cascade)
  
  @@id([flashcardId, tagId])
}

// Export history (future)
model ExportHistory {
  id              String   @id @default(cuid())
  filename        String
  exportPath      String
  cardCount       Int
  includeAudio    Boolean
  
  createdAt       DateTime @default(now())
}

// User settings (future)
model Settings {
  id                  Int      @id @default(1)
  
  // TTS preferences
  ttsProvider         String   @default("google") // "google", "elevenlabs"
  ttsVoice            String   @default("ja-JP-Standard-A")
  ttsSpeakingRate     Float    @default(1.0)
  
  // Export preferences
  defaultExportFormat String   @default("multi_csv") // "single_csv", "multi_csv"
  includeAudioDefault Boolean  @default(true)
  
  // UI preferences
  theme               String   @default("light") // "light", "dark"
  
  updatedAt           DateTime @updatedAt
}
```

### Database Relationships Diagram

```
┌─────────────┐       ┌──────────────┐       ┌─────────┐
│ SourceImage │◄──────┤FlashcardImage├──────►│Flashcard│
└─────────────┘       └──────────────┘       └────┬────┘
                                                   │
                      ┌──────────────┐            │
                      │FlashcardTag  │◄───────────┤
                      └──────┬───────┘            │
                             │                    │
                      ┌──────▼───┐                │
                      │   Tag    │                │
                      └──────────┘                │
                                                  │
                                          ┌───────▼──────┐
                                          │GeneratedCard │
                                          └──────────────┘
```

---

## API Design

### Base URL
```
http://localhost:3000/api
```

### Endpoints

#### 1. Image Management

**POST /api/images/upload**
- **Description**: Upload one or multiple images
- **Content-Type**: multipart/form-data
- **Request Body**:
  ```typescript
  files: File[] // images
  ```
- **Response**: 200 OK
  ```typescript
  {
    success: true,
    images: [
      {
        id: string,
        filename: string,
        storedPath: string,
        mimeType: string,
        fileSize: number,
        createdAt: string
      }
    ]
  }
  ```

**GET /api/images**
- **Description**: Get all uploaded images
- **Query Params**: 
  - `processed`: boolean (optional) - filter by processing status
- **Response**: 200 OK
  ```typescript
  {
    images: [
      {
        id: string,
        filename: string,
        processed: boolean,
        createdAt: string
      }
    ]
  }
  ```

**DELETE /api/images/:id**
- **Description**: Delete an image
- **Response**: 200 OK
  ```typescript
  {
    success: true,
    message: "Image deleted successfully"
  }
  ```

#### 2. Text Recognition / Processing

**POST /api/process/recognize**
- **Description**: Process images with AI to extract Japanese text
- **Request Body**:
  ```typescript
  {
    imageIds: string[] // IDs of images to process
  }
  ```
- **Response**: 200 OK
  ```typescript
  {
    success: true,
    results: [
      {
        imageId: string,
        words: [
          {
            japanese: string,      // 食べる
            kana: string,          // たべる
            romaji: string,        // taberu
            english: string,       // "to eat"
            wordType: string,      // "verb"
            confidence: number     // 0.95
          }
        ]
      }
    ]
  }
  ```

**POST /api/process/analyze-text**
- **Description**: Analyze manually entered text (without image)
- **Request Body**:
  ```typescript
  {
    text: string // Japanese text to analyze
  }
  ```
- **Response**: 200 OK
  ```typescript
  {
    japanese: string,
    kana: string,
    romaji: string,
    suggestions: {
      english: string[],
      wordType: string[]
    }
  }
  ```

#### 3. Flashcard Management

**POST /api/flashcards**
- **Description**: Create a new flashcard
- **Request Body**:
  ```typescript
  {
    wordKanji: string,
    wordKana: string,
    wordRomaji?: string,
    meaningEnglish: string,
    wordType: string,
    level?: string,
    exampleSentence?: string,
    notes?: string,
    sourceImageIds?: string[]
  }
  ```
- **Response**: 201 Created
  ```typescript
  {
    success: true,
    flashcard: {
      id: string,
      // ... all flashcard fields
      generatedCards: [
        {
          id: string,
          cardType: string,
          frontContent: string,
          backContent: string
        }
      ]
    }
  }
  ```

**GET /api/flashcards**
- **Description**: Get all flashcards with filters
- **Query Params**:
  - `wordType`: string (optional)
  - `level`: string (optional)
  - `search`: string (optional)
  - `limit`: number (default: 50)
  - `offset`: number (default: 0)
- **Response**: 200 OK
  ```typescript
  {
    flashcards: [...],
    total: number,
    limit: number,
    offset: number
  }
  ```

**GET /api/flashcards/:id**
- **Description**: Get a single flashcard with all details
- **Response**: 200 OK
  ```typescript
  {
    flashcard: {
      id: string,
      // ... all fields
      generatedCards: [...],
      sourceImages: [...],
      tags: [...]
    }
  }
  ```

**PUT /api/flashcards/:id**
- **Description**: Update a flashcard
- **Request Body**: Same as POST (partial updates allowed)
- **Response**: 200 OK
  ```typescript
  {
    success: true,
    flashcard: {...}
  }
  ```

**DELETE /api/flashcards/:id**
- **Description**: Delete a flashcard (cascade deletes generated cards)
- **Response**: 200 OK
  ```typescript
  {
    success: true,
    message: "Flashcard deleted successfully"
  }
  ```

#### 4. Audio Generation

**POST /api/audio/generate**
- **Description**: Generate audio for a flashcard
- **Request Body**:
  ```typescript
  {
    flashcardId: string,
    text: string,          // text to speak (usually wordKana)
    language: string,      // "ja-JP"
    voiceName?: string     // specific voice model
  }
  ```
- **Response**: 200 OK
  ```typescript
  {
    success: true,
    audioFilePath: string,
    duration: number // seconds
  }
  ```

**POST /api/audio/batch-generate**
- **Description**: Generate audio for multiple flashcards
- **Request Body**:
  ```typescript
  {
    flashcardIds: string[]
  }
  ```
- **Response**: 200 OK
  ```typescript
  {
    success: true,
    results: [
      {
        flashcardId: string,
        audioFilePath: string,
        success: boolean,
        error?: string
      }
    ]
  }
  ```

#### 5. Export

**POST /api/export/csv**
- **Description**: Export flashcards to CSV
- **Request Body**:
  ```typescript
  {
    flashcardIds?: string[], // if not provided, export all
    includeAudio: boolean,
    cardTypes?: string[],    // which card types to include
    format: "single" | "multi" // single CSV or multiple CSVs per card type
  }
  ```
- **Response**: 200 OK (file download)
  - Content-Type: application/zip (if audio included) or text/csv
  - Contains CSV file(s) and audio folder

**GET /api/export/history**
- **Description**: Get export history
- **Response**: 200 OK
  ```typescript
  {
    exports: [
      {
        id: string,
        filename: string,
        cardCount: number,
        createdAt: string
      }
    ]
  }
  ```

#### 6. Stats & Analytics (Future)

**GET /api/stats**
- **Description**: Get statistics
- **Response**: 200 OK
  ```typescript
  {
    totalFlashcards: number,
    totalImages: number,
    cardsByType: {
      verb: number,
      noun: number,
      // ...
    },
    recentActivity: [...]
  }
  ```

### Error Response Format

All errors follow this format:
```typescript
{
  success: false,
  error: {
    code: string,        // "VALIDATION_ERROR", "NOT_FOUND", etc.
    message: string,     // Human-readable message
    details?: any        // Additional error details
  }
}
```

### Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `404` - Not Found
- `500` - Internal Server Error

---

## AI/ML Integration

### Vercel AI SDK v5 Implementation

#### 1. Text Recognition from Images

```typescript
// services/ocr.service.ts
import { google } from '@ai-sdk/google';
import { generateObject } from 'ai';
import { z } from 'zod';

const JapaneseWordSchema = z.object({
  words: z.array(
    z.object({
      japanese: z.string().describe('The Japanese word as it appears (kanji/kana)'),
      kana: z.string().describe('The reading in hiragana or katakana'),
      romaji: z.string().describe('Romanized pronunciation'),
      english: z.string().describe('English translation'),
      wordType: z.enum(['verb', 'noun', 'adjective', 'adverb', 'particle', 'character'])
        .describe('Type of word'),
      context: z.string().optional().describe('Context or usage note'),
    })
  ),
});

export async function recognizeJapaneseText(imageBuffer: Buffer) {
  const { object } = await generateObject({
    model: google('gemini-1.5-flash'),
    schema: JapaneseWordSchema,
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: `Analyze this image and extract all Japanese text. For each word or character:
            1. Provide the original Japanese (kanji/kana as written)
            2. Provide the kana reading
            3. Provide romaji pronunciation
            4. Provide English translation
            5. Identify the word type (verb, noun, adjective, adverb, particle, or character for individual hiragana/katakana/kanji)
            
            Return all words found in the image.`
          },
          {
            type: 'image',
            image: imageBuffer,
          }
        ]
      }
    ],
  });

  return object.words;
}
```

#### 2. Text Analysis (Manual Entry)

```typescript
// services/text-analysis.service.ts
import { google } from '@ai-sdk/google';
import { generateObject } from 'ai';
import { z } from 'zod';

const TextAnalysisSchema = z.object({
  japanese: z.string(),
  kana: z.string(),
  romaji: z.string(),
  englishSuggestions: z.array(z.string()).describe('Possible English translations'),
  wordType: z.enum(['verb', 'noun', 'adjective', 'adverb', 'particle', 'character']),
  level: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
});

export async function analyzeJapaneseText(text: string) {
  const { object } = await generateObject({
    model: google('gemini-1.5-flash'),
    schema: TextAnalysisSchema,
    messages: [
      {
        role: 'user',
        content: `Analyze this Japanese text: "${text}"
        
        Provide:
        1. The text as-is
        2. Kana reading (if kanji is present)
        3. Romaji pronunciation
        4. Multiple possible English translations
        5. Word type
        6. Difficulty level if applicable`
      }
    ],
  });

  return object;
}
```

### Google Cloud Text-to-Speech Integration

```typescript
// services/tts.service.ts
import textToSpeech from '@google-cloud/text-to-speech';
import fs from 'fs/promises';
import path from 'path';

const client = new textToSpeech.TextToSpeechClient({
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
});

export async function generateAudio(
  text: string,
  flashcardId: string,
  outputDir: string
): Promise<string> {
  const request = {
    input: { text },
    voice: {
      languageCode: 'ja-JP',
      name: 'ja-JP-Standard-A', // Can be made configurable
      ssmlGender: 'FEMALE' as const,
    },
    audioConfig: {
      audioEncoding: 'MP3' as const,
      speakingRate: 1.0,
      pitch: 0.0,
    },
  };

  const [response] = await client.synthesizeSpeech(request);
  
  if (!response.audioContent) {
    throw new Error('No audio content received');
  }

  const filename = `${flashcardId}.mp3`;
  const filepath = path.join(outputDir, filename);
  
  await fs.writeFile(filepath, response.audioContent, 'binary');
  
  return filepath;
}

export async function batchGenerateAudio(
  flashcards: Array<{ id: string; text: string }>,
  outputDir: string
): Promise<Array<{ id: string; path: string; success: boolean; error?: string }>> {
  const results = await Promise.allSettled(
    flashcards.map(async (fc) => {
      const path = await generateAudio(fc.text, fc.id, outputDir);
      return { id: fc.id, path, success: true };
    })
  );

  return results.map((result, index) => {
    if (result.status === 'fulfilled') {
      return result.value;
    } else {
      return {
        id: flashcards[index].id,
        path: '',
        success: false,
        error: result.reason.message,
      };
    }
  });
}
```

### API Key Management

Environment variables required:

```bash
# .env
GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_api_key_here
GOOGLE_APPLICATION_CREDENTIALS=path/to/gcloud-credentials.json
```

---

## Component Architecture

### Frontend Component Tree

```
App
├── Router
│   ├── Layout
│   │   ├── Header
│   │   │   ├── Logo
│   │   │   ├── Navigation
│   │   │   └── UserMenu (future)
│   │   ├── Sidebar (optional)
│   │   └── Footer
│   │
│   └── Routes
│       ├── HomePage
│       │   ├── WelcomeSection
│       │   ├── QuickActions
│       │   └── RecentActivity
│       │
│       ├── UploadPage
│       │   ├── ImageUploader
│       │   │   ├── DropZone
│       │   │   ├── FileInput
│       │   │   └── ImagePreview
│       │   ├── ImageGallery
│       │   │   └── ImageCard (multiple)
│       │   └── ProcessButton
│       │
│       ├── RecognitionResultsPage
│       │   ├── ResultsHeader
│       │   ├── WordList
│       │   │   └── WordCard (multiple)
│       │   │       ├── JapaneseText
│       │   │       ├── ReadingText
│       │   │       ├── EnglishText
│       │   │       ├── EditButton
│       │   │       └── DeleteButton
│       │   └── ActionButtons
│       │       ├── GenerateFlashcardsButton
│       │       └── CancelButton
│       │
│       ├── EditWordModal
│       │   ├── ModalHeader
│       │   ├── WordForm
│       │   │   ├── JapaneseInput
│       │   │   ├── KanaInput
│       │   │   ├── RomajiInput
│       │   │   ├── EnglishInput
│       │   │   ├── WordTypeSelect
│       │   │   └── NotesTextarea
│       │   └── ModalActions
│       │       ├── SaveButton
│       │       ├── PreviewButton
│       │       └── CancelButton
│       │
│       ├── LibraryPage
│       │   ├── LibraryHeader
│       │   │   ├── SearchBar
│       │   │   ├── FilterDropdown
│       │   │   └── SortDropdown
│       │   ├── FlashcardGrid
│       │   │   └── FlashcardCard (multiple)
│       │   │       ├── CardPreview
│       │   │       ├── CardInfo
│       │   │       ├── AudioButton
│       │   │       └── ActionMenu
│       │   │           ├── EditOption
│       │   │           ├── DeleteOption
│       │   │           └── ExportOption
│       │   ├── Pagination
│       │   └── BulkActions (future)
│       │
│       ├── ExportPage
│       │   ├── ExportHeader
│       │   ├── FlashcardSelection
│       │   │   ├── SelectAllCheckbox
│       │   │   └── FlashcardCheckboxList
│       │   ├── ExportOptions
│       │   │   ├── FormatSelector
│       │   │   ├── CardTypeSelector
│       │   │   ├── IncludeAudioCheckbox
│       │   │   └── FilenameInput
│       │   ├── PreviewSection
│       │   └── ExportButton
│       │
│       ├── ManualEntryPage
│       │   ├── EntryForm
│       │   │   └── (Same as WordForm in EditWordModal)
│       │   ├── AudioGeneration
│       │   │   ├── GenerateButton
│       │   │   └── AudioPlayer
│       │   └── SubmitButton
│       │
│       └── SettingsPage (future)
│           ├── TTSSettings
│           ├── ExportSettings
│           ├── UISettings
│           └── AboutSection
│
└── Shared Components
    ├── Button
    ├── Input
    ├── Select
    ├── Checkbox
    ├── Modal
    ├── LoadingSpinner
    ├── Toast/Notification
    ├── ConfirmDialog
    └── AudioPlayer
```

### Key React Hooks & Context

```typescript
// Context for global state
interface AppContextType {
  flashcards: Flashcard[];
  images: SourceImage[];
  loading: boolean;
  error: string | null;
  refreshFlashcards: () => Promise<void>;
  refreshImages: () => Promise<void>;
}

// Custom hooks
useFlashcards()   // Fetch and manage flashcards
useImages()       // Fetch and manage images
useAudio()        // Play audio files
useExport()       // Handle export logic
useOCR()          // Handle image processing
```

---

## File Structure

```
japanese-flashcard-app/
├── electron/
│   ├── main.ts              # Electron main process
│   ├── preload.ts           # Preload script for IPC
│   └── electron-builder.json
│
├── src/                     # React frontend
│   ├── main.tsx            # Entry point
│   ├── App.tsx             # Root component
│   ├── vite-env.d.ts
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── Footer.tsx
│   │   │
│   │   ├── upload/
│   │   │   ├── ImageUploader.tsx
│   │   │   ├── ImageGallery.tsx
│   │   │   └── ImageCard.tsx
│   │   │
│   │   ├── flashcards/
│   │   │   ├── FlashcardCard.tsx
│   │   │   ├── FlashcardGrid.tsx
│   │   │   ├── FlashcardForm.tsx
│   │   │   └── CardPreview.tsx
│   │   │
│   │   ├── recognition/
│   │   │   ├── WordList.tsx
│   │   │   └── WordCard.tsx
│   │   │
│   │   ├── export/
│   │   │   ├── ExportOptions.tsx
│   │   │   └── FlashcardSelection.tsx
│   │   │
│   │   └── shared/
│   │       ├── Button.tsx
│   │       ├── Input.tsx
│   │       ├── Select.tsx
│   │       ├── Modal.tsx
│   │       ├── LoadingSpinner.tsx
│   │       ├── Toast.tsx
│   │       └── AudioPlayer.tsx
│   │
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── UploadPage.tsx
│   │   ├── RecognitionResultsPage.tsx
│   │   ├── LibraryPage.tsx
│   │   ├── ExportPage.tsx
│   │   ├── ManualEntryPage.tsx
│   │   └── SettingsPage.tsx
│   │
│   ├── hooks/
│   │   ├── useFlashcards.ts
│   │   ├── useImages.ts
│   │   ├── useAudio.ts
│   │   ├── useExport.ts
│   │   └── useOCR.ts
│   │
│   ├── context/
│   │   ├── AppContext.tsx
│   │   └── ThemeContext.tsx (future)
│   │
│   ├── services/
│   │   ├── api.ts           # API client
│   │   └── electron-ipc.ts  # Electron IPC helper
│   │
│   ├── types/
│   │   ├── flashcard.types.ts
│   │   ├── api.types.ts
│   │   └── index.ts
│   │
│   ├── utils/
│   │   ├── validation.ts
│   │   ├── formatting.ts
│   │   └── constants.ts
│   │
│   └── styles/
│       ├── globals.css
│       └── tailwind.config.js
│
├── server/                  # Express backend
│   ├── index.ts            # Server entry point
│   ├── app.ts              # Express app setup
│   │
│   ├── routes/
│   │   ├── images.routes.ts
│   │   ├── flashcards.routes.ts
│   │   ├── process.routes.ts
│   │   ├── audio.routes.ts
│   │   └── export.routes.ts
│   │
│   ├── controllers/
│   │   ├── images.controller.ts
│   │   ├── flashcards.controller.ts
│   │   ├── process.controller.ts
│   │   ├── audio.controller.ts
│   │   └── export.controller.ts
│   │
│   ├── services/
│   │   ├── ocr.service.ts
│   │   ├── tts.service.ts
│   │   ├── flashcard.service.ts
│   │   ├── card-generator.service.ts
│   │   └── export.service.ts
│   │
│   ├── middleware/
│   │   ├── error-handler.ts
│   │   ├── upload.middleware.ts
│   │   └── validation.middleware.ts
│   │
│   ├── utils/
│   │   ├── file-system.ts
│   │   ├── csv-generator.ts
│   │   └── logger.ts
│   │
│   └── types/
│       └── express.types.ts
│
├── prisma/
│   ├── schema.prisma
│   ├── migrations/
│   └── seed.ts (optional)
│
├── data/                   # Runtime data (gitignored)
│   ├── flashcards.db      # SQLite database
│   ├── uploads/           # Uploaded images
│   ├── audio/             # Generated audio files
│   └── exports/           # Temporary export files
│
├── public/
│   └── assets/
│
├── .env.example
├── .env
├── .gitignore
├── package.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── eslint.config.js
├── prettier.config.js
└── README.md
```

---

## External Dependencies

### Core Dependencies

```json
{
  "dependencies": {
    // Frontend
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "react-router-dom": "^6.20.0",
    "react-hook-form": "^7.48.0",
    
    // Electron
    "electron": "^28.0.0",
    "electron-is-dev": "^2.0.0",
    
    // Backend
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "helmet": "^7.1.0",
    "multer": "^1.4.5-lts.1",
    
    // Database
    "@prisma/client": "^5.7.0",
    
    // AI & ML
    "ai": "^5.0.0",
    "@ai-sdk/google": "^2.0.0",
    "@google-cloud/text-to-speech": "^5.0.0",
    "zod": "^3.22.4",
    
    // Utilities
    "axios": "^1.6.2",
    "archiver": "^6.0.1",
    "csv-writer": "^1.6.0",
    "dotenv": "^16.3.1"
  },
  "devDependencies": {
    // TypeScript
    "typescript": "^5.3.3",
    "@types/react": "^18.2.43",
    "@types/react-dom": "^18.2.17",
    "@types/node": "^20.10.4",
    "@types/express": "^4.17.21",
    "@types/multer": "^1.4.11",
    
    // Build Tools
    "vite": "^5.0.8",
    "@vitejs/plugin-react": "^4.2.1",
    "electron-builder": "^24.9.1",
    
    // Styling
    "tailwindcss": "^3.4.0",
    "postcss": "^8.4.32",
    "autoprefixer": "^10.4.16",
    
    // Linting & Formatting
    "eslint": "^8.55.0",
    "@typescript-eslint/eslint-plugin": "^6.14.0",
    "@typescript-eslint/parser": "^6.14.0",
    "prettier": "^3.1.1",
    
    // Database
    "prisma": "^5.7.0",
    
    // Testing (future)
    "vitest": "^1.0.4",
    "@testing-library/react": "^14.1.2",
    "playwright": "^1.40.1"
  }
}
```

---

## Development Phases

### Phase 1: Project Setup (Week 1)
**Goal**: Set up development environment and basic architecture

**Tasks**:
1. Initialize project with Vite + React + TypeScript
2. Set up Electron boilerplate
3. Configure Tailwind CSS
4. Set up Express server structure
5. Initialize Prisma with SQLite
6. Configure ESLint & Prettier
7. Set up environment variables
8. Create basic folder structure
9. Set up Git repository
10. Configure electron-builder

**Deliverable**: Electron app that opens with basic React UI and Express server running

---

### Phase 2: Database & Core Backend (Week 1-2)
**Goal**: Implement database schema and core API endpoints

**Tasks**:
1. Finalize Prisma schema
2. Run initial migration
3. Implement image upload API
4. Implement file storage system
5. Set up multer middleware
6. Create flashcard CRUD endpoints
7. Implement basic error handling
8. Test all endpoints with Postman/Thunder Client
9. Set up database seeding (optional)

**Deliverable**: Working API that can store images and flashcards

---

### Phase 3: AI Integration (Week 2-3)
**Goal**: Integrate Vercel AI SDK and Google Gemini

**Tasks**:
1. Set up Vercel AI SDK
2. Configure Google Gemini API credentials
3. Implement OCR service with Gemini
4. Create text analysis service
5. Implement Zod schemas for structured output
6. Create processing endpoints
7. Test OCR with sample images
8. Handle errors and edge cases
9. Add processing status tracking

**Deliverable**: Working OCR that extracts Japanese text from images

---

### Phase 4: Card Generation Logic (Week 3)
**Goal**: Implement flashcard generation from recognized text

**Tasks**:
1. Design card generation algorithm
2. Implement card type generation:
   - Recognition cards
   - Recall cards
   - Production cards
3. Create flashcard creation flow
4. Link generated cards to parent flashcard
5. Implement card preview logic
6. Test with various word types
7. Handle alphabet vs vocabulary differently

**Deliverable**: System that generates 3 card types per word

---

### Phase 5: Audio Generation (Week 4)
**Goal**: Implement TTS with Google Cloud

**Tasks**:
1. Set up Google Cloud TTS credentials
2. Implement TTS service
3. Create audio generation endpoint
4. Implement batch audio generation
5. Store audio files in data/audio/
6. Link audio to flashcards in database
7. Implement audio regeneration
8. Test audio quality
9. Handle TTS errors

**Deliverable**: System that generates Japanese pronunciation audio

---

### Phase 6: Frontend - Upload & Processing (Week 4-5)
**Goal**: Build image upload and processing UI

**Tasks**:
1. Create layout components (Header, Footer)
2. Implement HomePage with quick actions
3. Build ImageUploader component
4. Implement drag-and-drop (future)
5. Create ImageGallery view
6. Build ProcessButton with loading state
7. Create RecognitionResultsPage
8. Implement WordCard component
9. Build EditWordModal
10. Connect to backend APIs
11. Add error handling and notifications
12. Test user flow

**Deliverable**: Users can upload images and see recognized words

---

### Phase 7: Frontend - Library & Flashcard Management (Week 5-6)
**Goal**: Build flashcard library and management UI

**Tasks**:
1. Create LibraryPage layout
2. Implement FlashcardGrid component
3. Build FlashcardCard with preview
4. Implement search functionality
5. Add filters (word type, level)
6. Implement sorting options
7. Build edit functionality
8. Implement delete with confirmation
9. Add pagination
10. Create ManualEntryPage
11. Build flashcard creation form
12. Add audio playback
13. Test all CRUD operations

**Deliverable**: Users can view, search, edit, and manage flashcards

---

### Phase 8: Export System (Week 6-7)
**Goal**: Implement CSV export for Anki

**Tasks**:
1. Research Anki CSV format requirements
2. Design CSV structure for multiple card types
3. Implement CSV generator service
4. Create export endpoint
5. Implement audio packaging (ZIP)
6. Build ExportPage UI
7. Implement flashcard selection
8. Add export options (format, card types)
9. Create download functionality
10. Test CSV import in Anki
11. Add export history tracking
12. Write user instructions

**Deliverable**: Users can export flashcards to Anki-compatible CSV

---

### Phase 9: Polish & Testing (Week 7-8)
**Goal**: Bug fixes, UX improvements, testing

**Tasks**:
1. Comprehensive testing of all features
2. Fix bugs and edge cases
3. Improve error messages
4. Add loading states everywhere
5. Optimize performance
6. Improve UI/UX based on testing
7. Add keyboard shortcuts
8. Implement toast notifications
9. Add confirmation dialogs
10. Test on both Windows and Mac
11. Create user documentation
12. Write README with setup instructions

**Deliverable**: Stable, polished MVP ready for use

---

### Phase 10: Distribution (Week 8)
**Goal**: Package and distribute the application

**Tasks**:
1. Configure electron-builder for Windows
2. Configure electron-builder for Mac
3. Test installers on both platforms
4. Create application icons
5. Set up auto-updater (optional)
6. Write installation guide
7. Create demo video/screenshots
8. Prepare release notes
9. Build final installers
10. Test installation process

**Deliverable**: Installable desktop app for Windows and Mac

---

## Future Enhancements

### Post-MVP Features (Prioritized)

#### Priority 1: Essential UX Improvements
1. **Drag & Drop Image Upload**
   - Drag images directly into app
   - Visual feedback during drag
   - Multiple file handling

2. **Keyboard Shortcuts**
   - `Ctrl+N` - New flashcard
   - `Ctrl+E` - Export
   - `Ctrl+F` - Search
   - `Delete` - Delete selected
   - `Ctrl+Z` - Undo (if implemented)

3. **Undo/Redo System**
   - Track user actions
   - Allow undo for deletes and edits
   - Limited history (last 20 actions)

4. **Dark Mode**
   - System theme detection
   - Manual toggle
   - Persistent preference

#### Priority 2: Organization & Discovery
1. **Tags System**
   - Create custom tags
   - Color-coded tags
   - Filter by multiple tags
   - Tag management UI

2. **Deck Organization**
   - Group flashcards into decks
   - Export by deck
   - Deck statistics

3. **Advanced Search**
   - Full-text search
   - Filter by multiple criteria
   - Save search filters
   - Recent searches

4. **Batch Operations**
   - Select multiple flashcards
   - Bulk delete
   - Bulk tag
   - Bulk export

#### Priority 3: Learning Features
1. **Example Sentences**
   - Add context sentences
   - Auto-generate with AI (optional)
   - Multiple examples per word

2. **Difficulty Levels**
   - Mark as beginner/intermediate/advanced
   - Filter by difficulty
   - Progress tracking

3. **Progress Tracking**
   - Track exports to Anki
   - "Studied" status
   - Statistics dashboard
   - Charts and graphs

4. **Related Words**
   - Suggest related vocabulary
   - Group similar words
   - Link kanji compounds

#### Priority 4: Advanced Features
1. **Alternative TTS Providers**
   - ElevenLabs integration
   - Multiple voice options
   - Voice previews
   - Per-flashcard voice selection

2. **Anki Direct Integration**
   - AnkiConnect support
   - Direct deck creation
   - No CSV export needed
   - Bidirectional sync

3. **Import Features**
   - Import from CSV
   - Import from Anki decks
   - Import from text files
   - Bulk import with OCR

4. **Cloud Sync (Optional)**
   - User accounts
   - Cloud backup
   - Multi-device sync
   - Conflict resolution

#### Priority 5: Advanced OCR
1. **Handwriting Recognition**
   - Recognize handwritten Japanese
   - Better accuracy for stylized text
   - Training on custom data

2. **PDF Support**
   - Extract text from PDFs
   - Page-by-page processing
   - Maintain formatting

3. **Screenshot OCR**
   - Built-in screenshot tool
   - OCR any on-screen text
   - Quick capture and process

#### Priority 6: Collaboration & Sharing
1. **Deck Sharing**
   - Export deck packages
   - Import shared decks
   - Community deck library

2. **Study Groups**
   - Share flashcards with friends
   - Collaborative deck building
   - Comments and notes

### Technical Debt & Refactoring
1. Unit tests for services
2. E2E tests with Playwright
3. Performance optimization
4. Bundle size reduction
5. Accessibility improvements (ARIA labels, keyboard nav)
6. Internationalization (i18n) support
7. Error tracking (Sentry integration)
8. Analytics (privacy-respecting)

---

## Non-Functional Requirements

### Performance
- Image upload: < 2 seconds for 10 images
- OCR processing: < 5 seconds per image
- Audio generation: < 3 seconds per word
- App startup: < 3 seconds
- UI interactions: < 100ms response time

### Security
- API keys stored securely (environment variables)
- No sensitive data in logs
- Secure file uploads (validate file types)
- SQL injection prevention (Prisma ORM)
- XSS prevention in React

### Scalability
- Support 10,000+ flashcards
- Handle 1,000+ images
- Efficient database queries with indexes
- Pagination for large lists
- Lazy loading for images

### Usability
- Intuitive UI (minimal learning curve)
- Clear error messages
- Helpful tooltips
- Responsive design
- Consistent styling

### Compatibility
- Windows 10/11
- macOS 11+
- Node.js 20+
- Modern browsers (Chromium-based)

---

## Success Metrics

### MVP Success Criteria
- [ ] Users can upload images
- [ ] OCR correctly extracts Japanese text
- [ ] Flashcards are generated with all 3 card types
- [ ] Audio is generated for all flashcards
- [ ] CSV exports successfully import into Anki
- [ ] App works on both Windows and Mac
- [ ] No critical bugs
- [ ] Positive user feedback from 5+ testers

### Post-MVP Metrics
- Number of flashcards created
- Number of successful exports
- User retention rate
- App crash rate
- Average processing time
- User satisfaction score

---

## Assumptions & Constraints

### Assumptions
- Users have Google Gemini API key
- Users have Google Cloud account for TTS
- Users are familiar with Anki
- Users have basic computer skills
- Internet required for AI features

### Constraints
- Google Gemini API rate limits (15 RPM free tier)
- Google Cloud TTS costs (after free tier)
- Electron bundle size (100-200MB)
- SQLite limitations (single-user, file-based)
- Desktop-only (no mobile version)

### Risks & Mitigations
1. **Risk**: API costs too high
   - **Mitigation**: Implement local Tesseract.js fallback

2. **Risk**: OCR accuracy too low
   - **Mitigation**: Allow manual correction, improve prompts

3. **Risk**: App too slow
   - **Mitigation**: Optimize, add caching, lazy loading

4. **Risk**: User adoption low
   - **Mitigation**: Great UX, clear value prop, user testing

---

## Conclusion

This specification provides a complete blueprint for building the Japanese Flashcard Generator application. The MVP focuses on core functionality: image upload, AI-powered OCR, flashcard generation, audio creation, and Anki export. Future enhancements will add advanced features based on user feedback.

**Next Steps**:
1. Review and approve this specification
2. Create detailed development TODO list
3. Set up development environment
4. Begin Phase 1: Project Setup

---

**Document Version**: 1.0  
**Last Updated**: November 11, 2025  
**Author**: Technical Specification Team
