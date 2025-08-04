'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ArrowRight, Play, Heart, Clock, Users, Sparkles } from 'lucide-react';
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

  const categories = [
    {
      name: 'Yoga',
      description: 'Encuentra equilibrio entre cuerpo y mente',
      color: 'from-purple-200 to-purple-300',
      href: '/yoga',
      count: videosData.filter(v => v.category === 'yoga').length
    },
    {
      name: 'Fitness',
      description: 'Fortalece tu cuerpo con entrenamientos dinámicos',
      color: 'from-orange-200 to-orange-300',
      href: '/fitness',
      count: videosData.filter(v => v.category === 'fitness').length
    },
    {
      name: 'Wellness',
      description: 'Cultiva tu bienestar integral y mindfulness',
      color: 'from-pink-200 to-pink-300',
      href: '/wellness',
      count: videosData.filter(v => v.category === 'wellness').length
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section with Daily Mantra */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-primary-700 border border-primary-200/50 mb-8">
              <Sparkles className="w-4 h-4" />
              <span>Mantra de hoy</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-accent font-bold text-text-primary mb-6 leading-tight">
              Bienvenida a{' '}
              <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                GIA
              </span>
            </h1>
            
                        <div className="max-w-3xl mx-auto mb-12">
              <blockquote className="text-xl md:text-2xl text-text-secondary font-body italic leading-relaxed">
                &ldquo;{currentMantra.text}&rdquo;
              </blockquote>
              <cite className="text-primary-600 font-medium mt-4 block">
                — {currentMantra.author}
              </cite>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/yoga"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-8 py-4 rounded-2xl font-medium hover:from-primary-600 hover:to-secondary-600 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <Play className="w-5 h-5" />
                <span>Explorar Clases</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              
              <Link
                href="/mi-progreso"
                className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm text-primary-700 px-8 py-4 rounded-2xl font-medium hover:bg-white transition-all duration-200 shadow-lg hover:shadow-xl border border-primary-200/50"
              >
                <Heart className="w-5 h-5" />
                <span>Mi Progreso</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-text-primary mb-4">
              Descubre tu práctica ideal
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Explora nuestras categorías de bienestar diseñadas para nutrir tu cuerpo, mente y espíritu.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className="group"
              >
                                 <div className={`relative overflow-hidden bg-gradient-to-br ${category.color} rounded-3xl p-8 h-full transition-all duration-300 hover:scale-105 hover:shadow-xl`}>
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-text-primary mb-4 font-display">
                      {category.name}
                    </h3>
                    <p className="text-text-secondary mb-6 text-sm leading-relaxed">
                      {category.description}
                    </p>
                    <div className="flex items-center justify-center space-x-2 text-sm text-primary-700 font-medium">
                      <Users className="w-4 h-4" />
                      <span>{category.count} clases</span>
                    </div>
                  </div>
                  
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </Link>
            ))}
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
      <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">
            Únete a la comunidad GIA
          </h2>
          <p className="text-xl text-primary-100 mb-8 leading-relaxed">
            Más que una app de ejercicios, somos una comunidad de mujeres que se apoyan 
            en su camino hacia el bienestar integral.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/clases"
              className="inline-flex items-center space-x-2 bg-white text-primary-700 px-8 py-4 rounded-2xl font-medium hover:bg-primary-50 transition-colors duration-200"
            >
              <span>Comenzar ahora</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
