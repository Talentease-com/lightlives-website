'use client';
import { useState, useEffect } from 'react';

// Extend Navigator interface for experimental APIs
declare global {
  interface Navigator {
    deviceMemory?: number;
    connection?: {
      effectiveType?: '2g' | 'slow-2g' | '3g' | '4g' | '5g';
      downlink?: number;
      rtt?: number;
    };
  }
}

interface DeviceCapabilities {
  isLowEndDevice: boolean;
  isLoading: boolean;
  isMobile: boolean;
  hardwareConcurrency: number;
  deviceMemory: number | null;
  prefersReducedMotion: boolean;
}

export const useDeviceCapabilities = (): DeviceCapabilities => {
  const [capabilities, setCapabilities] = useState<DeviceCapabilities>({
    isLowEndDevice: false,
    isLoading: true,
    isMobile: false,
    hardwareConcurrency: 0,
    deviceMemory: null,
    prefersReducedMotion: false,
  });

  useEffect(() => {
    const detectCapabilities = () => {
      // Check if mobile device
      const userAgent = navigator.userAgent.toLowerCase();
      const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
      
      // Get hardware concurrency (CPU cores)
      const hardwareConcurrency = navigator.hardwareConcurrency || 1;
      
      // Get device memory if available
      const deviceMemory = navigator.deviceMemory || null;
      
      // Check for reduced motion preference
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      // Determine if device is low-end based on multiple factors
      let lowEndScore = 0;
      
      // Mobile devices get a penalty
      if (isMobile) lowEndScore += 3;
      
      // Low CPU cores
      if (hardwareConcurrency <= 2) lowEndScore += 2;
      
      // Low memory (if available)
      if (deviceMemory && deviceMemory <= 2) lowEndScore += 2;
      
      // User prefers reduced motion
      if (prefersReducedMotion) lowEndScore += 1;
      
      // Check connection quality if available
      if (navigator.connection) {
        const connection = navigator.connection;
        if (connection.effectiveType === '2g' || connection.effectiveType === 'slow-2g') {
          lowEndScore += 2;
        } else if (connection.effectiveType === '3g') {
          lowEndScore += 1;
        }
      }
      
      const isLowEndDevice = lowEndScore >= 3;
      
      setCapabilities({
        isLowEndDevice,
        isLoading: false,
        isMobile,
        hardwareConcurrency,
        deviceMemory,
        prefersReducedMotion,
      });
    };

    // Add a small delay to ensure DOM is ready
    const timeoutId = setTimeout(detectCapabilities, 100);
    
    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    // Listen for changes in reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const handleChange = (event: MediaQueryListEvent) => {
      setCapabilities(prev => ({
        ...prev,
        prefersReducedMotion: event.matches,
        isLowEndDevice: prev.isLowEndDevice || event.matches,
      }));
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return capabilities;
};
