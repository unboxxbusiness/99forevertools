'use client';

import { useState, useEffect } from 'react';

const getCountdownEndTime = (): number => {
  if (typeof window !== 'undefined') {
    const storedEndTime = localStorage.getItem('countdownEndTime');
    if (storedEndTime) {
      return parseInt(storedEndTime, 10);
    } else {
      const newEndTime = new Date().getTime() + 10 * 60 * 1000; // 10 minutes from now
      localStorage.setItem('countdownEndTime', newEndTime.toString());
      return newEndTime;
    }
  }
  return new Date().getTime() + 10 * 60 * 1000;
};

const calculateTimeLeft = (endTime: number) => {
  const difference = endTime - new Date().getTime();

  let timeLeft = {
    minutes: '00',
    seconds: '00',
  };

  if (difference > 0) {
    const minutes = Math.floor((difference / 1000 / 60) % 60);
    const seconds = Math.floor((difference / 1000) % 60);
    
    timeLeft = {
      minutes: String(minutes).padStart(2, '0'),
      seconds: String(seconds).padStart(2, '0'),
    };
  }

  return timeLeft;
};

export function CountdownTimer() {
  const [endTime, setEndTime] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState({ minutes: '10', seconds: '00' });

  useEffect(() => {
    setEndTime(getCountdownEndTime());
  }, []);

  useEffect(() => {
    if (endTime === null) return;

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(endTime));
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  return (
    <div className="flex justify-center gap-2 md:gap-4 my-4">
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
