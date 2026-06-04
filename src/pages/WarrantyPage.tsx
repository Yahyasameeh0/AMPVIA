import { useEffect } from 'react';
import { Shield, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const WarrantyPage = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="pt-32 pb-20">
      <section className="bg-crimson-dark text-white py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Shield className="w-16 h-16 mx-auto mb-6" />
          <h1 className="text-5xl font-bold mb-6">Warranty Information</h1>
          <p className="text-xl text-white/80">Our commitment to quality backed by comprehensive warranty coverage.</p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[['Distribution Panels', '24 Months', 'Full parts and labour warranty'],
              ['Lighting Systems', '36 Months', 'LED driver and fixture warranty'],
              ['Cables & Wiring', '12 Months', 'Manufacturing defects coverage']].map(([prod, period, desc], i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-3xl p-8 text-center shadow-soft">
                <div className="text-4xl font-bold text-crimson mb-2">{period}</div>
                <h3 className="text-xl font-bold text-crimson-dark mb-3">{prod}</h3>
                <p className="text-gray-600">{desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 rounded-3xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-crimson-dark mb-6">What's Covered</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {['Manufacturing defects', 'Component failure under normal use', 'Electrical performance below specification', 'Premature corrosion or material failure', 'Faulty workmanship', 'Non-conformance to stated standards'].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-crimson flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 rounded-3xl p-8">
            <h2 className="text-2xl font-bold text-crimson-dark mb-4">How to Make a Claim</h2>
            <ol className="space-y-3 text-gray-600">
              <li className="flex gap-3"><span className="font-bold text-crimson">1.</span> Contact us with your order number and description of the issue</li>
              <li className="flex gap-3"><span className="font-bold text-crimson">2.</span> Our team will assess the claim within 48 hours</li>
              <li className="flex gap-3"><span className="font-bold text-crimson">3.</span> We'll arrange collection, repair or replacement as appropriate</li>
            </ol>
            <div className="mt-6">
              <Link to="/contact" className="inline-block px-8 py-4 bg-crimson text-white font-semibold rounded-full">Submit a Claim</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default WarrantyPage;
