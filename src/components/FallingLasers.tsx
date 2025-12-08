"use client";

import { useEffect, useState } from "react";

interface Laser {
  id: number;
  left: number;
  delay: number;
  duration: number;
  opacity: number;
  baseHeight: number;
}

export default function FallingLasers() {
  const [lasers, setLasers] = useState<Laser[]>([]);

  useEffect(() => {
    const generateLasers = () => {
      const newLasers: Laser[] = [];
      for (let i = 0; i < 2; i++) {
        newLasers.push({
          id: i,
          left: Math.random() * 100,
          delay: Math.random() * 15,
          duration: 3 + Math.random() * 3,
          opacity: 0.15 + Math.random() * 0.2,
          baseHeight: 60 + Math.random() * 100,
        });
      }
      setLasers(newLasers);
    };

    generateLasers();
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" style={{ isolation: 'isolate', willChange: 'auto' }}>
      {lasers.map((laser) => (
        <div
          key={laser.id}
          className="absolute animate-fall"
          style={{
            left: `${laser.left}%`,
            animationDelay: `${laser.delay}s`,
            animationDuration: `${laser.duration}s`,
            opacity: laser.opacity,
            height: `${laser.baseHeight}px`,
            width: '2px',
            background: '#ff2200',
            filter: 'blur(1px)',
            maskImage: 'linear-gradient(to top, black 0%, black 20%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to top, black 0%, black 20%, transparent 100%)',
            willChange: 'transform',
            backfaceVisibility: 'hidden',
          }}
        />
      ))}
    </div>
  );
}
