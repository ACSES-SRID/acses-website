import { useState } from "react";
import { ShoppingCart, SlidersHorizontal, Trash2, Plus, Minus, X, ArrowLeft, CheckCircle, Package } from "lucide-react";

// ─── Data ────────────────────────────────────────────────────────────────────

const PRODUCTS = [
  { id: 1, name: "ACSES Hoodie", description: "Premium cotton blend with embroidered logo.", price: 150.0, originalPrice: null, category: "Apparel", badge: "BESTSELLER", badgeColor: "#F59E0B", image: "https://placehold.co/400x320/1a3d2b/4ade80?text=Hoodie" },
  { id: 2, name: "Rope Backpack", description: "Professional look for departmental events.", price: 95.0, originalPrice: null, category: "Accessories", badge: null, image: "https://placehold.co/400x320/1a3d2b/4ade80?text=Backpack" },
  { id: 3, name: "Sweat shirt", description: "Vinyl stickers: Python, JS, React, and ACSES.", price: 25.0, originalPrice: null, category: "Apparel", badge: null, image: "https://placehold.co/400x320/1a3d2b/4ade80?text=Sweatshirt" },
  { id: 4, name: "Protective Sleeve", description: "15-inch laptop sleeve with extra padding.", price: 60.0, originalPrice: null, category: "Tech Gear", badge: null, image: "https://placehold.co/400x320/1a3d2b/4ade80?text=Sleeve" },
  { id: 5, name: "ACSES Summer Hat", description: "Keep hydrated during long coding sessions.", price: 45.0, originalPrice: 65.0, category: "Apparel", badge: "SALE", badgeColor: "#EF4444", image: "https://placehold.co/400x320/1a3d2b/4ade80?text=Hat" },
  { id: 6, name: "Tote Bag", description: "Grid paper for algorithms and sketches.", price: 30.0, originalPrice: null, category: "Accessories", badge: null, image: "https://placehold.co/400x320/1a3d2b/4ade80?text=Tote+Bag" },
];

const CATEGORIES = ["All Products", "Apparel", "Accessories", "Tech Gear"];
const SORT_OPTIONS = ["Featured", "Price: Low to High", "Price: High to Low", "Newest"];

// ─── SVG Logo ─────────────────────────────────────────────────────────────────

const ACSESLogo = () => (
  <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="26" cy="26" r="25" fill="#14532d" stroke="#4ade80" strokeWidth="1.5" />
    <text x="26" y="21" textAnchor="middle" fill="#fff" fontSize="8.5" fontWeight="800" fontFamily="'Segoe UI',monospace" letterSpacing="0.5">ACSES</text>
    <circle cx="26" cy="31" r="8" fill="none" stroke="#4ade80" strokeWidth="1.4" />
    <path d="M22 31 L26 27 L30 31" stroke="#4ade80" strokeWidth="1.4" strokeLinecap="round" fill="none" />
    <path d="M22 34 L30 34" stroke="#4ade80" strokeWidth="1.1" strokeLinecap="round" />
  </svg>
);

// ─── Navbar ───────────────────────────────────────────────────────────────────

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
      <ACSESLogo />
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
      <a href="#" style={{ color: "#111", fontWeight: 500, fontSize: 15, textDecoration: "none" }}>Home</a>
      <a href="#" style={{ color: "#111", fontWeight: 500, fontSize: 15, textDecoration: "none" }}>About</a>
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

// ─── Hero ─────────────────────────────────────────────────────────────────────

const Hero = () => (
  <div style={{ background: "linear-gradient(135deg, #14532d 0%, #166534 60%, #15803d 100%)", padding: "64px 40px", textAlign: "center", position: "relative", overflow: "hidden" }}>
    <div style={{ position: "absolute", left: -80, top: -80, width: 320, height: 320, borderRadius: "50%", background: "rgba(255,255,255,0.04)" }} />
    <div style={{ position: "absolute", right: -40, bottom: -60, width: 240, height: 240, borderRadius: "50%", background: "rgba(255,255,255,0.04)" }} />
    <h1 style={{ color: "#fff", fontSize: 44, fontWeight: 800, marginBottom: 14, letterSpacing: "-0.02em", position: "relative" }}>Official Swag</h1>
    <p style={{ color: "rgba(255,255,255,0.82)", fontSize: 17, maxWidth: 520, margin: "0 auto", lineHeight: 1.6, position: "relative" }}>
      Rep your department with pride. High-quality apparel and accessories for the future tech leaders.
    </p>
  </div>
);

// ─── Filters Card ─────────────────────────────────────────────────────────────

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

