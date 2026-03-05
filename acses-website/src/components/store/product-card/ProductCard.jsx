import { ShoppingCart } from "lucide-react";

const ProductCard = ({ product, onAdd }) => (
  <>
    <style>{`
      .product-card { background: #fff; border-radius: 12px; border: 1px solid #e5e7eb; overflow: hidden; display: flex; flex-direction: column; }
      .product-card-img { position: relative; background: #f3f4f6; height: 220px; overflow: hidden; }
      .product-card-img img { width: 100%; height: 100%; object-fit: cover; }
      .product-card-body { padding: 16px 18px 18px; flex: 1; display: flex; flex-direction: column; }
      .product-card-name { font-weight: 700; font-size: 16px; color: #111; margin-bottom: 5px; }
      .product-card-desc { font-size: 13.5px; color: #6b7280; margin-bottom: 16px; line-height: 1.5; flex: 1; }
      .product-card-footer { display: flex; align-items: center; justify-content: space-between; }
      .product-card-price { font-weight: 700; font-size: 18px; color: #15803d; }
      .product-card-orig { margin-left: 8px; font-size: 13px; color: #9ca3af; text-decoration: line-through; }
      .product-card-btn { background: #15803d; color: #fff; border: none; border-radius: 8px; padding: 9px 18px; font-weight: 600; font-size: 14px; cursor: pointer; display: flex; align-items: center; gap: 6px; }
      @media (max-width: 640px) {
        .product-card-img { height: 160px; }
        .product-card-body { padding: 12px 14px 14px; }
        .product-card-name { font-size: 14px; }
        .product-card-desc { font-size: 12.5px; margin-bottom: 12px; }
        .product-card-price { font-size: 16px; }
        .product-card-btn { padding: 8px 12px; font-size: 13px; }
      }
    `}</style>
    <div className="product-card">
      <div className="product-card-img">
        <img src={product.image} alt={product.name} onError={(e) => { e.target.style.display = "none"; }} />
        {product.badge && (
          <span style={{ position: "absolute", top: 12, left: 12, background: product.badgeColor, color: "#fff", fontWeight: 700, fontSize: 11, padding: "4px 10px", borderRadius: 6, letterSpacing: "0.06em" }}>
            {product.badge}
          </span>
        )}
      </div>
      <div className="product-card-body">
        <div className="product-card-name">{product.name}</div>
        <div className="product-card-desc">{product.description}</div>
        <div className="product-card-footer">
          <div>
            <span className="product-card-price">GH₵ {product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="product-card-orig">GH₵ {product.originalPrice.toFixed(2)}</span>
            )}
          </div>
          <button className="product-card-btn" onClick={() => onAdd(product)}>
            <ShoppingCart size={15} /> Add
          </button>
        </div>
      </div>
    </div>
  </>
);

export default ProductCard;