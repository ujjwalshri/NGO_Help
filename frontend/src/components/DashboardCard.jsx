import React from 'react';
import { motion } from 'framer-motion';
import Counter from './Counter';

const DashboardCard = ({ 
  title, 
  value, 
  icon, 
  bgColor, 
  subtitle, 
  subtitleBgColor, 
  subtitleTextColor,
  prefix = ''
}) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={cardVariants}
      className="bg-white overflow-hidden shadow rounded-lg"
    >
      <div className="p-5">
        <div className="flex items-center">
          <div className={`flex-shrink-0 ${bgColor} rounded-md p-3`}>
            {icon}
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
              <dd className="text-3xl font-semibold text-gray-900">
                {prefix}<Counter value={value} />
              </dd>
            </dl>
          </div>
        </div>
      </div>
      <div className={`${subtitleBgColor} px-5 py-3`}>
        <div className={`text-sm ${subtitleTextColor}`}>
          {subtitle}
        </div>
      </div>
    </motion.div>
  );
};

export default DashboardCard;