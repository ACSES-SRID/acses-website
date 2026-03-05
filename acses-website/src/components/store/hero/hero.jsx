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

export default Hero;