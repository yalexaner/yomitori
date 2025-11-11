# Testing Guide - Phase 1

## Quick Test (Recommended)

Open **3 separate terminals** and run:

### Terminal 1: Start React Dev Server
```bash
pnpm dev
```
Wait for: `VITE v5.x.x ready at http://localhost:5173`

### Terminal 2: Start Express Backend
```bash
pnpm server
```
Wait for: `🚀 Server running on http://localhost:3000`

### Terminal 3: Start Electron
```bash
pnpm electron:dev
```
The Electron window should open automatically!

---

## Alternative: Run All at Once (Experimental)
```bash
pnpm dev:all
```
This runs all three servers with one command, but it's harder to see individual logs.

---

## What to Test

### 1. Electron App Opens
- ✅ Window opens showing the Yomitori app
- ✅ DevTools should be open (for debugging)
- ✅ Window is resizable (min 800x600)

### 2. Navigation Works
Click through all pages:
- ✅ **Home** - Shows welcome page with feature cards
- ✅ **Upload** - Shows "Upload Images" page (placeholder)
- ✅ **Library** - Shows "Flashcard Library" page (placeholder)
- ✅ **Export** - Shows "Export Flashcards" page (placeholder)
- ✅ **Manual Entry** - Shows "Manual Entry" page (placeholder)

### 3. UI/Styling Works
Check that:
- ✅ Header displays "読みとり Yomitori"
- ✅ Navigation links are blue and hover correctly
- ✅ Cards have shadows and borders
- ✅ Buttons are styled (blue primary buttons)
- ✅ Footer shows at bottom

### 4. Backend Health Check
In a new terminal or browser:
```bash
curl http://localhost:3000/api/health
```
Should return:
```json
{"status":"ok","message":"Yomitori API is running"}
```

Or open in browser: http://localhost:3000/api/health

### 5. Database
Check the database was created:
```bash
ls -la data/
```
Should see: `flashcards.db`

Open Prisma Studio to view the database:
```bash
pnpm prisma:studio
```
Then open: http://localhost:5555

---

## Expected Behavior

### ✅ What Should Work
1. App opens in Electron window
2. All pages load without errors
3. Navigation between pages works
4. UI looks styled and professional
5. Backend responds to health check
6. No console errors (minor React warnings are OK)

### ⚠️ Expected Limitations
1. All pages show placeholder text like "will be implemented in Phase X"
2. No actual functionality (upload, processing, export) yet
3. Library page is empty (no flashcards yet)
4. All forms are just placeholders

---

## Troubleshooting

### Issue: "Cannot find module"
**Solution:**
```bash
pnpm install
pnpm prisma:generate
```

### Issue: Port 5173 or 3000 already in use
**Solution:**
```bash
# Kill processes on ports
pkill -f vite
pkill -f "node.*server"
# Or change ports in .env and vite.config.ts
```

### Issue: Electron window doesn't open
**Solution:**
```bash
# Rebuild Electron
pnpm rebuild electron
# Make sure Vite is running first on port 5173
```

### Issue: White screen in Electron
**Solution:**
1. Check DevTools console for errors
2. Make sure Vite dev server is running at http://localhost:5173
3. Try refreshing: Cmd+R (Mac) or Ctrl+R (Windows)

---

## Stopping the Servers

Press `Ctrl+C` in each terminal to stop the servers.

---

## Next Steps

Once you've verified everything works, you're ready for:
- **Phase 2**: Database & Core Backend - Add actual API endpoints
- **Phase 3**: AI Integration - Add Google Gemini for OCR
- **Phase 4-10**: Continue building features

The foundation is solid! 🎉
