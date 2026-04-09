'use client'

import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex flex-col justify-between overflow-hidden"
      style={{ backgroundColor: 'var(--cream)' }}
    >
      {/* Top bar */}
      <div className="pt-32 px-8 md:px-16 flex items-start justify-between">
        <motion.p
          className="text-[10px] tracking-[0.3em] uppercase"
          style={{ color: 'var(--sage)', fontFamily: 'var(--font-poppins)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Playacar · México
        </motion.p>
        <motion.p
          className="text-[10px] tracking-[0.3em] uppercase text-right"
          style={{ color: 'var(--sage)', fontFamily: 'var(--font-poppins)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          Abrimos el<br />12·04·2026
        </motion.p>
      </div>

      {/* Center — main headline */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center py-16">
        {/* Thin rule */}
        <motion.div
          className="w-px mb-10"
          style={{ backgroundColor: 'var(--sage)', height: '60px' }}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        />

        <motion.h1
          className="font-bold leading-[0.92]"
          style={{
            fontFamily: 'var(--font-playfair)',
            fontSize: 'clamp(72px, 16vw, 200px)',
            color: 'var(--charcoal)',
            letterSpacing: '-0.02em',
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          GIA
        </motion.h1>

        <motion.div
          className="flex items-center gap-6 mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {['Bowls', '·', 'Desayunos', '·', 'Batidos'].map((t, i) => (
            <span
              key={i}
              className="text-xs tracking-[0.25em] uppercase"
              style={{
                color: t === '·' ? 'var(--sage)' : '#8A9A95',
                fontFamily: 'var(--font-poppins)',
              }}
            >
              {t}
            </span>
          ))}
        </motion.div>

        <motion.p
          className="mt-8 max-w-sm text-sm leading-relaxed"
          style={{ color: '#8A9A95', fontFamily: 'var(--font-poppins)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65 }}
        >
          Ingredientes reales. Recetas que nutren.
          <br />
          En el corazón de Playacar.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex gap-4 mt-10"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <a
            href="#menu"
            className="px-8 py-3 text-xs tracking-[0.2em] uppercase font-semibold text-white rounded-full transition-all hover:opacity-85"
            style={{ backgroundColor: 'var(--forest)', fontFamily: 'var(--font-poppins)' }}
          >
            Ver Menú
          </a>
          <a
            href="#ubicacion"
            className="px-8 py-3 text-xs tracking-[0.2em] uppercase font-semibold rounded-full border transition-all hover:bg-black/5"
            style={{
              borderColor: 'var(--charcoal)',
              color: 'var(--charcoal)',
              fontFamily: 'var(--font-poppins)',
            }}
          >
            Ubicación
          </a>
        </motion.div>
      </div>

      {/* Bottom scroll hint */}
      <motion.div
        className="pb-10 flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
      >
        <span
          className="text-[9px] tracking-[0.35em] uppercase"
          style={{ color: 'var(--sage)', fontFamily: 'var(--font-poppins)' }}
        >
          Scroll
        </span>
        <motion.div
          className="w-px bg-sage"
          style={{ backgroundColor: 'var(--sage)', height: '40px' }}
          animate={{ scaleY: [1, 0.4, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  )
}
