import React, { useState, useEffect } from "react";

export const DigitalClock = ({
  accent = "#007bff",
  bg = "#1a1a1a",
  textColor = "#ffffff",
  borderColor = "rgba(255,255,255,0.1)",
  showDate = true,
  showSeconds = true,
  timeZone = "UTC"
}) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timerId);
  }, []);

  const alpha = (hex, op) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return "rgba(" + r + "," + g + "," + b + "," + op + ")";
  };

  const formatTime = (date) => {
    const options = {
      hour: "2-digit",
      minute: "2-digit",
      second: showSeconds ? "2-digit" : undefined,
      hour12: false,
      timeZone: timeZone
    };
    return date.toLocaleTimeString("en-US", options);
  };

  const formatDate = (date) => {
    const options = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      timeZone: timeZone
    };
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <div
      style={{
        backgroundColor: bg,
        borderRadius: "16px",
        padding: "24px 32px",
        border: "1px solid " + borderColor,
        fontFamily: "system-ui, Gilroy, sans-serif",
        color: textColor,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        maxWidth: "320px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.3)"
      }}
    >
      <div
        style={{
          fontSize: "48px",
          fontWeight: "700",
          letterSpacing: "-0.03em",
          marginBottom: showDate ? "8px" : "0",
          color: textColor,
          textShadow: "0 0 10px " + alpha(accent, 0.4)
        }}
      >
        {formatTime(time)}
      </div>
      {showDate && (
        <div
          style={{
            fontSize: "14px",
            fontWeight: "500",
            color: alpha(textColor, 0.6),
            textTransform: "uppercase",
            letterSpacing: "0.08em"
          }}
        >
          {formatDate(time)}
        </div>
      )}
    </div>
  );
};
