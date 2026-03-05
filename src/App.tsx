import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './App.css';

// Import sections
import Navigation from './sections/Navigation';
import HeroSection from './sections/HeroSection';
import ProblemSection from './sections/ProblemSection';
import ProcessSection from './sections/ProcessSection';
import SolutionSection from './sections/SolutionSection';
import ServicesSection from './sections/ServicesSection';
import ValueSection from './sections/ValueSection';
import PricingSection from './sections/PricingSection';
import ContactSection from './sections/ContactSection';
import Footer from './sections/Footer';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Wait for all sections to mount before setting up global snap
    const timer = setTimeout(() => {
      setupGlobalSnap();
    }, 500);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  const setupGlobalSnap = () => {
    const pinned = ScrollTrigger.getAll()
      .filter(st => st.vars.pin)
      .sort((a, b) => a.start - b.start);
    
    const maxScroll = ScrollTrigger.maxScroll(window);
    if (!maxScroll || pinned.length === 0) return;

    const pinnedRanges = pinned.map(st => ({
      start: st.start / maxScroll,
      end: (st.end ?? st.start) / maxScroll,
      center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
    }));

    ScrollTrigger.create({
      snap: {
        snapTo: (value: number) => {
          const inPinned = pinnedRanges.some(r => value >= r.start - 0.08 && value <= r.end + 0.08);
          if (!inPinned) return value;

          const target = pinnedRanges.reduce((closest, r) =>
            Math.abs(r.center - value) < Math.abs(closest - value) ? r.center : closest,
            pinnedRanges[0]?.center ?? 0
          );
          return target;
        },
        duration: { min: 0.15, max: 0.35 },
        delay: 0,
        ease: "power2.out"
      }
    });
  };

  return (
    <div ref={mainRef} className="relative bg-navy min-h-screen">
      {/* Grain overlay */}
      <div className="grain-overlay" />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main content */}
      <main className="relative">
        {/* Section 1: Hero - z-10 */}
        <div className="relative z-10">
          <HeroSection />
        </div>
        
        {/* Section 2: Problem - z-20 */}
        <div className="relative z-20">
          <ProblemSection />
        </div>
        
        {/* Section 3: Process - z-30 */}
        <div className="relative z-30">
          <ProcessSection />
        </div>
        
        {/* Section 4: Solution - z-40 */}
        <div className="relative z-40">
          <SolutionSection />
        </div>
        
        {/* Section 5: Services - z-50 */}
        <div className="relative z-50">
          <ServicesSection />
        </div>
        
        {/* Section 6: Value - z-50 */}
        <div className="relative z-50">
          <ValueSection />
        </div>
        
        {/* Section 7: Pricing - z-50 */}
        <div className="relative z-50">
          <PricingSection />
        </div>
        
        {/* Section 8: Contact - z-50 */}
        <div className="relative z-50">
          <ContactSection />
        </div>
        
        {/* Section 9: Footer - z-50 */}
        <div className="relative z-50">
          <Footer />
        </div>
      </main>
    </div>
  );
}

export default App;
