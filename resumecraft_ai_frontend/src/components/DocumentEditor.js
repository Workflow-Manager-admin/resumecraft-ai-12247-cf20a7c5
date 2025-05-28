import React from "react";

/**
 * DocumentEditor
 * --------------
 * Purpose: The main form-based or WYSIWYG editor where users enter and edit their resume or cover letter content.
 * Intended to support smart suggestions, grammar/tone checking, and section management.
 *
 * Props (planned):
 * - documentData: object (current doc state)
 * - onChange: function(field, value)
 * - suggestions: array (AI or pre-written content suggestions)
 * - errors: object (field-level validation)
 * - (future) section editing callbacks
 */
// PUBLIC_INTERFACE
function DocumentEditor({ selectedTemplate /*, documentData, onChange, suggestions, errors */ }) {
  return (
    <div>
      <h2 style={{ color: selectedTemplate?.accent || "#ff00cc" }}>
        Document Editor
      </h2>
      <p style={{ color: "var(--text-secondary)", fontSize: ".98rem" }}>
        <span>
          Form-based editor for resume and cover letter content.
        </span>
        <br />
        <span>
          <strong>Selected Template:</strong>{" "}
          <span style={{ color: selectedTemplate?.accent, fontWeight: 600 }}>
            {selectedTemplate?.name} ({selectedTemplate?.id})
          </span>
        </span>
      </p>
    </div>
  );
}

export default DocumentEditor;
