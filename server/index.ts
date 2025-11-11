import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (audio, images)
app.use('/uploads', express.static(path.join(__dirname, '../data/uploads')));
app.use('/audio', express.static(path.join(__dirname, '../data/audio')));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Yomitori API is running' });
});

// Routes will be added here
// app.use('/api/images', imagesRouter);
// app.use('/api/flashcards', flashcardsRouter);
// app.use('/api/process', processRouter);
// app.use('/api/audio', audioRouter);
// app.use('/api/export', exportRouter);

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    error: {
      code: err.code || 'INTERNAL_ERROR',
      message: err.message || 'An unexpected error occurred',
      details: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    },
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
});

export default app;
