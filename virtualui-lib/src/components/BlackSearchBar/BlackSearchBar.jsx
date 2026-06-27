import React, { useState } from "react";
import { FiSearch, FiX } from "react-icons/fi";

export const BlackSearchBar= ({
  value,
  onChange,
  onSearch = () => {},
  placeholder = "Search components...",
  clearable = true,
  disabled = false,
  autoFocus = false,
  loading = false,
  width = "340px",
  bg = "#09090b",
  text = "#ffffff",
  accent = "#ffffff",
  border = "#27272a",
}) => {
  const [internalValue, setInternalValue] = useState("");
  const [focused, setFocused] = useState(false);

  const isControlled = value !== undefined;

  const inputValue = isControlled ? value : internalValue;

  const handleChange = (val) => {
    if (!isControlled) {
      setInternalValue(val);
    }

    onChange?.(val);
  };

  return (
    <div
      style={{
        width,
        height: "54px",
        background: bg,
        borderRadius: "16px",
        border: `1px solid ${
          focused ? "rgba(255,255,255,.14)" : border
        }`,
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "0 16px",
        transition: "all .25s ease",
        boxShadow: focused
          ? "0 0 0 4px rgba(255,255,255,.03)"
          : "0 8px 24px rgba(0,0,0,.25)",
        fontFamily: "Gilroy, sans-serif",
      }}
    >
      <FiSearch
        size={18}
        style={{
          color: focused
            ? accent
            : "rgba(255,255,255,.55)",
          transition: ".2s",
          flexShrink: 0,
        }}
      />

      <input
        value={inputValue}
        disabled={disabled}
        autoFocus={autoFocus}
        placeholder={placeholder}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={(e) => handleChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onSearch(inputValue);
          }
        }}
        style={{
          flex: 1,
          height: "100%",
          background: "transparent",
          border: "none",
          outline: "none",
          color: text,
          fontSize: "15px",
          fontWeight: "600",
          letterSpacing: "-0.01em",
          fontFamily: "Gilroy, sans-serif",
        }}
      />

      {loading && (
        <div
          style={{
            width: "16px",
            height: "16px",
            borderRadius: "50%",
            border: "2px solid rgba(255,255,255,.15)",
            borderTopColor: accent,
            animation: "obsidian-spin .8s linear infinite",
          }}
        />
      )}

      {!loading && clearable && inputValue && (
        <button
          onClick={() => handleChange("")}
          style={{
            width: "30px",
            height: "30px",
            borderRadius: "8px",
            border: "none",
            background: "rgba(255,255,255,.05)",
            color: "rgba(255,255,255,.55)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: ".2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background =
              "rgba(255,255,255,.08)";
            e.currentTarget.style.color = "#fff";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background =
              "rgba(255,255,255,.05)";
            e.currentTarget.style.color =
              "rgba(255,255,255,.55)";
          }}
        >
          <FiX size={15} />
        </button>
      )}

      <style>{`
        input::placeholder{
          color: rgba(255,255,255,.42);
          font-weight:500;
        }

        @keyframes obsidian-spin{
          to{
            transform:rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};