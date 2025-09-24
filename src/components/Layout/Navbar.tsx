'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, ChevronDown, Home, Users, Heart, Phone } from 'lucide-react';
import Image from 'next/image';
import SwooshButton from '@/components/ui/swoosh-button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

const Navbar: React.FC = () => {
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

  // Flattened navigation items for mobile drawer
  const mobileNavItems = [
    { path: '/', label: 'Home', icon: Home, category: 'Navigation' },
    { path: '/about/our-story', label: 'Our Story', icon: Users, category: 'About Us' },
    { path: '/about/team', label: 'Our Team', icon: Users, category: 'About Us' },
    { path: '/about/mission', label: 'Mission & Vision', icon: Users, category: 'About Us' },
    { path: '/support/volunteer', label: 'Volunteer', icon: Heart, category: 'Support Us' },
    { path: '/support/events', label: 'Events', icon: Heart, category: 'Support Us' },
    { path: '/support/partnerships', label: 'Partnerships', icon: Heart, category: 'Support Us' },
    { path: '/contact', label: 'Contact Us', icon: Phone, category: 'Navigation' },
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
          

          {/* Mobile Menu Drawer Trigger */}
          <Drawer shouldScaleBackground={true} setBackgroundColorOnScale={false}>
            <DrawerTrigger asChild>
              <button className="lg:hidden p-2 rounded-md text-white hover:text-primary-100 hover:bg-primary-600 transition-colors duration-200">
                <Menu className="h-6 w-6" />
              </button>
            </DrawerTrigger>
            <DrawerContent className="bg-primary border-t-4 border-primary-600 h-[50vh]">
              <DrawerHeader>
                <VisuallyHidden>
                  <DrawerTitle>Site Navigation</DrawerTitle>
                </VisuallyHidden>
              </DrawerHeader>
              
              {/* Navigation Categories */}
              <div className="px-4 pb-6 flex-1 overflow-y-auto">
                {['Navigation', 'About Us', 'Support Us'].map((category) => (
                  <div key={category} className="mb-6">
                    <h3 className="text-sm font-bold text-white/70 uppercase tracking-wider mb-3 px-2">
                      {category}
                    </h3>
                    <div className="space-y-1">
                      {mobileNavItems
                        .filter(item => item.category === category)
                        .map((item) => {
                          const IconComponent = item.icon;
                          return (
                            <DrawerClose key={item.path} asChild>
                              <Link
                                href={item.path}
                                className={`flex items-center px-3 py-3 rounded-lg text-left transition-all duration-200 group ${
                                  isActive(item.path)
                                    ? 'bg-white text-primary shadow-md'
                                    : 'text-white hover:bg-white/10 hover:text-white active:bg-white/20'
                                }`}
                              >
                                <IconComponent className={`h-5 w-5 mr-3 transition-colors ${
                                  isActive(item.path) 
                                    ? 'text-primary' 
                                    : 'text-white/70 group-hover:text-white'
                                }`} />
                                <span className="font-medium">{item.label}</span>
                                {isActive(item.path) && (
                                  <div className="ml-auto h-2 w-2 bg-primary rounded-full"></div>
                                )}
                              </Link>
                            </DrawerClose>
                          );
                        })}
                    </div>
                  </div>
                ))}
                
                {/* Sponsor Button in Drawer */}
                <div className="mt-6 pt-4 border-t border-white/20">
                  <DrawerClose asChild>
                    <div className="px-2">
                      <SwooshButton 
                        className="bg-red-800 font-bold w-full text-center" 
                        href="/sponsor" 
                        text="SPONSOR NOW" 
                      />
                    </div>
                  </DrawerClose>
                </div>
              </div>
            </DrawerContent>
          </Drawer>
        </div>


      </div>
    </header>
  );
};

export default Navbar;