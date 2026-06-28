import React, { useState } from "react";

export const ToggleButton = ({
  initialState = false,
  onToggle = () => {},
  accent = "#8b5cf6",
  inactiveBg = "#1e293b",
  size = "md"
}) => {
  const [isOn, setIsOn] = useState(initialState);

  const alpha = (hex, op) => {
    const r = parseInt(hex.slice(1, 3), 16),
      g = parseInt(hex.slice(3, 5), 16),
      b = parseInt(hex.slice(5, 7), 16);
    return "rgba(" + r + "," + g + "," + b + "," + op + ")";
  };

  const sizes = {
    sm: { width: 36, height: 20, circle: 16, padding: 2, labelSize: "11px" },
    md: { width: 48, height: 26, circle: 22, padding: 2, labelSize: "13px" },
    lg: { width: 60, height: 32, circle: 28, padding: 2, labelSize: "15px" }
  };

  const currentSize = sizes[size];

  const handleClick = () => {
    const newState = !isOn;
    setIsOn(newState);
    onToggle(newState);
  };

  return (
    <div
      onClick={handleClick}
      style={{
        width: currentSize.width + "px",
        height: currentSize.height + "px",
        borderRadius: currentSize.height / 2 + "px",
        background: isOn ? accent : inactiveBg,
        display: "flex",
        alignItems: "center",
        padding: currentSize.padding + "px",
        cursor: "pointer",
        transition: "background-color 0.3s ease, box-shadow 0.3s ease",
        boxShadow: isOn ? "0 0 0 4px " + alpha(accent, 0.2) : "none",
        position: "relative",
        overflow: "hidden"
      }}
    >
      <div
        style={{
          width: currentSize.circle + "px",
          height: currentSize.circle + "px",
          borderRadius: "50%",
          background: "#fff",
          transform: isOn
            ? "translateX(" + (currentSize.width - currentSize.circle - currentSize.padding * 2) + "px)"
            : "translateX(0)",
          transition: "transform 0.3s ease",
          boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
          flexShrink: 0
        }}
      />
    </div>
  );
};