// ─── Product Card ─────────────────────────────────────────────────────────────

const ProductCard = ({ product, onAdd }) => (
  <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #e5e7eb", overflow: "hidden", display: "flex", flexDirection: "column" }}>
    <div style={{ position: "relative", background: "#f3f4f6", height: 220, overflow: "hidden" }}>
      <img src={product.image} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={(e) => { e.target.style.display = "none"; }} />
      {product.badge && (
        <span style={{ position: "absolute", top: 12, left: 12, background: product.badgeColor, color: "#fff", fontWeight: 700, fontSize: 11, padding: "4px 10px", borderRadius: 6, letterSpacing: "0.06em" }}>
          {product.badge}
        </span>
      )}
    </div>
    <div style={{ padding: "16px 18px 18px", flex: 1, display: "flex", flexDirection: "column" }}>
      <div style={{ fontWeight: 700, fontSize: 16, color: "#111", marginBottom: 5 }}>{product.name}</div>
      <div style={{ fontSize: 13.5, color: "#6b7280", marginBottom: 16, lineHeight: 1.5, flex: 1 }}>{product.description}</div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <span style={{ fontWeight: 700, fontSize: 18, color: "#15803d" }}>GH₵ {product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <span style={{ marginLeft: 8, fontSize: 13, color: "#9ca3af", textDecoration: "line-through" }}>GH₵ {product.originalPrice.toFixed(2)}</span>
          )}
        </div>
        <button onClick={() => onAdd(product)} style={{ background: "#15803d", color: "#fff", border: "none", borderRadius: 8, padding: "9px 18px", fontWeight: 600, fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
          <ShoppingCart size={15} /> Add
        </button>
      </div>
    </div>
  </div>
);

// ─── Checkout Modal ───────────────────────────────────────────────────────────

const CheckoutModal = ({ cart, onClose, onSuccess }) => {
  const [form, setForm] = useState({ fullName: "", studentId: "", email: "", phone: "", level: "", hall: "", paymentMethod: "Mobile Money", momoNumber: "" });
  const [errors, setErrors] = useState({});
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);

  const set = (key, val) => { setForm(f => ({ ...f, [key]: val })); setErrors(e => ({ ...e, [key]: undefined })); };

  const validate = () => {
    const e = {};
    if (!form.fullName.trim()) e.fullName = "Full name is required";
    if (!form.studentId.trim()) e.studentId = "Student ID is required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email required";
    if (!form.phone.trim()) e.phone = "Phone number is required";
    if (!form.level) e.level = "Please select your level";
    if (form.paymentMethod === "Mobile Money" && !form.momoNumber.trim()) e.momoNumber = "MoMo number required";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    onSuccess(form);
  };

  const Field = ({ label, fkey, placeholder, type = "text" }) => (
    <div style={{ marginBottom: 15 }}>
      <label style={{ display: "block", fontSize: 12.5, fontWeight: 600, color: "#374151", marginBottom: 5 }}>{label}</label>
      <input type={type} placeholder={placeholder} value={form[fkey]} onChange={(e) => set(fkey, e.target.value)}
        style={{ width: "100%", padding: "9px 12px", borderRadius: 8, fontSize: 14, color: "#111", border: `1.5px solid ${errors[fkey] ? "#ef4444" : "#d1d5db"}`, outline: "none", boxSizing: "border-box" }} />
      {errors[fkey] && <span style={{ fontSize: 11.5, color: "#ef4444", marginTop: 3, display: "block" }}>{errors[fkey]}</span>}
    </div>
  );

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(2px)" }} />
      <div style={{ position: "relative", background: "#fff", borderRadius: 16, width: "100%", maxWidth: 560, maxHeight: "92vh", overflowY: "auto", boxShadow: "0 24px 64px rgba(0,0,0,0.22)", zIndex: 201, margin: "0 16px" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 24px", borderBottom: "1px solid #e5e7eb", position: "sticky", top: 0, background: "#fff", zIndex: 10 }}>
          <div>
            <h2 style={{ fontWeight: 800, fontSize: 20, color: "#111", margin: 0 }}>Checkout</h2>
            <p style={{ fontSize: 13, color: "#6b7280", margin: "2px 0 0" }}>Fill in your details to complete your order</p>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}><X size={22} color="#6b7280" /></button>
        </div>

        <div style={{ padding: "22px 24px 28px" }}>
          {/* Order mini-summary */}
          <div style={{ background: "#f9fafb", borderRadius: 10, padding: "14px 16px", marginBottom: 22, border: "1px solid #e5e7eb" }}>
            <div style={{ fontWeight: 700, fontSize: 12, color: "#6b7280", letterSpacing: "0.07em", marginBottom: 10 }}>ORDER SUMMARY</div>
            {cart.map((item) => (
              <div key={item.cartId} style={{ display: "flex", justifyContent: "space-between", fontSize: 13.5, color: "#374151", marginBottom: 6 }}>
                <span>{item.name} <span style={{ color: "#9ca3af" }}>×{item.qty}</span></span>
                <span style={{ fontWeight: 600 }}>GH₵ {(item.price * item.qty).toFixed(2)}</span>
              </div>
            ))}
            <div style={{ borderTop: "1px solid #e5e7eb", marginTop: 10, paddingTop: 10, display: "flex", justifyContent: "space-between", fontWeight: 800, fontSize: 15, color: "#15803d" }}>
              <span>Total</span><span>GH₵ {total.toFixed(2)}</span>
            </div>
          </div>

          {/* Personal Info */}
          <div style={{ fontWeight: 700, fontSize: 12, color: "#9ca3af", letterSpacing: "0.07em", marginBottom: 14 }}>PERSONAL INFORMATION</div>
          <Field label="Full Name" fkey="fullName" placeholder="e.g. Kwame Mensah" />
          <Field label="Student ID" fkey="studentId" placeholder="e.g. 10XXXXXXX" />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <Field label="Email Address" fkey="email" placeholder="you@university.edu" type="email" />
            <Field label="Phone Number" fkey="phone" placeholder="0XX XXX XXXX" type="tel" />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <div style={{ marginBottom: 15 }}>
              <label style={{ display: "block", fontSize: 12.5, fontWeight: 600, color: "#374151", marginBottom: 5 }}>Level</label>
              <select value={form.level} onChange={(e) => set("level", e.target.value)}
                style={{ width: "100%", padding: "9px 12px", borderRadius: 8, fontSize: 14, color: form.level ? "#111" : "#9ca3af", border: `1.5px solid ${errors.level ? "#ef4444" : "#d1d5db"}`, outline: "none", background: "#fff", boxSizing: "border-box" }}>
                <option value="">Select level</option>
                {["100", "200", "300", "400", "Postgrad"].map(l => <option key={l} value={l}>{l}</option>)}
              </select>
              {errors.level && <span style={{ fontSize: 11.5, color: "#ef4444", marginTop: 3, display: "block" }}>{errors.level}</span>}
            </div>
            <Field label="Hall / Hostel" fkey="hall" placeholder="e.g. Unity Hall" />
          </div>

          {/* Payment */}
          <div style={{ fontWeight: 700, fontSize: 12, color: "#9ca3af", letterSpacing: "0.07em", marginBottom: 14 }}>PAYMENT METHOD</div>
          <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
            {["Mobile Money", "Cash on Delivery"].map((method) => (
              <button key={method} onClick={() => set("paymentMethod", method)} style={{
                flex: 1, padding: "10px 0", borderRadius: 8, fontSize: 13.5, fontWeight: 600, cursor: "pointer",
                background: form.paymentMethod === method ? "#15803d" : "#fff",
                color: form.paymentMethod === method ? "#fff" : "#374151",
                border: `2px solid ${form.paymentMethod === method ? "#15803d" : "#d1d5db"}`,
              }}>
                {method}
              </button>
            ))}
          </div>
          {form.paymentMethod === "Mobile Money" && (
            <Field label="MoMo Number" fkey="momoNumber" placeholder="e.g. 055 XXX XXXX" type="tel" />
          )}

          <button onClick={handleSubmit} style={{ width: "100%", padding: "13px 0", background: "#15803d", color: "#fff", border: "none", borderRadius: 10, fontWeight: 700, fontSize: 15.5, cursor: "pointer", marginTop: 4 }}>
            Place Order — GH₵ {total.toFixed(2)}
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Success Modal ────────────────────────────────────────────────────────────

const SuccessModal = ({ customerName, onClose }) => (
  <div style={{ position: "fixed", inset: 0, zIndex: 300, display: "flex", alignItems: "center", justifyContent: "center" }}>
    <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.55)", backdropFilter: "blur(2px)" }} />
    <div style={{ position: "relative", background: "#fff", borderRadius: 16, width: "100%", maxWidth: 420, padding: "52px 36px", textAlign: "center", zIndex: 301, margin: "0 16px", boxShadow: "0 24px 64px rgba(0,0,0,0.22)" }}>
      <CheckCircle size={64} color="#15803d" style={{ margin: "0 auto 20px", display: "block" }} />
      <h2 style={{ fontWeight: 800, fontSize: 23, color: "#111", marginBottom: 10 }}>Order Placed!</h2>
      <p style={{ fontSize: 15, color: "#6b7280", lineHeight: 1.7, marginBottom: 28 }}>
        Thank you, <strong style={{ color: "#111" }}>{customerName}</strong>! Your order has been received. We'll reach out shortly with pickup/delivery details.
      </p>
      <button onClick={onClose} style={{ background: "#15803d", color: "#fff", border: "none", borderRadius: 10, padding: "12px 32px", fontWeight: 700, fontSize: 15, cursor: "pointer", width: "100%" }}>
        Continue Shopping
      </button>
    </div>
  </div>
);

// ─── Cart Page ────────────────────────────────────────────────────────────────

const CartPage = ({ cart, onUpdateQty, onRemove, onBack, onCheckout }) => {
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const itemCount = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <div style={{ minHeight: "100vh", background: "#f3f4f6", paddingTop: 84 }}>
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "36px 24px 72px" }}>
        <button onClick={onBack} style={{ display: "flex", alignItems: "center", gap: 7, background: "none", border: "none", cursor: "pointer", color: "#374151", fontWeight: 600, fontSize: 14, marginBottom: 26, padding: 0 }}>
          <ArrowLeft size={17} /> Back to Store
        </button>
        <h1 style={{ fontWeight: 800, fontSize: 28, color: "#111", marginBottom: 4 }}>Your Cart</h1>
        <p style={{ fontSize: 14, color: "#6b7280", marginBottom: 32 }}>{itemCount} item{itemCount !== 1 ? "s" : ""} in your cart</p>

        {cart.length === 0 ? (
          <div style={{ textAlign: "center", padding: "90px 0" }}>
            <Package size={68} color="#d1d5db" style={{ margin: "0 auto 20px", display: "block" }} />
            <p style={{ fontSize: 18, color: "#9ca3af", fontWeight: 600, marginBottom: 6 }}>Your cart is empty</p>
            <p style={{ fontSize: 14, color: "#b0b7c3", marginBottom: 24 }}>Add some items from the store to get started.</p>
            <button onClick={onBack} style={{ background: "#15803d", color: "#fff", border: "none", borderRadius: 10, padding: "11px 28px", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>
              Browse Store
            </button>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 24, alignItems: "flex-start" }}>
            {/* Cart items list */}
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {cart.map((item) => (
                <div key={item.cartId} style={{ background: "#fff", borderRadius: 12, border: "1px solid #e5e7eb", display: "flex", gap: 16, padding: "16px 18px", alignItems: "center" }}>
                  <div style={{ width: 84, height: 84, borderRadius: 10, overflow: "hidden", background: "#f3f4f6", flexShrink: 0 }}>
                    <img src={item.image} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={(e) => { e.target.style.display = "none"; }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 15, color: "#111", marginBottom: 3 }}>{item.name}</div>
                    <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 12 }}>{item.description}</div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      {/* Qty controls */}
                      <div style={{ display: "flex", alignItems: "center", border: "1.5px solid #e5e7eb", borderRadius: 8, overflow: "hidden" }}>
                        <button onClick={() => onUpdateQty(item.cartId, item.qty - 1)} style={{ width: 34, height: 34, display: "flex", alignItems: "center", justifyContent: "center", background: "#f9fafb", border: "none", cursor: "pointer" }}>
                          <Minus size={14} color="#374151" />
                        </button>
                        <span style={{ width: 38, textAlign: "center", fontSize: 14, fontWeight: 700, color: "#111" }}>{item.qty}</span>
                        <button onClick={() => onUpdateQty(item.cartId, item.qty + 1)} style={{ width: 34, height: 34, display: "flex", alignItems: "center", justifyContent: "center", background: "#f9fafb", border: "none", cursor: "pointer" }}>
                          <Plus size={14} color="#374151" />
                        </button>
                      </div>
                      <span style={{ fontWeight: 800, fontSize: 16, color: "#15803d" }}>GH₵ {(item.price * item.qty).toFixed(2)}</span>
                      <button onClick={() => onRemove(item.cartId)} style={{ background: "#fff5f5", border: "none", cursor: "pointer", padding: "6px 8px", borderRadius: 7 }}>
                        <Trash2 size={16} color="#ef4444" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary panel */}
            <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #e5e7eb", padding: "24px", position: "sticky", top: 100 }}>
              <h3 style={{ fontWeight: 800, fontSize: 17, color: "#111", marginBottom: 20 }}>Order Summary</h3>
              {cart.map((item) => (
                <div key={item.cartId} style={{ display: "flex", justifyContent: "space-between", fontSize: 13.5, color: "#374151", marginBottom: 8 }}>
                  <span style={{ color: "#6b7280" }}>{item.name} ×{item.qty}</span>
                  <span>GH₵ {(item.price * item.qty).toFixed(2)}</span>
                </div>
              ))}
              <div style={{ borderTop: "1px solid #e5e7eb", margin: "14px 0" }} />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, color: "#6b7280", marginBottom: 6 }}>
                <span>Subtotal</span><span>GH₵ {total.toFixed(2)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, color: "#6b7280", marginBottom: 18 }}>
                <span>Delivery</span><span style={{ color: "#15803d", fontWeight: 600 }}>Free</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 800, fontSize: 18, color: "#111", marginBottom: 22 }}>
                <span>Total</span><span style={{ color: "#15803d" }}>GH₵ {total.toFixed(2)}</span>
              </div>
              <button onClick={onCheckout} style={{ width: "100%", padding: "13px 0", background: "#15803d", color: "#fff", border: "none", borderRadius: 10, fontWeight: 700, fontSize: 15, cursor: "pointer", marginBottom: 10 }}>
                Checkout
              </button>
              <button onClick={onBack} style={{ width: "100%", padding: "11px 0", background: "#fff", color: "#374151", border: "1.5px solid #d1d5db", borderRadius: 10, fontWeight: 600, fontSize: 14, cursor: "pointer" }}>
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ─── Main App ─────────────────────────────────────────────────────────────────

