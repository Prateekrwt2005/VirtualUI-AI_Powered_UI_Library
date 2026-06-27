import React, { useState } from "react";
import { FiSearch, FiX } from "react-icons/fi";

export const WhiteSearchBar = ({
  value,
  onChange,
  onSearch = () => {},
  placeholder = "Search components...",
  clearable = true,
  disabled = false,
  autoFocus = false,
  loading = false,
  width = "340px",
  bg = "#ffffff",
  text = "#111827",
  accent = "#111827",
  border = "#e5e7eb",
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
        height: "56px",
        background: bg,
        borderRadius: "16px",
        border: `1px solid ${
          focused ? "#111827" : border
        }`,
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "0 18px",
        transition: "all .25s ease",
        boxShadow: focused
          ? "0 0 0 4px rgba(17,24,39,.06)"
          : "0 8px 24px rgba(0,0,0,.08)",
        fontFamily: "Gilroy, sans-serif",
      }}
    >
      <FiSearch
        size={19}
        style={{
          color: focused ? accent : "#6b7280",
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
            border: "2px solid #d1d5db",
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
            background: "#f3f4f6",
            color: "#6b7280",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: ".2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#111827";
            e.currentTarget.style.color = "#ffffff";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#f3f4f6";
            e.currentTarget.style.color = "#6b7280";
          }}
        >
          <FiX size={15} />
        </button>
      )}

      <style>{`
        input::placeholder{
          color:#9ca3af;
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