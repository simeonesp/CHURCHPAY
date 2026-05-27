"use client";

import { useState, useEffect } from "react";

// ─── Brand tokens ─────────────────────────────────────────────────────────────
const C = {
  evergreen:    "#163300",
  evergreenMid: "#1e4a00",
  mint:         "#E2F6D5",
  canvas:       "#FBFBF9",
  dark:         "#0E0F0C",
  celebrate:    "#FFC091",
  secondary:    "#454745",
  muted:        "#868685",
  white:        "#FFFFFF",
  danger:       "#D03238",
};

// ─── Slide metadata ───────────────────────────────────────────────────────────
const SLIDES = [
  { id: 1,  title: "Title",              dark: true  },
  { id: 2,  title: "Who We Are",         dark: false },
  { id: 3,  title: "The Problem",        dark: true  },
  { id: 4,  title: "Use Cases",          dark: false },
  { id: 5,  title: "Our Solution",       dark: false },
  { id: 6,  title: "How It Works",       dark: true  },
  { id: 7,  title: "The Platform",       dark: false },
  { id: 8,  title: "Vision",             dark: true  },
  { id: 9,  title: "Traction",           dark: false },
  { id: 10, title: "Why We Win",         dark: true  },
  { id: 11, title: "Tailwinds",          dark: false },
  { id: 12, title: "Timing",             dark: true  },
  { id: 13, title: "Founder-Market Fit", dark: false },
  { id: 14, title: "The Ask",            dark: true  },
  { id: 15, title: "Proof Point",        dark: false },
  { id: 16, title: "Call to Action",     dark: true  },
];

