import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';

const Navbar = () => {
  return (
    <motion.nav
      initial={{ y: -50 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-blue-600 text-white shadow-lg"
    >
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <BookOpen className="h-8 w-8" />
          <span className="text-2xl font-bold">EduPulse</span>
        </Link>
        <div className="space-x-4">
          <Link to="/login" className="hover:text-blue-200 transition-colors" >Login</Link>
          <Link to="/dashboard" className="hover:text-blue-200 transition-colors">Dashboard</Link>
          <Link to="/live-class" className="hover:text-blue-200 transition-colors">Live Class</Link>
          <Link to="/recorded-classes" className="hover:text-blue-200 transition-colors">Recorded Classes</Link>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;