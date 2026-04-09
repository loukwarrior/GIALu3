'use client'

import { motion } from 'framer-motion'

const IconPin = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2Z" />
    <circle cx="12" cy="9" r="2.5" />
  </svg>
)

const IconClock = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7V12L15 15" />
  </svg>
)

const IconStar = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
  </svg>
)

const INFO = [
  { Icon: IconPin,   title: 'Dirección',  lines: ['Plaza Comercial Playacar', 'Frente a los Hoteles Riu', 'Playacar, Playa del Carmen, Q.R.'] },
  { Icon: IconClock, title: 'Horario',    lines: ['Lunes – Domingo', '7:00 AM – 3:00 PM'] },
  { Icon: IconStar,  title: 'Apertura',   lines: ['Sábado 12 de Abril, 2026', '¡Ven a conocernos!'] },
]

export default function LocationSection() {
  return (
    <section id="ubicacion" className="py-28 px-8 md:px-16" style={{ backgroundColor: 'var(--cream)' }}>
      <div className="max-w-6xl mx-auto">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">

          {/* Left: info */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p
              className="text-[10px] tracking-[0.3em] uppercase mb-5"
              style={{ color: 'var(--sage)', fontFamily: 'var(--font-poppins)' }}
            >
              Encuéntranos
            </p>
            <h2
              className="font-bold leading-[0.95] mb-16"
              style={{
                fontFamily: 'var(--font-playfair)',
                fontSize: 'clamp(40px, 6vw, 80px)',
                color: 'var(--charcoal)',
              }}
            >
              Estamos en<br />
              <span style={{ color: 'var(--forest)' }}>Playacar</span>
            </h2>

            <div className="space-y-10">
              {INFO.map((item, i) => (
                <motion.div
                  key={item.title}
                  className="flex items-start gap-5"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ backgroundColor: 'var(--sand)', color: 'var(--forest)' }}
                  >
                    <item.Icon />
                  </div>
                  <div>
                    <p
                      className="text-[10px] tracking-[0.2em] uppercase mb-1.5 font-semibold"
                      style={{ color: 'var(--sage)', fontFamily: 'var(--font-poppins)' }}
                    >
                      {item.title}
                    </p>
                    {item.lines.map((line) => (
                      <p
                        key={line}
                        className="text-sm leading-relaxed"
                        style={{ color: 'var(--charcoal)', fontFamily: 'var(--font-poppins)' }}
                      >
                        {line}
                      </p>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="mt-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <a
                href="https://maps.google.com/?q=Playacar+Phase+2,+Playa+del+Carmen"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-xs tracking-[0.2em] uppercase font-semibold transition-all hover:gap-5"
                style={{ color: 'var(--forest)', fontFamily: 'var(--font-poppins)' }}
              >
                Abrir en Google Maps
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12H19M13 6L19 12L13 18" />
                </svg>
              </a>
            </motion.div>
          </motion.div>

          {/* Right: map */}
          <motion.div
            className="rounded-2xl overflow-hidden"
            style={{ aspectRatio: '1/1', boxShadow: '0 8px 48px rgba(47,62,70,0.1)' }}
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3736.8!2d-87.0850!3d20.5975!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f4e43d3b3b3b3b3%3A0x1!2sPlayacar+Phase+2!5e0!3m2!1ses!2smx!4v1"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'saturate(0.7) contrast(0.95)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="GIA Wellness — Playacar"
            />
          </motion.div>

        </div>
      </div>
    </section>
  )
}
