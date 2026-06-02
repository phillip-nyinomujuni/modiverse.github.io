import { useState, useEffect, useRef } from "react";

const styles = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { font-family: 'DM Sans', sans-serif; background: #fff; color: #0a0a0a; }

  /* NAV */
  .mobi-nav {
    position: sticky; top: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 18px 48px;
    background: #fff;
    border-bottom: 1px solid #e0eeff;
  }
  .mobi-logo { font-family: 'Bebas Neue', sans-serif; font-size: 1.6rem; letter-spacing: .05em; color: #0057ff; }
  .mobi-logo span { color: #00c6ff; }
  .nav-links { display: flex; gap: 36px; list-style: none; }
  .nav-links a { text-decoration: none; font-size: .85rem; font-weight: 500; letter-spacing: .06em; color: #333; transition: color .2s; }
  .nav-links a:hover { color: #0057ff; }
  .nav-hamburger { display: none; background: none; border: none; font-size: 1.4rem; cursor: pointer; color: #0057ff; }
  .mobile-menu { display: none; flex-direction: column; gap: 16px; padding: 16px 24px; background: #fff; border-bottom: 1px solid #e0eeff; }
  .mobile-menu.open { display: flex; }
  .mobile-menu a { text-decoration: none; font-size: 1rem; font-weight: 500; color: #333; }

  /* BUTTONS */
  .btn {
    display: inline-block; padding: 13px 30px;
    font-family: 'DM Sans', sans-serif; font-size: .85rem; font-weight: 500;
    letter-spacing: .06em; text-transform: uppercase; text-decoration: none;
    border-radius: 6px; cursor: pointer; transition: all .2s;
    border: 2px solid transparent;
  }
  .btn-primary { background: #0057ff; color: #fff; border-color: #0057ff; }
  .btn-primary:hover { background: #0040cc; border-color: #0040cc; box-shadow: 0 4px 20px rgba(0,87,255,.4); }
  .btn-outline { background: transparent; color: #fff; border-color: rgba(255,255,255,.6); }
  .btn-outline:hover { background: rgba(255,255,255,.15); border-color: #fff; }
  .btn-outline-blue { background: transparent; color: #0057ff; border-color: #0057ff; }
  .btn-outline-blue:hover { background: #0057ff; color: #fff; }

  .label {
    font-size: .72rem; font-weight: 500; letter-spacing: .18em;
    text-transform: uppercase; color: #0057ff; margin-bottom: 10px;
  }

  /* ====== HERO ====== */
  .hero-wrapper {
    position: relative;
    background: linear-gradient(135deg, #000d2e 0%, #001a6e 40%, #0032cc 70%, #0057ff 100%);
    overflow: hidden;
    min-height: 92vh;
    display: flex; align-items: center;
  }

  /* Glowing orbs */
  .hero-wrapper::before {
    content: '';
    position: absolute; top: -100px; right: -100px;
    width: 500px; height: 500px;
    background: radial-gradient(circle, rgba(0,198,255,.25) 0%, transparent 70%);
    border-radius: 50%;
    animation: pulse 4s ease-in-out infinite;
  }
  .hero-wrapper::after {
    content: '';
    position: absolute; bottom: -150px; left: -100px;
    width: 600px; height: 600px;
    background: radial-gradient(circle, rgba(0,87,255,.2) 0%, transparent 70%);
    border-radius: 50%;
    animation: pulse 6s ease-in-out infinite reverse;
  }

  /* Grid lines background */
  .hero-grid-bg {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(0,198,255,.06) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0,198,255,.06) 1px, transparent 1px);
    background-size: 60px 60px;
  }

  .hero-inner {
    position: relative; z-index: 2;
    max-width: 1140px; margin: 0 auto;
    padding: 80px 48px;
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 64px; align-items: center;
  }

  .hero-tag {
    display: inline-flex; align-items: center; gap: 8px;
    font-size: .72rem; font-weight: 500;
    letter-spacing: .18em; text-transform: uppercase;
    background: rgba(0,198,255,.15); color: #00c6ff;
    border: 1px solid rgba(0,198,255,.3);
    padding: 7px 16px; border-radius: 999px; margin-bottom: 28px;
  }
  .hero-tag::before { content: '●'; font-size: .5rem; animation: blink 1.5s infinite; }

  .hero-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(3.5rem, 7vw, 6.5rem);
    line-height: 1; letter-spacing: .02em; margin-bottom: 24px;
    color: #fff;
  }
  .hero-title span {
    background: linear-gradient(90deg, #00c6ff, #0057ff);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .hero-sub { font-size: 1rem; color: rgba(255,255,255,.7); margin-bottom: 40px; line-height: 1.75; max-width: 440px; }

  .hero-actions { display: flex; gap: 16px; flex-wrap: wrap; margin-bottom: 56px; }

  .hero-stats { display: flex; gap: 40px; flex-wrap: wrap; }
  .hero-stat { text-align: left; }
  .hero-stat span {
    font-family: 'Bebas Neue', sans-serif; font-size: 2.4rem;
    display: block; color: #00c6ff; line-height: 1;
  }
  .hero-stat p { font-size: .72rem; letter-spacing: .12em; text-transform: uppercase; color: rgba(255,255,255,.5); margin-top: 4px; }

  /* GADGET DISPLAY */
  .hero-visual {
    position: relative; height: 480px;
    display: flex; align-items: center; justify-content: center;
  }

  /* Central phone mockup */
  .phone-mockup {
    position: relative; z-index: 3;
    width: 160px; height: 320px;
    background: linear-gradient(160deg, #1a1a2e, #16213e);
    border-radius: 32px;
    border: 2px solid rgba(0,198,255,.4);
    box-shadow:
      0 0 40px rgba(0,87,255,.4),
      0 0 80px rgba(0,87,255,.2),
      inset 0 0 20px rgba(0,198,255,.05);
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    gap: 12px;
    animation: float 3s ease-in-out infinite;
  }
  .phone-mockup::before {
    content: '';
    position: absolute; top: 12px;
    width: 50px; height: 6px;
    background: rgba(0,198,255,.3);
    border-radius: 999px;
  }
  .phone-screen-icon { font-size: 2.8rem; }
  .phone-screen-text { font-size: .65rem; color: rgba(0,198,255,.8); letter-spacing: .1em; text-transform: uppercase; }

  /* Floating gadget cards */
  .gadget-card {
    position: absolute;
    background: rgba(255,255,255,.06);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(0,198,255,.2);
    border-radius: 16px;
    padding: 14px 18px;
    display: flex; align-items: center; gap: 12px;
    box-shadow: 0 8px 32px rgba(0,0,0,.3);
    white-space: nowrap;
  }
  .gadget-card span { font-size: 1.6rem; }
  .gadget-card-text { display: flex; flex-direction: column; }
  .gadget-card-title { font-size: .78rem; font-weight: 600; color: #fff; }
  .gadget-card-sub { font-size: .68rem; color: rgba(0,198,255,.8); }

  .gc-1 { top: 30px; left: -20px; animation: float 3.2s ease-in-out infinite; }
  .gc-2 { top: 30px; right: -10px; animation: float 2.8s ease-in-out infinite 0.5s; }
  .gc-3 { bottom: 60px; left: -30px; animation: float 3.5s ease-in-out infinite 1s; }
  .gc-4 { bottom: 60px; right: -20px; animation: float 3s ease-in-out infinite 1.5s; }

  /* Orbit ring */
  .orbit-ring {
    position: absolute;
    border-radius: 50%;
    border: 1px dashed rgba(0,198,255,.15);
  }
  .orbit-1 { width: 280px; height: 280px; animation: spin 20s linear infinite; }
  .orbit-2 { width: 400px; height: 400px; animation: spin 30s linear infinite reverse; }

  /* Orbit dots */
  .orbit-dot {
    position: absolute; width: 8px; height: 8px;
    background: #00c6ff; border-radius: 50%;
    box-shadow: 0 0 10px #00c6ff;
    top: -4px; left: 50%;
  }

  /* ABOUT */
  .about { background: linear-gradient(135deg, #e0eeff 0%, #f0f8ff 100%); padding: 96px 48px; }
  .about-grid { max-width: 1140px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: start; }
  .about-text h2 { font-family: 'Bebas Neue', sans-serif; font-size: clamp(2rem, 3.5vw, 3rem); letter-spacing: .02em; line-height: 1.15; margin-bottom: 20px; color: #0057ff; }
  .about-text p { color: #444; margin-bottom: 14px; line-height: 1.75; }
  .about-cards { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .about-card { background: #fff; padding: 24px; border-radius: 10px; border: 1.5px solid #c0d8ff; transition: box-shadow .2s, transform .2s, opacity .5s; }
  .about-card:hover { box-shadow: 0 8px 28px rgba(0,87,255,.12); transform: translateY(-3px); }
  .about-card.hidden { opacity: 0; transform: translateY(20px); }
  .about-icon { font-size: 1.6rem; margin-bottom: 10px; }
  .about-card h3 { font-size: .9rem; font-weight: 600; margin-bottom: 6px; color: #0057ff; }
  .about-card p { font-size: .82rem; color: #555; margin: 0; }

  /* PRODUCTS */
  .products { padding: 96px 48px; max-width: 1140px; margin: 0 auto; }
  .products-header { margin-bottom: 48px; }
  .products-header h2 { font-family: 'Bebas Neue', sans-serif; font-size: clamp(2rem, 3.5vw, 3rem); letter-spacing: .02em; color: #0a0a0a; }
  .products-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
  .product-card { position: relative; padding: 32px 28px; border: 1.5px solid #e0eeff; border-radius: 10px; transition: all .2s, opacity .5s, transform .5s; background: #fff; }
  .product-card:hover { border-color: #0057ff; box-shadow: 0 8px 32px rgba(0,87,255,.12); transform: translateY(-3px); }
  .product-card.featured { background: linear-gradient(135deg, #0057ff 0%, #00c6ff 100%); color: #fff; border-color: #0057ff; }
  .product-card.featured p { color: rgba(255,255,255,.8); }
  .product-card.featured .pc-link { color: #fff; border-color: #fff; }
  .product-card.featured h3 { color: #fff; }
  .product-card.hidden { opacity: 0; transform: translateY(20px); }
  .pc-badge { position: absolute; top: 16px; right: 16px; font-size: .65rem; font-weight: 600; letter-spacing: .12em; text-transform: uppercase; background: #fff; color: #0057ff; padding: 4px 10px; border-radius: 999px; }
  .pc-img { font-size: 2rem; margin-bottom: 16px; }
  .product-card h3 { font-size: 1rem; font-weight: 600; margin-bottom: 8px; color: #0a0a0a; }
  .product-card p { font-size: .85rem; margin-bottom: 20px; color: #555; }
  .pc-link { font-size: .8rem; font-weight: 500; letter-spacing: .06em; text-decoration: none; color: #0057ff; border-bottom: 1px solid currentColor; padding-bottom: 2px; transition: opacity .2s; background: none; border-top: none; border-left: none; border-right: none; cursor: pointer; font-family: 'DM Sans', sans-serif; }
  .pc-link:hover { opacity: .6; }

  /* TESTIMONIALS */
  .testimonials { background: #f5f9ff; padding: 96px 48px; text-align: center; }
  .testimonials h2 { font-family: 'Bebas Neue', sans-serif; font-size: clamp(2rem, 3.5vw, 3rem); letter-spacing: .02em; margin-bottom: 48px; color: #0057ff; }
  .testimonials-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; max-width: 1140px; margin: 0 auto; text-align: left; }
  .testimonial { background: #fff; padding: 32px; border-radius: 10px; border: 1.5px solid #c0d8ff; transition: opacity .5s, transform .5s; }
  .testimonial.hidden { opacity: 0; transform: translateY(20px); }
  .t-stars { color: #0057ff; font-size: .9rem; margin-bottom: 14px; }
  .testimonial p { color: #555; font-size: .9rem; line-height: 1.75; margin-bottom: 16px; }
  .t-author { font-size: .78rem; font-weight: 600; letter-spacing: .06em; color: #0057ff; }

  /* CONTACT */
  .contact { padding: 96px 48px; background: #fff; }
  .contact-inner { max-width: 1140px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: start; }
  .contact-text h2 { font-family: 'Bebas Neue', sans-serif; font-size: clamp(2rem, 3.5vw, 3rem); letter-spacing: .02em; margin-bottom: 16px; line-height: 1.2; color: #0057ff; }
  .contact-text p { color: #555; margin-bottom: 32px; line-height: 1.75; }
  .contact-details { display: flex; flex-direction: column; gap: 10px; font-size: .9rem; color: #444; }
  .contact-form { display: flex; flex-direction: column; gap: 14px; }
  .contact-form input, .contact-form textarea { width: 100%; padding: 14px 16px; font-family: 'DM Sans', sans-serif; font-size: .9rem; border: 1.5px solid #c0d8ff; border-radius: 6px; background: #f5f9ff; color: #0a0a0a; outline: none; transition: border-color .2s, background .2s; }
  .contact-form input:focus, .contact-form textarea:focus { border-color: #0057ff; background: #fff; }
  .contact-form textarea { resize: vertical; }
  .form-success { color: #0057ff; font-size: .85rem; display: none; font-weight: 500; }
  .form-success.show { display: block; }

  /* FOOTER */
  .footer { background: linear-gradient(135deg, #000d2e 0%, #001a6e 60%, #0057ff 100%); color: #fff; text-align: center; padding: 48px 48px; }
  .footer-logo { font-family: 'Bebas Neue', sans-serif; font-size: 1.8rem; letter-spacing: .05em; margin-bottom: 12px; }
  .footer-logo span { color: #00c6ff; }
  .footer p { font-size: .8rem; color: rgba(255,255,255,.5); margin-bottom: 16px; }
  .footer-links { display: flex; justify-content: center; gap: 28px; }
  .footer-links a { text-decoration: none; font-size: .8rem; color: rgba(255,255,255,.7); transition: color .2s; }
  .footer-links a:hover { color: #00c6ff; }

  /* ANIMATIONS */
  @keyframes fadeUp { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
  @keyframes pulse { 0%, 100% { transform: scale(1); opacity: .6; } 50% { transform: scale(1.1); opacity: 1; } }
  @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
  @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: .3; } }

  /* RESPONSIVE */
  @media (max-width: 900px) {
    .mobi-nav { padding: 18px 24px; }
    .nav-links, .nav-cta { display: none; }
    .nav-hamburger { display: block; }
    .hero-inner { grid-template-columns: 1fr; padding: 60px 24px; gap: 48px; }
    .hero-visual { height: 320px; }
    .gc-1, .gc-3 { left: 0; }
    .gc-2, .gc-4 { right: 0; }
    .about { padding: 64px 24px; }
    .about-grid { grid-template-columns: 1fr; gap: 40px; }
    .products { padding: 64px 24px; }
    .products-grid { grid-template-columns: 1fr 1fr; }
    .testimonials { padding: 64px 24px; }
    .testimonials-grid { grid-template-columns: 1fr; }
    .contact { padding: 64px 24px; }
    .contact-inner { grid-template-columns: 1fr; gap: 48px; }
  }
  @media (max-width: 560px) {
    .products-grid { grid-template-columns: 1fr; }
    .about-cards { grid-template-columns: 1fr; }
    .hero-actions { flex-direction: column; }
    .hero-visual { display: flex; height: 260px; margin-top: 16px;}
    .gadget-card { padding: 10px 12px; }
    .gadget-card span { font-size: 1.2rem; }
    .gadget-card-title { font-size: .7rem; }
    .gadget-card-sub { font-size: .62rem; }
    .phone-mockup { width: 120px; height: 240px; border-radius: 24px; }
    .orbit-1 { width: 200px; height: 200px; }
    .orbit-2 { width: 300px; height: 300px; }
    .gc-1 { top: 20px; left: 0; }
    .gc-2 { top: 20px; right: 0; }
    .gc-3 { bottom: 20px; left: 0; }
    .gc-4 { bottom: 20px; right: 0; }
  }
`;

function useFadeIn(ref) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { el.classList.remove("hidden"); obs.disconnect(); }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
}

function AnimatedCard({ children, className = "" }) {
  const ref = useRef(null);
  useFadeIn(ref);
  return <div ref={ref} className={`${className} hidden`}>{children}</div>;
}

const products = [
  { icon: "📱", title: "Phone Cases", desc: "Slim, rugged, and stylish cases for all major brands.", featured: false },
  { icon: "⚡", title: "Chargers & Cables", desc: "USB-C, Lightning, and wireless charging solutions.", featured: false },
  { icon: "🔒", title: "Screen Protectors", desc: "Tempered glass and anti-glare films for lasting clarity.", featured: true, badge: "Popular" },
  { icon: "🎧", title: "Audio Accessories", desc: "Earphones, headsets, and Bluetooth speakers.", featured: false },
  { icon: "🔋", title: "Power Banks", desc: "Portable power for your on-the-go lifestyle.", featured: false },
  { icon: "🖥️", title: "Stands & Mounts", desc: "Desktop stands, car mounts, and ring holders.", featured: false },
];

const featureCards = [
  { icon: "🔋", title: "Fast Charging", desc: "Power up faster with our certified chargers and cables." },
  { icon: "🛡️", title: "Max Protection", desc: "Drop-proof cases and tempered glass for every model." },
  { icon: "🎧", title: "Audio Gear", desc: "Earphones and headsets for crystal-clear sound." },
  { icon: "📦", title: "Fast Delivery", desc: "Quick, reliable delivery right to your doorstep." },
];

const testimonials = [
  { stars: "★★★★★", text: "Great quality cases! My phone has survived two drops already. MOBiverse is my go-to shop.", author: "— Brian K., Kampala" },
  { stars: "★★★★★", text: "Fast delivery and the charger works perfectly. Very happy with my order. Will definitely buy again.", author: "— Sandra M., Entebbe" },
  { stars: "★★★★☆", text: "Affordable prices and genuine products. The screen protector fits perfectly. Highly recommended!", author: "— David O., Jinja" },
];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  function handleSubmit(e) {
    e.preventDefault();
    setFormSent(true);
    setForm({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setFormSent(false), 5000);
  }

  return (
    <>
      <style>{styles}</style>

      {/* NAV */}
      <nav className="mobi-nav">
        <div className="mobi-logo">MOBi<span>verse</span></div>
        <ul className="nav-links">
          {["About", "Products", "Reviews", "Contact"].map(l => (
            <li key={l}><a href={`#${l.toLowerCase()}`}>{l}</a></li>
          ))}
        </ul>
        <a href="#products" className="btn btn-primary nav-cta" style={{ padding: "10px 22px", fontSize: ".78rem" }}>Shop Now</a>
        <button className="nav-hamburger" onClick={() => setMenuOpen(o => !o)} aria-label="Toggle menu">☰</button>
      </nav>

      {/* MOBILE MENU */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        {["About", "Products", "Reviews", "Contact"].map(l => (
          <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setMenuOpen(false)}>{l}</a>
        ))}
      </div>

      {/* HERO */}
      <div className="hero-wrapper">
        <div className="hero-grid-bg" />
        <div className="hero-inner">

          {/* LEFT — Text */}
          <div style={{ animation: "fadeUp .7s ease both" }}>
            <div className="hero-tag">Premium Phone Accessories</div>
            <h1 className="hero-title">
              Gear Up.<br />
              Stay <span>Connected.</span>
            </h1>
            <p className="hero-sub">MOBiverse Limited brings you top-quality phone accessories — cases, chargers, cables, and more — built for everyday life in Uganda and beyond.</p>
            <div className="hero-actions">
              <a href="#products" className="btn btn-primary">Browse Products</a>
              <a href="#contact" className="btn btn-outline">Get in Touch</a>
            </div>
            <div className="hero-stats">
              {[["500+", "Products"], ["10K+", "Customers"], ["5★", "Rating"]].map(([val, label]) => (
                <div className="hero-stat" key={label}>
                  <span>{val}</span>
                  <p>{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Visual */}
          <div className="hero-visual">
            {/* Orbit rings */}
            <div className="orbit-ring orbit-1"><div className="orbit-dot" /></div>
            <div className="orbit-ring orbit-2"><div className="orbit-dot" /></div>

            {/* Central phone */}
            <div className="phone-mockup">
              <div className="phone-screen-icon">📱</div>
              <div className="phone-screen-text">MOBiverse</div>
            </div>

            {/* Floating gadget cards */}
            <div className="gadget-card gc-1">
              <span>⚡</span>
              <div className="gadget-card-text">
                <div className="gadget-card-title">Fast Chargers</div>
                <div className="gadget-card-sub">65W & 120W</div>
              </div>
            </div>
            <div className="gadget-card gc-2">
              <span>🎧</span>
              <div className="gadget-card-text">
                <div className="gadget-card-title">Audio Gear</div>
                <div className="gadget-card-sub">Hi-Fi Sound</div>
              </div>
            </div>
            <div className="gadget-card gc-3">
              <span>🛡️</span>
              <div className="gadget-card-text">
                <div className="gadget-card-title">Screen Guard</div>
                <div className="gadget-card-sub">9H Hardness</div>
              </div>
            </div>
            <div className="gadget-card gc-4">
              <span>🔋</span>
              <div className="gadget-card-text">
                <div className="gadget-card-title">Power Banks</div>
                <div className="gadget-card-sub">20,000 mAh</div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ABOUT */}
      <section className="about" id="about">
        <div className="about-grid">
          <div className="about-text">
            <div className="label">Who We Are</div>
            <h2>Your one-stop shop for every phone accessory.</h2>
            <p>At MOBiverse Limited, we believe your phone should work as hard as you do. That's why we stock only the best accessories — protective cases, fast chargers, cables, screen protectors, stands, and more.</p>
            <p>Whether you're upgrading, protecting, or powering up, we've got you covered.</p>
          </div>
          <div className="about-cards">
            {featureCards.map(({ icon, title, desc }) => (
              <AnimatedCard key={title} className="about-card">
                <div className="about-icon">{icon}</div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section id="products" style={{ padding: "96px 0" }}>
        <div className="products">
          <div className="products-header">
            <div className="label">What We Offer</div>
            <h2>Our Top Categories</h2>
          </div>
          <div className="products-grid">
            {products.map(({ icon, title, desc, featured, badge }) => (
              <AnimatedCard key={title} className={`product-card ${featured ? "featured" : ""}`}>
                {badge && <span className="pc-badge">{badge}</span>}
                <div className="pc-img">{icon}</div>
                <h3>{title}</h3>
                <p>{desc}</p>
                <button className="pc-link" onClick={() => document.getElementById("contact").scrollIntoView({ behavior: "smooth" })}>
                  View Collection →
                </button>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials" id="reviews">
        <div className="label">Customer Reviews</div>
        <h2>What People Are Saying</h2>
        <div className="testimonials-grid">
          {testimonials.map(({ stars, text, author }) => (
            <AnimatedCard key={author} className="testimonial">
              <div className="t-stars">{stars}</div>
              <p>"{text}"</p>
              <div className="t-author">{author}</div>
            </AnimatedCard>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section className="contact" id="contact">
        <div className="contact-inner">
          <div className="contact-text">
            <div className="label">Get In Touch</div>
            <h2>Let's talk about what you need.</h2>
            <p>Have a question, want to place a bulk order, or just want to know what's in stock? Reach out — we're happy to help.</p>
            <div className="contact-details">
              <div>📧 phillipnyinomujuni3@gmail.com</div>
              <div>📞 +256 791 111 915</div>
              <div>📍 Kampala, Uganda</div>
            </div>
          </div>
          <form className="contact-form" onSubmit={handleSubmit}>
            <input placeholder="Your Name" required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
            <input type="email" placeholder="Your Email" required value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
            <input placeholder="Subject" value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))} />
            <textarea rows={5} placeholder="Your Message" required value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} />
            <button type="submit" className="btn btn-primary" style={{ alignSelf: "flex-start" }}>Send Message</button>
            <p className={`form-success ${formSent ? "show" : ""}`}>✅ Message sent! We'll get back to you soon.</p>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-logo">MOBi<span>verse</span> Limited</div>
        <p>© {new Date().getFullYear()} MOBiverse Limited. All rights reserved.</p>
        <div className="footer-links">
          {["About", "Products", "Contact"].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`}>{l}</a>
          ))}
        </div>
      </footer>
    </>
  );
}
