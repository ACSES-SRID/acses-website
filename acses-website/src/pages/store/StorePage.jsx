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
    <>
      <style>{`
        .store-layout {
          display: flex; gap: 28px; align-items: flex-start;
          max-width: 1280px; margin: 0 auto; padding: 32px 32px 64px;
        }
        .store-sidebar {
          width: 248px; flex-shrink: 0; position: sticky; top: 100px;
        }
        .store-products-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;
        }
        .store-mobile-topbar { display: none; }
        @media (max-width: 1024px) {
          .store-products-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 768px) {
          .store-layout { padding: 16px 14px 48px; gap: 0; }
          .store-sidebar { display: none; }
          .store-mobile-topbar {
            display: flex; align-items: center; justify-content: space-between;
            margin-bottom: 16px;
          }
          .store-products-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
        }
        @media (max-width: 420px) {
          .store-products-grid { grid-template-columns: 1fr 1fr; gap: 10px; }
        }
      `}</style>
      <div style={{ minHeight: "100vh", background: "#f3f4f6", fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
        <Navbar cartCount={totalCount} onCartClick={() => setPage("cart")} />

        {page === "store" ? (
          <div style={{ paddingTop: 84 }}>
            <Hero />
            <div className="store-layout">
              {/* Desktop sidebar */}
              <div className="store-sidebar">
                <FiltersCard selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} sortBy={sortBy} setSortBy={setSortBy} />
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                {/* Mobile top bar with filter button + count */}
                <div className="store-mobile-topbar">
                  <div>
                    <h2 style={{ fontWeight: 800, fontSize: 18, color: "#111", margin: 0 }}>New Arrivals</h2>
                    <span style={{ fontSize: 13, color: "#9ca3af" }}>{filtered.length} product{filtered.length !== 1 ? "s" : ""}</span>
                  </div>
                  <FiltersCard selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} sortBy={sortBy} setSortBy={setSortBy} />
                </div>

                {/* Desktop heading */}
                <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 20 }} className="desktop-only-heading">
                  <h2 style={{ fontWeight: 800, fontSize: 22, color: "#111" }}>New Arrivals</h2>
                  <span style={{ fontSize: 14, color: "#9ca3af" }}>Showing {filtered.length} product{filtered.length !== 1 ? "s" : ""}</span>
                </div>

                <div className="store-products-grid">
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
    </>
  );
};

export default StorePage;