'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { routes, getStopById } from '@/lib/data';

export default function ExtendedRoutePage() {
  const params = useParams();
  const router = useRouter();
  const routeId = params.id as string;
  
  // Find the actual route data
  const route = routes.find(r => r.id === routeId);
  
  if (!route) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl font-semibold text-gray-800 mb-2">Route not found</h1>
          <button 
            onClick={() => router.push('/')}
            className="text-[var(--color-brand-primary)] hover:underline"
          >
            Return to search
          </button>
        </div>
      </div>
    );
  }
  
  // Get stop details for the route
  const routeStops = route.stops.map(stopId => getStopById(stopId)).filter(Boolean);
  const startStop = routeStops[0];
  const endStop = routeStops[routeStops.length - 1];

  const handleBackClick = () => {
    router.back();
  };

  const handleHomeClick = () => {
    router.push('/');
  };

  // Generate route steps from real data
  const routeSteps = [
    {
      id: 1,
      type: 'start',
      location: startStop?.name || 'Start',
      time: '10:30 AM',
      description: `Start location: ${startStop?.landmarks?.[0] || startStop?.name}`,
      walkTime: null,
      walkDistance: null
    },
    {
      id: 2,
      type: 'walk',
      location: 'Walk to matatu stop',
      time: null,
      description: null,
      walkTime: '3 min',
      walkDistance: '200m'
    },
    {
      id: 3,
      type: 'transport',
      location: `Board ${route.name}`,
      time: '10:33 AM',
      description: route.sacco || 'Matatu Service',
      walkTime: `${route.estimatedTime || 45} min`,
      walkDistance: `${Math.round((routeStops.length - 1) * 2.5)}km`,
      routeNumber: route.number
    }
  ];

  // Add intermediate stops if any
  if (routeStops.length > 2) {
    const middleStops = routeStops.slice(1, -1);
    middleStops.forEach((stop, index) => {
      routeSteps.push({
        id: routeSteps.length + 1,
        type: 'stop',
        location: stop?.name || `Stop ${index + 1}`,
        time: `10:${35 + (index * 5)} AM`,
        description: stop?.landmarks?.[0] || null,
        walkTime: null,
        walkDistance: null
      } as any);
    });
  }

  // Add final steps
  routeSteps.push(
    {
      id: routeSteps.length + 1,
      type: 'walk',
      location: 'Walk to destination',
      time: null,
      description: null,
      walkTime: '2 min',
      walkDistance: '150m'
    },
    {
      id: routeSteps.length + 2,
      type: 'end',
      location: endStop?.name || 'Destination',
      time: `10:${35 + (route.estimatedTime || 45)} AM`,
      description: endStop?.landmarks?.[0] || null,
      walkTime: null,
      walkDistance: null
    } as any
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--color-brand-primary)] to-[var(--color-brand-accent)]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[var(--color-brand-primary)] to-[var(--color-brand-accent)] text-[var(--color-brand-white)] px-4 py-4">
        <div className="flex items-center justify-between">
          <button 
            onClick={handleBackClick}
            className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-lg font-semibold">Available routes</h1>
          <div className="w-8 h-8"></div>
        </div>
      </div>

      {/* Route Header */}
      <div className="bg-[var(--color-brand-primary)] text-[var(--color-brand-white)] px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">{startStop?.name || 'Start'}</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
            <div className="flex-1 border-t-2 border-dashed border-white/50 mx-2"></div>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-sm font-medium">{endStop?.name || 'Destination'}</span>
          </div>
        </div>
      </div>

      {/* Route Timeline */}
      <div className="bg-[var(--color-brand-white)] flex-1 px-4 py-6">
        <div className="space-y-4">
          {routeSteps.map((step, index) => (
            <div key={step.id} className="flex items-start space-x-4">
              {/* Timeline Icon */}
              <div className="flex flex-col items-center">
                <div className={`w-4 h-4 rounded-full flex-shrink-0 ${
                  step.type === 'start' ? 'bg-green-500' :
                  step.type === 'end' ? 'bg-red-500' :
                  step.type === 'transport' ? 'bg-blue-500' :
                  step.type === 'stop' ? 'bg-[var(--color-brand-primary)]' :
                  'bg-gray-400'
                }`}></div>
                {index < routeSteps.length - 1 && (
                  <div className={`w-0.5 h-12 mt-1 ${
                    step.type === 'walk' ? 'border-l-2 border-dashed border-gray-300' : 'bg-gray-300'
                  }`}></div>
                )}
              </div>

              {/* Step Content */}
              <div className="flex-1 pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-[var(--color-brand-dark)]">{step.location}</h3>
                    {step.description && (
                      <p className="text-sm text-gray-600">{step.description}</p>
                    )}
                    {step.walkTime && step.walkDistance && (
                      <div className="flex items-center space-x-4 mt-1">
                        <div className="flex items-center space-x-1">
                          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-sm text-gray-600">{step.walkTime}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                          </svg>
                          <span className="text-sm text-gray-600">{step.walkDistance}</span>
                        </div>
                      </div>
                    )}
                    {step.type === 'transport' && step.routeNumber && (
                      <div className="flex items-center space-x-2 mt-2">
                        <div className="bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                          {step.routeNumber}
                        </div>
                        <span className="text-sm text-gray-600">Ummoinner</span>
                      </div>
                    )}
                  </div>
                  {step.time && (
                    <span className="text-sm font-medium text-[var(--color-brand-dark)]">{step.time}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View on Map Link */}
        <div className="mt-6 text-center">
          <button className="text-[var(--color-brand-primary)] text-sm font-medium">
            View on map →
          </button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="bg-[var(--color-brand-white)] border-t border-gray-200 px-4 py-3">
        <div className="flex justify-around items-center">
          <button onClick={handleHomeClick} className="flex flex-col items-center space-y-1">
            <div className="w-6 h-6 bg-[var(--color-brand-primary)] rounded flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
              </svg>
            </div>
          </button>
          <button className="flex flex-col items-center space-y-1">
            <div className="w-6 h-6 flex items-center justify-center">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
          </button>
          <button className="flex flex-col items-center space-y-1">
            <div className="w-6 h-6 flex items-center justify-center">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
              </svg>
            </div>
          </button>
          <button className="flex flex-col items-center space-y-1">
            <div className="w-6 h-6 flex items-center justify-center">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
