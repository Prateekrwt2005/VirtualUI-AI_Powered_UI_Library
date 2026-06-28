import React, { useState, useEffect } from "react";

const MediaPlayer= ({
  title = "Blinding Lights",
  artist = "The Weeknd",
  artwork = "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400",
  duration = 242,
}) => {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(62);

  useEffect(() => {
    if (!playing) return;

    const timer = setInterval(() => {
      setProgress((p) => {
        if (p >= duration) return 0;
        return p + 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [playing, duration]);

  const format = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div
      style={{
        width: 360,
        background: "rgba(24,24,24,.95)",
        border: "1px solid rgba(255,255,255,.06)",
        borderRadius: 24,
        padding: 22,
        color: "#fff",
        fontFamily: "Inter,sans-serif",
        boxShadow: "0 20px 50px rgba(0,0,0,.35)",
        backdropFilter: "blur(20px)",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 18,
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <img
          src={artwork}
          alt=""
          style={{
            width: 72,
            height: 72,
            borderRadius: 18,
            objectFit: "cover",
          }}
        />

        <div style={{ flex: 1 }}>
          <div
            style={{
             fontFamily:"Inter, sans-serif",
fontWeight: 700,
fontSize: 20,
letterSpacing: "-0.03em",
            }}
          >
            {title}
          </div>

          <div
            style={{
              fontFamily: "Inter, sans-serif",
fontWeight: 500,
fontSize: 14,
color: "#9ca3af",
            }}
          >
            {artist}
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 18,
          marginBottom: 22,
        }}
      >
        <button
          style={btn}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = "scale(1.08)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.transform = "scale(1)")
          }
        >
          ⏮
        </button>

        <button
          onClick={() => setPlaying(!playing)}
          style={{
            ...btn,
            width: 58,
            height: 58,
            background: "#1DB954",
            color: "#fff",
            fontSize: 24,
            boxShadow: "0 10px 25px rgba(29,185,84,.45)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.08)";
            e.currentTarget.style.background = "#21d760";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.background = "#1DB954";
          }}
        >
          {playing ? "❚❚" : "▶"}
        </button>

        <button
          style={btn}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = "scale(1.08)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.transform = "scale(1)")
          }
        >
          ⏭
        </button>
      </div>
      <div>
        <input
          type="range"
          min={0}
          max={duration}
          value={progress}
          onChange={(e) => setProgress(Number(e.target.value))}
          style={{
            width: "100%",
            accentColor: "#1DB954",
            cursor: "pointer",
            marginBottom: 10,
          }}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            color: "#8b8b8b",
            fontSize: 12,
            fontWeight: 500,
          }}
        >
          <span>{format(progress)}</span>
          <span>{format(duration)}</span>
        </div>
      </div>
    </div>
  );
};

const btn = {
  width: 48,
  height: 48,
  borderRadius: "50%",
  border: "none",
  background: "#262626",
  color: "#fff",
  fontSize: 20,
  cursor: "pointer",
  transition: ".25s",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

render(
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background:
        "radial-gradient(circle at top,#1f2937 0%,#0f172a 45%,#020617 100%)",
      padding: 30,
    }}
  >
    <MediaPlayer/>
  </div>
);