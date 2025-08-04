import videosDataRaw from '@/data/videos.json';

// Función para filtrar solo videos reales (no de ejemplo/simulación)
export const getRealVideos = () => {
  return videosDataRaw.filter(video => 
    // Videos reales tienen URLs de Vercel Blob, no de YouTube
    !video.videoUrl.includes('youtube.com') && 
    // Y no tienen thumbnails placeholder
    !video.thumbnail.includes('/api/placeholder/')
  );
};

// Exportar videos reales por defecto
export const videosData = getRealVideos();

// También exportar los datos originales por si se necesitan para testing
export const videosDataOriginal = videosDataRaw;