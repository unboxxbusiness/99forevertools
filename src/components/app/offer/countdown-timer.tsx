'use client';

import { useState, useEffect } from 'react';

const calculateTimeLeft = () => {
  const now = new Date();
  const endOfDay = new Date(now);
  endOfDay.setHours(23, 59, 59, 999); // Set to the end of the current day
  
  const difference = endOfDay.getTime() - now.getTime();

  let timeLeft = {
    hours: '00',
    minutes: '00',
    seconds: '00',
  };

  if (difference > 0) {
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / 1000 / 60) % 60);
    const seconds = Math.floor((difference / 1000) % 60);
    
    timeLeft = {
      hours: String(hours).padStart(2, '0'),
      minutes: String(minutes).padStart(2, '0'),
      seconds: String(seconds).padStart(2, '0'),
    };
  }

  return timeLeft;
};

export function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  return (
    <div className="flex justify-center gap-2 md:gap-4 my-4">
      <div className="text-center">
        <div className="text-2xl md:text-4xl font-bold bg-primary/10 text-primary p-2 md:p-4 rounded-lg min-w-[50px] md:min-w-[70px]">{timeLeft.hours}</div>
        <div className="text-xs text-muted-foreground mt-1">Hours</div>
      </div>
       <div className="text-center">
        <div className="text-2xl md:text-4xl font-bold bg-primary/10 text-primary p-2 md:p-4 rounded-lg min-w-[50px] md:min-w-[70px]">{timeLeft.minutes}</div>
        <div className="text-xs text-muted-foreground mt-1">Minutes</div>
      </div>
       <div className="text-center">
        <div className="text-2xl md:text-4xl font-bold bg-primary/10 text-primary p-2 md:p-4 rounded-lg min-w-[50px] md:min-w-[70px]">{timeLeft.seconds}</div>
        <div className="text-xs text-muted-foreground mt-1">Seconds</div>
      </div>
    </div>
  );
}
