import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookOpen, Video, Users } from 'lucide-react';

const Home = () => {
  return (
    <div className="text-center">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold mb-6"
      >
        Welcome to EduPulse
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-xl mb-8"
      >
        Empowering education through interactive learning experiences
      </motion.p>
      <div className="grid md:grid-cols-3 gap-8 mb-12">
        {[
          { icon: BookOpen, title: 'Comprehensive Courses', description: 'Access a wide range of subjects' },
          { icon: Video, title: 'Live & Recorded Classes', description: 'Learn at your own pace' },
          { icon: Users, title: 'Interactive Community', description: 'Engage with peers and instructors' },
        ].map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <feature.icon className="h-12 w-12 mx-auto mb-4 text-blue-500" />
            <h2 className="text-xl font-semibold mb-2">{feature.title}</h2>
            <p>{feature.description}</p>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <Link
          to="/login"
          className="bg-blue-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-600 transition-colors"
        >
          Get Started
        </Link>
      </motion.div>
    </div>
  );
};

export default Home;