import React from 'react';

interface VettaLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const VettaLogo: React.FC<VettaLogoProps> = ({ className = '', size = 'md' }) => {
  const sizeClasses = {
    sm: 'h-5 w-5',
    md: 'h-6 w-6', 
    lg: 'h-8 w-8'
  };

  return (
    <div className={`relative ${sizeClasses[size]} ${className}`}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Gradient Definitions */}
        <defs>
          <linearGradient id="megaphoneGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="50%" stopColor="#A855F7" />
            <stop offset="100%" stopColor="#EC4899" />
          </linearGradient>
          <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F472B6" />
            <stop offset="100%" stopColor="#EC4899" />
          </linearGradient>
        </defs>

        {/* Main Megaphone Body */}
        <path
          d="M15 35 L65 25 L65 45 L70 45 C75 45 80 50 80 55 L80 65 C80 70 75 75 70 75 L65 75 L65 95 L15 85 C10 84 8 79 8 75 L8 45 C8 40 10 35 15 35 Z"
          fill="url(#megaphoneGradient)"
          stroke="none"
        />

        {/* Megaphone Handle */}
        <path
          d="M65 50 L75 60 L75 70 L65 60 Z"
          fill="url(#megaphoneGradient)"
          stroke="none"
        />

        {/* Sound Waves */}
        <path
          d="M85 45 C88 48 88 52 85 55"
          stroke="url(#accentGradient)"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M90 40 C95 45 95 55 90 60"
          stroke="url(#accentGradient)"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />

        {/* Plus Icon */}
        <g transform="translate(75, 25)">
          <circle cx="10" cy="10" r="8" fill="url(#accentGradient)" />
          <path
            d="M10 6 L10 14 M6 10 L14 10"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </g>

        {/* Decorative Sparkles */}
        <g fill="url(#accentGradient)">
          <circle cx="25" cy="25" r="1.5" />
          <circle cx="75" cy="80" r="1" />
          <path d="M35 15 L36 17 L38 16 L36 19 L35 15 Z" />
          <path d="M85 30 L86 32 L88 31 L86 34 L85 30 Z" />
        </g>
      </svg>
    </div>
  );
};

export default VettaLogo;