# 🎥 Configuración de Vercel Blob Storage para GIA Wellness

## 📋 **Pasos para configurar Vercel Blob Storage**

### **1. Configurar Vercel Blob en tu proyecto**

1. Ve a tu dashboard de **Vercel**
2. Selecciona tu proyecto **GIA Wellness**
3. Ve a **Storage** → **Blob**
4. Crea un nuevo **Blob Store**
5. Copia el **token** que se genera

### **2. Variables de entorno**

Crea un archivo `.env.local` en la raíz de tu proyecto con:

```bash
# Token de Vercel Blob (OBLIGATORIO)
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_xxxxxxxxxxxxxxxxx

# URL base de tu Blob Storage (opcional, se genera automáticamente)
NEXT_PUBLIC_BLOB_BASE_URL=https://tu-blob-id.public.blob.vercel-storage.com
```

### **3. Estructura de carpetas en Blob Storage**

Organiza tus archivos así:

```
videos/
├── hero-background.mp4          # Video de fondo de la página principal
├── yoga-principiantes.mp4       # Video 1
├── meditacion-mindfulness.mp4   # Video 2
├── pilates-core.mp4            # Video 3
└── ...

thumbnails/
├── hero-background.jpg
├── yoga-principiantes.jpg
├── meditacion-mindfulness.jpg
├── pilates-core.jpg
└── ...
```

### **4. Actualizar URLs en videos.json**

Una vez que subas tus videos, actualiza el archivo `src/data/videos.json`:

```json
{
  "id": 1,
  "title": "Yoga para Principiantes - Saludo al Sol",
  "videoUrl": "https://tu-blob-id.public.blob.vercel-storage.com/videos/yoga-principiantes.mp4",
  "thumbnail": "https://tu-blob-id.public.blob.vercel-storage.com/thumbnails/yoga-principiantes.jpg",
  // ... resto de propiedades
}
```

### **5. Subir videos**

Puedes subir videos de dos formas:

#### **A) Desde el Dashboard de Vercel:**
1. Ve a **Storage** → **Blob** 
2. Arrastra y suelta tus archivos
3. Copia las URLs generadas

#### **B) Programáticamente (para futuro):**
```typescript
import { uploadVideo } from '@/lib/vercel-blob';

const result = await uploadVideo(file, 'videos/mi-video.mp4');
console.log(result.url); // URL para usar en tu app
```

### **6. Formatos de video recomendados**

Para mejor compatibilidad y rendimiento:

- **Formato principal**: MP4 (H.264)
- **Formato alternativo**: WebM (VP9)
- **Resolución**: 1920x1080 (Full HD)
- **Bitrate**: 2-5 Mbps para buena calidad
- **Duración**: Mantén videos bajo 50MB para carga rápida

### **7. Optimizaciones**

- **Comprime videos** antes de subirlos
- **Genera thumbnails** automáticamente
- **Usa múltiples formatos** (MP4 + WebM)
- **CDN automático** incluido con Vercel Blob

## 🎯 **URLs que necesitas actualizar**

### **Video de fondo (página principal):**
- Archivo: `src/app/page.tsx`
- Línea: `<source src="/videos/hero-background.mp4" />`
- Cambiar por: URL real de Vercel Blob

### **Videos de clases:**
- Archivo: `src/data/videos.json`
- Propiedad: `videoUrl` y `thumbnail`
- Cambiar todas las URLs de YouTube por Vercel Blob

## ✅ **¿Todo listo?**

Una vez configurado:

1. ✅ Token en `.env.local`
2. ✅ Videos subidos a Vercel Blob
3. ✅ URLs actualizadas en `videos.json`
4. ✅ Video de fondo configurado

¡Tu app GIA Wellness estará lista con videos propios! 🧘‍♀️✨