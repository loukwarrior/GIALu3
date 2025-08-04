'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Heart, Menu, X, User } from 'lucide-react';
import { useApp } from '@/context/AppContext';

type DropdownItem = {
  name: string;
  href: string;
};

type DropdownSection = {
  subtitle: string;
  items: DropdownItem[];
};

type NavigationItem = {
  name: string;
  href: string;
  icon?: React.ElementType;
  dropdown?: Record<string, DropdownSection>;
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState<string | null>(null);
  const pathname = usePathname();
  const { state } = useApp();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const navigation: NavigationItem[] = [
    { name: 'Inicio', href: '/' },
    { 
      name: 'Yoga', 
      href: '/yoga',
      dropdown: {
        'CLASSES': {
          subtitle: 'Encuentra la clase perfecta de yoga para tu estado de ánimo.',
          items: [
            { name: 'Todas las Clases de Yoga', href: '/clases-finder?category=yoga' },
            { name: 'Hatha', href: '/clases-finder?category=yoga&subcategory=hatha' },
            { name: 'Vinyasa', href: '/clases-finder?category=yoga&subcategory=vinyasa' },
            { name: 'Restaurativo', href: '/clases-finder?category=yoga&subcategory=restaurativo' },
            { name: 'Principiante', href: '/clases-finder?category=yoga&level=principiante' },
            { name: 'Intermedio', href: '/clases-finder?category=yoga&level=intermedio' },
            { name: 'Avanzado', href: '/clases-finder?category=yoga&level=avanzado' }
          ]
        }
      }
    },
    { 
      name: 'Fitness', 
      href: '/fitness',
      dropdown: {
        'CLASSES': {
          subtitle: 'Encuentra el entrenamiento perfecto para tu nivel de energía.',
          items: [
            { name: 'Todas las Clases de Fitness', href: '/clases-finder?category=fitness' },
            { name: 'Pilates', href: '/clases-finder?category=fitness&subcategory=pilates' },
            { name: 'HIIT', href: '/clases-finder?category=fitness&subcategory=hiit' },
            { name: 'Cardio', href: '/clases-finder?category=fitness&subcategory=cardio' },
            { name: 'Principiante', href: '/clases-finder?category=fitness&level=principiante' },
            { name: 'Intermedio', href: '/clases-finder?category=fitness&level=intermedio' },
            { name: 'Avanzado', href: '/clases-finder?category=fitness&level=avanzado' }
          ]
        }
      }
    },
    { 
      name: 'Wellness', 
      href: '/wellness',
      dropdown: {
        'CLASSES': {
          subtitle: 'Encuentra paz y equilibrio con nuestras clases de bienestar.',
          items: [
            { name: 'Todas las Clases de Wellness', href: '/clases-finder?category=wellness' },
            { name: 'Meditación', href: '/clases-finder?category=wellness&subcategory=meditación' },
            { name: 'Breathwork', href: '/clases-finder?category=wellness&subcategory=breathwork' },
            { name: 'Mindfulness', href: '/clases-finder?category=wellness&subcategory=mindfulness' },
            { name: 'Principiante', href: '/clases-finder?category=wellness&level=principiante' },
            { name: 'Intermedio', href: '/clases-finder?category=wellness&level=intermedio' }
          ]
        }
      }
    },
    { name: 'Mi Progreso', href: '/mi-progreso' },
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-primary-100/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center space-x-2 group"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-primary-200 to-secondary-200 rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
              <span className="text-primary-700 font-logo text-xl font-bold">G</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-2xl font-logo font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                GIA
              </h1>
              <p className="text-xs text-text-secondary -mt-1 font-sans">Wellness</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => {
              const hasDropdown = item.dropdown;
              
              if (hasDropdown) {
                return (
                  <div key={item.name} className="relative group">
                    <button
                      className={`flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                        isActive(item.href)
                          ? 'bg-primary-100 text-primary-700 shadow-sm'
                          : 'text-text-secondary hover:text-primary-600 hover:bg-primary-50'
                      }`}
                    >
                      <span>{item.name}</span>
                      <svg className="w-4 h-4 ml-1 group-hover:rotate-180 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    
                    {/* Dropdown Menu - Left Half Style */}
                    <div className="absolute top-full left-0 mt-2 w-[50vw] bg-white rounded-2xl shadow-2xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
                      {/* Invisible bridge to keep dropdown open */}
                      <div className="absolute -top-2 left-0 right-0 h-2"></div>
                      {item.dropdown && Object.entries(item.dropdown).map(([sectionName, section]) => (
                        <div key={sectionName} className="p-6">
                          {/* Header Section */}
                          <div className="mb-6 border-b border-gray-100 pb-4">
                            <h3 className="font-bold text-lg text-gray-900 mb-2">
                              {sectionName}
                            </h3>
                            <p className="text-sm text-gray-600 leading-relaxed">
                              {section.subtitle}
                            </p>
                          </div>
                          
                          {/* Items List - Vertical Layout */}
                          <div className="space-y-1">
                            {section.items.map((dropdownItem: DropdownItem) => (
                              <Link
                                key={dropdownItem.name}
                                href={dropdownItem.href}
                                className="group/item flex items-center px-4 py-3 rounded-lg hover:bg-gray-50 transition-all duration-200"
                              >
                                <span className="text-gray-700 group-hover/item:text-primary-700 font-medium transition-colors duration-200">
                                  {dropdownItem.name}
                                </span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              }
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive(item.href)
                      ? 'bg-primary-100 text-primary-700 shadow-sm'
                      : 'text-text-secondary hover:text-primary-600 hover:bg-primary-50'
                  }`}
                >
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/mis-clases"
              className="relative p-2 text-text-secondary hover:text-primary-600 transition-colors duration-200"
            >
              <Heart className="w-5 h-5" />
              {isClient && state.favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-secondary-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {state.favorites.length}
                </span>
              )}
            </Link>
            
            <button className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-text-secondary hover:text-primary-600 transition-colors duration-200">
              <User className="w-4 h-4" />
              <span>Perfil</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => {
              setIsMenuOpen(!isMenuOpen);
              setMobileDropdownOpen(null);
            }}
            className="md:hidden p-2 text-text-secondary hover:text-primary-600 transition-colors duration-200"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-primary-100/50 bg-white/95 backdrop-blur-sm">
            <nav className="flex flex-col space-y-2">
              {navigation.map((item) => {
                const hasDropdown = item.dropdown;
                const isDropdownOpen = mobileDropdownOpen === item.name;
                
                if (hasDropdown) {
                  return (
                    <div key={item.name} className="space-y-2">
                      <button
                        onClick={() => setMobileDropdownOpen(isDropdownOpen ? null : item.name)}
                        className={`flex items-center justify-between w-full px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                          isActive(item.href)
                            ? 'bg-primary-100 text-primary-700'
                            : 'text-text-secondary hover:text-primary-600 hover:bg-primary-50'
                        }`}
                      >
                        <span>{item.name}</span>
                        <svg 
                          className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      
                      {isDropdownOpen && (
                        <div className="pl-4 space-y-1">
                          {item.dropdown && Object.entries(item.dropdown).map(([sectionName, section]) => (
                            <div key={sectionName} className="py-2">
                              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                                {sectionName}
                              </h4>
                              {section.items.map((dropdownItem: DropdownItem) => (
                                <Link
                                  key={dropdownItem.name}
                                  href={dropdownItem.href}
                                  onClick={() => {
                                    setIsMenuOpen(false);
                                    setMobileDropdownOpen(null);
                                  }}
                                  className="block py-2 px-3 text-sm text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors duration-200"
                                >
                                  {dropdownItem.name}
                                </Link>
                              ))}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }
                
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => {
                      setIsMenuOpen(false);
                      setMobileDropdownOpen(null);
                    }}
                    className={`flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                      isActive(item.href)
                        ? 'bg-primary-100 text-primary-700'
                        : 'text-text-secondary hover:text-primary-600 hover:bg-primary-50'
                    }`}
                  >
                    <span>{item.name}</span>
                  </Link>
                );
              })}
              
              <div className="border-t border-primary-100/50 pt-4 mt-4">
                <Link
                  href="/mis-clases"
                  onClick={() => {
                    setIsMenuOpen(false);
                    setMobileDropdownOpen(null);
                  }}
                  className="flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium text-text-secondary hover:text-primary-600 hover:bg-primary-50 transition-all duration-200"
                >
                  <Heart className="w-5 h-5" />
                  <span>Mis Favoritos</span>
                  {isClient && state.favorites.length > 0 && (
                    <span className="bg-secondary-500 text-white text-xs rounded-full px-2 py-1">
                      {state.favorites.length}
                    </span>
                  )}
                </Link>
                
                <button className="flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium text-text-secondary hover:text-primary-600 hover:bg-primary-50 transition-all duration-200 w-full">
                  <User className="w-5 h-5" />
                  <span>Perfil</span>
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header; 