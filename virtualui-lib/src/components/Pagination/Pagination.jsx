import React, { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export const Pagination = ({
  totalPages = 10,
  initialPage = 1,
  onPageChange = () => {},
  activeColor = "#f3f4f6",
  primaryColor = "#ff8c1a",
  textColor = "#2F80ED",
  activeTextColor = "#111827",
  borderColor = "#e5e7eb",
  radius = 8,
  gap = 8,
  buttonSize = 42,
  navButtonWidth = 50,
  navButtonHeight = 42,
}) => {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const changePage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    onPageChange(page);
  };

  const getPages = () => {
    const pages = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }

    if (currentPage <= 4) {
      return [1, 2, 3, 4, 5, "...", totalPages];
    }

    if (currentPage >= totalPages - 3) {
      return [
        1,
        "...",
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    return [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages,
    ];
  };

  const pageButtonStyle = {
    width: buttonSize,
    height: buttonSize,
    border: `1px solid ${borderColor}`,
    borderRadius: radius,
    background: "#fff",
    color: textColor,
    fontFamily: "Gilroy, sans-serif",
    fontWeight: 700,
    fontSize: 15,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all .25s ease",
    userSelect: "none",
  };

  const navButtonStyle = {
    width: navButtonWidth,
    height: navButtonHeight,
    border: "none",
    borderRadius: radius,
    background: primaryColor,
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: ".25s",
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap,
        fontFamily: "Gilroy, sans-serif",
      }}
    >
      {/* Previous */}
      <button
        onClick={() => changePage(currentPage - 1)}
        disabled={currentPage === 1}
        style={{
          ...navButtonStyle,
          opacity: currentPage === 1 ? 0.5 : 1,
          cursor: currentPage === 1 ? "not-allowed" : "pointer",
        }}
      >
        <FiChevronLeft size={20} />
      </button>

      {getPages().map((page, index) =>
        page === "..." ? (
          <span
            key={`dots-${index}`}
            style={{
              width: 24,
              textAlign: "center",
              color: "#9ca3af",
              fontWeight: 700,
              fontSize: 16,
              userSelect: "none",
            }}
          >
            ...
          </span>
        ) : (
          <button
            key={`page-${page}`}
            onClick={() => changePage(page)}
            style={{
              ...pageButtonStyle,
              background:
                page === currentPage ? activeColor : "#ffffff",
              color:
                page === currentPage
                  ? activeTextColor
                  : textColor,
            }}
            onMouseEnter={(e) => {
              if (page !== currentPage) {
                e.currentTarget.style.transform =
                  "translateY(-2px)";
                e.currentTarget.style.boxShadow =
                  "0 8px 18px rgba(0,0,0,.08)";
              }
            }}
            onMouseLeave={(e) => {
              if (page !== currentPage) {
                e.currentTarget.style.transform =
                  "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }
            }}
          >
            {page}
          </button>
        )
      )}

      {/* Next */}
      <button
        onClick={() => changePage(currentPage + 1)}
        disabled={currentPage === totalPages}
        style={{
          ...navButtonStyle,
          opacity: currentPage === totalPages ? 0.5 : 1,
          cursor:
            currentPage === totalPages
              ? "not-allowed"
              : "pointer",
        }}
      >
        <FiChevronRight size={20} />
      </button>
    </div>
  );
};