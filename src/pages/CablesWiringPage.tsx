import { useEffect } from 'react';
import { Zap, CircleCheck as CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { usePageTitle } from '../hooks/use-page-title';

const CablesWiringPage = () => {
  usePageTitle('Cables & Wiring | AMPVIA');
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const products = [
    { name: 'Low Voltage Power Cables', standard: 'IEC 60502-1', range: '1kV', description: 'PVC/XLPE insulated cables for residential and commercial use' },
    { name: 'Medium Voltage Cables', standard: 'IEC 60502-2', range: '6-36kV', description: 'XLPE insulated cables for industrial and utility networks' },
    { name: 'Armoured Cables (SWA)', standard: 'BS 6346', range: '1kV', description: 'Steel wire armoured cables for underground and outdoor runs' },
    { name: 'Fire Resistant Cables', standard: 'IEC 60331', range: '1kV', description: 'Circuit integrity cables for emergency systems' },
    { name: 'Control & Instrumentation', standard: 'IEC 60227', range: '0.6/1kV', description: 'Multi-core cables for automation and signalling' },
    { name: 'Solar DC Cables', standard: 'TÜV 2PfG 1169', range: '1.8kV DC', description: 'UV-resistant cables for photovoltaic installations' },
  ];

  return (
    <div className="pt-32 pb-20">
      <section className="bg-crimson-dark text-white py-20">
        <div className="absolute inset-0 pointer-events-none opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        <div className="max-w-7xl mx-auto px-6 relative">
          <span className="inline-block px-4 py-1.5 bg-white/10 text-white text-sm font-medium rounded-full mb-6">Electrical Products</span>
          <h1 className="text-5xl font-bold mb-6">Cables & Wiring</h1>
          <p className="text-xl text-white/80 max-w-3xl">
            High-performance power and control cables for every application. From low-voltage domestic wiring to medium-voltage industrial networks — all certified to international standards.
          </p>
          <div className="flex flex-wrap gap-4 mt-8">
            <Link to="/contact" className="px-8 py-4 bg-white text-crimson-dark font-semibold rounded-full hover:bg-white/90 transition-all">Request Quote</Link>
            <Link to="/documentation" className="px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-crimson-dark transition-all">Download Specs</Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-crimson-dark mb-4">Product Range</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">All cables supplied with full certification documentation and test reports.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((p, i) => (
              <div key={i} className="border border-gray-200 rounded-3xl p-8 hover:shadow-lg hover:border-crimson/30 transition-all duration-300 group">
                <div className="w-12 h-12 bg-crimson/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-crimson transition-all">
                  <Zap className="w-6 h-6 text-crimson group-hover:text-white" />
                </div>
                <h3 className="text-xl font-bold text-crimson-dark mb-2">{p.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{p.description}</p>
                <div className="flex gap-4 text-sm">
                  <span className="bg-crimson/10 text-crimson px-3 py-1 rounded-full font-medium">{p.standard}</span>
                  <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full">{p.range}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[['IEC Certified', 'All products comply with IEC, BS, and EU standards'], ['Custom Cut', 'Supply in any length from 1m to full drum quantities'], ['Fast Delivery', 'Cairo warehouse stock for immediate local dispatch']].map(([t, d], i) => (
              <div key={i} className="flex flex-col items-center gap-4">
                <CheckCircle className="w-12 h-12 text-crimson" />
                <h3 className="text-xl font-bold">{t}</h3>
                <p className="text-gray-600">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-crimson-dark text-white text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-4">Need a Cable Schedule?</h2>
          <p className="text-xl text-white/80 mb-8">Send us your load schedule and we'll recommend the right cable specification.</p>
          <Link to="/contact" className="inline-block px-8 py-4 bg-white text-crimson-dark font-semibold rounded-full">Get Cable Schedule</Link>
        </div>
      </section>
    </div>
  );
};
export default CablesWiringPage;
