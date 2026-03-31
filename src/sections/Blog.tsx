import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, Clock } from 'lucide-react';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'The Future of Smart Lighting in Commercial Buildings',
    excerpt: 'Discover how IoT and AI are revolutionizing lighting systems in modern commercial spaces.',
    date: 'March 15, 2025',
    readTime: '5 min read',
    category: 'Technology',
    image: '/blog-smart-lighting.jpg',
  },
  {
    id: 2,
    title: 'Energy Efficiency: Best Practices for Industrial Facilities',
    excerpt: 'Learn proven strategies to reduce energy consumption and costs in your industrial operations.',
    date: 'March 10, 2025',
    readTime: '7 min read',
    category: 'Sustainability',
    image: '/blog-energy.jpg',
  },
  {
    id: 3,
    title: 'Understanding Electrical Safety Standards in 2025',
    excerpt: 'A comprehensive guide to the latest electrical safety regulations and compliance requirements.',
    date: 'March 5, 2025',
    readTime: '6 min read',
    category: 'Safety',
    image: '/blog-safety.jpg',
  },
];

export default function Blog() {
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
      id="blog"
      ref={sectionRef}
      className="py-24 md:py-32 bg-gray-light dark:bg-gray-dark transition-colors"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-16"
        >
          <div>
            <span className="inline-block px-4 py-1.5 bg-crimson/10 text-crimson text-sm font-medium rounded-full mb-4">
              Latest Insights
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-crimson-dark dark:text-white">
              From Our Blog
            </h2>
          </div>
          <a
            href="#"
            className="mt-4 md:mt-0 inline-flex items-center gap-2 text-crimson font-medium hover:gap-3 transition-all duration-300"
          >
            View all posts
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-soft border border-gray-200 dark:border-gray-700 transition-all duration-500 hover:shadow-xl hover:-translate-y-2"
            >
              {/* Image */}
              <div className="relative aspect-[16/10] overflow-hidden bg-gray-200 dark:bg-gray-700">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 60"%3E%3Crect fill="%23E0E0E0" width="100" height="60"/%3E%3Crect fill="%23640D14" x="10" y="10" width="30" height="40"/%3E%3Crect fill="%23640D14" x="50" y="10" width="40" height="20"/%3E%3Crect fill="%23640D14" x="50" y="35" width="40" height="15"/%3E%3C/svg%3E';
                  }}
                />
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-crimson text-white text-xs font-semibold rounded-full">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Meta Info */}
                <div className="flex items-center gap-4 mb-4 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                {/* Title & Excerpt */}
                <h3 className="text-xl font-bold text-crimson-dark dark:text-white mb-3 line-clamp-2 group-hover:text-crimson transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>

                {/* Read More Link */}
                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-crimson font-semibold hover:gap-3 transition-all duration-300"
                >
                  Read Article
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
