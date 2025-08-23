'use client';

import React, { useState } from 'react';

interface UseLocationButtonProps {
  onLocationFound: (location: string) => void;
  disabled?: boolean;
}

// Mock reverse geocoding service - in production, use Google Maps API or similar
const reverseGeocode = async (lat: number, lng: number): Promise<string> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock Nairobi locations based on coordinates
  const nairobiLocations = [
    'Umoja Estate',
    'Donholm',
    'Kayole',
    'Embakasi',
    'Kasarani',
    'Westlands',
    'Kilimani',
    'Lavington',
    'Karen',
    'Langata'
  ];
  
  // Return a random location for demo purposes
  const randomLocation = nairobiLocations[Math.floor(Math.random() * nairobiLocations.length)];
  return `${randomLocation} (${lat.toFixed(4)}, ${lng.toFixed(4)})`;
};

export default function UseLocationButton({ onLocationFound, disabled = false }: UseLocationButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const handleGetLocation = async () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by this browser');
      return;
    }

    setIsLoading(true);
    setError('');

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const locationName = await reverseGeocode(latitude, longitude);
          onLocationFound(locationName);
          setIsLoading(false);
        } catch (err) {
          setError('Failed to get location name');
          setIsLoading(false);
        }
      },
      (error) => {
        let message = 'Location error: ';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            message += 'Permission denied. Please allow location access and try again.';
            break;
          case error.POSITION_UNAVAILABLE:
            message += 'Position unavailable. Please check your GPS settings.';
            break;
          case error.TIMEOUT:
            message += 'Request timeout. Please try again.';
            break;
          default:
            message += 'Unknown error occurred.';
            break;
        }
        setError(message);
        setIsLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      }
    );
  };

  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={handleGetLocation}
        disabled={disabled || isLoading}
        className={`
          flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg border transition-all duration-200
          ${isLoading || disabled
            ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
            : 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 hover:border-blue-300 active:bg-blue-200'
          }
        `}
        aria-label="Use my current location"
      >
        {isLoading ? (
          <>
            <div className="w-4 h-4 border-2 border-blue-300 border-t-blue-600 rounded-full animate-spin" />
            <span>Getting location...</span>
          </>
        ) : (
          <>
            <svg 
              className="w-4 h-4" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" 
              />
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" 
              />
            </svg>
            <span>Use My Location</span>
          </>
        )}
      </button>

      {error && (
        <div 
          className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3"
          role="alert"
          aria-live="polite"
        >
          <div className="flex items-start gap-2">
            <svg 
              className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" 
              fill="currentColor" 
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path 
                fillRule="evenodd" 
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" 
                clipRule="evenodd" 
              />
            </svg>
            <span>{error}</span>
          </div>
        </div>
      )}
    </div>
  );
}
