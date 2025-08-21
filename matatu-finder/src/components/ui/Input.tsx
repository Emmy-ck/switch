import React, { forwardRef } from 'react';

interface InputProps {
  label?: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  name?: string;
  id?: string;
  autoComplete?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  placeholder,
  type = 'text',
  value,
  onChange,
  onBlur,
  error,
  disabled = false,
  required = false,
  className = '',
  name,
  id,
  autoComplete,
  size = 'md',
}, ref) => {
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2.5 text-base',
    lg: 'px-4 py-3 text-lg',
  } as const;

  const baseClasses = 'w-full border rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0';
  const stateClasses = error 
    ? 'border-[var(--color-brand-primary)] focus:ring-[var(--color-brand-primary)] focus:border-[var(--color-brand-primary)]' 
    : 'border-[var(--color-brand-accent)] focus:ring-[var(--color-brand-primary)] focus:border-[var(--color-brand-primary)]';
  const disabledClasses = disabled ? 'bg-[var(--color-brand-light)] cursor-not-allowed opacity-60' : 'bg-[var(--color-brand-white)]';
  
  const classes = `${baseClasses} ${stateClasses} ${disabledClasses} ${sizeClasses[size]} ${className}`;

  return (
    <div className="w-full">
      {label && (
        <label 
          htmlFor={id || name} 
          className="block text-sm font-medium text-[var(--color-brand-dark)] mb-2"
        >
          {label}
          {required && <span className="text-[var(--color-brand-primary)] ml-1">*</span>}
        </label>
      )}
      
      <input
        ref={ref}
        type={type}
        id={id || name}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        autoComplete={autoComplete}
        className={classes}
      />
      
      {error && (
        <p className="mt-1 text-sm text-[var(--color-brand-primary)] fade-in">
          {error}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
