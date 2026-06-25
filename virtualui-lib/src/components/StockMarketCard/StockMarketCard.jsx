import React, { useState, useEffect } from "react";

export const StockMarketCard = ({
  stockName = "AAPL",
  companyName = "Apple Inc.",
  currentPrice = "175.45",
  priceChange = "-1.23",
  percentageChange = "-0.70%",
  changeType = "negative",
  graphData = [
    { value: 170, color: "#22c55e" },
    { value: 172, color: "#22c55e" },
    { value: 173, color: "#22c55e" },
    { value: 171, color: "#ef4444" },
    { value: 170, color: "#ef4444" },
    { value: 172, color: "#22c55e" },
    { value: 174, color: "#22c55e" },
    { value: 176, color: "#22c55e" },
    { value: 175, color: "#ef4444" },
    { value: 173, color: "#ef4444" },
    { value: 175, color: "#22c55e" },
    { value: 177, color: "#22c55e" },
    { value: 178, color: "#22c55e" },
    { value: 176, color: "#ef4444" },
    { value: 175, color: "#ef4444" }
  ],
  accent = "#22c55e",
  negativeColor = "#ef4444",
  bg = "#0a0e1a"
}) => {
  const alpha = (hex, op) => {
    const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
    return "rgba(" + r + "," + g + "," + b + "," + op + ")";
  };

  const graphHeight = 60;
  const graphWidth = 280;
  const padding = 10;

  const values = graphData.map(d => d.value);
  const maxVal = Math.max(...values);
  const minVal = Math.min(...values);

  const getPathData = () => {
    if (values.length < 2) return "";
    const points = values.map((value, i) => {
      const x = i / (values.length - 1) * (graphWidth - 2 * padding) + padding;
      const y = graphHeight - padding - ((value - minVal) / (maxVal - minVal)) * (graphHeight - 2 * padding);
      return `${x},${y}`;
    });
    return `M${points.join(" L")}`;
  };

  const lastColor = graphData.length > 0 ? graphData[graphData.length - 1].color : accent;

  return (
    <div
      style={{
        width: "320px",
        background: bg,
        borderRadius: "16px",
        padding: "24px",
        fontFamily: "Gilroy, system-ui, sans-serif",
        color: "#fff",
        border: "1px solid " + alpha(accent, 0.1),
        boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
        position: "relative",
        overflow: "hidden"
      }}
    >
      {/* Background Gradient */} 
      <div style={{ 
        position: "absolute", 
        top: "-50%", 
        left: "-50%", 
        width: "200%", 
        height: "200%", 
        background: "radial-gradient(circle at 30% 20%, " + alpha(accent, 0.08) + ", transparent 60%)", 
        opacity: 0.6, 
        pointerEvents: "none" 
      }} />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
        <div>
          <div style={{ fontSize: "24px", fontWeight: "800", color: "#f5f5f7", letterSpacing: "-0.03em" }}>{stockName}</div>
          <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", marginTop: "2px" }}>{companyName}</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: "26px", fontWeight: "800", color: "#f5f5f7", letterSpacing: "-0.03em" }}>{currentPrice}</div>
          <div style={{ fontSize: "13px", fontWeight: "600", color: changeType === "negative" ? negativeColor : accent, marginTop: "2px" }}>
            {priceChange} ({percentageChange})
          </div>
        </div>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <svg width={graphWidth} height={graphHeight} viewBox={`0 0 ${graphWidth} ${graphHeight}`}>
          {/* Grid Lines */}
          <line x1={padding} y1={graphHeight - padding} x2={graphWidth - padding} y2={graphHeight - padding} stroke="rgba(255,255,255,0.08)" strokeDasharray="2 2" />
          <line x1={padding} y1={graphHeight / 2} x2={graphWidth - padding} y2={graphHeight / 2} stroke="rgba(255,255,255,0.04)" strokeDasharray="2 2" />
          <line x1={padding} y1={padding} x2={graphWidth - padding} y2={padding} stroke="rgba(255,255,255,0.08)" strokeDasharray="2 2" />

          {/* Graph Path */}
          <path d={getPathData()} fill="none" stroke={lastColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "rgba(255,255,255,0.3)", fontWeight: "600" }}>
        <span>1D</span>
        <span>1W</span>
        <span>1M</span>
        <span>3M</span>
        <span>1Y</span>
        <span style={{ color: "rgba(255,255,255,0.6)" }}>ALL</span>
      </div>
    </div>
  );
};
