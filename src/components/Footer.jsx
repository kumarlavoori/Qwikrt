// src/components/Footer.jsx
import { useState, useEffect } from "react";

// ── Brand colors from real logo ──────────────────────────────────────────────
const C = {
    purple: "#3D1A78",
    purpleDark: "#160B2E",   // richer, deeper — closer to preview
    orange: "#E8431A",
    orangeSoft: "#F0694A",
    lavender: "#DCD2FF",
};

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Outfit:wght@300;400;500&display=swap');

@keyframes breathe {
    0%,100% { opacity:1; transform:scale(1); }
    50%      { opacity:0.45; transform:scale(0.75); }
}
@keyframes fadeUp {
    from { opacity:0; transform:translateY(18px); }
    to   { opacity:1; transform:translateY(0); }
}
.ftr-col { animation: fadeUp 0.52s ease both; }
.ftr-col:nth-child(1) { animation-delay:0.04s; }
.ftr-col:nth-child(2) { animation-delay:0.12s; }
.ftr-col:nth-child(3) { animation-delay:0.20s; }
.ftr-col:nth-child(4) { animation-delay:0.28s; }
`;

function injectStyles() {
    if (typeof document === "undefined") return;
    if (document.getElementById("qg-footer-a2")) return;
    const s = document.createElement("style");
    s.id = "qg-footer-a2";
    s.textContent = STYLES;
    document.head.appendChild(s);
}

function SectionLabel({ children }) {
    return (
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.4rem" }}>
            <span style={{
                display: "inline-block", width: 16, height: 2,
                background: C.orange, borderRadius: 2, flexShrink: 0,
            }} />
            <span style={{
                fontFamily: "'Syne', sans-serif", fontWeight: 700,
                fontSize: "0.72rem", letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.85)",   // ← white, not orange
            }}>
                {children}
            </span>
        </div>
    );
}

function NavLink({ label, onClick, accent = false }) {
    const [hov, setHov] = useState(false);
    return (
        <button
            onMouseEnter={() => setHov(true)}
            onMouseLeave={() => setHov(false)}
            onClick={onClick}
            style={{
                background: "none", border: "none", padding: "0.32rem 0",
                cursor: "none", textAlign: "left",
                display: "flex", alignItems: "center", gap: "0.45rem",
                fontFamily: "'Outfit', sans-serif", fontWeight: 400,
                fontSize: "0.9rem",
                color: hov
                    ? accent ? C.orange : "#fff"
                    : accent ? C.orangeSoft : "rgba(220,210,255,0.78)",
                transition: "color 0.2s, transform 0.2s",
                transform: hov ? "translateX(5px)" : "translateX(0)",
                lineHeight: 1.5,
            }}
        >
            {hov && <span style={{ color: C.orange, fontSize: "0.65rem", flexShrink: 0 }}>▸</span>}
            {label}
        </button>
    );
}

function SocialCircle({ icon, href, color }) {
    const [hov, setHov] = useState(false);
    return (
        <a
            href={href || "#"} target="_blank" rel="noopener noreferrer"
            onMouseEnter={() => setHov(true)}
            onMouseLeave={() => setHov(false)}
            style={{
                width: 40, height: 40, borderRadius: "50%",
                border: `1.5px solid ${hov ? color : "rgba(220,210,255,0.22)"}`,
                background: hov ? `${color}22` : "rgba(255,255,255,0.06)",
                color: hov ? color : "rgba(220,210,255,0.6)",
                display: "flex", alignItems: "center", justifyContent: "center",
                textDecoration: "none", flexShrink: 0,
                fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "0.72rem",
                transition: "all 0.25s cubic-bezier(0.34,1.56,0.64,1)",
                transform: hov ? "translateY(-4px) scale(1.1)" : "none",
                boxShadow: hov ? `0 8px 20px ${color}44` : "none",
            }}
        >{icon}</a>
    );
}

function ContactRow({ icon, label, value, href }) {
    const [hov, setHov] = useState(false);
    const Tag = href ? "a" : "div";
    return (
        <Tag
            href={href}
            target={href ? "_blank" : undefined}
            rel="noopener noreferrer"
            onMouseEnter={() => setHov(true)}
            onMouseLeave={() => setHov(false)}
            style={{
                display: "flex", alignItems: "center", gap: "0.75rem",
                textDecoration: "none", padding: "0.48rem 0.6rem",
                borderRadius: 10,
                background: hov ? "rgba(232,67,26,0.1)" : "rgba(255,255,255,0.03)",
                border: `1px solid ${hov ? "rgba(232,67,26,0.28)" : "rgba(220,210,255,0.07)"}`,
                transition: "all 0.22s", cursor: href ? "none" : "default",
            }}
        >
            <span style={{
                width: 36, height: 36, borderRadius: 9, flexShrink: 0,
                background: "rgba(232,67,26,0.16)",
                border: "1px solid rgba(232,67,26,0.3)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "0.95rem",
                transition: "transform 0.22s",
                transform: hov ? "scale(1.08)" : "none",
            }}>{icon}</span>
            <div>
                <div style={{
                    fontFamily: "'Syne', sans-serif", fontSize: "0.54rem",
                    fontWeight: 700, letterSpacing: "0.13em",
                    textTransform: "uppercase",
                    color: "rgba(255,180,100,0.6)", marginBottom: "0.12rem",
                }}>{label}</div>
                <div style={{
                    fontFamily: "'Outfit', sans-serif", fontSize: "0.875rem",
                    fontWeight: 400,
                    color: hov ? "#fff" : "rgba(220,210,255,0.9)",
                    transition: "color 0.2s",
                }}>{value}</div>
            </div>
        </Tag>
    );
}

function WaButton({ href }) {
    const [hov, setHov] = useState(false);
    return (
        <a
            href={href} target="_blank" rel="noopener noreferrer"
            onMouseEnter={() => setHov(true)}
            onMouseLeave={() => setHov(false)}
            style={{
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                padding: "0.55rem 1.2rem", borderRadius: 50,
                border: `1.5px solid ${hov ? "rgba(37,211,102,0.65)" : "rgba(37,211,102,0.32)"}`,
                background: hov ? "rgba(37,211,102,0.16)" : "rgba(37,211,102,0.08)",
                color: "#25D366",
                fontFamily: "'Syne', sans-serif", fontWeight: 700,
                fontSize: "0.7rem", letterSpacing: "0.05em",
                textDecoration: "none", transition: "all 0.22s",
                transform: hov ? "translateY(-2px)" : "none",
                boxShadow: hov ? "0 6px 20px rgba(37,211,102,0.2)" : "none",
            }}
        >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="#25D366">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Chat on WhatsApp
        </a>
    );
}

export default function Footer({ setPage, goToService }) {
    injectStyles();

    const [width, setWidth] = useState(
        typeof window !== "undefined" ? window.innerWidth : 1200
    );
    useEffect(() => {
        const h = () => setWidth(window.innerWidth);
        window.addEventListener("resize", h);
        return () => window.removeEventListener("resize", h);
    }, []);

    const sm = width <= 640;
    const md = width > 640 && width <= 1023;

    const go = (page) => {
        setPage(page);
        window.scrollTo({ top: 0, behavior: "instant" });
    };

    const SERVICES = [
        { label: "Web Development", id: "web" },
        { label: "UI / UX Design", id: "uiux" },
        { label: "App Development", id: "app" },
        { label: "E-Commerce Stores", id: "ecom" },
        { label: "WordPress & CMS", id: "wp" },
        { label: "Real Estate Platforms", id: "re" },
    ];

    const COMPANY = [
        { label: "Home", page: "Home" },
        { label: "About Us", page: "About" },
        { label: "Our Services", page: "Services" },
        { label: "Our Process", page: "Process" },
        { label: "Contact", page: "Contact" },
    ];

    const SOCIALS = [
        { icon: "in", href: "https://linkedin.com", color: "#0A66C2" },
        { icon: "𝕏", href: "https://twitter.com", color: "#e7e7e7" },
        { icon: "Be", href: "https://behance.net", color: "#1769FF" },
        { icon: "Ig", href: "https://instagram.com", color: "#E1306C" },
    ];

    const cols = sm ? "1fr 1fr" : md ? "1fr 1fr 1fr" : "2fr 1.1fr 1.1fr 1.5fr";

    return (
        <footer style={{
            background: C.purpleDark,
            color: C.lavender,
            position: "relative",
            overflow: "hidden",
            border: `3px solid ${C.orange}`,
            borderRadius: 16,
            marginTop: "4px",
        }}>
            {/* orange glow top-right */}
            <div style={{
                position: "absolute", top: -100, right: -60,
                width: 500, height: 500, borderRadius: "50%",
                background: "radial-gradient(circle, rgba(232,67,26,0.13) 0%, transparent 65%)",
                pointerEvents: "none",
            }} />

            {/* purple depth bloom bottom-left */}
            <div style={{
                position: "absolute", bottom: -80, left: -60,
                width: 400, height: 400, borderRadius: "50%",
                background: "radial-gradient(circle, rgba(61,26,120,0.4) 0%, transparent 70%)",
                pointerEvents: "none",
            }} />

            {/* dot grid — lavender-tinted */}
            <div style={{
                position: "absolute", inset: 0, pointerEvents: "none",
                backgroundImage: "radial-gradient(rgba(220,210,255,0.07) 1px, transparent 1px)",
                backgroundSize: "24px 24px",
            }} />

            {/* diagonal stripe texture */}
            <div style={{
                position: "absolute", inset: 0, pointerEvents: "none",
                backgroundImage: `repeating-linear-gradient(
                    135deg,
                    transparent,
                    transparent 40px,
                    rgba(232,67,26,0.03) 40px,
                    rgba(232,67,26,0.03) 41px
                )`,
            }} />

            {/* ── main grid ── */}
            <div style={{
                position: "relative", zIndex: 2,
                padding: sm ? "3rem 6% 2.5rem" : "4.5rem 6% 3.5rem",
                display: "grid",
                gridTemplateColumns: cols,
                gap: sm ? "2.8rem 1.6rem" : md ? "3rem 2rem" : "4rem",
                alignItems: "start",
            }}>

                {/* ── Brand col ── */}
                <div className="ftr-col" style={{ gridColumn: sm ? "1 / -1" : "auto" }}>
                    <button
                        onClick={() => go("Home")}
                        style={{
                            background: "none", border: "none", cursor: "none",
                            display: "inline-flex", alignItems: "center", gap: "0.6rem",
                            padding: 0, marginBottom: "1.15rem",
                        }}
                    >
                        {/* ── Real logo image — update src path to match your project ── */}
                        <img
                            src="/logo.png"
                            alt="QwikGen"
                            width={36}
                            height={36}
                            style={{ objectFit: "contain", flexShrink: 0 }}
                            onError={(e) => {

                                e.currentTarget.style.display = "none";
                                e.currentTarget.nextSibling.style.display = "flex";
                            }}
                        />
                        {/* fallback SVG shown only if image fails */}
                        <svg
                            width={36} height={36} viewBox="0 0 100 100" fill="none"
                            style={{ display: "none", flexShrink: 0 }}
                        >
                            <circle cx="50" cy="50" r="48" fill={C.purple} />
                            <path
                                d="M30 50 C30 35 42 25 55 25 C68 25 78 35 78 48 C78 58 70 65 62 65 L55 65 L55 75 L45 75 L45 55 L58 55 C63 55 66 52 66 48 C66 44 62 37 55 37 C48 37 42 43 42 50 C42 57 47 63 55 63"
                                stroke={C.orange} strokeWidth="5" strokeLinecap="round" fill="none"
                            />
                        </svg>

                        <span style={{
                            fontFamily: "'Syne', sans-serif", fontWeight: 800,
                            fontSize: "1.35rem", color: "#fff", letterSpacing: "-0.01em",
                        }}>QwikGen</span>
                        <span style={{
                            width: 7, height: 7, background: C.orange,
                            borderRadius: "50%", display: "inline-block", marginLeft: 2,
                            animation: "breathe 2.8s ease infinite",
                        }} />
                    </button>

                    <p style={{
                        fontFamily: "'Outfit', sans-serif", fontWeight: 300,
                        fontSize: "0.9rem", lineHeight: 1.9,
                        color: "rgba(220,210,255,0.58)",
                        maxWidth: 270, marginBottom: "1.8rem",
                    }}>
                        A bold digital studio from Hyderabad — building fast, beautiful, and functional web products.
                    </p>

                    <div style={{ display: "flex", gap: "0.55rem", flexWrap: "wrap" }}>
                        {SOCIALS.map(s => <SocialCircle key={s.icon} {...s} />)}
                    </div>
                </div>

                {/* ── Services col ── */}
                <div className="ftr-col">
                    <SectionLabel>Services</SectionLabel>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        {SERVICES.map(s => (
                            <NavLink key={s.id} label={s.label} onClick={() => goToService(s.id)} />
                        ))}
                    </div>
                </div>

                {/* ── Company col ── */}
                <div className="ftr-col">
                    <SectionLabel>Company</SectionLabel>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        {COMPANY.map(l => (
                            <NavLink
                                key={l.page} label={l.label}
                                onClick={() => go(l.page)}
                                accent={l.label === "Contact"}
                            />
                        ))}
                    </div>
                </div>

                {/* ── Contact col ── */}
                <div className="ftr-col">
                    <SectionLabel>Get In Touch</SectionLabel>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem", marginBottom: "1.5rem" }}>
                        <ContactRow icon="📧" label="Email" value="hello@qwikgen.in" href="mailto:hello@qwikgen.in" />
                        <ContactRow icon="📱" label="WhatsApp" value="+91 99999 99999" href="https://wa.me/919999999999" />
                        <ContactRow icon="📍" label="Location" value="Hyderabad, India" href={null} />
                    </div>
                    <WaButton href="https://wa.me/919999999999" />
                </div>
            </div>

            {/* ── divider ── */}
            <div style={{
                position: "relative", zIndex: 2, margin: "0 6%", height: 1,
                background: "linear-gradient(90deg, transparent, rgba(220,210,255,0.12) 30%, rgba(232,67,26,0.2) 50%, rgba(220,210,255,0.12) 70%, transparent)",
            }} />

            {/* ── bottom bar ── */}
            <div style={{
                position: "relative", zIndex: 2,
                padding: sm ? "1.3rem 6% 1.6rem" : "1.4rem 6%",
                display: "flex",
                flexDirection: sm ? "column" : "row",
                alignItems: sm ? "flex-start" : "center",
                justifyContent: "space-between", gap: "0.8rem",
            }}>
                <p style={{
                    fontFamily: "'Outfit', sans-serif", fontWeight: 300,
                    fontSize: "0.8rem", color: "rgba(220,210,255,0.32)", margin: 0,
                }}>
                    © 2026 QwikGen. Crafted with care in Hyderabad 🇮🇳
                </p>
                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                    {["Web Development", "UI/UX", "Apps", "E-Commerce"].map(tag => (
                        <span key={tag} style={{
                            fontFamily: "'Syne', sans-serif", fontWeight: 700,
                            fontSize: "0.6rem", letterSpacing: "0.1em",
                            color: "rgba(255,160,80,0.6)",
                            background: "rgba(232,67,26,0.1)",
                            border: "1px solid rgba(232,67,26,0.22)",
                            padding: "0.22rem 0.7rem", borderRadius: 50,
                        }}>{tag}</span>
                    ))}
                </div>
            </div>
        </footer>
    );
}