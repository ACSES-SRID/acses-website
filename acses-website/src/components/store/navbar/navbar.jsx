import { ShoppingCart } from "lucide-react";

const Navbar = ({ cartCount, onCartClick }) => (
  <>
    <style>{`
      .navbar {
        position: fixed; top: 0; left: 0; right: 0; z-index: 100;
        background: #fff; border-bottom: 1px solid #e5e7eb;
        display: flex; align-items: center; justify-content: space-between;
        padding: 0 52px; height: 80px;
        box-shadow: 0 1px 6px rgba(0,0,0,0.07);
      }
      .navbar-links { display: flex; align-items: center; gap: 38px; }
      @media (max-width: 640px) {
        .navbar { padding: 0 16px; height: 80px; }
        .navbar-links { gap: 16px; }
        .navbar-links a { font-size: 13px !important; }
      }
    `}</style>
    <nav className="navbar">
      {/* Logo — matches reference navbar */}
      <a href="/" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}>
        <img src="/logo/logo.jpg" alt="ACSES Logo" style={{ width: 60, height: 60, objectFit: "contain" }} />
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 120, lineHeight: 1.2 }}>
          <span style={{ fontWeight: 800, fontSize: 24, color: "#144e29", letterSpacing: "-0.01em" }}>ACSES</span>
          <span style={{ fontSize: 8, color: "#143520", textAlign: "center", lineHeight: 1.4 }}>
            Association of Computer Science and Engineering Students - SRID, UMaT
          </span>
        </div>
      </a>

      {/* Links + Cart — unchanged */}
      <div className="navbar-links">
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
  </>
);

export default Navbar;