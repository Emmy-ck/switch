'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LocationInput, Button, Card, CardHeader, CardBody } from '@/components';
import Footer from '@/components/Footer';

export default function HomePage() {
  const router = useRouter();
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
    
    // Simulate search delay for better UX
    setTimeout(() => {
      setIsSearching(false);
      
      // Navigate to results page with search parameters
      const searchParams = new URLSearchParams({
        from: fromLocation.trim(),
        to: toLocation.trim()
      });
      
      router.push(`/results?${searchParams.toString()}`);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[color-mix(in_srgb,var(--color-brand-light)_30%,white_70%)]">
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
                <p className="text-sm sm:text-base font-semibold">Sarah Wanjiku</p>
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
      <div className="max-w-4xl mx-auto px-6 -mt-8 relative z-10">
        <Card className="shadow-2xl scale-in">
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

 
      {/* Popular Destinations Section */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-4">
          <div className="fade-in delay-300">
            <h2 className="text-xl font-bold text-[var(--color-brand-dark)] mb-1">Popular Places</h2>
          </div>
          <Button variant="ghost" size="sm" className="text-[var(--color-brand-primary)] hover:bg-[var(--color-brand-light)] text-sm">
            See All
          </Button>
        </div>

        <div className="flex flex-wrap gap-1 md:gap-1.5 justify-center mb-4">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant="outline"
              size="sm"
              className={`text-xs md:text-sm px-2 md:px-3 py-1 md:py-1.5 ${selectedCategory === cat 
                ? '!bg-[var(--color-brand-primary)] !text-[var(--color-brand-white)] !border-0 !border-none focus:!ring-0 focus:!ring-offset-0' 
                : '!bg-[var(--color-brand-light)] !text-[var(--color-brand-dark)]'
              }`}
              onClick={() => setSelectedCategory(cat as typeof categories[number])}
            >
              {cat}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredDestinations.map((dest) => (
            <Card key={dest.name} className="text-left">
              <CardBody className="p-3">
                <h3 className="text-base font-semibold text-[var(--color-brand-dark)] mb-1">{dest.name}</h3>
                <p className="text-xs text-[var(--color-brand-primary)] mb-1.5">{dest.description}</p>
                <span className="inline-block text-xs px-1.5 py-0.5 rounded-full bg-[var(--color-brand-light)] text-[var(--color-brand-dark)]">{dest.category}</span>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
