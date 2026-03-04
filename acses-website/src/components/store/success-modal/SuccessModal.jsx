import { CheckCircle } from "lucide-react";

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

export default SuccessModal;