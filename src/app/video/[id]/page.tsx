'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ArrowLeft, Heart, Clock, Target, Play, CheckCircle } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import videosData from '@/data/videos.json';

const VideoPage = () => {
  const params = useParams();
  const router = useRouter();
  const { actions, state } = useApp();
  const [video, setVideo] = useState<typeof videosData[0] | null>(null);
  const [relatedVideos, setRelatedVideos] = useState<typeof videosData>([]);
  const [isWatching, setIsWatching] = useState(false);

  useEffect(() => {
    const videoId = parseInt(params?.id as string);
    const foundVideo = videosData.find(v => v.id === videoId);
    
    if (foundVideo) {
      setVideo(foundVideo);
      
      // Obtener videos relacionados (misma categoría o instructor)
      const related = videosData
        .filter(v => 
          v.id !== videoId && 
          (v.category === foundVideo.category || v.instructor === foundVideo.instructor)
        )
        .slice(0, 4);
      
      setRelatedVideos(related);
    }
  }, [params?.id]);

  useEffect(() => {
    if (video && isWatching) {
      // Marcar como visto después de 5 segundos
      const timer = setTimeout(() => {
        actions.addWatchedVideo(video);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [video, isWatching, actions]);

  if (!video) {
    return (
      <div className="min-h-screen ">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-text-primary">Video no encontrado</h1>
            <p className="text-text-secondary mt-2">El video que buscas no existe.</p>
            <Link 
              href="/clases"
              className="inline-flex items-center space-x-2 mt-6 bg-primary-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-primary-700 transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Volver al catálogo</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const isFavorite = state.favorites.some(fav => fav.id === video.id);
  const isWatched = state.watchedVideos.some(watched => watched.id === video.id);

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'principiante': return 'bg-green-500';
      case 'intermedio': return 'bg-yellow-500';
      case 'avanzado': return 'bg-red-500';
      default: return 'bg-slate-500';
    }
  };

  const handleVideoStart = () => {
    setIsWatching(true);
    actions.setCurrentVideo(video);
  };

  return (
    <div className="min-h-screen ">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center space-x-2 text-primary-700 hover:text-primary-800 transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Volver</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Video Player Section */}
          <div className="lg:col-span-2">
            {/* Video Player */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg mb-6">
              <div className="relative aspect-video">
                {!isWatching ? (
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center">
                    <button
                      onClick={handleVideoStart}
                      className="w-20 h-20 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-lg"
                    >
                      <Play className="w-8 h-8 text-primary-600 ml-1" />
                    </button>
                  </div>
                ) : (
                  <iframe
                    src={video.videoUrl}
                    title={video.title}
                    className="w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                )}
              </div>
            </div>

            {/* Video Information */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-primary-100/50">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h1 className="text-2xl md:text-3xl font-display font-bold text-text-primary mb-2">
                    {video.title}
                  </h1>
                  <p className="text-primary-600 font-medium mb-4">
                    con {video.instructor}
                  </p>
                </div>
                
                <div className="flex items-center space-x-3">
                  {isWatched && (
                    <div className="flex items-center space-x-1 text-green-600">
                      <CheckCircle className="w-5 h-5" />
                      <span className="text-sm font-medium">Completado</span>
                    </div>
                  )}
                  
                  <button
                    onClick={() => {
                      if (isFavorite) {
                        actions.removeFavorite(video.id);
                      } else {
                        actions.addFavorite(video);
                      }
                    }}
                                         className={`p-3 rounded-xl transition-all duration-200 ${
                       isFavorite
                         ? 'bg-red-50 text-red-600 hover:bg-red-100'
                         : 'bg-slate-50 text-text-muted hover:bg-primary-50 hover:text-primary-600'
                     }`}
                  >
                    <Heart 
                      className={`w-6 h-6 ${isFavorite ? 'fill-current' : ''}`}
                    />
                  </button>
                </div>
              </div>

              {/* Video Stats */}
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-primary-600" />
                  <span className="text-text-secondary">{video.duration}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className={`inline-block ${getLevelColor(video.level)} text-white px-3 py-1 rounded-full text-sm font-medium`}>
                    {video.level}
                  </span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Target className="w-5 h-5 text-primary-600" />
                  <span className="text-text-secondary">{video.objective}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className="inline-block bg-secondary-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {video.category}
                  </span>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-3">
                  Descripción
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  {video.description}
                </p>
              </div>

              {/* Tags */}
              {video.tags && video.tags.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-text-primary mb-3">
                    Etiquetas
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {video.tags.map((tag: string, index: number) => (
                      <span
                        key={index}
                        className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Related Videos */}
            {relatedVideos.length > 0 && (
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-primary-100/50">
                <h3 className="text-xl font-semibold text-text-primary mb-6">
                  Videos relacionados
                </h3>
                
                <div className="space-y-4">
                  {relatedVideos.map((relatedVideo) => (
                    <Link
                      key={relatedVideo.id}
                      href={`/video/${relatedVideo.id}`}
                      className="group block"
                    >
                      <div className="flex space-x-3 p-3 rounded-xl hover:bg-primary-50 transition-colors duration-200">
                        <div className="relative w-24 h-16 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-lg overflow-hidden flex-shrink-0">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Play className="w-4 h-4 text-primary-600" />
                          </div>
                          <div className="absolute bottom-1 right-1">
                            <span className="bg-black/70 text-white text-xs px-1 py-0.5 rounded">
                              {relatedVideo.duration}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-text-primary group-hover:text-primary-600 transition-colors duration-200 line-clamp-2">
                            {relatedVideo.title}
                          </h4>
                          <p className="text-xs text-text-secondary mt-1">
                            {relatedVideo.instructor}
                          </p>
                          <div className="flex items-center space-x-2 mt-2">
                            <span className="text-xs text-primary-600">
                              {relatedVideo.category}
                            </span>
                            <span className="text-xs text-text-muted">
                              {relatedVideo.level}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-primary-100">
                  <Link
                    href="/clases"
                    className="w-full inline-flex items-center justify-center space-x-2 bg-primary-600 text-white px-4 py-3 rounded-xl font-medium hover:bg-primary-700 transition-colors duration-200"
                  >
                    <span>Ver más clases</span>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default VideoPage; 