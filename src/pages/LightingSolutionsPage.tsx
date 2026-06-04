import { useEffect } from 'react';
import { Lightbulb, Award, Zap, Leaf } from 'lucide-react';
import { Link } from 'react-router-dom';

const LightingSolutionsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const features = [
    {
      icon: Lightbulb,
      title: 'LED Technology',
      description: 'Energy-efficient LED systems with up to 80% power savings',
    },
    {
      icon: Award,
      title: 'Architectural Grade',
      description: 'Premium fixtures designed for aesthetic and functional excellence',
    },
    {
      icon: Zap,
      title: 'Smart Control',
      description: 'Integrated dimming and automation systems',
    },
    {
      icon: Leaf,
      title: 'Eco-Friendly',
      description: 'Sustainable lighting solutions with minimal environmental impact',
    },
  ];

  return (
    <div className="pt-32 pb-20">
      {/* Hero */}
      <section className="relative bg-crimson-dark text-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-5xl font-bold mb-6">Lighting Solutions</h1>
          <p className="text-xl text-white/80 max-w-3xl">
            Transform your spaces with cutting-edge LED architectural lighting. From façades to interiors, 
            we deliver energy-efficient illumination that combines beauty with performance.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-crimson/10 rounded-2xl mb-6">
                  <feature.icon className="w-8 h-8 text-crimson" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">Product Categories</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl">
              <h3 className="text-2xl font-bold mb-4">Facade Lighting</h3>
              <p className="text-gray-600 mb-6">Dynamic RGB and white LED systems for architectural exteriors</p>
              <Link to="/contact" className="text-crimson font-semibold">Get Quote →</Link>
            </div>
            <div className="bg-white p-8 rounded-3xl">
              <h3 className="text-2xl font-bold mb-4">Interior Lighting</h3>
              <p className="text-gray-600 mb-6">Recessed, surface, and suspended LED fixtures for commercial spaces</p>
              <Link to="/contact" className="text-crimson font-semibold">Get Quote →</Link>
            </div>
            <div className="bg-white p-8 rounded-3xl">
              <h3 className="text-2xl font-bold mb-4">Outdoor Lighting</h3>
              <p className="text-gray-600 mb-6">Weather-resistant LED bollards, poles, and floodlights</p>
              <Link to="/contact" className="text-crimson font-semibold">Get Quote →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-crimson-dark text-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-6">Illuminate Your Vision</h2>
          <p className="text-xl mb-8">Contact our lighting specialists for a custom proposal.</p>
          <Link to="/contact" className="inline-block px-8 py-4 bg-white text-crimson-dark font-semibold rounded-full">
            Start Your Project
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LightingSolutionsPage;
