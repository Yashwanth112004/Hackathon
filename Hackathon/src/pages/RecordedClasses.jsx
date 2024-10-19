import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Clock, BookOpen, ExternalLink } from 'lucide-react';

const RecordedClasses = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'React', 'JavaScript', 'CSS', 'Node.js'];

  const classes = [
    { id: 1, title: 'Introduction to React Hooks', duration: '1h 30m', category: 'React', thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', youtubeLink: 'https://www.youtube.com/watch?v=dpw9EHDh2bM' },
    { id: 2, title: 'JavaScript Tutorial from basic', duration: '2h 15m', category: 'JavaScript', thumbnail: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', youtubeLink: 'https://www.youtube.com/watch?v=ER9SspLe4Hg&list=PLu0W_9lII9ahR1blWXxgSlL4y9iQBnLpR' },
    { id: 3, title: 'CSS Grid and Flexbox Mastery', duration: '1h 45m', category: 'CSS', thumbnail: 'https://images.unsplash.com/photo-1523437113738-bbd3cc89fb19?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', youtubeLink: 'https://www.youtube.com/watch?v=tXIhdp5R7sc' },
    { id: 4, title: 'Node.js REST API Development', duration: '2h 30m', category: 'Node.js', thumbnail: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', youtubeLink: 'https://www.youtube.com/watch?v=fgTGADljAeg' },
    { id: 5, title: 'React Performance Optimization', duration: '1h 50m', category: 'React', thumbnail: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', youtubeLink: 'https://www.youtube.com/watch?v=5fLW5Q5ODiE' },
    { id: 6, title: 'JavaScript Testing with Jest', duration: '1h 40m', category: 'JavaScript', thumbnail: 'https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', youtubeLink: 'https://www.youtube.com/watch?v=7r4xVDI2vho' },
  ];

  const filteredClasses = selectedCategory === 'All'
    ? classes
    : classes.filter(cls => cls.category === selectedCategory);

  return (
    <div className="max-w-6xl mx-auto">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold mb-8"
      >
        Recorded Classes
      </motion.h1>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-8"
      >
        <h2 className="text-xl font-semibold mb-4">Categories</h2>
        <div className="flex flex-wrap gap-4">
          {categories.map((category, index) => (
            <motion.button
              key={index}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full ${
                selectedCategory === category
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              } transition-colors`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </div>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredClasses.map((cls, index) => (
          <motion.div
            key={cls.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <img src={cls.thumbnail} alt={cls.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{cls.title}</h3>
              <div className="flex items-center text-gray-600 mb-4">
                <Clock className="mr-2 h-4 w-4" />
                <span>{cls.duration}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                  {cls.category}
                </span>
                <motion.a
                  href={cls.youtubeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-blue-500 hover:text-blue-600"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Play className="mr-1 h-4 w-4" />
                  Watch Now
                  <ExternalLink size={14} className="ml-1" />
                </motion.a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RecordedClasses;