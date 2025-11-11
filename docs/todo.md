# Japanese Flashcard Generator - Development TODO

**Version:** 1.0  
**Date:** November 11, 2025  
**Total Tasks:** 119 across 10 phases

---

## 📋 Task Status Legend
- [ ] Not Started
- [🔄] In Progress  
- [✅] Completed
- [⚠️] Blocked
- [🐛] Bug Found

## 🎯 Complexity Legend
- 🟢 Easy (< 1 hour)
- 🟡 Medium (1-2 hours)
- 🔴 Hard (2+ hours)

---

## Phase 1: Project Setup (10 tasks)
**Goal**: Set up development environment and basic architecture

### ✅ Completion Checklist
- [ ] Vite + React + TypeScript running
- [ ] Tailwind CSS configured
- [ ] Electron opens with React app
- [ ] Express server running
- [ ] Prisma + SQLite initialized
- [ ] ESLint + Prettier working
- [ ] Environment variables set
- [ ] Folder structure created
- [ ] Git repository initialized
- [ ] Electron builder configured

[Detailed tasks for P1-T01 through P1-T10 remain as specified above in the original TODO]

---

## Phase 2: Database & Core Backend (12 tasks)
**Goal**: Implement database schema and core API endpoints

### ✅ Completion Checklist
- [ ] Complete Prisma schema defined
- [ ] All CRUD endpoints working for images
- [ ] All CRUD endpoints working for flashcards
- [ ] File upload working with Multer
- [ ] Error handling middleware active
- [ ] End-to-end CRUD tests passing

[Detailed tasks for P2-T01 through P2-T12 remain as specified above]

---

## Phase 3: AI Integration (10 tasks)
**Goal**: Integrate Vercel AI SDK and Google Gemini

### ✅ Completion Checklist
- [ ] Vercel AI SDK configured
- [ ] Gemini API working
- [ ] OCR recognizes Japanese text from images
- [ ] Text analysis working for manual entry
- [ ] Rate limiting active
- [ ] Error handling for AI failures
- [ ] End-to-end OCR flow tested

[Detailed tasks for P3-T01 through P3-T10 remain as specified above]

---

## Phase 4: Card Generation Logic (8 tasks)
**Goal**: Implement flashcard generation from recognized text

### ✅ Completion Checklist
- [ ] Card generation algorithm documented
- [ ] 3 card types generated for vocabulary
- [ ] 3 card types generated for alphabet
- [ ] Cards integrated into flashcard creation
- [ ] Card regeneration on update working
- [ ] Card preview endpoint working
- [ ] Validation working
- [ ] End-to-end card generation tested

[Detailed tasks for P4-T01 through P4-T08 remain as specified above]

---

## Phase 5: Audio Generation (9 tasks)
**Goal**: Implement TTS with Google Cloud

### ✅ Completion Checklist
- [ ] Google Cloud TTS configured
- [ ] TTS service working
- [ ] Single audio generation working
- [ ] Batch audio generation working
- [ ] Audio regeneration working
- [ ] Audio files servable via HTTP
- [ ] Voice options supported
- [ ] End-to-end audio flow tested

[Detailed tasks for P5-T01 through P5-T09 remain as specified above]

---

## Phase 6: Frontend - Upload & Processing (15 tasks)
**Goal**: Build image upload and processing UI

### ✅ Completion Checklist
- [ ] Layout components created
- [ ] React Router configured
- [ ] API client service working
- [ ] Shared UI components created
- [ ] HomePage implemented
- [ ] Image upload working
- [ ] Image gallery displaying
- [ ] UploadPage with state management complete
- [ ] Recognition results page working
- [ ] Can edit and delete recognized words
- [ ] Can generate flashcards from results
- [ ] Loading states working
- [ ] Error handling working
- [ ] Navigation between pages working

**Key Tasks:**
- P6-T01: Layout components (Header, Footer)
- P6-T02: React Router setup
- P6-T03: API client service
- P6-T04: Shared UI components (Button, Input, Modal, etc.)
- P6-T05: HomePage
- P6-T06: ImageUploader component
- P6-T07: ImageGallery component
- P6-T08: UploadPage with full state management
- P6-T09: RecognitionResultsPage
- P6-T10-T15: Edit modal, validation, toast notifications, error boundaries, responsive design, end-to-end testing

---

## Phase 7: Frontend - Library & Management (18 tasks)
**Goal**: Build flashcard library and management UI

