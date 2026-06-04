import { MessageCircle, Twitter, Facebook, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const footerLinks = {
    company: [
      { name: 'About Us', href: '/#about', internal: false },
      { name: 'Our Mission', href: '/mission', internal: true },
      { name: 'Careers', href: '/careers', internal: true },
      { name: 'Certifications', href: '/certifications', internal: true },
    ],
    products: [
      { name: 'Distribution Panels', href: '/distribution-panels', internal: true },
      { name: 'Lighting Solutions', href: '/lighting-solutions', internal: true },
      { name: 'Cables & Wiring', href: '/cables-wiring', internal: true },
      { name: 'Industrial Systems', href: '/industrial-systems', internal: true },
    ],
    support: [
      { name: 'Technical Support', href: '/technical-support', internal: true },
      { name: 'Contact Us', href: '/contact', internal: true },
      { name: 'Documentation', href: '/documentation', internal: true },
      { name: 'Warranty Info', href: '/warranty', internal: true },
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy-policy', internal: true },
      { name: 'Terms of Service', href: '/terms', internal: true },
      { name: 'Quality Standards', href: '/quality-standards', internal: true },
    ],
  };

  const socialLinks = [
    { icon: MessageCircle, href: 'https://wa.me/+201270967959', label: 'WhatsApp' },
    { icon: Twitter, href: 'https://x.com/Yahyasameeh0', label: 'X (Twitter)' },
    { icon: Facebook, href: 'https://www.facebook.com/profile.php?id=61582950262585', label: 'Facebook' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/MATRION', label: 'LinkedIn' },
  ];

  const renderLink = (link: { name: string; href: string; internal: boolean }) =>
    link.internal ? (
      <Link to={link.href} className="text-sm text-white/70 hover:text-white transition-colors">
        {link.name}
      </Link>
    ) : (
      <a href={link.href} className="text-sm text-white/70 hover:text-white transition-colors">
        {link.name}
      </a>
    );

  return (
    <footer className="bg-crimson-dark text-white/80 pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 pb-16 border-b border-white/10">

          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <img src="/logo0.png" alt="AMPVIA Logo" className="w-5 h-5 object-contain" />
              </div>
              <span className="font-bold text-xl text-white">AMPVIA</span>
            </Link>
            <p className="text-white/70 mb-6 max-w-sm leading-relaxed">
              Leading the industry in electrical distribution, architectural lighting, and power solutions.
              Powering projects with excellence and innovation since 1995.
            </p>
            <div className="space-y-3">
              <a href="mailto:yahyasameeh00001111@gmail.com" className="flex items-center gap-3 text-white/70 hover:text-white transition-colors">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm">yahyasameeh00001111@gmail.com</span>
              </a>
              <a href="tel:+201270967959" className="flex items-center gap-3 text-white/70 hover:text-white transition-colors">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm">+20 127 096 7959</span>
              </a>
              <div className="flex items-center gap-3 text-white/70">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm">Cairo, Egypt</span>
              </div>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-semibold text-white mb-6">Products</h4>
            <ul className="space-y-3">
              {footerLinks.products.map((link) => (
                <li key={link.name}>{renderLink(link)}</li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-white mb-6">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>{renderLink(link)}</li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-white mb-6">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>{renderLink(link)}</li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-white mb-6">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>{renderLink(link)}</li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-sm text-white/60 text-center md:text-left">
            © {new Date().getFullYear()} AMPVIA. All rights reserved. Developed by{' '}
            <span className="text-white font-medium">MATRION</span>
          </p>
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-white hover:text-crimson-dark transition-all duration-300"
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
