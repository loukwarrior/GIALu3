# 🧘‍♀️ GIA - Wellness Community

Una aplicación web moderna y responsive para la marca de ropa deportiva femenina **GIA**, centrada en yoga, pilates, meditación y bienestar. Este MVP está diseñado para generar comunidad antes del lanzamiento de la tienda de ropa.

![GIA Wellness Community](https://via.placeholder.com/1200x600/E8DAEF/2C3E50?text=GIA+Wellness+Community)

## ✨ Características Principales

### 🏠 Página de Bienvenida
- **Mantra diario** que cambia automáticamente según el día del año
- Hero section inspiradora con gradientes suaves
- Preview de categorías destacadas
- Call-to-action hacia el catálogo de clases

### 📺 Catálogo de Videos
- **12 videos** organizados por categorías: Yoga, Pilates, Meditación, Tips de bienestar
- Videos embebidos desde **YouTube** (sin subir archivos propios)
- **Filtros avanzados** por:
  - ⏱️ **Duración**: Corto (< 15 min), Medio (15-30 min), Largo (> 30 min)
  - 📊 **Nivel**: Principiante, Intermedio, Avanzado
  - 🎯 **Objetivo**: Relajación, Energía, Tonificación, Bienestar
  - 🏷️ **Categoría**: Yoga, Pilates, Meditación, Bienestar
- **Búsqueda inteligente** por título, instructor, descripción y tags
- **Sistema de favoritos** con persistencia local

### 🎬 Reproductor de Video
- Player embebido responsive de YouTube
- **Información detallada** del video (título, descripción, instructor)
- **Botón de favorito** persistente
- **Videos relacionados** en sidebar
- **Marcado automático** como "visto" después de 5 segundos
- **Estado de completado** visual

### 💖 Sección "Mis Clases"
- **Estadísticas personales**: videos completados, favoritos, minutos de práctica
- **Tab de Favoritos** con grid visual
- **Tab de Historial** con lista cronológica
- **Categoría favorita** calculada automáticamente
- **Estados vacíos** informativos y motivacionales

### 🎨 Diseño y UX
- **Diseño femenino, relajado y minimalista**
- **Paleta de colores GIA**: 
  - 💜 Primary: Lavanda suave (#E8DAEF)
  - 💗 Secondary: Rosa claro (#F8BBD9)
  - 🤍 Accent: Crema (#FAF2F2)
  - 📝 Text: Gris azulado (#2C3E50)
- **Tipografía moderna**: Inter (headings), Open Sans (body), Dancing Script (accent)
- **Totalmente responsive** para móvil, tablet y desktop
- **Animaciones sutiles** y transiciones suaves
- **Glass morphism** y efectos de backdrop blur

## 🏗️ Arquitectura Técnica

### 🛠️ Stack Tecnológico
- **Framework**: Next.js 15.4 con App Router
- **Estilado**: Tailwind CSS 3 con configuración personalizada
- **Lenguaje**: TypeScript para type safety
- **Estado Global**: React Context API con useReducer
- **Iconos**: Lucide React
- **Persistencia**: LocalStorage para favoritos e historial

### 📁 Estructura del Proyecto
```
GIALu/
├── src/
│   ├── app/                    # Páginas Next.js (App Router)
│   │   ├── page.tsx           # Página principal
│   │   ├── clases/            # Catálogo de videos
│   │   ├── video/[id]/        # Reproductor individual
│   │   ├── mis-clases/        # Favoritos e historial
│   │   ├── layout.tsx         # Layout principal
│   │   └── globals.css        # Estilos globales
│   ├── components/            # Componentes reutilizables
│   │   └── Header.tsx         # Navegación principal
│   ├── context/               # Estado global
│   │   └── AppContext.tsx     # Context API
│   ├── data/                  # Datos simulados
│   │   ├── videos.json        # 12 videos con metadata
│   │   └── mantras.json       # 10 mantras inspiradores
│   └── hooks/                 # Hooks personalizados (futuro)
├── public/                    # Assets estáticos
├── tareas.md                  # Roadmap del proyecto
└── README.md                  # Este archivo
```

### 🔄 Gestión de Estado
El estado global se maneja con **React Context API** y incluye:
- **Favoritos**: Videos marcados como favoritos
- **Historial**: Videos vistos con timestamp
- **Video actual**: Video en reproducción
- **Usuario**: Información básica (preparado para autenticación)

**Persistencia**: Los datos se guardan automáticamente en localStorage y se restauran al recargar la página.

## 🚀 Instalación y Uso

### 📋 Prerrequisitos
- Node.js 18+ 
- npm o yarn

### ⚡ Instalación Rápida
```bash
# Clonar el repositorio
git clone https://github.com/tuusuario/GIALu.git
cd GIALu

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

### 📝 Scripts Disponibles
```bash
npm run dev          # Servidor de desarrollo
npm run build        # Build de producción
npm run start        # Servidor de producción
npm run lint         # Linting del código
```

## 🎯 Funcionalidades Implementadas

### ✅ Core MVP (Fase 1 - 80% del valor)
- [x] Configuración inicial Next.js + Tailwind CSS
- [x] Sistema de diseño (colores GIA: lavanda, rosa claro, crema)
- [x] Datos simulados JSON (videos, mantras, categorías)
- [x] Página de bienvenida con mantra diario
- [x] Catálogo de videos con filtros básicos
- [x] Reproductor de video embebido
- [x] Sistema de favoritos (Context API)
- [x] Sección "Mis Clases"
- [x] Responsive design móvil/desktop
- [x] Navegación Header con contadores
- [x] Estados vacíos y loading
- [x] Persistencia en localStorage

### 🔮 Próximas Funcionalidades

#### 🎨 Fase 2: Experiencia de Usuario (15% del valor)
- [ ] Animaciones sutiles y transiciones
- [ ] Loading states y skeletons
- [ ] Búsqueda avanzada de videos
- [ ] Categorías visuales con iconos
- [ ] Progress tracking de videos
- [ ] Notificaciones motivacionales

#### 🔧 Fase 3: Optimización y Escalabilidad (5% del valor)
- [ ] SEO optimization
- [ ] Performance optimization
- [ ] PWA capabilities
- [ ] Analytics básicos
- [ ] Error boundaries
- [ ] Testing unitario

## 🔮 Futuras Integraciones Preparadas

La arquitectura está diseñada para escalar fácilmente:

### 🔐 Autenticación
- Context API listo para JWT/OAuth
- Estructura de usuario preparada
- Rutas protegidas planificadas

### 🛒 E-commerce
- Arquitectura modular para integrar tienda
- Componentes preparados para productos
- Estado global extensible para carrito

### 💳 Pagos y Suscripciones
- Estructura para integrar Stripe
- Estado global para planes premium
- Componentes de paywall preparados

### 📱 App Móvil
- Diseño responsive como base
- Estructura de componentes reutilizable
- Estado global compartible con React Native

## 📊 Métricas de Éxito

El MVP está diseñado para medir:
- **Engagement**: Tiempo promedio en la app
- **Retención**: Videos favoritos por usuario
- **Crecimiento**: Nuevos usuarios orgánicos
- **Satisfacción**: Feedback de la comunidad

## 🎨 Diseño Visual

### 🌈 Paleta de Colores
```css
Primary (Lavanda):   #E8DAEF
Secondary (Rosa):    #F8BBD9  
Accent (Crema):      #FAF2F2
Text Primary:        #2C3E50
Text Secondary:      #5A6B7D
Text Muted:         #8B9AAB
```

### ✍️ Tipografía
- **Headings**: Inter (redondeada, moderna)
- **Body**: Open Sans (legible, amigable)  
- **Accent**: Dancing Script (elegante, femenina)

### 📱 Responsive Design
- **Mobile First**: Optimizado para móviles
- **Breakpoints**: 475px, 640px, 768px, 1024px, 1280px
- **Grid Adaptativo**: 1-4 columnas según dispositivo

## 🤝 Contribución

Este es un proyecto MVP. Para contribuir:

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 👥 Equipo

Desarrollado con 💜 para la comunidad **GIA** - Empoderando mujeres a través del bienestar integral.

---

**GIA Wellness** - *Tu práctica, tu comunidad, tu bienestar* 🧘‍♀️✨
