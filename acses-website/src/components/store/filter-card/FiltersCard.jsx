import { useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { CATEGORIES, SORT_OPTIONS } from "../../../data/storeData";

const FilterContent = ({ selectedCategory, setSelectedCategory, sortBy, setSortBy }) => (
  <>
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
  </>
);

const FiltersCard = ({ selectedCategory, setSelectedCategory, sortBy, setSortBy }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <style>{`
        .filters-desktop { display: block; }
        .filters-mobile-btn { display: none; }
        .filters-drawer-backdrop { display: none; }
        @media (max-width: 768px) {
          .filters-desktop { display: none; }
          .filters-mobile-btn { display: flex; }
          .filters-drawer-backdrop { display: block; }
        }
      `}</style>

      {/* Desktop sidebar */}
      <div className="filters-desktop" style={{ background: "#fff", borderRadius: 12, border: "1px solid #e5e7eb", padding: "20px 20px 0 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
          <SlidersHorizontal size={17} color="#111" />
          <span style={{ fontWeight: 700, fontSize: 16, color: "#111" }}>Filters</span>
        </div>
        <FilterContent selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} sortBy={sortBy} setSortBy={setSortBy} />
      </div>

      {/* Mobile filter button */}
      <button
        className="filters-mobile-btn"
        onClick={() => setMobileOpen(true)}
        style={{ alignItems: "center", gap: 7, background: "#fff", border: "1.5px solid #d1d5db", borderRadius: 9, padding: "9px 16px", fontWeight: 600, fontSize: 14, color: "#111", cursor: "pointer" }}
      >
        <SlidersHorizontal size={15} color="#111" />
        Filters & Sort
        {selectedCategory !== "All Products" && (
          <span style={{ background: "#15803d", color: "#fff", borderRadius: "50%", width: 18, height: 18, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700 }}>1</span>
        )}
      </button>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="filters-drawer-backdrop" style={{ position: "fixed", inset: 0, zIndex: 200 }}>
          <div onClick={() => setMobileOpen(false)} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.4)" }} />
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "#fff", borderRadius: "16px 16px 0 0", padding: "20px 20px 40px", maxHeight: "85vh", overflowY: "auto", zIndex: 201 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <SlidersHorizontal size={17} color="#111" />
                <span style={{ fontWeight: 700, fontSize: 16, color: "#111" }}>Filters</span>
              </div>
              <button onClick={() => setMobileOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}>
                <X size={20} color="#6b7280" />
              </button>
            </div>
            <FilterContent
              selectedCategory={selectedCategory}
              setSelectedCategory={(cat) => { setSelectedCategory(cat); setMobileOpen(false); }}
              sortBy={sortBy}
              setSortBy={(s) => { setSortBy(s); }}
            />
            <button onClick={() => setMobileOpen(false)} style={{ width: "100%", padding: "12px 0", background: "#15803d", color: "#fff", border: "none", borderRadius: 10, fontWeight: 700, fontSize: 15, cursor: "pointer" }}>
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default FiltersCard;