import React from "react";

export const PieChartCard = ({
  title = "Traffic Sources",
  subtitle = "Last 30 days",
  data = [
    { label: "Organic Search", value: 38, color: "#4F8CFF" },
    { label: "Direct", value: 24, color: "#22c55e" },
    { label: "Social", value: 18, color: "#f59e0b" },
    { label: "Referral", value: 12, color: "#ef4444" },
    { label: "Email", value: 8, color: "#a855f7" }
  ],
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

  const size = 240;
  const cx = size / 2;
  const cy = size / 2;
  const radius = 92;
  const gapDeg = 3.5; // separation between slices
  const explode = 7; // how far each slice pushes out from center

  const total = data.reduce((sum, d) => sum + d.value, 0);

  let cumulative = -90; // start at top, clockwise
  const slices = data.map((d) => {
    const sweep = (d.value / total) * 360;
    const startAngle = cumulative + gapDeg / 2;
    const endAngle = cumulative + sweep - gapDeg / 2;
    cumulative += sweep;
    const midAngle = (startAngle + endAngle) / 2;
    return {
      ...d,
      startAngle,
      endAngle,
      midAngle,
      percent: Math.round((d.value / total) * 100)
    };
  });

  const toRad = (deg) => (deg * Math.PI) / 180;

  const arcPoint = (angleDeg, r) => ({
    x: r * Math.cos(toRad(angleDeg)),
    y: r * Math.sin(toRad(angleDeg))
  });

  const buildSlicePath = (startAngle, endAngle) => {
    const p1 = arcPoint(startAngle, radius);
    const p2 = arcPoint(endAngle, radius);
    const largeArc = endAngle - startAngle > 180 ? 1 : 0;
    return `M0,0 L${p1.x.toFixed(2)},${p1.y.toFixed(2)} A${radius},${radius} 0 ${largeArc} 1 ${p2.x.toFixed(
      2
    )},${p2.y.toFixed(2)} Z`;
  };

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
          background: `radial-gradient(circle, ${alpha(accent, 0.22)}, transparent 70%)`,
          pointerEvents: "none"
        }}
      />

      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
          position: "relative",
          zIndex: 1
        }}
      >
        <div>
          <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-0.03em" }}>{title}</div>
          <div style={{ marginTop: 4, color: "rgba(255,255,255,.45)", fontSize: 13 }}>{subtitle}</div>
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
            fontSize: 20,
            fontWeight: 700
          }}
        >
          ◐
        </div>
      </div>

      {/* Pie */}
      <div style={{ display: "flex", justifyContent: "center", position: "relative", zIndex: 1 }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          {slices.map((s, i) => {
            const dx = explode * Math.cos(toRad(s.midAngle));
            const dy = explode * Math.sin(toRad(s.midAngle));
            return (
              <g key={i} transform={`translate(${cx + dx},${cy + dy})`}>
                <path
                  d={buildSlicePath(s.startAngle, s.endAngle)}
                  fill={s.color}
                  opacity={0.92}
                  stroke={bg}
                  strokeWidth={2}
                />
              </g>
            );
          })}
        </svg>
      </div>

      {/* Legend */}
      <div
        style={{
          marginTop: 22,
          display: "flex",
          flexDirection: "column",
          gap: 10,
          position: "relative",
          zIndex: 1
        }}
      >
        {slices.map((s, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "10px 14px",
              borderRadius: 14,
              background: "rgba(255,255,255,.03)",
              border: `1px solid ${alpha(s.color, 0.1)}`
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: s.color,
                  flexShrink: 0
                }}
              />
              <span style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,.85)" }}>
                {s.label}
              </span>
            </div>
            <span style={{ fontSize: 13, fontWeight: 700, color: s.color }}>{s.percent}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};