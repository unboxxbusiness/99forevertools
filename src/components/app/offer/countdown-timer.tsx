
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
    hasFinished: difference <= 0,
  };

  if (difference > 0) {
    const minutes = Math.floor((difference / 1000 / 60) % 60);
    const seconds = Math.floor((difference / 1000) % 60);
    
    timeLeft = {
      minutes: String(minutes).padStart(2, '0'),
      seconds: String(seconds).padStart(2, '0'),
      hasFinished: false,
    };
  }

  return timeLeft;
};

export function CountdownTimer() {
  const [endTime, setEndTime] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState({ minutes: '10', seconds: '00', hasFinished: false });

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

  if (timeLeft.hasFinished) {
    return (
      <div className="text-center bg-primary/10 border border-primary/20 p-6 rounded-lg my-4 animate-fade-in max-w-2xl mx-auto">
        <p className="text-lg md:text-xl font-semibold">⏳ Your time is up… but your commitment to going online is clear.</p>
        <p className="text-muted-foreground mt-2">So here’s the good news — the exclusive one-time offer is unlocked for you!</p>
        <p className="font-bold text-primary mt-2">Grab it now before you lose this chance again.</p>
      </div>
    )
  }

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
