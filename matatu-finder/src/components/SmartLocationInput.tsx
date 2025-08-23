"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { searchStops, findNearbyStops } from "@/lib/search";
import type { Stop } from "@/lib/types";

type SmartLocationInputProps = {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  id?: string;
  name?: string;
  autoComplete?: string;
  disabled?: boolean;
};

// Local mock reverse geocode similar to the button component
async function reverseGeocode(lat: number, lng: number): Promise<string> {
  await new Promise((r) => setTimeout(r, 800));
  const names = [
    "Umoja Estate",
    "Donholm",
    "Kayole",
    "Embakasi",
    "Kasarani",
    "Westlands",
    "Kilimani",
    "Lavington",
    "Karen",
    "Langata",
  ];
  const pick = names[Math.floor(Math.random() * names.length)];
  return `${pick} (${lat.toFixed(4)}, ${lng.toFixed(4)})`;
}

export default function SmartLocationInput({
  label,
  placeholder,
  value,
  onChange,
  id,
  name,
  autoComplete,
  disabled,
}: SmartLocationInputProps) {
  const [query, setQuery] = useState<string>(value ?? "");
  const [open, setOpen] = useState<boolean>(false);
  const [options, setOptions] = useState<Stop[]>([]);
  const [gpsLoading, setGpsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const containerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(-1); // includes GPS item at index 0

  useEffect(() => {
    setQuery(value ?? "");
  }, [value]);

  useEffect(() => {
    if (!query.trim()) {
      setOptions([]);
      return;
    }
    setOptions(searchStops(query, 8));
  }, [query]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        setActiveIndex(-1);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const showList = useMemo(() => open && (options.length > 0 || true), [open, options.length]);

  const handleUseLocation = async () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser");
      return;
    }
    setError("");
    setGpsLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;
          const labelFromGps = await reverseGeocode(latitude, longitude);
          // Optionally, find nearby stops and append first suggestion text
          const nearby = findNearbyStops({ location: { lat: latitude, lng: longitude }, radiusKm: 3, limit: 1 });
          const finalLabel = nearby.length > 0 ? `${labelFromGps} • Near: ${nearby[0].name}` : labelFromGps;
          onChange(finalLabel);
          setQuery(finalLabel);
          setOpen(false);
          setActiveIndex(-1);
        } catch (e) {
          setError("Failed to resolve your location name");
        } finally {
          setGpsLoading(false);
        }
      },
      (err) => {
        const code = err.code;
        const msg =
          code === err.PERMISSION_DENIED
            ? "Permission denied. Allow location access and try again."
            : code === err.POSITION_UNAVAILABLE
            ? "Position unavailable. Check GPS settings."
            : code === err.TIMEOUT
            ? "Location request timed out. Try again."
            : "Unknown GPS error.";
        setError(msg);
        setGpsLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 300000 }
    );
  };

  const totalItems = 1 + options.length; // GPS item + options

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!open && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
      setOpen(true);
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % totalItems);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev - 1 + totalItems) % totalItems);
    } else if (e.key === "Enter") {
      if (!open) return;
      e.preventDefault();
      if (activeIndex === 0) {
        void handleUseLocation();
      } else if (activeIndex > 0) {
        const sel = options[activeIndex - 1];
        if (sel) {
          onChange(sel.name);
          setQuery(sel.name);
          setOpen(false);
          setActiveIndex(-1);
        }
      }
    } else if (e.key === "Escape") {
      setOpen(false);
      setActiveIndex(-1);
    }
  };

  return (
    <div className="w-full" ref={containerRef}>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="relative">
        <input
          ref={inputRef}
          id={id}
          name={name}
          type="text"
          className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-300"
          placeholder={placeholder}
          value={query}
          autoComplete={autoComplete}
          onFocus={() => setOpen(true)}
          onChange={(e) => {
            setQuery(e.target.value);
            onChange(e.target.value);
          }}
          onKeyDown={handleKeyDown}
          aria-autocomplete="list"
          aria-expanded={open}
          aria-controls={id ? `${id}-listbox` : undefined}
          disabled={disabled}
        />
        <button
          type="button"
          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          onClick={handleUseLocation}
          aria-label="Use my current location"
          disabled={disabled || gpsLoading}
        >
          {gpsLoading ? (
            <span className="inline-block w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
        </button>
      </div>

      {error && (
        <div role="alert" aria-live="polite" className="mt-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded p-2">
          {error}
        </div>
      )}

      {showList && (
        <ul
          id={id ? `${id}-listbox` : undefined}
          role="listbox"
          className="mt-2 max-h-64 overflow-auto border rounded-md bg-white shadow"
        >
          <li
            role="option"
            aria-selected={activeIndex === 0}
            className={`px-3 py-2 flex items-center gap-2 cursor-pointer ${
              activeIndex === 0 ? "bg-gray-100" : "hover:bg-gray-50"
            }`}
            onMouseEnter={() => setActiveIndex(0)}
            onClick={() => void handleUseLocation()}
          >
            {gpsLoading ? (
              <span className="inline-block w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            )}
            <span>Use my current location</span>
          </li>
          {options.map((o, idx) => (
            <li
              key={o.id}
              role="option"
              aria-selected={activeIndex === idx + 1}
              className={`px-3 py-2 cursor-pointer ${
                activeIndex === idx + 1 ? "bg-gray-100" : "hover:bg-gray-50"
              }`}
              onMouseEnter={() => setActiveIndex(idx + 1)}
              onClick={() => {
                onChange(o.name);
                setQuery(o.name);
                setOpen(false);
                setActiveIndex(-1);
              }}
            >
              <div className="text-sm font-medium">{o.name}</div>
              {o.landmarks && o.landmarks.length > 0 && (
                <div className="text-xs text-gray-500 truncate">{o.landmarks.join(", ")}</div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
