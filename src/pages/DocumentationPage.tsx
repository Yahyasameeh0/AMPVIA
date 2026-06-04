import { useEffect } from 'react';
import { FileText, Download } from 'lucide-react';
import { Link } from 'react-router-dom';

const DocumentationPage = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const docs = [
    { category: 'Distribution Panels', items: ['MDB Technical Specifications', 'SDB Installation Manual', 'Panel Wiring Diagrams', 'IEC 61439 Compliance Certificate'] },
    { category: 'Lighting Solutions', items: ['LED Fixture Datasheets', 'Lighting Design Guide', 'Energy Savings Calculator', 'CE & RoHS Certificates'] },
    { category: 'Cables & Wiring', items: ['Cable Selection Guide', 'Installation Standards', 'Current Rating Tables', 'IEC 60502 Test Reports'] },
    { category: 'Industrial Systems', items: ['MCC Wiring Diagrams', 'VSD Configuration Manual', 'PFC Sizing Guide', 'UPS Installation Guide'] },
  ];

  return (
    <div className="pt-32 pb-20">
      <section className="bg-crimson-dark text-white py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <FileText className="w-16 h-16 mx-auto mb-6" />
          <h1 className="text-5xl font-bold mb-6">Documentation</h1>
          <p className="text-xl text-white/80">Technical datasheets, installation manuals, and compliance certificates for all AMPVIA products.</p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8">
            {docs.map((cat, i) => (
              <div key={i} className="border border-gray-200 rounded-3xl p-8">
                <h2 className="text-2xl font-bold text-crimson-dark mb-6">{cat.category}</h2>
                <ul className="space-y-3">
                  {cat.items.map((item, j) => (
                    <li key={j} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-crimson flex-shrink-0" />
                        <span className="text-gray-700">{item}</span>
                      </div>
                      <Link to="/contact" className="flex items-center gap-1 text-crimson text-sm font-medium hover:underline">
                        <Download className="w-4 h-4" /> Request
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-crimson/5 border border-crimson/20 rounded-3xl p-8 text-center">
            <h3 className="text-xl font-bold text-crimson-dark mb-3">Can't find what you need?</h3>
            <p className="text-gray-600 mb-6">Request specific documentation or custom technical drawings from our engineering team.</p>
            <Link to="/contact" className="inline-block px-8 py-4 bg-crimson text-white font-semibold rounded-full">Request Document</Link>
          </div>
        </div>
      </section>
    </div>
  );
};
export default DocumentationPage;
