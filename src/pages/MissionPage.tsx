import { useEffect } from 'react';
import { Target, Users, Lightbulb, Award } from 'lucide-react';
import { usePageTitle } from '../hooks/use-page-title';

const MissionPage = () => {
  usePageTitle('Our Mission | AMPVIA');
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-32 pb-20">
      <section className="bg-crimson-dark text-white py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6">Our Mission</h1>
          <p className="text-xl text-white/80">
            Powering progress through innovative electrical solutions that transform infrastructure and empower communities.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 mb-20">
            <div>
              <Target className="w-12 h-12 text-crimson mb-6" />
              <h2 className="text-3xl font-bold mb-6">Mission Statement</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-4">
                To deliver world-class electrical distribution, lighting, and power solutions that exceed international standards 
                while prioritizing safety, sustainability, and customer success.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                We are committed to innovation, quality, and building lasting partnerships with our clients across Egypt and the Middle East.
              </p>
            </div>
            <div>
              <Lightbulb className="w-12 h-12 text-crimson mb-6" />
              <h2 className="text-3xl font-bold mb-6">Vision</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-4">
                To be the leading provider of electrical solutions in the region, recognized for our technical excellence, 
                customer service, and contribution to sustainable infrastructure development.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-gray-50 rounded-3xl">
              <Users className="w-12 h-12 text-crimson mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3">Customer Focus</h3>
              <p className="text-gray-600">Your success drives everything we do</p>
            </div>
            <div className="text-center p-8 bg-gray-50 rounded-3xl">
              <Award className="w-12 h-12 text-crimson mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3">Quality Excellence</h3>
              <p className="text-gray-600">Uncompromising standards in every project</p>
            </div>
            <div className="text-center p-8 bg-gray-50 rounded-3xl">
              <Lightbulb className="w-12 h-12 text-crimson mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3">Innovation</h3>
              <p className="text-gray-600">Embracing new technologies and methods</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MissionPage;
