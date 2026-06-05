import { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { DarkProvider } from './context/DarkContext';
import { AdminAuthProvider } from './context/AdminAuthContext';
import { ToastProvider } from './context/ToastContext';
import Navigation from './sections/Navigation';
import Footer from './sections/Footer';
import Cursor from './components/Cursor';
import Loader from './components/Loader';
import ScrollProgress from './components/ScrollProgress';
import CartDrawer from './components/CartDrawer';
import FloatingButtons from './components/FloatingButtons';
import NotFoundPage from './pages/NotFoundPage';
import AdminLayout from './pages/admin/AdminLayout';
import AdminLoginPage from './pages/AdminLoginPage';

const HomePage               = lazy(() => import('./pages/HomePage'));
const DistributionPanelsPage = lazy(() => import('./pages/DistributionPanelsPage'));
const LightingSolutionsPage   = lazy(() => import('./pages/LightingSolutionsPage'));
const CablesWiringPage        = lazy(() => import('./pages/CablesWiringPage'));
const IndustrialSystemsPage   = lazy(() => import('./pages/IndustrialSystemsPage'));
const ContactPage             = lazy(() => import('./pages/ContactPage'));
const MissionPage             = lazy(() => import('./pages/MissionPage'));
const CareersPage             = lazy(() => import('./pages/CareersPage'));
const CertificationsPage      = lazy(() => import('./pages/CertificationsPage'));
const TechnicalSupportPage    = lazy(() => import('./pages/TechnicalSupportPage'));
const DocumentationPage       = lazy(() => import('./pages/DocumentationPage'));
const WarrantyPage            = lazy(() => import('./pages/WarrantyPage'));
const PrivacyPolicyPage      = lazy(() => import('./pages/PrivacyPolicyPage'));
const TermsPage               = lazy(() => import('./pages/TermsPage'));
const QualityStandardsPage   = lazy(() => import('./pages/QualityStandardsPage'));

const AdminDashboard         = lazy(() => import('./pages/admin/AdminDashboard'));
const AdminQuotes            = lazy(() => import('./pages/admin/AdminQuotes'));
const AdminProducts          = lazy(() => import('./pages/admin/AdminProducts'));
const AdminProjects          = lazy(() => import('./pages/admin/AdminProjects'));

const PageLoader = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-crimson border-t-transparent rounded-full animate-spin" />
  </div>
);

const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  return (
    <div key={location.pathname} className="page-transition">
      {children}
    </div>
  );
};

function Inner() {
  const [scrollY, setScrollY] = useState(0);
  const [loaded,  setLoaded]  = useState(false);

  useEffect(() => {
    let rafId: number;
    let lastScrollY = 0;
    const h = () => {
      lastScrollY = window.scrollY;
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => setScrollY(lastScrollY));
    };
    window.addEventListener('scroll', h, { passive: true });
    return () => {
      window.removeEventListener('scroll', h);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-crimson focus:text-white focus:rounded-lg focus:text-sm focus:font-semibold">
        Skip to main content
      </a>
      <Cursor />
      <ScrollProgress />
      {!loaded && <Loader onDone={() => setLoaded(true)} />}
      <CartDrawer />
      <FloatingButtons />

      <div id="main-content" className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white overflow-x-hidden transition-colors duration-300">
        <Navigation scrollY={scrollY} />
        <PageTransition>
          <Suspense fallback={<PageLoader />}>
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

              {/* Admin routes - separate layout */}
              <Route path="/admin/login" element={<AdminLoginPage />} />
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="quotes" element={<AdminQuotes />} />
                <Route path="products" element={<AdminProducts />} />
                <Route path="projects" element={<AdminProjects />} />
              </Route>

              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </PageTransition>
        <Footer />
      </div>
    </>
  );
}

function App() {
  return (
    <DarkProvider>
      <CartProvider>
        <AdminAuthProvider>
          <ToastProvider>
            <Router>
              <Inner />
            </Router>
          </ToastProvider>
        </AdminAuthProvider>
      </CartProvider>
    </DarkProvider>
  );
}

export default App;
