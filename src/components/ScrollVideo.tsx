'use client'

import { useEffect, useRef } from 'react'

const FRAME_COUNT = 120
const NARRATIVE = [
  { text: 'Comida real.', start: 0.02, end: 0.22 },
  { text: 'Hecha con amor.', start: 0.20, end: 0.42 },
  { text: 'Cada ingrediente.\nElegido a mano.', start: 0.40, end: 0.62 },
  { text: 'Sin artificiales.\nSin excusas.', start: 0.60, end: 0.80 },
  { text: 'GIA.', start: 0.80, end: 1.0 },
]

export default function ScrollVideo() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const imagesRef = useRef<HTMLImageElement[]>([])
  const loadedRef = useRef(0)
  const currentFrameRef = useRef(-1)
  const rafRef = useRef<number | null>(null)
  const pendingFrameRef = useRef(0)
  const textsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Size canvas
    const resize = () => {
      canvas.width = window.innerWidth * window.devicePixelRatio
      canvas.height = window.innerHeight * window.devicePixelRatio
      canvas.style.width = window.innerWidth + 'px'
      canvas.style.height = window.innerHeight + 'px'
    }
    resize()
    window.addEventListener('resize', resize, { passive: true })

    // Draw frame
    const drawFrame = (index: number) => {
      const img = imagesRef.current[index]
      if (!img?.complete || !img.naturalWidth) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const isMobile = window.innerWidth < 768
      const scale = isMobile
        ? Math.min(canvas.width / img.naturalWidth, canvas.height / img.naturalHeight) * 1.05
        : Math.max(canvas.width / img.naturalWidth, canvas.height / img.naturalHeight)

      const w = img.naturalWidth * scale
      const h = img.naturalHeight * scale
      const x = (canvas.width - w) / 2
      const y = (canvas.height - h) / 2
      ctx.drawImage(img, x, y, w, h)
    }

    // Preload frames
    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image()
      img.src = `/frames/frame_${String(i).padStart(4, '0')}.jpg`
      img.onload = () => {
        loadedRef.current++
        if (loadedRef.current === 1) drawFrame(0)
      }
      imagesRef.current.push(img)
    }

    // RAF draw loop
    const tick = () => {
      rafRef.current = requestAnimationFrame(tick)
      const target = pendingFrameRef.current
      if (target !== currentFrameRef.current) {
        drawFrame(target)
        currentFrameRef.current = target
      }
    }
    rafRef.current = requestAnimationFrame(tick)

    // Scroll handler
    const onScroll = () => {
      const container = containerRef.current
      if (!container) return
      const rect = container.getBoundingClientRect()
      const scrollHeight = container.offsetHeight - window.innerHeight
      const scrolled = -rect.top
      const progress = Math.max(0, Math.min(1, scrolled / scrollHeight))

      pendingFrameRef.current = Math.min(
        Math.floor(progress * FRAME_COUNT),
        FRAME_COUNT - 1
      )

      // Narrative text fade
      textsRef.current.forEach((el, i) => {
        if (!el) return
        const { start, end } = NARRATIVE[i]
        const fadeZone = 0.06
        let opacity = 0
        let y = 20

        if (progress >= start && progress <= end) {
          if (progress < start + fadeZone) {
            const t = (progress - start) / fadeZone
            opacity = t
            y = 20 * (1 - t)
          } else if (progress > end - fadeZone) {
            const t = (end - progress) / fadeZone
            opacity = t
            y = -16 * (1 - t)
          } else {
            opacity = 1
            y = 0
          }
        }

        el.style.opacity = String(opacity)
        el.style.transform = `translateY(${y}px)`
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('scroll', onScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <section
      ref={containerRef}
      style={{ height: '400vh', position: 'relative' }}
    >
      {/* Sticky canvas */}
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>
        {/* Background cream for before video loads */}
        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'var(--cream)' }} />

        <canvas
          ref={canvasRef}
          style={{ position: 'absolute', inset: 0 }}
        />

        {/* Overlay gradient top */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '120px',
            background: 'linear-gradient(to bottom, var(--cream), transparent)',
            pointerEvents: 'none',
          }}
        />

        {/* Narrative texts */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: '0 6vw',
            pointerEvents: 'none',
          }}
        >
          <div style={{ position: 'relative', width: '280px' }}>
            {NARRATIVE.map((n, i) => (
              <div
                key={i}
                ref={(el) => { if (el) textsRef.current[i] = el }}
                style={{
                  position: 'absolute',
                  right: 0,
                  top: '50%',
                  transform: 'translateY(20px)',
                  opacity: 0,
                  transition: 'none',
                  textAlign: 'right',
                  whiteSpace: 'pre-line',
                  fontFamily: 'var(--font-playfair)',
                  fontSize: i === NARRATIVE.length - 1 ? 'clamp(48px, 8vw, 96px)' : 'clamp(28px, 4vw, 52px)',
                  fontWeight: 700,
                  lineHeight: 1.1,
                  color: i === NARRATIVE.length - 1 ? 'var(--forest)' : 'var(--charcoal)',
                  textShadow: '0 2px 20px rgba(251,249,246,0.8)',
                }}
              >
                {n.text}
              </div>
            ))}
          </div>
        </div>

        {/* Overlay gradient bottom */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '120px',
            background: 'linear-gradient(to top, var(--cream), transparent)',
            pointerEvents: 'none',
          }}
        />
      </div>
    </section>
  )
}
