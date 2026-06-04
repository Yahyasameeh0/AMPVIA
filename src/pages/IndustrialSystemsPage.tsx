import { useEffect } from 'react';
import { Settings, Shield, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const IndustrialSystemsPage = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const systems = [
    { icon: Settings, name: 'Motor Control Centres (MCC)', desc: 'Centralised motor control for pumps, fans, conveyors and process machinery' },
    { icon: Zap, name: 'Variable Speed Drives (VSD)', desc: 'Energy-saving drives for motors from 0.37kW to 2.5MW' },
    { icon: Shield, name: 'Power Factor Correction (PFC)', desc: 'Automatic capacitor banks to reduce reactive power and energy costs' },
    { icon: Settings, name: 'PLC / SCADA Systems', desc: 'Programmable logic controllers and supervisory control for full automation' },
    { icon: Zap, name: 'UPS & Generator Systems', desc: 'Seamless power backup solutions for critical facilities' },
    { icon: Shield, name: 'Earthing & Lightning Protection', desc: 'Comprehensive grounding and surge protection systems' },
  ];

  return (
    <div className="pt-32 pb-20">
      <section className="bg-crimson-dark text-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <span className="inline-block px-4 py-1.5 bg-white/10 text-white text-sm font-medium rounded-full mb-6">Industrial</span>
          <h1 className="text-5xl font-bold mb-6">Industrial Systems</h1>
          <p className="text-xl text-white/80 max-w-3xl">
            End-to-end electrical and automation solutions for factories, utilities, and heavy industry. We design, supply, install, and commission complete industrial power systems.
          </p>
          <div className="flex flex-wrap gap-4 mt-8">
            <Link to="/contact" className="px-8 py-4 bg-white text-crimson-dark font-semibold rounded-full">Discuss Your Project</Link>
            <Link to="/technical-support" className="px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-crimson-dark transition-all">Technical Support</Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-crimson-dark mb-4">Our Industrial Solutions</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {systems.map((s, i) => (
              <div key={i} className="bg-gray-50 rounded-3xl p-8 hover:bg-crimson hover:text-white transition-all duration-300 group">
                <s.icon className="w-10 h-10 text-crimson group-hover:text-white mb-6 transition-colors" />
                <h3 className="text-xl font-bold mb-3 group-hover:text-white">{s.name}</h3>
                <p className="text-gray-600 group-hover:text-white/80">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[['Design', 'Engineering drawings and load calculations'], ['Supply', 'Certified equipment from leading manufacturers'], ['Install', 'Professional installation and cable management'], ['Commission', 'Full testing, commissioning, and handover']].map(([t, d], i) => (
              <div key={i} className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 bg-crimson text-white rounded-full flex items-center justify-center font-bold text-lg">{i + 1}</div>
                <h3 className="font-bold text-lg">{t}</h3>
                <p className="text-gray-600 text-sm">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-crimson-dark text-white text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-4">Ready to Automate?</h2>
          <p className="text-xl text-white/80 mb-8">Our industrial engineers will assess your facility and propose the optimal solution.</p>
          <Link to="/contact" className="inline-block px-8 py-4 bg-white text-crimson-dark font-semibold rounded-full">Request Site Assessment</Link>
        </div>
      </section>
    </div>
  );
};
export default IndustrialSystemsPage;
