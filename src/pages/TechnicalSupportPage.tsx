import { useEffect } from 'react';
import { Headphones, FileText, Wrench, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { usePageTitle } from '../hooks/use-page-title';

const TechnicalSupportPage = () => {
  usePageTitle('Technical Support | AMPVIA');
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const faq = [
    { q: 'What is the lead time for distribution panels?', a: 'Standard panels are delivered within 4–6 weeks. Custom configurations may require 8–12 weeks. Contact us for urgent requirements.' },
    { q: 'Do you provide installation services?', a: 'Yes. Our certified installation teams operate across Egypt. Commissioning and testing are included for all major projects.' },
    { q: 'What certifications do your products carry?', a: 'Our products comply with IEC, CE, UL, and Egyptian standards. Full test reports and certificates are provided with every order.' },
    { q: 'Can I get a site assessment before ordering?', a: 'Absolutely. We offer free site assessments for projects above a minimum order value. Contact our sales team to arrange a visit.' },
    { q: 'Do you offer after-sales support?', a: 'Yes. We provide 12-month warranty on all products and ongoing maintenance contracts for installed systems.' },
  ];

  return (
    <div className="pt-32 pb-20">
      <section className="bg-crimson-dark text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <Headphones className="w-16 h-16 mx-auto mb-6" />
          <h1 className="text-5xl font-bold mb-6">Technical Support</h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Expert guidance from our engineering team — from product selection to post-installation troubleshooting.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-20 text-center">
            <div>
              <div className="inline-flex items-center justify-center w-16 h-16 bg-crimson/10 rounded-2xl mb-4">
                <Headphones className="w-8 h-8 text-crimson" />
              </div>
              <h3 className="font-bold text-crimson-dark mb-2">Phone Support</h3>
              <a href="tel:+201270967959" className="text-gray-600 hover:text-crimson text-sm">+20 127 096 7959</a>
            </div>
            <div>
              <div className="inline-flex items-center justify-center w-16 h-16 bg-crimson/10 rounded-2xl mb-4">
                <FileText className="w-8 h-8 text-crimson" />
              </div>
              <h3 className="font-bold text-crimson-dark mb-2">Email Support</h3>
              <a href="mailto:yahyasameeh00001111@gmail.com" className="text-gray-600 hover:text-crimson text-sm break-all">yahyasameeh00001111@gmail.com</a>
            </div>
            <div>
              <div className="inline-flex items-center justify-center w-16 h-16 bg-crimson/10 rounded-2xl mb-4">
                <Wrench className="w-8 h-8 text-crimson" />
              </div>
              <h3 className="font-bold text-crimson-dark mb-2">On-Site Service</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Cairo & surroundings</p>
            </div>
            <div>
              <div className="inline-flex items-center justify-center w-16 h-16 bg-crimson/10 rounded-2xl mb-4">
                <Clock className="w-8 h-8 text-crimson" />
              </div>
              <h3 className="font-bold text-crimson-dark mb-2">Response Time</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Within 24 hours</p>
            </div>
          </div>

          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-crimson-dark mb-10 text-center">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faq.map((item, i) => (
                <details key={i} className="border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden group">
                  <summary className="flex items-center justify-between p-6 font-semibold text-crimson-dark dark:text-white cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
                    {item.q}
                    <span className="ml-4 text-crimson text-2xl leading-none group-open:rotate-45 transition-transform duration-200 inline-block">+</span>
                  </summary>
                  <p className="px-6 pb-6 text-gray-600 dark:text-gray-300">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-crimson-dark text-white text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-4">Still Have Questions?</h2>
          <p className="text-xl text-white/80 mb-8">Our engineers are ready to help.</p>
          <Link to="/contact" className="inline-block px-8 py-4 bg-white text-crimson-dark font-semibold rounded-full">Contact Support</Link>
        </div>
      </section>
    </div>
  );
};
export default TechnicalSupportPage;
