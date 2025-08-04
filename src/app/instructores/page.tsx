'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Users, Search, Instagram, Globe, Award } from 'lucide-react';
import instructorsData from '@/data/instructors.json';
import videosData from '@/data/videos.json';

const InstructoresPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const filteredInstructors = instructorsData.filter(instructor => {
    const matchesSearch = instructor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         instructor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === '' || instructor.categories.includes(selectedCategory);
    
    return matchesSearch && matchesCategory;
  });

  const getInstructorVideosCount = (instructorName: string) => {
    return videosData.filter(video => video.instructor === instructorName).length;
  };

  const categories = ['yoga', 'fitness', 'wellness'];

  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-display font-bold text-text-primary mb-4">
            Nuestros Instructores
          </h1>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Conoce a nuestro equipo de expertos instructores certificados. 
            Cada uno aporta su experiencia única para guiarte en tu viaje de bienestar.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-primary-100/50 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted w-5 h-5" />
                <input
                  type="text"
                  placeholder="Buscar instructores..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-primary-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="md:w-64">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-3 border border-primary-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">Todas las especialidades</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold text-text-primary">
            {filteredInstructors.length} instructor{filteredInstructors.length !== 1 ? 'es' : ''} encontrado{filteredInstructors.length !== 1 ? 's' : ''}
          </h2>
        </div>

        {/* Instructors Grid */}
        {filteredInstructors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredInstructors.map((instructor) => (
              <div key={instructor.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                {/* Instructor Image */}
                <div className="relative h-64 bg-gradient-to-br from-primary-100 to-secondary-100">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <Users className="w-16 h-16 text-primary-600" />
                    </div>
                  </div>
                  
                  {instructor.featured && (
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center space-x-1 bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                        <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                        <span>Destacado</span>
                      </span>
                    </div>
                  )}
                </div>

                {/* Instructor Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-text-primary mb-2">
                    {instructor.name}
                  </h3>
                  
                  <p className="text-primary-600 font-medium mb-3">
                    {instructor.specialty}
                  </p>
                  
                  <p className="text-text-secondary text-sm mb-4 line-clamp-3">
                    {instructor.bio}
                  </p>

                  {/* Credentials */}
                  <div className="mb-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Award className="w-4 h-4 text-text-muted" />
                      <span className="text-sm font-medium text-text-secondary">Certificaciones</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {instructor.credentials.map((credential, index) => (
                        <span 
                          key={index}
                          className="bg-primary-100 text-primary-700 px-2 py-1 rounded text-xs"
                        >
                          {credential}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Categories */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {instructor.categories.map((category, index) => (
                        <span 
                          key={index}
                          className="bg-secondary-100 text-secondary-700 px-2 py-1 rounded text-xs capitalize"
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="mb-4">
                    <span className="text-sm text-text-secondary">
                      {getInstructorVideosCount(instructor.name)} clase{getInstructorVideosCount(instructor.name) !== 1 ? 's' : ''} disponible{getInstructorVideosCount(instructor.name) !== 1 ? 's' : ''}
                    </span>
                  </div>

                  {/* Social Links */}
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-3">
                      {instructor.social.instagram && (
                        <a 
                          href={`https://instagram.com/${instructor.social.instagram.replace('@', '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-text-muted hover:text-pink-500 transition-colors"
                        >
                          <Instagram className="w-5 h-5" />
                        </a>
                      )}
                      {instructor.social.website && (
                        <a 
                          href={instructor.social.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-text-muted hover:text-primary-600 transition-colors"
                        >
                          <Globe className="w-5 h-5" />
                        </a>
                      )}
                    </div>

                    {/* View Classes Button */}
                    <Link
                      href={`/clases?instructor=${encodeURIComponent(instructor.name)}`}
                      className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors duration-200 text-sm font-medium"
                    >
                      Ver clases
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="w-12 h-12 text-primary-600" />
            </div>
            <h3 className="text-xl font-semibold text-text-primary mb-2">
              No se encontraron instructores
            </h3>
            <p className="text-text-secondary mb-6">
              Intenta ajustar tu búsqueda para encontrar más instructores.
            </p>
            <button 
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('');
              }}
              className="bg-primary-500 text-white px-6 py-3 rounded-xl hover:bg-primary-600 transition-colors duration-200"
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

export default InstructoresPage;