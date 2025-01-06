import React from 'react';
import Link from 'next/link';

export default function Custom500() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
      <h1 className="mb-4 text-6xl font-bold text-gray-800">500</h1>
      <h2 className="mb-4 text-2xl font-semibold text-gray-600">Server Error</h2>
      <p className="mb-8 text-gray-500">
        We&apos;re experiencing some technical difficulties. Please try again later.
      </p>
      <Link 
        href="/"
        className="rounded bg-blue-500 px-6 py-3 text-white transition-colors hover:bg-blue-600"
      >
        Go Back Home
      </Link>
    </div>
  );
} 