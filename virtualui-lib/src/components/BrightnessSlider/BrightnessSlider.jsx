import React, { useState, useEffect } from "react";

export const BrightnessSlider = ({
  initialBrightness = 50,
  min = 0,
  max = 100,
  step = 1,
  width = 300,
  height = 8,
  accent = "#a0a0a0",
  bgTrack = "#333333",
  bgFill = "#f0f0f0",
  handleColor = "#ffffff",
  iconColor = "#f0f0f0",
  onChange = () => {}
}) => {
  const [brightness, setBrightness] = useState(initialBrightness);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = React.useRef(null);

  const alpha = (hex, op) => {
    const r = parseInt(hex.slice(1, 3), 16), g = parseInt(hex.slice(3, 5), 16), b = parseInt(hex.slice(5, 7), 16);
    return "rgba(" + r + "," + g + "," + b + "," + op + ")";
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    updateBrightness(e);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      updateBrightness(e);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const updateBrightness = (e) => {
    if (sliderRef.current) {
      const rect = sliderRef.current.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      let newPosition = (clientX - rect.left) / rect.width;
      newPosition = Math.max(0, Math.min(1, newPosition));
      const newValue = min + Math.round((max - min) * newPosition / step) * step;
      setBrightness(newValue);
      onChange(newValue);
    }
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  const progress = ((brightness - min) / (max - min)) * 100;

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: "12px",
      width: width + "px",
      padding: "20px",
      background: "#1a1a1a",
      borderRadius: "16px",
      fontFamily: "Gilroy, system-ui, sans-serif",
      boxShadow: "0 10px 30px rgba(0,0,0,0.3)"
    }}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, color: iconColor }}>
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
      </svg>
      <div
        ref={sliderRef}
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
        onTouchMove={handleMouseMove}
        onTouchEnd={handleMouseUp}
        style={{
          position: "relative",
          width: "100%",
          height: height + "px",
          borderRadius: "999px",
          background: bgTrack,
          cursor: "pointer"
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            height: "100%",
            width: progress + "%",
            background: "linear-gradient(to right, " + bgFill + ", " + accent + ")",
            borderRadius: "inherit"
          }}
        />
        <div
          style={{
            position: "absolute",
            left: progress + "%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            width: "20px",
            height: "20px",
            borderRadius: "50%",
            background: handleColor,
            border: "3px solid " + accent,
            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
            pointerEvents: "none"
          }}
        />
      </div>
    </div>
  );
};
