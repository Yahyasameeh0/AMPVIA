import { useEffect } from 'react';
import { Shield } from 'lucide-react';

const PrivacyPolicyPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-32 pb-20">
      <section className="bg-crimson-dark text-white py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Shield className="w-16 h-16 mx-auto mb-6" />
          <h1 className="text-5xl font-bold mb-6">Privacy Policy</h1>
          <p className="text-xl text-white/80">Last updated: February 2024</p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 prose prose-lg">
          <h2>1. Information We Collect</h2>
          <p>We collect information you provide directly to us when you request quotes, contact us, or use our services.</p>

          <h2>2. How We Use Your Information</h2>
          <p>We use your information to provide services, respond to inquiries, and improve our offerings.</p>

          <h2>3. Data Security</h2>
          <p>We implement industry-standard security measures to protect your personal information.</p>

          <h2>4. Contact Us</h2>
          <p>For privacy-related questions, contact us at yahyasameeh00001111@gmail.com</p>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicyPage;