const StorePage = () => {
  const [page, setPage] = useState("store");
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [sortBy, setSortBy] = useState("Featured");
  const [cartItems, setCartItems] = useState([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [customerName, setCustomerName] = useState("");

  const handleAdd = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) return prev.map((i) => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, cartId: `${product.id}-${Date.now()}`, qty: 1 }];
    });
  };

  const handleUpdateQty = (cartId, qty) => {
    if (qty <= 0) { setCartItems((prev) => prev.filter((i) => i.cartId !== cartId)); return; }
    setCartItems((prev) => prev.map((i) => i.cartId === cartId ? { ...i, qty } : i));
  };

  const handleRemove = (cartId) => setCartItems((prev) => prev.filter((i) => i.cartId !== cartId));

  const handleSuccess = (form) => {
    setCustomerName(form.fullName);
    setShowCheckout(false);
    setShowSuccess(true);
    setCartItems([]);
  };

  const totalCount = cartItems.reduce((s, i) => s + i.qty, 0);

  const filtered = PRODUCTS
    .filter((p) => selectedCategory === "All Products" || p.category === selectedCategory)
    .sort((a, b) => {
      if (sortBy === "Price: Low to High") return a.price - b.price;
      if (sortBy === "Price: High to Low") return b.price - a.price;
      return 0;
    });

  return (
    <div style={{ minHeight: "100vh", background: "#f3f4f6", fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      <Navbar cartCount={totalCount} onCartClick={() => setPage("cart")} />

      {page === "store" ? (
        <div style={{ paddingTop: 84 }}>
          <Hero />
          <div style={{ maxWidth: 1280, margin: "0 auto", padding: "32px 32px 64px", display: "flex", gap: 28, alignItems: "flex-start" }}>
            <div style={{ width: 248, flexShrink: 0, position: "sticky", top: 100 }}>
              <FiltersCard selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} sortBy={sortBy} setSortBy={setSortBy} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 20 }}>
                <h2 style={{ fontWeight: 800, fontSize: 22, color: "#111" }}>New Arrivals</h2>
                <span style={{ fontSize: 14, color: "#9ca3af" }}>Showing {filtered.length} product{filtered.length !== 1 ? "s" : ""}</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} onAdd={handleAdd} />
                ))}
              </div>
              {filtered.length === 0 && (
                <div style={{ textAlign: "center", padding: "60px 0", color: "#9ca3af", fontSize: 15 }}>No products found in this category.</div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <CartPage cart={cartItems} onUpdateQty={handleUpdateQty} onRemove={handleRemove} onBack={() => setPage("store")} onCheckout={() => setShowCheckout(true)} />
      )}

      {showCheckout && <CheckoutModal cart={cartItems} onClose={() => setShowCheckout(false)} onSuccess={handleSuccess} />}
      {showSuccess && <SuccessModal customerName={customerName} onClose={() => { setShowSuccess(false); setPage("store"); }} />}
    </div>
  );
};

export default StorePage;