const ProductShowCaseCard = () => {
  const [liked, setLiked] = useState(false);
  const [added, setAdded] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleAdd = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=DM+Sans:wght@300;400;500;600;700&display=swap');

        .psc-root * {
          box-sizing: border-box;
        }
      `}</style>

      <div className="psc-root" style={{
        width: 390,
        background: "#080808",
        borderRadius: 28,
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.06)",
        boxShadow: hovered
          ? "0 48px 96px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.09)"
          : "0 24px 64px rgba(0,0,0,0.7)",
        transition: "all 0.55s cubic-bezier(0.23, 1, 0.32, 1)",
        transform: hovered ? "translateY(-12px)" : "translateY(0)",
      }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >

        {/* Image Section */}
        <div style={{
          position: "relative",
          height: 340,
          background: "linear-gradient(160deg, #141414 0%, #0a0a0a 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}>

          {/* Ambient glow */}
          <div style={{
            position: "absolute",
            width: 300,
            height: 300,
            background: "radial-gradient(circle, rgba(255,220,120,0.05) 0%, transparent 70%)",
            borderRadius: "50%",
            transition: "all 0.6s ease",
            transform: hovered ? "scale(1.5)" : "scale(1)",
          }} />

          {/* Top controls */}
          <div style={{
            position: "absolute",
            top: 0, left: 0, right: 0,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "20px 22px",
            zIndex: 10,
          }}>
            <span style={{
              fontFamily: '"DM Sans", sans-serif',
              fontSize: 10,
              fontWeight: 500,
              letterSpacing: 3,
              color: "rgba(255,255,255,0.45)",
              textTransform: "uppercase",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
              padding: "7px 16px",
              borderRadius: 30,
              backdropFilter: "blur(12px)",
            }}>
              Limited Edition
            </span>

            <button
              onClick={() => setLiked(!liked)}
              style={{
                width: 42,
                height: 42,
                borderRadius: "50%",
                border: "1px solid rgba(255,255,255,0.09)",
                background: liked ? "rgba(239,68,68,0.12)" : "rgba(255,255,255,0.04)",
                backdropFilter: "blur(12px)",
                cursor: "pointer",
                fontSize: 17,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.3s ease",
                transform: liked ? "scale(1.15)" : "scale(1)",
              }}
            >
              <span style={{ color: liked ? "#ef4444" : "rgba(255,255,255,0.4)", lineHeight: 1 }}>
                {liked ? "♥" : "♡"}
              </span>
            </button>
          </div>

          {/* Product image */}
          <img
            src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=700"
            alt="Watch"
            style={{
              width: "62%",
              height: "62%",
              objectFit: "contain",
              transition: "all 0.65s cubic-bezier(0.23, 1, 0.32, 1)",
              transform: hovered ? "scale(1.1) translateY(-8px)" : "scale(1)",
              filter: hovered
                ? "drop-shadow(0 32px 48px rgba(0,0,0,0.7)) drop-shadow(0 0 60px rgba(255,210,80,0.08))"
                : "drop-shadow(0 16px 32px rgba(0,0,0,0.5))",
              position: "relative",
              zIndex: 2,
            }}
          />

          {/* Bottom fade */}
          <div style={{
            position: "absolute",
            bottom: 0, left: 0, right: 0,
            height: 100,
            background: "linear-gradient(to top, #080808, transparent)",
          }} />
        </div>

        {/* Content */}
        <div style={{ padding: "28px 28px 32px" }}>

          {/* Brand row */}
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 12,
          }}>
            <span style={{
              fontFamily: '"DM Sans", sans-serif',
              fontSize: 10,
              fontWeight: 500,
              color: "rgba(255,255,255,0.3)",
              textTransform: "uppercase",
              letterSpacing: 3,
            }}>
              Audemars Piguet
            </span>

            <div style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.07)",
              padding: "5px 12px",
              borderRadius: 20,
            }}>
              <span style={{ fontSize: 11, color: "#f59e0b" }}>★</span>
              <span style={{
                fontFamily: '"DM Sans", sans-serif',
                fontSize: 12,
                fontWeight: 600,
                color: "#fff"
              }}>4.9</span>
              <span style={{
                fontFamily: '"DM Sans", sans-serif',
                fontSize: 11,
                color: "rgba(255,255,255,0.25)"
              }}>(218)</span>
            </div>
          </div>

          {/* Title — Cormorant serif */}
          <h2 style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontSize: 30,
            fontWeight: 600,
            color: "#fff",
            margin: "0 0 10px 0",
            letterSpacing: "-0.3px",
            lineHeight: 1.15,
          }}>
            Royal Oak Offshore
          </h2>

          <p style={{
            fontFamily: '"DM Sans", sans-serif',
            fontSize: 13,
            fontWeight: 300,
            color: "rgba(255,255,255,0.28)",
            margin: "0 0 24px 0",
            lineHeight: 1.65,
            letterSpacing: 0.2,
          }}>
            42mm ceramic · Sapphire crystal · 50m water resistant
          </p>

          {/* Thin divider */}
          <div style={{
            height: 1,
            background: "linear-gradient(to right, rgba(255,255,255,0.08), transparent)",
            marginBottom: 24,
          }} />

          {/* Price + CTA */}
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}>
            <div>
              <div style={{
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: 34,
                fontWeight: 700,
                color: "#fff",
                letterSpacing: "-1px",
                lineHeight: 1,
              }}>
                $12,400
              </div>
              <div style={{
                fontFamily: '"DM Sans", sans-serif',
                fontSize: 12,
                fontWeight: 300,
                color: "rgba(255,255,255,0.2)",
                textDecoration: "line-through",
                marginTop: 5,
                letterSpacing: 0.3,
              }}>
                $15,900
              </div>
            </div>

            <button
              onClick={handleAdd}
              style={{
                height: 50,
                padding: "0 30px",
                borderRadius: 14,
                border: "none",
                background: added
                  ? "linear-gradient(135deg, #166534, #15803d)"
                  : "linear-gradient(135deg, #ffffff 0%, #d4d4d4 100%)",
                color: added ? "#fff" : "#000",
                fontFamily: '"DM Sans", sans-serif',
                fontWeight: 600,
                fontSize: 13,
                letterSpacing: 0.4,
                cursor: "pointer",
                transition: "all 0.35s cubic-bezier(0.23, 1, 0.32, 1)",
                boxShadow: added
                  ? "0 8px 28px rgba(22,101,52,0.35)"
                  : hovered
                    ? "0 12px 32px rgba(255,255,255,0.2)"
                    : "0 6px 20px rgba(255,255,255,0.1)",
                transform: added ? "scale(0.96)" : "scale(1)",
                whiteSpace: "nowrap",
              }}
            >
              {added ? "✓  Added" : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

render(<ProductShowCaseCard />);