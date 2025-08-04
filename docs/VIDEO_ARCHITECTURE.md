# 🎬 Arquitectura de Videos - GIA Wellness

## 🎯 Opciones de Implementación

### 📋 **Opción 1: Supabase + Cloudinary (RECOMENDADA)**

#### Stack Tecnológico:
- **Base de datos**: Supabase (PostgreSQL)
- **Almacenamiento**: Cloudinary (optimización automática)
- **CDN**: Cloudinary CDN global
- **Streaming**: HLS/DASH adaptativo

#### Ventajas:
✅ **Optimización automática** (compresión, formatos múltiples)
✅ **CDN global** (carga rápida worldwide)
✅ **Streaming adaptativo** (ajusta calidad según conexión)
✅ **Thumbnails automáticos** generados
✅ **Analytics** de visualización
✅ **Fácil integración** con Next.js

#### Estructura de Datos:
```sql
-- Tabla principal de videos
CREATE TABLE videos (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  instructor_id INTEGER REFERENCES instructors(id),
  duration_seconds INTEGER,
  level video_level_enum,
  intensity INTEGER CHECK (intensity BETWEEN 1 AND 4),
  category video_category_enum,
  subcategory VARCHAR(100),
  objective video_objective_enum,
  
  -- URLs de archivos
  cloudinary_public_id VARCHAR(255), -- ID único en Cloudinary
  video_url TEXT, -- URL del video principal
  thumbnail_url TEXT, -- Thumbnail automático
  preview_gif_url TEXT, -- GIF preview
  
  -- Metadatos técnicos
  file_size_mb DECIMAL(10,2),
  resolution VARCHAR(20), -- "1080p", "720p", "480p"
  bitrate_kbps INTEGER,
  formats TEXT[], -- ["mp4", "webm", "hls"]
  
  -- SEO y organización
  slug VARCHAR(255) UNIQUE,
  tags TEXT[],
  equipment TEXT[],
  focus_areas TEXT[],
  
  -- Estado y fechas
  status video_status_enum DEFAULT 'draft',
  published_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabla de instructores
CREATE TABLE instructors (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE,
  bio TEXT,
  specialty VARCHAR(255),
  credentials TEXT[],
  avatar_url TEXT,
  social_links JSONB,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Enums para consistencia
CREATE TYPE video_level_enum AS ENUM ('principiante', 'intermedio', 'avanzado');
CREATE TYPE video_category_enum AS ENUM ('yoga', 'fitness', 'wellness', 'meditacion');
CREATE TYPE video_objective_enum AS ENUM ('relajacion', 'energia', 'tonificacion', 'bienestar');
CREATE TYPE video_status_enum AS ENUM ('draft', 'processing', 'published', 'archived');
```

#### Implementación en Next.js:
```typescript
// lib/videos.ts
import { createClient } from '@supabase/supabase-js'
import { v2 as cloudinary } from 'cloudinary'

// Configuración de Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export interface Video {
  id: number
  title: string
  description: string
  instructor: Instructor
  duration_seconds: number
  level: 'principiante' | 'intermedio' | 'avanzado'
  intensity: 1 | 2 | 3 | 4
  category: string
  video_url: string
  thumbnail_url: string
  preview_gif_url?: string
  tags: string[]
  equipment: string[]
  focus_areas: string[]
  slug: string
}

// Obtener videos con paginación
export async function getVideos(filters?: VideoFilters) {
  const supabase = createClient(...)
  
  let query = supabase
    .from('videos')
    .select(`
      *,
      instructor:instructors(*)
    `)
    .eq('status', 'published')
    .order('created_at', { ascending: false })

  if (filters?.category) {
    query = query.eq('category', filters.category)
  }
  
  if (filters?.level) {
    query = query.eq('level', filters.level)
  }

  const { data, error } = await query
  return { videos: data, error }
}
```

---

### 📋 **Opción 2: Vercel Blob + Supabase**

#### Stack:
- **Storage**: Vercel Blob Storage
- **Base de datos**: Supabase
- **CDN**: Vercel Edge Network

#### Pros:
✅ **Integración nativa** con Vercel
✅ **Deploy automático** de assets
✅ **Edge caching** global

#### Contras:
❌ **Sin optimización automática** de video
❌ **Sin streaming adaptativo**
❌ **Límites de ancho de banda** según plan

---

### 📋 **Opción 3: AWS S3 + CloudFront**

