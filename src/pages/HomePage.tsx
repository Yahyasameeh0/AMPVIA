import Hero from '../sections/Hero';
import Categories from '../sections/Categories';
import About from '../sections/About';
import Products from '../sections/Products';
import Destinations from '../sections/Destinations';
import Testimonials from '../sections/Testimonials';
import CTA from '../sections/CTA';
import { usePageTitle } from '../hooks/use-page-title';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'AMPVIA',
  url: 'https://ampvia.com',
  logo: 'https://ampvia.com/logo0.png',
  description: 'Leading electrical distribution, architectural lighting, and power solutions provider since 1995.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Cairo',
    addressCountry: 'EG',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+20-127-096-7959',
    contactType: 'sales',
  },
  foundingDate: '1995',
  sameAs: [
    'https://wa.me/+201270967959',
    'https://x.com/Yahyasameeh0',
    'https://www.facebook.com/profile.php?id=61582950262585',
    'https://www.linkedin.com/in/MATRION',
  ],
};

const HomePage = () => {
  usePageTitle('AMPVIA - Electrical Solutions');
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <Categories />
      <About />
      <Products />
      <Destinations />
      <Testimonials />
      <CTA />
    </>
  );
};

export default HomePage;