const ProfileCard = () => {
  const [followed, setFollowed] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <>
      <style>{`
        @import url('https://fonts.cdnfonts.com/css/gilroy-free');

        .profile-card * {
          box-sizing: border-box;
        }
      `}</style>

      <div
        className="profile-card"
        style={{
          width: 360,
          background: "linear-gradient(160deg, #faf8f4 0%, #f5f1ea 100%)",
          borderRadius: 28,
          overflow: "hidden",
          fontFamily: '"Gilroy", sans-serif',
          border: "1px solid rgba(180,160,120,0.15)",
          boxShadow: hovered
            ? "0 40px 80px rgba(100,80,40,0.14), 0 0 0 1px rgba(180,150,100,0.12)"
            : "0 16px 48px rgba(100,80,40,0.08)",
          transition: "all 0.55s cubic-bezier(0.23, 1, 0.32, 1)",
          transform: hovered ? "translateY(-8px)" : "translateY(0)",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >

        {/* Header Banner */}
        <div style={{
          height: 110,
          background: "linear-gradient(135deg, #1a1612 0%, #2c2418 50%, #1a1612 100%)",
          position: "relative",
          overflow: "hidden",
        }}>
          <div style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(212,180,120,0.15) 0%, transparent 60%),
                              radial-gradient(circle at 80% 20%, rgba(212,180,120,0.08) 0%, transparent 50%)`,
          }} />

          {/* Watermark */}
          <div style={{
            position: "absolute",
            right: 20,
            bottom: -14,
            fontFamily: '"Gilroy", sans-serif',
            fontSize: 88,
            fontWeight: 800,
            color: "rgba(255,255,255,0.03)",
            letterSpacing: -4,
            userSelect: "none",
            lineHeight: 1,
          }}>
            AM
          </div>

          {/* Status */}
          <div style={{
            position: "absolute",
            top: 20,
            right: 22,
            display: "flex",
            alignItems: "center",
            gap: 6,
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.09)",
            padding: "5px 13px",
            borderRadius: 20,
            backdropFilter: "blur(10px)",
          }}>
            <div style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#4ade80",
              boxShadow: "0 0 6px rgba(74,222,128,0.9)",
            }} />
            <span style={{
              fontFamily: '"Gilroy", sans-serif',
              fontSize: 10,
              fontWeight: 600,
              color: "rgba(255,255,255,0.5)",
              letterSpacing: 2,
              textTransform: "uppercase",
            }}>Available</span>
          </div>
        </div>

        {/* Avatar */}
        <div style={{
          position: "relative",
          marginTop: -48,
          paddingLeft: 28,
          marginBottom: 4,
          zIndex: 10,
        }}>
          <div style={{
            width: 94,
            height: 94,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #c9a96e, #e8d5b0)",
            padding: 3,
            boxShadow: "0 8px 28px rgba(100,70,20,0.2), 0 0 0 1px rgba(200,160,80,0.25)",
            display: "inline-block",
          }}>
            <div style={{
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              overflow: "hidden",
            }}>
              <img
                src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=200&h=200&fit=crop&crop=face"
                alt="Profile"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.4s ease",
                  transform: hovered ? "scale(1.07)" : "scale(1)",
                }}
              />
            </div>
          </div>

          {/* Verified */}
          <div style={{
            position: "absolute",
            bottom: 2,
            left: 90,
            width: 24,
            height: 24,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #c9a96e, #b8935a)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 11,
            fontWeight: 700,
            color: "#fff",
            border: "2.5px solid #faf8f4",
            boxShadow: "0 2px 8px rgba(180,130,60,0.35)",
          }}>
            ✓
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: "6px 28px 30px" }}>

          {/* Name */}
          <h2 style={{
            fontFamily: '"Gilroy", sans-serif',
            fontSize: 26,
            fontWeight: 800,
            color: "#1a1612",
            margin: "0 0 4px 0",
            letterSpacing: "-0.5px",
            lineHeight: 1.15,
          }}>
            Amélie Moreau
          </h2>

          {/* Designation */}
          <p style={{
            fontFamily: '"Gilroy", sans-serif',
            fontSize: 11,
            fontWeight: 600,
            color: "#c9a96e",
            textTransform: "uppercase",
            letterSpacing: 3,
            margin: "0 0 18px 0",
          }}>
            Creative Director · Paris
          </p>

          {/* Divider */}
          <div style={{
            height: 1,
            background: "linear-gradient(to right, rgba(180,150,100,0.22), transparent)",
            marginBottom: 16,
          }} />

          {/* Bio */}
          <p style={{
            fontFamily: '"Gilroy", sans-serif',
            fontSize: 13.5,
            fontWeight: 400,
            color: "rgba(50,38,24,0.5)",
            lineHeight: 1.75,
            margin: "0 0 20px 0",
            letterSpacing: 0.1,
          }}>
            Crafting narratives through visual language. Passionate about timeless design, luxury branding & the art of slow living.
          </p>

          {/* Tags */}
          <div style={{
            display: "flex",
            gap: 8,
            flexWrap: "wrap",
            marginBottom: 22,
          }}>
            {["Branding", "Editorial", "Art Direction"].map(tag => (
              <span key={tag} style={{
                fontFamily: '"Gilroy", sans-serif',
                fontSize: 11,
                fontWeight: 600,
                color: "rgba(100,75,35,0.55)",
                background: "rgba(180,140,70,0.07)",
                border: "1px solid rgba(180,140,70,0.16)",
                padding: "5px 14px",
                borderRadius: 20,
                letterSpacing: 0.6,
              }}>
                {tag}
              </span>
            ))}
          </div>

          {/* Stats */}
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            background: "rgba(180,140,70,0.05)",
            border: "1px solid rgba(180,140,70,0.11)",
            borderRadius: 16,
            padding: "16px 20px",
            marginBottom: 22,
          }}>
            {[["12.4k", "Followers"], ["348", "Projects"], ["9y", "Experience"]].map(([val, label], i) => (
              <div key={label} style={{
                textAlign: "center",
                flex: 1,
                borderRight: i < 2 ? "1px solid rgba(180,140,70,0.14)" : "none",
              }}>
                <div style={{
                  fontFamily: '"Gilroy", sans-serif',
                  fontSize: 20,
                  fontWeight: 800,
                  color: "#1a1612",
                  letterSpacing: "-0.5px",
                  lineHeight: 1,
                  marginBottom: 5,
                }}>
                  {val}
                </div>
                <div style={{
                  fontFamily: '"Gilroy", sans-serif',
                  fontSize: 10,
                  fontWeight: 500,
                  color: "rgba(100,75,35,0.4)",
                  textTransform: "uppercase",
                  letterSpacing: 1.8,
                }}>
                  {label}
                </div>
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div style={{ display: "flex", gap: 10 }}>
            <button
              onClick={() => setFollowed(!followed)}
              style={{
                flex: 1,
                height: 48,
                borderRadius: 13,
                border: "none",
                background: followed
                  ? "rgba(26,22,18,0.08)"
                  : "linear-gradient(135deg, #1a1612, #2c2418)",
                color: followed ? "#1a1612" : "#f5f1ea",
                fontFamily: '"Gilroy", sans-serif',
                fontWeight: 700,
                fontSize: 13.5,
                letterSpacing: 0.3,
                cursor: "pointer",
                transition: "all 0.3s ease",
                border: followed ? "1px solid rgba(26,22,18,0.15)" : "none",
                boxShadow: followed ? "none" : "0 8px 24px rgba(26,22,18,0.2)",
              }}
            >
              {followed ? "✓  Following" : "Follow"}
            </button>

            <button style={{
              width: 48,
              height: 48,
              borderRadius: 13,
              border: "1px solid rgba(180,140,70,0.2)",
              background: "transparent",
              color: "#c9a96e",
              fontSize: 18,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.3s ease",
            }}>
              ✉
            </button>

            <button style={{
              width: 48,
              height: 48,
              borderRadius: 13,
              border: "1px solid rgba(180,140,70,0.2)",
              background: "transparent",
              color: "#c9a96e",
              fontSize: 17,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.3s ease",
            }}>
              ↗
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

render(<ProfileCard />);