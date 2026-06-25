import React from "react";

export const InputOTP = ({
  length = 6,
  label = "Enter verification code",
  helperText = "We've sent a code to your email",
  onChange = () => {},
  onComplete = () => {},
  onResend = () => {},
  state = "default", // "default" | "loading" | "error" | "success"
  errorText = "Invalid code. Please try again.",
  successText = "Code verified successfully!",
  showResend = true,
  resendCooldown = 60,
  bg = "#000000",
  text = "#ffffff",
  accent = "#3b82f6"
}) => {
  const [digits, setDigits] = React.useState(Array(length).fill(""));
  const [isActive, setIsActive] = React.useState(false);
  const [showPlaceholder, setShowPlaceholder] = React.useState(true);
  const inputRefs = React.useRef([]);
  const [focusedIndex, setFocusedIndex] = React.useState(-1);
  const [resendTimer, setResendTimer] = React.useState(0);

  const boxSize = Math.max(40, Math.min(56, Math.floor(360 / length) - 12));
  const fontSize = Math.max(18, Math.floor(boxSize * 0.5));
  const gap = 10;

  const placeholder = "248531";

  // Resend timer effect
  React.useEffect(() => {
    if (resendTimer > 0) {
      const interval = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(interval);
    }
  }, [resendTimer]);

  const setDigitAt = (index, val) => {
    const next = [...digits];
    next[index] = val;
    setDigits(next);
    onChange(next.join(""));
    if (next.every((d) => d !== "")) onComplete(next.join(""));
  };

  const handleContainerClick = () => {
    if (!isActive && state !== "loading") {
      setIsActive(true);
      setShowPlaceholder(false);
      setDigits(Array(length).fill(""));
      setTimeout(() => inputRefs.current[0]?.focus(), 0);
    }
  };

  const handleChange = (index, e) => {
    if (state === "loading") return;
    const raw = e.target.value.replace(/[^0-9]/g, "");
    if (!raw) {
      setDigitAt(index, "");
      return;
    }
    const char = raw.slice(-1);
    setDigitAt(index, char);
    if (index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (state === "loading") return;
    if (e.key === "Backspace") {
      if (digits[index] === "" && index > 0) {
        inputRefs.current[index - 1]?.focus();
        setDigitAt(index - 1, "");
      } else {
        setDigitAt(index, "");
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    if (state === "loading") return;
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/[^0-9]/g, "").slice(0, length);
    if (!pasted) return;
    const next = Array(length).fill("");
    for (let i = 0; i < pasted.length; i++) next[i] = pasted[i];
    setDigits(next);
    onChange(next.join(""));
    if (next.every((d) => d !== "")) onComplete(next.join(""));
  };

  const handleResend = () => {
    onResend();
    setResendTimer(resendCooldown);
  };

  const isComplete = digits.every((d) => d !== "");
  const isBorderError = state === "error";
  const isBorderSuccess = state === "success";
  const isLoading = state === "loading";

  return (
    <div
      style={{
        display: "inline-flex",
        flexDirection: "column",
        background: bg,
        padding: 32,
        borderRadius: 12,
        border: `1px solid ${
          isBorderSuccess
            ? accent
            : isBorderError
            ? "#ef4444"
            : text === "#ffffff"
            ? "rgba(255,255,255,0.15)"
            : "rgba(0,0,0,0.08)"
        }`,
        fontFamily: "system-ui, -apple-system, sans-serif",
        cursor: !isActive ? "pointer" : "default",
        boxShadow:
          isBorderSuccess || isBorderError
            ? `0 0 0 2px ${isBorderSuccess ? accent : "#ef4444"}20`
            : "0 1px 3px rgba(0,0,0,0.3)",
        transition: "border-color 0.3s, box-shadow 0.3s"
      }}
    >
      {/* Label */}
      <div style={{ marginBottom: 8 }}>
        <label
          style={{
            display: "block",
            fontSize: 14,
            fontWeight: 600,
            color: text,
            marginBottom: 4,
            letterSpacing: "-0.01em"
          }}
        >
          {label}
        </label>
        <p
          style={{
            fontSize: 12,
            color: text === "#ffffff" ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.55)",
            margin: 0,
            lineHeight: 1.4
          }}
        >
          {state === "error"
            ? errorText
            : state === "success"
            ? successText
            : helperText}
        </p>
      </div>

      {/* Input boxes */}
      <div
        style={{
          display: "flex",
          gap,
          position: "relative",
          marginBottom: 20,
          marginTop: 12,
          opacity: isLoading ? 0.5 : 1,
          transition: "opacity 0.2s"
        }}
      >
        {Array(length)
          .fill(null)
          .map((_, i) => {
            const isFocused = focusedIndex === i;
            const isFilled = digits[i] !== "";
            const showPlaceholderDigit = showPlaceholder && placeholder[i];

            return (
              <input
                key={i}
                ref={(el) => (inputRefs.current[i] = el)}
                value={digits[i]}
                inputMode="numeric"
                maxLength={1}
                onChange={(e) => {
                  if (!isActive) {
                    setIsActive(true);
                    setShowPlaceholder(false);
                  }
                  handleChange(i, e);
                }}
                onKeyDown={(e) => handleKeyDown(i, e)}
                onFocus={() => {
                  if (!isActive) {
                    setIsActive(true);
                    setShowPlaceholder(false);
                  }
                  setFocusedIndex(i);
                }}
                onBlur={() => setFocusedIndex(-1)}
                onPaste={handlePaste}
                style={{
                  width: boxSize,
                  height: boxSize,
                  textAlign: "center",
                  fontSize,
                  fontWeight: 700,
                  fontFamily: "'JetBrains Mono', 'SF Mono', 'Monaco', monospace",
                  color: text,
                  background: isFilled
                    ? text === "#ffffff"
                      ? "rgba(255,255,255,0.08)"
                      : "rgba(0,0,0,0.04)"
                    : "transparent",
                  border:
                    isFocused && !isBorderError
                      ? `2px solid ${isBorderSuccess ? accent : text}`
                      : isFilled
                      ? `2px solid ${
                          isBorderError
                            ? "#ef4444"
                            : isBorderSuccess
                            ? accent
                            : text === "#ffffff"
                            ? "rgba(255,255,255,0.3)"
                            : "rgba(0,0,0,0.2)"
                        }`
                      : `2px solid ${
                          isBorderError
                            ? "#ef4444"
                            : text === "#ffffff"
                            ? "rgba(255,255,255,0.2)"
                            : "rgba(0,0,0,0.06)"
                        }`,
                  borderRadius: 8,
                  outline: "none",
                  caretColor: "transparent",
                  transition: "all 0.2s cubic-bezier(0.4,0,0.2,1)",
                  opacity: isLoading ? 0.5 : 1,
                  cursor: "text"
                }}
                placeholder={showPlaceholderDigit && !isActive ? showPlaceholderDigit : ""}
              />
            );
          })}

        {/* Loading spinner */}
        {isLoading && (
          <div
            style={{
              position: "absolute",
              right: -40,
              top: "50%",
              transform: "translateY(-50%)",
              width: 20,
              height: 20,
              borderRadius: "50%",
              border: `2px solid ${text === "#ffffff" ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.1)"}`,
              borderTopColor: accent,
              animation: "spin 0.8s linear infinite"
            }}
          />
        )}
      </div>

      {/* Resend button */}
      {showResend && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 13,
            color: text === "#ffffff" ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.6)"
          }}
        >
          <span>Didn't receive the code? </span>
          <button
            onClick={handleResend}
            disabled={resendTimer > 0 || isLoading}
            style={{
              background: "none",
              border: "none",
              color: resendTimer > 0 ? (text === "#ffffff" ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)") : accent,
              cursor: resendTimer > 0 || isLoading ? "not-allowed" : "pointer",
              fontWeight: 600,
              fontSize: 13,
              padding: "0 4px",
              textDecoration: "none",
              transition: "color 0.2s"
            }}
          >
            {resendTimer > 0 ? `Resend in ${resendTimer}s` : "Resend"}
          </button>
        </div>
      )}

      {/* CSS for spinner animation */}
      <style>{`
        @keyframes spin {
          to { transform: translateY(-50%) rotate(360deg); }
        }
      `}</style>
    </div>
  );
};