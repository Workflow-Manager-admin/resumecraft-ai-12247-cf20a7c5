import React from "react";
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
// PUBLIC_INTERFACE
function MainContainer() {
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
          <TemplateLibrary />
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
          <DocumentEditor />
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
          <LivePreview />
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
