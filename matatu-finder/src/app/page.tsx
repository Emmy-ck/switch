'use client';

import React, { useState } from 'react';
import { LocationInput, Button, Card, CardHeader, CardBody } from '@/components';

export default function HomePage() {
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const categories = ['All', 'Landmarks', 'Markets', 'Parks', 'Museums', 'Transit'] as const;
  type Category = typeof categories[number];
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const destinations: Array<{ name: string; category: Category; description: string }> = [
    { name: 'CBD', category: 'Landmarks', description: 'Central Business District with key landmarks and offices.' },
    { name: 'Gikomba Market', category: 'Markets', description: 'Largest open-air market known for bargains.' },
    { name: 'Uhuru Park', category: 'Parks', description: 'Green space perfect for relaxation and walks.' },
    { name: 'National Museum', category: 'Museums', description: 'Explore Kenya’s rich cultural and natural heritage.' },
    { name: 'Westgate Mall', category: 'Markets', description: 'Modern shopping and dining destination in Westlands.' },
    { name: 'KICC', category: 'Landmarks', description: 'Iconic conference center with panoramic city views.' },
    { name: 'Nairobi Railway Station', category: 'Transit', description: 'Key transit hub connecting city routes.' },
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
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-8 fade-in delay-300">
          <h2 className="text-3xl font-bold text-[var(--color-brand-dark)] mb-4">Popular Destinations</h2>
          <p className="text-lg text-[var(--color-brand-primary)]">Helping new users explore the city with ease</p>
        </div>

        <div className="flex flex-wrap gap-3 justify-center mb-8">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant="outline"
              size="md"
              className={selectedCategory === cat 
                ? '!bg-[var(--color-brand-primary)] !text-[var(--color-brand-white)] !border-0 !border-none focus:!ring-0 focus:!ring-offset-0' 
                : ''
              }
              onClick={() => setSelectedCategory(cat as typeof categories[number])}
            >
              {cat}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDestinations.map((dest) => (
            <Card key={dest.name} className="text-left">
              <CardBody>
                <h3 className="text-xl font-semibold text-[var(--color-brand-dark)] mb-2">{dest.name}</h3>
                <p className="text-[var(--color-brand-primary)] mb-3">{dest.description}</p>
                <span className="inline-block text-sm px-3 py-1 rounded-full bg-[var(--color-brand-light)] text-[var(--color-brand-dark)]">{dest.category}</span>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
