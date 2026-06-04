import { useEffect } from 'react';

const TermsPage = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="pt-32 pb-20">
      <section className="bg-crimson-dark text-white py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6">Terms of Service</h1>
          <p className="text-xl text-white/80">Last updated: February 2024</p>
        </div>
      </section>
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-6 space-y-10 text-gray-700 leading-relaxed">
          {[
            ['1. Acceptance of Terms', 'By using AMPVIA\'s services or purchasing our products, you agree to these terms and conditions in full.'],
            ['2. Products & Pricing', 'All prices are quoted in USD and are subject to change without notice. Confirmed orders are binding once a purchase order is accepted in writing.'],
            ['3. Delivery', 'Delivery timelines are estimates. AMPVIA is not liable for delays caused by logistics providers or force majeure events.'],
            ['4. Payment Terms', 'Standard payment terms are 50% deposit upon order confirmation and 50% prior to shipment unless otherwise agreed in writing.'],
            ['5. Returns & Cancellations', 'Custom-manufactured products cannot be returned or cancelled once production has commenced. Standard stock items may be returned within 14 days in original condition.'],
            ['6. Limitation of Liability', 'AMPVIA\'s total liability shall not exceed the value of the goods supplied. We are not liable for indirect or consequential losses.'],
            ['7. Governing Law', 'These terms are governed by the laws of the Arab Republic of Egypt.'],
          ].map(([title, text]) => (
            <div key={title}>
              <h2 className="text-2xl font-bold text-crimson-dark mb-3">{title}</h2>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
export default TermsPage;
