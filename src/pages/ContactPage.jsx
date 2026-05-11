import { useState, useEffect, useRef } from "react";

/* ════ THEME ════ */
const C = {
    coral: "#FF3C28",
    cream: "#F7F3EC",
    creamDark: "#EDE8DF",
    ink: "#1A1118",
    inkSoft: "#6B5F70",
    purpleDark: "#2D1B4E",
    purple: "#6B3FA8",
};

/* shared error style */
const errStyle = {
    fontFamily: "'Outfit',sans-serif",
    fontSize: "0.68rem",
    color: "#FF3C28",
    marginTop: "0.28rem",
    paddingLeft: "0.2rem",
};

/* ════ WINDOW WIDTH HOOK ════ */
function useWindowWidth() {
    const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1024);
    useEffect(() => {
        const h = () => setW(window.innerWidth);
        window.addEventListener("resize", h);
        return () => window.removeEventListener("resize", h);
    }, []);
    return w;
}

/* ════ REVEAL ════ */
function Reveal({ children, delay = 0, style = {} }) {
    const ref = useRef(null);
    const [vis, setVis] = useState(false);
    useEffect(() => {
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
            { threshold: 0.05 }
        );
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);
    return (
        <div ref={ref} style={{
            opacity: vis ? 1 : 0,
            transform: vis ? "translateY(0)" : "translateY(18px)",
            transition: `opacity 0.55s ease ${delay}s, transform 0.55s ease ${delay}s`,
            ...style
        }}>
            {children}
        </div>
    );
}

/* ════ SECTION TAG ════ */
function STag({ children, light = false }) {
    return (
        <div style={{
            fontFamily: "'Syne',sans-serif", fontSize: "0.7rem", fontWeight: 700,
            letterSpacing: "0.14em", textTransform: "uppercase",
            color: light ? "rgba(247,243,236,0.45)" : C.inkSoft,
            display: "flex", alignItems: "center", gap: "0.55rem", marginBottom: "0.9rem"
        }}>
            <span style={{ width: 18, height: 2, background: C.coral, display: "inline-block", flexShrink: 0 }} />
            {children}
        </div>
    );
}

/* ════ MARQUEE ════ */
function Marquee({ items, coral = false }) {
    const tripled = [...items, ...items, ...items];
    return (
        <div style={{ background: coral ? C.coral : C.creamDark, padding: "0.75rem 0", overflow: "hidden" }}>
            <div style={{ display: "flex", gap: "2.5rem", whiteSpace: "nowrap", width: "max-content", animation: "marquee 32s linear infinite" }}>
                {tripled.map((item, i) => (
                    <span key={i} style={{
                        fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "0.7rem",
                        color: coral ? "rgba(255,255,255,0.85)" : C.inkSoft,
                        letterSpacing: "0.1em", textTransform: "uppercase",
                        flexShrink: 0, display: "inline-flex", alignItems: "center", gap: "0.55rem"
                    }}>
                        {item}
                        <span style={{ color: coral ? "rgba(255,255,255,0.4)" : C.coral, fontSize: "0.38rem" }}>●</span>
                    </span>
                ))}
            </div>
        </div>
    );
}

