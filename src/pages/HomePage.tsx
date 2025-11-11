import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to Yomitori
          </h2>
          <p className="text-xl text-gray-600">
            Create Anki flashcards from Japanese images using AI
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="card">
            <h3 className="text-xl font-semibold mb-2">📸 Upload Images</h3>
            <p className="text-gray-600 mb-4">
              Upload images containing Japanese text and let AI extract the words
              automatically.
            </p>
            <Link to="/upload" className="btn-primary inline-block">
              Get Started
            </Link>
          </div>

          <div className="card">
            <h3 className="text-xl font-semibold mb-2">✍️ Manual Entry</h3>
            <p className="text-gray-600 mb-4">
              Manually enter Japanese words and generate flashcards with audio
              pronunciation.
            </p>
            <Link to="/manual-entry" className="btn-primary inline-block">
              Add Words
            </Link>
          </div>

          <div className="card">
            <h3 className="text-xl font-semibold mb-2">📚 Library</h3>
            <p className="text-gray-600 mb-4">
              Browse, search, and manage all your created flashcards in one place.
            </p>
            <Link to="/library" className="btn-primary inline-block">
              View Library
            </Link>
          </div>

          <div className="card">
            <h3 className="text-xl font-semibold mb-2">📤 Export</h3>
            <p className="text-gray-600 mb-4">
              Export your flashcards to CSV format for importing into Anki.
            </p>
            <Link to="/export" className="btn-primary inline-block">
              Export Cards
            </Link>
          </div>
        </div>

        <div className="card bg-primary-50 border-primary-200">
          <h3 className="text-lg font-semibold mb-2">✨ Features</h3>
          <ul className="space-y-2 text-gray-700">
            <li>• AI-powered text recognition from images</li>
            <li>• Automatic audio pronunciation generation</li>
            <li>• Multiple flashcard types per word</li>
            <li>• Anki-compatible CSV export</li>
            <li>• Local database - works offline</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
