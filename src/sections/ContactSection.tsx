import { useState, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react';
import { toast } from 'sonner';

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Left content animation
      gsap.fromTo(
        leftRef.current,
        { x: '-6vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: leftRef.current,
            start: 'top 80%',
            end: 'top 55%',
            scrub: true,
          },
        }
      );

      // Form animation
      gsap.fromTo(
        formRef.current,
        { x: '6vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 80%',
            end: 'top 55%',
            scrub: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast.success('Pesan berhasil dikirim! Kami akan menghubungi Anda segera.');
    setFormData({ name: '', email: '', company: '', message: '' });
    setIsSubmitting(false);
  };

  const openWhatsApp = () => {
    window.open('https://wa.me/6281529996002?text=Halo,%20saya%20tertarik%20untuk%20digitalisasi%20usaha%20saya', '_blank');
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-24 lg:py-32 bg-navy"
    >
      <div className="px-6 lg:px-16 xl:px-24">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 max-w-6xl mx-auto">
          {/* Left Column - Contact Info */}
          <div ref={leftRef} className="lg:w-2/5">
            <h2 className="section-heading text-white mb-6">
              Mari <span className="text-coral">mulai.</span>
            </h2>

            <p className="body-text mb-10">
              Siap untuk transformasi digital? Hubungi kami dan mulai perjalanan 
              menuju bisnis yang lebih efisien.
            </p>

            {/* Contact Details */}
            <div className="space-y-6 mb-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-coral/10 flex items-center justify-center">
                  <Mail size={20} className="text-coral" />
                </div>
                <div>
                  <p className="text-sm text-grayblue">Email</p>
                  <a
                    href="mailto:marketing@dgsolusi.com"
                    className="text-white hover:text-coral transition-colors"
                  >
                    marketing@dgsolusi.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-teal/10 flex items-center justify-center">
                  <Phone size={20} className="text-teal" />
                </div>
                <div>
                  <p className="text-sm text-grayblue">WhatsApp</p>
                  <a
                    href="https://wa.me/6281529996002"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-teal transition-colors"
                  >
                    +62 815-2999-6002
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
                  <MapPin size={20} className="text-grayblue" />
                </div>
                <div>
                  <p className="text-sm text-grayblue">Lokasi</p>
                  <p className="text-white">Tangerang Selatan & Seluruh Indonesia</p>
                </div>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <button
              onClick={openWhatsApp}
              className="w-full sm:w-auto flex items-center justify-center gap-3 px-6 py-4 bg-[#25D366] text-white rounded-xl font-medium transition-all duration-300 hover:brightness-110 hover:-translate-y-0.5"
            >
              <MessageCircle size={20} />
              Chat via WhatsApp
            </button>
          </div>

          {/* Right Column - Form */}
          <div ref={formRef} className="lg:w-3/5">
            <div className="glass-card rounded-xl p-6 lg:p-8">
              <h3 className="font-display text-xl font-semibold text-white mb-6">
                Kirim Pesan
              </h3>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm text-grayblue mb-2"
                  >
                    Nama
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-grayblue/50 focus:outline-none focus:border-coral/50 focus:ring-1 focus:ring-coral/50 transition-all"
                    placeholder="Nama lengkap Anda"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm text-grayblue mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-grayblue/50 focus:outline-none focus:border-coral/50 focus:ring-1 focus:ring-coral/50 transition-all"
                    placeholder="email@perusahaan.com"
                  />
                </div>

                {/* Company */}
                <div>
                  <label
                    htmlFor="company"
                    className="block text-sm text-grayblue mb-2"
                  >
                    Perusahaan
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-grayblue/50 focus:outline-none focus:border-coral/50 focus:ring-1 focus:ring-coral/50 transition-all"
                    placeholder="Nama perusahaan (opsional)"
                  />
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm text-grayblue mb-2"
                  >
                    Pesan
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-grayblue/50 focus:outline-none focus:border-coral/50 focus:ring-1 focus:ring-coral/50 transition-all resize-none"
                    placeholder="Ceritakan kebutuhan Anda..."
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg
                        className="animate-spin h-5 w-5"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Mengirim...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      Kirim Pesan
                      <Send size={18} />
                    </span>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
