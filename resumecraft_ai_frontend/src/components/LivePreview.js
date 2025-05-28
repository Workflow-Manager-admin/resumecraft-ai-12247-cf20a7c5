import React from "react";

/**
 * LivePreview
 * -----------
 * Purpose: Shows a real-time visual rendering/preview of the current document
 * (resume or cover letter). Updates as user edits in DocumentEditor.
 *
 * Props:
 * - selectedTemplate: object
 * - documentData: object (current doc state)
 */

// PUBLIC_INTERFACE
function LivePreview({ selectedTemplate, documentData }) {
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
      <div style={{
        color: "var(--text-secondary)", fontSize: ".97rem", marginTop: 7, marginBottom: 9
      }}>
        {/* Trivial Preview, expand with styles/templates later */}
        <div style={{ marginBottom: 10 }}>
          <span style={{ color: selectedTemplate?.accent, fontWeight: 700, fontSize: "1.17rem" }}>
            {documentData?.basics?.name}
          </span>
          <span style={{ marginLeft: 12, fontStyle: "italic" }}>{documentData?.basics?.email}</span>
          <span style={{ marginLeft: 9, color: "#8ecfef" }}>{documentData?.basics?.phone}</span>
        </div>
        <div>
          <strong>Summary:</strong>
          <div style={{ color: "#fff", fontWeight: 400, marginBottom: 10 }}>
            {documentData?.summary}
          </div>
        </div>
        <div>
          {documentData?.sections?.map((sec, sidx) => (
            <div key={sec.id} style={{ marginBottom: 8 }}>
              <span style={{ color: selectedTemplate?.accent, fontWeight: 600 }}>
                {sec.label}
              </span>
              <ul style={{ marginTop: 2, marginBottom: 2 }}>
                {(sec.items || []).map((item, idx) => (
                  <li key={idx} style={{ color: "#fff" }}>
                    {item.title || item.degree || item.company || ""}
                    {(item.company || item.school) && <> @ {item.company || item.school}</>}
                    {(item.startDate || item.endDate) && (
                      <> ({item.startDate}{item.endDate ? ` - ${item.endDate}` : ""})</>
                    )}
                    {item.description && (
                      <div style={{ marginLeft: 4, color: "#bbb" }}>{item.description}</div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <p style={{ color: "var(--text-secondary)", fontSize: ".98rem" }}>
        Real-time preview of your resume or cover letter.<br />
        [This is a starter stub. Full rendering will match template design.]
      </p>
    </div>
  );
}

export default LivePreview;
