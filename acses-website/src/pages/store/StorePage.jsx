import { useState } from "react";
import { ShoppingCart, SlidersHorizontal } from "lucide-react";

// ─── Data ────────────────────────────────────────────────────────────────────

const PRODUCTS = [
  {
    id: 1,
    name: "ACSES Hoodie",
    description: "Premium cotton blend with embroidered logo.",
    price: 150.0,
    originalPrice: null,
    category: "Apparel",
    badge: "BESTSELLER",
    badgeColor: "#F59E0B",
    image: "https://placehold.co/400x320/1a3d2b/4ade80?text=Hoodie",
  },
  {
    id: 2,
    name: "Rope Backpack",
    description: "Professional look for departmental events.",
    price: 95.0,
    originalPrice: null,
    category: "Accessories",
    badge: null,
    image: "https://placehold.co/400x320/1a3d2b/4ade80?text=Backpack",
  },
  {
    id: 3,
    name: "Sweat shirt",
    description: "Vinyl stickers: Python, JS, React, and ACSES.",
    price: 25.0,
    originalPrice: null,
    category: "Apparel",
    badge: null,
    image: "https://placehold.co/400x320/1a3d2b/4ade80?text=Sweatshirt",
  },
  {
    id: 4,
    name: "Protective Sleeve",
    description: "15-inch laptop sleeve with extra padding.",
    price: 60.0,
    originalPrice: null,
    category: "Tech Gear",
    badge: null,
    image: "https://placehold.co/400x320/1a3d2b/4ade80?text=Sleeve",
  },
  {
    id: 5,
    name: "ACSES Summer Hat",
    description: "Keep hydrated during long coding sessions.",
    price: 45.0,
    originalPrice: 65.0,
    category: "Apparel",
    badge: "SALE",
    badgeColor: "#EF4444",
    image: "https://placehold.co/400x320/1a3d2b/4ade80?text=Hat",
  },
  {
    id: 6,
    name: "Tote Bag",
    description: "Grid paper for algorithms and sketches.",
    price: 30.0,
    originalPrice: null,
    category: "Accessories",
    badge: null,
    image: "https://placehold.co/400x320/1a3d2b/4ade80?text=Tote+Bag",
  },
];

const CATEGORIES = ["All Products", "Apparel", "Accessories", "Tech Gear"];
const SORT_OPTIONS = ["Featured", "Price: Low to High", "Price: High to Low", "Newest"];

// ─── Sub-components ───────────────────────────────────────────────────────────

const Navbar = ({ cartCount }) => (
  <nav style={{
    position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
    background: "#fff", borderBottom: "1px solid #e5e7eb",
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "0 40px", height: 68,
  }}>
    {/* Logo */}
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div style={{
        width: 44, height: 44, borderRadius: "50%",
        background: "#14532d", display: "flex", alignItems: "center",
        justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 13,
        letterSpacing: "0.05em", border: "2px solid #166534",
      }}>
        ACSES
      </div>
      <div>
        <div style={{ fontWeight: 800, fontSize: 15, color: "#111", letterSpacing: "0.04em" }}>
          ACSES-SRID
        </div>
        <div style={{ fontSize: 10, color: "#6b7280", lineHeight: 1.2, maxWidth: 160 }}>
          Association of Computer Science<br />and Engineering Students – SRID
        </div>
      </div>
    </div>

    {/* Nav links + cart */}
    <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
      <a href="#" style={{ color: "#111", fontWeight: 500, fontSize: 15, textDecoration: "none" }}>Home</a>
      <a href="#" style={{ color: "#111", fontWeight: 500, fontSize: 15, textDecoration: "none" }}>About</a>
      <div style={{ position: "relative", cursor: "pointer" }}>
        <ShoppingCart size={22} color="#111" />
        {cartCount > 0 && (
          <span style={{
            position: "absolute", top: -8, right: -8,
            background: "#EF4444", color: "#fff", borderRadius: "50%",
            width: 18, height: 18, display: "flex", alignItems: "center",
            justifyContent: "center", fontSize: 11, fontWeight: 700,
          }}>
            {cartCount}
          </span>
        )}
      </div>
    </div>
  </nav>
);

