import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent' | 'light' | 'dark' | 'white';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
}) => {
  const baseClasses = 'inline-flex items-center font-medium rounded-full';
  
  const variantClasses = {
    primary: 'bg-[var(--color-brand-primary)] text-[var(--color-brand-white)]',
    secondary: 'bg-[var(--color-brand-dark)] text-[var(--color-brand-white)]',
    accent: 'bg-[var(--color-brand-accent)] text-[var(--color-brand-white)]',
    light: 'bg-[var(--color-brand-light)] text-[var(--color-brand-dark)]',
    dark: 'bg-[var(--color-brand-dark)] text-[var(--color-brand-white)]',
    white: 'bg-[var(--color-brand-white)] text-[var(--color-brand-dark)] border border-[var(--color-brand-light)]',
  } as const;
  
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base',
  } as const;
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;
  
  return (
    <span className={classes}>
      {children}
    </span>
  );
};

export default Badge;
