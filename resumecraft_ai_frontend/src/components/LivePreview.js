import React from "react";

/**
 * LivePreview
 * -----------
 * Purpose: Shows a real-time visual rendering/preview of the current document
 * (resume or cover letter). Helps the user see output as they edit in DocumentEditor.
 *
 * Props (planned):
 * - documentData: object (current doc state)
 * - template: object (selected template styling)
 * - (future) loading/preview status
 */
// PUBLIC_INTERFACE
function LivePreview({ selectedTemplate /*, documentData, template */ }) {
  return (
    <div>
      <h2
        style={{
          color: selectedTemplate?.accent || "#0ff0fc",
          textShadow: "0 0 6px #fff"
        }}
      >
        Live Preview
      </h2>
      <div
        style={{
          background: selectedTemplate?.preview,
          borderRadius: 8,
          padding: "18px 16px",
          marginBottom: 7,
          boxShadow: "0 0 18px #fff2, 0 0 1px #0ff0fc"
        }}
      >
        <span style={{ color: "#fff", fontWeight: 600, fontSize: "1.04rem" }}>
          <span role="img" aria-label="Template">
            📝
          </span>{" "}
          <span>Selected: {selectedTemplate?.name} ({selectedTemplate?.id})</span>
        </span>
      </div>
      <p style={{ color: "var(--text-secondary)", fontSize: ".98rem" }}>
        Real-time preview of your resume or cover letter.<br />[Component stub]
      </p>
    </div>
  );
}

export default LivePreview;