const Hero = () => (
  <div style={{
    background: "linear-gradient(135deg, #14532d 0%, #166534 60%, #15803d 100%)",
    padding: "60px 40px", textAlign: "center", position: "relative", overflow: "hidden",
  }}>
    {/* Decorative circles */}
    <div style={{
      position: "absolute", left: -80, top: -80, width: 320, height: 320,
      borderRadius: "50%", background: "rgba(255,255,255,0.04)",
    }} />
    <div style={{
      position: "absolute", right: -40, bottom: -60, width: 240, height: 240,
      borderRadius: "50%", background: "rgba(255,255,255,0.04)",
    }} />
    <h1 style={{
      color: "#fff", fontSize: 42, fontWeight: 800, marginBottom: 14,
      letterSpacing: "-0.02em", position: "relative",
    }}>
      Official Swag
    </h1>
    <p style={{
      color: "rgba(255,255,255,0.82)", fontSize: 17, maxWidth: 520,
      margin: "0 auto", lineHeight: 1.6, position: "relative",
    }}>
      Rep your department with pride. High-quality apparel and accessories for the future tech leaders.
    </p>
  </div>
);

const FiltersCard = ({ selectedCategory, setSelectedCategory, sortBy, setSortBy }) => (
  <div style={{
    background: "#fff", borderRadius: 12, border: "1px solid #e5e7eb",
    padding: "20px 20px 0 20px", minWidth: 220,
  }}>
    {/* Header */}
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
      <SlidersHorizontal size={17} color="#111" />
      <span style={{ fontWeight: 700, fontSize: 16, color: "#111" }}>Filters</span>
    </div>

    {/* Categories */}
    <div style={{ marginBottom: 20 }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", letterSpacing: "0.08em", marginBottom: 12 }}>
        CATEGORIES
      </div>
      {CATEGORIES.map((cat) => (
        <label key={cat} style={{
          display: "flex", alignItems: "center", gap: 10, marginBottom: 12,
          cursor: "pointer", fontSize: 14, color: "#111", fontWeight: 400,
        }}>
          <input
            type="radio"
            name="category"
            checked={selectedCategory === cat}
            onChange={() => setSelectedCategory(cat)}
            style={{ accentColor: "#15803d", width: 16, height: 16 }}
          />
          {cat}
        </label>
      ))}
    </div>

    {/* Sort By */}
    <div style={{ marginBottom: 20 }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", letterSpacing: "0.08em", marginBottom: 10 }}>
        SORT BY
      </div>
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        style={{
          width: "100%", padding: "8px 12px", borderRadius: 8,
          border: "1px solid #d1d5db", fontSize: 14, color: "#111",
          background: "#fff", cursor: "pointer", outline: "none",
        }}
      >
        {SORT_OPTIONS.map((o) => <option key={o}>{o}</option>)}
      </select>
    </div>

    {/* Dues banner */}
    <div style={{
      background: "#eff6ff", borderRadius: 8, padding: "14px 14px 16px",
      marginBottom: 20,
    }}>
      <div style={{ fontWeight: 700, color: "#1d4ed8", fontSize: 14, marginBottom: 4 }}>
        Need to pay dues?
      </div>
      <div style={{ color: "#3b82f6", fontSize: 13, marginBottom: 12, lineHeight: 1.5 }}>
        Access the official portal to clear your semester dues.
      </div>
      <button style={{
        background: "#3b82f6", color: "#fff", border: "none", borderRadius: 6,
        padding: "8px 0", width: "100%", fontWeight: 600, fontSize: 14,
        cursor: "pointer",
      }}>
        Go to Portal
      </button>
    </div>
  </div>
);

const ProductCard = ({ product, onAdd }) => (
  <div style={{
    background: "#fff", borderRadius: 12, border: "1px solid #e5e7eb",
    overflow: "hidden", display: "flex", flexDirection: "column",
  }}>
    {/* Image area */}
    <div style={{ position: "relative", background: "#f3f4f6", height: 220, overflow: "hidden" }}>
      <img
        src={product.image}
        alt={product.name}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
        onError={(e) => { e.target.style.display = "none"; }}
      />
      {product.badge && (
        <span style={{
          position: "absolute", top: 12, left: 12,
          background: product.badgeColor,
          color: "#fff", fontWeight: 700, fontSize: 11,
          padding: "4px 10px", borderRadius: 6, letterSpacing: "0.06em",
        }}>
          {product.badge}
        </span>
      )}
    </div>

    {/* Info */}
    <div style={{ padding: "16px 18px 18px", flex: 1, display: "flex", flexDirection: "column" }}>
      <div style={{ fontWeight: 700, fontSize: 16, color: "#111", marginBottom: 5 }}>
        {product.name}
      </div>
      <div style={{ fontSize: 13.5, color: "#6b7280", marginBottom: 16, lineHeight: 1.5, flex: 1 }}>
        {product.description}
      </div>

      {/* Price + Add */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <span style={{ fontWeight: 700, fontSize: 18, color: "#15803d" }}>
            GH₵ {product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span style={{ marginLeft: 8, fontSize: 13, color: "#9ca3af", textDecoration: "line-through" }}>
              GH₵ {product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
        <button
          onClick={() => onAdd(product)}
          style={{
            background: "#15803d", color: "#fff", border: "none",
            borderRadius: 8, padding: "9px 18px", fontWeight: 600,
            fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", gap: 6,
          }}
        >
          <ShoppingCart size={15} />
          Add
        </button>
      </div>
    </div>
  </div>
);

// ─── Main Page ────────────────────────────────────────────────────────────────

const StorePage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [sortBy, setSortBy] = useState("Featured");
  const [cart, setCart] = useState([]);

  const handleAdd = (product) => {
    setCart((prev) => [...prev, product]);
  };

  const filtered = PRODUCTS.filter(
    (p) => selectedCategory === "All Products" || p.category === selectedCategory
  ).sort((a, b) => {
    if (sortBy === "Price: Low to High") return a.price - b.price;
    if (sortBy === "Price: High to Low") return b.price - a.price;
    return 0;
  });

  return (
    <div style={{ minHeight: "100vh", background: "#f3f4f6", fontFamily: "'Segoe UI', sans-serif" }}>
      <Navbar cartCount={cart.length} />

      {/* Push content below fixed navbar */}
      <div style={{ paddingTop: 68 }}>
        <Hero />

        {/* Body */}
        <div style={{
          maxWidth: 1280, margin: "0 auto", padding: "32px 32px 64px",
          display: "flex", gap: 28, alignItems: "flex-start",
        }}>
          {/* Sidebar */}
          <div style={{ width: 248, flexShrink: 0, position: "sticky", top: 84 }}>
            <FiltersCard
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              sortBy={sortBy}
              setSortBy={setSortBy}
            />
          </div>

          {/* Products */}
          <div style={{ flex: 1 }}>
            <div style={{
              display: "flex", alignItems: "baseline",
              justifyContent: "space-between", marginBottom: 20,
            }}>
              <h2 style={{ fontWeight: 800, fontSize: 22, color: "#111" }}>New Arrivals</h2>
              <span style={{ fontSize: 14, color: "#9ca3af" }}>
                Showing {filtered.length} product{filtered.length !== 1 ? "s" : ""}
              </span>
            </div>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 20,
            }}>
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} onAdd={handleAdd} />
              ))}
            </div>

            {filtered.length === 0 && (
              <div style={{ textAlign: "center", padding: "60px 0", color: "#9ca3af", fontSize: 15 }}>
                No products found in this category.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StorePage;