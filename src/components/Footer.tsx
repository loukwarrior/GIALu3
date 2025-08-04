import React from 'react';
import Link from 'next/link';
import { Heart, Instagram, Twitter, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <span className="text-white font-accent text-xl font-bold">G</span>
              </div>
              <div>
                <h3 className="text-2xl font-accent font-bold">GIA</h3>
                <p className="text-primary-100 text-sm -mt-1">Wellness</p>
              </div>
            </div>
            <p className="text-primary-100 text-sm leading-relaxed mb-6 max-w-md">
              Más que una app de ejercicios, somos una comunidad de mujeres que se apoyan 
              en su camino hacia el bienestar integral. Tu práctica, tu comunidad, tu bienestar.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-white/20 transition-colors duration-200"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-white/20 transition-colors duration-200"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-white/20 transition-colors duration-200"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Explora</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/clases" className="text-primary-100 hover:text-white transition-colors duration-200">
                  Todas las clases
                </Link>
              </li>
              <li>
                <Link href="/clases?category=yoga" className="text-primary-100 hover:text-white transition-colors duration-200">
                  Yoga
                </Link>
              </li>
              <li>
                <Link href="/clases?category=pilates" className="text-primary-100 hover:text-white transition-colors duration-200">
                  Pilates
                </Link>
              </li>
              <li>
                <Link href="/clases?category=meditación" className="text-primary-100 hover:text-white transition-colors duration-200">
                  Meditación
                </Link>
              </li>
              <li>
                <Link href="/clases?category=bienestar" className="text-primary-100 hover:text-white transition-colors duration-200">
                  Bienestar
                </Link>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Comunidad</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/mis-clases" className="text-primary-100 hover:text-white transition-colors duration-200">
                  Mis Clases
                </Link>
              </li>
              <li>
                <a href="#" className="text-primary-100 hover:text-white transition-colors duration-200">
                  Sobre GIA
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-100 hover:text-white transition-colors duration-200">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-100 hover:text-white transition-colors duration-200">
                  Contacto
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-100 hover:text-white transition-colors duration-200">
                  Ayuda
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-primary-100 text-sm">
              © 2024 GIA Wellness. Todos los derechos reservados.
            </p>
            <div className="flex items-center space-x-1 mt-4 md:mt-0">
              <span className="text-primary-100 text-sm">Hecho con</span>
              <Heart className="w-4 h-4 text-red-300 fill-current" />
              <span className="text-primary-100 text-sm">para la comunidad GIA</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 