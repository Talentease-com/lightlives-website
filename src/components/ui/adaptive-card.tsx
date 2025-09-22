'use client';
import React, { ReactNode } from 'react';
import { GlowCard } from './spotlight-card';
import { GlassCard } from './glass-card';
import { useDeviceCapabilities } from '@/hooks/useDeviceCapabilities';

interface AdaptiveCardProps {
  children: ReactNode;
  className?: string;
  // GlowCard specific props
  glowColor?: 'blue' | 'purple' | 'green' | 'red' | 'orange';
  // GlassCard specific props
  variant?: 'default' | 'subtle' | 'strong';
  // Common props
  size?: 'sm' | 'md' | 'lg';
  customSize?: boolean;
  // Control behavior
  forceComponent?: 'glow' | 'glass';
  enableFallback?: boolean; // Show loading state while detecting
}

const AdaptiveCard: React.FC<AdaptiveCardProps> = ({
  children,
  className = '',
  glowColor = 'blue',
  variant = 'default',
  size = 'md',
  customSize = false,
  forceComponent,
  enableFallback = true,
}) => {
  const { isLowEndDevice, isLoading } = useDeviceCapabilities();

  // Get size classes for fallback loading state
  const getSizeClasses = () => {
    if (customSize) return '';
    const sizeMap = {
      sm: 'w-48 h-64',
      md: 'w-64 h-80',
      lg: 'w-80 h-96'
    };
    return sizeMap[size];
  };

  // Show loading fallback while detecting device capabilities
  if (isLoading && enableFallback) {
    return (
      <div
        className={`
          ${getSizeClasses()}
          ${!customSize ? 'aspect-[3/4]' : ''}
          relative 
          grid 
          grid-rows-[1fr_auto] 
          bg-white/5
          backdrop-blur-[3px]
          border 
          border-white/10
          p-4 
          gap-4
          animate-pulse
          ${className}
        `}
      >
        {/* <div className="flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-white/20 border-t-white/60 animate-spin" />
        </div> */}
        <div className="space-y-2">
          <div className="h-4 bg-white/10 rounded animate-pulse" />
          <div className="h-3 bg-white/5 rounded animate-pulse w-3/4" />
        </div>
      </div>
    );
  }

  // Determine which component to use
  const shouldUseGlass = forceComponent === 'glass' || 
    (forceComponent !== 'glow' && (isLowEndDevice || isLoading));

  // Render appropriate component
  if (shouldUseGlass) {
    return (
      <GlassCard
        variant={variant}
        size={size}
        customSize={customSize}
        className={className}
      >
        {children}
      </GlassCard>
    );
  }

  return (
    <GlowCard
      glowColor={glowColor}
      size={size}
      customSize={customSize}
      className={className}
    >
      {children}
    </GlowCard>
  );
};

export { AdaptiveCard };
