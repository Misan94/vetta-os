import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ 
  size = 'md', 
  className = '', 
  showText = false 
}) => {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8', 
    lg: 'h-12 w-12',
    xl: 'h-16 w-16'
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {/* Logo Image */}
      <img 
        src="/vetta-logo.svg" 
        alt="Vetta OS Logo" 
        className={`${sizeClasses[size]} object-contain`}
        onError={(e) => {
          // Fallback to PNG if SVG fails
          const target = e.target as HTMLImageElement;
          if (target.src.includes('.svg')) {
            target.src = '/vetta-logo.png';
          }
        }}
      />
      
      {/* Optional Text */}
      {showText && (
        <span className={`font-semibold text-foreground ${
          size === 'xl' ? 'text-3xl' : 
          size === 'lg' ? 'text-2xl' : 
          size === 'md' ? 'text-lg' : 
          'text-base'
        }`}>
          Vetta OS
        </span>
      )}
    </div>
  );
};

export default Logo;