import React from 'react';
import { motion } from 'framer-motion';

const benefits = [
  {
    title: 'Real-World Wisdom',
    description:
      'Life lessons come from real experiences, making them practical, relatable, and deeply meaningful.',
    icon: '🌱',
  },
  {
    title: 'Personal Growth',
    description:
      'Learning from mistakes and successes helps build resilience, confidence, and self-awareness.',
    icon: '🧠',
  },
  {
    title: 'Better Decision Making',
    description:
      'Past experiences guide future choices, helping you avoid repeated mistakes and act wisely.',
    icon: '🧭',
  },
  {
    title: 'Shared Human Connection',
    description:
      'Stories and lessons connect people, reminding us we’re not alone in our struggles.',
    icon: '🤝',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

const WhyLifeMatters = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Why Learning From Life Matters
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Life itself is the greatest teacher. Every experience—good or bad—
            carries a lesson that helps shape who we become.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {benefits.map((item, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -6, scale: 1.02 }}
              className="p-6 rounded-2xl border border-gray-200 bg-white shadow-sm cursor-default"
            >
              <div className="text-4xl mb-4">{item.icon}</div>

              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {item.title}
              </h3>

              <p className="text-gray-600 text-sm">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyLifeMatters;
