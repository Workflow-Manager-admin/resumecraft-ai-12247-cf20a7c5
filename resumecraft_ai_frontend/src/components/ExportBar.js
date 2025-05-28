import React from "react";

/**
 * ExportBar
 * ---------
 * Purpose: Provides export and download options for the rendered document (PDF, Word, etc).
 * Shows notification stubs and a demo export for PDF.
 *
 * Props:
 * - documentData: object (optional, for demo PDF/Word export)
 * - disabled: bool (for loading states)
 */
// PUBLIC_INTERFACE
function ExportBar({ documentData, disabled }) {
  // Handler for PDF
  function handleExportPDF() {
    // Demo export: Try client-side generation (very simple proof-of-concept)
    if (documentData) {
      // Naive HTML to PDF using browser print as proof-of-concept
      // In real-world: use libraries like jsPDF, html2pdf.js
      const element = document.createElement("div");
      element.style.fontFamily = "Arial, sans-serif";
      element.style.padding = "20px";
      element.innerHTML = `
        <h2 style="color:#0ff0fc; margin-bottom:10px;">${documentData.basics.name || "Your Name"}</h2>
        <div><strong>Email:</strong> ${documentData.basics.email || ""}</div>
        <div><strong>Phone:</strong> ${documentData.basics.phone || ""}</div>
        <div><strong>LinkedIn:</strong> ${documentData.basics.linkedin || ""}</div>
        <div style="margin-top:10px;"><strong>Summary:</strong> ${documentData.summary || ""}</div>
        <div style="margin-top:18px;">
        <strong>Sections:</strong><br/>
        ${
          Array.isArray(documentData.sections)
            ? documentData.sections.map(
                sec =>
                  `<b>${sec.label}</b><ul>${(sec.items || [])
                    .map(
                      i =>
                        `<li style="margin-bottom:2px">${
                          i.title || i.degree || "[Entry]"
                        }${i.company ? " @ " + i.company : ""}
                        ${i.school ? " @ " + i.school : ""}
                        <br/><span style='font-size:.97rem;color:#888'>${i.description || ""}</span></li>`
                    )
                    .join("")}</ul>`
              ).join("<br/>")
            : ""
        }
        </div>
      `;
      const win = window.open("", "_blank");
      win.document.write(
        `<html><head><title>Resume PDF (Preview)</title></head><body>${element.innerHTML}</body></html>`
      );
      // Give new window a print button
      win.document.write(
        '<button onclick="window.print()" style="position:fixed;top:8px;right:8px;padding:8px 18px;font-size:1.15rem;border-radius:6px;border:2px solid #0ff0fc;z-index:999;">Print/Save as PDF</button>'
      );
      win.document.close();
    } else {
      window.alert("Simulated: PDF Export - Proof of concept\n(In real app, this would generate a PDF file.)");
    }
  }

  // Handler for Word export (stub only)
  function handleExportWord() {
    window.alert("Simulated: Word Export - This would generate and download a DOCX file in a real app.");
  }

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    }}>
      <div style={{ color: "#ff00cc", fontWeight: 500 }}>Export Options:</div>
      <div>
        <button
          className="btn"
          style={{ marginRight: 10 }}
          onClick={handleExportPDF}
          disabled={disabled}
        >
          Export PDF
        </button>
        <button
          className="btn"
          style={{ backgroundColor: "#0ff0fc", color: "#222" }}
          onClick={handleExportWord}
          disabled={disabled}
        >
          Export Word
        </button>
      </div>
    </div>
  );
}

export default ExportBar;
