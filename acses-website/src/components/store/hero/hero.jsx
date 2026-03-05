const Hero = () => (
  <>
    <style>{`
      .hero {
        background: linear-gradient(135deg, #14532d 0%, #166534 60%, #15803d 100%);
        padding: 64px 40px;
        text-align: center;
        position: relative;
        overflow: hidden;
      }
      .hero h1 { color: #fff; font-size: 44px; font-weight: 800; margin-bottom: 14px; letter-spacing: -0.02em; position: relative; }
      .hero p { color: rgba(255,255,255,0.82); font-size: 17px; max-width: 520px; margin: 0 auto; line-height: 1.6; position: relative; }
      @media (max-width: 640px) {
        .hero { padding: 40px 20px; }
        .hero h1 { font-size: 28px; margin-bottom: 10px; }
        .hero p { font-size: 14px; }
      }
    `}</style>
    <div className="hero">
      <div style={{ position: "absolute", left: -80, top: -80, width: 320, height: 320, borderRadius: "50%", background: "rgba(255,255,255,0.04)" }} />
      <div style={{ position: "absolute", right: -40, bottom: -60, width: 240, height: 240, borderRadius: "50%", background: "rgba(255,255,255,0.04)" }} />
      <h1>Official Swag</h1>
      <p>Rep your department with pride. High-quality apparel and accessories for the future tech leaders.</p>
    </div>
  </>
);

export default Hero;