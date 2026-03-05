import { useState, useCallback, useMemo, memo } from "react";
import { X } from "lucide-react";

// Move Field component outside of CheckoutModal to make it a proper component
const Field = memo(({ label, fkey, placeholder, type = "text", value, error, onChange }) => {
  const handleChange = useCallback((e) => {
    onChange(fkey, e.target.value);
  }, [fkey, onChange]);

  return (
    <div style={{ marginBottom: 15 }}>
      <label style={{ display: "block", fontSize: 12.5, fontWeight: 600, color: "#374151", marginBottom: 5 }}>{label}</label>
      <input 
        type={type} 
        placeholder={placeholder} 
        value={value || ""} 
        onChange={handleChange}
        autoComplete="off"
        style={{ 
          width: "100%", 
          padding: "9px 12px", 
          borderRadius: 8, 
          fontSize: 14, 
          color: "#111", 
          border: `1.5px solid ${error ? "#ef4444" : "#d1d5db"}`, 
          outline: "none", 
          boxSizing: "border-box" 
        }} 
      />
      {error && <span style={{ fontSize: 11.5, color: "#ef4444", marginTop: 3, display: "block" }}>{error}</span>}
    </div>
  );
});

const CheckoutModal = memo(({ cart, onClose, onSuccess }) => {
  const [form, setForm] = useState({ 
    fullName: "", 
    studentId: "", 
    email: "", 
    phone: "", 
    level: "", 
    hall: "", 
    paymentMethod: "Mobile Money", 
    momoNumber: "" 
  });
  const [errors, setErrors] = useState({});
  
  // Memoize total calculation
  const total = useMemo(() => 
    cart.reduce((s, i) => s + i.price * i.qty, 0), 
    [cart]
  );

  // Stable set function
  const set = useCallback((key, val) => { 
    setForm(prev => ({ ...prev, [key]: val })); 
    setErrors(prev => ({ ...prev, [key]: undefined })); 
  }, []);

  const validate = useCallback(() => {
    const e = {};
    if (!form.fullName.trim()) e.fullName = "Full name is required";
    if (!form.studentId.trim()) e.studentId = "Student ID is required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email required";
    if (!form.phone.trim()) e.phone = "Phone number is required";
    if (!form.level) e.level = "Please select your level";
    if (form.paymentMethod === "Mobile Money" && !form.momoNumber.trim()) e.momoNumber = "MoMo number required";
    return e;
  }, [form]);

  const handleSubmit = useCallback(() => {
    const e = validate();
    if (Object.keys(e).length) { 
      setErrors(e); 
      return; 
    }
    onSuccess(form);
  }, [form, validate, onSuccess]);

  const handleBackdropClick = useCallback((e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }, [onClose]);

  // If cart is empty, don't render or show a message
  if (cart.length === 0) {
    return null;
  }

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div 
        onClick={handleBackdropClick}
        style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(2px)" }} 
      />
      <div 
        style={{ 
          position: "relative", 
          background: "#fff", 
          borderRadius: 16, 
          width: "100%", 
          maxWidth: 560, 
          maxHeight: "92vh", 
          overflowY: "auto", 
          boxShadow: "0 24px 64px rgba(0,0,0,0.22)", 
          zIndex: 201, 
          margin: "0 16px" 
        }}
      >
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
          <Field 
            label="Full Name" 
            fkey="fullName" 
            placeholder="e.g. Kwame Mensah" 
            value={form.fullName}
            error={errors.fullName}
            onChange={set}
          />
          <Field 
            label="Student ID" 
            fkey="studentId" 
            placeholder="e.g. 10XXXXXXX" 
            value={form.studentId}
            error={errors.studentId}
            onChange={set}
          />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <Field 
              label="Email Address" 
              fkey="email" 
              placeholder="you@university.edu" 
              type="email" 
              value={form.email}
              error={errors.email}
              onChange={set}
            />
            <Field 
              label="Phone Number" 
              fkey="phone" 
              placeholder="0XX XXX XXXX" 
              type="tel" 
              value={form.phone}
              error={errors.phone}
              onChange={set}
            />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <div style={{ marginBottom: 15 }}>
              <label style={{ display: "block", fontSize: 12.5, fontWeight: 600, color: "#374151", marginBottom: 5 }}>Level</label>
              <select 
                value={form.level} 
                onChange={(e) => set("level", e.target.value)}
                style={{ 
                  width: "100%", 
                  padding: "9px 12px", 
                  borderRadius: 8, 
                  fontSize: 14, 
                  color: form.level ? "#111" : "#9ca3af", 
                  border: `1.5px solid ${errors.level ? "#ef4444" : "#d1d5db"}`, 
                  outline: "none", 
                  background: "#fff", 
                  boxSizing: "border-box" 
                }}
              >
                <option value="">Select level</option>
                {["100", "200", "300", "400", "Postgrad"].map(l => <option key={l} value={l}>{l}</option>)}
              </select>
              {errors.level && <span style={{ fontSize: 11.5, color: "#ef4444", marginTop: 3, display: "block" }}>{errors.level}</span>}
            </div>
            <Field 
              label="Hall / Hostel" 
              fkey="hall" 
              placeholder="e.g. Unity Hall" 
              value={form.hall}
              error={errors.hall}
              onChange={set}
            />
          </div>

          {/* Payment */}
          <div style={{ fontWeight: 700, fontSize: 12, color: "#9ca3af", letterSpacing: "0.07em", marginBottom: 14 }}>PAYMENT METHOD</div>
          <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
            {["Mobile Money", "Cash on Delivery"].map((method) => (
              <button 
                key={method} 
                onClick={() => set("paymentMethod", method)} 
                type="button"
                style={{
                  flex: 1, 
                  padding: "10px 0", 
                  borderRadius: 8, 
                  fontSize: 13.5, 
                  fontWeight: 600, 
                  cursor: "pointer",
                  background: form.paymentMethod === method ? "#15803d" : "#fff",
                  color: form.paymentMethod === method ? "#fff" : "#374151",
                  border: `2px solid ${form.paymentMethod === method ? "#15803d" : "#d1d5db"}`,
                }}
              >
                {method}
              </button>
            ))}
          </div>
          {form.paymentMethod === "Mobile Money" && (
            <Field 
              label="MoMo Number" 
              fkey="momoNumber" 
              placeholder="e.g. 055 XXX XXXX" 
              type="tel" 
              value={form.momoNumber}
              error={errors.momoNumber}
              onChange={set}
            />
          )}

          <button 
            onClick={handleSubmit} 
            type="button"
            style={{ 
              width: "100%", 
              padding: "13px 0", 
              background: "#15803d", 
              color: "#fff", 
              border: "none", 
              borderRadius: 10, 
              fontWeight: 700, 
              fontSize: 15.5, 
              cursor: "pointer", 
              marginTop: 4 
            }}
          >
            Place Order — GH₵ {total.toFixed(2)}
          </button>
        </div>
      </div>
    </div>
  );
});

export default CheckoutModal;