import React, { useState, useEffect } from 'react';

const Counter = ({ value, duration = 1 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startValue = 0;
    const endValue = value;
    const steps = 30;
    const stepDuration = (duration * 1000) / steps;
    
    const increment = (endValue - startValue) / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const nextValue = Math.round(startValue + (increment * currentStep));
      
      if (currentStep >= steps) {
        setCount(endValue);
        clearInterval(timer);
      } else {
        setCount(nextValue);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [value, duration]);

  return <>{count.toLocaleString('en-IN')}</>;
};

export default Counter;