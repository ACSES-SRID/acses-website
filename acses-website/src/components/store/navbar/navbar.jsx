import { ShoppingCart } from "lucide-react";

const Navbar = ({ cartCount, onCartClick }) => (
  <>
    <style>{`
      .navbar {
        position: fixed; top: 0; left: 0; right: 0; z-index: 100;
        background: #fff; border-bottom: 1px solid #e5e7eb;
        display: flex; align-items: center; justify-content: space-between;
        padding: 0 52px; height: 84px;
        box-shadow: 0 1px 6px rgba(0,0,0,0.07);
      }
      .navbar-brand-sub {
        font-size: 10.5px; color: #6b7280; line-height: 1.4; max-width: 190px;
      }
      .navbar-links { display: flex; align-items: center; gap: 38px; }
      @media (max-width: 640px) {
        .navbar { padding: 0 16px; height: 60px; }
        .navbar-brand-sub { display: none; }
        .navbar-logo { height: 36px !important; }
        .navbar-brand-name { font-size: 14px !important; }
        .navbar-links { gap: 16px; }
        .navbar-links a { font-size: 13px !important; }
      }
    `}</style>
    <nav className="navbar">
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <img className="navbar-logo" src="/logo/logo.jpg" alt="ACSES Logo" style={{ height: 50, width: "auto" }} />
        <div>
          <div className="navbar-brand-name" style={{ fontWeight: 800, fontSize: 16.5, color: "#111", letterSpacing: "0.04em", lineHeight: 1.2 }}>
            ACSES-SRID
          </div>
          <div className="navbar-brand-sub">
            Association of Computer Science<br />and Engineering Students – SRID
          </div>
        </div>
      </div>
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