### ✅ Completion Checklist
- [ ] LibraryPage layout complete
- [ ] FlashcardGrid displaying
- [ ] FlashcardCard component complete
- [ ] Search functionality working
- [ ] Filters working (wordType, level, date)
- [ ] Sorting working
- [ ] Edit flashcard modal complete
- [ ] Delete with confirmation working
- [ ] Pagination working
- [ ] ManualEntryPage complete
- [ ] Audio playback working
- [ ] Bulk selection working
- [ ] All CRUD operations tested

**Key Tasks:**
- P7-T01: LibraryPage layout
- P7-T02: FlashcardGrid component
- P7-T03: FlashcardCard component
- P7-T04: Search bar component
- P7-T05: Filter dropdown components
- P7-T06: Sorting functionality
- P7-T07: Edit flashcard modal
- P7-T08: Delete confirmation dialog
- P7-T09: Pagination component
- P7-T10: ManualEntryPage
- P7-T11: Form validation with React Hook Form + Zod
- P7-T12: Audio player component
- P7-T13: Preview generated cards
- P7-T14: Bulk selection UI
- P7-T15: Context/state management for library
- P7-T16: Loading skeletons
- P7-T17: Empty states
- P7-T18: End-to-end library testing

---

## Phase 8: Export System (12 tasks)
**Goal**: Implement CSV export for Anki

### ✅ Completion Checklist
- [ ] Researched Anki CSV format
- [ ] CSV generator service working
- [ ] Audio packaging working (ZIP)
- [ ] Export endpoint working
- [ ] ExportPage UI complete
- [ ] Flashcard selection working
- [ ] Export options configurable
- [ ] Download working
- [ ] Tested CSV import in Anki
- [ ] Export history tracked
- [ ] User instructions written

**Key Tasks:**
- P8-T01: Research Anki CSV format requirements
- P8-T02: Design CSV structure for multiple card types
- P8-T03: Implement CSV generator service
- P8-T04: Implement audio packaging (ZIP creation)
- P8-T05: Create export endpoint
- P8-T06: Build ExportPage UI
- P8-T07: Implement flashcard selection
- P8-T08: Add export options (format, card types, include audio)
- P8-T09: Implement download functionality
- P8-T10: Test CSV import in actual Anki
- P8-T11: Add export history tracking
- P8-T12: Write user instructions for Anki import

---

## Phase 9: Polish & Testing (15 tasks)
**Goal**: Bug fixes, UX improvements, comprehensive testing

### ✅ Completion Checklist
- [ ] All features tested comprehensively
- [ ] All bugs fixed
- [ ] Loading states everywhere
- [ ] Error messages improved
- [ ] Performance optimized
- [ ] UI/UX polished
- [ ] Keyboard shortcuts added
- [ ] Toast notifications working
- [ ] Confirmation dialogs everywhere needed
- [ ] Tested on Windows
- [ ] Tested on Mac
- [ ] User documentation written
- [ ] README complete with setup instructions
- [ ] Code cleaned and commented

**Key Tasks:**
- P9-T01: Comprehensive feature testing
- P9-T02: Bug bash and fix session
- P9-T03: Improve error messages
- P9-T04: Add loading states to all async operations
- P9-T05: Performance optimization (lazy loading, code splitting)
- P9-T06: UI/UX polish pass
- P9-T07: Implement keyboard shortcuts
- P9-T08: Toast notification system
- P9-T09: Confirmation dialogs for destructive actions
- P9-T10: Test on Windows
- P9-T11: Test on Mac  
- P9-T12: Write user documentation
- P9-T13: Write README with setup instructions
- P9-T14: Code cleanup and comments
- P9-T15: Final QA pass

---

## Phase 10: Distribution (10 tasks)
**Goal**: Package and distribute the application

### ✅ Completion Checklist
- [ ] Electron builder configured for Windows
- [ ] Electron builder configured for Mac
- [ ] Application icons created
- [ ] Windows installer tested
- [ ] Mac installer tested
- [ ] Installation guide written
- [ ] Demo video created
- [ ] Release notes written
- [ ] Final installers built
- [ ] Installation process tested

**Key Tasks:**
- P10-T01: Configure electron-builder for Windows
- P10-T02: Configure electron-builder for Mac
- P10-T03: Create application icons (all sizes)
- P10-T04: Test Windows installer
- P10-T05: Test Mac installer (code signing considerations)
- P10-T06: Write installation guide
- P10-T07: Create demo video/screenshots
- P10-T08: Prepare release notes
- P10-T09: Build final production installers
- P10-T10: End-to-end installation testing

---

## 🚀 Quick Start Commands

