'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Search, Filter, Clock, Users, Heart, Play, ChevronDown } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import videosData from '@/data/videos.json';

interface FilterState {
  category: string;
  duration: string;
  level: string;
  objective: string;
  search: string;
}

const ClasesContent = () => {
  const searchParams = useSearchParams();
  const { actions, state } = useApp();
  const [showFilters, setShowFilters] = useState(false);
  const [filteredVideos, setFilteredVideos] = useState(videosData);
  
  const [filters, setFilters] = useState<FilterState>({
    category: searchParams?.get('category') || '',
    duration: '',
    level: '',
    objective: '',
    search: '',
  });

  // Opciones de filtros
  const filterOptions = {
    categories: ['yoga', 'pilates', 'meditación', 'bienestar'],
    durations: [
      { label: 'Corto (< 15 min)', value: 'short' },
      { label: 'Medio (15-30 min)', value: 'medium' },
      { label: 'Largo (> 30 min)', value: 'long' }
    ],
    levels: ['principiante', 'intermedio', 'avanzado'],
    objectives: ['relajación', 'energía', 'tonificación', 'bienestar']
  };

  // Función para filtrar videos
  useEffect(() => {
    let filtered = videosData;

    // Filtro por búsqueda
    if (filters.search) {
      filtered = filtered.filter(video =>
        video.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        video.description.toLowerCase().includes(filters.search.toLowerCase()) ||
        video.instructor.toLowerCase().includes(filters.search.toLowerCase()) ||
        video.tags.some(tag => tag.toLowerCase().includes(filters.search.toLowerCase()))
      );
    }

    // Filtro por categoría
    if (filters.category) {
      filtered = filtered.filter(video => video.category === filters.category);
    }

    // Filtro por duración
    if (filters.duration) {
      filtered = filtered.filter(video => {
        const duration = parseInt(video.duration);
        switch (filters.duration) {
          case 'short': return duration < 15;
          case 'medium': return duration >= 15 && duration <= 30;
          case 'long': return duration > 30;
          default: return true;
        }
      });
    }

    // Filtro por nivel
    if (filters.level) {
      filtered = filtered.filter(video => video.level === filters.level);
    }

    // Filtro por objetivo
    if (filters.objective) {
      filtered = filtered.filter(video => video.objective === filters.objective);
    }

    setFilteredVideos(filtered);
  }, [filters]);

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      duration: '',
      level: '',
      objective: '',
      search: '',
    });
  };

  const getDurationColor = (duration: string) => {
    const mins = parseInt(duration);
    if (mins < 15) return 'bg-green-500';
    if (mins <= 30) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'principiante': return 'bg-green-500';
      case 'intermedio': return 'bg-yellow-500';
      case 'avanzado': return 'bg-red-500';
      default: return 'bg-slate-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-accent-50 to-primary-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-display font-bold text-text-primary mb-4">
            Catálogo de Clases
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl">
            Descubre nuestra colección completa de clases de yoga, pilates, meditación y bienestar.
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-primary-100/50 mb-8">
          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-muted w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar clases, instructores o palabras clave..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-primary-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all duration-200"
            />
          </div>

          {/* Filter Toggle */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center space-x-2 text-primary-700 hover:text-primary-800 transition-colors duration-200"
            >
              <Filter className="w-5 h-5" />
              <span>Filtros</span>
              <ChevronDown className={`w-4 h-4 transform transition-transform duration-200 ${showFilters ? 'rotate-180' : ''}`} />
            </button>
            
            <div className="text-sm text-text-secondary">
              {filteredVideos.length} clase{filteredVideos.length !== 1 ? 's' : ''} encontrada{filteredVideos.length !== 1 ? 's' : ''}
            </div>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-primary-100">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Categoría
                  </label>
                  <select
                    value={filters.category}
                    onChange={(e) => handleFilterChange('category', e.target.value)}
                    className="w-full p-3 bg-white border border-primary-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                  >
                    <option value="">Todas las categorías</option>
                    {filterOptions.categories.map(category => (
                      <option key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Duration Filter */}
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Duración
                  </label>
                  <select
                    value={filters.duration}
                    onChange={(e) => handleFilterChange('duration', e.target.value)}
                    className="w-full p-3 bg-white border border-primary-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                  >
                    <option value="">Cualquier duración</option>
                    {filterOptions.durations.map(duration => (
                      <option key={duration.value} value={duration.value}>
                        {duration.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Level Filter */}
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Nivel
                  </label>
                  <select
                    value={filters.level}
                    onChange={(e) => handleFilterChange('level', e.target.value)}
                    className="w-full p-3 bg-white border border-primary-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                  >
                    <option value="">Todos los niveles</option>
                    {filterOptions.levels.map(level => (
                      <option key={level} value={level}>
                        {level.charAt(0).toUpperCase() + level.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Objective Filter */}
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Objetivo
                  </label>
                  <select
                    value={filters.objective}
                    onChange={(e) => handleFilterChange('objective', e.target.value)}
                    className="w-full p-3 bg-white border border-primary-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                  >
                    <option value="">Cualquier objetivo</option>
                    {filterOptions.objectives.map(objective => (
                      <option key={objective} value={objective}>
                        {objective.charAt(0).toUpperCase() + objective.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  onClick={clearFilters}
                  className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                >
                  Limpiar filtros
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Videos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredVideos.map((video) => (
            <div key={video.id} className="group">
              <Link href={`/video/${video.id}`}>
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  {/* Video Thumbnail */}
                  <div className="relative aspect-video bg-gradient-to-br from-primary-100 to-secondary-100">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Play className="w-5 h-5 text-primary-600 ml-0.5" />
                      </div>
                    </div>
                    
                    {/* Duration Badge */}
                    <div className="absolute top-3 left-3">
                      <span className={`inline-flex items-center space-x-1 ${getDurationColor(video.duration)} text-white px-2 py-1 rounded-full text-xs font-medium`}>
                        <Clock className="w-3 h-3" />
                        <span>{video.duration}</span>
                      </span>
                    </div>

                    {/* Category Badge */}
                    <div className="absolute top-3 right-3">
                      <span className="inline-block bg-secondary-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                        {video.category}
                      </span>
                    </div>

                    {/* Level Badge */}
                    <div className="absolute bottom-3 left-3">
                      <span className={`inline-block ${getLevelColor(video.level)} text-white px-2 py-1 rounded-full text-xs font-medium`}>
                        {video.level}
                      </span>
                    </div>

                    {/* Favorite Button */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        if (state.favorites.some(fav => fav.id === video.id)) {
                          actions.removeFavorite(video.id);
                        } else {
                          actions.addFavorite(video);
                        }
                      }}
                      className="absolute bottom-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors duration-200"
                    >
                      <Heart 
                        className={`w-4 h-4 ${
                          state.favorites.some(fav => fav.id === video.id)
                            ? 'fill-red-500 text-red-500'
                            : 'text-text-muted'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Video Info */}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-text-primary mb-2 group-hover:text-primary-600 transition-colors duration-200 line-clamp-2">
                      {video.title}
                    </h3>
                    <p className="text-text-secondary text-sm mb-3 line-clamp-2">
                      {video.description}
                    </p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-primary-600 font-medium">
                        {video.instructor}
                      </span>
                      <div className="flex items-center space-x-1 text-text-muted">
                        <Users className="w-3 h-3" />
                        <span>{video.objective}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredVideos.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-12 h-12 text-primary-600" />
            </div>
            <h3 className="text-xl font-semibold text-text-primary mb-2">
              No se encontraron clases
            </h3>
            <p className="text-text-secondary mb-6 max-w-md mx-auto">
              Intenta ajustar tus filtros o términos de búsqueda para encontrar las clases perfectas para ti.
            </p>
            <button
              onClick={clearFilters}
              className="inline-flex items-center space-x-2 bg-primary-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-primary-700 transition-colors duration-200"
            >
              <span>Limpiar filtros</span>
            </button>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

const ClasesPage = () => {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-white via-accent-50 to-primary-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-16">
            <div className="animate-pulse">
              <div className="h-8 bg-primary-200 rounded w-1/3 mx-auto mb-4"></div>
              <div className="h-4 bg-primary-100 rounded w-1/2 mx-auto mb-8"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-lg">
                    <div className="aspect-video bg-primary-100"></div>
                    <div className="p-4">
                      <div className="h-4 bg-primary-100 rounded mb-2"></div>
                      <div className="h-3 bg-primary-50 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    }>
      <ClasesContent />
    </Suspense>
  );
};

export default ClasesPage; 