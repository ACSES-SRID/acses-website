import { useState } from "react";
import { PRODUCTS } from "../../data/storeData";
import Navbar from "../../components/store/navbar/navbar";
import Hero from "../../components/store/hero/hero";
import FiltersCard from "../../components/store/filter-card/FiltersCard";
import ProductCard from "../../components/store/product-card/ProductCard";
import CheckoutModal from "../../components/store/checkout-modal/CheckoutModal";
import SuccessModal from "../../components/store/success-modal/SuccessModal";
import CartPage from "../../components/store/cart-page/CartPage";

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