'use client';
import React, { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'subtle' | 'strong';
  size?: 'sm' | 'md' | 'lg';
  customSize?: boolean; // When true, ignores size prop and uses className for sizing
}

const variantMap = {
  default: {
    backdrop: 'backdrop-blur-[8px]',
    background: 'bg-white/10',
    border: 'border border-white/20',
    shadow: 'shadow-lg'
  },
  subtle: {
    backdrop: 'backdrop-blur-[5px]',
    background: 'bg-white/5',
    border: 'border border-white/10',
    shadow: 'shadow-md'
  },
  strong: {
    backdrop: 'backdrop-blur-[12px]',
    background: 'bg-white/15',
    border: 'border border-white/30',
    shadow: 'shadow-xl'
  }
};

const sizeMap = {
  sm: 'w-48 h-64',
  md: 'w-64 h-80',
  lg: 'w-80 h-96'
};

const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  className = '', 
  variant = 'default',
  size = 'md',
  customSize = false
}) => {
  const { backdrop, background, border, shadow } = variantMap[variant];

  // Determine sizing
  const getSizeClasses = () => {
    if (customSize) {
      return ''; // Let className handle sizing
    }
    return sizeMap[size];
  };

  return (
    <div
      className={`
        ${getSizeClasses()}
        ${!customSize ? 'aspect-[3/4]' : ''}
        relative 
        grid 
        grid-rows-[1fr_auto] 
        ${backdrop}
        ${background}
        ${border}
        ${shadow}
        p-4 
        gap-4
        transition-all
        duration-200
        hover:bg-white/20
        hover:border-white/30
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export { GlassCard }