/* ════ FLOATING LABEL INPUT ════ */
function FloatInput({ label, type = "text", value, onChange, required, multiline = false, rows = 4 }) {
    const [focused, setFocused] = useState(false);
    const active = focused || value?.length > 0;
    const base = {
        width: "100%", background: "transparent", border: "none", outline: "none",
        fontFamily: "'Outfit',sans-serif", fontSize: "0.94rem", color: C.ink,
        resize: "none", padding: "1.55rem 1.1rem 0.5rem", boxSizing: "border-box",
    };
    return (
        <div style={{
            position: "relative", background: "#fff",
            border: `1.5px solid ${focused ? C.coral : active ? "rgba(255,60,40,0.3)" : "#EAE4D8"}`,
            borderRadius: 12, transition: "border-color 0.25s, box-shadow 0.25s",
            boxShadow: focused ? "0 0 0 3px rgba(255,60,40,0.07)" : "none",
        }}>
            <label style={{
                position: "absolute", left: "1.1rem",
                top: active ? "0.4rem" : "50%",
                transform: active ? "none" : (multiline ? "none" : "translateY(-50%)"),
                fontFamily: "'Syne',sans-serif",
                fontSize: active ? "0.59rem" : "0.8rem",
                fontWeight: active ? 700 : 500,
                color: focused ? C.coral : C.inkSoft,
                letterSpacing: active ? "0.1em" : "0.02em",
                textTransform: active ? "uppercase" : "none",
                transition: "all 0.22s cubic-bezier(0.16,1,0.3,1)",
                pointerEvents: "none", zIndex: 2,
                ...(multiline && !active ? { top: "1rem" } : {}),
            }}>{label}{required && <span style={{ color: C.coral }}> *</span>}</label>
            {multiline ? (
                <textarea rows={rows} value={value} onChange={onChange}
                    onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
                    style={{ ...base, paddingTop: "1.65rem", lineHeight: 1.7 }} />
            ) : (
                <input type={type} value={value} onChange={onChange}
                    onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
                    style={{ ...base, height: 52 }} />
            )}
        </div>
    );
}

/* ════ SERVICE CHIP ════ */
function ServiceChip({ label, icon, selected, onClick, sm }) {
    return (
        <button onClick={onClick} style={{
            display: "inline-flex", alignItems: "center", gap: "0.38rem",
            padding: sm ? "0.42rem 0.8rem" : "0.52rem 1rem",
            borderRadius: 50,
            border: `1.5px solid ${selected ? C.coral : "#EAE4D8"}`,
            background: selected ? "rgba(255,60,40,0.07)" : "#fff",
            fontFamily: "'Syne',sans-serif", fontWeight: 700,
            fontSize: sm ? "0.68rem" : "0.72rem",
            color: selected ? C.coral : C.inkSoft,
            cursor: "pointer", transition: "all 0.2s", letterSpacing: "0.03em",
            boxShadow: selected ? "0 0 0 3px rgba(255,60,40,0.1)" : "none",
        }}>
            <span style={{ fontSize: "0.82rem" }}>{icon}</span>{label}
        </button>
    );
}

/* ════ MAP CARD — no overlay ════ */
function MapCard({ sm }) {
    return (
        <div style={{
            borderRadius: sm ? 12 : 16,
            overflow: "hidden",
            border: "1.5px solid rgba(255,255,255,0.12)",
            boxShadow: "0 6px 28px rgba(0,0,0,0.22)",
        }}>
            <iframe
                title="SR Nagar Hyderabad"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.366564064154!2d78.44017117390729!3d17.442160801227395!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb912fe62e71db%3A0xef713c678e4ffbfc!2sGugulotre!5e0!3m2!1sen!2sin!4v1742811711564!5m2!1sen!2sin"
                width="100%" height={sm ? 190 : 250}
                style={{ border: 0, display: "block" }}
                allowFullScreen="" loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            />
        </div>
    );
}

