'use client'

import { useState } from 'react'
import type { ReactElement } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type Category = 'bowls' | 'desayunos' | 'batidos'

// SVG icons per category — thin line, 1.5px stroke
const IconBowl = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 11C4 11 4 18 12 18C20 18 20 11 20 11H4Z" />
    <path d="M4 11H20" />
    <path d="M8 11V8C8 6.9 8.9 6 10 6H14C15.1 6 16 6.9 16 8V11" />
    <path d="M9 6C9 6 9 4 12 4C15 4 15 6 15 6" />
  </svg>
)

const IconToast = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="9" rx="2" />
    <path d="M7 11V7C7 5.34 9.24 4 12 4C14.76 4 17 5.34 17 7V11" />
    <path d="M9 14.5C9.5 15 10.2 15.5 11 15.5" />
    <path d="M13 14C13.8 14.3 14.5 14.8 15 15.5" />
  </svg>
)

const IconCup = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 3H17L15.5 19C15.5 19.6 14.9 20 14 20H10C9.1 20 8.5 19.6 8.5 19L7 3Z" />
    <path d="M5 3H19" />
    <path d="M10 3V2" />
    <path d="M14 3V2" />
    <path d="M9 8C10 9 11 9 12 8C13 7 14 7 15 8" />
  </svg>
)

// Tag SVG icons
const IconVegan = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22C12 22 3 16 3 9C3 5.7 7 3 12 3C17 3 21 5.7 21 9C21 16 12 22 12 22Z" />
    <path d="M12 22C12 22 10 13 7 10" />
  </svg>
)

const MENU: Record<Category, { name: string; desc: string; tags: string[]; accent: string; Icon: () => ReactElement }[]> = {
  bowls: [
    { name: 'Açaí Power Bowl', desc: 'Base de açaí, granola artesanal, plátano, frutos rojos, miel de agave y coco rallado', tags: ['Vegano', 'Sin Gluten'], accent: '#3B1F8C', Icon: IconBowl },
    { name: 'Green Goddess', desc: 'Mango, espinaca baby, granola, kiwi, semillas de chía y leche de coco', tags: ['Vegano', 'Raw'], accent: '#52796F', Icon: IconBowl },
    { name: 'Tropical Sunrise', desc: 'Piña, mango, maracuyá, granola tostada, coco rallado y menta fresca', tags: ['Sin Azúcar'], accent: '#D4A574', Icon: IconBowl },
  ],
  desayunos: [
    { name: 'Tostada Aguacate', desc: 'Pan de masa madre, aguacate fresco, jitomate cherry, microgreens y chile de árbol', tags: ['Vegano'], accent: '#84A98C', Icon: IconToast },
    { name: 'Tostada Ricotta', desc: 'Pan artesanal, ricotta fresca, higos, miel de abeja y nueces caramelizadas', tags: ['Vegetariano'], accent: '#D4A574', Icon: IconToast },
    { name: 'Eggs & Greens', desc: 'Huevos orgánicos, tostada de centeno, aguacate, espinaca salteada y limón', tags: ['Proteína'], accent: '#C4913A', Icon: IconToast },
  ],
  batidos: [
    { name: 'Verde Tropical', desc: 'Espinaca, mango, plátano, jengibre fresco y leche de almendra', tags: ['Vegano', 'Detox'], accent: '#52796F', Icon: IconCup },
    { name: 'Fresa Coco', desc: 'Fresas frescas, coco, plátano, semillas de chía y leche de avena', tags: ['Sin Lactosa'], accent: '#E8434A', Icon: IconCup },
    { name: 'Golden Glow', desc: 'Cúrcuma, jengibre, mango, pimienta negra y leche de coco', tags: ['Anti-inflamatorio'], accent: '#C4913A', Icon: IconCup },
  ],
}