### Development
```bash
# Install dependencies
pnpm install

# Start frontend dev server
pnpm dev

# Start backend server
pnpm server

# Start Electron (after both above are running)
pnpm electron:dev

# Or run all together (after setup)
pnpm dev:all
```

### Database
```bash
# Create migration
npx prisma migrate dev --name migration_name

# Generate client
npx prisma generate

# View data
npx prisma studio

# Reset database
npx prisma migrate reset
```

### Code Quality
```bash
# Lint
pnpm lint

# Format
pnpm format

# Type check
pnpm type-check
```

### Build
```bash
# Build frontend
pnpm build

# Build Electron app
pnpm electron:build

# Build for Windows
pnpm electron:build:win

# Build for Mac
pnpm electron:build:mac
```

---

## 📝 Development Guidelines

### Before Starting Each Task
1. ✅ Review task description and dependencies
2. ✅ Ensure all dependencies completed
3. ✅ Create feature branch (optional)
4. ✅ Read acceptance criteria
5. ✅ Plan implementation approach

### While Working
1. ✅ Follow TypeScript strict mode
2. ✅ Write clean, readable code
3. ✅ Add comments for complex logic
4. ✅ Use meaningful variable names
5. ✅ Handle errors properly
6. ✅ Add loading states for async operations
7. ✅ Test as you go

### After Completing Task
1. ✅ Run all tests from testing strategy
2. ✅ Verify acceptance criteria met
3. ✅ Run linter and fix issues
4. ✅ Format code with Prettier
5. ✅ Commit with clear message
6. ✅ Mark task as complete [✅]
7. ✅ Document any issues or notes

---

## 🐛 Bug Tracking Template

When you find a bug, document it:

```markdown
### Bug: [Short Description]
- **Found in**: Phase X, Task Y
- **Severity**: Critical / Major / Minor
- **Description**: [What's wrong]
- **Steps to Reproduce**:
  1. Step 1
  2. Step 2
- **Expected**: [What should happen]
- **Actual**: [What actually happens]
- **Fix**: [How it was fixed]
- **Status**: Open / In Progress / Fixed
```

---

## 📊 Progress Tracking

### Overall Progress
- Phase 1: [ ] 0/10 (0%)
- Phase 2: [ ] 0/12 (0%)
- Phase 3: [ ] 0/10 (0%)
- Phase 4: [ ] 0/8 (0%)
- Phase 5: [ ] 0/9 (0%)
- Phase 6: [ ] 0/15 (0%)
- Phase 7: [ ] 0/18 (0%)
- Phase 8: [ ] 0/12 (0%)
- Phase 9: [ ] 0/15 (0%)
- Phase 10: [ ] 0/10 (0%)

**Total**: 0/119 (0%)

---

## 🎯 Milestone Targets

1. **Week 1-2**: Phases 1-2 Complete (Infrastructure ready)
2. **Week 3-4**: Phases 3-4 Complete (AI integration working)
3. **Week 5-6**: Phases 5-6 Complete (Audio + Upload UI)
4. **Week 7**: Phase 7 Complete (Library UI)
5. **Week 8**: Phases 8-10 Complete (Export + Polish + Distribution)

---

## 🔑 Critical Path

These tasks MUST be completed in order:
1. P1-T01: Initialize project
2. P1-T05: Initialize Prisma
3. P2-T01: Define Prisma schema
4. P3-T01: Configure Vercel AI SDK
5. P4-T02: Card generator service
6. P5-T03: TTS service
7. P6-T08: UploadPage (first end-to-end flow)
8. P7-T01: LibraryPage
9. P8-T03: CSV generator
10. P9-T01: Comprehensive testing

---

## 💡 Tips for Success

1. **Test Early, Test Often**: Don't wait until the end to test
2. **One Task at a Time**: Focus on completing one task fully before moving on
3. **Document As You Go**: Write notes about decisions and issues
4. **Ask for Help**: If stuck for >30 mins, seek help or research
5. **Take Breaks**: Better to take a break than write buggy code
6. **Commit Frequently**: Small, focused commits are better
7. **Keep It Simple**: Start with simplest implementation that works
8. **Refactor Later**: Get it working first, optimize second

---

## 📚 Additional Resources

- [Vercel AI SDK Docs](https://sdk.vercel.ai/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [Electron Docs](https://www.electronjs.org/docs)
- [React Docs](https://react.dev)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Google Cloud TTS](https://cloud.google.com/text-to-speech/docs)
- [Google Gemini API](https://ai.google.dev/docs)

---

**Happy Coding! 🚀**

*For the complete detailed tasks for all phases, refer to the full TODO document sections above.*
