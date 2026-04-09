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
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const framesRef = useRef<HTMLImageElement[]>([])
  const loadedCountRef = useRef(0)
  const lastFrameRef = useRef(-1)
  const rafRef = useRef<number | null>(null)
  const progressRef = useRef(0)
  const textsRef = useRef<(HTMLDivElement | null)[]>([])
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const setCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = '100%'
      canvas.style.height = '100%'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      if (lastFrameRef.current >= 0 && framesRef.current[lastFrameRef.current]) {
        drawFrame(lastFrameRef.current)
      }
    }

    const drawFrame = (index: number) => {
      const img = framesRef.current[index]
      if (!img?.complete || img.naturalWidth === 0) return
      const W = window.innerWidth
      const H = window.innerHeight
      const scale = Math.max(W / img.naturalWidth, H / img.naturalHeight)
      const w = img.naturalWidth * scale
      const h = img.naturalHeight * scale
      ctx.clearRect(0, 0, W, H)
      ctx.drawImage(img, (W - w) / 2, (H - h) / 2, w, h)
    }

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new window.Image()
      img.src = `${FRAME_PATH}${String(i).padStart(4, '0')}.jpg`
      img.onload = () => {
        loadedCountRef.current++
        if (loadedCountRef.current === 1) {
          lastFrameRef.current = 0
          drawFrame(0)
          setReady(true)
        }
      }
      framesRef.current.push(img)
    }

    setCanvasSize()
    window.addEventListener('resize', setCanvasSize, { passive: true })

    const onScroll = () => {
      const container = containerRef.current
      if (!container) return
      const { top, height } = container.getBoundingClientRect()
      const scrollable = height - window.innerHeight
      progressRef.current = Math.max(0, Math.min(1, -top / scrollable))

      const frameIndex = Math.min(
        Math.floor(progressRef.current * FRAME_COUNT),
        FRAME_COUNT - 1
      )

      if (frameIndex !== lastFrameRef.current) {
        lastFrameRef.current = frameIndex
        if (rafRef.current) cancelAnimationFrame(rafRef.current)
        rafRef.current = requestAnimationFrame(() => drawFrame(frameIndex))
      }

      textsRef.current.forEach((el, i) => {
        if (!el) return
        const { start, end } = NARRATIVE[i]
        const zone = 0.07
        const p = progressRef.current
        let opacity = 0
        let ty = 18

        if (p >= start && p <= end) {
          if (p < start + zone) {
            const t = (p - start) / zone
            opacity = t
            ty = 18 * (1 - t)
          } else if (p > end - zone) {
            const t = (end - p) / zone
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
    onScroll()

    return () => {
      window.removeEventListener('resize', setCanvasSize)
      window.removeEventListener('scroll', onScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <section ref={containerRef} style={{ position: 'relative', height: '400vh' }}>
      <div style={{
        position: 'sticky', top: 0, width: '100%', height: '100vh',
        overflow: 'hidden', backgroundColor: 'var(--cream)',
      }}>
        <canvas
          ref={canvasRef}
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'block' }}
        />

        {!ready && (
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{
              width: '40px', height: '2px',
              backgroundColor: 'var(--sage)',
              animation: 'pulse 1.5s ease-in-out infinite',
            }} />
          </div>
        )}

        {/* Top gradient */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '120px',
          background: 'linear-gradient(to bottom, var(--cream) 0%, transparent 100%)',
          pointerEvents: 'none', zIndex: 1,
        }} />

        {/* Narrative text */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 2,
          pointerEvents: 'none',
        }}>
          {NARRATIVE.map((n, i) => (
            <div
              key={i}
              ref={el => { textsRef.current[i] = el }}
              style={{
                position: 'absolute',
                right: '6vw',
                top: '50%',
                transform: 'translateY(18px)',
                opacity: 0,
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
                marginTop: '-0.5em',
              }}
            >
              {n.text}
            </div>
          ))}
        </div>

        {/* Bottom gradient */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '120px',
          background: 'linear-gradient(to top, var(--cream) 0%, transparent 100%)',
          pointerEvents: 'none', zIndex: 1,
        }} />
      </div>
    </section>
  )
}
