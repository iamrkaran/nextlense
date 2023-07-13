"use client";
import React, { useEffect, useState } from 'react';

type Props = {}

type Countdown = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const ComingSoon = (props: Props) => {
  const calculateTimeLeft = (): Countdown => {
    let year = new Date().getFullYear();
    const difference = +new Date(`${year}-10-1`) - +new Date();

    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return { days: 0, hours: 0, minutes: 0, seconds: 0 }; // Return zeros if the date has passed
  };

  const [timeLeft, setTimeLeft] = useState<Countdown>(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Clear timeout if the component is unmounted
    return () => clearTimeout(timer);
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-900">
      <h1 className="mb-4 text-6xl font-bold">Coming Soon!</h1>
      
      <p className="mb-4 text-xl">We're working hard to bring you something amazing. Stay tuned!</p>
      
      <div className="mb-8 text-4xl">
        {timeLeft.days}d : {timeLeft.hours}h : {timeLeft.minutes}m : {timeLeft.seconds}s
      </div>

      
    </div>
  )
}

export default ComingSoon;
