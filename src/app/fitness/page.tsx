'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Play, Clock, Heart, Filter, Search, Users, Target, Zap } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import videosData from '@/data/videos.json';

const FitnessPage = () => {
  const { state, actions } = useApp();
  const [filteredVideos, setFilteredVideos] = useState(videosData.filter(v => v.category === 'fitness'));
  const [filters, setFilters] = useState({
    level: '',
    intensity: '',
    subcategory: '',
    duration: '',
    search: ''
  });

  const levels = ['principiante', 'intermedio', 'avanzado'];
  const intensityLevels = [1, 2, 3, 4];
  const subcategories = ['pilates', 'hiit', 'cardio', 'fuerza', 'barre', 'dance'];
  const durations = ['5-15 min', '15-30 min', '30-45 min', '45+ min'];

  useEffect(() => {
    let filtered = videosData.filter(v => v.category === 'fitness');

    if (filters.level) {
      filtered = filtered.filter(v => v.level === filters.level);
    }
    if (filters.intensity) {
      filtered = filtered.filter(v => v.intensity === parseInt(filters.intensity));
    }
    if (filters.subcategory) {
      filtered = filtered.filter(v => v.subcategory === filters.subcategory);
    }
    if (filters.duration) {
      const [min, max] = filters.duration.includes('+') 
        ? [45, 999] 
        : filters.duration.split('-').map(d => parseInt(d));
      filtered = filtered.filter(v => {
        const duration = parseInt(v.duration);
        return duration >= min && duration <= max;
      });
    }
    if (filters.search) {
      filtered = filtered.filter(v => 
        v.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        v.instructor.toLowerCase().includes(filters.search.toLowerCase()) ||
        v.tags.some(tag => tag.toLowerCase().includes(filters.search.toLowerCase()))
      );
    }

    setFilteredVideos(filtered);
  }, [filters]);

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'principiante': return 'bg-green-500';
      case 'intermedio': return 'bg-yellow-500';
      case 'avanzado': return 'bg-red-500';
      default: return 'bg-slate-500';
    }
  };

  const getIntensityColor = (intensity: number) => {
    switch (intensity) {
      case 1: return 'bg-blue-400';
      case 2: return 'bg-green-500';
      case 3: return 'bg-yellow-500';
      case 4: return 'bg-red-500';
      default: return 'bg-slate-500';
    }
  };

  const clearFilters = () => {
    setFilters({
      level: '',
      intensity: '',
      subcategory: '',
      duration: '',
      search: ''
    });
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-display font-bold text-text-primary mb-4">
            Fitness
          </h1>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Potencia tu cuerpo con entrenamientos dinámicos. Desde pilates hasta HIIT, 
            encuentra la rutina perfecta para alcanzar tus objetivos de fitness.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-primary-100/50 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-text-primary flex items-center">
              <Filter className="w-5 h-5 mr-2" />
              Filtros
            </h3>
            <button 
              onClick={clearFilters}
              className="text-primary-600 hover:text-primary-700 text-sm font-medium"
            >
              Limpiar filtros
            </button>
          </div>

          {/* Search Bar */}
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar entrenamientos, instructores..."
                value={filters.search}
                onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                className="w-full pl-10 pr-4 py-3 border border-primary-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Filter Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Nivel</label>
              <select
                value={filters.level}
                onChange={(e) => setFilters(prev => ({ ...prev, level: e.target.value }))}
                className="w-full px-3 py-2 border border-primary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">Todos los niveles</option>
                {levels.map(level => (
                  <option key={level} value={level}>{level.charAt(0).toUpperCase() + level.slice(1)}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Intensidad</label>
              <select
                value={filters.intensity}
                onChange={(e) => setFilters(prev => ({ ...prev, intensity: e.target.value }))}
                className="w-full px-3 py-2 border border-primary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">Todas las intensidades</option>
                {intensityLevels.map(intensity => (
                  <option key={intensity} value={intensity}>Nivel {intensity}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Tipo</label>
              <select
                value={filters.subcategory}
                onChange={(e) => setFilters(prev => ({ ...prev, subcategory: e.target.value }))}
                className="w-full px-3 py-2 border border-primary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">Todos los tipos</option>
                {subcategories.map(sub => (
                  <option key={sub} value={sub}>{sub.charAt(0).toUpperCase() + sub.slice(1)}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Duración</label>
              <select
                value={filters.duration}
                onChange={(e) => setFilters(prev => ({ ...prev, duration: e.target.value }))}
                className="w-full px-3 py-2 border border-primary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">Todas las duraciones</option>
                {durations.map(duration => (
                  <option key={duration} value={duration}>{duration}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-text-primary">
            {filteredVideos.length} entrenamiento{filteredVideos.length !== 1 ? 's' : ''} encontrado{filteredVideos.length !== 1 ? 's' : ''}
          </h2>
        </div>

        {/* Videos Grid */}
        {filteredVideos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredVideos.map((video) => (
              <Link key={video.id} href={`/video/${video.id}`} className="group">
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                  <div className="relative aspect-video bg-gradient-to-br from-orange-100 to-red-100">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Zap className="w-6 h-6 text-orange-600 ml-1" />
                      </div>
                    </div>
                    
                    <div className="absolute top-3 left-3">
                      <span className="inline-flex items-center space-x-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-orange-700">
                        <Clock className="w-3 h-3" />
                        <span>{video.duration}</span>
                      </span>
                    </div>

                    <div className="absolute top-3 right-3">
                      <span className={`inline-block ${getDifficultyColor(video.level)} text-white px-2 py-1 rounded-full text-xs font-medium`}>
                        {video.level}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3">
                      <span className={`inline-block ${getIntensityColor(video.intensity)} text-white px-2 py-1 rounded-full text-xs font-medium`}>
                        Intensidad {video.intensity}
                      </span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (state.favorites.some(fav => fav.id === video.id)) {
                          actions.removeFavorite(video.id);
                        } else {
                          actions.addFavorite(video);
                        }
                      }}
                      className="absolute bottom-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-200"
                    >
                      <Heart 
                        className={`w-4 h-4 ${
                          state.favorites.some(fav => fav.id === video.id)
                            ? 'text-red-500 fill-current'
                            : 'text-orange-600'
                        }`} 
                      />
                    </button>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-semibold text-text-primary mb-2 line-clamp-2">
                      {video.title}
                    </h3>
                    <p className="text-sm text-text-secondary mb-3 line-clamp-2">
                      {video.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-text-muted" />
                        <span className="text-sm text-text-secondary">{video.instructor}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Target className="w-4 h-4 text-text-muted" />
                        <span className="text-sm text-text-secondary capitalize">{video.objective}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Zap className="w-12 h-12 text-orange-600" />
            </div>
            <h3 className="text-xl font-semibold text-text-primary mb-2">
              No se encontraron entrenamientos
            </h3>
            <p className="text-text-secondary mb-6">
              Intenta ajustar tus filtros para encontrar más entrenamientos de fitness.
            </p>
            <button 
              onClick={clearFilters}
              className="bg-orange-500 text-white px-6 py-3 rounded-xl hover:bg-orange-600 transition-colors duration-200"
            >
              Limpiar filtros
            </button>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default FitnessPage;