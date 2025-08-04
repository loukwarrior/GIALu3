'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import VideoPlayer from '@/components/VideoPlayer';
import { ArrowRight, Play, Heart, Clock } from 'lucide-react';
import mantrasData from '@/data/mantras.json';
import videosData from '@/data/videos.json';

// Default values outside component to avoid recreation on every render
const defaultMantra = mantrasData[0];
const defaultVideos = videosData.slice(0, 3);

const HomePage = () => {
  const [currentMantra, setCurrentMantra] = useState(defaultMantra);
  const [featuredVideos, setFeaturedVideos] = useState(defaultVideos);
  
  useEffect(() => {
    // Seleccionar mantra basado en el día del año - solo después de hidratación
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now.getTime() - start.getTime();
    const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
    const mantraIndex = dayOfYear % mantrasData.length;
    
    // Solo actualizar si es diferente al default para evitar re-renders innecesarios
    if (mantraIndex !== 0) {
      setCurrentMantra(mantrasData[mantraIndex]);
    }
    
    // Seleccionar videos destacados usando una semilla basada en la fecha
    const seed = now.getDate();
    const seededRandom = (seed: number) => {
      const x = Math.sin(seed) * 10000;
      return x - Math.floor(x);
    };
    
    const shuffled = [...videosData].sort((a, b) => seededRandom(seed + a.id) - seededRandom(seed + b.id));
    const newFeaturedVideos = shuffled.slice(0, 3);
    
    // Solo actualizar si son diferentes a los default
    const isDifferent = newFeaturedVideos.some((video, index) => video.id !== defaultVideos[index]?.id);
    if (isDifferent) {
      setFeaturedVideos(newFeaturedVideos);
    }
  }, []); // Array vacío - solo ejecutar una vez al mount

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Video Hero Section */}
      <section className="relative h-screen overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0">
          {/* Video de fondo - usando el primer video como ejemplo, puedes cambiar la URL */}
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover scale-110"
            style={{ pointerEvents: 'none' }}
          >
            <source src="https://g8vcni9w6iprkhuv.public.blob.vercel-storage.com/Video%2007.MP4" type="video/mp4" />
          </video>
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/30 to-primary-900/40"></div>
        </div>
        
        {/* Content overlay */}
        <div className="relative h-full flex items-center justify-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-white border border-white/30 mb-8">
              <span>Mantra de hoy</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-accent font-bold text-white mb-6 leading-tight drop-shadow-lg">
              Conecta con tu{' '}
              <span className="bg-gradient-to-r from-primary-300 to-secondary-300 bg-clip-text text-transparent">
                bienestar
              </span>
            </h1>
            
            <div className="max-w-3xl mx-auto mb-12">
              <blockquote className="text-xl md:text-2xl text-white/90 font-body italic leading-relaxed drop-shadow-md">
                &ldquo;{currentMantra.text}&rdquo;
              </blockquote>
              <cite className="text-primary-200 font-medium mt-4 block">
                — {currentMantra.author}
              </cite>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/clases"
                className="inline-flex items-center space-x-2 bg-white text-primary-700 px-8 py-4 rounded-2xl font-medium hover:bg-primary-50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Play className="w-5 h-5" />
                <span>Comenzar mi práctica</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              
              <Link
                href="/mis-clases"
                className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-2xl font-medium hover:bg-white/20 transition-all duration-200 border border-white/30"
              >
                <Heart className="w-5 h-5" />
                <span>Mis favoritos</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Videos Section */}
      <section className="py-20 bg-gradient-to-br from-accent-50 to-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-text-primary mb-4">
              Clases destacadas
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Comienza con estas sesiones cuidadosamente seleccionadas para tu bienestar.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredVideos.map((video) => (
              <Link
                key={video.id}
                href={`/video/${video.id}`}
                className="group"
              >
                <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                  <div className="relative aspect-video bg-gradient-to-br from-primary-100 to-secondary-100">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Play className="w-6 h-6 text-primary-600 ml-1" />
                      </div>
                    </div>
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center space-x-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-primary-700">
                        <Clock className="w-3 h-3" />
                        <span>{video.duration}</span>
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className="inline-block bg-secondary-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                        {video.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-text-primary mb-2 group-hover:text-primary-600 transition-colors duration-200">
                      {video.title}
                    </h3>
                    <p className="text-text-secondary text-sm mb-3 line-clamp-2">
                      {video.description}
                    </p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-primary-600 font-medium">
                        {video.instructor}
                      </span>
                      <span className="text-text-muted">
                        {video.level}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link
              href="/clases"
              className="inline-flex items-center space-x-2 bg-primary-600 text-white px-8 py-4 rounded-2xl font-medium hover:bg-primary-700 transition-colors duration-200"
            >
              <span>Ver todas las clases</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Community CTA Section */}
      <section className="relative py-24 overflow-hidden bg-cover bg-center bg-no-repeat" style={{backgroundImage: 'url(https://g8vcni9w6iprkhuv.public.blob.vercel-storage.com/DSC08282c.JPG)'}}>
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/50 to-black/70"></div>
        
        {/* Background Decorative Elements */}
        <div className="absolute inset-0">
          {/* Large Circle */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          {/* Medium Circle */}
          <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-primary-300/20 rounded-full blur-2xl"></div>
          {/* Small Floating Elements */}
          <div className="absolute top-1/4 left-1/4 w-8 h-8 bg-white/20 rounded-full animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/3 w-6 h-6 bg-primary-200/30 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute top-2/3 right-1/4 w-4 h-4 bg-white/15 rounded-full animate-pulse delay-500"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 leading-tight">
            Únete a la comunidad GIA
          </h2>
          <p className="text-xl md:text-2xl text-white/90 mb-10 leading-relaxed max-w-3xl mx-auto">
            Más que una app de ejercicios, somos una comunidad de mujeres que se apoyan 
            en su camino hacia el bienestar integral.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/clases"
              className="inline-flex items-center justify-center space-x-3 bg-white text-primary-700 px-10 py-5 font-semibold hover:bg-primary-50 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl group"
            >
              <span className="text-lg">Comenzar ahora</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
