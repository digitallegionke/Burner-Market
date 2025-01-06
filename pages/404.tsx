import React from 'react';
import Link from 'next/link';

export default function Custom404() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
      <h1 className="mb-4 text-6xl font-bold text-gray-800">404</h1>
      <h2 className="mb-4 text-2xl font-semibold text-gray-600">Page Not Found</h2>
      <p className="mb-8 text-gray-500">The page you're looking for doesn't exist or has been moved.</p>
      <Link 
        href="/"
        className="rounded bg-blue-500 px-6 py-3 text-white transition-colors hover:bg-blue-600"
      >
        Go Back Home
      </Link>
    </div>
  );
} 