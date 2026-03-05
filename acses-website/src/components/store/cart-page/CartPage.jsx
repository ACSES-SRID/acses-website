import { ArrowLeft, Package, Trash2, Plus, Minus } from "lucide-react";

const CartPage = ({ cart, onUpdateQty, onRemove, onBack, onCheckout }) => {
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const itemCount = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <>
      <style>{`
        .cart-page { min-height: 100vh; background: #f3f4f6; padding-top: 84px; }
        .cart-inner { max-width: 960px; margin: 0 auto; padding: 36px 24px 72px; }
        .cart-grid { display: grid; grid-template-columns: 1fr 320px; gap: 24px; align-items: flex-start; }
        .cart-summary-panel { background: #fff; border-radius: 12px; border: 1px solid #e5e7eb; padding: 24px; position: sticky; top: 100px; }
        .cart-item-footer { display: flex; align-items: center; justify-content: space-between; }
        .cart-item-desc { font-size: 13px; color: #6b7280; margin-bottom: 12px; }

        /* Mobile sticky checkout bar */
        .cart-mobile-checkout { display: none; }

        @media (max-width: 768px) {
          .cart-page { padding-top: 60px; }
          .cart-inner { padding: 20px 14px 100px; }
          .cart-grid { grid-template-columns: 1fr; gap: 16px; }
          .cart-summary-panel { position: static; }
          .cart-item-desc { display: none; }
          .cart-item-footer { gap: 8px; }

          /* Hide the summary panel's checkout button on mobile — we use the sticky bar instead */
          .cart-summary-checkout-btn { display: none !important; }
          .cart-summary-continue-btn { display: none !important; }

          /* Sticky bottom checkout bar */
          .cart-mobile-checkout {
            display: flex;
            position: fixed; bottom: 0; left: 0; right: 0; z-index: 50;
            background: #fff; border-top: 1px solid #e5e7eb;
            padding: 12px 16px 20px; gap: 10px; align-items: center;
            box-shadow: 0 -4px 16px rgba(0,0,0,0.08);
          }
        }
      `}</style>

      <div className="cart-page">
        <div className="cart-inner">
          <button onClick={onBack} style={{ display: "flex", alignItems: "center", gap: 7, background: "none", border: "none", cursor: "pointer", color: "#374151", fontWeight: 600, fontSize: 14, marginBottom: 20, padding: 0 }}>
            <ArrowLeft size={17} /> Back to Store
          </button>
          <h1 style={{ fontWeight: 800, fontSize: 28, color: "#111", marginBottom: 4 }}>Your Cart</h1>
          <p style={{ fontSize: 14, color: "#6b7280", marginBottom: 28 }}>{itemCount} item{itemCount !== 1 ? "s" : ""} in your cart</p>

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
            <div className="cart-grid">
              {/* Cart items list */}
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {cart.map((item) => (
                  <div key={item.cartId} style={{ background: "#fff", borderRadius: 12, border: "1px solid #e5e7eb", display: "flex", gap: 14, padding: "14px 16px", alignItems: "center" }}>
                    <div style={{ width: 76, height: 76, borderRadius: 10, overflow: "hidden", background: "#f3f4f6", flexShrink: 0 }}>
                      <img src={item.image} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={(e) => { e.target.style.display = "none"; }} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 700, fontSize: 15, color: "#111", marginBottom: 3, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.name}</div>
                      <div className="cart-item-desc">{item.description}</div>
                      <div className="cart-item-footer">
                        {/* Qty controls */}
                        <div style={{ display: "flex", alignItems: "center", border: "1.5px solid #e5e7eb", borderRadius: 8, overflow: "hidden" }}>
                          <button onClick={() => onUpdateQty(item.cartId, item.qty - 1)} style={{ width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", background: "#f9fafb", border: "none", cursor: "pointer" }}>
                            <Minus size={13} color="#374151" />
                          </button>
                          <span style={{ width: 34, textAlign: "center", fontSize: 14, fontWeight: 700, color: "#111" }}>{item.qty}</span>
                          <button onClick={() => onUpdateQty(item.cartId, item.qty + 1)} style={{ width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", background: "#f9fafb", border: "none", cursor: "pointer" }}>
                            <Plus size={13} color="#374151" />
                          </button>
                        </div>
                        <span style={{ fontWeight: 800, fontSize: 15, color: "#15803d" }}>GH₵ {(item.price * item.qty).toFixed(2)}</span>
                        <button onClick={() => onRemove(item.cartId)} style={{ background: "#fff5f5", border: "none", cursor: "pointer", padding: "6px 8px", borderRadius: 7, flexShrink: 0 }}>
                          <Trash2 size={15} color="#ef4444" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary panel */}
              <div className="cart-summary-panel">
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
                <button className="cart-summary-checkout-btn" onClick={onCheckout} style={{ width: "100%", padding: "13px 0", background: "#15803d", color: "#fff", border: "none", borderRadius: 10, fontWeight: 700, fontSize: 15, cursor: "pointer", marginBottom: 10 }}>
                  Checkout
                </button>
                <button className="cart-summary-continue-btn" onClick={onBack} style={{ width: "100%", padding: "11px 0", background: "#fff", color: "#374151", border: "1.5px solid #d1d5db", borderRadius: 10, fontWeight: 600, fontSize: 14, cursor: "pointer" }}>
                  Continue Shopping
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Mobile sticky checkout bar */}
        {cart.length > 0 && (
          <div className="cart-mobile-checkout">
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, color: "#6b7280" }}>Total</div>
              <div style={{ fontWeight: 800, fontSize: 18, color: "#15803d" }}>GH₵ {total.toFixed(2)}</div>
            </div>
            <button onClick={onCheckout} style={{ background: "#15803d", color: "#fff", border: "none", borderRadius: 10, padding: "13px 28px", fontWeight: 700, fontSize: 15, cursor: "pointer" }}>
              Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartPage;