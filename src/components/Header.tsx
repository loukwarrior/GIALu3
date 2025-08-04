'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Heart, Menu, X, User, Home, Play, BookOpen, Users, Sparkles } from 'lucide-react';
import { useApp } from '@/context/AppContext';

type DropdownItem = {
  name: string;
  href: string;
  description: string;
};

type NavigationItem = {
  name: string;
  href: string;
  icon: React.ElementType;
  dropdown?: Record<string, DropdownItem[]>;
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const pathname = usePathname();
  const { state } = useApp();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const navigation: NavigationItem[] = [
    { name: 'Inicio', href: '/', icon: Home },
    { 
      name: 'Yoga', 
      href: '/yoga', 
      icon: Sparkles,
      dropdown: {
        'Niveles': [
          { name: 'Principiante', href: '/yoga?level=principiante', description: 'Para quienes inician su práctica' },
          { name: 'Intermedio', href: '/yoga?level=intermedio', description: 'Para practicantes con experiencia' },
          { name: 'Avanzado', href: '/yoga?level=avanzado', description: 'Para yogis experimentados' }
        ],
        'Estilos': [
          { name: 'Hatha', href: '/yoga?subcategory=hatha', description: 'Posturas estáticas y respiración' },
          { name: 'Vinyasa', href: '/yoga?subcategory=vinyasa', description: 'Flujo dinámico y movimiento' },
          { name: 'Restaurativo', href: '/yoga?subcategory=restaurativo', description: 'Relajación profunda' }
        ],
        'Intensidad': [
          { name: 'Nivel 1', href: '/yoga?intensity=1', description: 'Suave y relajante' },
          { name: 'Nivel 2', href: '/yoga?intensity=2', description: 'Moderado y equilibrado' }
        ]
      }
    },
    { 
      name: 'Fitness', 
      href: '/fitness', 
      icon: Play,
      dropdown: {
        'Niveles': [
          { name: 'Principiante', href: '/fitness?level=principiante', description: 'Iniciación al fitness' },
          { name: 'Intermedio', href: '/fitness?level=intermedio', description: 'Desarrollo de resistencia' },
          { name: 'Avanzado', href: '/fitness?level=avanzado', description: 'Máximo rendimiento' }
        ],
        'Tipos': [
          { name: 'Pilates', href: '/fitness?subcategory=pilates', description: 'Core y estabilidad' },
          { name: 'HIIT', href: '/fitness?subcategory=hiit', description: 'Alta intensidad' },
          { name: 'Cardio', href: '/fitness?subcategory=cardio', description: 'Resistencia cardiovascular' }
        ],
        'Intensidad': [
          { name: 'Nivel 3', href: '/fitness?intensity=3', description: 'Intenso con sudor' },
          { name: 'Nivel 4', href: '/fitness?intensity=4', description: 'Máximo desafío' }
        ]
      }
    },
    { 
      name: 'Wellness', 
      href: '/wellness', 
      icon: Heart,
      dropdown: {
        'Niveles': [
          { name: 'Principiante', href: '/wellness?level=principiante', description: 'Introducción al bienestar' },
          { name: 'Intermedio', href: '/wellness?level=intermedio', description: 'Profundización en prácticas' }
        ],
        'Prácticas': [
          { name: 'Meditación', href: '/wellness?subcategory=meditación', description: 'Calma mental y claridad' },
          { name: 'Breathwork', href: '/wellness?subcategory=breathwork', description: 'Técnicas de respiración' },
          { name: 'Mindfulness', href: '/wellness?subcategory=mindfulness', description: 'Atención plena' }
        ],
        'Intensidad': [
          { name: 'Nivel 1', href: '/wellness?intensity=1', description: 'Relajante y restaurativo' }
        ]
      }
    },
    { name: 'Instructores', href: '/instructores', icon: Users },
    { name: 'Mi Progreso', href: '/mi-progreso', icon: BookOpen },
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
              const Icon = item.icon;
              const hasDropdown = item.dropdown;
              
              if (hasDropdown) {
                return (
                  <div key={item.name} className="relative group">
                    <Link
                      href={item.href}
                      className={`flex items-center space-x-2 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                        isActive(item.href)
                          ? 'bg-primary-100 text-primary-700 shadow-sm'
                          : 'text-text-secondary hover:text-primary-600 hover:bg-primary-50'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.name}</span>
                    </Link>
                    
                    {/* Dropdown Menu */}
                    <div className="absolute top-full left-0 mt-2 w-96 bg-white rounded-2xl shadow-2xl border border-primary-100/50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
                      <div className="p-6">
                        <div className="grid grid-cols-1 gap-6">
                          {item.dropdown && Object.entries(item.dropdown).map(([category, items]) => (
                            <div key={category}>
                              <h4 className="font-semibold text-text-primary mb-3 text-sm uppercase tracking-wide">
                                {category}
                              </h4>
                              <div className="space-y-2">
                                {items.map((dropdownItem: DropdownItem) => (
                                  <Link
                                    key={dropdownItem.name}
                                    href={dropdownItem.href}
                                    className="block p-3 rounded-lg hover:bg-primary-50 transition-colors duration-200 group/item"
                                  >
                                    <div className="font-medium text-text-primary group-hover/item:text-primary-600 transition-colors duration-200">
                                      {dropdownItem.name}
                                    </div>
                                    <div className="text-xs text-text-muted mt-1">
                                      {dropdownItem.description}
                                    </div>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
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