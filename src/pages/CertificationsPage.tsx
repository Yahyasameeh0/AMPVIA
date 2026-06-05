import { useEffect } from 'react';
import { Award, CircleCheck as CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { usePageTitle } from '../hooks/use-page-title';

const CertificationsPage = () => {
  usePageTitle('Certifications | AMPVIA');
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const certs = [
    { code: 'IEC 61439', product: 'Distribution Panels', body: 'International Electrotechnical Commission', desc: 'Low-voltage switchgear and controlgear assemblies' },
    { code: 'IEC 60502', product: 'Power Cables', body: 'International Electrotechnical Commission', desc: 'Extruded solid dielectric insulated power cables' },
    { code: 'CE Mark', product: 'All Products', body: 'European Conformity', desc: 'Conformity with EU health, safety and environmental requirements' },
    { code: 'RoHS', product: 'Lighting Systems', body: 'EU Directive 2011/65/EU', desc: 'Restriction of hazardous substances in electrical equipment' },
    { code: 'IEC 60331', product: 'Fire Resistant Cables', body: 'International Electrotechnical Commission', desc: 'Tests for electric cables under fire conditions' },
    { code: 'ISO 9001:2015', product: 'Company-wide', body: 'International Organization for Standardization', desc: 'Quality Management System certification' },
  ];

  return (
    <div className="pt-32 pb-20">
      <section className="bg-crimson-dark text-white py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Award className="w-16 h-16 mx-auto mb-6" />
          <h1 className="text-5xl font-bold mb-6">Certifications</h1>
          <p className="text-xl text-white/80">Every product we supply meets rigorous international standards — your assurance of quality and safety.</p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certs.map((c, i) => (
              <div key={i} className="border border-gray-200 rounded-3xl p-8 hover:shadow-lg hover:border-crimson/20 transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-crimson/10 rounded-xl flex items-center justify-center">
                    <Award className="w-6 h-6 text-crimson" />
                  </div>
                  <span className="text-2xl font-bold text-crimson">{c.code}</span>
                </div>
                <h3 className="font-bold text-crimson-dark text-lg mb-1">{c.product}</h3>
                <p className="text-sm text-crimson/70 mb-3">{c.body}</p>
                <p className="text-gray-600 text-sm">{c.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-gray-50 rounded-3xl p-8 flex flex-col md:flex-row items-center gap-8">
            <CheckCircle className="w-16 h-16 text-crimson flex-shrink-0" />
            <div>
              <h3 className="text-2xl font-bold text-crimson-dark mb-2">Request Certificate Copies</h3>
              <p className="text-gray-600 mb-4">All certification documentation is available upon request with your order confirmation.</p>
              <Link to="/contact" className="inline-block px-6 py-3 bg-crimson text-white font-semibold rounded-full">Request Documents</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default CertificationsPage;
