import React from 'react'
import { motion } from 'framer-motion'

const Footer = () => {
  return (
    <div>
        <motion.footer 
        className="bg-gray-800 text-white text-center p-4 mt-8"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <p>&copy; 2023 NGO Help. All rights reserved.</p>
      </motion.footer>

      <motion.div 
        className="bg-gray-100 p-4 mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <p className="text-gray-600 text-sm">
          This is a simple NGO report submission application. It allows NGOs to submit their monthly reports,
          including the number of people helped, events conducted, and funds utilized. The application is built
          using React for the frontend and Node.js with Express for the backend.
        </p>
      </motion.div>
    </div>
  )
}

export default Footer