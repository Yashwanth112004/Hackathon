import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Video, Mic, MessageSquare, Users, Send, ExternalLink } from 'lucide-react';

const LiveClass = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [participants, setParticipants] = useState([
    { id: 1, name: 'John Doe', role: 'Student' },
    { id: 2, name: 'Jane Smith', role: 'Teacher' },
    { id: 3, name: 'Alice Johnson', role: 'Student' },
  ]);
  const [isWebcamOn, setIsWebcamOn] = useState(false);
  const videoRef = useRef(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    // Simulating incoming messages
    const timer = setInterval(() => {
      const newMessage = {
        id: Date.now(),
        sender: participants[Math.floor(Math.random() * participants.length)].name,
        text: 'Hello Student',
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    }, 5000);

    return () => clearInterval(timer);
  }, [participants]);

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const newMessage = {
        id: Date.now(),
        sender: 'You',
        text: inputMessage.trim(),
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInputMessage('');
    }
  };

  const handleStartWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsWebcamOn(true);
      }
    } catch (error) {
      console.error('Error accessing webcam: ', error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold mb-8"
      >
        Live Class: Advanced React Patterns
      </motion.h1>
      <div className="grid grid-cols-3 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="col-span-2"
        >
          <div className="bg-black aspect-video rounded-lg flex items-center justify-center mb-4 relative">
            {isWebcamOn ? (
              <video
                ref={videoRef}
                autoPlay
                muted
                className="h-full w-full object-cover rounded-lg"
              />
            ) : (
              <Video className="h-16 w-16 text-white opacity-50" />
            )}
          </div>
          <div className="flex space-x-4">
            <motion.a
              href="https://meet.google.com/ntk-pnqd-ngx"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ExternalLink className="mr-2" /> Join Live Class
            </motion.a>
            <motion.button
              onClick={handleStartWebcam}
              className="flex items-center justify-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Mic className="mr-2" /> {isWebcamOn ? 'Webcam On' : 'Start Webcam'}
            </motion.button>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="space-y-8"
        >
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <MessageSquare className="mr-2" /> Chat
            </h2>
            <div className="h-64 overflow-y-auto mb-4 space-y-2">
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="bg-gray-100 p-2 rounded"
                  >
                    <span className="font-semibold">{message.sender}: </span>
                    {message.text}
                  </motion.div>
                ))}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>
            <div className="flex">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-grow border rounded-l px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <motion.button
                onClick={handleSendMessage}
                className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Send className="h-5 w-5" />
              </motion.button>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Users className="mr-2" /> Participants
            </h2>
            <ul className="space-y-2">
              {participants.map((participant) => (
                <motion.li
                  key={participant.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center justify-between"
                >
                  <span>{participant.name}</span>
                  <span className="text-sm text-gray-500">{participant.role}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LiveClass;
