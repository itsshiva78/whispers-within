'use client';

import React from 'react';

const particles = [
  { size: 4, left: '5%', top: '15%', color: 'rgba(251,191,36,0.5)', shadow: 'rgba(251,191,36,0.3)', delay: '0s', duration: '7s' },
  { size: 3, left: '15%', top: '60%', color: 'rgba(139,92,246,0.5)', shadow: 'rgba(139,92,246,0.3)', delay: '1s', duration: '9s' },
  { size: 5, left: '25%', top: '30%', color: 'rgba(255,255,255,0.35)', shadow: 'rgba(255,255,255,0.2)', delay: '2s', duration: '8s' },
  { size: 3, left: '35%', top: '75%', color: 'rgba(251,191,36,0.45)', shadow: 'rgba(251,191,36,0.25)', delay: '0.5s', duration: '10s' },
  { size: 6, left: '45%', top: '20%', color: 'rgba(139,92,246,0.5)', shadow: 'rgba(139,92,246,0.3)', delay: '3s', duration: '7s' },
  { size: 4, left: '55%', top: '50%', color: 'rgba(255,255,255,0.3)', shadow: 'rgba(255,255,255,0.15)', delay: '1.5s', duration: '11s' },
  { size: 3, left: '65%', top: '80%', color: 'rgba(251,191,36,0.5)', shadow: 'rgba(251,191,36,0.3)', delay: '4s', duration: '8s' },
  { size: 5, left: '72%', top: '10%', color: 'rgba(139,92,246,0.45)', shadow: 'rgba(139,92,246,0.25)', delay: '2.5s', duration: '9s' },
  { size: 4, left: '80%', top: '40%', color: 'rgba(255,255,255,0.35)', shadow: 'rgba(255,255,255,0.2)', delay: '0s', duration: '10s' },
  { size: 3, left: '88%', top: '65%', color: 'rgba(251,191,36,0.5)', shadow: 'rgba(251,191,36,0.3)', delay: '3.5s', duration: '7s' },
  { size: 5, left: '10%', top: '45%', color: 'rgba(139,92,246,0.5)', shadow: 'rgba(139,92,246,0.3)', delay: '1s', duration: '12s' },
  { size: 4, left: '40%', top: '90%', color: 'rgba(255,255,255,0.3)', shadow: 'rgba(255,255,255,0.15)', delay: '2s', duration: '8s' },
  { size: 6, left: '60%', top: '35%', color: 'rgba(251,191,36,0.45)', shadow: 'rgba(251,191,36,0.25)', delay: '4.5s', duration: '9s' },
  { size: 3, left: '50%', top: '70%', color: 'rgba(139,92,246,0.45)', shadow: 'rgba(139,92,246,0.25)', delay: '0.5s', duration: '11s' },
  { size: 5, left: '92%', top: '25%', color: 'rgba(255,255,255,0.35)', shadow: 'rgba(255,255,255,0.2)', delay: '3s', duration: '8s' },
];

export default function FloatingParticles() {
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
            boxShadow: `0 0 ${p.size * 2}px ${p.shadow}`,
            animation: `particle-drift ${p.duration} ease-in-out infinite`,
            animationDelay: p.delay,
          }}
        />
      ))}
    </div>
  );
}
