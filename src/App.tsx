import { useState, useEffect } from 'react';
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import Categories from './sections/Categories';
import About from './sections/About';
import Products from './sections/Products';
import Destinations from './sections/Destinations';
import Testimonials from './sections/Testimonials';
import Partners from './sections/Partners';
import Team from './sections/Team';
import Blog from './sections/Blog';
import FAQ from './sections/FAQ';
import CTA from './sections/CTA';
import Footer from './sections/Footer';
import { ThemeProvider } from '@/hooks/use-theme';
import { ScrollProgress } from '@/components/ScrollProgress';
import { BackToTop } from '@/components/BackToTop';
import { AnnouncementBar } from '@/components/Notification';

function App() {
  const [scrollY, setScrollY] = useState(0);
  const [showAnnouncement, setShowAnnouncement] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <ThemeProvider defaultTheme="light" storageKey="ampvia-theme">
      <div className="min-h-screen bg-cream overflow-x-hidden dark:bg-gray-dark dark:text-white transition-colors duration-500">
        <ScrollProgress />
        <AnnouncementBar 
          message="🎉 Special Offer: Get 20% off on all LED lighting solutions this month!"
          onClose={() => setShowAnnouncement(false)}
        />
        <Navigation scrollY={scrollY} />
        <Hero />
        <Categories />
        <About />
        <Products />
        <Destinations />
        <Testimonials />
        <Partners />
        <Team />
        <Blog />
        <FAQ />
        <CTA />
        <Footer />
        <BackToTop />
      </div>
    </ThemeProvider>
  );
}

export default App;
