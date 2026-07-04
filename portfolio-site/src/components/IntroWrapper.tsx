'use client';

import { useState, useEffect } from 'react';
import NetflixIntro from './NetflixIntro';

interface IntroWrapperProps {
  children: React.ReactNode;
  introLetter?: string;
}

export default function IntroWrapper({ children, introLetter = 'H' }: IntroWrapperProps) {
  const [showIntro, setShowIntro] = useState(false);
  const [introCompleted, setIntroCompleted] = useState(false);

  useEffect(() => {
    // Check if intro has been shown in this session
    const introShown = sessionStorage.getItem('introShown');
    if (!introShown) {
      setShowIntro(true);
    } else {
      setIntroCompleted(true);
    }
  }, []);

  const handleIntroComplete = () => {
    setShowIntro(false);
    setIntroCompleted(true);
    sessionStorage.setItem('introShown', 'true');
  };

  return (
    <>
      {showIntro && <NetflixIntro onComplete={handleIntroComplete} letter={introLetter} />}
      <div style={{ opacity: introCompleted ? 1 : 0, transition: 'opacity 0.5s ease-in' }}>
        {children}
      </div>
    </>
  );
}