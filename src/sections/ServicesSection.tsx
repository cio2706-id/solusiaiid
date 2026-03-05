import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MessageSquare, Globe, Lightbulb, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    number: '01',
    title: 'Implementasi AI',
    description: 'Chatbot pintar, otomasi alur kerja, dan integrasi API untuk efisiensi maksimal.',
    features: ['Chatbot Cerdas', 'Otomasi Workflow', 'Integrasi API'],
    icon: MessageSquare,
    image: '/service_thumb_chatbot.jpg',
    align: 'left' as const,
  },
  {
    number: '02',
    title: 'Solusi Digital',
    description: 'Website modern, landing page konversi tinggi, dan dashboard interaktif.',
    features: ['Website Modern', 'Landing Page', 'Dashboard'],
    icon: Globe,
    image: '/service_thumb_web.jpg',
    align: 'right' as const,
  },
  {
    number: '03',
    title: 'Konsultasi Strategis',
    description: 'Audit digital menyeluruh, roadmap transformasi, dan change management.',
    features: ['Audit Digital', 'Roadmap', 'Change Management'],
    icon: Lightbulb,
    image: '/service_thumb_strategy.jpg',
    align: 'left' as const,
  },
];

const ServicesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            end: 'top 55%',
            scrub: true,
          },
        }
      );

      // S-path SVG animation
      if (pathRef.current) {
        const pathLength = pathRef.current.getTotalLength();
        gsap.set(pathRef.current, {
          strokeDasharray: pathLength,
          strokeDashoffset: pathLength,
        });

        gsap.to(pathRef.current, {
          strokeDashoffset: 0,
          duration: 2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            end: 'bottom 40%',
            scrub: true,
          },
        });
      }

      // Cards animation
      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        const isLeft = services[index].align === 'left';

        gsap.fromTo(
          card,
          {
            x: isLeft ? '-10vw' : '10vw',
            y: 20,
            opacity: 0,
          },
          {
            x: 0,
            y: 0,
            opacity: 1,
            duration: 0.8,
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
              end: 'top 50%',
              scrub: true,
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
      id="services"
      className="relative py-24 lg:py-32 bg-navy overflow-hidden"
    >
      {/* S-Path SVG Background */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 1200 1600"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          ref={pathRef}
          d="M 200 100 
             C 400 100, 500 200, 500 300
             S 300 500, 200 600
             S 100 800, 300 900
             S 700 1000, 1000 1100
             S 1100 1300, 900 1400
             S 500 1500, 400 1500"
          stroke="rgba(247, 248, 251, 0.1)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        {/* Accent segment near end */}
        <path
          d="M 500 1400 S 400 1500, 400 1500"
          stroke="#FF6A3D"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          className="animate-pulse-glow"
        />
      </svg>

      <div className="relative z-10 px-6 lg:px-16 xl:px-24">
        {/* Section Title */}
        <h2
          ref={titleRef}
          className="section-heading text-white mb-20"
        >
          Layanan <span className="text-coral">Kami</span>
        </h2>

        {/* Service Cards */}
        <div className="space-y-24 lg:space-y-32">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={service.number}
                ref={(el) => { cardsRef.current[index] = el; }}
                className={`flex flex-col ${
                  service.align === 'right' ? 'lg:flex-row-reverse' : 'lg:flex-row'
                } items-center gap-10 lg:gap-16`}
              >
                {/* Image */}
                <div className="w-full lg:w-1/2">
                  <div className="relative overflow-hidden rounded-xl group">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full aspect-video object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
                    
                    {/* Number Badge */}
                    <div className="absolute top-4 left-4 px-3 py-1.5 bg-navy/80 backdrop-blur-sm rounded-lg border border-white/10">
                      <span className="font-mono text-sm text-coral">{service.number}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="w-full lg:w-1/2">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-coral/10 flex items-center justify-center">
                      <Icon size={24} className="text-coral" />
                    </div>
                    <h3 className="font-display text-2xl lg:text-3xl font-semibold text-white">
                      {service.title}
                    </h3>
                  </div>

                  <p className="body-text mb-6">{service.description}</p>

                  {/* Features */}
                  <ul className="space-y-2 mb-8">
                    {service.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-3 text-sm text-grayblue"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-teal" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <button
            onClick={scrollToContact}
            className="btn-outline group"
          >
            Lihat detail layanan
            <ArrowRight
              size={18}
              className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
            />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
