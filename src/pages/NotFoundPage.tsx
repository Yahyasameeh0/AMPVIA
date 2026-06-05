import { Link } from 'react-router-dom';
import { Hop as Home, ArrowLeft } from 'lucide-react';
import { usePageTitle } from '../hooks/use-page-title';

const NotFoundPage = () => {
  usePageTitle('Page Not Found | AMPVIA');

  return (
    <div className="pt-32 pb-20 min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center">
      <div className="max-w-lg mx-auto px-6 text-center">
        <div className="text-8xl font-bold text-crimson/10 mb-4" style={{ fontFamily: '"DM Serif Display", serif' }}>
          404
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-crimson-dark dark:text-white mb-4">
          Page Not Found
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-crimson text-white font-semibold rounded-full hover:bg-crimson-dark transition-colors">
            <Home className="w-4 h-4" /> Go Home
          </Link>
          <button onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 px-6 py-3 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 font-semibold rounded-full hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
