import { put, del, list } from '@vercel/blob';

// Configuración para Vercel Blob Storage
export const blobConfig = {
  // Token se configura automáticamente desde variables de entorno
  // BLOB_READ_WRITE_TOKEN debe estar en .env.local
};

// Función para subir videos a Vercel Blob
export async function uploadVideo(file: File, fileName: string) {
  try {
    const blob = await put(fileName, file, {
      access: 'public',
      contentType: file.type,
    });
    
    return {
      success: true,
      url: blob.url,
      downloadUrl: blob.downloadUrl,
    };
  } catch (error) {
    console.error('Error uploading video:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

// Función para eliminar videos
export async function deleteVideo(url: string) {
  try {
    await del(url);
    return { success: true };
  } catch (error) {
    console.error('Error deleting video:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

// Función para listar todos los videos
export async function listVideos() {
  try {
    const { blobs } = await list();
    return {
      success: true,
      videos: blobs.filter(blob => 
        blob.pathname.endsWith('.mp4') || 
        blob.pathname.endsWith('.webm') || 
        blob.pathname.endsWith('.mov')
      ),
    };
  } catch (error) {
    console.error('Error listing videos:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

// Función helper para generar URLs de Vercel Blob
export function getBlobVideoUrl(filename: string) {
  // Esta URL se generará automáticamente cuando subas los videos
  // Formato típico: https://[random-id].public.blob.vercel-storage.com/[filename]
  return `https://[tu-blob-storage-id].public.blob.vercel-storage.com/videos/${filename}`;
}

// Función para generar thumbnail desde video
export function getBlobThumbnailUrl(videoFilename: string) {
  const thumbnailName = videoFilename.replace(/\.(mp4|webm|mov)$/i, '.jpg');
  return `https://[tu-blob-storage-id].public.blob.vercel-storage.com/thumbnails/${thumbnailName}`;
}