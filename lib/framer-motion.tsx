import React from 'react';

// Re-exporting mocked framer-motion components for client-side animations
// This approach avoids installing framer-motion as a dependency while maintaining the same API

export const motion = {
  div: ({ 
    children, 
    initial, 
    animate, 
    exit, 
    transition, 
    className, 
    ...props 
  }: any) => {
    return (
      <div
        className={`transition-all ${className || ""}`}
        style={{
          // Map framer properties to CSS transitions where possible
          transitionProperty: "opacity, transform",
          transitionDuration: `${transition?.duration || 0.3}s`,
          transitionTimingFunction: "ease-out",
          opacity: animate?.opacity !== undefined ? animate.opacity : 1,
          transform: animate?.y !== undefined ? `translateY(${animate.y}px)` : "none",
        }}
        {...props}
      >
        {children}
      </div>
    );
  },
};

export const AnimatePresence = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};