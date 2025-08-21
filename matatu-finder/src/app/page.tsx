'use client';

import React, { useState } from 'react';
import { LocationInput, Button, Card, CardHeader, CardBody } from '@/components';

export default function HomePage() {
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fromLocation.trim() || !toLocation.trim()) return;

    setIsSearching(true);
    // TODO: Implement search logic
    console.log('Searching from:', fromLocation, 'to:', toLocation);
    
    // Simulate search delay
    setTimeout(() => {
      setIsSearching(false);
      // TODO: Navigate to results page or show results
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[var(--color-brand-light)]">
      {/* Hero Section */}
      <div className="bg-[var(--color-brand-primary)] text-[var(--color-brand-white)] py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 fade-in">
            Find Your Matatu Route
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto slide-in-bottom">
            Discover the fastest and most convenient routes across the city. 
            Get real-time information about matatu routes, fares, and schedules.
          </p>
        </div>
      </div>

      {/* Search Form Section */}
      <div className="max-w-4xl mx-auto px-6 -mt-8 relative z-10">
        <Card className="shadow-2xl scale-in">
          <CardHeader>
            <h2 className="text-2xl font-semibold text-[var(--color-brand-dark)] text-center">
              Where would you like to go?
            </h2>
          </CardHeader>
          <CardBody>
            <form onSubmit={handleSearch}>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <LocationInput
                    label="From"
                    value={fromLocation}
                    onChange={(e) => setFromLocation(e.target.value)}
                    placeholder="Enter starting point"
                    name="from"
                    id="from"
                    autoComplete="off"
                  />
                  <LocationInput
                    label="To"
                    value={toLocation}
                    onChange={(e) => setToLocation(e.target.value)}
                    placeholder="Enter destination"
                    name="to"
                    id="to"
                    autoComplete="off"
                  />
                </div>
                <Button
                  type="submit"
                  className="bg-[var(--color-brand-primary)] text-white"
                  variant="primary"
                  size="lg"
                  loading={isSearching}
                  fullWidth
                  disabled={!fromLocation.trim() || !toLocation.trim()}
                >
                  {isSearching ? 'Finding Routes...' : 'Find Routes'}
                </Button>
              </div>
            </form>
          </CardBody>
        </Card>
      </div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-12 fade-in delay-300">
          <h2 className="text-3xl font-bold text-[var(--color-brand-dark)] mb-4">
            Why Choose Matatu Finder?
          </h2>
          <p className="text-lg text-[var(--color-brand-primary)] max-w-2xl mx-auto">
            Get accurate, up-to-date information about matatu routes and make your journey easier
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="text-center slide-in-left delay-100">
            <CardBody>
              <div className="w-16 h-16 bg-[var(--color-brand-primary)] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[var(--color-brand-white)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[var(--color-brand-dark)] mb-2">Fast Routes</h3>
              <p className="text-[var(--color-brand-primary)]">
                Find the quickest routes to your destination with real-time updates
              </p>
            </CardBody>
          </Card>

          <Card className="text-center slide-in-bottom delay-200">
            <CardBody>
              <div className="w-16 h-16 bg-[var(--color-brand-accent)] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[var(--color-brand-white)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[var(--color-brand-dark)] mb-2">Fare Information</h3>
              <p className="text-[var(--color-brand-primary)]">
                Know the exact fare before you travel, no surprises
              </p>
            </CardBody>
          </Card>

          <Card className="text-center slide-in-right delay-300">
            <CardBody>
              <div className="w-16 h-16 bg-[var(--color-brand-dark)] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[var(--color-brand-white)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[var(--color-brand-dark)] mb-2">Live Updates</h3>
              <p className="text-[var(--color-brand-primary)]">
                Get live updates on route changes and delays
              </p>
            </CardBody>
          </Card>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-[var(--color-brand-white)] py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12 fade-in delay-500">
            <h2 className="text-3xl font-bold text-[var(--color-brand-dark)] mb-4">
              Quick Actions
            </h2>
            <p className="text-lg text-[var(--color-brand-primary)]">
              Access popular routes and features instantly
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Button variant="outline" size="lg" className="h-24 flex-col">
              <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>Nearby Stops</span>
            </Button>

            <Button variant="outline" size="lg" className="h-24 flex-col">
              <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <span>Popular Routes</span>
            </Button>

            <Button variant="outline" size="lg" className="h-24 flex-col">
              <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Schedule</span>
            </Button>

            <Button variant="outline" size="lg" className="h-24 flex-col">
              <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Help</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
