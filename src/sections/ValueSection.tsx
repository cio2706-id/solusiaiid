import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TrendingDown, Zap, Users, Layers, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const values = [
  {
    icon: TrendingDown,
    title: '70% Lebih Hemat',
    description: 'Efisiensi AI menurunkan biaya pengembangan secara signifikan.',
    color: 'coral',
  },
  {
    icon: Zap,
    title: '100% Lebih Cepat',
    description: 'Iterasi cepat dengan kualitas deployment yang tetap aman.',
    color: 'teal',
  },
  {
    icon: Users,
    title: 'Tim Lintas Fungsi',
    description: 'Strategi, engineering, dan desain dalam satu tim terpadu.',
    color: 'coral',
  },
  {
    icon: Layers,
    title: 'Bisa Dikembangkan',
    description: 'Sistem yang adaptif sesuai pertumbuhan bisnis Anda.',
    color: 'teal',
  },
];

const ValueSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Headline animation
      gsap.fromTo(
        headlineRef.current,
        { x: '-6vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: headlineRef.current,
            start: 'top 80%',
            end: 'top 55%',
            scrub: true,
          },
        }
      );

      // Value items animation
      itemsRef.current.forEach((item, index) => {
        if (!item) return;

        gsap.fromTo(
          item,
          {
            y: 30,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            delay: index * 0.12,
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
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
      id="value"
      className="relative py-24 lg:py-32 bg-navy"
    >
      <div className="px-6 lg:px-16 xl:px-24">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          {/* Left Column - Sticky Headline */}
          <div className="lg:w-2/5">
            <div
              ref={headlineRef}
              className="lg:sticky lg:top-32"
            >
              <h2 className="section-heading text-white mb-6">
                Kenapa{' '}
                <span className="text-coral">Solusi Ai Id?</span>
              </h2>
              
              <p className="text-xl lg:text-2xl font-display font-medium text-white/90 mb-6">
                High-end technology,
                <br />
                <span className="text-teal">without high-end price.</span>
              </p>

              <p className="body-text mb-8 max-w-sm">
                Kami menggabungkan keahlian teknis dengan pemahaman bisnis untuk 
                memberikan solusi yang berdampak nyata.
              </p>

              <button
                onClick={scrollToContact}
                className="btn-primary group"
              >
                Diskusi kebutuhan Anda
                <ArrowRight
                  size={18}
                  className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>
            </div>
          </div>

          {/* Right Column - Value Items */}
          <div className="lg:w-3/5">
            <div className="grid sm:grid-cols-2 gap-6">
              {values.map((value, index) => {
                const Icon = value.icon;
                const isCoral = value.color === 'coral';
                
                return (
                  <div
                    key={value.title}
                    ref={(el) => { itemsRef.current[index] = el; }}
                    className="glass-card rounded-xl p-6 card-hover group"
                  >
                    {/* Icon */}
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 ${
                        isCoral ? 'bg-coral/10' : 'bg-teal/10'
                      }`}
                    >
                      <Icon
                        size={24}
                        className={isCoral ? 'text-coral' : 'text-teal'}
                      />
                    </div>

                    {/* Title */}
                    <h3 className="font-display text-lg font-semibold text-white mb-2">
                      {value.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-grayblue leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Testimonial Card */}
            <div className="mt-8 glass-card rounded-xl p-8 border-l-4 border-coral">
              <blockquote className="text-white/90 text-lg italic mb-4">
                "Solusi Ai Id membantu kami mengotomasi 80% proses customer service. 
                Hasilnya? Tim kami bisa fokus pada strategi growth."
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-coral to-teal flex items-center justify-center text-white font-semibold">
                  AR
                </div>
                <div>
                  <p className="text-white font-medium">Andi Raharjo</p>
                  <p className="text-sm text-grayblue">CEO, TechStart Indonesia</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValueSection;
