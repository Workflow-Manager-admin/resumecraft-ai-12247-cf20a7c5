import React from "react";

/**
 * DocumentEditor
 * --------------
 * Purpose: The main form-based or WYSIWYG editor where users enter and edit their resume or cover letter content.
 * Supports section add/remove/reorder and triggers state updates for real-time preview.
 *
 * Props:
 * - selectedTemplate: object (template visual theme)
 * - documentData: object ({basics, summary, sections} state)
 * - onChange: function(field, value)
 * - onAddSection: function
 * - onRemoveSection: function(idx)
 * - onMoveSection: function(fromIdx, toIdx)
 */
// PUBLIC_INTERFACE
function DocumentEditor({
  selectedTemplate,
  documentData,
  onChange,
  onAddSection,
  onRemoveSection,
  onMoveSection
}) {
  // Helper for updating basics fields
  const handleBasicsChange = (e) => {
    const { name, value } = e.target;
    onChange("basics", { ...documentData.basics, [name]: value });
  };

  // Helper for updating summary
  const handleSummaryChange = (e) => {
    onChange("summary", e.target.value);
  };

  // Helper for updating a section's label or items
  const handleSectionLabelChange = (idx, value) => {
    onChange(`section-${idx}`, { label: value });
  };

  // Add Work/Education/Custom item to a section
  const handleAddSectionItem = (sectionIdx) => {
    const currentSection = documentData.sections[sectionIdx];
    let newItem = {};
    // Pre-fill some fields for known types
    if (currentSection.type === "work") {
      newItem = {
        title: "",
        company: "",
        startDate: "",
        endDate: "",
        location: "",
        description: ""
      };
    } else if (currentSection.type === "education") {
      newItem = {
        degree: "",
        school: "",
        startDate: "",
        endDate: "",
        location: "",
        description: ""
      };
    } else {
      newItem = {
        title: "",
        description: ""
      };
    }
    const updatedItems = [...(currentSection.items || []), newItem];
    onChange(`section-${sectionIdx}`, { items: updatedItems });
  };

  // Remove an item from a section
  const handleRemoveSectionItem = (sectionIdx, itemIdx) => {
    const currentSection = documentData.sections[sectionIdx];
    const updatedItems = (currentSection.items || []).filter((_, i) => i !== itemIdx);
    onChange(`section-${sectionIdx}`, { items: updatedItems });
  };

  // Update item fields inside a section
  const handleSectionItemChange = (sectionIdx, itemIdx, field, value) => {
    const currentSection = documentData.sections[sectionIdx];
    const updatedItems = [...(currentSection.items || [])];
    updatedItems[itemIdx] = { ...updatedItems[itemIdx], [field]: value };
    onChange(`section-${sectionIdx}`, { items: updatedItems });
  };

  // Reorder sections (up/down arrows)
  const handleMoveSection = (idx, dir) => {
    const toIdx = idx + dir;
    onMoveSection(idx, toIdx);
  };

  return (
    <div>
      <h2 style={{ color: selectedTemplate?.accent || "#ff00cc" }}>
        Document Editor
      </h2>
      <form>
        {/* BASICS */}
        <fieldset style={{
          border: "none", marginBottom: 18, padding: 0
        }}>
          <legend style={{
            color: selectedTemplate?.accent,
            fontWeight: 600,
            fontSize: "1.08rem"
          }}>Personal Details</legend>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={documentData.basics.name}
              onChange={handleBasicsChange}
              style={{ flex: "1 1 180px" }}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={documentData.basics.email}
              onChange={handleBasicsChange}
              style={{ flex: "1 1 180px" }}
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={documentData.basics.phone}
              onChange={handleBasicsChange}
              style={{ flex: "1 1 120px" }}
            />
            <input
              type="text"
              name="linkedin"
              placeholder="LinkedIn (optional)"
              value={documentData.basics.linkedin}
              onChange={handleBasicsChange}
              style={{ flex: "1 1 140px" }}
            />
            <input
              type="text"
              name="github"
              placeholder="GitHub (optional)"
              value={documentData.basics.github}
              onChange={handleBasicsChange}
              style={{ flex: "1 1 120px" }}
            />
            <input
              type="text"
              name="address"
              placeholder="Address (optional)"
              value={documentData.basics.address}
              onChange={handleBasicsChange}
              style={{ flex: "2 1 240px" }}
            />
          </div>
        </fieldset>

        {/* SUMMARY */}
        <fieldset style={{ border: "none", marginBottom: 18, padding: 0 }}>
          <legend style={{
            color: selectedTemplate?.accent,
            fontWeight: 600,
            fontSize: "1.08rem"
          }}>Professional Summary</legend>
          <textarea
            name="summary"
            placeholder="Brief summary e.g. Experienced software engineer specializing in..."
            value={documentData.summary}
            onChange={handleSummaryChange}
            style={{ width: "100%", minHeight: 60, resize: "vertical", background: "#25253a" }}
          />
        </fieldset>

        {/* SECTIONS */}
        <fieldset style={{ border: "none", margin: 0, padding: 0 }}>
          <legend style={{
            color: selectedTemplate?.accent,
            fontWeight: 600,
            fontSize: "1.08rem"
          }}>Sections</legend>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {(documentData.sections || []).map((sec, idx) => (
              <section
                key={sec.id}
                style={{
                  background: "rgba(44,45,65,0.89)",
                  border: `2px solid ${selectedTemplate?.accent || "#ff00cc"}`,
                  borderRadius: 8,
                  padding: "12px 12px 10px 12px",
                  marginBottom: 0,
                  position: "relative",
                  boxShadow: "0 2px 8px #1a1a2e55"
                }}
              >
                {/* Section header with reorder/remove */}
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: 7,
                  justifyContent: "space-between"
                }}>
                  <input
                    type="text"
                    value={sec.label}
                    onChange={e => handleSectionLabelChange(idx, e.target.value)}
                    style={{
                      fontWeight: 700,
                      fontSize: ".98rem",
                      color: selectedTemplate?.accent,
                      background: "transparent",
                      borderBottom: "2px solid #333",
                      width: "60%",
                      outline: "none"
                    }}
                  />
                  <div style={{ display: "flex", gap: 8 }}>
                    {/* Move up */}
                    <button
                      type="button"
                      onClick={() => handleMoveSection(idx, -1)}
                      disabled={idx === 0}
                      style={{
                        opacity: idx === 0 ? 0.4 : 1,
                        borderRadius: 4, border: "none", background: "#222", color: "#0ff0fc", padding: "2px 9px", fontSize: "1.1rem", cursor: "pointer"
                      }}
                      title="Move up"
                    >▲</button>
                    {/* Move down */}
                    <button
                      type="button"
                      onClick={() => handleMoveSection(idx, 1)}
                      disabled={idx === documentData.sections.length - 1}
                      style={{
                        opacity: idx === documentData.sections.length - 1 ? 0.4 : 1,
                        borderRadius: 4, border: "none", background: "#222", color: "#0ff0fc", padding: "2px 9px", fontSize: "1.1rem", cursor: "pointer"
                      }}
                      title="Move down"
                    >▼</button>
                    {/* Remove */}
                    <button
                      type="button"
                      onClick={() => onRemoveSection(idx)}
                      disabled={documentData.sections.length <= 1}
                      style={{
                        opacity: documentData.sections.length <= 1 ? 0.4 : 1,
                        borderRadius: 4, border: "none", background: "#252535", color: "#fc2742", padding: "2px 9px", fontSize: "1.15rem", cursor: "pointer"
                      }}
                      title="Remove this section"
                    >✕</button>
                  </div>
                </div>

                {/* Section content - mapped fields for each item */}
                {(sec.items || []).map((item, idxItem) => (
                  <div
                    key={idxItem}
                    style={{
                      marginBottom: 8,
                      padding: 7,
                      background: "rgba(27,29,39,0.8)",
                      borderRadius: 6,
                      display: "flex",
                      flexDirection: "column",
                      gap: 5,
                      border: "1.4px solid #0ff0fc33"
                    }}
                  >
                    {sec.type === "work" && (
                      <>
                        <input
                          type="text"
                          placeholder="Job Title"
                          value={item.title}
                          onChange={e => handleSectionItemChange(idx, idxItem, "title", e.target.value)}
                          style={{ fontWeight: 600 }}
                        />
                        <input
                          type="text"
                          placeholder="Company"
                          value={item.company}
                          onChange={e => handleSectionItemChange(idx, idxItem, "company", e.target.value)}
                        />
                        <div style={{ display: "flex", gap: 8 }}>
                          <input
                            type="text"
                            placeholder="Start Date"
                            value={item.startDate}
                            onChange={e => handleSectionItemChange(idx, idxItem, "startDate", e.target.value)}
                            style={{ flex: "1 1 80px" }}
                          />
                          <input
                            type="text"
                            placeholder="End Date"
                            value={item.endDate}
                            onChange={e => handleSectionItemChange(idx, idxItem, "endDate", e.target.value)}
                            style={{ flex: "1 1 80px" }}
                          />
                          <input
                            type="text"
                            placeholder="Location"
                            value={item.location}
                            onChange={e => handleSectionItemChange(idx, idxItem, "location", e.target.value)}
                            style={{ flex: "2 1 80px" }}
                          />
                        </div>
                        <textarea
                          placeholder="Description or Achievements"
                          value={item.description}
                          onChange={e => handleSectionItemChange(idx, idxItem, "description", e.target.value)}
                          style={{ minHeight: 36, background: "#232346" }}
                        />
                      </>
                    )}
                    {sec.type === "education" && (
                      <>
                        <input
                          type="text"
                          placeholder="Degree"
                          value={item.degree}
                          onChange={e => handleSectionItemChange(idx, idxItem, "degree", e.target.value)}
                          style={{ fontWeight: 600 }}
                        />
                        <input
                          type="text"
                          placeholder="School"
                          value={item.school}
                          onChange={e => handleSectionItemChange(idx, idxItem, "school", e.target.value)}
                        />
                        <div style={{ display: "flex", gap: 8 }}>
                          <input
                            type="text"
                            placeholder="Start Date"
                            value={item.startDate || ""}
                            onChange={e => handleSectionItemChange(idx, idxItem, "startDate", e.target.value)}
                            style={{ flex: "1 1 80px" }}
                          />
                          <input
                            type="text"
                            placeholder="End Date"
                            value={item.endDate || ""}
                            onChange={e => handleSectionItemChange(idx, idxItem, "endDate", e.target.value)}
                            style={{ flex: "1 1 80px" }}
                          />
                          <input
                            type="text"
                            placeholder="Location"
                            value={item.location || ""}
                            onChange={e => handleSectionItemChange(idx, idxItem, "location", e.target.value)}
                            style={{ flex: "2 1 80px" }}
                          />
                        </div>
                        <textarea
                          placeholder="Description or Achievements"
                          value={item.description || ""}
                          onChange={e => handleSectionItemChange(idx, idxItem, "description", e.target.value)}
                          style={{ minHeight: 36, background: "#232346" }}
                        />
                      </>
                    )}
                    {sec.type === "custom" && (
                      <>
                        <input
                          type="text"
                          placeholder="Title or Label"
                          value={item.title}
                          onChange={e => handleSectionItemChange(idx, idxItem, "title", e.target.value)}
                          style={{ fontWeight: 600 }}
                        />
                        <textarea
                          placeholder="Details"
                          value={item.description}
                          onChange={e => handleSectionItemChange(idx, idxItem, "description", e.target.value)}
                          style={{ minHeight: 36, background: "#232346" }}
                        />
                      </>
                    )}
                    {/* Remove button for each item */}
                    <button
                      type="button"
                      onClick={() => handleRemoveSectionItem(idx, idxItem)}
                      style={{
                        marginTop: 2,
                        alignSelf: "flex-end",
                        background: "#fc274222",
                        border: "none",
                        color: "#fc2742",
                        borderRadius: 4,
                        fontSize: ".98rem",
                        cursor: "pointer",
                        padding: "2.5px 10px"
                      }}
                      title="Remove entry"
                    >
                      remove
                    </button>
                  </div>
                ))}
                {/* Add item to section */}
                <button
                  type="button"
                  onClick={() => handleAddSectionItem(idx)}
                  style={{
                    marginTop: 2,
                    background: selectedTemplate?.accent || "#ff00cc",
                    color: "#fff",
                    border: "none",
                    borderRadius: 4,
                    fontWeight: 700,
                    fontSize: "1.01rem",
                    cursor: "pointer",
                    padding: "4px 18px"
                  }}
                  title="Add entry"
                >
                  + Add Entry
                </button>
              </section>
            ))}
          </div>
        </fieldset>
        <div style={{ marginTop: 16 }}>
          <button
            type="button"
            className="btn"
            onClick={onAddSection}
            style={{
              background: selectedTemplate?.accent || "#ff00cc",
              color: "#fff",
              fontWeight: 700
            }}
          >
            + Add Section
          </button>
        </div>
      </form>
    </div>
  );
}

export default DocumentEditor;