/* ════ INFO CARD ════ */
function InfoCard({ icon, label, value, sub, href, sm }) {
    const [hov, setHov] = useState(false);
    const inner = (
        <div
            onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
            style={{
                background: hov ? "#fff" : "rgba(255,255,255,0.06)",
                border: `1px solid ${hov ? "rgba(255,60,40,0.3)" : "rgba(255,255,255,0.1)"}`,
                borderRadius: 12,
                padding: sm ? "0.8rem 0.95rem" : "1rem 1.2rem",
                display: "flex", alignItems: "center", gap: "0.75rem",
                transition: "all 0.25s", cursor: href ? "pointer" : "default",
                transform: hov ? "translateY(-2px)" : "none",
                boxShadow: hov ? "0 8px 24px rgba(255,60,40,0.12)" : "none",
                textDecoration: "none",
            }}
        >
            <div style={{
                width: sm ? 32 : 36, height: sm ? 32 : 36, borderRadius: 9, flexShrink: 0,
                background: hov ? "rgba(255,60,40,0.1)" : "rgba(255,255,255,0.08)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "0.95rem", transition: "background 0.25s",
            }}>{icon}</div>
            <div style={{ minWidth: 0 }}>
                <div style={{
                    fontFamily: "'Syne',sans-serif", fontSize: "0.56rem", fontWeight: 700,
                    letterSpacing: "0.12em", textTransform: "uppercase",
                    color: hov ? C.coral : "rgba(247,243,236,0.4)",
                    marginBottom: "0.12rem", transition: "color 0.25s"
                }}>{label}</div>
                <div style={{
                    fontFamily: "'Outfit',sans-serif",
                    fontSize: sm ? "0.8rem" : "0.86rem",
                    fontWeight: 600,
                    color: hov ? C.ink : "rgba(247,243,236,0.9)",
                    transition: "color 0.25s", wordBreak: "break-word",
                }}>{value}</div>
                {sub && <div style={{
                    fontFamily: "'Outfit',sans-serif", fontSize: "0.62rem",
                    color: hov ? C.inkSoft : "rgba(247,243,236,0.4)",
                    marginTop: "0.08rem", transition: "color 0.25s"
                }}>{sub}</div>}
            </div>
        </div>
    );
    return href ? <a href={href} style={{ textDecoration: "none" }}>{inner}</a> : inner;
}

/* ════ SOCIAL BUTTON ════ */
function SocialBtn({ label, icon, color, href }) {
    const [hov, setHov] = useState(false);
    return (
        <a href={href || "#"} target="_blank" rel="noopener noreferrer"
            onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
            style={{
                fontFamily: "'Syne',sans-serif", fontWeight: 700,
                fontSize: "0.68rem", letterSpacing: "0.03em",
                background: hov ? color : "#fff",
                border: `1.5px solid ${hov ? color : "#EAE4D8"}`,
                color: hov ? "#fff" : C.inkSoft,
                padding: "0.42rem 0.85rem", borderRadius: 50,
                cursor: "pointer", transition: "all 0.22s",
                display: "inline-flex", alignItems: "center", gap: "0.32rem",
                textDecoration: "none",
                transform: hov ? "translateY(-2px)" : "none",
                boxShadow: hov ? `0 5px 14px ${color}55` : "none",
            }}
        >
            <span style={{ fontWeight: 900, fontSize: "0.82rem" }}>{icon}</span>{label}
        </a>
    );
}

