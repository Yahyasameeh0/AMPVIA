import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { DarkProvider } from './context/DarkContext';
import Navigation from './sections/Navigation';
import Footer from './sections/Footer';
import Cursor from './components/Cursor';
import Loader from './components/Loader';
import ScrollProgress from './components/ScrollProgress';
import CartDrawer from './components/CartDrawer';

import HomePage from './pages/HomePage';
import DistributionPanelsPage from './pages/DistributionPanelsPage';
import LightingSolutionsPage from './pages/LightingSolutionsPage';
import CablesWiringPage from './pages/CablesWiringPage';
import IndustrialSystemsPage from './pages/IndustrialSystemsPage';
import ContactPage from './pages/ContactPage';
import MissionPage from './pages/MissionPage';
import CareersPage from './pages/CareersPage';
import CertificationsPage from './pages/CertificationsPage';
import TechnicalSupportPage from './pages/TechnicalSupportPage';
import DocumentationPage from './pages/DocumentationPage';
import WarrantyPage from './pages/WarrantyPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsPage from './pages/TermsPage';
import QualityStandardsPage from './pages/QualityStandardsPage';

function Inner() {
  const [scrollY, setScrollY] = useState(0);
  const [loaded,  setLoaded]  = useState(false);

  useEffect(() => {
    const h = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  return (
    <>
      <Cursor />
      <ScrollProgress />
      {!loaded && <Loader onDone={() => setLoaded(true)} />}
      <CartDrawer />

      <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white overflow-x-hidden transition-colors duration-300">
        <Navigation scrollY={scrollY} />
        <Routes>
          <Route path="/"                    element={<HomePage />} />
          <Route path="/distribution-panels" element={<DistributionPanelsPage />} />
          <Route path="/lighting-solutions"  element={<LightingSolutionsPage />} />
          <Route path="/cables-wiring"       element={<CablesWiringPage />} />
          <Route path="/industrial-systems"  element={<IndustrialSystemsPage />} />
          <Route path="/mission"             element={<MissionPage />} />
          <Route path="/careers"             element={<CareersPage />} />
          <Route path="/certifications"      element={<CertificationsPage />} />
          <Route path="/technical-support"   element={<TechnicalSupportPage />} />
          <Route path="/contact"             element={<ContactPage />} />
          <Route path="/documentation"       element={<DocumentationPage />} />
          <Route path="/warranty"            element={<WarrantyPage />} />
          <Route path="/privacy-policy"      element={<PrivacyPolicyPage />} />
          <Route path="/terms"               element={<TermsPage />} />
          <Route path="/quality-standards"   element={<QualityStandardsPage />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

function App() {
  return (
    <DarkProvider>
      <CartProvider>
        <Router>
          <Inner />
        </Router>
      </CartProvider>
    </DarkProvider>
  );
}

export default App;
