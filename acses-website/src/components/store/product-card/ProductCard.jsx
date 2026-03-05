import { ShoppingCart } from "lucide-react";

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

export default ProductCard;