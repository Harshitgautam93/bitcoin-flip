// src/Preloader.js
import React, { useEffect, useRef } from 'react';
import './Preloader.css';
import { gsap } from 'gsap';

const Preloader = () => {
  const preloaderRef = useRef(null);
  const leftTextRef = useRef(null);
  const rightTextRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Slide in the left and right parts of the name
    tl.to(preloaderRef.current, { opacity: 1, duration: 0.5 })
      .fromTo(leftTextRef.current, 
        { x: '-100%', opacity: 0 }, 
        { x: '0%', opacity: 1, duration: 1, ease: 'power2.out' })
      .fromTo(rightTextRef.current, 
        { x: '100%', opacity: 0 }, 
        { x: '0%', opacity: 1, duration: 1, ease: 'power2.out' }, '-=1')

      // Pause to let the text be visible
      .addPause(1.5)

      // Scale up and vanish the text
      .to(leftTextRef.current, 
        { scale: 3, opacity: 0, duration: 1.5, ease: 'power2.inOut' })
      .to(rightTextRef.current, 
        { scale: 3, opacity: 0, duration: 1.5, ease: 'power2.inOut' }, '-=1.5')

      // Fade out the preloader completely
      .to(preloaderRef.current, 
        { opacity: 0, duration: 1.5, ease: 'power2.inOut' }, '-=1');
  }, []);

  return (
    <div className="preloader" ref={preloaderRef}>
      <div className="preloader-name">
        <span ref={leftTextRef} className="preloader-part">Money</span>
        <span ref={rightTextRef} className="preloader-part">Works Best</span>
      </div>
    </div>
  );
};

export default Preloader;
