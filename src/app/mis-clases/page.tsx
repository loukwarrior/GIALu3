'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Heart, Clock, Play, BookOpen, Calendar, Target, TrendingUp } from 'lucide-react';
import { useApp } from '@/context/AppContext';

const MisClasesPage = () => {
  const { state, actions } = useApp();
  const [activeTab, setActiveTab] = useState<'favorites' | 'history'>('favorites');

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'principiante': return 'bg-green-500';
      case 'intermedio': return 'bg-yellow-500';
      case 'avanzado': return 'bg-red-500';
      default: return 'bg-slate-500';
    }
  };

  const getStats = () => {
    const totalWatched = state.watchedVideos.length;
    const totalFavorites = state.favorites.length;
    const totalMinutes = state.watchedVideos.reduce((acc, video) => {
      const minutes = parseInt(video.duration);
      return acc + minutes;
    }, 0);
    
    const categoryCounts = state.watchedVideos.reduce((acc, video) => {
      acc[video.category] = (acc[video.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const favoriteCategory = Object.entries(categoryCounts).sort((a, b) => b[1] - a[1])[0];

    return {
      totalWatched,
      totalFavorites,
      totalMinutes,
      favoriteCategory: favoriteCategory ? favoriteCategory[0] : 'N/A'
    };
  };

  const stats = getStats();

  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-display font-bold text-text-primary mb-4">
            Mis Clases
          </h1>
          <p className="text-lg text-text-secondary">
            Tu espacio personal para seguir tu progreso y acceder a tus contenidos favoritos.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-primary-100/50">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                <Play className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-text-primary">{stats.totalWatched}</p>
                <p className="text-sm text-text-secondary">Videos completados</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-primary-100/50">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-text-primary">{stats.totalFavorites}</p>
                <p className="text-sm text-text-secondary">Favoritos</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-primary-100/50">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-text-primary">{stats.totalMinutes}</p>
                <p className="text-sm text-text-secondary">Minutos de práctica</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-primary-100/50">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-secondary-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-secondary-600" />
              </div>
              <div>
                <p className="text-lg font-bold text-text-primary capitalize">{stats.favoriteCategory}</p>
                <p className="text-sm text-text-secondary">Categoría favorita</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-primary-100/50 overflow-hidden">
          <div className="flex border-b border-primary-100">
            <button
              onClick={() => setActiveTab('favorites')}
              className={`flex-1 px-6 py-4 text-sm font-medium transition-colors duration-200 ${
                activeTab === 'favorites'
                  ? 'bg-primary-50 text-primary-700 border-b-2 border-primary-500'
                  : 'text-text-secondary hover:text-primary-600 hover:bg-primary-25'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <Heart className="w-4 h-4" />
                <span>Favoritos ({state.favorites.length})</span>
              </div>
            </button>
            
            <button
              onClick={() => setActiveTab('history')}
              className={`flex-1 px-6 py-4 text-sm font-medium transition-colors duration-200 ${
                activeTab === 'history'
                  ? 'bg-primary-50 text-primary-700 border-b-2 border-primary-500'
                  : 'text-text-secondary hover:text-primary-600 hover:bg-primary-25'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <BookOpen className="w-4 h-4" />
                <span>Historial ({state.watchedVideos.length})</span>
              </div>
            </button>
          </div>

          <div className="p-6">
            {/* Favorites Tab */}
            {activeTab === 'favorites' && (
              <div>
                {state.favorites.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Heart className="w-12 h-12 text-red-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-text-primary mb-2">
                      No tienes favoritos aún
                    </h3>
                    <p className="text-text-secondary mb-6 max-w-md mx-auto">
                      Explora nuestro catálogo y marca tus clases favoritas para acceder fácilmente a ellas.
                    </p>
                    <Link
                      href="/clases-finder"
                      className="inline-flex items-center space-x-2 bg-primary-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-primary-700 transition-colors duration-200"
                    >
                      <span>Explorar clases</span>
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {state.favorites.map((video) => (
                      <div key={video.id} className="group relative">
                        <Link href={`/video/${video.id}`}>
                          <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                            {/* Video Thumbnail */}
                            <div className="relative aspect-video bg-gradient-to-br from-primary-100 to-secondary-100">
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                  <Play className="w-5 h-5 text-primary-600 ml-0.5" />
                                </div>
                              </div>
                              
                              <div className="absolute top-3 left-3">
                                <span className="inline-flex items-center space-x-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-primary-700">
                                  <Clock className="w-3 h-3" />
                                  <span>{video.duration}</span>
                                </span>
                              </div>

                              <div className="absolute top-3 right-3">
                                <span className="inline-block bg-secondary-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                                  {video.category}
                                </span>
                              </div>

                              <div className="absolute bottom-3 left-3">
                                <span className={`inline-block ${getLevelColor(video.level)} text-white px-2 py-1 rounded-full text-xs font-medium`}>
                                  {video.level}
                                </span>
                              </div>
                            </div>

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
                                  <Target className="w-3 h-3" />
                                  <span>{video.objective}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                        
                        {/* Remove from favorites button */}
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            actions.removeFavorite(video.id);
                          }}
                          className="absolute top-2 right-2 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors duration-200 opacity-0 group-hover:opacity-100"
                        >
                          <Heart className="w-4 h-4 fill-red-500 text-red-500" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* History Tab */}
            {activeTab === 'history' && (
              <div>
                {state.watchedVideos.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <BookOpen className="w-12 h-12 text-primary-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-text-primary mb-2">
                      No has visto ninguna clase aún
                    </h3>
                    <p className="text-text-secondary mb-6 max-w-md mx-auto">
                      Comienza tu práctica viendo algunas de nuestras clases de bienestar.
                    </p>
                    <Link
                      href="/clases-finder"
                      className="inline-flex items-center space-x-2 bg-primary-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-primary-700 transition-colors duration-200"
                    >
                      <span>Explorar clases</span>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {state.watchedVideos.map((video) => (
                      <div key={`${video.id}-${video.watchedAt}`} className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow duration-200">
                        <div className="flex items-center space-x-4">
                          <div className="relative w-24 h-16 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-lg overflow-hidden flex-shrink-0">
                            <div className="absolute inset-0 flex items-center justify-center">
                              <Play className="w-4 h-4 text-primary-600" />
                            </div>
                            <div className="absolute bottom-1 right-1">
                              <span className="bg-black/70 text-white text-xs px-1 py-0.5 rounded">
                                {video.duration}
                              </span>
                            </div>
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <Link 
                              href={`/video/${video.id}`}
                              className="block group"
                            >
                              <h3 className="text-lg font-semibold text-text-primary group-hover:text-primary-600 transition-colors duration-200 line-clamp-1">
                                {video.title}
                              </h3>
                              <p className="text-sm text-text-secondary mb-2">
                                {video.instructor} • {video.category}
                              </p>
                              <div className="flex items-center space-x-4 text-xs text-text-muted">
                                <div className="flex items-center space-x-1">
                                  <Calendar className="w-3 h-3" />
                                  <span>Visto el {formatDate(video.watchedAt)}</span>
                                </div>
                                <span className={`inline-block ${getLevelColor(video.level)} text-white px-2 py-1 rounded-full`}>
                                  {video.level}
                                </span>
                              </div>
                            </Link>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => {
                                if (state.favorites.some(fav => fav.id === video.id)) {
                                  actions.removeFavorite(video.id);
                                } else {
                                  actions.addFavorite(video);
                                }
                              }}
                              className="p-2 text-text-muted hover:text-red-500 transition-colors duration-200"
                            >
                              <Heart 
                                className={`w-4 h-4 ${
                                  state.favorites.some(fav => fav.id === video.id)
                                    ? 'fill-red-500 text-red-500'
                                    : ''
                                }`}
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default MisClasesPage; 