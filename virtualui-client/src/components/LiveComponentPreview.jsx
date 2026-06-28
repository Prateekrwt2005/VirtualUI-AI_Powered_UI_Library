import React, { useEffect, useRef, useState, useCallback } from "react";
import { LiveError, LivePreview, LiveProvider } from "react-live";
import { motion } from "motion/react";
import { FiRefreshCw } from "react-icons/fi";
import * as FiIcons from "react-icons/fi";
import * as HiIcons from "react-icons/hi2";
import * as IoIcons from "react-icons/io5";
import * as LuIcons from "react-icons/lu";
import * as FaIcons from "react-icons/fa6";
import * as MdIcons from "react-icons/md";
import * as TbIcons from "react-icons/tb";
import * as BsIcons from "react-icons/bs";
import * as AiIcons from "react-icons/ai";

export const LiveComponentPreview = ({ code }) => {
  const [refreshKey, setRefreshKey] = useState(0);

  const refreshPreview = () => {
    setRefreshKey((prev) => prev + 1);
  };

  let sanitized = code
    .replace(/import\s+.*?from\s+['"].*?['"];?/g, "")
    .replace(/export\s+/g, "");

  sanitized = sanitized
    .replace(/position\s*:\s*['"]fixed['"]/g, 'position: "absolute"')
    .replace(/position\s*:\s*"fixed"/g, 'position: "absolute"')
    .replace(/\bfixed\b/g, "absolute");

  const match = sanitized.match(/const\s+([A-Z]\w+)/);
  const componentName = match ? match[1] : null;

  const wrappedCode = componentName
    ? `${sanitized}\n\nrender(<${componentName} />)`
    : sanitized;

  return (
    <div style={{ position: "relative", width: "100%", maxWidth: "100%" }}>
      <LiveProvider
        key={refreshKey}
        code={wrappedCode}
        scope={{
          React,
          useState,
          useEffect,
          useRef,
          useCallback,
          ...FiIcons,
          ...HiIcons,
          ...IoIcons,
          ...LuIcons,
          ...FaIcons,
          ...MdIcons,
          ...TbIcons,
          ...BsIcons,
          ...AiIcons,
        }}
        noInline
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            width: "100%",
            border: "1px solid rgba(255,255,255,.08)",
            borderRadius: "14px",
            background: "#0b0b0d",
            overflow: "hidden",
            boxShadow:
              "0 8px 24px rgba(0,0,0,.3), inset 0 1px 0 rgba(255,255,255,.03)",
          }}
        >
          {/* Header bar */}
          <div
            style={{
              height: 40,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 14px",
              background: "#121316",
              borderBottom: "1px solid rgba(255,255,255,.06)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              {["#ff5f57", "#febc2e", "#28c840"].map((color) => (
                <div
                  key={color}
                  style={{
                    width: 9,
                    height: 9,
                    borderRadius: "50%",
                    background: color,
                  }}
                />
              ))}
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span
                style={{
                  color: "rgba(255,255,255,.45)",
                  fontSize: 11,
                  fontWeight: 500,
                  fontFamily: "Gilroy",
                }}
              >
                Live Preview
              </span>

              <motion.button
                onClick={refreshPreview}
                whileTap={{ scale: 0.9, rotate: 180 }}
                transition={{ type: "spring", stiffness: 300 }}
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 8,
                  border: "1px solid rgba(255,255,255,.06)",
                  background: "#1b1d22",
                  color: "#94a3b8",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <FiRefreshCw size={13} />
              </motion.button>
            </div>
          </div>

          {/* Preview area — no zoom, natural size, compact padding */}
          <div
            style={{
              width: "100%",
              minHeight: "200px",
              background: "#09090b",
              padding: "20px 16px",
              overflow: "auto",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <LivePreview />
          </div>
        </motion.div>

        <LiveError
          style={{
            marginTop: "8px",
            padding: "10px 12px",
            background: "#450a0a",
            color: "#f87171",
            borderRadius: "8px",
            fontSize: "12px",
            fontFamily: "monospace",
            overflowX: "auto",
          }}
        />

        {!componentName && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              marginTop: "8px",
              padding: "10px 12px",
              background: "#1e293b",
              borderRadius: "8px",
              color: "#94a3b8",
              fontSize: "12px",
            }}
          >
            Preview is not available. Copy the code and paste it into your
            project.
          </motion.div>
        )}
      </LiveProvider>
    </div>
  );
};