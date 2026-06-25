import React from "react";

export const ObsidianCalendarCard= ({
  month = "June",
  year = "2026",
  selectedDate = 25,
  events = [5, 9, 14, 18, 25, 29],
  accent = "#4F8CFF",
  bg = "#09090b",
  text = "#ffffff"
}) => {
  const alpha = (hex, opacity) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${opacity})`;
  };

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const firstDay = new Date(Number(year), 5, 1).getDay(); // June
  const totalDays = 30;

  const cells = [];

  for (let i = 0; i < firstDay; i++) cells.push(null);

  for (let i = 1; i <= totalDays; i++) cells.push(i);

  return (
    <div
      style={{
        width: 360,
        background: bg,
        borderRadius: 24,
        padding: 24,
        color: text,
        fontFamily: "Gilroy, system-ui, sans-serif",
        border: `1px solid ${alpha(accent, 0.12)}`,
        boxShadow: "0 20px 60px rgba(0,0,0,.45)",
        position: "relative",
        overflow: "hidden"
      }}
    >
      {/* Glow */}
      <div
        style={{
          position: "absolute",
          width: 260,
          height: 260,
          borderRadius: "50%",
          top: -150,
          right: -120,
          background: `radial-gradient(circle, ${alpha(
            accent,
            0.22
          )}, transparent 70%)`,
          pointerEvents: "none"
        }}
      />

      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 28
        }}
      >
        <div>
          <div
            style={{
              fontSize: 28,
              fontWeight: 800,
              letterSpacing: "-0.04em"
            }}
          >
            {month}
          </div>

          <div
            style={{
              marginTop: 4,
              color: "rgba(255,255,255,.45)",
              fontSize: 14
            }}
          >
            {year}
          </div>
        </div>

        <div
          style={{
            width: 46,
            height: 46,
            borderRadius: 14,
            background: alpha(accent, 0.12),
            color: accent,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 22,
            fontWeight: 700
          }}
        >
          📅
        </div>
      </div>

      {/* Week Days */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7,1fr)",
          gap: 10,
          marginBottom: 16
        }}
      >
        {days.map((day) => (
          <div
            key={day}
            style={{
              textAlign: "center",
              fontSize: 12,
              color: "rgba(255,255,255,.4)",
              fontWeight: 700
            }}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7,1fr)",
          gap: 10
        }}
      >
        {cells.map((day, index) => {
          const isSelected = day === selectedDate;
          const hasEvent = events.includes(day);

          return (
            <div
              key={index}
              style={{
                aspectRatio: "1",
                borderRadius: 14,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 14,
                fontWeight: 700,
                cursor: day ? "pointer" : "default",
                position: "relative",
                background: isSelected
                  ? accent
                  : "rgba(255,255,255,.03)",
                color: isSelected ? "#fff" : day ? "#f5f5f5" : "transparent",
                transition: ".25s"
              }}
            >
              {day}

              {hasEvent && !isSelected && (
                <div
                  style={{
                    position: "absolute",
                    bottom: 6,
                    width: 5,
                    height: 5,
                    borderRadius: "50%",
                    background: accent
                  }}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div
        style={{
          marginTop: 26,
          padding: 16,
          borderRadius: 18,
          background: "rgba(255,255,255,.03)",
          border: `1px solid ${alpha(accent, 0.08)}`
        }}
      >
        <div
          style={{
            fontSize: 13,
            color: "rgba(255,255,255,.45)"
          }}
        >
          Upcoming
        </div>

        <div
          style={{
            marginTop: 6,
            fontSize: 16,
            fontWeight: 700
          }}
        >
          Product Design Meeting
        </div>

        <div
          style={{
            marginTop: 4,
            color: accent,
            fontSize: 13,
            fontWeight: 600
          }}
        >
          25 June • 10:30 AM
        </div>
      </div>
    </div>
  );
};