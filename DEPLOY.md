# 🚀 Guía de Deploy - GIA Wellness App

## 📋 **Estado Actual del Proyecto**
✅ **Build exitoso** - La aplicación compila sin errores  
✅ **Repositorio Git** inicializado con commit inicial  
✅ **Vercel CLI** instalado y listo  
✅ **Código optimizado** para producción  

---

## 🌐 **OPCIÓN 1: Deploy con Vercel CLI (Recomendado)**

### 1. **Autenticación**
En tu terminal, ejecuta:
```bash
vercel
```

Cuando aparezca el prompt:
- Selecciona **"Continue with GitHub"** ↗️
- Se abrirá tu navegador para autenticarte
- Autoriza la aplicación Vercel

### 2. **Configuración del Proyecto**
Vercel te preguntará:

**❓ Set up and deploy "~/Documents/GitHub/GIALu"?**  
→ **Y** (Yes)

**❓ Which scope do you want to deploy to?**  
→ Selecciona tu cuenta personal

**❓ Found project "gia-wellness". Link to it?**  
→ **N** (No, crear nuevo proyecto)

**❓ What's your project's name?**  
→ `gia-wellness` o `gia-app`

**❓ In which directory is your code located?**  
→ `./` (directorio actual)

**❓ Want to modify these settings?**  
→ **N** (No, usar configuración por defecto)

### 3. **Deploy Automático**
Vercel detectará automáticamente:
- ✅ **Framework**: Next.js 15.4.3
- ✅ **Build Command**: `npm run build`
- ✅ **Output Directory**: `.next`
- ✅ **Install Command**: `npm install`

El deploy tomará ~2-3 minutos.

---

## 🔗 **OPCIÓN 2: Deploy con GitHub + Vercel Dashboard**

### 1. **Subir a GitHub**
```bash
# Crear repositorio en GitHub.com
# Luego ejecutar:
git remote add origin https://github.com/TU_USUARIO/gia-wellness.git
git push -u origin main
```

### 2. **Conectar en Vercel Dashboard**
1. Ve a [vercel.com](https://vercel.com) 
2. Haz clic en **"New Project"**
3. Importa tu repositorio de GitHub
4. Configura:
   - **Project Name**: `gia-wellness`
   - **Framework Preset**: Next.js (detectado automáticamente)
   - **Root Directory**: `./`
5. Haz clic en **"Deploy"**

---

## ⚙️ **Variables de Entorno (Opcional)**

Si necesitas configurar variables:

### En Vercel CLI:
```bash
vercel env add NEXT_PUBLIC_APP_NAME production
# Valor: GIA Wellness
```

### En Vercel Dashboard:
- Settings → Environment Variables
- Add: `NEXT_PUBLIC_APP_NAME` = `GIA Wellness`

---

## 🎯 **Después del Deploy**

### 🔗 **URLs Generadas**
Vercel te dará:
- **URL Principal**: `https://gia-wellness.vercel.app`
- **URL Preview**: `https://gia-wellness-git-main-username.vercel.app`

### 📱 **Pruebas Post-Deploy**
Verifica estas páginas:
- ✅ **Home**: `/` - Mantra diario + categorías
- ✅ **Catálogo**: `/clases` - 12 videos con filtros
- ✅ **Video**: `/video/1` - Reproductor YouTube
- ✅ **Mis Clases**: `/mis-clases` - Favoritos + historial

### 🔧 **Funcionalidades a Probar**
- ✅ **Responsivo**: Móvil, tablet, desktop
- ✅ **Favoritos**: Agregar/quitar videos
- ✅ **Filtros**: Categoría, duración, nivel
- ✅ **Búsqueda**: Por título/instructor
- ✅ **Navegación**: Entre páginas

---

## 🚨 **Solución de Problemas**

### **Error: Build Failed**
```bash
# Limpiar cache y rebuild
vercel --force
```

### **Error: Missing Dependencies**
```bash
# Verificar package.json
npm install
npm run build
```

### **Error: Environment Variables**
- Verifica que no haya variables faltantes
- Usa `NEXT_PUBLIC_` para variables del cliente

---

## 🎉 **¡Deploy Completado!**

Una vez deployado, tu aplicación **GIA Wellness** estará disponible mundialmente con:

### 🌟 **Características Live**
- **CDN Global** de Vercel
- **HTTPS automático** 
- **Dominio personalizable**
- **Analytics integrado**
- **Deploy automático** en cada push

### 📊 **Métricas Disponibles**
- **Visitas** y **páginas vistas**
- **Tiempo de carga** (Core Web Vitals)
- **Engagement** de usuarios
- **Dispositivos** más usados

---

**🧘‍♀️ ¡Tu aplicación GIA está lista para generar comunidad!** ✨

Para dominios personalizados: Settings → Domains → Add Domain 