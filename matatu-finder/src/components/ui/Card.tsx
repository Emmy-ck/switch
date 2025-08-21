import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  animated?: boolean;
  shadow?: 'sm' | 'md' | 'lg';
}

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface CardBodyProps {
  children: React.ReactNode;
  className?: string;
}

interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  animated = true,
  shadow = 'md' 
}) => {
  const shadowClasses = {
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
  };
  
  const animationClass = animated ? 'hover:shadow-lg transition-shadow duration-300' : '';
  const classes = `bg-white rounded-xl border border-brand-light ${shadowClasses[shadow]} ${animationClass} ${className}`;
  
  return (
    <div className={classes}>
      {children}
    </div>
  );
};

const CardHeader: React.FC<CardHeaderProps> = ({ children, className = '' }) => (
  <div className={`px-6 py-4 border-b border-brand-light ${className}`}>
    {children}
  </div>
);

const CardBody: React.FC<CardBodyProps> = ({ children, className = '' }) => (
  <div className={`px-6 py-4 ${className}`}>
    {children}
  </div>
);

const CardFooter: React.FC<CardFooterProps> = ({ children, className = '' }) => (
  <div className={`px-6 py-4 border-t border-brand-light bg-brand-light/30 ${className}`}>
    {children}
  </div>
);

export { Card, CardHeader, CardBody, CardFooter };
export default Card;
