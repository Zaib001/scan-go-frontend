import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-4xl font-bold text-red-600 mb-4">404</h1>
      <p className="text-gray-600 mb-6">Sorry, the page you're looking for doesn't exist.</p>
      <Link to="/" className="text-blue-600 hover:underline">Go back to Home</Link>
    </div>
  );
};

export default NotFound;
