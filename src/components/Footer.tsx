export default function Footer() {
  const links = [
    { label: 'Menú', href: '#menu' },
    { label: 'Nosotros', href: '#nosotros' },
    { label: 'Ubicación', href: '#ubicacion' },
    { label: 'Instagram', href: 'https://www.instagram.com/gia_wellness', external: true },
  ]

  return (
    <footer className="py-12 px-8 md:px-16" style={{ backgroundColor: 'var(--forest)' }}>
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">

        <div className="flex items-baseline gap-3">
          <span
            className="text-2xl font-bold text-white"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            GIA
          </span>
          <span
            className="text-[9px] tracking-[0.25em] uppercase"
            style={{ color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-poppins)' }}
          >
            Wellness · Playacar
          </span>
        </div>

        <div className="flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.external ? '_blank' : undefined}
              rel={l.external ? 'noopener noreferrer' : undefined}
              className="text-[10px] tracking-[0.2em] uppercase transition-colors hover:text-white"
              style={{ color: 'rgba(255,255,255,0.35)', fontFamily: 'var(--font-poppins)' }}
            >
              {l.label}
            </a>
          ))}
        </div>

        <p
          className="text-[10px] tracking-[0.15em]"
          style={{ color: 'rgba(255,255,255,0.2)', fontFamily: 'var(--font-poppins)' }}
        >
          © 2026 GIA
        </p>

      </div>
    </footer>
  )
}
