'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { ResultsPage as ResultsView } from '@/components';
import Footer from '@/components/Footer';
import { searchRoutes } from '@/lib/search';

export default function ResultsPage() {
  const router = useRouter();
  const params = useSearchParams();

  const from = params.get('from') ?? '';
  const to = params.get('to') ?? '';

  const routeMatches = searchRoutes({ fromQuery: from, toQuery: to });

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="bg-[var(--color-brand-primary)] text-white px-4 py-4 flex items-center gap-3">
        <button
          onClick={() => router.back()}
          className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center"
          aria-label="Go back"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-lg font-medium">Available routes</h1>
      </div>

      {/* Results Body */}
      <div className="flex-1">
        <ResultsView
          routes={routeMatches}
          multiLegRoutes={[]}
          searchQuery={{ from, to }}
        />
      </div>

      <Footer />
    </div>
  );
}
