import React,{ useState } from "react";

export const Card = ({
  name = "Aryan Rao",
  role = "Product Designer",
  location = "Mumbai",
  isOnline = true,
  currentActivity = "Working on checkout redesign",
  lastUpdated = "12 min ago",
  tags = ["Figma", "UI/UX", "Prototyping"],
  stats = [
    { label: "Projects", value: 14 },
    { label: "Streak", value: "7d" },
    { label: "Reviews", value: 4.9 },
  ],
  accentColor = "#3b82f6",
}) => {
  const [hovered, setHovered] = useState(false);

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const styles = {
    card: {
      background: "#ffffff",
      border: `1px solid ${hovered ? "#d1d5db" : "#e5e7eb"}`,
      borderRadius: "16px",
      padding: "24px",
      maxWidth: "380px",
      width: "100%",
      fontFamily: "'Georgia', serif",
      transition: "box-shadow 0.2s ease, border-color 0.2s ease",
      boxShadow: hovered
        ? "0 8px 24px rgba(0,0,0,0.08)"
        : "0 2px 8px rgba(0,0,0,0.04)",
    },
    header: {
      display: "flex",
      alignItems: "center",
      gap: "14px",
      marginBottom: "16px",
    },
    avatarWrap: { position: "relative", flexShrink: 0 },
    avatar: {
      width: "52px",
      height: "52px",
      borderRadius: "50%",
      background: accentColor + "18",
      border: `1.5px solid ${accentColor}33`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: "600",
      fontSize: "16px",
      color: accentColor,
    },
    statusDot: {
      position: "absolute",
      bottom: "2px",
      right: "2px",
      width: "10px",
      height: "10px",
      borderRadius: "50%",
      background: isOnline ? "#22c55e" : "#9ca3af",
      border: "2px solid #ffffff",
    },
    nameRow: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      marginBottom: "3px",
    },
    name: {
      margin: 0,
      fontSize: "16px",
      fontWeight: "bold",
      color: "#111827",
    },
    onlineBadge: {
      fontSize: "11px",
      color: "#16a34a",
      background: "#dcfce7",
      padding: "2px 8px",
      borderRadius: "20px",
      fontFamily: "monospace",
    },
    subtext: {
      margin: 0,
      fontSize: "13px",
      color: "#6b7280",
      fontFamily: "sans-serif",
    },
    tagsRow: {
      display: "flex",
      gap: "6px",
      flexWrap: "wrap",
      marginBottom: "16px",
    },
    tag: {
      fontSize: "12px",
      padding: "3px 10px",
      borderRadius: "8px",
      border: "1px solid #e5e7eb",
      color: "#374151",
      background: "#f9fafb",
      fontFamily: "sans-serif",
    },
    divider: {
      border: "none",
      borderTop: "1px solid #f3f4f6",
      margin: "0 0 16px",
    },
    nowLabel: {
      margin: "0 0 8px",
      fontSize: "11px",
      color: "#9ca3af",
      fontFamily: "monospace",
      letterSpacing: "0.8px",
      textTransform: "uppercase",
    },
    nowRow: {
      display: "flex",
      alignItems: "flex-start",
      gap: "10px",
      marginBottom: "16px",
    },
    pulse: {
      width: "8px",
      height: "8px",
      borderRadius: "50%",
      background: accentColor,
      flexShrink: 0,
      marginTop: "5px",
      animation: "pulse 2s infinite",
    },
    activityText: {
      margin: 0,
      fontSize: "14px",
      color: "#1f2937",
      lineHeight: "1.5",
    },
    updatedText: {
      margin: "3px 0 0",
      fontSize: "12px",
      color: "#9ca3af",
      fontFamily: "sans-serif",
    },
    statsRow: {
      display: "flex",
      gap: "10px",
    },
    stat: {
      flex: 1,
      background: "#f9fafb",
      borderRadius: "10px",
      padding: "10px 12px",
      textAlign: "center",
    },
    statLabel: {
      margin: "0 0 4px",
      fontSize: "11px",
      color: "#9ca3af",
      fontFamily: "sans-serif",
    },
    statValue: {
      margin: 0,
      fontSize: "20px",
      fontWeight: "bold",
      color: "#111827",
    },
  };

  return (
    <>
      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>
      <div
        style={styles.card}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div style={styles.header}>
          <div style={styles.avatarWrap}>
            <div style={styles.avatar}>{initials}</div>
            <div style={styles.statusDot} />
          </div>
          <div>
            <div style={styles.nameRow}>
              <p style={styles.name}>{name}</p>
              {isOnline && <span style={styles.onlineBadge}>online</span>}
            </div>
            <p style={styles.subtext}>
              {role} · {location}
            </p>
          </div>
        </div>

        <div style={styles.tagsRow}>
          {tags.map((t) => (
            <span key={t} style={styles.tag}>{t}</span>
          ))}
        </div>

        <hr style={styles.divider} />

        <p style={styles.nowLabel}>Now</p>
        <div style={styles.nowRow}>
          <div style={styles.pulse} />
          <div>
            <p style={styles.activityText}>{currentActivity}</p>
            <p style={styles.updatedText}>Last updated {lastUpdated}</p>
          </div>
        </div>

        <div style={styles.statsRow}>
          {stats.map((s) => (
            <div key={s.label} style={styles.stat}>
              <p style={styles.statLabel}>{s.label}</p>
              <p style={styles.statValue}>{s.value}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f3f4f6",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
        gap: "24px",
        flexWrap: "wrap",
      }}
    >
      <NowCard />

      <NowCard
        name="Priya Mehta"
        role="Frontend Engineer"
        location="Bengaluru"
        isOnline={false}
        currentActivity="Reviewing PR #204 — auth flow refactor"
        lastUpdated="1 hr ago"
        tags={["React", "TypeScript", "Node"]}
        accentColor="#8b5cf6"
        stats={[
          { label: "Commits", value: 312 },
          { label: "PRs", value: 28 },
          { label: "Rating", value: "5.0" },
        ]}
      />
    </div>
  );
}