#### Stack:
- **Storage**: AWS S3
- **CDN**: CloudFront
- **Transcoding**: AWS Elemental MediaConvert
- **Streaming**: AWS Elemental MediaStore

#### Pros:
✅ **Escalabilidad enterprise**
✅ **Control total** del pipeline
✅ **Streaming profesional** (HLS/DASH)

#### Contras:
❌ **Complejidad alta** de setup
❌ **Costos variables** pueden ser altos
❌ **Requiere expertise AWS**

---

## 🚀 **Plan de Migración Recomendado**

### Fase 1: Setup Inicial (1-2 días)
1. **Configurar Supabase** proyecto
2. **Crear esquema** de base de datos
3. **Setup Cloudinary** cuenta
4. **Migrar metadatos** de videos.json a BD

### Fase 2: Subida de Videos (3-5 días)
1. **Crear admin panel** para subir videos
2. **Procesar videos existentes** de YouTube (si tienes acceso)
3. **Generar thumbnails** automáticos
4. **Optimizar formatos** múltiples

### Fase 3: Frontend Integration (2-3 días)
1. **Actualizar componentes** para nueva API
2. **Implementar video player** con controles
3. **Testing cross-browser**
4. **Performance optimization**

---

## 💰 **Estimación de Costos (mensual)**

### Cloudinary (Plan Pro):
- **$99/mes** para 10GB storage + 50GB bandwidth
- **Optimización automática** incluida
- **Analytics** incluidos

### Supabase:
- **$25/mes** para plan Pro (500MB DB)
- **Backups automáticos**
- **APIs REST/GraphQL**

### Total estimado: **~$124/mes** para 50-100 videos

---

## 🎬 **Componente Video Player**

```typescript
// components/VideoPlayer.tsx
'use client'

import { useRef, useState } from 'react'

interface VideoPlayerProps {
  video: Video
  autoplay?: boolean
  onProgress?: (progress: number) => void
}

export default function VideoPlayer({ 
  video, 
  autoplay = false, 
  onProgress 
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100
      setProgress(progress)
      onProgress?.(progress)
    }
  }

  return (
    <div className="relative group">
      <video
        ref={videoRef}
        className="w-full h-auto rounded-lg"
        poster={video.thumbnail_url}
        controls
        autoPlay={autoplay}
        onTimeUpdate={handleTimeUpdate}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      >
        {/* Múltiples formatos para compatibilidad */}
        <source 
          src={video.video_url.replace('.mp4', '.webm')} 
          type="video/webm" 
        />
        <source 
          src={video.video_url} 
          type="video/mp4" 
        />
        Tu navegador no soporta video HTML5.
      </video>
      
      {/* Overlay con información */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <h3 className="text-white font-medium">{video.title}</h3>
        <p className="text-white/80 text-sm">{video.instructor.name}</p>
      </div>
    </div>
  )
}
```

---

## 🔄 **API Routes para Admin**

```typescript
// app/api/admin/videos/upload/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('video') as File
    
    if (!file) {
      return NextResponse.json({ error: 'No video file' }, { status: 400 })
    }

    // Subir a Cloudinary con transformaciones
    const uploadResult = await cloudinary.uploader.upload_large(
      `data:video/mp4;base64,${Buffer.from(await file.arrayBuffer()).toString('base64')}`,
      {
        resource_type: 'video',
        public_id: `gia-videos/${Date.now()}`,
        eager: [
          { quality: 'auto', format: 'mp4' },
          { quality: 'auto', format: 'webm' },
          { width: 400, height: 225, crop: 'fill', format: 'jpg' } // thumbnail
        ],
        eager_async: true
      }
    )

    // Guardar en Supabase
    const { data, error } = await supabase
      .from('videos')
      .insert({
        title: formData.get('title'),
        description: formData.get('description'),
        cloudinary_public_id: uploadResult.public_id,
        video_url: uploadResult.secure_url,
        thumbnail_url: uploadResult.eager?.[2]?.secure_url,
        duration_seconds: uploadResult.duration,
        file_size_mb: uploadResult.bytes / (1024 * 1024),
        // ... otros campos
      })

    return NextResponse.json({ success: true, video: data })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
```

---

## 🎯 **Próximos Pasos**

¿Qué opción prefieres? Te recomiendo **Opción 1 (Supabase + Cloudinary)** por:

1. **Facilidad de implementación**
2. **Optimización automática**
3. **Costos predecibles**
4. **Escalabilidad**

¿Quieres que implemente alguna de estas opciones?