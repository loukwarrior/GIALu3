'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const INAUGURATION = new Date('2026-04-12T10:00:00')

function pad(n: number) {
  return String(n).padStart(2, '0')
}

export default function Countdown() {
  const [time, setTime] = useState({ d: 0, h: 0, m: 0, s: 0 })
  const [opened, setOpened] = useState(false)

  useEffect(() => {
    const update = () => {
      const diff = INAUGURATION.getTime() - Date.now()
      if (diff <= 0) {
        setOpened(true)
        setTime({ d: 0, h: 0, m: 0, s: 0 })
        return
      }
      setTime({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      })
    }
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [])

  const units = [
    { label: 'Días', value: time.d },
    { label: 'Horas', value: time.h },
    { label: 'Min', value: time.m },
    { label: 'Seg', value: time.s },
  ]

  return (
    <section className="py-20 px-6" style={{ backgroundColor: 'var(--forest)' }}>
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p
            className="text-xs uppercase tracking-[0.25em] mb-4 font-medium"
            style={{ color: 'var(--sage)', fontFamily: 'var(--font-poppins)' }}
          >
            Inauguración oficial
          </p>

          <h2
            className="text-3xl md:text-5xl font-bold text-white mb-2"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            {opened ? '¡Ya abrimos! 🎉' : 'Sábado 12 de Abril'}
          </h2>
          <p
            className="mb-12 text-base"
            style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-poppins)' }}
          >
            Plaza Comercial Playacar · 2026
          </p>

          {!opened && (
            <div className="flex justify-center gap-3 md:gap-6">
              {units.map(({ label, value }, i) => (
                <motion.div
                  key={label}
                  className="flex flex-col items-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div
                    className="w-18 h-18 md:w-24 md:h-24 rounded-2xl flex items-center justify-center text-2xl md:text-4xl font-bold text-white"
                    style={{
                      width: 'clamp(64px, 10vw, 96px)',
                      height: 'clamp(64px, 10vw, 96px)',
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      fontFamily: 'var(--font-poppins)',
                      fontVariantNumeric: 'tabular-nums',
                    }}
                  >
                    {pad(value)}
                  </div>
                  <span
                    className="mt-2 text-[10px] uppercase tracking-widest"
                    style={{ color: 'var(--sage)', fontFamily: 'var(--font-poppins)' }}
                  >
                    {label}
                  </span>
                </motion.div>
              ))}
            </div>
          )}

          <motion.div
            className="mt-12 inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium"
            style={{
              backgroundColor: 'rgba(255,255,255,0.08)',
              color: 'rgba(255,255,255,0.7)',
              fontFamily: 'var(--font-poppins)',
              border: '1px solid rgba(255,255,255,0.12)',
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            🌴 Frente a los Hoteles Riu · Playacar
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
