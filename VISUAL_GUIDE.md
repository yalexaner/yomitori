# Visual Guide - What You'll See

## 🖥️ Electron Window

When you run `pnpm electron:dev`, you'll see:

```
┌─────────────────────────────────────────────────────────────────┐
│  Yomitori Window (1400x900)                              ⚫ ⚫ ⚫ │
├─────────────────────────────────────────────────────────────────┤
│  Header:                                                         │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  読みとり Yomitori     [Home] [Upload] [Library] [Export]│   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                  │
│  Home Page Content:                                              │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │        Welcome to Yomitori                               │   │
│  │   Create Anki flashcards from Japanese images using AI   │   │
│  │                                                           │   │
│  │  ┌─────────────────┐  ┌─────────────────┐              │   │
│  │  │ 📸 Upload Images│  │ ✍️ Manual Entry │              │   │
│  │  │                 │  │                 │              │   │
│  │  │ [Get Started]   │  │ [Add Words]     │              │   │
│  │  └─────────────────┘  └─────────────────┘              │   │
│  │                                                           │   │
│  │  ┌─────────────────┐  ┌─────────────────┐              │   │
│  │  │ 📚 Library      │  │ 📤 Export       │              │   │
│  │  │                 │  │                 │              │   │
│  │  │ [View Library]  │  │ [Export Cards]  │              │   │
│  │  └─────────────────┘  └─────────────────┘              │   │
│  │                                                           │   │
│  │  Features: AI text recognition, Auto audio, etc...       │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                  │
│  Footer:                                                         │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  © 2025 Yomitori - Japanese Flashcard Generator          │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

## 📱 Page Navigation

### Click "Upload" → You'll see:
```
┌────────────────────────────────┐
│  Upload Images                 │
│                                │
│  ┌──────────────────────────┐ │
│  │ Image upload              │ │
│  │ functionality will be     │ │
│  │ implemented in Phase 6.   │ │
│  └──────────────────────────┘ │
└────────────────────────────────┘
```

### Click "Library" → You'll see:
```
┌────────────────────────────────┐
│  Flashcard Library             │
│                                │
│  ┌──────────────────────────┐ │
│  │ Library and flashcard     │ │
│  │ management will be        │ │
│  │ implemented in Phase 7.   │ │
│  └──────────────────────────┘ │
└────────────────────────────────┘
```

### Click "Export" → You'll see:
```
┌────────────────────────────────┐
│  Export Flashcards             │
│                                │
│  ┌──────────────────────────┐ │
│  │ Export functionality      │ │
│  │ will be implemented       │ │
│  │ in Phase 8.               │ │
│  └──────────────────────────┘ │
└────────────────────────────────┘
```

## 🌐 Backend API Test

Open browser or use curl:

### http://localhost:3000/api/health
```json
{
  "status": "ok",
  "message": "Yomitori API is running"
}
```

## 🗄️ Database (Prisma Studio)

Run: `pnpm prisma:studio`

You'll see:
```
┌─────────────────────────────────────┐
│  Prisma Studio                      │
│  http://localhost:5555              │
├─────────────────────────────────────┤
│  Models (Left Sidebar):             │
│  • Flashcard         (0 records)    │
│  • GeneratedCard     (0 records)    │
│  • SourceImage       (0 records)    │
│  • Tag               (0 records)    │
│  • ExportHistory     (0 records)    │
│  • Settings          (0 records)    │
│                                     │
│  (All empty for now - will be       │
│   populated in later phases)        │
└─────────────────────────────────────┘
```

## 🎨 Styling Details

The app uses a professional blue theme:
- **Primary Color**: Blue (#0ea5e9)
- **Cards**: White with subtle shadows
- **Buttons**: Blue with hover effects
- **Japanese Text**: "読みとり" (Yomitori = Reading)
- **Font**: Clean sans-serif with Japanese support

## ✨ Interactive Elements

Try these:
1. **Hover over navigation links** - They turn blue
2. **Click between pages** - Smooth transitions
3. **Resize the window** - Responsive design adapts
4. **Open DevTools** - Check console (should be clean)

---

## 🎯 Summary

**What works NOW:**
- ✅ Full UI skeleton with navigation
- ✅ Professional styling
- ✅ Backend server responding
- ✅ Database initialized

**What's coming NEXT (Phase 2):**
- API endpoints for uploading images
- Flashcard CRUD operations
- File storage system
- Error handling
