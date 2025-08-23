"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Stop } from "@/lib/types";
import { searchStops } from "@/lib/search";

type Props = {
	label: string;
	placeholder?: string;
	value: Stop | null;
	onChange: (stop: Stop | null) => void;
};

export default function AutocompleteInput({ label, placeholder, value, onChange }: Props) {
	const [query, setQuery] = useState<string>("");
	const [open, setOpen] = useState<boolean>(false);
	const [options, setOptions] = useState<Stop[]>([]);
	const containerRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (!query) {
			setOptions([]);
			return;
		}
		setOptions(searchStops(query, 6));
	}, [query]);

	useEffect(() => {
		function handleClickOutside(e: MouseEvent) {
			if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
				setOpen(false);
			}
		}
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	useEffect(() => {
		if (value) setQuery(value.name);
	}, [value]);

	const showList = useMemo(() => open && options.length > 0, [open, options]);

	return (
		<div className="w-full" ref={containerRef}>
			<label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
			<input
				type="text"
				className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-300"
				placeholder={placeholder}
				value={query}
				onFocus={() => setOpen(true)}
				onChange={(e) => {
					setQuery(e.target.value);
					onChange(null);
				}}
			/>
			{showList && (
				<ul className="mt-2 max-h-56 overflow-auto border rounded-md bg-white shadow">
					{options.map((o) => (
						<li
							key={o.id}
							className="px-3 py-2 hover:bg-gray-50 cursor-pointer"
							onClick={() => {
								onChange(o);
								setQuery(o.name);
								setOpen(false);
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


