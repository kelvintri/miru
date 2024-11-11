'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function AnimeError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
        <p className="text-gray-600 mb-6">
          We couldn't load the anime details. Please try again.
        </p>
        <Button onClick={reset}>Try again</Button>
      </div>
    </main>
  );
} 