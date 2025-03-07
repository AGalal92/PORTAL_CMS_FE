import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = useState('down');
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) {
        setScrollDirection('down');
      } else if (currentScrollY < lastScrollY) {
        setScrollDirection('up');
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return scrollDirection;
};

export const applyScrollAnimation = (ref, options = {}) => {
  useEffect(() => {
    if (!ref.current) return;

    const {
      trigger = ref.current,
      start = 'top 80%',
      end = 'bottom 20%',
      scrub = true,
      animation = {}, // Static animation properties
      onDirectionChange, // Optional function for dynamic direction-based updates
    } = options;

    gsap.to(ref.current, {
      ...animation, // Spread static animation properties (e.g., y, opacity)
      scrollTrigger: {
        trigger,
        start,
        end,
        scrub,
        onUpdate: (self) => {
          const direction = self.direction === 1 ? 'down' : 'up';
          if (onDirectionChange) {
            onDirectionChange(self, direction); // Call the dynamic function if provided
          }
        },
      },
    });
  }, [ref, options]);
};