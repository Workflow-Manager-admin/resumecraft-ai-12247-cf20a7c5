import React from "react";

/**
 * SectionsFAB
 * -----------
 * Purpose: Floating action button for managing document sections (add, remove, reorder sections).
 * Always visible, floating over main content.
 *
 * Props (planned):
 * - onAddSection: function
 * - (future) expanded/menu for reorder/remove/tips
 */
// PUBLIC_INTERFACE
function SectionsFAB(/* { onAddSection } */) {
  return (
    <button
      style={{
        position: "fixed",
        right: 32,
        bottom: 36,
        background: "linear-gradient(100deg, #0ff0fc 60%, #ff00cc 100%)",
        color: "#fff",
        border: "none",
        borderRadius: "50%",
        width: 60,
        height: 60,
        boxShadow: "0 2px 18px #0ff0fc55",
        fontSize: "2rem",
        fontWeight: 700,
        zIndex: 200,
        cursor: "pointer"
      }}
      title="Manage Sections"
    >
      +
    </button>
  );
}

export default SectionsFAB;
