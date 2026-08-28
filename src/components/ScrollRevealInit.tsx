'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollRevealInit() {
  const pathname = usePathname();

  useEffect(() => {
    const initObserver = () => {
      // 1. Target 2-column layout children for Left & Right animations
      const gridContainers = document.querySelectorAll('.grid-cols-1, .grid');
      gridContainers.forEach((grid) => {
        const children = grid.children;
        if (children.length >= 2) {
          Array.from(children).forEach((child, idx) => {
            if (!child.classList.contains('reveal-left') && !child.classList.contains('reveal-right') && !child.classList.contains('reveal-up')) {
              if (idx % 2 === 0) {
                child.classList.add('reveal-left');
              } else {
                child.classList.add('reveal-right');
              }
            }
          });
        }
      });

      // 2. Select all target elements across all pages
      const selectors = 'main > section, main > div > section, article, .reveal-left, .reveal-right, .reveal-up, .reveal-scroll';
      const elements = document.querySelectorAll(selectors);

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            // Bidirectional: Animates IN when scrolling into view, and resets when leaving
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
            } else {
              // Allows re-animating when scrolling up or down
              const rect = entry.boundingClientRect;
              if (rect.top > window.innerHeight || rect.bottom < 0) {
                entry.target.classList.remove('is-visible');
              }
            }
          });
        },
        {
          threshold: 0.12,
          rootMargin: '0px 0px -40px 0px',
        }
      );

      elements.forEach((el) => {
        // Skip initial top Hero section
        if (el.tagName.toLowerCase() === 'section' && el.previousElementSibling === null) {
          el.classList.add('is-visible');
          return;
        }

        if (!el.classList.contains('reveal-left') && !el.classList.contains('reveal-right')) {
          el.classList.add('reveal-up');
        }

        observer.observe(el);
      });
    };

    const timer = setTimeout(initObserver, 150);
    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}
