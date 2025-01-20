import React from 'react';

const NotFound: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-6xl font-bold text-blue-600 mb-4">404</h1>
            <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
            <p className="text-gray-600 mb-4">Sorry, the page you are looking for does not exist.</p>
            <a href="/" className="text-blue-500 hover:underline">Go back to the homepage</a>
        </div>
    );
};

export default NotFound;