// ─── Arrow SVG ────────────────────────────────────────────────────────────────
function ArrowIcon({ size = 20, color = C.evergreen }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <path d="M4 10h12M10 4l6 6-6 6" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

// ─── Check SVG ────────────────────────────────────────────────────────────────
function CheckIcon({ size = 14, color = C.evergreen }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <path d="M2.5 7L6 10.5L11.5 4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

// ─── Church SVG ───────────────────────────────────────────────────────────────
function ChurchIcon({ size = 22, color = C.evergreen }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 2v4M10 4h4M3 21h18M5 21V10l7-7 7 7v11M9 21v-6h6v6" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

// ─── Logo Component ───────────────────────────────────────────────────────────
function Logo({ size = 44, textSize = 20, textColor = C.mint, gap = 12 }: {
  size?: number; textSize?: number; textColor?: string; gap?: number;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap }}>
      <div style={{
        width: size, height: size, borderRadius: "50%",
        background: C.mint, display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0,
      }}>
        <ArrowIcon size={Math.round(size * 0.45)} color={C.evergreen} />
      </div>
      <span style={{ fontSize: textSize, fontWeight: 800, color: textColor, letterSpacing: "-0.02em" }}>
        ChurchPay
      </span>
    </div>
  );
}

// ─── Phone Mockup ─────────────────────────────────────────────────────────────
function PhoneMockup({ children, scale = 1 }: { children: React.ReactNode; scale?: number }) {
  const w = 260 * scale;
  const h = 540 * scale;
  const br = 44 * scale;
  const inset = 3 * scale;
  const innerBr = 40 * scale;

  return (
    <div style={{
      width: w, height: h, borderRadius: br,
      background: "#1C1C1E", position: "relative", flexShrink: 0,
      boxShadow: "0 40px 100px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.08)",
    }}>
      {/* Inner screen */}
      <div style={{
        position: "absolute",
        top: inset, left: inset, right: inset, bottom: inset,
        borderRadius: innerBr, overflow: "hidden", background: C.canvas,
      }}>
        {children}
      </div>
      {/* Notch */}
      <div style={{
        position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
        width: 90 * scale, height: 26 * scale, background: "#1C1C1E",
        borderRadius: `0 0 ${18 * scale}px ${18 * scale}px`, zIndex: 10,
      }} />
      {/* Home indicator */}
      <div style={{
        position: "absolute", bottom: 8 * scale, left: "50%", transform: "translateX(-50%)",
        width: 100 * scale, height: 4 * scale, background: "rgba(255,255,255,0.3)",
        borderRadius: 2 * scale,
      }} />
      {/* Side button right */}
      <div style={{
        position: "absolute", right: -3 * scale, top: 120 * scale,
        width: 3 * scale, height: 60 * scale, background: "#2a2a2c",
        borderRadius: `0 ${2 * scale}px ${2 * scale}px 0`,
      }} />
      {/* Volume buttons left */}
      {[80, 140].map((top) => (
        <div key={top} style={{
          position: "absolute", left: -3 * scale, top: top * scale,
          width: 3 * scale, height: 36 * scale, background: "#2a2a2c",
          borderRadius: `${2 * scale}px 0 0 ${2 * scale}px`,
        }} />
      ))}
    </div>
  );
}

// ─── Laptop Mockup ────────────────────────────────────────────────────────────
function LaptopMockup({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      {/* Screen housing */}
      <div style={{
        width: 680, background: "linear-gradient(180deg,#E0E0E0 0%,#D0D0D0 100%)",
        borderRadius: "16px 16px 0 0", padding: "10px 10px 0",
        boxShadow: "0 30px 80px rgba(0,0,0,0.35)",
      }}>
        {/* Camera strip */}
        <div style={{ height: 20, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#A0A0A0" }} />
        </div>
        {/* Screen */}
        <div style={{
          width: 660, height: 400, background: C.canvas,
          borderRadius: 8, overflow: "hidden",
        }}>
          {children}
        </div>
      </div>
      {/* Keyboard base */}
      <div style={{
        width: 720, height: 24,
        background: "linear-gradient(180deg,#CACACA 0%,#B8B8B8 100%)",
        borderRadius: "0 0 12px 12px", position: "relative",
      }}>
        <div style={{
          position: "absolute", top: 4, left: "50%", transform: "translateX(-50%)",
          width: 60, height: 4, background: "#A8A8A8", borderRadius: 2,
        }} />
      </div>
    </div>
  );
}

// ─── Globe Graphic ────────────────────────────────────────────────────────────
function GlobeGraphic({ size = 400, opacity = 0.05 }: { size?: number; opacity?: number }) {
  const cx = size / 2;
  const cy = size / 2;
  const r = size * 0.44;

  const latitudes = [-60, -30, 0, 30, 60];
  const longitudes = [0, 36, 72, 108, 144, 180, 216, 252, 288, 324];

  const dots = [
    { lat: 30, lng: -90 }, { lat: -5, lng: 15 }, { lat: 51, lng: 0 },
    { lat: 35, lng: 139 }, { lat: -33, lng: 151 }, { lat: 19, lng: 73 },
    { lat: 6, lng: 3 }, { lat: -1, lng: 37 },
  ];

  function project(lat: number, lng: number) {
    const phi = (lat * Math.PI) / 180;
    const lam = (lng * Math.PI) / 180;
    const x = cx + r * Math.cos(phi) * Math.sin(lam);
    const y = cy - r * Math.sin(phi);
    return { x, y };
  }

  return (
    <svg width={size} height={size} style={{ opacity }}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={C.mint} strokeWidth={1} />
      {latitudes.map((lat) => {
        const rLat = r * Math.cos((lat * Math.PI) / 180);
        const yLat = cy - r * Math.sin((lat * Math.PI) / 180);
        return (
          <ellipse key={lat} cx={cx} cy={yLat} rx={rLat} ry={rLat * 0.25}
            fill="none" stroke={C.mint} strokeWidth={0.5} strokeDasharray="3 4" />
        );
      })}
      {longitudes.map((lng) => (
        <ellipse key={lng} cx={cx} cy={cy} rx={r * 0.2} ry={r}
          fill="none" stroke={C.mint} strokeWidth={0.5} strokeDasharray="3 4"
          style={{ transform: `rotate(${lng}deg)`, transformOrigin: `${cx}px ${cy}px` }} />
      ))}
      {dots.map((d, i) => {
        const p = project(d.lat, d.lng);
        return <circle key={i} cx={p.x} cy={p.y} r={4} fill={C.mint} />;
      })}
      {dots.slice(0, dots.length - 1).map((d, i) => {
        const a = project(d.lat, d.lng);
        const b = project(dots[i + 1].lat, dots[i + 1].lng);
        const mx = (a.x + b.x) / 2;
        const my = Math.min(a.y, b.y) - 30;
        return (
          <path key={i} d={`M${a.x},${a.y} Q${mx},${my} ${b.x},${b.y}`}
            fill="none" stroke={C.mint} strokeWidth={1} strokeDasharray="4 4" opacity={0.6} />
        );
      })}
    </svg>
  );
}

// ─── Slide wrapper ────────────────────────────────────────────────────────────
function Slide({ active, direction, children, bg }: {
  active: boolean; direction: number; children: React.ReactNode; bg: string;
}) {
  return (
    <div style={{
      position: "absolute", top: 0, left: 0, width: "100%", height: "100vh",
      background: bg, overflow: "hidden",
      opacity: active ? 1 : 0,
      transform: active ? "translateX(0)" : `translateX(${direction * 4}%)`,
      transition: "opacity 0.4s cubic-bezier(0.4,0,0.2,1), transform 0.4s cubic-bezier(0.4,0,0.2,1)",
      pointerEvents: active ? "auto" : "none",
    }}>
      {children}
    </div>
  );
}

// ─── SLIDE 1 — TITLE ─────────────────────────────────────────────────────────
function Slide1() {
  return (
    <>
      {/* BG glow */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse 60% 50% at 50% 55%, rgba(226,246,213,0.05) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* Content */}
      <div style={{
        display: "flex", flexDirection: "column", alignItems: "center",
        paddingTop: 80, height: "100vh", position: "relative",
      }}>
        {/* Logo */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
          <Logo size={44} textSize={20} textColor={C.mint} gap={12} />
          <div style={{
            background: "rgba(226,246,213,0.1)", border: "1px solid rgba(226,246,213,0.2)",
            color: C.mint, opacity: 0.6, borderRadius: 999, padding: "6px 16px",
            fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", marginTop: 8,
          }}>
            GLOBAL CHURCH FINANCE
          </div>
        </div>

        {/* Hero text */}
        <div style={{ marginTop: 64, textAlign: "center", padding: "0 40px" }}>
          <div style={{
            fontSize: "clamp(80px,12vw,140px)", fontWeight: 900, color: C.mint,
            lineHeight: 0.85, letterSpacing: "-0.04em",
          }}>
            ChurchPay
          </div>
          <div style={{
            fontSize: "clamp(18px,2.5vw,28px)", fontWeight: 600,
            color: "rgba(226,246,213,0.55)", marginTop: 20,
          }}>
            Financial infrastructure
          </div>
          <div style={{
            fontSize: "clamp(18px,2.5vw,28px)", fontWeight: 600,
            color: "rgba(226,246,213,0.55)",
          }}>
            for the global church.
          </div>
          <div style={{
            fontSize: "clamp(16px,2vw,22px)", fontWeight: 600,
            color: "rgba(226,246,213,0.35)", marginTop: 12, fontStyle: "italic",
          }}>
            Receive donations from any country, in any currency, in seconds.
          </div>
        </div>
      </div>

      {/* Bottom strip */}
      <div style={{
        position: "absolute", bottom: 40, left: 0, right: 0,
        display: "flex", justifyContent: "space-between", padding: "0 80px",
      }}>
        <span style={{ color: C.mint, opacity: 0.4, fontSize: 13, fontWeight: 600 }}>
          Olayinka Akinhanmi · Obiaka Emeka
        </span>
        <span style={{ color: C.mint, opacity: 0.4, fontSize: 13, fontWeight: 600 }}>
          hello@churchpay.com · churchpay.com
        </span>
      </div>
    </>
  );
}

// ─── SLIDE 2 — WHO WE ARE ────────────────────────────────────────────────────
function Slide2() {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Left */}
      <div style={{ flex: "0 0 55%", padding: 80, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: "0.12em" }}>
          WHO WE ARE
        </div>
        <div style={{
          fontSize: "clamp(32px,4vw,52px)", fontWeight: 900, color: C.dark,
          letterSpacing: "-0.03em", lineHeight: 0.95, marginTop: 16, maxWidth: 480,
        }}>
          We didn&apos;t study this problem. We ran it.
        </div>
        <div style={{
          marginTop: 40, borderLeft: `4px solid ${C.mint}`, paddingLeft: 24, paddingTop: 8, paddingBottom: 8,
        }}>
          <p style={{ fontSize: 16, fontWeight: 700, color: C.secondary, lineHeight: 1.6, fontStyle: "italic", margin: 0 }}>
            &ldquo;Together we know the product, the operations, and the money movement side.&rdquo;
          </p>
        </div>
      </div>

      {/* Right */}
      <div style={{
        flex: "0 0 45%", background: C.evergreen,
        display: "flex", flexDirection: "column", justifyContent: "center", gap: 20, padding: 48,
      }}>
        {/* Founder Card 1 */}
        <div style={{
          background: "rgba(255,255,255,0.05)", border: "1px solid rgba(226,246,213,0.15)",
          borderRadius: 20, padding: 24, display: "flex", gap: 20, alignItems: "flex-start",
        }}>
          <img src="/ola.jpg" alt="Olayinka" style={{
            width: 64, height: 64, borderRadius: "50%", objectFit: "cover",
            objectPosition: "center top", border: `2px solid ${C.mint}`, flexShrink: 0,
          }} />
          <div>
            <div style={{ fontWeight: 800, fontSize: 16, color: C.mint }}>Olayinka Akinhanmi</div>
            <div style={{
              display: "inline-block", background: "rgba(226,246,213,0.1)", color: C.mint,
              borderRadius: 999, padding: "3px 10px", fontSize: 11, fontWeight: 700, marginTop: 6,
            }}>
              Co-founder &amp; CEO
            </div>
            <div style={{ color: "rgba(226,246,213,0.65)", fontSize: 13, fontWeight: 600, lineHeight: 1.5, marginTop: 10 }}>
              Built and scaled KingsPay for a 2M-member global church. 10+ years in high-compliance fintech.
            </div>
          </div>
        </div>

        {/* Founder Card 2 */}
        <div style={{
          background: "rgba(255,255,255,0.05)", border: "1px solid rgba(226,246,213,0.15)",
          borderRadius: 20, padding: 24, display: "flex", gap: 20, alignItems: "flex-start",
        }}>
          <img src="/obi.jpeg" alt="Obiaka" style={{
            width: 64, height: 64, borderRadius: "50%", objectFit: "cover",
            objectPosition: "center top", border: "2px solid rgba(226,246,213,0.3)", flexShrink: 0,
          }} />
          <div>
            <div style={{ fontWeight: 800, fontSize: 16, color: C.mint }}>Obiaka Emeka</div>
            <div style={{
              display: "inline-block", background: "rgba(226,246,213,0.1)", color: C.mint,
              borderRadius: 999, padding: "3px 10px", fontSize: 11, fontWeight: 700, marginTop: 6,
            }}>
              Co-founder · Liquidity &amp; Risk
            </div>
            <div style={{ color: "rgba(226,246,213,0.65)", fontSize: 13, fontWeight: 600, lineHeight: 1.5, marginTop: 10 }}>
              14 years at Goldman Sachs — VP, Emerging Markets Debt. Founder, Voltech Capital LP.
            </div>
          </div>
        </div>

        {/* Logo strip */}
        <div style={{ display: "flex", gap: 24, paddingTop: 4 }}>
          {["Goldman Sachs", "KingsPay", "Voltech Capital"].map((name) => (
            <span key={name} style={{ fontSize: 11, fontWeight: 700, color: "rgba(226,246,213,0.3)" }}>
              {name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── SLIDE 3 — THE PROBLEM ────────────────────────────────────────────────────
function Slide3() {
  return (
    <>
      {/* Dot grid top-right */}
      <div style={{ position: "absolute", top: 0, right: 0, width: 320, height: 280, opacity: 0.04 }}>
        <svg width="320" height="280">
          {Array.from({ length: 8 }).map((_, row) =>
            Array.from({ length: 6 }).map((_, col) => (
              <circle key={`${row}-${col}`} cx={col * 48 + 24} cy={row * 36 + 18} r={2.5} fill={C.mint} />
            ))
          )}
        </svg>
      </div>

      <div style={{
        display: "flex", flexDirection: "column", justifyContent: "center",
        padding: 80, maxWidth: 900, height: "100vh",
      }}>
        <div style={{ fontSize: 11, fontWeight: 800, color: C.celebrate, textTransform: "uppercase", letterSpacing: "0.12em" }}>
          THE PROBLEM
        </div>
        <div style={{ marginTop: 24 }}>
          <div style={{ fontSize: "clamp(40px,6vw,80px)", fontWeight: 900, color: C.mint, letterSpacing: "-0.04em", lineHeight: 0.88 }}>
            The church went global.
          </div>
          <div style={{ fontSize: "clamp(40px,6vw,80px)", fontWeight: 900, color: "rgba(226,246,213,0.35)", letterSpacing: "-0.04em", lineHeight: 0.88 }}>
            The money rail didn&apos;t.
          </div>
        </div>

        {/* Three cards */}
        <div style={{ display: "flex", gap: 16, marginTop: 56 }}>
          {[
            { title: "Fragmented local platforms", body: "A separate account, entity, and payout in every country it reaches." },
            { title: "PayPal & Stripe", body: "Only partially supported in most markets. Both restrict religious organizations." },
            { title: "Bank wires", body: "14 days. 6–13% in fees. Zero donor attribution." },
          ].map((card) => (
            <div key={card.title} style={{
              background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 16, padding: 28, flex: 1,
            }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.danger }} />
              <div style={{ fontWeight: 800, fontSize: 16, color: C.canvas, marginTop: 12 }}>
                {card.title}
              </div>
              <div style={{ color: "rgba(251,251,249,0.55)", fontSize: 14, fontWeight: 600, lineHeight: 1.6, marginTop: 8 }}>
                {card.body}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom callout */}
        <div style={{
          marginTop: 48, background: "rgba(255,192,145,0.08)", border: "1px solid rgba(255,192,145,0.2)",
          borderRadius: 14, padding: 24,
        }}>
          <p style={{ color: C.celebrate, fontSize: 16, fontWeight: 700, lineHeight: 1.5, margin: 0 }}>
            &ldquo;Whether it&apos;s a $20 gift from a viewer or a $200K building transfer, the rail is the same: broken.&rdquo;
          </p>
        </div>
      </div>
    </>
  );
}

// ─── SLIDE 4 — USE CASES ─────────────────────────────────────────────────────
function Slide4() {
  return (
    <div style={{ padding: "72px 80px 100px", height: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <div>
        <div style={{ fontSize: 11, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: "0.12em" }}>
          USE CASES
        </div>
        <div style={{
          fontSize: "clamp(32px,4vw,52px)", fontWeight: 900, color: C.dark,
          letterSpacing: "-0.03em", lineHeight: 0.95, marginTop: 8,
        }}>
          This is what we make possible.
        </div>
        <div style={{ fontSize: 18, color: C.secondary, fontWeight: 600, marginTop: 8 }}>
          Three transactions, one rail.
        </div>
      </div>

      {/* Three cards */}
      <div style={{ display: "flex", gap: 20, marginTop: 40, flex: 1 }}>
        {/* Card 1 — Livestream */}
        <div style={{
          borderRadius: 24, padding: 36, flex: 1,
          background: C.evergreen, display: "flex", flexDirection: "column", overflow: "hidden", position: "relative",
        }}>
          <div style={{
            display: "inline-block", background: "rgba(226,246,213,0.15)", color: C.mint,
            borderRadius: 999, padding: "4px 12px", fontSize: 10, fontWeight: 800, letterSpacing: "0.08em",
          }}>
            LIVESTREAM GIVING
          </div>
          <div style={{ marginTop: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 20 }}>🇳🇬</span>
              <span style={{ color: C.mint, fontWeight: 800, fontSize: 15 }}>Adaeze in Lagos</span>
            </div>
            <div style={{ fontSize: 48, fontWeight: 900, color: C.mint, fontVariantNumeric: "tabular-nums", lineHeight: 1, marginTop: 8 }}>₦25,000</div>
            <div style={{ color: C.celebrate, fontSize: 28, fontWeight: 900, margin: "12px 0" }}>→</div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 20 }}>🇺🇸</span>
              <span style={{ color: C.mint, opacity: 0.8, fontWeight: 700, fontSize: 14 }}>Hillside Church, Austin</span>
            </div>
            <div style={{ fontSize: 36, fontWeight: 900, color: C.celebrate, fontVariantNumeric: "tabular-nums", marginTop: 4 }}>$16.00</div>
          </div>
          <div style={{ color: C.mint, opacity: 0.5, fontSize: 12, fontWeight: 600, marginTop: "auto", paddingTop: 20 }}>
            Settled in seconds, fully attributed.
          </div>
        </div>

        {/* Card 2 — HQ → Affiliate */}
        <div style={{
          borderRadius: 24, padding: 36, flex: 1,
          background: "#1a1a18", display: "flex", flexDirection: "column", overflow: "hidden",
        }}>
          <div style={{
            display: "inline-block", background: "rgba(255,255,255,0.12)", color: C.canvas,
            borderRadius: 999, padding: "4px 12px", fontSize: 10, fontWeight: 800, letterSpacing: "0.08em",
          }}>
            HQ → AFFILIATE
          </div>
          <div style={{ marginTop: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 20 }}>🇬🇧</span>
              <span style={{ color: C.canvas, fontWeight: 800, fontSize: 15 }}>New Life HQ, London</span>
            </div>
            <div style={{ fontSize: 40, fontWeight: 900, color: C.canvas, fontVariantNumeric: "tabular-nums", lineHeight: 1, marginTop: 8 }}>$180,000</div>
            <div style={{ color: C.celebrate, fontSize: 28, fontWeight: 900, margin: "12px 0" }}>→</div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 20 }}>🇰🇪</span>
              <span style={{ color: "rgba(251,251,249,0.8)", fontWeight: 700, fontSize: 14 }}>New Life Nairobi</span>
            </div>
            <div style={{ fontSize: 32, fontWeight: 900, color: C.mint, fontVariantNumeric: "tabular-nums", marginTop: 4 }}>KES 23.4M</div>
          </div>
          <div style={{ color: "rgba(251,251,249,0.45)", fontSize: 12, fontWeight: 600, marginTop: "auto", paddingTop: 20 }}>
            Settled same-day, fully reconciled.
          </div>
        </div>

        {/* Card 3 — Missions */}
        <div style={{
          borderRadius: 24, padding: 36, flex: 1,
          background: C.mint, display: "flex", flexDirection: "column", overflow: "hidden",
        }}>
          <div style={{
            display: "inline-block", background: C.evergreen, color: C.mint,
            borderRadius: 999, padding: "4px 12px", fontSize: 10, fontWeight: 800, letterSpacing: "0.08em",
          }}>
            MISSIONS
          </div>
          <div style={{ marginTop: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 20 }}>🇺🇸</span>
              <span style={{ color: C.evergreen, fontWeight: 800, fontSize: 15 }}>Grace Church missions fund</span>
            </div>
            <div style={{ fontSize: 40, fontWeight: 900, color: C.evergreen, fontVariantNumeric: "tabular-nums", lineHeight: 1, marginTop: 8 }}>$42,000</div>
            <div style={{ color: C.evergreen, fontSize: 28, fontWeight: 900, opacity: 0.6, margin: "12px 0" }}>→</div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 20 }}>🇵🇭</span>
              <span style={{ color: C.evergreen, fontWeight: 700, fontSize: 14 }}>Field team, Manila</span>
            </div>
            <div style={{ fontSize: 32, fontWeight: 900, color: C.evergreen, fontVariantNumeric: "tabular-nums", marginTop: 4 }}>₱2.36M</div>
          </div>
          <div style={{ color: C.evergreen, opacity: 0.55, fontSize: 12, fontWeight: 600, marginTop: "auto", paddingTop: 20 }}>
            Settled in seconds, expense-tagged.
          </div>
        </div>
      </div>

      <p style={{ fontSize: 12, fontStyle: "italic", color: C.muted, marginTop: 16 }}>
        Illustrative use cases. Real volume begins post-launch.
      </p>
    </div>
  );
}

// ─── SLIDE 5 — OUR SOLUTION ───────────────────────────────────────────────────
function Slide5() {
  const phoneScreen = (
    <div style={{ background: C.canvas, padding: 20, height: "100%", display: "flex", flexDirection: "column" }}>
      {/* Mini logo */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
        <div style={{ width: 20, height: 20, borderRadius: "50%", background: C.mint, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <ArrowIcon size={10} color={C.evergreen} />
        </div>
        <span style={{ fontSize: 13, fontWeight: 800, color: C.evergreen }}>ChurchPay</span>
      </div>

      {/* Church info */}
      <div style={{ textAlign: "center", marginTop: 24, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{
          width: 52, height: 52, borderRadius: "50%", background: C.mint,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <ChurchIcon size={22} color={C.evergreen} />
        </div>
        <div style={{ fontWeight: 800, fontSize: 18, color: C.dark, marginTop: 12 }}>Lakewood Church</div>
        <div style={{ color: C.muted, fontSize: 13, marginTop: 4 }}>Houston, TX · United States</div>
        <div style={{
          background: C.mint, color: C.evergreen, borderRadius: 999,
          padding: "4px 12px", fontSize: 11, fontWeight: 700, marginTop: 12,
        }}>
          ✓ Verified church on ChurchPay
        </div>
      </div>

      <div style={{ flex: 1 }} />

      {/* Give button */}
      <div style={{
        width: "100%", height: 52, background: C.evergreen, borderRadius: 9999,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontWeight: 800, fontSize: 17, color: C.mint, marginBottom: 24, cursor: "pointer",
      }}>
        Give
      </div>
    </div>
  );

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Left */}
      <div style={{
        flex: "0 0 50%", padding: "80px 48px 80px 80px",
        display: "flex", flexDirection: "column", justifyContent: "center",
      }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: "0.12em" }}>
          OUR SOLUTION
        </div>
        <div style={{
          fontSize: "clamp(28px,3.5vw,46px)", fontWeight: 900, color: C.dark,
          letterSpacing: "-0.03em", lineHeight: 0.95, marginTop: 16,
        }}>
          Any giver, any country, any currency.
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20, marginTop: 40 }}>
          {[
            { title: "Borderless giving", body: "A giver anywhere donates in their local currency — card, wallet, or mobile money" },
            { title: "Instant settlement", body: "Funds convert and land in the church's account in seconds, at near-zero cost" },
            { title: "Reconciliation & treasury", body: "One operating account for multi-currency books, ministry cards, and real-time visibility" },
          ].map((feat) => (
            <div key={feat.title} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
              <div style={{
                width: 32, height: 32, borderRadius: "50%", background: C.mint,
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              }}>
                <CheckIcon size={14} color={C.evergreen} />
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: 16, color: C.dark }}>{feat.title}</div>
                <div style={{ fontWeight: 600, fontSize: 14, color: C.secondary, lineHeight: 1.5, marginTop: 4 }}>{feat.body}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right */}
      <div style={{
        flex: "0 0 50%", background: C.evergreen,
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 32, padding: 48,
      }}>
        <PhoneMockup scale={0.9}>{phoneScreen}</PhoneMockup>
        <div style={{ color: C.mint, opacity: 0.5, fontSize: 13, fontWeight: 600, textAlign: "center" }}>
          Mobile give checkout · Zero install required
        </div>
      </div>
    </div>
  );
}

// ─── SLIDE 6 — HOW IT WORKS ───────────────────────────────────────────────────
function Slide6() {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Left */}
      <div style={{
        flex: "0 0 55%", padding: 80, display: "flex", flexDirection: "column", justifyContent: "center",
      }}>
        <div style={{ fontSize: 11, fontWeight: 800, color: C.celebrate, textTransform: "uppercase", letterSpacing: "0.12em" }}>
          HOW IT WORKS
        </div>
        <div style={{
          fontSize: "clamp(28px,4vw,52px)", fontWeight: 900, color: C.canvas,
          letterSpacing: "-0.03em", lineHeight: 0.95, marginTop: 16,
        }}>
          Money in, money out — in seconds.
        </div>
        <div style={{ marginTop: 16, fontSize: 16, color: "rgba(251,251,249,0.55)", fontWeight: 600, lineHeight: 1.6, maxWidth: 440 }}>
          One rail for every kind of money the church moves across borders.
        </div>

        {/* Steps */}
        <div style={{ display: "flex", flexDirection: "column", marginTop: 40 }}>
          {[
            { num: "01", title: "The giver", sub: "Pays in local currency", body: "Card, wallet, or mobile money — in naira, pounds, won, anything." },
            { num: "02", title: "ChurchPay", sub: "Converts & settles instantly", body: "Currency converted and routed in seconds, at near-zero cost." },
            { num: "03", title: "The church", sub: "Receives in USD or local", body: "Funds land in one account, every gift attributed automatically." },
          ].map((step, i) => (
            <div key={step.num} style={{
              display: "flex", gap: 24, paddingTop: 28, paddingBottom: 28,
              borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.06)" : "none",
            }}>
              <div style={{
                fontSize: 40, fontWeight: 900, color: "rgba(226,246,213,0.12)",
                fontVariantNumeric: "tabular-nums", minWidth: 64, lineHeight: 1,
              }}>
                {step.num}
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: 18, color: C.mint }}>{step.title}</div>
                <div style={{ fontWeight: 700, fontSize: 13, color: C.celebrate, marginTop: 2 }}>{step.sub}</div>
                <div style={{ color: "rgba(251,251,249,0.55)", fontSize: 14, fontWeight: 600, lineHeight: 1.55, marginTop: 6 }}>{step.body}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right — flow diagram */}
      <div style={{
        flex: "0 0 45%", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", padding: 48,
      }}>
        {/* Node 1 */}
        <div style={{
          background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 16, padding: 20, width: 240, textAlign: "center",
        }}>
          <span style={{ fontSize: 32 }}>🇳🇬</span>
          <div style={{ fontWeight: 700, color: C.canvas, fontSize: 14, marginTop: 8 }}>Giver in Lagos</div>
          <div style={{ fontWeight: 900, fontSize: 28, color: C.celebrate, fontVariantNumeric: "tabular-nums", marginTop: 4 }}>₦25,000</div>
        </div>

        {/* Connector */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0 }}>
          <div style={{ width: 2, height: 20, background: "rgba(226,246,213,0.2)" }} />
          <div style={{
            width: 8, height: 8, background: C.mint, transform: "rotate(45deg)", borderRadius: 1,
          }} />
          <div style={{ width: 2, height: 20, background: "rgba(226,246,213,0.2)" }} />
        </div>

        {/* Node 2 */}
        <div style={{
          background: C.evergreen, border: "1px solid rgba(226,246,213,0.2)",
          borderRadius: 16, padding: 20, width: 240, textAlign: "center",
        }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 4 }}>
            <Logo size={24} textSize={13} textColor={C.mint} gap={6} />
          </div>
          <div style={{ fontWeight: 800, fontSize: 14, color: C.mint, marginTop: 8 }}>Instant conversion</div>
          <div style={{ color: C.mint, opacity: 0.6, fontSize: 12, marginTop: 4 }}>Mid-market rate · Sub-cent cost</div>
        </div>

        {/* Connector */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0 }}>
          <div style={{ width: 2, height: 20, background: "rgba(226,246,213,0.2)" }} />
          <div style={{
            width: 8, height: 8, background: C.mint, transform: "rotate(45deg)", borderRadius: 1,
          }} />
          <div style={{ width: 2, height: 20, background: "rgba(226,246,213,0.2)" }} />
        </div>

        {/* Node 3 */}
        <div style={{
          background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 16, padding: 20, width: 240, textAlign: "center",
        }}>
          <span style={{ fontSize: 32 }}>🇺🇸</span>
          <div style={{ fontWeight: 700, color: C.canvas, fontSize: 14, marginTop: 8 }}>Church in Austin</div>
          <div style={{ fontWeight: 900, fontSize: 28, color: C.mint, fontVariantNumeric: "tabular-nums", marginTop: 4 }}>$16.00</div>
          <div style={{ color: C.mint, opacity: 0.5, fontSize: 12, marginTop: 4 }}>Fully attributed</div>
        </div>
      </div>
    </div>
  );
}

