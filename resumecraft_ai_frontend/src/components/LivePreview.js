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
function LivePreview(/* { documentData, template } */) {
  return (
    <div>
      {/* TODO: Render live preview of document with template styling */}
      <h2 style={{ color: "#0ff0fc" }}>Live Preview</h2>
      <p style={{ color: "var(--text-secondary)", fontSize: ".98rem" }}>
        Real-time preview of your resume or cover letter.<br />[Component stub]
      </p>
    </div>
  );
}

export default LivePreview;
