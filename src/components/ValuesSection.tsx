'use client'

import { motion } from 'framer-motion'

// High-design SVG icons — thin stroke, 1.5px, geometric
const IconLeaf = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 28C16 28 6 22 6 13C6 8.03 10.03 4 15 4C17.5 4 26 6 26 6C26 6 24 15.5 20 20C18 22 16 28 16 28Z" />
    <path d="M16 28C16 28 14 18 10 14" />
  </svg>
)

const IconWave = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 16C4 16 7 10 10 10C13 10 13 22 16 22C19 22 19 10 22 10C25 10 28 16 28 16" />
    <path d="M4 22C4 22 7 17 10 17C11.5 17 12.5 19 13.5 20" />
    <path d="M4 10C5 8 7 6 10 6C11.5 6 12.5 7.5 13 8.5" />
  </svg>
)

const IconSpark = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 4V8M16 24V28M4 16H8M24 16H28" />
    <path d="M7.76 7.76L10.59 10.59M21.41 21.41L24.24 24.24M24.24 7.76L21.41 10.59M10.59 21.41L7.76 24.24" />
    <circle cx="16" cy="16" r="4" />
  </svg>
)

const VALUES = [
  {
    Icon: IconLeaf,
    title: 'Siempre Fresco',
    desc: 'Todo preparado al momento con ingredientes frescos y de temporada. Sin conservadores, sin artificiales.',
    color: 'var(--forest)',
  },
  {
    Icon: IconWave,
    title: 'Sabor Caribeño',
    desc: 'Inspirados en los sabores tropicales del Caribe mexicano: maracuyá, coco, mango, chaya y más.',
    color: 'var(--sage)',
  },
  {
    Icon: IconSpark,
    title: 'Bienestar Real',
    desc: 'Diseñado para darte energía de verdad. Súper alimentos, batidos naturales, sin azúcares añadidos.',
    color: 'var(--clay)',
  },
]

export default function ValuesSection() {
  return (
    <section id="nosotros" className="py-28 px-8 md:px-16" style={{ backgroundColor: 'var(--sand)' }}>
      <div className="max-w-6xl mx-auto">

        {/* Header — editorial, left aligned */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p
            className="text-[10px] tracking-[0.3em] uppercase mb-5"
            style={{ color: 'var(--forest)', fontFamily: 'var(--font-poppins)' }}
          >
            Filosofía
          </p>
          <div className="flex items-end justify-between gap-8 flex-wrap">
            <h2
              className="font-bold leading-[0.95]"
              style={{
                fontFamily: 'var(--font-playfair)',
                fontSize: 'clamp(40px, 6vw, 80px)',
                color: 'var(--charcoal)',
              }}
            >
              ¿Por qué<br />
              <span style={{ color: 'var(--forest)' }}>GIA?</span>
            </h2>
            <p
              className="max-w-xs text-sm leading-relaxed pb-2"
              style={{ color: '#7A8A85', fontFamily: 'var(--font-poppins)' }}
            >
              GIA nació de una idea simple: que comer sano en el paraíso no debería ser difícil.
            </p>
          </div>
        </motion.div>

        {/* Divider */}
        <div className="w-full h-px mb-16" style={{ backgroundColor: 'rgba(47,62,70,0.12)' }} />

        {/* Values — horizontal layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {VALUES.map((v, i) => (
            <motion.div
              key={v.title}
              className="group py-10 pr-12"
              style={{
                borderRight: i < 2 ? '1px solid rgba(47,62,70,0.1)' : 'none',
                paddingLeft: i === 0 ? 0 : '3rem',
              }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
            >
              {/* Icon */}
              <div
                className="mb-8 transition-transform group-hover:scale-110 duration-300"
                style={{ color: v.color }}
              >
                <v.Icon />
              </div>

              {/* Number */}
              <p
                className="text-[10px] tracking-[0.3em] uppercase mb-3"
                style={{ color: 'var(--sage)', fontFamily: 'var(--font-poppins)' }}
              >
                0{i + 1}
              </p>

              <h3
                className="text-xl font-bold mb-4"
                style={{ color: 'var(--charcoal)', fontFamily: 'var(--font-playfair)' }}
              >
                {v.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: '#7A8A85', fontFamily: 'var(--font-poppins)' }}
              >
                {v.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
