import React from 'react';

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'spinner' | 'dots' | 'pulse';
  text?: string;
  className?: string;
}

const Loading: React.FC<LoadingProps> = ({
  size = 'md',
  variant = 'spinner',
  text,
  className = '',
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12',
  } as const;

  const renderSpinner = () => (
    <div className={`${sizeClasses[size]} border-2 border-[var(--color-brand-light)] border-t-[var(--color-brand-primary)] rounded-full animate-spin`} />
  );

  const renderDots = () => (
    <div className="flex space-x-1">
      <div className="w-2 h-2 bg-[var(--color-brand-primary)] rounded-full animate-bounce" />
      <div className="w-2 h-2 bg-[var(--color-brand-primary)] rounded-full animate-bounce delay-100" />
      <div className="w-2 h-2 bg-[var(--color-brand-primary)] rounded-full animate-bounce delay-200" />
    </div>
  );

  const renderPulse = () => (
    <div className={`${sizeClasses[size]} bg-[var(--color-brand-primary)] rounded-full animate-pulse`} />
  );

  const renderLoader = () => {
    switch (variant) {
      case 'dots':
        return renderDots();
      case 'pulse':
        return renderPulse();
      default:
        return renderSpinner();
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center space-y-2 ${className}`}>
      {renderLoader()}
      {text && (
        <p className="text-sm text-[var(--color-brand-dark)] font-medium fade-in">
          {text}
        </p>
      )}
    </div>
  );
};

export default Loading;
