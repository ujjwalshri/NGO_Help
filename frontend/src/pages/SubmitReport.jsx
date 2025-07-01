import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SubmitReport = () => {
  const [formData, setFormData] = useState({
    ngoId: '',
    month: '',
    year: new Date().getFullYear(), // Default to current year
    peopleHelped: '',
    eventsConducted: '',
    fundsUtilized: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Generate array of years (current year and 2 years back)
  const currentYear = new Date().getFullYear();
  const years = [currentYear - 2, currentYear - 1, currentYear];

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:5500/api/report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        toast.success('Report submitted successfully!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
            color: "white",
            borderRadius: "8px",
            width: "auto",
            padding: "12px 24px",
            fontSize: "14px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }
        });
        setFormData({
          ngoId: '',
          month: '',
          year: new Date().getFullYear(),
          peopleHelped: '',
          eventsConducted: '',
          fundsUtilized: ''
        });
      } else {
        throw new Error('Failed to submit report');
      }
    } catch (error) {
      toast.error('Failed to submit report', {
        position: "top-right",
        autoClose: 3000,
        theme: "light",
        style: {
          background: "#ff6b6b",
          color: "white",
          borderRadius: "8px",
          width: "auto",
          padding: "12px 24px",
          fontSize: "14px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formContainerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const formItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden"
        initial="hidden"
        animate="visible"
        variants={formContainerVariants}
      >
        <div className="px-6 py-8">
          <motion.h2 
            className="text-2xl font-bold text-center text-gray-800 mb-8"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Submit Monthly Report
          </motion.h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div variants={formItemVariants}>
              <label htmlFor="ngoId" className="block text-sm font-medium text-gray-700">
                NGO ID
              </label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="text"
                id="ngoId"
                name="ngoId"
                value={formData.ngoId}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Enter NGO ID"
              />
            </motion.div>

            <div className="grid grid-cols-2 gap-4">
              <motion.div variants={formItemVariants}>
                <label htmlFor="month" className="block text-sm font-medium text-gray-700">
                  Month
                </label>
                <motion.select
                  whileFocus={{ scale: 1.02 }}
                  id="month"
                  name="month"
                  value={formData.month}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="">Select Month</option>
                  {months.map(month => (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  ))}
                </motion.select>
              </motion.div>

              <motion.div variants={formItemVariants}>
                <label htmlFor="year" className="block text-sm font-medium text-gray-700">
                  Year
                </label>
                <motion.select
                  whileFocus={{ scale: 1.02 }}
                  id="year"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  {years.map(year => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </motion.select>
              </motion.div>
            </div>

            <motion.div variants={formItemVariants}>
              <label htmlFor="peopleHelped" className="block text-sm font-medium text-gray-700">
                People Helped
              </label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="number"
                id="peopleHelped"
                name="peopleHelped"
                value={formData.peopleHelped}
                onChange={handleChange}
                required
                min="0"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Number of people helped"
              />
            </motion.div>

            <motion.div variants={formItemVariants}>
              <label htmlFor="eventsConducted" className="block text-sm font-medium text-gray-700">
                Events Conducted
              </label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="number"
                id="eventsConducted"
                name="eventsConducted"
                value={formData.eventsConducted}
                onChange={handleChange}
                required
                min="0"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Number of events conducted"
              />
            </motion.div>

            <motion.div variants={formItemVariants}>
              <label htmlFor="fundsUtilized" className="block text-sm font-medium text-gray-700">
                Funds Utilized
              </label>
              <div className="relative mt-1 rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <span className="text-gray-500 sm:text-sm">₹</span>
                </div>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="number"
                  id="fundsUtilized"
                  name="fundsUtilized"
                  value={formData.fundsUtilized}
                  onChange={handleChange}
                  required
                  min="0"
                  className="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="0.00"
                />
              </div>
            </motion.div>

            <motion.div variants={formItemVariants}>
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                  isSubmitting ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out`}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Report'}
              </motion.button>
            </motion.div>
          </form>
        </div>
      </motion.div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        limit={3}
        style={{
          width: "auto",
          minWidth: "300px",
          maxWidth: "400px"
        }}
      />
    </div>
  );
};

export default SubmitReport;