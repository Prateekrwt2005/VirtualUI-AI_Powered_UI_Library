import React, { useState } from "react";

export const ProfileCard = ({
  name = "Aryan Rao",
  role = "Product Designer",
  location = "Mumbai, India",
  bio = "Crafting intuitive digital experiences. Obsessed with clean interfaces and purposeful design systems.",
  followers = 2847,
  following = 312,
  projects = 14,
  tags = ["Figma", "UI/UX", "Prototyping", "React"],
  accentColor = "#6366f1",
  coverColor = "#6366f1",
  isFollowing: initialFollow = false,
}) => {
  const [isFollowing, setIsFollowing] = useState(initialFollow);
  const [followerCount, setFollowerCount] = useState(followers);
  const [hoveredBtn, setHoveredBtn] = useState(null);

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const toggleFollow = () => {
    setIsFollowing((prev) => !prev);

    setFollowerCount((count) =>
      isFollowing ? count - 1 : count + 1
    );
  };

  const fmt = (n) =>
    n >= 1000 ? (n / 1000).toFixed(1) + "k" : n;

  const s = {
    card: {
      background: "#ffffff",
      borderRadius: "20px",
      maxWidth: "360px",
      width: "100%",
      overflow: "hidden",
      fontFamily: "'Georgia', serif",
      boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
      border: "1px solid #f0f0f0",
    },

    cover: {
      height: "100px",
      background: `linear-gradient(135deg, ${coverColor}cc, ${coverColor}66)`,
      position: "relative",
    },

    coverPattern: {
      position: "absolute",
      inset: 0,
      backgroundImage: `radial-gradient(${coverColor}33 1.5px, transparent 1.5px)`,
      backgroundSize: "20px 20px",
    },

    avatarWrap: {
      position: "absolute",
      bottom: "-26px",
      left: "24px",
    },

    avatar: {
      width: "56px",
      height: "56px",
      borderRadius: "50%",
      background: accentColor,
      border: "3px solid #ffffff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "18px",
      fontWeight: "700",
      color: "#ffffff",
      letterSpacing: "-0.5px",
    },

    body: {
      padding: "36px 24px 24px",
    },

    nameRow: {
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between",
      marginBottom: "4px",
    },

    name: {
      margin: 0,
      fontSize: "18px",
      fontWeight: "bold",
      color: "#111827",
      letterSpacing: "-0.3px",
    },

    role: {
      margin: "2px 0 0",
      fontSize: "13px",
      color: accentColor,
      fontFamily: "sans-serif",
      fontWeight: "500",
    },

    location: {
      display: "flex",
      alignItems: "center",
      gap: "4px",
      margin: "6px 0 0",
      fontSize: "12px",
      color: "#9ca3af",
      fontFamily: "sans-serif",
    },

    bio: {
      margin: "14px 0",
      fontSize: "13.5px",
      color: "#4b5563",
      lineHeight: "1.65",
      fontFamily: "sans-serif",
    },

    statsRow: {
      display: "flex",
      marginBottom: "16px",
      background: "#f9fafb",
      borderRadius: "12px",
      overflow: "hidden",
      border: "1px solid #f0f0f0",
    },

    stat: {
      flex: 1,
      padding: "12px 8px",
      textAlign: "center",
      borderRight: "1px solid #f0f0f0",
    },

    statVal: {
      margin: 0,
      fontSize: "17px",
      fontWeight: "700",
      color: "#111827",
    },

    statLabel: {
      margin: "2px 0 0",
      fontSize: "11px",
      color: "#9ca3af",
      fontFamily: "sans-serif",
      textTransform: "uppercase",
      letterSpacing: "0.4px",
    },

    tagsRow: {
      display: "flex",
      gap: "6px",
      flexWrap: "wrap",
      marginBottom: "18px",
    },

    tag: {
      fontSize: "12px",
      padding: "4px 10px",
      borderRadius: "8px",
      border: `1px solid ${accentColor}33`,
      color: accentColor,
      background: `${accentColor}0d`,
      fontFamily: "monospace",
    },

    btnRow: {
      display: "flex",
      gap: "10px",
    },

    followBtn: {
      flex: 1,
      padding: "10px",
      borderRadius: "10px",
      border: "none",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: "600",
      fontFamily: "sans-serif",
      transition: "all 0.2s ease",
      background: isFollowing
        ? "#f3f4f6"
        : hoveredBtn === "follow"
        ? accentColor + "ee"
        : accentColor,
      color: isFollowing ? "#374151" : "#ffffff",
      boxShadow: isFollowing
        ? "none"
        : `0 2px 8px ${accentColor}44`,
    },

    msgBtn: {
      padding: "10px 16px",
      borderRadius: "10px",
      border: "1.5px solid #e5e7eb",
      cursor: "pointer",
      fontSize: "14px",
      fontFamily: "sans-serif",
      background:
        hoveredBtn === "msg"
          ? "#f9fafb"
          : "#ffffff",
      color: "#374151",
      transition: "all 0.2s ease",
    },
  };

  return (
    <div style={s.card}>
      <div style={s.cover}>
        <div style={s.coverPattern} />

        <div style={s.avatarWrap}>
          <div style={s.avatar}>{initials}</div>
        </div>
      </div>

      <div style={s.body}>
        <div style={s.nameRow}>
          <div>
            <p style={s.name}>{name}</p>
            <p style={s.role}>{role}</p>
          </div>
        </div>

        <div style={s.location}>
          <span>📍</span>
          {location}
        </div>

        <p style={s.bio}>{bio}</p>

        <div style={s.statsRow}>
          {[
            {
              label: "Followers",
              value: fmt(followerCount),
            },
            {
              label: "Following",
              value: fmt(following),
            },
            {
              label: "Projects",
              value: projects,
            },
          ].map((item, i, arr) => (
            <div
              key={item.label}
              style={{
                ...s.stat,
                borderRight:
                  i < arr.length - 1
                    ? "1px solid #f0f0f0"
                    : "none",
              }}
            >
              <p style={s.statVal}>{item.value}</p>
              <p style={s.statLabel}>{item.label}</p>
            </div>
          ))}
        </div>

        <div style={s.tagsRow}>
          {tags.map((tag) => (
            <span key={tag} style={s.tag}>
              {tag}
            </span>
          ))}
        </div>

        <div style={s.btnRow}>
          <button
            style={s.followBtn}
            onClick={toggleFollow}
            onMouseEnter={() =>
              setHoveredBtn("follow")
            }
            onMouseLeave={() =>
              setHoveredBtn(null)
            }
          >
            {isFollowing
              ? "✓ Following"
              : "+ Follow"}
          </button>

          <button
            style={s.msgBtn}
            onMouseEnter={() =>
              setHoveredBtn("msg")
            }
            onMouseLeave={() =>
              setHoveredBtn(null)
            }
          >
            💬 Message
          </button>
        </div>
      </div>
    </div>
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
      <ProfileCard />

      <ProfileCard
        name="Priya Mehta"
        role="Frontend Engineer"
        location="Bengaluru, India"
        bio="Building fast, accessible web apps. TypeScript evangelist. Coffee-driven developer with a love for open source."
        followers={5120}
        following={198}
        projects={28}
        tags={[
          "React",
          "TypeScript",
          "Node.js",
          "OSS",
        ]}
        accentColor="#8b5cf6"
        coverColor="#8b5cf6"
        isFollowing={true}
      />
    </div>
  );
}