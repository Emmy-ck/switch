import React from 'react';
import Input from './ui/Input';

interface LocationInputProps {
	label: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	placeholder?: string;
	name?: string;
	id?: string;
	autoComplete?: string;
}

export default function LocationInput({ label, value, onChange, placeholder, name, id, autoComplete }: LocationInputProps) {
	return (
		<Input
			label={label}
			value={value}
			onChange={onChange}
			placeholder={placeholder}
			name={name}
			id={id}
			autoComplete={autoComplete}
			ariaLabel={label}
		/>
	);
}
