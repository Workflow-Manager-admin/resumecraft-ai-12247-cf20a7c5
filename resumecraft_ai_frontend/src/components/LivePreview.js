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

/**
 * LivePreview
 * Shows a real-time, print-style, minimalist, visually organized resume using neon-glitter cues.
 * Updates live from props.
 */
// PUBLIC_INTERFACE
function LivePreview({ selectedTemplate, documentData }) {
  // Palette
  const accent = selectedTemplate?.accent || "#0ff0fc";
  const glitter = "0 0 8px #fff, 0 0 18px " + accent + ", 0 1px 6px #fff8";
  const printBg = "#fff";
  const printText = "#212130";
  const printSubtle = "#3c3c4e";
  const shadow = "0 4px 32px #0ff0fc40, 0 0 0.5px #ff00cc60";
  const divider = `linear-gradient(90deg, ${accent}, #fff 90%)`;

  // Contact Line helpers
  const { name, email, phone, linkedin, github, address } = documentData?.basics || {};

  return (
    <div>
      {/* Neon-glitter header */}
      <h2 className="neon-header" style={{
        color: accent,
        textShadow: glitter,
        marginBottom: 16
      }}>
        Resume Preview
      </h2>
      {/* Print-style box with neon-glitter border, scaled for preview */}
      <div
        className="glitter-border"
        style={{
          background: printBg,
          color: printText,
          borderRadius: "13px",
          minHeight: "520px",
          maxWidth: 600,
          margin: "0 auto 16px auto",
          boxShadow: shadow,
          fontFamily: "'Inter','Segoe UI','Orbitron',sans-serif",
          padding: "38px 44px 38px 44px",
          position: "relative",
          overflow: "auto",
          filter: "drop-shadow(0 0 13px #0ff0fc44)",
          outline: `3px solid ${accent}44`,
        }}
      >
        {/* HEADER: NAME, ROLE */}
        <div style={{
          marginBottom: 10,
        }}>
          <h1 style={{
            fontSize: "2.1rem",
            fontFamily: "'Orbitron','Inter',sans-serif",
            color: accent,
            fontWeight: 700,
            margin: 0,
            letterSpacing: ".035em",
            textShadow: glitter,
            lineHeight: 1.08
          }}>
            {name || <span style={{ color: "#aaa" }}>Your Name</span>}
          </h1>
          <div style={{
            marginTop: 5,
            display: "flex",
            flexWrap: "wrap",
            gap: "16px 18px",
            alignItems: "center",
            fontSize: "1.01rem",
            color: printSubtle
          }}>
            {email && (
              <span>
                <span role="img" aria-label="email">✉️</span> <a href={`mailto:${email}`} style={{ color: accent, textDecoration: "none" }}>{email}</a>
              </span>
            )}
            {phone && (
              <span>
                <span role="img" aria-label="phone">📞</span> {phone}
              </span>
            )}
            {linkedin && (
              <span>
                <span role="img" aria-label="linkedin">💼</span>
                <a href={/^https?:\/\//.test(linkedin) ? linkedin : `https://linkedin.com/in/${linkedin}`} target="_blank" rel="noopener noreferrer" style={{ color: accent, textDecoration: "none" }}>
                  {linkedin.replace(/^https?:\/\//, "")}
                </a>
              </span>
            )}
            {github && (
              <span>
                <span role="img" aria-label="github">🐙</span>
                <a href={/^https?:\/\//.test(github) ? github : `https://github.com/${github}`} target="_blank" rel="noopener noreferrer" style={{ color: accent, textDecoration: "none" }}>
                  {github.replace(/^https?:\/\//, "")}
                </a>
              </span>
            )}
            {address && (
              <span>
                <span role="img" aria-label="home">🏠</span> {address}
              </span>
            )}
          </div>
        </div>
        {/* DIVIDER */}
        <div style={{
          margin: "18px 0 12px 0",
          height: 3.5,
          borderRadius: 7,
          background: divider,
          boxShadow: "0 0 12px " + accent
        }}/>
        {/* SUMMARY */}
        {documentData?.summary && (
          <div style={{
            marginBottom: 12,
            fontSize: "1.07rem",
            color: "#2b283a",
            background: "#f8faff",
            padding: "10px 13px 10px 16px",
            borderRadius: 7,
            boxShadow: "0 0 12px #0ff0fc22",
            borderLeft: `4px solid ${accent}`,
            lineHeight: 1.52,
            fontStyle: "italic"
          }}>
            {documentData.summary}
          </div>
        )}
        {/* SECTIONS */}
        {Array.isArray(documentData?.sections) && documentData.sections.map((sec, sidx) =>
          (sec.items||[]).length === 0 ? null : (
          <section key={sec.id || sidx} style={{
            marginBottom: 20,
            position: "relative",
          }}>
            {/* Section label */}
            <h3 style={{
              color: accent,
              margin: 0,
              fontSize: "1.025rem",
              fontFamily: "'Orbitron','Inter',sans-serif",
              letterSpacing: ".07em",
              fontWeight: 800,
              textTransform: "uppercase",
              textShadow: glitter,
              borderBottom: `2.2px solid ${accent}`,
              display: "inline-block",
              paddingRight: 10,
              marginBottom: 5
            }}>
              {sec.label}
            </h3>
            <div>
              {(sec.items||[]).map((item, idx) => {
                if (sec.type === "work") {
                  return (
                    <div key={idx} style={{
                      margin: "11px 0",
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                      borderLeft: `2.5px solid ${accent}22`,
                      paddingLeft: 13
                    }}>
                      <div style={{
                        fontWeight: 700,
                        fontSize: "1.06rem",
                        color: printText
                      }}>
                        {item.title ? item.title : <span style={{ color: "#bbb" }}>[Job Title]</span>}
                        {item.company && <span style={{ color: accent, marginLeft: 7 }}>@ {item.company}</span>}
                      </div>
                      <div style={{
                        fontSize: ".96rem",
                        color: printSubtle,
                        marginBottom: 1,
                        display: "flex",
                        gap: 12
                      }}>
                        {(item.startDate || item.endDate) && (
                          <span>
                            {item.startDate}{item.endDate ? ` — ${item.endDate}` : ""}
                          </span>
                        )}
                        {item.location && (
                          <span>
                            {item.location}
                          </span>
                        )}
                      </div>
                      {item.description && (
                        <div style={{
                          fontSize: ".97rem",
                          color: "#252538",
                          marginTop: 2,
                          marginLeft: 2
                        }}>{item.description}</div>
                      )}
                    </div>
                  );
                } else if (sec.type === "education") {
                  return (
                    <div key={idx} style={{
                      margin: "11px 0",
                      display: "flex",
                      flexDirection: "column",
                      borderLeft: `2.5px solid ${accent}1c`,
                      paddingLeft: 13
                    }}>
                      <div style={{
                        fontWeight: 700,
                        fontSize: "1.05rem",
                        color: printText
                      }}>
                        {item.degree ? item.degree : <span style={{ color: "#bbb" }}>[Degree]</span>}
                        {item.school && <span style={{ marginLeft: 8, color: accent }}>@ {item.school}</span>}
                      </div>
                      <div style={{
                        fontSize: ".96rem",
                        color: printSubtle,
                        marginBottom: 1,
                        display: "flex",
                        gap: 12
                      }}>
                        {(item.startDate || item.endDate) && (
                          <span>
                            {item.startDate}{item.endDate ? ` — ${item.endDate}` : ""}
                          </span>
                        )}
                        {item.location && (
                          <span>
                            {item.location}
                          </span>
                        )}
                      </div>
                      {item.description && (
                        <div style={{
                          fontSize: ".96rem",
                          color: "#292948",
                          marginTop: 2,
                          marginLeft: 2
                        }}>{item.description}</div>
                      )}
                    </div>
                  );
                } else {
                  // custom section
                  return (
                    <div key={idx} style={{
                      margin: "9px 0",
                      display: "flex",
                      flexDirection: "column",
                      borderLeft: `2px solid ${accent}32`,
                      paddingLeft: 11
                    }}>
                      <div style={{
                        fontWeight: 600,
                        fontSize: "1.01rem",
                        color: printText
                      }}>
                        {item.title || <span style={{ color: "#bbb" }}>[Title]</span>}
                      </div>
                      {item.description && (
                        <div style={{
                          fontSize: ".95rem",
                          color: "#292948",
                          marginTop: 1,
                          marginLeft: 2
                        }}>{item.description}</div>
                      )}
                    </div>
                  );
                }
              })}
            </div>
          </section>
        ))}
        {/* Place message if there are no sections/items */}
        {(!documentData?.sections || !documentData.sections.some(s => (s.items||[]).length > 0)) && (
          <div style={{
            color: "#bbb",
            textAlign: "center",
            fontStyle: "italic",
            marginTop: 30
          }}>
            Your resume sections will appear here...
          </div>
        )}
        {/* End Print-style box */}
      </div>
      {/* Footer grid: template info */}
      <div style={{
        color: accent,
        fontWeight: 600,
        fontSize: ".99rem",
        letterSpacing: ".02em",
        textShadow: glitter,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        marginTop: 6
      }}>
        <span role="img" aria-label="Template">✨</span>
        <span>Styled with: {selectedTemplate?.name || "Default"}</span>
        <span style={{
          color: "#fff",
          padding: "2px 7px",
          borderRadius: 8,
          background: accent,
          marginLeft: 4,
          fontSize: ".92rem",
        }}>{selectedTemplate?.id}</span>
      </div>
      {/* Neon hint */}
      <div style={{
        color: "var(--text-secondary)",
        fontSize: ".98rem",
        marginTop: 10,
        textAlign: "center"
      }}>
        Updates in real time as you edit. <span style={{ color: accent }}>Print-style minimalist resume preview.</span>
      </div>
    </div>
  );
}

export default LivePreview;
