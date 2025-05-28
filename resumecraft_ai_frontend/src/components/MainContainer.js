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

/*
PUBLIC_INTERFACE
MainContainer manages:
- selectedTemplate (template info)
- documentData (resume sections/fields)
- section management (add/remove/reorder)
- shares state with DocumentEditor and LivePreview
*/

function getDefaultDocumentData() {
  // Initial structure for a new resume document
  return {
    basics: {
      name: "",
      email: "",
      phone: "",
      linkedin: "",
      github: "",
      address: ""
    },
    summary: "",
    sections: [
      {
        id: "work",
        type: "work",
        label: "Work Experience",
        items: [
          // Example default entry
        ]
      },
      {
        id: "education",
        type: "education",
        label: "Education",
        items: []
      }
    ]
  };
}

function MainContainer() {
  // Manage selected template
  const [selectedTemplateId, setSelectedTemplateId] = useState(TEMPLATES[0].id);

  // Manage resume/cv document state
  const [documentData, setDocumentData] = useState(getDefaultDocumentData());

  // Section management for add/remove/reorder operations
  // Add section
  function handleAddSection() {
    const newSection = {
      id: `custom_${Date.now()}`,
      type: "custom",
      label: "Custom Section",
      items: []
    };
    setDocumentData((doc) => ({
      ...doc,
      sections: [...doc.sections, newSection]
    }));
  }

  // Remove section at index
  function handleRemoveSection(idx) {
    setDocumentData((doc) => ({
      ...doc,
      sections: doc.sections.filter((_, i) => i !== idx)
    }));
  }

  // Move section (drag+drop or buttons)
  function handleMoveSection(fromIdx, toIdx) {
    if (
      fromIdx < 0 ||
      fromIdx >= documentData.sections.length ||
      toIdx < 0 ||
      toIdx >= documentData.sections.length
    ) {
      return;
    }
    const updated = [...documentData.sections];
    const [moved] = updated.splice(fromIdx, 1);
    updated.splice(toIdx, 0, moved);
    setDocumentData((doc) => ({
      ...doc,
      sections: updated
    }));
  }

  // Update document fields/sections via DocumentEditor
  function handleDocumentChange(field, value) {
    if (field === "basics" || field === "summary") {
      setDocumentData((doc) => ({
        ...doc,
        [field]: value
      }));
    } else if (field.startsWith("section-")) {
      // For section-level edits (e.g. section-0: {label:..., items:[...]})
      // value = partial update for that section
      const idx = parseInt(field.split("-")[1], 10);
      setDocumentData((doc) => {
        const newSections = doc.sections.slice();
        newSections[idx] = { ...newSections[idx], ...value };
        return { ...doc, sections: newSections };
      });
    }
  }

  // Find full template object
  const selectedTemplate =
    TEMPLATES.find((tpl) => tpl.id === selectedTemplateId) || TEMPLATES[0];

  return (
    <div
      style={{
        display: "flex",
        gap: "32px",
        minHeight: "calc(100vh - 80px)",
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
          <DocumentEditor
            selectedTemplate={selectedTemplate}
            documentData={documentData}
            onChange={handleDocumentChange}
            onAddSection={handleAddSection}
            onRemoveSection={handleRemoveSection}
            onMoveSection={handleMoveSection}
          />
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
          <LivePreview
            selectedTemplate={selectedTemplate}
            documentData={documentData}
          />
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
      {/* Floating Action Button for Sections - add only */}
      <SectionsFAB onAddSection={handleAddSection} />
    </div>
  );
}

export default MainContainer;
