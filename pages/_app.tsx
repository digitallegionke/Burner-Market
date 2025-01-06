import React, { Suspense } from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ErrorBoundary } from 'react-error-boundary';
import '../styles/globals.css';

function ErrorFallback({ error }: { error: Error }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
      <h2 className="mb-4 text-2xl font-bold text-red-600">Something went wrong</h2>
      <p className="mb-4 text-gray-600">{error.message}</p>
      <button
        className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        onClick={() => window.location.reload()}
      >
        Try again
      </button>
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
    </div>
  );
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Burner Market - Fresh Produce Delivery</title>
        <meta name="description" content="Order fresh produce and groceries from Burner Market. Build your custom box with our wide selection of quality products." />
        <meta name="keywords" content="fresh produce, grocery delivery, custom box, food delivery, burner market" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Burner Market - Fresh Produce Delivery" />
        <meta property="og:description" content="Order fresh produce and groceries from Burner Market. Build your custom box with our wide selection of quality products." />
        <meta property="og:site_name" content="Burner Market" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Burner Market - Fresh Produce Delivery" />
        <meta name="twitter:description" content="Order fresh produce and groceries from Burner Market. Build your custom box with our wide selection of quality products." />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        
        {/* PWA */}
        <meta name="theme-color" content="#ffffff" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </Head>
      <Suspense fallback={<LoadingFallback />}>
        <Component {...pageProps} />
      </Suspense>
    </ErrorBoundary>
  );
}

export default MyApp;
