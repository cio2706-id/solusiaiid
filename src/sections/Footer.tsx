import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Linkedin, Instagram, Twitter } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        footerRef.current,
        { y: 16, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 95%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer
      ref={footerRef}
      className="relative py-8 bg-navy border-t border-white/5"
    >
      <div className="px-6 lg:px-16 xl:px-24">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Copyright */}
          <div className="flex items-center gap-3">
            {/* Small Logo */}
            <div className="w-8 h-8">
              <img
                src="/logo.png"
                alt="Solusi Ai Id"
                className="w-full h-full object-contain"
              />
            </div>
            <p className="text-sm text-grayblue">
              © 2026 Solusi Ai Id. All rights reserved.
            </p>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => scrollToSection('services')}
              className="text-sm text-grayblue hover:text-white transition-colors"
            >
              Layanan
            </button>
            <button
              onClick={() => scrollToSection('pricing')}
              className="text-sm text-grayblue hover:text-white transition-colors"
            >
              Harga
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-sm text-grayblue hover:text-white transition-colors"
            >
              Kontak
            </button>
            <span className="text-white/10">|</span>
            <a
              href="#"
              className="text-sm text-grayblue hover:text-white transition-colors"
            >
              Privasi
            </a>
            <a
              href="#"
              className="text-sm text-grayblue hover:text-white transition-colors"
            >
              Syarat
            </a>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-grayblue hover:text-white hover:bg-white/10 transition-all"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-grayblue hover:text-white hover:bg-white/10 transition-all"
            >
              <Instagram size={18} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-grayblue hover:text-white hover:bg-white/10 transition-all"
            >
              <Twitter size={18} />
            </a>
          </div>
        </div>

        {/* Company Info */}
        <div className="mt-8 pt-6 border-t border-white/5 text-center">
          <p className="text-xs text-grayblue/60">
            PT. Digital Grace Solusi | Tangerang Selatan & Seluruh Indonesia
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
