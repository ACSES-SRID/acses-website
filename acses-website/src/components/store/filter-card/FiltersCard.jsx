import { SlidersHorizontal } from "lucide-react";
import { CATEGORIES, SORT_OPTIONS } from "../../../data/storeData";

const FiltersCard = ({ selectedCategory, setSelectedCategory, sortBy, setSortBy }) => (
  <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #e5e7eb", padding: "20px 20px 0 20px" }}>
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
      <SlidersHorizontal size={17} color="#111" />
      <span style={{ fontWeight: 700, fontSize: 16, color: "#111" }}>Filters</span>
    </div>
    <div style={{ marginBottom: 20 }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", letterSpacing: "0.08em", marginBottom: 12 }}>CATEGORIES</div>
      {CATEGORIES.map((cat) => (
        <label key={cat} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12, cursor: "pointer", fontSize: 14, color: "#111" }}>
          <input type="radio" name="category" checked={selectedCategory === cat} onChange={() => setSelectedCategory(cat)} style={{ accentColor: "#15803d", width: 16, height: 16 }} />
          {cat}
        </label>
      ))}
    </div>
    <div style={{ marginBottom: 20 }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", letterSpacing: "0.08em", marginBottom: 10 }}>SORT BY</div>
      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={{ width: "100%", padding: "8px 12px", borderRadius: 8, border: "1px solid #d1d5db", fontSize: 14, color: "#111", background: "#fff", cursor: "pointer", outline: "none" }}>
        {SORT_OPTIONS.map((o) => <option key={o}>{o}</option>)}
      </select>
    </div>
    <div style={{ background: "#eff6ff", borderRadius: 8, padding: "14px 14px 16px", marginBottom: 20 }}>
      <div style={{ fontWeight: 700, color: "#1d4ed8", fontSize: 14, marginBottom: 4 }}>Need to pay dues?</div>
      <div style={{ color: "#3b82f6", fontSize: 13, marginBottom: 12, lineHeight: 1.5 }}>Access the official portal to clear your semester dues.</div>
      <button style={{ background: "#3b82f6", color: "#fff", border: "none", borderRadius: 6, padding: "8px 0", width: "100%", fontWeight: 600, fontSize: 14, cursor: "pointer" }}>
        Go to Portal
      </button>
    </div>
  </div>
);

export default FiltersCard;