import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold text-primary-600">読みとり</h1>
            <span className="text-sm text-gray-500">Yomitori</span>
          </Link>

          <nav className="flex space-x-6">
            <Link
              to="/"
              className="text-gray-700 hover:text-primary-600 transition-colors"
            >
              Home
            </Link>
            <Link
              to="/upload"
              className="text-gray-700 hover:text-primary-600 transition-colors"
            >
              Upload
            </Link>
            <Link
              to="/library"
              className="text-gray-700 hover:text-primary-600 transition-colors"
            >
              Library
            </Link>
            <Link
              to="/export"
              className="text-gray-700 hover:text-primary-600 transition-colors"
            >
              Export
            </Link>
            <Link
              to="/manual-entry"
              className="text-gray-700 hover:text-primary-600 transition-colors"
            >
              Manual Entry
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
