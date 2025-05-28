import React from "react";

/**
 * TemplateLibrary
 * ----------------
 * Purpose: Displays a gallery or list of available resume/cover letter templates.
 * Intended to help users select or switch between professionally designed document templates.
 *
 * Props (planned):
 * - templates: Array of available templates
 * - onSelectTemplate: function(templateId)
 * - selectedTemplateId: string
 * - (future) isLoading, error, etc.
 */
 // PUBLIC_INTERFACE
function TemplateLibrary(/* { templates, onSelectTemplate, selectedTemplateId } */) {
  return (
    <div>
      {/* TODO: Render template thumbnails/cards for selection */}
      <h2 style={{ color: "#0ff0fc" }}>Template Library</h2>
      <p style={{ color: "var(--text-secondary)", fontSize: ".98rem" }}>
        Select from a variety of resume and cover letter templates.<br />[Component stub]
      </p>
    </div>
  );
}

export default TemplateLibrary;
