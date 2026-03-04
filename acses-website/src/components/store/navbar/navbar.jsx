import { ShoppingCart } from "lucide-react";

const Navbar = ({ cartCount, onCartClick }) => (
  <nav style={{
    position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
    background: "#fff", borderBottom: "1px solid #e5e7eb",
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "0 52px", height: 84,
    boxShadow: "0 1px 6px rgba(0,0,0,0.07)",
  }}>
    {/* Logo + Brand */}
    <div style={{ display: "flex", alignItems: "center", gap: 13 }}>
      <img src="/logo/logo.jpg" alt="ACSES Logo" style={{ height: 50, width: "auto" }} />
      <div>
        <div style={{ fontWeight: 800, fontSize: 16.5, color: "#111", letterSpacing: "0.04em", lineHeight: 1.2 }}>
          ACSES-SRID
        </div>
        <div style={{ fontSize: 10.5, color: "#6b7280", lineHeight: 1.4, maxWidth: 190 }}>
          Association of Computer Science<br />and Engineering Students – SRID
        </div>
      </div>
    </div>

    {/* Links + Cart */}
    <div style={{ display: "flex", alignItems: "center", gap: 38 }}>
      <a href="/" style={{ color: "#111", fontWeight: 500, fontSize: 15, textDecoration: "none" }}>Home</a>
      <a href="/about" style={{ color: "#111", fontWeight: 500, fontSize: 15, textDecoration: "none" }}>About</a>
      <button onClick={onCartClick} style={{ position: "relative", background: "none", border: "none", cursor: "pointer", padding: 4, display: "flex", alignItems: "center" }}>
        <ShoppingCart size={24} color="#111" />
        {cartCount > 0 && (
          <span style={{
            position: "absolute", top: -4, right: -6,
            background: "#EF4444", color: "#fff", borderRadius: "50%",
            width: 20, height: 20, display: "flex", alignItems: "center",
            justifyContent: "center", fontSize: 11, fontWeight: 700,
          }}>
            {cartCount}
          </span>
        )}
      </button>
    </div>
  </nav>
);

export default Navbar;