import { useEffect } from 'react';
import { Shield, CheckCircle, Zap } from 'lucide-react';

const QualityStandardsPage = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="pt-32 pb-20">
      <section className="bg-crimson-dark text-white py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Shield className="w-16 h-16 mx-auto mb-6" />
          <h1 className="text-5xl font-bold mb-6">Quality Standards</h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Our quality management system ensures consistent excellence across every product we supply and every project we deliver.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 mb-20">
            <div>
              <h2 className="text-3xl font-bold text-crimson-dark mb-6">Our Quality Policy</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                AMPVIA is committed to delivering electrical products and services that consistently meet or exceed customer expectations and applicable standards.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We operate an ISO 9001:2015 certified Quality Management System across all business functions — from procurement and warehousing to project delivery and after-sales support.
              </p>
            </div>
            <div className="space-y-4">
              {[
                '100% incoming goods inspection',
                'Batch traceability for all cable and panel products',
                'Calibrated test equipment with current certificates',
                'Independent third-party verification on major projects',
                'Non-conformance tracking and corrective action process',
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 bg-gray-50 rounded-xl p-4">
                  <CheckCircle className="w-6 h-6 text-crimson flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-gray-50 rounded-3xl">
              <Shield className="w-12 h-12 text-crimson mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3">Testing</h3>
              <p className="text-gray-600">Every panel is factory tested at full rated voltage before dispatch</p>
            </div>
            <div className="text-center p-8 bg-gray-50 rounded-3xl">
              <CheckCircle className="w-12 h-12 text-crimson mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3">Inspection</h3>
              <p className="text-gray-600">Multi-point inspection checklist on all manufactured products</p>
            </div>
            <div className="text-center p-8 bg-gray-50 rounded-3xl">
              <Zap className="w-12 h-12 text-crimson mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3">Commissioning</h3>
              <p className="text-gray-600">On-site commissioning tests with signed handover documentation</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default QualityStandardsPage;
