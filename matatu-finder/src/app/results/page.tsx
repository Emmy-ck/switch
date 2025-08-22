'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import ResultsPage from '@/components/ResultsPage';
import Footer from '@/components/Footer';
import { searchRoutes } from '@/lib/search';
import type { RouteMatch } from '@/lib/types';

function ResultsContent() {
	const searchParams = useSearchParams();
	const from = searchParams.get('from') || '';
	const to = searchParams.get('to') || '';

	// Use real search functionality
	const routeMatches: RouteMatch[] = searchRoutes({
		fromQuery: from,
		toQuery: to
	});

	return (
		<div className="min-h-screen bg-gray-50">
			<ResultsPage 
				routes={routeMatches}
				searchQuery={{
					from: from,
					to: to
				}}
			/>
			<Footer />
		</div>
	);
}

export default function ResultsDemo() {
	return (
		<Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center">
			<div className="text-[var(--color-brand-primary)]">Loading routes...</div>
		</div>}>
			<ResultsContent />
		</Suspense>
	);
}
