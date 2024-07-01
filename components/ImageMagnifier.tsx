'use client';
import { useState } from 'react';

const ImageManifier = ({ imageUrl }: { imageUrl: string }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [showMagnifier, setMagnifier] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  const handleMouseHover = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = (e.currentTarget as HTMLElement)?.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageX - top) / height) * 100;

    setPosition({ x, y });
    setCursorPos({ x: e.pageX - left, y: e.pageY - top });
  };
  return (
    <div
      className="relative"
      onMouseEnter={() => setMagnifier(true)}
      onMouseLeave={() => setMagnifier(false)}
      onMouseMove={handleMouseHover}
    >
      <div className="grid place-items-center">
        <img width="70%" height="70%" className="z-40" src={imageUrl} alt="photo image" />
      </div>

      {showMagnifier && (
        <div
          className="absolute z-50"
          style={{
            display: 'block',
            height: '200px',
            width: '200px',
            backgroundImage: `url(${imageUrl})`,
            backgroundPosition: `${position.x}% ${position.y}%`,
            left: `${cursorPos.x}px`,
            top: `${cursorPos.y}px`,
          }}
        />
      )}
    </div>
  );
};
export default ImageManifier;
