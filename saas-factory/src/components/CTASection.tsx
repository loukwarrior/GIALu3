'use client'

import { motion } from 'framer-motion'

const WA_NUMBER = '529841234567'
const WA_MSG = encodeURIComponent('Hola! Me gustaría saber más sobre GIA Wellness')

const IconWhatsApp = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
)

const IconInstagram = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
  </svg>
)

export default function CTASection() {
  return (
    <section className="py-28 px-8 md:px-16" style={{ backgroundColor: 'var(--forest)' }}>
      <div className="max-w-6xl mx-auto">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-end">

          {/* Left: headline */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p
              className="text-[10px] tracking-[0.3em] uppercase mb-5"
              style={{ color: 'var(--sage)', fontFamily: 'var(--font-poppins)' }}
            >
              Contacto
            </p>
            <h2
              className="font-bold leading-[0.95] text-white"
              style={{
                fontFamily: 'var(--font-playfair)',
                fontSize: 'clamp(40px, 6vw, 80px)',
              }}
            >
              Hablemos<br />
              <span style={{ color: 'var(--teal)' }}>hoy</span>
            </h2>
          </motion.div>

          {/* Right: desc + buttons */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
          >
            <p
              className="text-sm leading-relaxed mb-10"
              style={{ color: 'rgba(255,255,255,0.55)', fontFamily: 'var(--font-poppins)', maxWidth: '360px' }}
            >
              Escríbenos por WhatsApp para cualquier consulta.
              Síguenos en Instagram para ver novedades, el menú completo y más.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={`https://wa.me/${WA_NUMBER}?text=${WA_MSG}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-7 py-4 rounded-full text-xs tracking-[0.2em] uppercase font-semibold transition-all hover:scale-105 hover:shadow-xl"
                style={{ backgroundColor: '#25D366', color: 'white', fontFamily: 'var(--font-poppins)' }}
              >
                <IconWhatsApp />
                Escríbenos
              </a>
              <a
                href="https://www.instagram.com/gia_wellness"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-7 py-4 rounded-full text-xs tracking-[0.2em] uppercase font-semibold border transition-all hover:bg-white/10"
                style={{ borderColor: 'rgba(255,255,255,0.25)', color: 'white', fontFamily: 'var(--font-poppins)' }}
              >
                <IconInstagram />
                @gia_wellness
              </a>
            </div>
          </motion.div>

        </div>

        {/* Bottom rule */}
        <div className="w-full h-px mt-20" style={{ backgroundColor: 'rgba(255,255,255,0.08)' }} />

      </div>
    </section>
  )
}
