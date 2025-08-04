'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Heart, Clock, Play, BookOpen, Calendar, TrendingUp, Trophy, Flame } from 'lucide-react';
import { useApp } from '@/context/AppContext';

const MiProgresoPage = () => {
  const { state } = useApp();
  const [activeTab, setActiveTab] = useState<'favorites' | 'history' | 'stats'>('stats');

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

    // Calcular racha (días consecutivos)
    const streak = calculateStreak();

    return {
      totalWatched,
      totalFavorites,
      totalMinutes,
      favoriteCategory: favoriteCategory ? favoriteCategory[0] : 'N/A',
      streak
    };
  };

  const calculateStreak = () => {
    if (state.watchedVideos.length === 0) return 0;
    
    const dates = state.watchedVideos
      .map(video => new Date(video.watchedAt).toDateString())
      .filter((date, index, arr) => arr.indexOf(date) === index)
      .sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
    
    let streak = 0;
    // const today = new Date().toDateString(); // Comentado temporalmente hasta implementar funcionalidad
    
    for (let i = 0; i < dates.length; i++) {
      const currentDate = new Date(dates[i]);
      const expectedDate = new Date();
      expectedDate.setDate(expectedDate.getDate() - i);
      
      if (currentDate.toDateString() === expectedDate.toDateString()) {
        streak++;
      } else {
        break;
      }
    }
    
    return streak;
  };

  const stats = getStats();

  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-display font-bold text-text-primary mb-4">
            Mi Progreso
          </h1>
          <p className="text-lg text-text-secondary">
            Sigue tu evolución y mantente motivada en tu camino hacia el bienestar.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-primary-100/50">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Play className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-text-primary">{stats.totalWatched}</p>
                <p className="text-sm text-text-secondary">Clases completadas</p>
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
                <p className="text-sm text-text-secondary">Minutos practicados</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-primary-100/50">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <Flame className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-text-primary">{stats.streak}</p>
                <p className="text-sm text-text-secondary">Días de racha</p>
              </div>
            </div>
          </div>
        </div>

        {/* Achievement Section */}
        {stats.totalWatched > 0 && (
          <div className="bg-gradient-to-r from-primary-100 to-secondary-100 rounded-2xl p-6 mb-8">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                <Trophy className="w-8 h-8 text-yellow-500" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-text-primary mb-1">
                  ¡Increíble progreso!
                </h3>
                <p className="text-text-secondary">
                  Tu categoría favorita es <span className="font-semibold capitalize">{stats.favoriteCategory}</span>. 
                  Has practicado {stats.totalMinutes} minutos en total.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tabs Navigation */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-primary-100/50 mb-8">
          <div className="flex border-b border-primary-100">
            <button
              onClick={() => setActiveTab('stats')}
              className={`flex-1 px-6 py-4 text-center font-medium transition-colors duration-200 ${
                activeTab === 'stats'
                  ? 'text-primary-700 bg-primary-50 border-b-2 border-primary-500'
                  : 'text-text-secondary hover:text-primary-600 hover:bg-primary-25'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <TrendingUp className="w-4 h-4" />
                <span>Estadísticas</span>
              </div>
            </button>
            
            <button
              onClick={() => setActiveTab('favorites')}
              className={`flex-1 px-6 py-4 text-center font-medium transition-colors duration-200 ${
                activeTab === 'favorites'
                  ? 'text-primary-700 bg-primary-50 border-b-2 border-primary-500'
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
              className={`flex-1 px-6 py-4 text-center font-medium transition-colors duration-200 ${
                activeTab === 'history'
                  ? 'text-primary-700 bg-primary-50 border-b-2 border-primary-500'
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
            {activeTab === 'stats' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-text-primary mb-4">
                  Resumen de Actividad
                </h3>
                
                {stats.totalWatched > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-primary-50 rounded-xl p-4">
                      <h4 className="font-medium text-text-primary mb-2">Tiempo Total</h4>
                      <p className="text-2xl font-bold text-primary-600">{Math.round(stats.totalMinutes / 60)} horas</p>
                      <p className="text-sm text-text-secondary">{stats.totalMinutes} minutos practicados</p>
                    </div>
                    
                    <div className="bg-secondary-50 rounded-xl p-4">
                      <h4 className="font-medium text-text-primary mb-2">Progreso Semanal</h4>
                      <p className="text-2xl font-bold text-secondary-600">{Math.round(stats.totalWatched / 4)} clases/semana</p>
                      <p className="text-sm text-text-secondary">Promedio estimado</p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <TrendingUp className="w-12 h-12 text-text-muted mx-auto mb-4" />
                    <p className="text-text-secondary">
                      Completa tu primera clase para ver tus estadísticas
                    </p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'favorites' && (
              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-4">
                  Tus Clases Favoritas
                </h3>
                
                {state.favorites.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {state.favorites.map((video) => (
                      <Link key={video.id} href={`/video/${video.id}`} className="group">
                        <div className="bg-white rounded-xl border border-primary-100 hover:border-primary-300 transition-all duration-200 overflow-hidden">
                          <div className="aspect-video bg-gradient-to-br from-primary-100 to-secondary-100 relative">
                            <div className="absolute inset-0 flex items-center justify-center">
                              <Play className="w-8 h-8 text-primary-600 group-hover:scale-110 transition-transform duration-200" />
                            </div>
                            <div className="absolute top-2 right-2">
                              <span className={`${getLevelColor(video.level)} text-white px-2 py-1 rounded text-xs`}>
                                {video.level}
                              </span>
                            </div>
                          </div>
                          <div className="p-4">
                            <h4 className="font-medium text-text-primary line-clamp-2 mb-2">
                              {video.title}
                            </h4>
                            <div className="flex items-center justify-between text-sm text-text-secondary">
                              <span>{video.instructor}</span>
                              <span>{video.duration}</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Heart className="w-12 h-12 text-text-muted mx-auto mb-4" />
                    <p className="text-text-secondary mb-4">
                      Aún no tienes clases favoritas
                    </p>
                    <Link 
                      href="/yoga"
                      className="bg-primary-500 text-white px-6 py-3 rounded-xl hover:bg-primary-600 transition-colors duration-200"
                    >
                      Explorar clases
                    </Link>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'history' && (
              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-4">
                  Historial de Clases
                </h3>
                
                {state.watchedVideos.length > 0 ? (
                  <div className="space-y-4">
                    {state.watchedVideos
                      .sort((a, b) => new Date(b.watchedAt).getTime() - new Date(a.watchedAt).getTime())
                      .map((video, index) => (
                      <div key={`${video.id}-${index}`} className="flex items-center space-x-4 p-4 bg-white rounded-xl border border-primary-100">
                        <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-lg flex items-center justify-center">
                          <Play className="w-6 h-6 text-primary-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-text-primary">{video.title}</h4>
                          <p className="text-sm text-text-secondary">{video.instructor} • {video.duration}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <Calendar className="w-4 h-4 text-text-muted" />
                            <span className="text-xs text-text-secondary">
                              {formatDate(video.watchedAt)}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className={`${getLevelColor(video.level)} text-white px-2 py-1 rounded text-xs`}>
                            {video.level}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <BookOpen className="w-12 h-12 text-text-muted mx-auto mb-4" />
                    <p className="text-text-secondary mb-4">
                      Tu historial aparecerá aquí después de completar tu primera clase
                    </p>
                    <Link 
                      href="/yoga"
                      className="bg-primary-500 text-white px-6 py-3 rounded-xl hover:bg-primary-600 transition-colors duration-200"
                    >
                      Comenzar ahora
                    </Link>
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

export default MiProgresoPage;