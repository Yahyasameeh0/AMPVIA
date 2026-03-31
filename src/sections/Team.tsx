import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Mail, Award } from 'lucide-react';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  image: string;
  linkedin?: string;
  email?: string;
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: 'Ahmed Hassan',
    role: 'CEO & Founder',
    bio: '20+ years of experience in electrical engineering and business leadership.',
    image: '/team-ahmed.jpg',
    linkedin: '#',
    email: 'ahmed@ampvia.com',
  },
  {
    id: 2,
    name: 'Sarah Mahmoud',
    role: 'Chief Technology Officer',
    bio: 'Expert in industrial automation and smart building solutions.',
    image: '/team-sarah.jpg',
    linkedin: '#',
    email: 'sarah@ampvia.com',
  },
  {
    id: 3,
    name: 'Mohamed Ali',
    role: 'Head of Operations',
    bio: 'Specializes in supply chain management and quality assurance.',
    image: '/team-mohamed.jpg',
    linkedin: '#',
    email: 'mohamed@ampvia.com',
  },
  {
    id: 4,
    name: 'Fatima Ibrahim',
    role: 'Design Director',
    bio: 'Award-winning architect focused on sustainable lighting solutions.',
    image: '/team-fatima.jpg',
    linkedin: '#',
    email: 'fatima@ampvia.com',
  },
];

export default function Team() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="team"
      ref={sectionRef}
      className="py-24 md:py-32 bg-gray-light dark:bg-gray-dark transition-colors"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-crimson/10 text-crimson text-sm font-medium rounded-full mb-4">
            Our Team
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-crimson-dark dark:text-white mb-4">
            Meet the Experts
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
            Our dedicated team of professionals brings decades of combined experience 
            to deliver exceptional electrical solutions.
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-soft border border-gray-200 dark:border-gray-700 transition-all duration-500 hover:shadow-xl hover:-translate-y-2">
                {/* Image */}
                <div className="relative aspect-[4/5] overflow-hidden bg-gray-200 dark:bg-gray-700">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Crect fill="%23E0E0E0" width="100" height="100"/%3E%3Ccircle fill="%23640D14" cx="50" cy="35" r="20"/%3E%3Cpath fill="%23640D14" d="M50 60 Q20 60 20 85 L80 85 Q80 60 50 60"/%3E%3C/svg%3E';
                    }}
                  />
                  {/* Overlay on Hover */}
                  <div className="absolute inset-0 bg-crimson/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        className="p-3 bg-white rounded-full text-crimson hover:bg-crimson-light transition-colors"
                        aria-label={`${member.name}'s LinkedIn`}
                      >
                        <Linkedin className="w-5 h-5" />
                      </a>
                    )}
                    {member.email && (
                      <a
                        href={`mailto:${member.email}`}
                        className="p-3 bg-white rounded-full text-crimson hover:bg-crimson-light transition-colors"
                        aria-label={`Email ${member.name}`}
                      >
                        <Mail className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Award className="w-4 h-4 text-crimson" />
                    <span className="text-xs font-medium text-crimson uppercase tracking-wide">
                      {member.role}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-crimson-dark dark:text-white mb-2">
                    {member.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
