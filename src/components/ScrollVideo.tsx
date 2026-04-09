'use client'

import { useEffect, useRef, useState } from 'react'

const FRAME_COUNT = 120
const FRAME_PATH = '/frames/frame_'

const NARRATIVE = [
  { text: 'Comida real.', start: 0.05, end: 0.25 },
  { text: 'Hecha con amor.', start: 0.23, end: 0.43 },
  { text: 'Cada ingrediente.\nElegido a mano.', start: 0.42, end: 0.63 },
  { text: 'Sin artificiales.\nSin excusas.', start: 0.62, end: 0.82 },
  { text: 'GIA.', start: 0.82, end: 1.0 },
]

export default function ScrollVideo() {
  const containerRef = useRef<HTMLDivElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const framesRef = useRef<HTMLImageElement[]>([])
  const loadedCountRef = useRef(0)
  const lastFrameRef = useRef(-1)
  const rafRef = useRef<number | null>(null)
  const progressRef = useRef(0)
  const textsRef = useRef<(HTMLDivElement | null)[]>([])
  const [loadState, setLoadState] = useState<'loading' | 'ready' | 'error'>('loading')
  const [loadedCount, setLoadedCount] = useState(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Size canvas to fill viewport exactly
    const setCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = '100%'
      canvas.style.height = '100%'
      ctx.scale(dpr, dpr)
      // Redraw current frame after resize
      if (lastFrameRef.current >= 0 && framesRef.current[lastFrameRef.current]) {
        drawFrame(lastFrameRef.current)
      }
    }

    const drawFrame = (index: number) => {
      const img = framesRef.current[index]
      if (!img || !img.complete || img.naturalWidth === 0) return

      const W = window.innerWidth
      const H = window.innerHeight
      const dpr = window.devicePixelRatio || 1

      ctx.clearRect(0, 0, W * dpr, H * dpr)

      const scale = Math.max(W / img.naturalWidth, H / img.naturalHeight)
      const w = img.naturalWidth * scale
      const h = img.naturalHeight * scale
      const x = (W - w) / 2
      const y = (H - h) / 2

      ctx.drawImage(img, x * dpr, y * dpr, w * dpr, h * dpr)
    }

    // Preload all frames
    let errorCount = 0
    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new window.Image()
      const pad = String(i).padStart(4, '0')
      img.src = `${FRAME_PATH}${pad}.jpg`

      img.onload = () => {
        loadedCountRef.current++
        setLoadedCount(loadedCountRef.current)
        // Draw first frame as soon as it's ready
        if (loadedCountRef.current === 1) {
          lastFrameRef.current = 0
          drawFrame(0)
          setLoadState('ready')
        }
      }

      img.onerror = () => {
        errorCount++
        if (errorCount > 5) setLoadState('error')
      }

      framesRef.current.push(img)
    }

    setCanvasSize()
    window.addEventListener('resize', setCanvasSize, { passive: true })

    // Scroll → progress
    const onScroll = () => {
      const container = containerRef.current
      if (!container) return

      const { top, height } = container.getBoundingClientRect()
      const scrollable = height - window.innerHeight
      const progress = Math.max(0, Math.min(1, -top / scrollable))
      progressRef.current = progress

      const frameIndex = Math.min(
        Math.floor(progress * FRAME_COUNT),
        FRAME_COUNT - 1
      )

      if (frameIndex !== lastFrameRef.current) {
        lastFrameRef.current = frameIndex
        drawFrame(frameIndex)
      }

      // Narrative text opacity
      textsRef.current.forEach((el, i) => {
        if (!el) return
        const { start, end } = NARRATIVE[i]
        const zone = 0.07
        let opacity = 0
        let ty = 18

        if (progress >= start && progress <= end) {
          if (progress < start + zone) {
            const t = (progress - start) / zone
            opacity = t
            ty = 18 * (1 - t)
          } else if (progress > end - zone) {
            const t = (end - progress) / zone
            opacity = t
            ty = -14 * (1 - t)
          } else {
            opacity = 1
            ty = 0
          }
        }

        el.style.opacity = String(opacity)
        el.style.transform = `translateY(${ty}px)`
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    // Trigger once on mount in case page loads mid-scroll
    onScroll()

    return () => {
      window.removeEventListener('resize', setCanvasSize)
      window.removeEventListener('scroll', onScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <section
      ref={containerRef}
      style={{ position: 'relative', height: '400vh' }}
    >
      <div
        ref={stickyRef}
        style={{
          position: 'sticky',
          top: 0,
          width: '100%',
          height: '100vh',
          overflow: 'hidden',
          backgroundColor: 'var(--cream)',
        }}
      >
        {/* Canvas fills sticky area */}
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'block',
          }}
        />

        {/* Loading indicator */}
        {loadState === 'loading' && (
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '12px',
          }}>
            <div style={{
              width: '40px', height: '2px',
              backgroundColor: 'var(--sage)',
              animation: 'pulse 1.5s ease-in-out infinite',
            }} />
            <p style={{ color: 'var(--sage)', fontSize: '10px', letterSpacing: '0.2em', fontFamily: 'var(--font-poppins)' }}>
              {loadedCount}/{120}
            </p>
          </div>
        )}

        {/* Error state */}
        {loadState === 'error' && (
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <p style={{ color: 'var(--sage)', fontSize: '12px', letterSpacing: '0.2em' }}>
              GIA · Playacar 2026
            </p>
          </div>
        )}

        {/* Top gradient */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '100px',
          background: 'linear-gradient(to bottom, var(--cream) 0%, transparent 100%)',
          pointerEvents: 'none', zIndex: 1,
        }} />

        {/* Narrative text overlay */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 2,
          display: 'flex', alignItems: 'center', justifyContent: 'flex-end',
          padding: '0 6vw', pointerEvents: 'none',
        }}>
          {NARRATIVE.map((n, i) => (
            <div
              key={i}
              ref={el => { textsRef.current[i] = el }}
              style={{
                position: 'absolute',
                right: '6vw',
                opacity: 0,
                transition: 'none',
                textAlign: 'right',
                whiteSpace: 'pre-line',
                fontFamily: 'var(--font-playfair)',
                fontSize: i === NARRATIVE.length - 1
                  ? 'clamp(52px, 9vw, 104px)'
                  : 'clamp(26px, 3.5vw, 52px)',
                fontWeight: 700,
                lineHeight: 1.1,
                color: i === NARRATIVE.length - 1 ? 'var(--forest)' : 'var(--charcoal)',
                textShadow: '0 1px 24px rgba(251,249,246,0.9), 0 0 48px rgba(251,249,246,0.6)',
              }}
            >
              {n.text}
            </div>
          ))}
        </div>

        {/* Bottom gradient */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '100px',
          background: 'linear-gradient(to top, var(--cream) 0%, transparent 100%)',
          pointerEvents: 'none', zIndex: 1,
        }} />
      </div>
    </section>
  )
}
