import React from 'react';
import { motion } from 'framer-motion';
import { Book, Video, Calendar, Award, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const courses = [
    { id: 1, name: 'Introduction to React', progress: 60, image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' },
    { id: 2, name: 'Advanced JavaScript', progress: 30, image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' },
    { id: 3, name: 'Web Design Fundamentals', progress: 100, image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' },
  ];

  const upcomingClasses = [
    { id: 1, name: 'React Hooks Deep Dive', time: '2:00 PM', date: 'Mar 15, 2024', link: 'https://meet.google.com/abc-defg-hij' },
    { id: 2, name: 'Building RESTful APIs', time: '10:00 AM', date: 'Mar 17, 2024', link: 'https://meet.google.com/klm-nopq-rst' },
  ];

  const recentRecordedClasses = [
    { id: 1, title: 'Advanced React Patterns', duration: '1h 30m', image: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', youtubeLink: 'https://www.youtube.com/watch?v=0sSYmRImgRY' },
    { id: 2, title: 'CSS Animation Techniques', duration: '1h 15m', image: 'https://images.unsplash.com/photo-1523437113738-bbd3cc89fb19?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', youtubeLink: 'https://www.youtube.com/watch?v=jgw82b5Y2MU' },
    { id: 3, title: 'Node.js Performance Tuning', duration: '1h 45m', image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', youtubeLink: 'https://www.youtube.com/watch?v=9na-PpGC18I' },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold mb-8"
      >
        Student Dashboard
      </motion.h1>
      <div className="grid md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Book className="mr-2" /> My Courses
          </h2>
          <ul className="space-y-4">
            {courses.map((course) => (
              <motion.li
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center space-x-4"
              >
                <img src={course.image} alt={course.name} className="w-16 h-16 object-cover rounded" />
                <div className="flex-grow">
                  <span className="font-medium">{course.name}</span>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${course.progress}%` }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                      className="bg-blue-600 h-2.5 rounded-full"
                    ></motion.div>
                  </div>
                </div>
                <span className="text-sm text-gray-500">{course.progress}%</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Calendar className="mr-2" /> Upcoming Live Classes
          </h2>
          <ul className="space-y-4">
            {upcomingClasses.map((cls) => (
              <motion.li
                key={cls.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center justify-between"
              >
                <span>{cls.name}</span>
                <div className="text-right">
                  <p className="text-sm text-gray-500">{cls.time} - {cls.date}</p>
                  <a
                    href={cls.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-600 text-sm flex items-center mt-1"
                  >
                    Join <ExternalLink size={14} className="ml-1" />
                  </a>
                </div>
              </motion.li>
            ))}
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white p-6 rounded-lg shadow-md md:col-span-2"
        >
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Video className="mr-2" /> Recent Recorded Classes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recentRecordedClasses.map((cls, i) => (
              <motion.div
                key={cls.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                className="bg-gray-100 rounded-lg overflow-hidden"
              >
                <img src={cls.image} alt={cls.title} className="w-full h-32 object-cover" />
                <div className="p-4">
                  <h3 className="font-semibold mb-2">{cls.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">Duration: {cls.duration}</p>
                  <a
                    href={cls.youtubeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors inline-flex items-center"
                  >
                    Watch Now <ExternalLink size={14} className="ml-1" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="mt-8 bg-white p-6 rounded-lg shadow-md"
      >
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <Award className="mr-2" /> My Achievements
        </h2>
        <div className="flex space-x-4">
          {courses.filter(course => course.progress === 100).map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              className="text-center"
            >
              <div className="bg-yellow-100 rounded-full p-4 mb-2">
                <Award className="h-8 w-8 text-yellow-500" />
              </div>
              <span className="text-sm font-medium">{course.name} Master</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;