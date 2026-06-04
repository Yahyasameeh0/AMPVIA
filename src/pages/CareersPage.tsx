import { useEffect } from 'react';
import { Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';

const CareersPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-32 pb-20">
      <section className="bg-crimson-dark text-white py-20 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <Briefcase className="w-16 h-16 mx-auto mb-6" />
          <h1 className="text-5xl font-bold mb-6">Careers at AMPVIA</h1>
          <p className="text-xl text-white/80">
            Join our team of electrical engineering professionals and help power the future.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8">Why Work With Us?</h2>
          <ul className="space-y-4 text-lg text-gray-600 mb-12">
            <li>• Competitive salaries and benefits</li>
            <li>• Professional development opportunities</li>
            <li>• Work on cutting-edge projects</li>
            <li>• Collaborative work environment</li>
          </ul>

          <div className="bg-gray-50 p-8 rounded-3xl">
            <h3 className="text-2xl font-bold mb-4">Open Positions</h3>
            <p className="text-gray-600 mb-6">We're currently reviewing applications for:</p>
            <ul className="space-y-3 mb-8">
              <li className="p-4 bg-white rounded-xl">Electrical Engineer - Distribution Systems</li>
              <li className="p-4 bg-white rounded-xl">Lighting Design Specialist</li>
              <li className="p-4 bg-white rounded-xl">Project Manager - Industrial</li>
            </ul>
            <Link to="/contact" className="inline-block px-8 py-4 bg-crimson text-white font-semibold rounded-full">
              Apply Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CareersPage;
