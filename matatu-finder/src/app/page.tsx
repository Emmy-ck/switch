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
      <div className="bg-gradient-to-r from-[var(--color-brand-primary)] to-[var(--color-brand-accent)] text-[var(--color-brand-white)] px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="max-w-md mx-auto lg:max-w-2xl">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <p className="text-xs sm:text-sm opacity-90">Good evening</p>
                <p className="text-sm sm:text-base font-semibold">James Maina</p>
              </div>
            </div>
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
              </svg>
            </div>
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold leading-tight">
              Navigate Nairobi<br />with Ease!
            </h1>
          </div>
        </div>
      </div>

      {/* Search Form Section */}
      <div className="px-4 sm:px-6 lg:px-8 -mt-2 sm:-mt-4 relative z-10">
        <div className="max-w-md mx-auto lg:max-w-2xl">
          <div className="bg-[var(--color-brand-white)] rounded-2xl shadow-lg p-4 sm:p-6">
            <form onSubmit={handleSearch}>
              <div className="space-y-3 sm:space-y-4">
                <div className="relative">
                  <div className="flex items-center space-x-3 p-3 sm:p-4 bg-[var(--color-brand-light)] rounded-xl">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--color-brand-primary)] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm text-[var(--color-brand-dark)] mb-1">From</p>
                      <input
                        type="text"
                        value={fromLocation}
                        onChange={(e) => setFromLocation(e.target.value)}
                        placeholder="Enter location"
                        className="w-full bg-transparent border-none outline-none text-sm sm:text-base text-[var(--color-brand-dark)] placeholder-gray-400"
                      />
                    </div>
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-[var(--color-brand-white)] rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 text-[var(--color-brand-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="flex items-center space-x-3 p-3 sm:p-4 bg-[var(--color-brand-light)] rounded-xl">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--color-brand-primary)] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm text-[var(--color-brand-dark)] mb-1">Destination</p>
                      <input
                        type="text"
                        value={toLocation}
                        onChange={(e) => setToLocation(e.target.value)}
                        placeholder="Enter your destination"
                        className="w-full bg-transparent border-none outline-none text-sm sm:text-base text-[var(--color-brand-dark)] placeholder-gray-400"
                      />
                    </div>
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-[var(--color-brand-white)] rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 text-[var(--color-brand-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                <button
                  type="submit"
                  disabled={!fromLocation.trim() || !toLocation.trim() || isSearching}
                  className="w-full bg-[var(--color-brand-dark)] text-[var(--color-brand-white)] py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[var(--color-brand-dark)]/90 transition-colors"
                >
                  {isSearching ? 'Finding Routes...' : 'Find My Matatu'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Popular Places Section */}
      <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 bg-[var(--color-brand-white)] mt-4 sm:mt-6 min-h-0">
        <div className="max-w-md mx-auto lg:max-w-2xl">
          <div className="flex justify-between items-center mb-3 sm:mb-4">
            <h2 className="text-base sm:text-lg font-semibold text-[var(--color-brand-dark)]">Popular Places</h2>
            <button className="text-[var(--color-brand-primary)] text-xs sm:text-sm font-medium">See all</button>
          </div>

          <div className="flex space-x-2 mb-3 sm:mb-4 overflow-x-auto scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap flex-shrink-0 ${
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

          <div className="space-y-2 sm:space-y-3">
            {filteredDestinations.slice(0, 3).map((dest) => (
              <div key={dest.name} className="flex items-center justify-between p-3 sm:p-4 bg-[var(--color-brand-light)]/30 rounded-xl hover:bg-[var(--color-brand-light)]/50 transition-colors">
                <div className="flex items-center space-x-3 min-w-0 flex-1">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[var(--color-brand-light)] rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--color-brand-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm sm:text-base font-semibold text-[var(--color-brand-dark)] truncate">{dest.name}</h3>
                    <p className="text-xs sm:text-sm text-[var(--color-brand-dark)]/70 truncate">{dest.description.split('.')[0]}</p>
                  </div>
                </div>
                <div className="text-[var(--color-brand-dark)]/40 flex-shrink-0 ml-2">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
