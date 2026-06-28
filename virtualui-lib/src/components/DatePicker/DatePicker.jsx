import React from "react";
import { FiCalendar } from "react-icons/fi";

export const DatePicker = ({
  value = "",
  onChange = () => {},
  placeholder = "Select date",
  width = "320px",
  height = "52px",
  borderRadius = "14px",
  background = "#ffffff",
  borderColor = "#e5e7eb",
  textColor = "#111827",
  placeholderColor = "#9ca3af",
  iconColor = "#9ca3af",
  disabled = false,
}) => {
  return (
    <>
      <div
        style={{
          width,
          height,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background,
          border: `1px solid ${borderColor}`,
          borderRadius,
          padding: "0 16px",
          boxSizing: "border-box",
          transition: "0.25s ease",
          fontFamily: "Gilroy, sans-serif",
        }}
      >
        <input
          type="date"
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          style={{
            width: "100%",
            border: "none",
            outline: "none",
            background: "transparent",
            color: textColor,
            fontSize: "15px",
            fontWeight: 600,
            fontFamily: "Gilroy, sans-serif",
            cursor: disabled ? "not-allowed" : "pointer",
          }}
        />

        <FiCalendar
          size={18}
          style={{
            color: iconColor,
            flexShrink: 0,
            marginLeft: 10,
          }}
        />
      </div>

      <style>{`
        input[type="date"]::-webkit-calendar-picker-indicator{
          opacity:0;
          position:absolute;
          width:100%;
          height:100%;
          cursor:pointer;
        }

        input[type="date"]::-webkit-datetime-edit{
          color:${textColor};
          font-family:Gilroy,sans-serif;
          font-weight:600;
        }

        input[type="date"]::-webkit-datetime-edit-text{
          color:${placeholderColor};
        }

        input[type="date"]::-webkit-datetime-edit-month-field,
        input[type="date"]::-webkit-datetime-edit-day-field,
        input[type="date"]::-webkit-datetime-edit-year-field{
          color:${textColor};
        }

        input[type="date"]:invalid{
          color:${placeholderColor};
        }
      `}</style>
    </>
  );
};