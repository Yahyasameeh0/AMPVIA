import { MessageCircle, Twitter, Facebook, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const footerLinks = {
    company: [
      { name: 'About Us', href: '#about' },
      { name: 'Our Mission', href: '#' },
      { name: 'Careers', href: '#' },
      { name: 'Certifications', href: '#' },
    ],
    products: [
      { name: 'Distribution Panels', href: '#' },
      { name: 'Lighting Solutions', href: '#' },
      { name: 'Cables & Wiring', href: '#' },
      { name: 'Industrial Systems', href: '#' },
    ],
    support: [
      { name: 'Technical Support', href: '#' },
      { name: 'Contact Us', href: '#' },
      { name: 'Documentation', href: '#' },
      { name: 'Warranty Info', href: '#' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' },
      { name: 'Quality Standards', href: '#' },
    ],
  };

  const socialLinks = [
    { 
      icon: MessageCircle, 
      href: 'https://wa.me/+201204470873', 
      label: 'WhatsApp' 
    },
    { 
      icon: Twitter, 
      href: 'https://x.com/Yahyasameeh0', 
      label: 'X (Twitter)' 
    },
    { 
      icon: Facebook, 
      href: 'https://www.facebook.com/profile.php?id=61582950262585', 
      label: 'Facebook' 
    },
    { 
      icon: Linkedin, 
      href: 'https://www.linkedin.com/in/MATRION', 
      label: 'LinkedIn' 
    },
  ];

  return (
    <footer className="bg-crimson-dark text-white/80 pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-white/10">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <a href="#hero" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                {/* تغيير من logo.png إلى logo0.png */}
                <img 
                  src="/logo0.png" 
                  alt="AMPVIA Logo" 
                  className="w-5 h-5 object-contain"
                />
              </div>
              <span className="font-bold text-xl text-white">AMPVIA</span>
            </a>
            <p className="text-white/70 mb-6 max-w-sm leading-relaxed">
              Leading the industry in electrical distribution, architectural lighting, and power solutions. 
              Powering projects with excellence and innovation since 1995.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <a 
                href="mailto:yahyasameeh00001111@gmail.com" 
                className="flex items-center gap-3 text-white/70 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span className="text-sm">yahyasameeh00001111@gmail.com</span>
              </a>
              <a 
                href="tel:+201204470873" 
                className="flex items-center gap-3 text-white/70 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span className="text-sm">+20 120 447 0873</span>
              </a>
              <div className="flex items-center gap-3 text-white/70">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">Cairo, Egypt</span>
              </div>
            </div>
          </div>

          {/* Products Links */}
          <div>
            <h4 className="font-semibold text-white mb-6">Products</h4>
            <ul className="space-y-3">
              {footerLinks.products.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-semibold text-white mb-6">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company & Legal Links */}
          <div>
            <h4 className="font-semibold text-white mb-6">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Copyright */}
          <p className="text-sm text-white/60 text-center md:text-left">
            © {new Date().getFullYear()} AMPVIA. All rights reserved. Developed by <span className="text-white font-medium">MATRION</span>
          </p>

          {/* Social Links */}
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