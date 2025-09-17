'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import SwooshButton from '@/components/ui/swoosh-button';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { path: '/', label: 'HOME' },
    {
      label: 'ABOUT US',
      dropdown: [
        { path: '/about/our-story', label: 'Our Story' },
        { path: '/about/team', label: 'Our Team' },
        { path: '/about/mission', label: 'Mission & Vision' },
      ]
    },
    {
      label: 'SUPPORT US',
      dropdown: [

        { path: '/support/volunteer', label: 'Volunteer' },
        { path: '/support/events', label: 'Events' },
        { path: '/support/partnerships', label: 'Partnerships' },
      ]
    },
    { path: '/contact', label: 'CONTACT US' },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const isActive = (path: string) => pathname === path;

  const handleDropdownToggle = (label: string) => {
    setActiveDropdown(activeDropdown === label ? null : label);
  };

  return (
    <header className="bg-primary sticky top-0 z-50">
      <div className="bg-tertiary text-secondary py-2">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between items-center text-lg">
            <div />
            <div className="flex items-center space-x-4">
              <Link href="/news" className="relative flex items-center group">
                <span>Latest News</span>
                <span className="absolute left-1/2 -translate-x-1/2 -bottom-1 h-0.5 w-0 group-hover:w-full bg-secondary transition-all duration-300 origin-center"></span>
              </Link>
              <Link href="/sponsors" className="relative flex items-center group">
                <span>For Sponsors</span>
                <span className="absolute left-1/2 -translate-x-1/2 -bottom-1 h-0.5 w-0 group-hover:w-full bg-secondary transition-all duration-300 origin-center"></span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-[100px]">
          {/* Logo - Hidden on lg+ screens when not scrolled, always visible on mobile, always visible on non-landing pages */}
          <Link href="/" className={`flex items-center transition-opacity duration-300 ${
            pathname !== '/'
              ? 'lg:opacity-100 lg:pointer-events-auto opacity-100'
              : 'lg:opacity-0 lg:pointer-events-none opacity-100' + (isScrolled ? ' lg:opacity-100 lg:pointer-events-auto' : '')
          }`}>
            <div className="w-18 h-18 relative">
              <Image 
                src="/light-lives-logo.png"
                alt="Light Lives Logo" 
                width={72}
                height={72}
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-4" ref={dropdownRef}>
            {/* Logo positioned above navbar, centered horizontally in orange div */}
            {pathname === '/' && (
              <div className={`absolute top-16 left-28 transform -translate-x-1/2 transition-opacity duration-300 ${isScrolled ? 'hidden' : 'block'}`}> 
                <Image
                  src="/light-lives-logo.png"
                  alt="LightLives Logo"
                  width={128}
                  height={128}
                  className="object-contain drop-shadow-xl"
                  priority
                />
              </div>
            )}

            {navItems.map((item) => (
              <div key={item.label || item.path} className="relative">
                {item.dropdown ? (
                  <div className="group">
                    <button 
                      onClick={() => handleDropdownToggle(item.label)}
                      className="flex items-center px-4 py-2 text-white font-bold text-sm hover:text-primary-100 transition-colors duration-200 relative"
                    >
                      {item.label}
                      <ChevronDown className="ml-1 h-4 w-4" />
                      {/* Active indicator line */}
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                    </button>
                    {activeDropdown === item.label && (
                      <div className="absolute top-full left-0 w-56 bg-white rounded-md shadow-xl border border-gray-100 z-50 mt-1">
                        <div className="py-2">
                          {item.dropdown.map((subItem) => (
                            <Link
                              key={subItem.path}
                              href={subItem.path}
                              className={`block px-4 py-3 text-sm font-bold transition-colors duration-200 ${
                                isActive(subItem.path)
                                  ? 'text-primary bg-primary-50 border-r-4 border-primary'
                                  : 'text-gray-700 hover:text-primary hover:bg-primary-50'
                              }`}
                            >
                              {subItem.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.path}
                    className={`relative px-4 py-2 text-white font-bold text-sm transition-colors duration-200 group ${
                      isActive(item.path)
                        ? 'text-white'
                        : 'hover:text-primary-100'
                    }`}
                  >
                    {item.label}
                    {/* Active indicator line */}
                    <div className={`absolute bottom-0 left-0 right-0 h-1 bg-white transition-opacity duration-200 ${
                      isActive(item.path) ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                    }`}></div>
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Sponsor Button - Desktop */}
          <div className="hidden lg:block">

            <SwooshButton className="bg-red-800 font-bold" href="/sponsor" text='SPONSOR' />
          </div>
          

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-md text-white hover:text-primary-100 hover:bg-primary-600"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-primary-300 bg-primary-500">
            <div className="space-y-2">
              {navItems.map((item) => (
                <div key={item.label || item.path}>
                  {item.dropdown ? (
                    <div>
                      <button
                        onClick={() => handleDropdownToggle(item.label)}
                        className="flex items-center justify-between w-full px-4 py-3 text-white font-bold hover:text-primary-100 hover:bg-primary-600 transition-colors duration-200 rounded-md"
                      >
                        {item.label}
                        <ChevronDown className={`h-4 w-4 transition-transform ${
                          activeDropdown === item.label ? 'rotate-180' : ''
                        }`} />
                      </button>
                      {activeDropdown === item.label && (
                        <div className="ml-4 mt-2 space-y-1 bg-primary-400 rounded-md">
                          {item.dropdown.map((subItem) => (
                            <Link
                              key={subItem.path}
                              href={subItem.path}
                              onClick={() => setIsMenuOpen(false)}
                              className={`block px-4 py-3 text-sm font-bold transition-colors duration-200 rounded-md ${
                                isActive(subItem.path)
                                  ? 'text-white bg-primary-600'
                                  : 'text-white hover:text-primary-100 hover:bg-primary-600'
                              }`}
                            >
                              {subItem.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.path}
                      onClick={() => setIsMenuOpen(false)}
                      className={`block px-4 py-3 font-bold transition-colors duration-200 rounded-md ${
                        isActive(item.path)
                          ? 'text-white bg-primary-600'
                          : 'text-white hover:text-primary-100 hover:bg-primary-600'
                      }`}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
              
              {/* Mobile Sponsor Button */}
              <div className="pt-4 border-t border-primary-300">
                <SwooshButton className="bg-red-800 font-bold" href="/sponsor" text='SPONSOR' />
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;