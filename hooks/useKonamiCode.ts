import { useState, useEffect, useCallback } from 'react';

// Mobile-friendly secret code to access the admin panel.
const secretCodeSequence = [
  'm', 'a', 's', 't', 'e', 'r', 's', 'e', 't', 'u', 'p'
];

/**
 * A custom React hook that listens for a secret key sequence to trigger a callback.
 * (Previously the Konami Code, now a mobile-friendly word).
 * @param callback The function to execute when the code is successfully entered.
 */
export const useKonamiCode = (callback: () => void): void => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    const key = event.key;
    // Add a guard clause to handle cases where event.key might be undefined (e.g., in older browsers or for certain key events).
    if (!key) {
      setCurrentIndex(0);
      return;
    }
    
    // Check if the pressed key matches the next key in the sequence (case-insensitive)
    if (key.toLowerCase() === secretCodeSequence[currentIndex].toLowerCase()) {
      const nextIndex = currentIndex + 1;
      // If the sequence is complete, execute the callback and reset
      if (nextIndex === secretCodeSequence.length) {
        callback();
        setCurrentIndex(0);
      } else {
        // Otherwise, advance to the next step in the sequence
        setCurrentIndex(nextIndex);
      }
    } else {
      // If the wrong key is pressed, reset the sequence
      // but check if the pressed key is the start of the sequence.
      if (key.toLowerCase() === secretCodeSequence[0].toLowerCase()) {
        setCurrentIndex(1);
      } else {
        setCurrentIndex(0);
      }
    }
  }, [currentIndex, callback]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);
};