/* ════ MAIN CONTACT PAGE ════ */
export default function ContactPage() {
    const width = useWindowWidth();
    const sm = width <= 640;
    const md = width > 640 && width <= 1023;

    const SERVICES = [
        { label: "Web Development", icon: "🌐" },
        { label: "UI / UX Design", icon: "🎨" },
        { label: "App Development", icon: "📱" },
        { label: "E-Commerce", icon: "🛒" },
        { label: "WordPress & CMS", icon: "⚡" },
        { label: "Graphic Design", icon: "✏️" },
    ];
    const SOCIALS = [
        { label: "Instagram", icon: "📸", color: "#E1306C", href: "https://instagram.com" },
        { label: "Facebook", icon: "📘", color: "#1877F2", href: "https://facebook.com" },
        { label: "Twitter / X", icon: "𝕏", color: "#000", href: "https://twitter.com" },
        { label: "LinkedIn", icon: "in", color: "#0A66C2", href: "https://linkedin.com" },
    ];

    const [form, setForm] = useState({ name: "", phone: "", email: "", company: "", message: "" });
    const [selectedServices, setSelectedServices] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [sending, setSending] = useState(false);
    const [errors, setErrors] = useState({});

    const toggleService = (i) => setSelectedServices(p => p.includes(i) ? p.filter(x => x !== i) : [...p, i]);

    const handleSubmit = () => {
        const e = {};
        if (!form.name.trim()) e.name = true;
        if (!form.phone.trim()) e.phone = true;
        if (!selectedServices.length) e.services = true;
        if (Object.keys(e).length) { setErrors(e); return; }
        setErrors({});
        setSending(true);
        const serviceNames = selectedServices.map(i => SERVICES[i].label).join(", ");
        const lines = [
            `*New Project Enquiry*`, ``,
            `*Name:* ${form.name}`,
            `*Phone:* ${form.phone}`,
            form.email ? `*Email:* ${form.email}` : null,
            form.company ? `*Company:* ${form.company}` : null,
            `*Services:* ${serviceNames}`,
            form.message ? `*Message:* ${form.message}` : null,
        ].filter(Boolean).join("\n");
        const waURL = `https://wa.me/919876543210?text=${encodeURIComponent(lines)}`;
        setTimeout(() => { setSending(false); setSubmitted(true); window.open(waURL, "_blank"); }, 900);
    };

    const MQ = ["Let's Talk", "Free Consultation", "Fast Delivery", "No Commitment", "Clean Code", "Pixel Perfect", "In-House Team", "100% Custom"];

    /* layout helpers */
    const sectionPad = sm ? "1.8rem 4% 2rem" : md ? "2.5rem 4%" : "clamp(3rem,5vw,4.5rem) 5%";
    const heroPad = sm ? "1.8rem 4% 2.2rem" : md ? "2.8rem 4%" : "clamp(3rem,6vw,5rem) 5%";
    const twoCol = !sm && !md; // desktop only

    return (
        <div style={{ width: "100%", minWidth: 0, paddingTop: 70, fontFamily: "'Outfit',sans-serif", overflowX: "hidden" }}>
            <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Syne:wght@400;700;800&family=Outfit:wght@400;500;600;700&display=swap" rel="stylesheet" />

            {/* ══ HERO ══ */}
            <section style={{
                background: C.purpleDark, padding: heroPad,
                position: "relative", overflow: "hidden",
                minHeight: sm ? 230 : md ? 290 : 340,
                backgroundImage: "radial-gradient(circle at 75% 25%, rgba(255,60,40,0.12), transparent 50%), radial-gradient(circle at 5% 85%, rgba(107,63,168,0.2), transparent 50%)",
            }}>
                {/* ghost text — desktop only */}
                {twoCol && (
                    <div style={{
                        fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(4rem,12vw,10rem)",
                        color: "rgba(80,40,140,0.28)", lineHeight: 1,
                        userSelect: "none", pointerEvents: "none",
                        position: "absolute", top: "50%", right: "-1rem",
                        transform: "translateY(-50%)", whiteSpace: "nowrap", zIndex: 1,
                    }}>CONTACT</div>
                )}
                <div style={{ position: "relative", zIndex: 2, maxWidth: 660 }}>
                    <Reveal><STag light>Get In Touch</STag></Reveal>
                    <Reveal delay={0.06}>
                        <h1 style={{
                            fontFamily: "'Bebas Neue',sans-serif",
                            fontSize: sm
                                ? "clamp(1.9rem,8.5vw,2.7rem)"
                                : md
                                    ? "clamp(2.6rem,6vw,4rem)"
                                    : "clamp(3rem,5.5vw,5.5rem)",
                            color: C.cream,
                            lineHeight: sm ? 1.08 : 0.95,
                            margin: 0,
                        }}>
                            LET'S BUILD<br />SOMETHING<br /><span style={{ color: C.coral }}>EXTRAORDINARY.</span>
                        </h1>
                    </Reveal>
                    <Reveal delay={0.12}>
                        <p style={{
                            color: "rgba(247,243,236,0.5)",
                            fontSize: sm ? "0.8rem" : "clamp(0.82rem,1.4vw,0.96rem)",
                            lineHeight: 1.75, maxWidth: 440,
                            marginTop: sm ? "0.9rem" : "1.2rem",
                        }}>
                            Tell us about your project. We'll get back within 24 hours with a clear plan — no fluff, no pushy sales, just real talk about what we can build together.
                        </p>
                    </Reveal>
                </div>
            </section>

            <Marquee items={MQ} coral />

            {/* ══ MAIN CONTENT ══ */}
            <section style={{ background: C.cream, padding: sectionPad }}>
                <div style={{
                    display: "grid",
                    gridTemplateColumns: twoCol ? "1.1fr 1fr" : "1fr",
                    gap: sm ? "1.5rem" : md ? "2rem" : "clamp(2.5rem,4vw,4rem)",
                    alignItems: "start",
                    maxWidth: 1360,
                    margin: "0 auto",
                }}>

                    {/* ── LEFT: Form ── */}
                    <div>
                        <Reveal>
                            <STag>Send a Message</STag>
                            <h2 style={{
                                fontFamily: "'Bebas Neue',sans-serif",
                                fontSize: sm ? "clamp(1.6rem,6.5vw,2rem)" : "clamp(1.9rem,3.5vw,2.8rem)",
                                color: C.ink, lineHeight: 0.95, marginBottom: "1.3rem", marginTop: 0,
                            }}>
                                DESCRIBE YOUR<br /><span style={{ color: C.coral }}>PROJECT.</span>
                            </h2>
                        </Reveal>

                        {submitted ? (
                            <Reveal>
                                <div style={{
                                    background: "#fff", border: "1.5px solid rgba(255,60,40,0.2)",
                                    borderRadius: 16, padding: sm ? "1.8rem 1.2rem" : "2.5rem 2rem",
                                    textAlign: "center", boxShadow: "0 6px 32px rgba(255,60,40,0.08)",
                                }}>
                                    <div style={{
                                        width: 60, height: 60, borderRadius: "50%",
                                        background: "rgba(37,211,102,0.1)",
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        fontSize: "1.7rem", margin: "0 auto 1rem",
                                        animation: "svcIconFloat 3s ease infinite",
                                    }}>💬</div>
                                    <div style={{
                                        fontFamily: "'Bebas Neue',sans-serif",
                                        fontSize: sm ? "1.7rem" : "2.2rem",
                                        color: C.ink, lineHeight: 1, marginBottom: "0.6rem",
                                    }}>OPENING WHATSAPP!</div>
                                    <p style={{ color: C.inkSoft, fontSize: "0.85rem", lineHeight: 1.8, maxWidth: 300, margin: "0 auto" }}>
                                        Your message has been pre-filled in WhatsApp. Just hit send!
                                    </p>
                                    <button onClick={() => { setSubmitted(false); setForm({ name: "", phone: "", email: "", company: "", message: "" }); setSelectedServices([]); }}
                                        style={{
                                            marginTop: "1.3rem", fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "0.8rem",
                                            background: C.coral, color: "#fff", border: "none",
                                            padding: "0.75rem 1.6rem", borderRadius: 50, cursor: "pointer",
                                            boxShadow: "0 5px 18px rgba(255,60,40,0.28)",
                                            width: sm ? "100%" : "auto",
                                        }}>Send Another Message</button>
                                </div>
                            </Reveal>
                        ) : (
                            <Reveal delay={0.05}>
                                <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>

                                    {/* Name + Phone */}
                                    <div style={{ display: "grid", gridTemplateColumns: sm ? "1fr" : "1fr 1fr", gap: "0.85rem" }}>
                                        <div>
                                            <FloatInput label="Your Name" value={form.name} required
                                                onChange={e => { setForm(f => ({ ...f, name: e.target.value })); setErrors(ev => ({ ...ev, name: false })); }} />
                                            {errors.name && <div style={errStyle}>Name is required</div>}
                                        </div>
                                        <div>
                                            <FloatInput label="Phone Number" type="tel" value={form.phone} required
                                                onChange={e => { setForm(f => ({ ...f, phone: e.target.value })); setErrors(ev => ({ ...ev, phone: false })); }} />
                                            {errors.phone && <div style={errStyle}>Phone number is required</div>}
                                        </div>
                                    </div>

                                    {/* Email + Company */}
                                    <div style={{ display: "grid", gridTemplateColumns: sm ? "1fr" : "1fr 1fr", gap: "0.85rem" }}>
                                        <FloatInput label="Email Address (optional)" type="email" value={form.email}
                                            onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                                        <FloatInput label="Company / Brand (optional)" value={form.company}
                                            onChange={e => setForm(f => ({ ...f, company: e.target.value }))} />
                                    </div>

                                    {/* Services */}
                                    <div style={{
                                        background: "#fff", borderRadius: 12,
                                        border: `1.5px solid ${errors.services ? C.coral : "#EAE4D8"}`,
                                        padding: sm ? "0.9rem 0.95rem" : "1.1rem 1.2rem",
                                        transition: "border-color 0.25s",
                                    }}>
                                        <div style={{
                                            fontFamily: "'Syne',sans-serif", fontSize: "0.64rem", fontWeight: 700,
                                            letterSpacing: "0.12em", textTransform: "uppercase",
                                            color: errors.services ? C.coral : C.inkSoft,
                                            marginBottom: "0.75rem",
                                            display: "flex", alignItems: "center", gap: "0.3rem",
                                        }}>
                                            Services Needed <span style={{ color: C.coral }}>*</span>
                                        </div>
                                        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                                            {SERVICES.map((s, i) => (
                                                <ServiceChip key={s.label} {...s} sm={sm}
                                                    selected={selectedServices.includes(i)}
                                                    onClick={() => { toggleService(i); setErrors(ev => ({ ...ev, services: false })); }} />
                                            ))}
                                        </div>
                                        {errors.services && <div style={errStyle}>Please select at least one service</div>}
                                    </div>

                                    <FloatInput label="Tell us about your project (optional)" value={form.message} multiline rows={sm ? 4 : 5}
                                        onChange={e => setForm(f => ({ ...f, message: e.target.value }))} />

                                    {/* WhatsApp Button */}
                                    <button
                                        onClick={handleSubmit} disabled={sending}
                                        style={{
                                            fontFamily: "'Syne',sans-serif", fontWeight: 700,
                                            fontSize: sm ? "0.88rem" : "0.96rem",
                                            background: sending ? "rgba(37,211,102,0.65)" : "#25D366",
                                            color: "#fff", border: "none",
                                            padding: sm ? "0.95rem 1.5rem" : "1.05rem 2rem",
                                            borderRadius: 50, cursor: sending ? "not-allowed" : "pointer",
                                            transition: "all 0.25s", width: "100%",
                                            boxShadow: "0 5px 18px rgba(37,211,102,0.26)",
                                            display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
                                            letterSpacing: "0.03em",
                                        }}
                                    >
                                        {sending ? (
                                            <>
                                                <span style={{
                                                    width: 14, height: 14, borderRadius: "50%",
                                                    border: "2px solid rgba(255,255,255,0.35)",
                                                    borderTopColor: "#fff", display: "inline-block",
                                                    animation: "spin 0.7s linear infinite",
                                                }} />
                                                Opening WhatsApp...
                                            </>
                                        ) : (
                                            <>
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                                </svg>
                                                Send via WhatsApp
                                            </>
                                        )}
                                    </button>

                                    <p style={{
                                        fontFamily: "'Outfit',sans-serif", fontSize: "0.68rem",
                                        color: C.inkSoft, textAlign: "center", lineHeight: 1.6, margin: 0,
                                    }}>
                                        🔒 Your details are never shared. We reply within 24 hours.
                                    </p>
                                </div>
                            </Reveal>
                        )}
                    </div>

                    {/* ── RIGHT: Info Panel ── */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
                        <Reveal delay={sm ? 0 : 0.1}>
                            <div style={{
                                background: C.purpleDark,
                                borderRadius: sm ? 16 : 20,
                                padding: sm ? "1.4rem 1.1rem" : md ? "1.8rem 1.5rem" : "2rem 1.8rem",
                                position: "relative", overflow: "hidden",
                                backgroundImage: "radial-gradient(circle at 90% 10%, rgba(255,60,40,0.1), transparent 50%), radial-gradient(circle at 10% 90%, rgba(107,63,168,0.2), transparent 50%)",
                            }}>
                                {/* ghost — desktop only */}
                                {twoCol && (
                                    <div style={{
                                        fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(3rem,7vw,6rem)",
                                        color: "rgba(80,40,140,0.28)", lineHeight: 1,
                                        position: "absolute", bottom: "-0.4rem", right: "-0.4rem",
                                        userSelect: "none", pointerEvents: "none",
                                    }}>HI</div>
                                )}

                                <STag light>Reach Us Directly</STag>
                                <h3 style={{
                                    fontFamily: "'Bebas Neue',sans-serif",
                                    fontSize: sm ? "1.5rem" : md ? "1.9rem" : "clamp(1.5rem,2.2vw,2rem)",
                                    color: C.cream, lineHeight: 1.05,
                                    marginBottom: sm ? "1rem" : "1.3rem", marginTop: 0,
                                }}>
                                    WE'RE REAL PEOPLE.<br /><span style={{ color: C.coral }}>LET'S TALK.</span>
                                </h3>

                                <div style={{
                                    display: "flex", flexDirection: "column",
                                    gap: sm ? "0.5rem" : "0.6rem",
                                    position: "relative", zIndex: 1,
                                    marginBottom: sm ? "1rem" : "1.3rem",
                                }}>
                                    <InfoCard icon="📧" label="Email" value="hello@studio.com" sub="Reply within 24 hours" href="mailto:hello@studio.com" sm={sm} />
                                    <InfoCard icon="📱" label="WhatsApp" value="+91 98765 43210" sub="Quick chats & project briefs" href="https://wa.me/919876543210" sm={sm} />
                                    <InfoCard icon="📍" label="Location" value="SR Nagar, Hyderabad" sub="Telangana, India 500038" sm={sm} />
                                </div>

                                <MapCard sm={sm} />
                            </div>
                        </Reveal>

                        {/* Social links */}
                        <Reveal delay={sm ? 0 : 0.14}>
                            <div>
                                <div style={{
                                    fontFamily: "'Syne',sans-serif", fontSize: "0.64rem", fontWeight: 700,
                                    letterSpacing: "0.12em", textTransform: "uppercase",
                                    color: C.inkSoft, marginBottom: "0.75rem",
                                    display: "flex", alignItems: "center", gap: "0.5rem",
                                }}>
                                    <span style={{ width: 16, height: 2, background: C.coral, display: "inline-block" }} />
                                    Follow Us Online
                                </div>
                                <div style={{ display: "flex", gap: "0.45rem", flexWrap: "wrap" }}>
                                    {SOCIALS.map(s => <SocialBtn key={s.label} {...s} />)}
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* ══ CSS ══ */}
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Syne:wght@400;700;800&family=Outfit:wght@400;500;600;700&display=swap');
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes svcIconFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        @keyframes marquee { from{transform:translateX(0)} to{transform:translateX(-33.333%)} }
        *, *::before, *::after { box-sizing: border-box; }
        html, body { overflow-x: hidden; }
        input, textarea, button { font-family: inherit; }
        /* Prevent iOS zoom on focus */
        @media (max-width: 640px) {
          input[type], textarea, select { font-size: 16px !important; }
        }
      `}</style>
        </div>
    );
}