import React, { useState } from "react";
import TemplateLibrary from "./TemplateLibrary";
import DocumentEditor from "./DocumentEditor";
import LivePreview from "./LivePreview";
import ExportBar from "./ExportBar";
import SectionsFAB from "./SectionsFAB";

/**
 * MainContainer is the primary layout for ResumeCraft AI.
 * It contains the modular feature components:
 * - TemplateLibrary (left)
 * - DocumentEditor (left)
 * - LivePreview (right)
 * - ExportBar (right, below preview)
 * - SectionsFAB (floating fixed)
 *
 * Handles split-view layout and placement of core features.
 */
// Example/demo templates. In the future, these could be fetched or imported.
const TEMPLATES = [
  {
    id: "modern",
    name: "Modern Neon",
    accent: "#0ff0fc",
    preview: "linear-gradient(90deg, #0ff0fc 70%, #ff00cc 100%)"
  },
  {
    id: "classic",
    name: "Classic Elegance",
    accent: "#e87a41",
    preview: "linear-gradient(100deg, #e87a41 50%, #1a1a2e 100%)"
  },
  {
    id: "minimal",
    name: "Minimal Glow",
    accent: "#ff00cc",
    preview: "linear-gradient(90deg, #ff00cc 60%, #0ff0fc 100%)"
  }
];

// PUBLIC_INTERFACE
function MainContainer() {
  // Manage selected template in the MainContainer
  const [selectedTemplateId, setSelectedTemplateId] = useState(TEMPLATES[0].id);

  // Find full template object by id
  const selectedTemplate =
    TEMPLATES.find((tpl) => tpl.id === selectedTemplateId) || TEMPLATES[0];

  return (
    <div
      style={{
        display: "flex",
        gap: "32px",
        minHeight: "calc(100vh - 80px)", // account for navbar
        paddingTop: "24px",
        paddingBottom: "24px",
        paddingLeft: "16px",
        paddingRight: "16px",
        boxSizing: "border-box",
        position: "relative"
      }}
    >
      {/* Left Column: Template Library and Document Editor */}
      <div
        style={{
          flex: "0 0 360px",
          minWidth: 0,
          display: "flex",
          flexDirection: "column",
          gap: "16px"
        }}
      >
        <section
          style={{
            background: "rgba(26,26,46,0.7)",
            borderRadius: 8,
            padding: 16,
            marginBottom: 12,
            border: "1px solid var(--border-color, #222)"
          }}
        >
          <TemplateLibrary
            templates={TEMPLATES}
            selectedTemplateId={selectedTemplateId}
            onSelectTemplate={setSelectedTemplateId}
          />
        </section>
        <section
          style={{
            background: "rgba(26,26,46,0.7)",
            borderRadius: 8,
            padding: 16,
            flexGrow: 1,
            border: "1px solid var(--border-color, #222)"
          }}
        >
          <DocumentEditor selectedTemplate={selectedTemplate} />
        </section>
      </div>
      {/* Right Column: Live Preview and ExportBar */}
      <div
        style={{
          flex: "1 1 auto",
          minWidth: 0,
          display: "flex",
          flexDirection: "column",
          gap: "16px"
        }}
      >
        <section
          style={{
            background: "rgba(26,26,46,0.85)",
            borderRadius: 8,
            padding: 16,
            border: "1px solid var(--border-color, #222)",
            minHeight: "340px",
            marginBottom: 12
          }}
        >
          <LivePreview selectedTemplate={selectedTemplate} />
        </section>
        <section
          style={{
            background: "rgba(38,14,38,0.8)",
            borderRadius: 8,
            padding: 14,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            border: "1px solid var(--border-color, #333)"
          }}
        >
          <ExportBar />
        </section>
      </div>
      {/* Floating Action Button for Sections */}
      <SectionsFAB />
    </div>
  );
}

export default MainContainer;
