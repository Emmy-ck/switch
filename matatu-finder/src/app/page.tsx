'use client';

import React, { useState } from 'react';
import { LocationInput, Button, Card, CardHeader, CardBody } from '@/components';
import Footer from '@/components/Footer';

export default function HomePage() {
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const categories = ['All', 'Landmarks', 'Markets', 'Parks', 'Museums'] as const;
  type Category = typeof categories[number];
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const destinations: Array<{ name: string; category: Category; description: string }> = [
    { name: 'CBD', category: 'Landmarks', description: 'Central Business District with key landmarks and offices.' },
    { name: 'Gikomba Market', category: 'Markets', description: 'Largest open-air market known for bargains.' },
    { name: 'Uhuru Park', category: 'Parks', description: 'Green space perfect for relaxation and walks.' },
    { name: 'National Museum', category: 'Museums', description: 'Explore Kenya\'s rich cultural and natural heritage.' },
    { name: 'Westgate Mall', category: 'Markets', description: 'Modern shopping and dining destination in Westlands.' },
    { name: 'KICC', category: 'Landmarks', description: 'Iconic conference center with panoramic city views.' },
  ];
  const filteredDestinations = selectedCategory === 'All'
    ? destinations
    : destinations.filter((d) => d.category === selectedCategory);

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
    <div className="min-h-screen bg-gradient-to-b from-[var(--color-brand-primary)] to-[var(--color-brand-accent)]">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-[var(--color-brand-primary)] to-[var(--color-brand-accent)] text-[var(--color-brand-white)] px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <p className="text-sm opacity-90">Good evening</p>
              <p className="font-semibold">James Maina</p>
            </div>
          </div>
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-bold mb-2">
            Navigate Nairobi
          </h1>
          <h2 className="text-2xl font-bold">
            with Ease!
          </h2>
        </div>
      </div>

      {/* Search Form Section */}
      <div className="px-4 -mt-4 relative z-10">
        <div className="bg-[var(--color-brand-white)] rounded-2xl shadow-lg p-6">
          <form onSubmit={handleSearch}>
            <div className="space-y-4">
              <div className="relative">
                <div className="flex items-center space-x-3 p-4 bg-[var(--color-brand-light)] rounded-xl border border-[var(--color-brand-light)]">
                  <svg className="w-5 h-5 text-[var(--color-brand-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div className="flex-1">
                    <p className="text-sm text-[var(--color-brand-dark)] mb-1">From</p>
                    <input
                      type="text"
                      value={fromLocation}
                      onChange={(e) => setFromLocation(e.target.value)}
                      placeholder="Enter location"
                      className="w-full bg-transparent border-none outline-none text-[var(--color-brand-dark)] placeholder-gray-400"
                    />
                  </div>
                  <div className="w-8 h-8 bg-[var(--color-brand-white)] rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-[var(--color-brand-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="flex items-center space-x-3 p-4 bg-[var(--color-brand-light)] rounded-xl border border-[var(--color-brand-light)]">
                  <svg className="w-5 h-5 text-[var(--color-brand-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div className="flex-1">
                    <p className="text-sm text-[var(--color-brand-dark)] mb-1">Destination</p>
                    <input
                      type="text"
                      value={toLocation}
                      onChange={(e) => setToLocation(e.target.value)}
                      placeholder="Enter your destination"
                      className="w-full bg-transparent border-none outline-none text-[var(--color-brand-dark)] placeholder-gray-400"
                    />
                  </div>
                  <div className="w-8 h-8 bg-[var(--color-brand-white)] rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-[var(--color-brand-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <button
                type="submit"
                disabled={!fromLocation.trim() || !toLocation.trim() || isSearching}
                className="w-full bg-[var(--color-brand-dark)] text-[var(--color-brand-white)] py-4 rounded-xl font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[var(--color-brand-dark)]/90 transition-colors"
              >
                {isSearching ? 'Finding Routes...' : 'Find My Matatu'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Popular Places Section */}
      <div className="px-4 py-6 bg-[var(--color-brand-white)] mt-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-[var(--color-brand-dark)]">Popular Places</h2>
          <button className="text-[var(--color-brand-primary)] text-sm font-medium">See all</button>
        </div>

        <div className="flex space-x-2 mb-4 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                selectedCategory === cat 
                  ? 'bg-[var(--color-brand-primary)] text-[var(--color-brand-white)]' 
                  : 'bg-[var(--color-brand-light)] text-[var(--color-brand-dark)]'
              }`}
              onClick={() => setSelectedCategory(cat as typeof categories[number])}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {filteredDestinations.slice(0, 3).map((dest) => (
            <div key={dest.name} className="flex items-center justify-between p-4 bg-[var(--color-brand-light)]/30 rounded-xl">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-[var(--color-brand-light)] rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-[var(--color-brand-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-[var(--color-brand-dark)]">{dest.name}</h3>
                  <p className="text-sm text-[var(--color-brand-dark)]/70">{dest.description.split('.')[0]}</p>
                </div>
              </div>
              <div className="text-[var(--color-brand-dark)]/40">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
