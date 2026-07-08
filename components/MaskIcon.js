import React from 'react';

export default function MaskIcon({ className, size = 24, locked = false, loading = false }) {
  return (
    <img 
      src="/professor1.png"
      alt="Mask"
      width={size}
      height={size}
      className={`${className || ''} ${loading ? 'animate-spin' : ''} object-contain`}
      style={{
        opacity: locked ? 0.3 : 1,
        filter: locked ? 'grayscale(100%)' : 'none',
        width: size,
        height: size
      }}
    />
  );
}
