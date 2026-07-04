'use client';

import { useEffect, useState } from 'react';
import styles from './NetflixIntro.module.css';

interface NetflixIntroProps {
  onComplete?: () => void;
  skipable?: boolean;
  letter?: string;
}

export default function NetflixIntro({ onComplete, skipable = true, letter = 'H' }: NetflixIntroProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        onComplete?.();
      }, 500);
    }, 4500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  const playIntroSound = () => {
    try {
      const audio = new Audio('/intro-sound.mp3');
      audio.volume = 0.3;
      audio.play();
    } catch (error) {
      console.log('Sound not available');
    }
  };

  const handleSkip = () => {
    if (skipable) {
      playIntroSound();
      setIsVisible(false);
      setTimeout(() => {
        onComplete?.();
      }, 300);
    }
  };

  const handleClick = () => {
    playIntroSound();
    handleSkip();
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className={styles.container} onClick={handleClick}>
      <div className={styles.netflixintro} data-letter={letter}>
        <div className={styles.helper1}>
          <div className={styles.effectBrush}>
            {Array.from({ length: 31 }, (_, i) => (
              <span key={i} className={styles[`fur${31 - i}`]}></span>
            ))}
          </div>
          <div className={styles.effectLumieres}>
            {Array.from({ length: 28 }, (_, i) => (
              <span key={i} className={styles[`lamp${i + 1}`]}></span>
            ))}
          </div>
        </div>
        <div className={styles.helper2}>
          <div className={styles.effectBrush}>
            {Array.from({ length: 31 }, (_, i) => (
              <span key={i} className={styles[`fur${31 - i}`]}></span>
            ))}
          </div>
        </div>
        <div className={styles.helper3}>
          <div className={styles.effectBrush}>
            {Array.from({ length: 31 }, (_, i) => (
              <span key={i} className={styles[`fur${31 - i}`]}></span>
            ))}
          </div>
        </div>
      </div>
      {skipable && (
        <div className={styles.skipText}>Click to skip</div>
      )}
    </div>
  );
}