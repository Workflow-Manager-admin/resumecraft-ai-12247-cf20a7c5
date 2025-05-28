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
function TemplateLibrary({ templates = [], onSelectTemplate, selectedTemplateId }) {
  return (
    <div>
      <h2 style={{ color: "#0ff0fc" }}>Template Library</h2>
      <div style={{
        display: "flex",
        gap: 16,
        margin: "20px 0",
        flexWrap: "wrap"
      }}>
        {templates.map((tpl) => (
          <button
            key={tpl.id}
            style={{
              border: tpl.id === selectedTemplateId ? "3px solid #0ff0fc" : "2px solid #444",
              background: tpl.preview,
              color: "#fff",
              borderRadius: 10,
              minWidth: 78,
              minHeight: 74,
              cursor: "pointer",
              boxShadow: tpl.id === selectedTemplateId
                ? "0 0 14px #0ff0fc, 0 0 2px #fff"
                : "0 2px 10px #1115",
              opacity: tpl.id === selectedTemplateId ? 1 : 0.88,
              position: "relative"
            }}
            title={tpl.name}
            aria-pressed={tpl.id === selectedTemplateId}
            onClick={() => onSelectTemplate && onSelectTemplate(tpl.id)}
          >
            <span style={{
              fontWeight: 700,
              fontSize: ".98rem",
              textShadow: "0 0 2px #fff, 0 0 8px #0ff0fc",
              display: "inline-block",
              marginBottom: 3
            }}>
              {tpl.name}
            </span>
            {tpl.id === selectedTemplateId && (
              <span style={{
                fontSize: "1.3rem",
                color: "#0ff0fc",
                position: "absolute",
                top: 7,
                right: 10,
                textShadow: "0 0 10px #fff, 0 0 2px #0ff0fc"
              }}>★</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

export default TemplateLibrary;
