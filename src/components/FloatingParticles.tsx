'use client';

import React, { memo } from 'react';

const particles = [
  { size: 3, left: '5%', top: '15%', color: 'rgba(251,191,36,0.4)', delay: '0s', duration: '7s' },
  { size: 3, left: '15%', top: '60%', color: 'rgba(139,92,246,0.4)', delay: '1s', duration: '9s' },
  { size: 4, left: '25%', top: '30%', color: 'rgba(255,255,255,0.25)', delay: '2s', duration: '8s' },
  { size: 3, left: '45%', top: '20%', color: 'rgba(139,92,246,0.4)', delay: '3s', duration: '7s' },
  { size: 3, left: '55%', top: '50%', color: 'rgba(255,255,255,0.2)', delay: '1.5s', duration: '11s' },
  { size: 3, left: '72%', top: '10%', color: 'rgba(139,92,246,0.35)', delay: '2.5s', duration: '9s' },
  { size: 3, left: '80%', top: '40%', color: 'rgba(255,255,255,0.25)', delay: '0s', duration: '10s' },
  { size: 3, left: '88%', top: '65%', color: 'rgba(251,191,36,0.4)', delay: '3.5s', duration: '7s' },
  { size: 3, left: '40%', top: '85%', color: 'rgba(251,191,36,0.35)', delay: '4s', duration: '9s' },
  { size: 3, left: '92%', top: '25%', color: 'rgba(255,255,255,0.25)', delay: '3s', duration: '8s' },
];

function FloatingParticles() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }} aria-hidden="true">
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            left: p.left,
            top: p.top,
            background: p.color,
            animation: `particle-drift ${p.duration} ease-in-out infinite`,
            animationDelay: p.delay,
            willChange: 'transform, opacity',
          }}
        />
      ))}
    </div>
  );
}

export default memo(FloatingParticles);
