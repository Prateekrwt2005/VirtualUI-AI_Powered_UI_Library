import React, { useState } from "react";

export const Button = ({
  title = "Toggle Card",
  description = "Click to expand and reveal more content.",
  expandedContent = "Here's the hidden content! You can put anything here — details, settings, extra info.",
  accentColor = "#6EE7B7",
  bgColor = "#1a1a2e",
  textColor = "#f0f0f0",
  size = "md",
  icon = "✦",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const sizes = {
    sm: { padding: "16px 20px", fontSize: "14px", titleSize: "16px", width: "280px" },
    md: { padding: "22px 28px", fontSize: "15px", titleSize: "20px", width: "360px" },
    lg: { padding: "30px 36px", fontSize: "16px", titleSize: "24px", width: "460px" },
  };

  const s = sizes[size] || sizes.md;

  const styles = {
    card: {
      width: s.width,
      background: bgColor,
      border: `1.5px solid ${isOpen ? accentColor : isHovered ? accentColor + "80" : "#ffffff15"}`,
      borderRadius: "16px",
      padding: s.padding,
      cursor: "pointer",
      fontFamily: "'Georgia', serif",
      color: textColor,
      boxShadow: isOpen
        ? `0 0 28px ${accentColor}33, 0 8px 32px #00000060`
        : isHovered
        ? "0 6px 24px #00000050"
        : "0 2px 12px #00000040",
      transform: isHovered && !isOpen ? "translateY(-2px)" : "translateY(0)",
      transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
      userSelect: "none",
    },
    header: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "12px",
    },
    iconWrapper: {
      width: "36px",
      height: "36px",
      borderRadius: "50%",
      background: `${accentColor}22`,
      border: `1px solid ${accentColor}55`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "16px",
      flexShrink: 0,
      transition: "all 0.3s ease",
      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
    },
    title: {
      fontSize: s.titleSize,
      fontWeight: "bold",
      margin: 0,
      letterSpacing: "-0.3px",
      color: isOpen ? accentColor : textColor,
      transition: "color 0.3s ease",
      flex: 1,
    },
    chevron: {
      fontSize: "12px",
      color: accentColor,
      transition: "transform 0.35s ease",
      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
      opacity: 0.8,
    },
    description: {
      margin: "12px 0 0 0",
      fontSize: s.fontSize,
      color: textColor + "aa",
      lineHeight: "1.55",
    },
    divider: {
      height: "1px",
      background: `linear-gradient(to right, ${accentColor}44, transparent)`,
      margin: "16px 0",
      opacity: isOpen ? 1 : 0,
      transition: "opacity 0.3s ease",
    },
    expandedArea: {
      overflow: "hidden",
      maxHeight: isOpen ? "300px" : "0px",
      opacity: isOpen ? 1 : 0,
      transition: "max-height 0.4s ease, opacity 0.3s ease",
    },
    expandedText: {
      fontSize: s.fontSize,
      color: textColor + "cc",
      lineHeight: "1.7",
      margin: 0,
      paddingBottom: "4px",
    },
    tag: {
      display: "inline-block",
      marginTop: "14px",
      padding: "4px 10px",
      borderRadius: "20px",
      background: `${accentColor}18`,
      border: `1px solid ${accentColor}44`,
      color: accentColor,
      fontSize: "11px",
      letterSpacing: "0.5px",
      fontFamily: "monospace",
    },
  };

  return (
    <div
      style={styles.card}
      onClick={() => setIsOpen((o) => !o)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="button"
      aria-expanded={isOpen}
    >
      <div style={styles.header}>
        <div style={styles.iconWrapper}>{icon}</div>
        <p style={styles.title}>{title}</p>
        <span style={styles.chevron}>▼</span>
      </div>

      <p style={styles.description}>{description}</p>

      <div style={styles.divider} />

      <div style={styles.expandedArea}>
        <p style={styles.expandedText}>{expandedContent}</p>
        <span style={styles.tag}>expanded ✓</span>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0d0d1a",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "24px",
        padding: "40px 20px",
      }}
    >
      <ToggleCard />

      <ToggleCard
        title="Notifications"
        description="Manage how and when you receive alerts."
        expandedContent="You have 3 unread notifications. Email digests are sent every Monday. Push alerts are enabled for critical events only."
        accentColor="#93C5FD"
        icon="🔔"
        size="md"
      />

      <ToggleCard
        title="Danger Zone"
        description="Irreversible actions live here. Proceed carefully."
        expandedContent="Deleting your account is permanent. All data, history, and preferences will be erased. This cannot be undone."
        accentColor="#F87171"
        icon="⚠"
        size="lg"
      />
    </div>
  );
}