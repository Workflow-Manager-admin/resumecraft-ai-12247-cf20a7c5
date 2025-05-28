import React from "react";

/**
 * ExportBar
 * ---------
 * Purpose: Provides export and download options for the rendered document (PDF, Word, etc).
 * May also include print/action buttons and settings.
 *
 * Props (planned):
 * - onExportPDF: function
 * - onExportWord: function
 * - disabled: bool (for loading states)
 * - (future) export status, additional formats
 */
// PUBLIC_INTERFACE
function ExportBar(/* { onExportPDF, onExportWord, disabled } */) {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    }}>
      <div style={{ color: "#ff00cc", fontWeight: 500 }}>Export Options:</div>
      <div>
        {/* TODO: Hook up actions to export callbacks */}
        <button className="btn" style={{ marginRight: 10 }}>Export PDF</button>
        <button className="btn" style={{ backgroundColor: "#0ff0fc", color: "#222" }}>Export Word</button>
      </div>
    </div>
  );
}

export default ExportBar;
