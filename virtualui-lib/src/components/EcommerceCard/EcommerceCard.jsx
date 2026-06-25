import React, { useState } from "react";

export const EcommerceCard = ({
  productImage = "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
  productName = "Stylish Running Shoes",
  productDescription = "Experience ultimate comfort and performance with these lightweight running shoes.",
  price = 89.99,
  currency = "$",
  rating = 4.5,
  reviews = 120,
  ctaText = "Add to Cart",
  accent = "#0ea5e9",
  bg = "#0f172a",
  onCtaClick = () => {}
}) => {
  const [hovered, setHovered] = useState(false);
  const alpha = (hex, op) => {
    const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
    return "rgba(" + r + "," + g + "," + b + "," + op + ")";
  };
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: bg,
        borderRadius: "16px",
        overflow: "hidden",
        width: "280px",
        border: "1px solid " + (hovered ? alpha(accent, 0.4) : "rgba(255,255,255,0.08)"),
        fontFamily: "system-ui,sans-serif",
        transition: "transform 0.3s, box-shadow 0.3s",
        transform: hovered ? "translateY(-6px)" : "translateY(0px)",
        boxShadow: hovered ? "0 18px 45px rgba(0,0,0,0.5)" : "0 8px 25px rgba(0,0,0,0.3)"
      }}
    >
      <div style={{ position: "relative", width: "100%", height: "180px", overflow: "hidden" }}>
        <img src={productImage} alt={productName} style={{ width: "100%", height: "100%", objectFit: "cover", transform: hovered ? "scale(1.08)" : "scale(1)", transition: "transform 0.4s ease" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 60%)" }} />
      </div>
      <div style={{ padding: "18px" }}>
        <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#fff", margin: "0 0 8px", lineHeight: 1.4 }}>{productName}</h3>
        <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", lineHeight: 1.6, margin: "0 0 16px", height: "40px", overflow: "hidden" }}>{productDescription}</p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
          <div style={{ fontSize: "22px", fontWeight: "800", color: "#fff" }}>{currency}{price.toFixed(2)}</div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill={accent} stroke={accent} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
            <span style={{ fontSize: "13px", fontWeight: "600", color: "#fff" }}>{rating.toFixed(1)}</span>
            <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)" }}>({reviews} reviews)</span>
          </div>
        </div>
        <button
          onClick={onCtaClick}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "10px",
            border: "none",
            background: "linear-gradient(135deg, " + accent + ", " + alpha(accent, 0.7) + ")",
            color: "#fff",
            fontSize: "14px",
            fontWeight: "700",
            cursor: "pointer",
            fontFamily: "inherit",
            boxShadow: "0 6px 16px " + alpha(accent, 0.4),
            transition: "transform 0.2s, box-shadow 0.2s",
            transform: hovered ? "translateY(-2px)" : "translateY(0px)"
          }}
        >{ctaText}</button>
      </div>
    </div>
  );
};
