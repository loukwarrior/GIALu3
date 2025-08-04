'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { X, ChevronDown, ChevronUp } from 'lucide-react';
import { videosData } from '@/lib/videos';
import instructorsData from '@/data/instructors.json';

const ClassFinderContent = () => {
  const searchParams = useSearchParams();
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    yoga: false,
    fitness: false,
    mindfulness: false,
    wellness: false,
    skills: false,
    duration: false,
    instructors: false
  });
  const [sortBy, setSortBy] = useState('most-relevant');

  // Leer parámetros de URL y aplicar filtros automáticamente
  useEffect(() => {
    const category = searchParams.get('category');
    const subcategory = searchParams.get('subcategory');
    const level = searchParams.get('level');
    
    const initialFilters: string[] = [];
    
    if (category) {
      initialFilters.push(category);
      // Expandir la sección correspondiente
      setExpandedSections(prev => ({
        ...prev,
        [category]: true
      }));
    }
    
    if (subcategory) {
      initialFilters.push(subcategory);
    }
    
    if (level) {
      initialFilters.push(level);
      setExpandedSections(prev => ({
        ...prev,
        skills: true
      }));
    }
    
    if (initialFilters.length > 0) {
      setSelectedFilters(initialFilters);
    }
  }, [searchParams]);

  // Mapeo de términos en español a valores en datos
  const filterMapping: Record<string, string> = {
    'técnicas de respiración': 'breathwork',
    'atención plena': 'mindfulness',
  };

  // Categorizar y ordenar clases
  const categorizedClasses = useMemo(() => {
    const filtered = videosData.filter(video => {
      if (selectedFilters.length === 0) return true;
      return selectedFilters.every(filter => {
        const mappedFilter = filterMapping[filter.toLowerCase()] || filter.toLowerCase();
        
        // Filtrar por duración
        if (['5-15 min', '15-30 min', '30-45 min', '45+ min'].includes(filter)) {
          const videoDuration = parseInt(video.duration) || 0;
          switch (filter) {
            case '5-15 min':
              return videoDuration >= 5 && videoDuration <= 15;
            case '15-30 min':
              return videoDuration > 15 && videoDuration <= 30;
            case '30-45 min':
              return videoDuration > 30 && videoDuration <= 45;
            case '45+ min':
              return videoDuration > 45;
            default:
              return false;
          }
        }
        
        return video.category?.toLowerCase() === mappedFilter ||
               video.subcategory?.toLowerCase() === mappedFilter ||
               video.level?.toLowerCase() === mappedFilter ||
               video.instructor?.toLowerCase() === mappedFilter;
      });
    });

    // Aplicar ordenamiento
    switch (sortBy) {
      case 'newest':
        return filtered.sort((a, b) => b.id - a.id); // Asumiendo que ID más alto = más nuevo
      case 'most-relevant':
        return filtered.sort((a, b) => a.title.localeCompare(b.title)); // Por título como relevancia
      case 'most-popular':
        return filtered.sort((a, b) => a.title.localeCompare(b.title)); // Por ahora ordenamos alfabéticamente hasta tener datos de popularidad
      case 'alphabetical':
        return filtered.sort((a, b) => a.title.localeCompare(b.title));
      case 'duration-short':
        return filtered.sort((a, b) => {
          const durationA = parseInt(a.duration) || 0;
          const durationB = parseInt(b.duration) || 0;
          return durationA - durationB;
        });
      case 'duration-long':
        return filtered.sort((a, b) => {
          const durationA = parseInt(a.duration) || 0;
          const durationB = parseInt(b.duration) || 0;
          return durationB - durationA;
        });
      default:
        return filtered;
    }
  }, [selectedFilters, sortBy]);

  const addFilter = (filter: string) => {
    if (!selectedFilters.includes(filter)) {
      setSelectedFilters([...selectedFilters, filter]);
    }
  };

  const removeFilter = (filter: string) => {
    setSelectedFilters(selectedFilters.filter(f => f !== filter));
  };

  const clearAllFilters = () => {
    setSelectedFilters([]);
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const formatDuration = (duration: string) => {
    const match = duration.match(/(\d+)/);
    return match ? `${match[1]}:00` : duration;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="pt-20">
        {/* Hero Section */}
        <div className="bg-white py-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-display">
            BUSCAR CLASES
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto px-4">
            ENCUENTRA EL ENTRENAMIENTO PERFECTO O LA CLASE DE BIENESTAR PARA TU ESTADO DE ÁNIMO.
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex gap-8">
            {/* Sidebar Filters */}
            <div className="w-80 bg-white shadow-sm p-6 h-fit sticky top-24">
              {/* Active Filters */}
              <div className="mb-6">
                {selectedFilters.map(filter => (
                  <div key={filter} className="inline-flex items-center bg-gray-100 px-3 py-1 text-sm mr-2 mb-2">
                    <span className="capitalize">{filter}</span>
                    <button
                      onClick={() => removeFilter(filter)}
                      className="ml-2 hover:text-red-500"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Filter Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-gray-900">
                  Filtros ({selectedFilters.length})
                </h3>
                {selectedFilters.length > 0 && (
                  <button
                    onClick={clearAllFilters}
                    className="text-sm text-gray-500 hover:text-gray-700 underline"
                  >
                    Limpiar Todo
                  </button>
                )}
              </div>

              <div className="text-sm text-gray-600 mb-6">
                {categorizedClasses.length} Clases
              </div>

              {/* Filter Sections */}
              <div className="space-y-4">
                {/* YOGA */}
                <div>
                  <button
                    onClick={() => toggleSection('yoga')}
                    className="flex items-center justify-between w-full py-2 text-left font-medium text-gray-900 hover:text-gray-700"
                  >
                    YOGA
                    {expandedSections.yoga ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                  {expandedSections.yoga && (
                    <div className="pl-4 space-y-2 mt-2">
                      {['Todas las clases de Yoga', 'Hatha', 'Vinyasa', 'Restaurativo'].map(item => (
                        <button
                          key={item}
                          onClick={() => addFilter(item === 'Todas las clases de Yoga' ? 'yoga' : item.toLowerCase())}
                          className={`block text-sm py-1 w-full text-left ${
                            selectedFilters.includes(item === 'Todas las clases de Yoga' ? 'yoga' : item.toLowerCase())
                              ? 'text-primary-600 font-medium'
                              : 'text-gray-600 hover:text-gray-900'
                          }`}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* FITNESS */}
                <div>
                  <button
                    onClick={() => toggleSection('fitness')}
                    className="flex items-center justify-between w-full py-2 text-left font-medium text-gray-900 hover:text-gray-700"
                  >
                    FITNESS
                    {expandedSections.fitness ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                  {expandedSections.fitness && (
                    <div className="pl-4 space-y-2 mt-2">
                      {['Todas las clases de Fitness', 'Pilates', 'HIIT', 'Cardio'].map(item => (
                        <button
                          key={item}
                          onClick={() => addFilter(item === 'Todas las clases de Fitness' ? 'fitness' : item.toLowerCase())}
                          className={`block text-sm py-1 w-full text-left ${
                            selectedFilters.includes(item === 'Todas las clases de Fitness' ? 'fitness' : item.toLowerCase())
                              ? 'text-primary-600 font-medium'
                              : 'text-gray-600 hover:text-gray-900'
                          }`}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* MINDFULNESS */}
                <div>
                  <button
                    onClick={() => toggleSection('mindfulness')}
                    className="flex items-center justify-between w-full py-2 text-left font-medium text-gray-900 hover:text-gray-700"
                  >
                    ATENCIÓN PLENA
                    {expandedSections.mindfulness ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                  {expandedSections.mindfulness && (
                    <div className="pl-4 space-y-2 mt-2">
                      {['Meditación', 'Técnicas de Respiración', 'Atención Plena'].map(item => (
                        <button
                          key={item}
                          onClick={() => addFilter(item.toLowerCase())}
                          className="block text-sm text-gray-600 hover:text-gray-900 py-1"
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* WELLNESS */}
                <div>
                  <button
                    onClick={() => toggleSection('wellness')}
                    className="flex items-center justify-between w-full py-2 text-left font-medium text-gray-900 hover:text-gray-700"
                  >
                    BIENESTAR
                    {expandedSections.wellness ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                  {expandedSections.wellness && (
                    <div className="pl-4 space-y-2 mt-2">
                      {['Todas las clases de Wellness', 'Bienestar', 'Relajación'].map(item => (
                        <button
                          key={item}
                          onClick={() => addFilter(item === 'Todas las clases de Wellness' ? 'wellness' : item.toLowerCase())}
                          className="block text-sm text-gray-600 hover:text-gray-900 py-1"
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* SKILLS */}
                <div>
                  <button
                    onClick={() => toggleSection('skills')}
                    className="flex items-center justify-between w-full py-2 text-left font-medium text-gray-900 hover:text-gray-700"
                  >
                    NIVEL
                    {expandedSections.skills ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                  {expandedSections.skills && (
                    <div className="pl-4 space-y-2 mt-2">
                      {['Principiante', 'Intermedio', 'Avanzado'].map(item => (
                        <button
                          key={item}
                          onClick={() => addFilter(item.toLowerCase())}
                          className={`block text-sm py-1 w-full text-left ${
                            selectedFilters.includes(item.toLowerCase())
                              ? 'text-primary-600 font-medium'
                              : 'text-gray-600 hover:text-gray-900'
                          }`}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* DURATION */}
                <div>
                  <button
                    onClick={() => toggleSection('duration')}
                    className="flex items-center justify-between w-full py-2 text-left font-medium text-gray-900 hover:text-gray-700"
                  >
                    DURACIÓN
                    {expandedSections.duration ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                  {expandedSections.duration && (
                    <div className="pl-4 space-y-2 mt-2">
                      {['5-15 min', '15-30 min', '30-45 min', '45+ min'].map(item => (
                        <button
                          key={item}
                          onClick={() => addFilter(item.toLowerCase())}
                          className={`block text-sm py-1 w-full text-left ${
                            selectedFilters.includes(item.toLowerCase())
                              ? 'text-primary-600 font-medium'
                              : 'text-gray-600 hover:text-gray-900'
                          }`}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* INSTRUCTORS */}
                <div>
                  <button
                    onClick={() => toggleSection('instructors')}
                    className="flex items-center justify-between w-full py-2 text-left font-medium text-gray-900 hover:text-gray-700"
                  >
                    INSTRUCTORES
                    {expandedSections.instructors ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                  {expandedSections.instructors && (
                    <div className="pl-4 space-y-2 mt-2">
                      {instructorsData.map(instructor => (
                        <button
                          key={instructor.id}
                          onClick={() => addFilter(instructor.name.toLowerCase())}
                          className={`block text-sm py-1 w-full text-left ${
                            selectedFilters.includes(instructor.name.toLowerCase())
                              ? 'text-primary-600 font-medium'
                              : 'text-gray-600 hover:text-gray-900'
                          }`}
                        >
                          {instructor.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {/* Sort Dropdown */}
              <div className="flex justify-end mb-6">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 px-4 py-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="most-relevant">Más Relevante</option>
                  <option value="most-popular">Más Popular</option>
                  <option value="alphabetical">A → Z</option>
                  <option value="newest">Más Nuevos</option>
                  <option value="duration-short">Duración Corta-Larga</option>
                  <option value="duration-long">Duración Larga-Corta</option>
                </select>
              </div>

              {/* Classes Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categorizedClasses.map((video) => (
                  <Link
                    key={video.id}
                    href={`/video/${video.id}`}
                    className="group block"
                  >
                    <div className="bg-white shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200">
                      <div className="relative">
                        <Image
                          src={video.thumbnail}
                          alt={video.title}
                          width={400}
                          height={225}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute bottom-2 left-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1">
                          {formatDuration(video.duration)}
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-primary-600 transition-colors">
                          {video.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-1">{video.instructor}</p>
                        <p className="text-sm text-gray-500 capitalize">{video.level}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {categorizedClasses.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500">No se encontraron clases con los filtros seleccionados.</p>
                  <button
                    onClick={clearAllFilters}
                    className="mt-4 text-primary-600 hover:text-primary-700 underline"
                  >
                    Limpiar filtros
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

const ClassFinder = () => {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
        <p className="mt-4 text-gray-600">Cargando clases...</p>
      </div>
    </div>}>
      <ClassFinderContent />
    </Suspense>
  );
};

export default ClassFinder;