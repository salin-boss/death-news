"use client";

import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [role="button"]')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", updatePosition);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", updatePosition);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <div
      className="fixed pointer-events-none z-[9999] transition-transform duration-200 ease-out"
      style={{
        left: position.x - 8,
        top: position.y - 8,
        width: 16,
        height: 16,
      }}
    >
      <div
        className={`w-3 h-3 transition-all duration-500 ease-out ${
          isHovering ? "bg-[#ff0000] scale-110" : "bg-white"
        }`}
        style={{
          transform: isHovering ? "rotate(405deg)" : "rotate(0deg)",
          marginLeft: 2,
          marginTop: 2,
        }}
      />
    </div>
  );
}