const TABS: { key: Category; label: string; Icon: () => ReactElement }[] = [
  { key: 'bowls', label: 'Bowls', Icon: IconBowl },
  { key: 'desayunos', label: 'Desayunos', Icon: IconToast },
  { key: 'batidos', label: 'Batidos', Icon: IconCup },
]

export default function MenuSection() {
  const [active, setActive] = useState<Category>('bowls')

  return (
    <section id="menu" className="py-28 px-8 md:px-16" style={{ backgroundColor: 'var(--cream)' }}>
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p
            className="text-[10px] tracking-[0.3em] uppercase mb-5"
            style={{ color: 'var(--sage)', fontFamily: 'var(--font-poppins)' }}
          >
            Lo que encontrarás
          </p>
          <h2
            className="font-bold leading-[0.95]"
            style={{
              fontFamily: 'var(--font-playfair)',
              fontSize: 'clamp(40px, 6vw, 80px)',
              color: 'var(--charcoal)',
            }}
          >
            Nuestro<br />
            <span style={{ color: 'var(--forest)' }}>Menú</span>
          </h2>
        </motion.div>

        {/* Tabs — icon + label, underline style */}
        <div className="flex gap-0 mb-14 border-b" style={{ borderColor: 'rgba(47,62,70,0.1)' }}>
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActive(tab.key)}
              className="flex items-center gap-2 px-6 py-4 text-xs tracking-[0.2em] uppercase font-semibold transition-all relative"
              style={{
                color: active === tab.key ? 'var(--forest)' : '#9EAA9F',
                fontFamily: 'var(--font-poppins)',
              }}
            >
              <tab.Icon />
              <span className="hidden sm:inline">{tab.label}</span>
              {active === tab.key && (
                <motion.div
                  layoutId="tab-underline"
                  className="absolute bottom-0 left-0 right-0 h-px"
                  style={{ backgroundColor: 'var(--forest)' }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            className="grid grid-cols-1 md:grid-cols-3 gap-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {MENU[active].map((item, i) => (
              <motion.div
                key={item.name}
                className="group py-10 pr-10 cursor-default"
                style={{
                  borderRight: i < 2 ? '1px solid rgba(47,62,70,0.08)' : 'none',
                  borderBottom: '1px solid rgba(47,62,70,0.08)',
                  paddingLeft: i === 0 ? 0 : '2.5rem',
                }}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
              >
                {/* Icon + accent bar */}
                <div className="flex items-center gap-3 mb-6">
                  <div style={{ color: item.accent }}>
                    <item.Icon />
                  </div>
                  <div className="h-px flex-1" style={{ backgroundColor: item.accent, opacity: 0.3 }} />
                </div>

                <h3
                  className="text-lg font-bold mb-3 group-hover:translate-x-1 transition-transform duration-200"
                  style={{ color: 'var(--charcoal)', fontFamily: 'var(--font-playfair)' }}
                >
                  {item.name}
                </h3>
                <p
                  className="text-sm mb-6 leading-relaxed"
                  style={{ color: '#7A8A85', fontFamily: 'var(--font-poppins)' }}
                >
                  {item.desc}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1.5 text-[10px] px-3 py-1.5 rounded-full tracking-[0.1em] uppercase font-medium"
                      style={{
                        backgroundColor: 'var(--sand)',
                        color: 'var(--forest)',
                        fontFamily: 'var(--font-poppins)',
                      }}
                    >
                      <IconVegan />
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Footer note */}
        <motion.div
          className="flex items-center gap-4 mt-14"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="h-px flex-1" style={{ backgroundColor: 'rgba(47,62,70,0.08)' }} />
          <p
            className="text-[10px] tracking-[0.2em] uppercase whitespace-nowrap"
            style={{ color: '#9EAA9F', fontFamily: 'var(--font-poppins)' }}
          >
            Menú completo · apertura 12 abril 2026
          </p>
          <div className="h-px flex-1" style={{ backgroundColor: 'rgba(47,62,70,0.08)' }} />
        </motion.div>

      </div>
    </section>
  )
}
