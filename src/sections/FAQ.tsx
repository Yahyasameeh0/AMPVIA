import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: 'What products does AMPVIA specialize in?',
    answer: 'AMPVIA specializes in electrical distribution panels, architectural lighting solutions, power cables, and industrial control systems. We provide comprehensive electrical solutions for residential, commercial, and industrial applications.',
  },
  {
    question: 'Do you offer installation services?',
    answer: 'Yes, we provide complete installation services along with our products. Our team of certified engineers ensures proper installation and commissioning of all electrical systems.',
  },
  {
    question: 'What certifications do your products have?',
    answer: 'All our products are certified according to international standards including IEC, CE, UL, and RoHS. We maintain strict quality control processes to ensure compliance.',
  },
  {
    question: 'Do you provide warranty on your products?',
    answer: 'Yes, all AMPVIA products come with a comprehensive warranty. The warranty period varies by product category, typically ranging from 2 to 5 years.',
  },
  {
    question: 'Can you handle large-scale industrial projects?',
    answer: 'Absolutely! We have extensive experience in executing large-scale industrial projects across Egypt and the Middle East, including factories, hospitals, airports, and commercial complexes.',
  },
  {
    question: 'How can I request a quote?',
    answer: 'You can request a quote by contacting us through our contact form, calling our sales team, or visiting our showroom. We provide detailed quotations within 24-48 hours.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 md:py-32 bg-white dark:bg-gray-dark transition-colors">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-crimson/10 text-crimson text-sm font-medium rounded-full mb-4">
            FAQ
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-crimson-dark dark:text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
            Find answers to common questions about our products and services.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <span className="font-semibold text-crimson-dark dark:text-white pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-crimson transition-transform duration-300 flex-shrink-0 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 text-gray-600 dark:text-gray-300 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
