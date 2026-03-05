import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SolutionSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const underlineRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        },
      });

      // ENTRANCE (0%-30%)
      // Label from top
      scrollTl.fromTo(
        labelRef.current,
        { y: '-12vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'power2.out' },
        0
      );

      // Headline from bottom (dramatic)
      scrollTl.fromTo(
        headlineRef.current,
        { y: '40vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'power2.out' },
        0
      );

      // Body from bottom
      scrollTl.fromTo(
        bodyRef.current,
        { y: '10vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'power2.out' },
        0.05
      );

      // Accent underline scale
      scrollTl.fromTo(
        underlineRef.current,
        { scaleX: 0 },
        { scaleX: 1, ease: 'power2.out' },
        0.1
      );

      // Image scale
      scrollTl.fromTo(
        imageRef.current,
        { scale: 1.08 },
        { scale: 1, ease: 'none' },
        0
      );

      // SETTLE (30%-70%): Hold positions

      // EXIT (70%-100%)
      scrollTl.fromTo(
        labelRef.current,
        { y: 0, opacity: 1 },
        { y: '-6vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        headlineRef.current,
        { y: 0, opacity: 1 },
        { y: '-12vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        underlineRef.current,
        { scaleX: 1 },
        { scaleX: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        bodyRef.current,
        { y: 0, opacity: 1 },
        { y: '8vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        imageRef.current,
        { scale: 1 },
        { scale: 1.05, ease: 'none' },
        0.7
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="solution"
      className="pinned-section"
    >
      {/* Background Image */}
      <div
        ref={imageRef}
        className="absolute inset-0 w-full h-full"
      >
        <img
          src="/solution_abstract.jpg"
          alt="AI Solution Abstract"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-navy/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center px-6 lg:px-16 xl:px-24">
        {/* Label */}
        <span
          ref={labelRef}
          className="section-label mb-6"
        >
          THE SOLUTION
        </span>

        {/* Headline */}
        <h2
          ref={headlineRef}
          className="display-heading text-white max-w-4xl mb-4"
        >
          Solusi AI
          <br />
          <span className="text-coral">yang terstruktur,</span>
          <br />
          terukur, dan adaptif.
        </h2>

        {/* Accent Underline */}
        <div
          ref={underlineRef}
          className="w-48 h-0.5 bg-coral mb-8 origin-left"
        />

        {/* Body */}
        <p
          ref={bodyRef}
          className="body-text max-w-md"
        >
          Dari audit hingga operasi—kami membangun sistem yang bisa berkembang bersama bisnis Anda.
        </p>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-navy to-transparent pointer-events-none" />
    </section>
  );
};

export default SolutionSection;
