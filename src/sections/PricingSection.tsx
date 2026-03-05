import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, ArrowRight, Building2, Rocket, Crown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const pricingPlans = [
  {
    name: 'Starter',
    subtitle: 'UMKM',
    price: 'Disesuaikan dengan Budget Anda',
    priceNote: '70% lebih murah dari vendor lain',
    description: 'Cocok untuk bisnis yang baru memulai transformasi digital.',
    icon: Building2,
    features: [
      'Landing page profesional',
      'Chatbot dasar (WhatsApp)',
      'Integrasi 2 platform',
      'Support 1 bulan',
      'Dokumentasi lengkap',
    ],
    cta: 'Mulai Proyek',
    highlighted: false,
  },
  {
    name: 'Growth',
    subtitle: 'Bisnis Berkembang',
    price: 'Disesuaikan dengan Budget Anda',
    priceNote: '70% lebih murah, Efisiensi dijamin',
    description: 'Solusi lengkap untuk bisnis yang siap scale.',
    icon: Rocket,
    features: [
      'Website company profile',
      'Chatbot AI advanced',
      'Otomasi workflow',
      'Integrasi 5+ platform',
      'Support 3 bulan',
      'Dashboard analytics',
      'SEO optimization',
    ],
    cta: 'Mulai Proyek',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    subtitle: 'Kustom',
    price: 'Kontak Kami',
    description: 'Solusi bespoke untuk kebutuhan enterprise.',
    icon: Crown,
    features: [
      'Sistem skala besar',
      'AI/ML custom development',
      'Integrasi unlimited',
      'Dedicated support team',
      'SLA guarantee',
      'On-premise option',
      'Security audit',
    ],
    cta: 'Diskusi Kebutuhan',
    highlighted: false,
  },
];

const PricingSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
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

      // Cards animation
      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        gsap.fromTo(
          card,
          {
            y: 40,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            delay: index * 0.15,
            scrollTrigger: {
              trigger: card,
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
      id="pricing"
      className="relative py-24 lg:py-32 bg-navy"
    >
      <div className="px-6 lg:px-16 xl:px-24">
        {/* Section Title */}
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="section-heading text-white mb-4">
            Pilih Paket yang <span className="text-coral">Sesuai</span>
          </h2>
          <p className="body-text max-w-lg mx-auto">
            Transparan dan fleksibel. Pilih paket yang paling sesuai dengan 
            kebutuhan dan skala bisnis Anda.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => {
            const Icon = plan.icon;
            
            return (
              <div
                key={plan.name}
                ref={(el) => { cardsRef.current[index] = el; }}
                className={`relative rounded-xl overflow-hidden transition-all duration-300 ${
                  plan.highlighted
                    ? 'border-2 border-coral bg-gradient-to-b from-coral/5 to-transparent'
                    : 'border border-white/10 bg-white/[0.02]'
                } hover:-translate-y-1.5`}
              >
                {/* Popular Badge */}
                {plan.highlighted && (
                  <div className="absolute top-0 right-0">
                    <div className="bg-coral text-white text-xs font-medium px-4 py-1.5 rounded-bl-lg">
                      Paling Populer
                    </div>
                  </div>
                )}

                <div className="p-6 lg:p-8">
                  {/* Icon & Name */}
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        plan.highlighted ? 'bg-coral/20' : 'bg-white/5'
                      }`}
                    >
                      <Icon
                        size={20}
                        className={plan.highlighted ? 'text-coral' : 'text-grayblue'}
                      />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-white">
                        {plan.name}
                      </h3>
                      <p className="text-xs text-grayblue">{plan.subtitle}</p>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mb-4">
                    <span className="text-xl lg:text-2xl font-display font-bold text-white block">
                      {plan.price}
                    </span>
                    {plan.priceNote && (
                      <span className="text-sm text-coral mt-1 block">
                        {plan.priceNote}
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-sm text-grayblue mb-6">{plan.description}</p>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-3 text-sm"
                      >
                        <Check
                          size={16}
                          className={`mt-0.5 flex-shrink-0 ${
                            plan.highlighted ? 'text-coral' : 'text-teal'
                          }`}
                        />
                        <span className="text-white/80">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <button
                    onClick={scrollToContact}
                    className={`w-full py-3 px-4 rounded-lg font-medium text-sm transition-all duration-300 flex items-center justify-center gap-2 group ${
                      plan.highlighted
                        ? 'bg-coral text-white hover:bg-coral-dark'
                        : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'
                    }`}
                  >
                    {plan.cta}
                    <ArrowRight
                      size={16}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Note */}
        <p className="text-center text-sm text-grayblue mt-10">
          Semua paket include konsultasi awal gratis.{' '}
          <button
            onClick={scrollToContact}
            className="text-coral hover:underline"
          >
            Hubungi kami
          </button>{' '}
          untuk detail lebih lanjut.
        </p>
      </div>
    </section>
  );
};

export default PricingSection;
