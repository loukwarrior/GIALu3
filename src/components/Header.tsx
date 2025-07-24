'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Heart, Menu, X, User, Home, Play, BookOpen } from 'lucide-react';
import { useApp } from '@/context/AppContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const pathname = usePathname();
  const { state } = useApp();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const navigation = [
    { name: 'Inicio', href: '/', icon: Home },
    { name: 'Clases', href: '/clases', icon: Play },
    { name: 'Mis Clases', href: '/mis-clases', icon: BookOpen },
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
              <span className="text-primary-700 font-accent text-xl font-bold">G</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-2xl font-accent font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                GIA
              </h1>
              <p className="text-xs text-text-secondary -mt-1">Wellness</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive(item.href)
                      ? 'bg-primary-100 text-primary-700 shadow-sm'
                      : 'text-text-secondary hover:text-primary-600 hover:bg-primary-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
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
            onClick={() => setIsMenuOpen(!isMenuOpen)}
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
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                      isActive(item.href)
                        ? 'bg-primary-100 text-primary-700'
                        : 'text-text-secondary hover:text-primary-600 hover:bg-primary-50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
              
              <div className="border-t border-primary-100/50 pt-4 mt-4">
                <Link
                  href="/mis-clases"
                  onClick={() => setIsMenuOpen(false)}
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