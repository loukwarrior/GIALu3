'use client'

import { useEffect, useRef } from 'react'

const NARRATIVE = [
  { text: 'Comida real.', start: 0.05, end: 0.25 },
  { text: 'Hecha con amor.', start: 0.23, end: 0.43 },
  { text: 'Cada ingrediente.\nElegido a mano.', start: 0.42, end: 0.63 },
  { text: 'Sin artificiales.\nSin excusas.', start: 0.62, end: 0.82 },
  { text: 'GIA.', start: 0.82, end: 1.0 },
]

export default function ScrollVideo() {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const textsRef = useRef<(HTMLDivElement | null)[]>([])
  const progressRef = useRef(0)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Update video time and text overlays
    const update = () => {
      const progress = progressRef.current
      const video = videoRef.current
      if (video && video.duration && isFinite(video.duration)) {
        video.currentTime = progress * video.duration
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

    const onScroll = () => {
      const container = containerRef.current
      if (!container) return
      const { top, height } = container.getBoundingClientRect()
      const scrollable = height - window.innerHeight
      progressRef.current = Math.max(0, Math.min(1, -top / scrollable))

      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(update)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    return () => {
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
        style={{
          position: 'sticky',
          top: 0,
          width: '100%',
          height: '100vh',
          overflow: 'hidden',
          backgroundColor: '#000',
        }}
      >
        {/* Video fills sticky area */}
        <video
          ref={videoRef}
          src="/videos/videoGIA_hero.mp4"
          muted
          playsInline
          preload="auto"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            minWidth: '100%',
            minHeight: '100%',
            width: 'auto',
            height: 'auto',
            objectFit: 'cover',
          }}
        />

        {/* Top gradient */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '120px',
          background: 'linear-gradient(to bottom, var(--cream) 0%, transparent 100%)',
          pointerEvents: 'none', zIndex: 1,
        }} />

        {/* Narrative text overlay */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 2,
          display: 'flex', alignItems: 'center',
          padding: '0 6vw', pointerEvents: 'none',
          justifyContent: 'flex-end',
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
                color: i === NARRATIVE.length - 1 ? 'var(--cream)' : 'white',
                textShadow: '0 2px 32px rgba(0,0,0,0.5)',
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