// ─── SLIDE 7 — THE PLATFORM ───────────────────────────────────────────────────
function Slide7() {
  const dashboardScreen = (
    <div style={{ background: C.canvas, height: "100%", overflow: "hidden" }}>
      {/* Top bar */}
      <div style={{
        height: 32, background: C.evergreen, display: "flex", alignItems: "center", padding: "0 16px",
      }}>
        <Logo size={18} textSize={12} textColor={C.mint} gap={6} />
      </div>
      {/* Content */}
      <div style={{ padding: 16 }}>
        <div style={{ fontWeight: 800, fontSize: 13, color: C.dark }}>Today&apos;s giving</div>
        <div style={{ fontWeight: 900, fontSize: 28, color: C.evergreen, fontVariantNumeric: "tabular-nums" }}>$94,247</div>
        <div style={{ color: C.muted, fontSize: 11, marginTop: 2 }}>from 38 countries</div>
        <div style={{ height: 1, background: "rgba(14,15,12,0.08)", margin: "12px 0" }} />
        {[
          { flag: "🇳🇬", name: "Adaeze", local: "₦25,000", usd: "$16" },
          { flag: "🇬🇧", name: "Marcus", local: "£200", usd: "$254" },
          { flag: "🇰🇪", name: "Sarah", local: "KES 8,000", usd: "$62" },
          { flag: "🇺🇸", name: "James", local: "$100", usd: "$100" },
        ].map((row) => (
          <div key={row.name} style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            paddingTop: 6, paddingBottom: 6, fontSize: 11, fontWeight: 600,
          }}>
            <span>{row.flag} {row.name} · {row.local}</span>
            <span style={{ color: C.evergreen }}>→ {row.usd}</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div style={{ padding: "64px 80px 80px", height: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <div>
        <div style={{ fontSize: 11, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: "0.12em" }}>
          THE PLATFORM
        </div>
        <div style={{
          fontSize: "clamp(28px,3.5vw,48px)", fontWeight: 900, color: C.dark,
          letterSpacing: "-0.03em", lineHeight: 0.95, marginTop: 8, maxWidth: 700,
        }}>
          Donations are the wedge. The platform is the prize.
        </div>
      </div>

      <div style={{ display: "flex", gap: 40, marginTop: 40, flex: 1 }}>
        {/* Left: feature rows */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          {[
            { num: "1", label: "Donations", tag: "WEDGE", tagDark: true, desc: "Cross-border giving from livestream and in-person congregants" },
            { num: "2", label: "HQ → Affiliate", tag: "PLATFORM", tagDark: false, desc: "Headquarters funding partner churches and franchise locations" },
            { num: "3", label: "Missions", tag: "PLATFORM", tagDark: false, desc: "Disbursements to field teams and missionary payroll abroad" },
            { num: "4", label: "Expansion", tag: "PLATFORM", tagDark: false, desc: "Building projects and new-country church plants" },
          ].map((row, i) => (
            <div key={row.label} style={{
              display: "flex", gap: 20, alignItems: "flex-start", paddingTop: 20, paddingBottom: 20,
              borderBottom: i < 3 ? "1px solid rgba(14,15,12,0.08)" : "none",
            }}>
              <div style={{
                width: 32, height: 32, borderRadius: "50%", background: C.evergreen,
                color: C.mint, display: "flex", alignItems: "center", justifyContent: "center",
                fontWeight: 800, fontSize: 14, flexShrink: 0,
              }}>
                {row.num}
              </div>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontWeight: 800, fontSize: 18, color: C.dark }}>{row.label}</span>
                  <span style={{
                    background: row.tagDark ? C.evergreen : C.mint,
                    color: row.tagDark ? C.mint : C.evergreen,
                    borderRadius: 999, padding: "2px 10px", fontSize: 10, fontWeight: 800, letterSpacing: "0.06em",
                  }}>
                    {row.tag}
                  </span>
                </div>
                <div style={{ fontWeight: 600, fontSize: 14, color: C.secondary, lineHeight: 1.5, marginTop: 4 }}>
                  {row.desc}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right: Laptop mockup */}
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ transform: "scale(0.82)", transformOrigin: "center center" }}>
            <LaptopMockup>{dashboardScreen}</LaptopMockup>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── SLIDE 8 — VISION ─────────────────────────────────────────────────────────
function Slide8() {
  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", height: "100vh", padding: 80, textAlign: "center",
    }}>
      <div style={{ fontSize: 11, fontWeight: 800, color: C.celebrate, textTransform: "uppercase", letterSpacing: "0.12em" }}>
        VISION
      </div>
      <div style={{
        fontSize: "clamp(36px,6vw,80px)", fontWeight: 900, color: C.mint,
        letterSpacing: "-0.04em", lineHeight: 0.88, marginTop: 24,
      }}>
        The financial backbone of faith.
      </div>
      <div style={{
        width: 80, height: 3, background: C.celebrate, borderRadius: 999, margin: "28px auto",
      }} />
      <p style={{
        maxWidth: 640, fontSize: 17, color: "rgba(226,246,213,0.65)", fontWeight: 600,
        lineHeight: 1.7, margin: 0,
      }}>
        Faith looks niche from a horizontal lens. It&apos;s the same vertical fintech opportunity Toast captured in restaurants
        and Veeva captured in pharma — a $1.5T market with no incumbent owning the rail.
      </p>

      {/* TAM/SAM/SOM */}
      <div style={{ display: "flex", gap: 20, marginTop: 64, maxWidth: 840, width: "100%" }}>
        {[
          { label: "TAM", amount: "$1.5T", desc: "annual global religious flow", celebrate: false },
          { label: "SAM", amount: "$135B", desc: "mid-to-large churches, 8 target markets", celebrate: false },
          { label: "SOM", amount: "$210M ARR", desc: "Year-5 reachable. 1,500 churches × 1% take", celebrate: true },
        ].map((item) => (
          <div key={item.label} style={{
            background: item.celebrate ? "rgba(255,192,145,0.08)" : "rgba(255,255,255,0.04)",
            border: `1px solid ${item.celebrate ? "rgba(255,192,145,0.2)" : "rgba(226,246,213,0.1)"}`,
            borderRadius: 24, padding: 32, flex: 1, textAlign: "center",
          }}>
            <div style={{ color: C.mint, opacity: 0.4, textTransform: "uppercase", fontWeight: 800, fontSize: 11, letterSpacing: "0.1em" }}>
              {item.label}
            </div>
            <div style={{
              fontSize: 52, fontWeight: 900, color: item.celebrate ? C.celebrate : C.mint,
              fontVariantNumeric: "tabular-nums", letterSpacing: "-0.04em", lineHeight: 0.9, marginTop: 12,
            }}>
              {item.amount}
            </div>
            <div style={{ color: C.mint, opacity: 0.5, fontSize: 13, fontWeight: 600, lineHeight: 1.4, marginTop: 10 }}>
              {item.desc}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── SLIDE 9 — TRACTION ───────────────────────────────────────────────────────
function Slide9() {
  return (
    <div style={{ padding: "72px 80px 80px", height: "100vh", display: "flex", flexDirection: "column" }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: "0.12em" }}>
        TRACTION
      </div>
      <div style={{
        fontSize: "clamp(32px,5vw,60px)", fontWeight: 900, color: C.dark,
        letterSpacing: "-0.03em", lineHeight: 0.95, marginTop: 8,
      }}>
        This isn&apos;t a cold start.
      </div>

      {/* Stat row */}
      <div style={{
        display: "flex", marginTop: 48,
        borderTop: "1px solid rgba(14,15,12,0.08)", borderBottom: "1px solid rgba(14,15,12,0.08)",
        paddingTop: 40, paddingBottom: 40,
      }}>
        {[
          { stat: "2M", desc: "members on KingsPay, our founder's prior system" },
          { stat: "4 + 3", desc: "signed LOIs plus 3 active — from flagship churches" },
          { stat: "Live", italic: true, desc: "end-to-end prototype running today" },
          { stat: "Both sides", desc: "signed by senior pastor AND finance director — mixed-buyer pull" },
        ].map((item, i) => (
          <div key={item.stat} style={{
            flex: 1, textAlign: "center", paddingLeft: 40, paddingRight: 40,
            borderRight: i < 3 ? "1px solid rgba(14,15,12,0.08)" : "none",
          }}>
            <div style={{
              fontSize: 72, fontWeight: 900, color: C.evergreen, fontVariantNumeric: "tabular-nums",
              letterSpacing: "-0.04em", lineHeight: 0.9,
              fontStyle: item.italic ? "italic" : "normal",
            }}>
              {item.stat}
            </div>
            <div style={{ color: C.muted, fontSize: 13, fontWeight: 600, lineHeight: 1.4, marginTop: 12, maxWidth: 160, margin: "12px auto 0" }}>
              {item.desc}
            </div>
          </div>
        ))}
      </div>

      {/* Callout */}
      <div style={{
        background: C.evergreen, color: C.mint, borderRadius: 20, padding: 32,
        marginTop: 48, maxWidth: 800, position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", left: 0, top: 0, bottom: 0, width: 4,
          background: C.celebrate, borderRadius: 2,
        }} />
        <p style={{ fontSize: 17, fontWeight: 700, lineHeight: 1.6, margin: 0, paddingLeft: 16 }}>
          &ldquo;The same engine already moved money for a 2M-member global church. The question was never
          whether this could work — it was whether someone would build it right.&rdquo;
        </p>
      </div>
    </div>
  );
}

// ─── SLIDE 10 — WHY WE WIN ────────────────────────────────────────────────────
function Slide10() {
  const rows = [
    { feature: "Countries supported", incumbent: "1–5 countries", churchpay: "200+ countries" },
    { feature: "Settlement speed", incumbent: "1–5 days", churchpay: "Seconds" },
    { feature: "Donor attribution", incumbent: "Partial or none", churchpay: "Every gift, automatic" },
    { feature: "FX fees", incumbent: "6–13%", churchpay: "Mid-market rate" },
    { feature: "Built for faith", incumbent: "Afterthought", churchpay: "Day one" },
  ];

  return (
    <div style={{ padding: "72px 80px", height: "100vh", display: "flex", flexDirection: "column" }}>
      <div style={{ fontSize: 11, fontWeight: 800, color: C.celebrate, textTransform: "uppercase", letterSpacing: "0.12em" }}>
        WHY WE WIN
      </div>
      <div style={{
        fontSize: "clamp(28px,4vw,52px)", fontWeight: 900, color: C.canvas,
        letterSpacing: "-0.03em", lineHeight: 0.95, marginTop: 16, maxWidth: 800,
      }}>
        Others retrofit. We were built borderless from day one.
      </div>

      {/* Table */}
      <div style={{ marginTop: 48, maxWidth: 1000, borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,0.07)" }}>
        {/* Header */}
        <div style={{ display: "flex", background: "rgba(255,255,255,0.04)" }}>
          <div style={{ flex: 2, padding: "14px 24px", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: C.muted }}>
            FEATURE
          </div>
          <div style={{ flex: 2, padding: "14px 24px", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: C.muted }}>
            INCUMBENTS
          </div>
          <div style={{
            flex: 2, padding: "14px 24px", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em",
            color: C.mint, borderLeft: `2px solid ${C.celebrate}`,
          }}>
            CHURCHPAY
          </div>
        </div>

        {/* Rows */}
        {rows.map((row, i) => (
          <div key={row.feature} style={{
            display: "flex", borderBottom: i < rows.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
          }}>
            <div style={{ flex: 2, padding: "18px 24px", fontSize: 14, fontWeight: 700, color: C.canvas }}>
              {row.feature}
            </div>
            <div style={{ flex: 2, padding: "18px 24px", fontSize: 14, fontWeight: 600, color: "rgba(251,251,249,0.4)" }}>
              {row.incumbent}
            </div>
            <div style={{ flex: 2, padding: "18px 24px", fontSize: 14, fontWeight: 700, color: C.mint, borderLeft: `2px solid rgba(255,192,145,0.1)` }}>
              {row.churchpay}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── SLIDE 11 — TAILWINDS ─────────────────────────────────────────────────────
function Slide11() {
  return (
    <div style={{ padding: "72px 80px 80px", height: "100vh", display: "flex", flexDirection: "column" }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: "0.12em" }}>
        TAILWINDS
      </div>
      <div style={{
        fontSize: "clamp(32px,5vw,60px)", fontWeight: 900, color: C.dark,
        letterSpacing: "-0.03em", lineHeight: 0.95, marginTop: 8,
      }}>
        The waves we&apos;re riding.
      </div>

      <div style={{ display: "flex", gap: 20, marginTop: 40, flex: 1 }}>
        {/* Card 1 */}
        <div style={{
          background: C.evergreen, borderRadius: 24, padding: 40, flex: 1,
          display: "flex", flexDirection: "column",
        }}>
          <div style={{ fontSize: 80, fontWeight: 900, color: C.mint, opacity: 0.12, lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>
            01
          </div>
          <div style={{ fontWeight: 900, fontSize: 22, color: C.mint, marginTop: 8 }}>
            The church became a global product
          </div>
          <p style={{ color: "rgba(226,246,213,0.65)", fontSize: 14, fontWeight: 600, lineHeight: 1.65, marginTop: 12, flex: 1 }}>
            Top services stream to 50–60 countries every Sunday. The audience is borderless; the giving rail is not.
          </p>
          <div style={{
            background: "rgba(226,246,213,0.1)", border: "1px solid rgba(226,246,213,0.15)",
            borderRadius: 999, padding: "6px 16px", fontSize: 12, fontWeight: 700, color: C.mint,
            display: "inline-block", marginTop: 16, alignSelf: "flex-start",
          }}>
            50–60 countries per service
          </div>
        </div>

        {/* Card 2 */}
        <div style={{
          background: C.mint, borderRadius: 24, padding: 40, flex: 1,
          display: "flex", flexDirection: "column",
        }}>
          <div style={{ fontSize: 80, fontWeight: 900, color: C.evergreen, opacity: 0.12, lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>
            02
          </div>
          <div style={{ fontSize: 64, fontWeight: 900, color: C.evergreen, fontVariantNumeric: "tabular-nums", lineHeight: 1, marginTop: 4 }}>
            49%
          </div>
          <div style={{ fontWeight: 900, fontSize: 22, color: C.evergreen, marginTop: 8 }}>
            Giving went cashless
          </div>
          <p style={{ color: C.secondary, fontSize: 14, fontWeight: 600, lineHeight: 1.65, marginTop: 12, flex: 1 }}>
            Of U.S. church giving is now made by card. The behaviour moved online — it just can&apos;t cross a border yet.
          </p>
        </div>

        {/* Card 3 */}
        <div style={{
          background: C.dark, borderRadius: 24, padding: 40, flex: 1,
          display: "flex", flexDirection: "column",
        }}>
          <div style={{ fontSize: 80, fontWeight: 900, color: C.celebrate, opacity: 0.12, lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>
            03
          </div>
          <div style={{ fontWeight: 900, fontSize: 22, color: C.canvas, marginTop: 8 }}>
            The rails finally caught up
          </div>
          <p style={{ color: "rgba(251,251,249,0.6)", fontSize: 14, fontWeight: 600, lineHeight: 1.65, marginTop: 12, flex: 1 }}>
            Any currency can now be accepted, converted, and settled instantly at near-zero cost. The infrastructure bottleneck is gone.
          </p>
          <div style={{
            background: "rgba(255,192,145,0.08)", border: "1px solid rgba(255,192,145,0.2)",
            borderRadius: 999, padding: "6px 16px", fontSize: 12, fontWeight: 700, color: C.celebrate,
            display: "inline-block", marginTop: 16, alignSelf: "flex-start",
          }}>
            Cross-border settlement is now sub-cent
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── SLIDE 12 — TIMING ────────────────────────────────────────────────────────
function Slide12() {
  return (
    <div style={{ padding: "72px 80px", height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <div style={{ fontSize: 11, fontWeight: 800, color: C.celebrate, textTransform: "uppercase", letterSpacing: "0.12em" }}>
        TIMING
      </div>
      <div style={{
        fontSize: "clamp(32px,5vw,58px)", fontWeight: 900, color: C.mint,
        letterSpacing: "-0.03em", lineHeight: 0.95, maxWidth: 700, marginTop: 16,
      }}>
        The missing rail finally exists.
      </div>
      <p style={{ marginTop: 24, maxWidth: 640, fontSize: 17, color: "rgba(226,246,213,0.65)", fontWeight: 600, lineHeight: 1.7 }}>
        For 50 years the church had no way to move money across a border instantly and cheaply. As of 2024–25, the rails
        to support cross-border, any-currency settlement at near-zero cost have finally caught up — while church giving
        has gone 49% cashless. That window is open now.
      </p>

      {/* Timeline */}
      <div style={{ marginTop: 64, maxWidth: 900, position: "relative" }}>
        {/* Base line */}
        <div style={{ height: 2, background: "rgba(226,246,213,0.15)", width: "100%", position: "relative" }}>
          {/* Highlight segment (node 2 to node 3) */}
          <div style={{
            position: "absolute", height: 2, right: 0, width: "55%",
            background: "rgba(255,192,145,0.5)",
          }} />
        </div>

        {/* Nodes */}
        <div style={{ position: "relative", display: "flex", justifyContent: "space-between", marginTop: -7 }}>
          {/* Node 1 */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ width: 14, height: 14, borderRadius: "50%", background: C.mint }} />
            <div style={{ marginTop: 12, textAlign: "center" }}>
              <div style={{ color: C.mint, opacity: 0.4, fontSize: 11, fontWeight: 700 }}>2015</div>
              <div style={{ color: C.mint, opacity: 0.7, fontWeight: 700, fontSize: 13, marginTop: 4 }}>Giving goes digital</div>
              <div style={{ color: C.mint, opacity: 0.4, fontSize: 12, marginTop: 2, maxWidth: 130 }}>49% of U.S. church giving moves online</div>
            </div>
          </div>

          {/* Node 2 */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ width: 14, height: 14, borderRadius: "50%", background: C.mint }} />
            <div style={{ marginTop: 12, textAlign: "center" }}>
              <div style={{ color: C.mint, opacity: 0.4, fontSize: 11, fontWeight: 700 }}>2022</div>
              <div style={{ color: C.mint, opacity: 0.7, fontWeight: 700, fontSize: 13, marginTop: 4 }}>Stablecoin rails scale</div>
              <div style={{ color: C.mint, opacity: 0.4, fontSize: 12, marginTop: 2 }}>$250B+ stablecoin supply</div>
            </div>
          </div>

          {/* Node 3 — highlight */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ position: "relative", width: 18, height: 18 }}>
              <div style={{
                position: "absolute", inset: -4, borderRadius: "50%",
                border: `2px solid rgba(255,192,145,0.3)`,
              }} />
              <div style={{ width: 18, height: 18, borderRadius: "50%", background: C.celebrate }} />
            </div>
            <div style={{ marginTop: 12, textAlign: "center" }}>
              <div style={{ color: C.celebrate, fontSize: 11, fontWeight: 700 }}>2025</div>
              <div style={{ fontWeight: 900, fontSize: 16, color: C.celebrate, marginTop: 4 }}>THE WINDOW</div>
              <div style={{ color: C.mint, opacity: 0.7, fontSize: 12, marginTop: 2 }}>ChurchPay</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── SLIDE 13 — FOUNDER-MARKET FIT ───────────────────────────────────────────
function Slide13() {
  return (
    <div style={{ padding: "64px 80px 80px", height: "100vh", display: "flex", flexDirection: "column" }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: "0.12em" }}>
        FOUNDER-MARKET FIT
      </div>
      <div style={{
        fontSize: "clamp(32px,4vw,52px)", fontWeight: 900, color: C.dark,
        letterSpacing: "-0.03em", lineHeight: 0.95, marginTop: 8,
      }}>
        Why this is ours to build.
      </div>

      <div style={{ display: "flex", gap: 28, marginTop: 40, flex: 1 }}>
        {/* Card 1 */}
        <div style={{ background: C.evergreen, borderRadius: 28, padding: 48, flex: 1, display: "flex", flexDirection: "column" }}>
          <img src="/ola.jpg" alt="Olayinka" style={{
            width: 96, height: 96, borderRadius: "50%", objectFit: "cover",
            objectPosition: "center top", border: `3px solid ${C.mint}`,
          }} />
          <div style={{ fontWeight: 900, fontSize: 20, color: C.mint, marginTop: 20 }}>Olayinka Akinhanmi</div>
          <div style={{ color: C.mint, opacity: 0.55, fontSize: 13, fontWeight: 600, marginTop: 4 }}>Co-founder &amp; CEO · Product</div>
          <div style={{ height: 1, background: "rgba(226,246,213,0.15)", margin: "24px 0" }} />
          <p style={{ color: C.mint, opacity: 0.8, fontSize: 15, fontWeight: 600, lineHeight: 1.7, flex: 1, margin: 0 }}>
            Built and ran KingsPay&apos;s payment ecosystem for a 2M-member global church. He didn&apos;t read about givers being
            turned away at the border. He watched it happen every Sunday and built the fix.
          </p>
          <div style={{
            color: C.mint, opacity: 0.3, fontSize: 11, fontWeight: 700,
            letterSpacing: "0.08em", textTransform: "uppercase", marginTop: 24,
          }}>
            Product · Engineering · Operations
          </div>
        </div>

        {/* Card 2 */}
        <div style={{ background: C.dark, borderRadius: 28, padding: 48, flex: 1, display: "flex", flexDirection: "column" }}>
          <img src="/obi.jpeg" alt="Obiaka" style={{
            width: 96, height: 96, borderRadius: "50%", objectFit: "cover",
            objectPosition: "center top", border: "3px solid rgba(255,255,255,0.15)",
          }} />
          <div style={{ fontWeight: 900, fontSize: 20, color: C.canvas, marginTop: 20 }}>Obiaka Emeka</div>
          <div style={{ color: "rgba(251,251,249,0.45)", fontSize: 13, fontWeight: 600, marginTop: 4 }}>Co-founder · Liquidity &amp; Risk</div>
          <div style={{ height: 1, background: "rgba(255,255,255,0.08)", margin: "24px 0" }} />
          <p style={{ color: "rgba(251,251,249,0.75)", fontSize: 15, fontWeight: 600, lineHeight: 1.7, flex: 1, margin: 0 }}>
            14 years at Goldman Sachs moving sovereign debt, FX, and institutional capital across emerging markets.
            Runs Voltech Capital LP. Knows exactly how to move money across borders safely and at scale.
          </p>
          <div style={{
            color: "rgba(251,251,249,0.25)", fontSize: 11, fontWeight: 700,
            letterSpacing: "0.08em", textTransform: "uppercase", marginTop: 24,
          }}>
            Liquidity · Risk · Capital Markets
          </div>
        </div>
      </div>

      <p style={{
        textAlign: "center", fontStyle: "italic", color: C.muted,
        fontSize: 15, fontWeight: 700, marginTop: 28,
      }}>
        One of us lived the customer pain. The other understands how to move money safely at scale.
      </p>
    </div>
  );
}

// ─── SLIDE 14 — THE ASK ───────────────────────────────────────────────────────
function Slide14() {
  return (
    <>
      {/* Dot grid */}
      <div style={{ position: "absolute", top: 0, right: 0, width: 320, height: 280, opacity: 0.05, pointerEvents: "none" }}>
        <svg width="320" height="280">
          {Array.from({ length: 6 }).map((_, row) =>
            Array.from({ length: 6 }).map((_, col) => (
              <circle key={`${row}-${col}`} cx={col * 52 + 26} cy={row * 44 + 22} r={2.5} fill={C.mint} />
            ))
          )}
        </svg>
      </div>
      {/* Radial glow */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse 50% 40% at 50% 45%, rgba(226,246,213,0.03) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        height: "100vh", textAlign: "center", padding: 80,
      }}>
        <div style={{ fontSize: 11, fontWeight: 800, color: C.celebrate, textTransform: "uppercase", letterSpacing: "0.12em" }}>
          THE ASK
        </div>
        <div style={{
          fontSize: "clamp(100px,18vw,180px)", fontWeight: 900, color: C.mint,
          fontVariantNumeric: "tabular-nums", letterSpacing: "-0.05em", lineHeight: 0.85, marginTop: 20,
        }}>
          $3M
        </div>
        <div style={{ color: C.mint, opacity: 0.4, fontSize: 18, fontWeight: 700, marginTop: 16 }}>
          Pre-seed round
        </div>
        <div style={{ width: 60, height: 3, background: C.celebrate, borderRadius: 999, margin: "36px auto" }} />

        {/* Milestone chips */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "center", width: "100%" }}>
          {[
            "Launch the product and process first real cross-border donation volume",
            "Convert signed LOIs into live churches across 8 target markets",
            "Reach $50M+ in annualized giving volume on the platform",
            "Arrive at our Series A with proven take-rate and a defensible giver network",
          ].map((text, i) => (
            <div key={i} style={{
              background: "rgba(226,246,213,0.04)", border: "1px solid rgba(226,246,213,0.1)",
              borderRadius: 14, padding: "14px 24px", maxWidth: 520, width: "100%",
              textAlign: "left", display: "flex", gap: 16, alignItems: "center",
            }}>
              <div style={{
                width: 28, height: 28, borderRadius: "50%",
                background: "rgba(226,246,213,0.08)", color: C.mint,
                fontWeight: 800, fontSize: 13,
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              }}>
                {i + 1}
              </div>
              <span style={{ color: C.mint, opacity: 0.75, fontSize: 15, fontWeight: 600 }}>{text}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

// ─── SLIDE 15 — PROOF POINT ───────────────────────────────────────────────────
function Slide15() {
  return (
    <div style={{ padding: "64px 80px 80px", height: "100vh", display: "flex", flexDirection: "column" }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: "0.12em" }}>
        PROOF POINT
      </div>
      <div style={{
        fontSize: "clamp(32px,5vw,58px)", fontWeight: 900, color: C.dark,
        letterSpacing: "-0.03em", lineHeight: 0.95, marginTop: 8,
      }}>
        The intent is already there.
      </div>

      {/* Evidence card */}
      <div style={{
        background: C.evergreen, borderRadius: 30, padding: 60,
        maxWidth: 840, margin: "40px auto 0", position: "relative", overflow: "hidden",
        width: "100%",
      }}>
        {/* LOI watermark */}
        <div style={{
          position: "absolute", right: -20, bottom: -30, fontSize: 200, fontWeight: 900,
          color: "rgba(255,255,255,0.03)", userSelect: "none", lineHeight: 1, pointerEvents: "none",
        }}>
          LOI
        </div>

        <div style={{
          display: "inline-block", background: C.celebrate, color: C.dark,
          borderRadius: 999, padding: "6px 16px", fontSize: 12, fontWeight: 800, marginBottom: 28,
        }}>
          SIGNED LOI
        </div>

        <div style={{ fontWeight: 900, fontSize: 26, color: C.mint, lineHeight: 1.2 }}>
          Flagship church · [N] weekly international viewers
        </div>

        <p style={{ color: C.mint, opacity: 0.7, fontSize: 16, fontWeight: 600, lineHeight: 1.7, marginTop: 20 }}>
          Already signed a Letter of Intent. That gives us an anchor customer and a path into its broader denomination
          network — hundreds of affiliate churches sharing the same polity, audit, and banking infrastructure.
        </p>

        {/* Stat chips */}
        <div style={{ display: "flex", gap: 16, marginTop: 32 }}>
          {[
            { label: "Anchor LOI signed" },
            { label: "Path to 200–5,000 affiliate churches" },
          ].map((chip) => (
            <div key={chip.label} style={{
              background: "rgba(255,255,255,0.05)", border: "1px solid rgba(226,246,213,0.12)",
              borderRadius: 14, padding: "16px 24px", display: "flex", alignItems: "center", gap: 10,
            }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#4ade80", flexShrink: 0 }} />
              <span style={{ color: C.mint, fontWeight: 700, fontSize: 14 }}>{chip.label}</span>
            </div>
          ))}
        </div>
      </div>

      <p style={{ fontStyle: "italic", color: C.muted, fontSize: 13, textAlign: "center", marginTop: 16 }}>
        Placeholder to fill before sending.
      </p>
    </div>
  );
}

// ─── SLIDE 16 — CALL TO ACTION ────────────────────────────────────────────────
function Slide16() {
  return (
    <>
      {/* Globe */}
      <div style={{
        position: "absolute", bottom: 0, right: 0,
        transform: "translate(80px, 80px)", pointerEvents: "none",
      }}>
        <GlobeGraphic size={400} opacity={0.05} />
      </div>
      {/* Radial glow */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse 70% 60% at 40% 50%, rgba(226,246,213,0.06) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        height: "100vh", textAlign: "center", padding: 80,
      }}>
        <Logo size={48} textSize={26} textColor={C.mint} gap={14} />

        <div style={{ marginTop: 56, maxWidth: 800 }}>
          <div style={{ fontSize: "clamp(32px,5vw,64px)", fontWeight: 900, color: C.mint, letterSpacing: "-0.04em", lineHeight: 0.9 }}>
            We&apos;re building the rail
          </div>
          <div style={{ fontSize: "clamp(32px,5vw,64px)", fontWeight: 900, color: C.mint, letterSpacing: "-0.04em", lineHeight: 0.9 }}>
            for the one donation
          </div>
          <div style={{ fontSize: "clamp(32px,5vw,64px)", fontWeight: 900, color: "rgba(226,246,213,0.4)", letterSpacing: "-0.04em", lineHeight: 0.9 }}>
            most systems still can&apos;t process.
          </div>
        </div>

        <p style={{
          marginTop: 32, maxWidth: 520, fontSize: 17, color: "rgba(226,246,213,0.6)",
          fontWeight: 600, lineHeight: 1.7,
        }}>
          We&apos;re raising $3M. If you want to see the product, talk through the wedge, or pressure-test the business model — let&apos;s talk.
        </p>

        {/* CTA buttons */}
        <div style={{ display: "flex", gap: 14, justifyContent: "center", marginTop: 48 }}>
          <button style={{
            background: C.mint, color: C.evergreen, height: 54, padding: "0 36px",
            borderRadius: 999, fontSize: 16, fontWeight: 800, border: "none", cursor: "pointer",
          }}>
            Schedule a call
          </button>
          <button style={{
            background: "transparent", color: C.mint, height: 54, padding: "0 36px",
            borderRadius: 999, fontSize: 15, fontWeight: 700,
            border: "1.5px solid rgba(226,246,213,0.25)", cursor: "pointer",
          }}>
            hello@churchpay.com
          </button>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        position: "absolute", bottom: 40, left: 0, right: 0,
        display: "flex", justifyContent: "center", gap: 32,
      }}>
        <span style={{ color: C.mint, opacity: 0.35, fontSize: 13 }}>Olayinka Akinhanmi · Obiaka Emeka</span>
        <span style={{ color: C.mint, opacity: 0.15 }}>·</span>
        <span style={{ color: C.mint, opacity: 0.35, fontSize: 13 }}>hello@churchpay.com</span>
      </div>
    </>
  );
}

// ─── NAV BAR ──────────────────────────────────────────────────────────────────
function NavBar({
  current, total, onPrev, onNext,
}: {
  current: number; total: number; onPrev: () => void; onNext: () => void;
}) {
  const isDark = SLIDES[current].dark;
  const bg = isDark ? "rgba(14,15,12,0.9)" : "rgba(251,251,249,0.95)";
  const titleColor = isDark ? C.mint : C.dark;
  const mutedColor = isDark ? "rgba(226,246,213,0.35)" : C.muted;
  const activeDot = isDark ? C.mint : C.evergreen;
  const inactiveDot = isDark ? "rgba(226,246,213,0.2)" : "rgba(14,15,12,0.15)";
  const border = isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(14,15,12,0.08)";
  const btnBg = isDark ? "rgba(226,246,213,0.08)" : "rgba(14,15,12,0.06)";
  const btnColor = isDark ? C.mint : C.dark;

  return (
    <div style={{
      position: "fixed", bottom: 0, left: 0, right: 0, height: 64,
      background: bg, backdropFilter: "blur(12px)", borderTop: border,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 32px", zIndex: 100,
    }}>
      {/* Left: slide title */}
      <span style={{ fontSize: 13, fontWeight: 600, color: titleColor, minWidth: 160 }}>
        {SLIDES[current].title}
      </span>

      {/* Center: dots + counter */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          {SLIDES.map((_, i) => (
            <div
              key={i}
              style={{
                width: i === current ? 10 : 5,
                height: i === current ? 10 : 5,
                borderRadius: "50%",
                background: i === current ? activeDot : inactiveDot,
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </div>
        <span style={{ fontSize: 11, color: mutedColor, fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>
          {current + 1} / {total}
        </span>
      </div>

      {/* Right: prev/next */}
      <div style={{ display: "flex", gap: 8, minWidth: 160, justifyContent: "flex-end" }}>
        <button
          onClick={onPrev}
          disabled={current === 0}
          style={{
            width: 32, height: 32, borderRadius: 999, border: "none",
            background: btnBg, color: btnColor, cursor: current === 0 ? "not-allowed" : "pointer",
            opacity: current === 0 ? 0.3 : 1, fontSize: 16,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          ←
        </button>
        <button
          onClick={onNext}
          disabled={current === total - 1}
          style={{
            width: 32, height: 32, borderRadius: 999, border: "none",
            background: btnBg, color: btnColor, cursor: current === total - 1 ? "not-allowed" : "pointer",
            opacity: current === total - 1 ? 0.3 : 1, fontSize: 16,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          →
        </button>
      </div>
    </div>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function PitchPage() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        setCurrent((c) => {
          if (c < SLIDES.length - 1) { setDirection(1); return c + 1; }
          return c;
        });
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        setCurrent((c) => {
          if (c > 0) { setDirection(-1); return c - 1; }
          return c;
        });
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  function goNext() {
    if (current < SLIDES.length - 1) { setDirection(1); setCurrent(current + 1); }
  }
  function goPrev() {
    if (current > 0) { setDirection(-1); setCurrent(current - 1); }
  }

  const slideComponents = [
    <Slide1 key={1} />,
    <Slide2 key={2} />,
    <Slide3 key={3} />,
    <Slide4 key={4} />,
    <Slide5 key={5} />,
    <Slide6 key={6} />,
    <Slide7 key={7} />,
    <Slide8 key={8} />,
    <Slide9 key={9} />,
    <Slide10 key={10} />,
    <Slide11 key={11} />,
    <Slide12 key={12} />,
    <Slide13 key={13} />,
    <Slide14 key={14} />,
    <Slide15 key={15} />,
    <Slide16 key={16} />,
  ];

  const bgColors = [
    C.evergreen, C.canvas, C.dark, C.canvas, C.canvas, C.dark,
    C.canvas, C.evergreen, C.canvas, C.dark, C.canvas, C.evergreen,
    C.canvas, C.dark, C.canvas, C.evergreen,
  ];

  return (
    <div style={{
      position: "relative", width: "100vw", height: "100vh",
      overflow: "hidden", fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    }}>
      {slideComponents.map((slide, i) => (
        <Slide
          key={i}
          active={i === current}
          direction={i < current ? -1 : direction}
          bg={bgColors[i]}
        >
          {slide}
        </Slide>
      ))}

      <NavBar
        current={current}
        total={SLIDES.length}
        onPrev={goPrev}
        onNext={goNext}
      />
    </div>
  );
}
