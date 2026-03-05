import { useEffect, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const hintRef = useRef<HTMLSpanElement>(null);

  // Load animation (auto-play on mount)
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Image panel entrance
      tl.fromTo(
        imageRef.current,
        { x: '-60vw', opacity: 0 },
        { x: 0, opacity: 1, duration: 1 },
        0
      );

      // Headline words entrance
      const words = headlineRef.current?.querySelectorAll('.word');
      if (words) {
        tl.fromTo(
          words,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.05 },
          0.2
        );
      }

      // Subheadline entrance
      tl.fromTo(
        subheadRef.current,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        0.5
      );

      // CTA entrance
      tl.fromTo(
        ctaRef.current,
        { scale: 0.92, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5 },
        0.7
      );

      // Hint entrance
      tl.fromTo(
        hintRef.current,
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4 },
        0.9
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Scroll-driven exit animation
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            // Reset all elements when scrolling back to top
            gsap.set([headlineRef.current, subheadRef.current, ctaRef.current, hintRef.current], {
              opacity: 1,
              x: 0,
              y: 0,
            });
            gsap.set(imageRef.current, { scale: 1, x: 0 });
          },
        },
      });

      // ENTRANCE (0%-30%): Hold - elements already visible from load animation
      // SETTLE (30%-70%): Hold

      // EXIT (70%-100%)
      // Headline exit
      scrollTl.fromTo(
        headlineRef.current,
        { x: 0, opacity: 1 },
        { x: '-10vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      // Subheadline exit
      scrollTl.fromTo(
        subheadRef.current,
        { y: 0, opacity: 1 },
        { y: '10vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      // CTA exit
      scrollTl.fromTo(
        ctaRef.current,
        { y: 0, opacity: 1 },
        { y: '10vh', opacity: 0, ease: 'power2.in' },
        0.72
      );

      // Hint exit
      scrollTl.fromTo(
        hintRef.current,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.75
      );

      // Image slow drift
      scrollTl.fromTo(
        imageRef.current,
        { scale: 1, x: 0 },
        { scale: 1.06, x: '-6vw', ease: 'none' },
        0.7
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="pinned-section bg-navy"
    >
      {/* Left Image Panel */}
      <div
        ref={imageRef}
        className="absolute left-0 top-0 w-full lg:w-[52vw] h-full"
      >
        <img
          src="/hero_abstract_ai.jpg"
          alt="AI Network Visualization"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-navy lg:block hidden" />
        <div className="absolute inset-0 bg-navy/40 lg:hidden" />
      </div>

      {/* Right Content Panel */}
      <div className="absolute inset-0 lg:left-[52vw] lg:w-[48vw] flex items-center">
        <div className="w-full px-6 lg:px-12 xl:px-16 py-20 lg:py-0">
          {/* Headline */}
          <h1
            ref={headlineRef}
            className="display-heading text-white mb-8"
          >
            <span className="word inline-block">Digital</span>{' '}
            <span className="word inline-block">Grace</span>
            <br />
            <span className="word inline-block text-coral">for</span>{' '}
            <span className="word inline-block text-coral">Your</span>{' '}
            <span className="word inline-block text-coral">Business.</span>
          </h1>

          {/* Subheadline */}
          <p
            ref={subheadRef}
            className="body-text max-w-md mb-10"
          >
            Simplifikasi perjalanan digital Anda dengan AI cerdas. 
            <span className="text-white font-medium"> 70% Lebih Hemat</span>,{' '}
            <span className="text-white font-medium">100% Lebih Cepat</span>, Kualitas Premium.
          </p>

          {/* CTA Button */}
          <button
            ref={ctaRef}
            onClick={scrollToContact}
            className="btn-primary group mb-6"
          >
            Mulai Transformasi
            <ArrowRight
              size={18}
              className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
            />
          </button>

          {/* Micro Hint */}
          <span
            ref={hintRef}
            className="section-label block"
          >
            Scroll untuk menjelajahi.
          </span>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-navy to-transparent pointer-events-none" />
    </section>
  );
};

export default HeroSection;
