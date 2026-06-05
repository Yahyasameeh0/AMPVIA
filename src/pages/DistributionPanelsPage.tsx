import { useEffect } from 'react';
import { Shield, Award, Zap, CircleCheck as CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { usePageTitle } from '../hooks/use-page-title';

const DistributionPanelsPage = () => {
  usePageTitle('Distribution Panels | AMPVIA');
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const features = [
    {
      icon: Shield,
      title: 'IEC 61439 Certified',
      description: 'Full compliance with international standards for low-voltage switchgear',
    },
    {
      icon: Award,
      title: 'Premium Quality',
      description: 'Built with copper busbars and industrial-grade components',
    },
    {
      icon: Zap,
      title: 'High Performance',
      description: 'Rated for demanding industrial and commercial applications',
    },
    {
      icon: CheckCircle,
      title: 'Custom Solutions',
      description: 'Tailored configurations to match your specific requirements',
    },
  ];

  const { add } = useCart();
  const products = [
    {
      name: 'Main Distribution Board (MDB)',
      capacity: 'Up to 4000A',
      voltage: '400V AC, 50Hz',
      price: 'From $2,500',
      features: ['IP54 Protection', 'Modular Design', 'MCB/MCCB Integration', 'Emergency Shutoff'],
    },
    {
      name: 'Sub-Distribution Board (SDB)',
      capacity: 'Up to 630A',
      voltage: '400V AC, 50Hz',
      price: 'From $1,200',
      features: ['Compact Design', 'DIN Rail Mounting', 'Clear Labeling', 'Easy Maintenance'],
    },
    {
      name: 'Floor Standing Panel',
      capacity: 'Up to 6300A',
      voltage: '400V AC, 50Hz',
      price: 'Custom Quote',
      features: ['Heavy Duty', 'Multi-Section', 'Busbar System', 'Metering Ready'],
    },
  ];

  return (
    <div className="pt-32 pb-20">
      {/* Hero Section */}
      <section className="relative bg-crimson-dark text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }} />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1.5 bg-white/10 text-white text-sm font-medium rounded-full mb-6">
              Electrical Products
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Distribution Panels
            </h1>
            <p className="text-xl text-white/80 mb-8">
              Industrial-grade electrical distribution solutions engineered for safety, reliability, and performance. 
              From main distribution boards to custom panels, we power your infrastructure with excellence.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/contact"
                className="px-8 py-4 bg-white text-crimson-dark font-semibold rounded-full hover:bg-white/90 transition-all duration-300"
              >
                Request Quote
              </Link>
              <Link 
                to="/technical-support"
                className="px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-crimson-dark transition-all duration-300"
              >
                Technical Specs
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-crimson-dark dark:text-white mb-4">
              Why Choose Our Distribution Panels?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Engineered for excellence with international certifications and proven reliability in thousands of installations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-crimson/10 rounded-2xl mb-6 group-hover:bg-crimson group-hover:text-white transition-all duration-300">
                  <feature.icon className="w-8 h-8 text-crimson group-hover:text-white" />
                </div>
                <h3 className="text-xl font-bold text-crimson-dark dark:text-white mb-3">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-crimson-dark dark:text-white mb-4">
              Our Product Range
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              From residential buildings to industrial facilities, we offer the right solution for every application.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-soft hover:shadow-card transition-all duration-300">
                <h3 className="text-2xl font-bold text-crimson-dark dark:text-white mb-4">{product.name}</h3>
                <div className="space-y-2 mb-6">
                  <p className="text-gray-600 dark:text-gray-300"><span className="font-semibold">Capacity:</span> {product.capacity}</p>
                  <p className="text-gray-600 dark:text-gray-300"><span className="font-semibold">Voltage:</span> {product.voltage}</p>
                  <p className="text-2xl font-bold text-crimson mt-4">{product.price}</p>
                </div>
                <ul className="space-y-3 mb-8">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                      <CheckCircle className="w-5 h-5 text-crimson flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  data-hover
                  onClick={() => add({ id: `panel-${index}`, name: product.name, category: 'Distribution Panels', image: '/product-mdb.jpg', href: '/distribution-panels' })}
                  className="block w-full text-center px-6 py-3 bg-crimson text-white font-semibold rounded-full hover:bg-crimson-dark transition-all duration-300"
                >
                  Add to Quote
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-crimson-dark text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Need a Custom Distribution Solution?
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Our engineering team can design and manufacture panels tailored to your exact specifications.
          </p>
          <Link 
            to="/contact"
            className="inline-block px-8 py-4 bg-white text-crimson-dark font-semibold rounded-full hover:bg-white/90 transition-all duration-300"
          >
            Discuss Your Project
          </Link>
        </div>
      </section>
    </div>
  );
};

export default DistributionPanelsPage;
// Note: to add "Add to Quote" button on any page, import and use:
// import { useCart } from '../context/CartContext';
// const { add } = useCart();
// <button onClick={() => add({ id:'panel-mdb', name:'Main Distribution Board', category:'Distribution Panels', image:'/product-mdb.jpg', href:'/distribution-panels' })}>
//   Add to Quote
// </button>
