"use client";

import { useState, useEffect, useCallback } from "react";

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
};

// ─── Slide metadata ───────────────────────────────────────────────────────────
const SLIDES = [
  { id: 1,  title: "Title",              dark: true  },
  { id: 2,  title: "Who We Are",         dark: false },
  { id: 3,  title: "The Problem",        dark: true  },
  { id: 4,  title: "Current Solutions",  dark: false },
  { id: 5,  title: "What If",            dark: true  },
  { id: 6,  title: "Our Solution",       dark: false },
  { id: 7,  title: "Vision",             dark: true  },
  { id: 8,  title: "Traction",           dark: false },
  { id: 9,  title: "Why We Win",         dark: true  },
  { id: 10, title: "Tailwinds",          dark: false },
  { id: 11, title: "Timing",             dark: true  },
  { id: 12, title: "Founder-Market Fit", dark: false },
  { id: 13, title: "The Ask",            dark: true  },
  { id: 14, title: "Proof Point",        dark: false },
  { id: 15, title: "Call to Action",     dark: true  },
];

// ─── Reusable graphic components ─────────────────────────────────────────────

function GlobeGraphic({ size = 280, opacity = 1 }: { size?: number; opacity?: number }) {
  const s = size;
  const center = s / 2;
  return (
    <div style={{ width: s, height: s, position: "relative", opacity, flexShrink: 0 }}>
      {/* Outer circle */}
      <div style={{
        position: "absolute", inset: 0, borderRadius: "50%",
        border: `2px solid rgba(226,246,213,0.3)`,
      }} />
      {/* Horizontal ellipses — latitude lines */}
      {[
        { top: "20%", width: "60%", height: "12%", left: "20%" },
        { top: "43%", width: "96%", height: "14%", left: "2%" },
        { top: "68%", width: "70%", height: "12%", left: "15%" },
      ].map((style, i) => (
        <div key={i} style={{
          position: "absolute",
          top: style.top, left: style.left,
          width: style.width, height: style.height,
          border: "1.5px solid rgba(226,246,213,0.2)",
          borderRadius: "50%",
        }} />
      ))}
      {/* Diagonal ellipses — longitude arcs */}
      {[30, -30].map((deg, i) => (
        <div key={i} style={{
          position: "absolute",
          top: "5%", left: "35%",
          width: "30%", height: "90%",
          border: "1.5px solid rgba(226,246,213,0.2)",
          borderRadius: "50%",
          transform: `rotate(${deg}deg)`,
          transformOrigin: "center center",
        }} />
      ))}
      {/* Church location dots */}
      {[
        { top: "22%", left: "38%" },
        { top: "35%", left: "62%" },
        { top: "55%", left: "28%" },
        { top: "60%", left: "55%" },
        { top: "42%", left: "78%" },
      ].map((pos, i) => (
        <div key={i} style={{
          position: "absolute",
          top: pos.top, left: pos.left,
          width: 6, height: 6,
          borderRadius: "50%",
          background: `rgba(226,246,213,0.8)`,
          transform: "translate(-50%,-50%)",
        }} />
      ))}
      {/* Dotted connecting lines (SVG) */}
      <svg
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        viewBox={`0 0 ${s} ${s}`}
      >
        <line
          x1={s * 0.38} y1={s * 0.22}
          x2={s * 0.62} y2={s * 0.35}
          stroke="rgba(226,246,213,0.3)" strokeWidth="1"
          strokeDasharray="3 4"
        />
        <line
          x1={s * 0.62} y1={s * 0.35}
          x2={s * 0.55} y2={s * 0.6}
          stroke="rgba(226,246,213,0.3)" strokeWidth="1"
          strokeDasharray="3 4"
        />
        <line
          x1={s * 0.28} y1={s * 0.55}
          x2={s * 0.55} y2={s * 0.6}
          stroke="rgba(226,246,213,0.3)" strokeWidth="1"
          strokeDasharray="3 4"
        />
      </svg>
    </div>
  );
}

function NetworkDots({ rows = 5, cols = 5, opacity = 0.15 }: { rows?: number; cols?: number; opacity?: number }) {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: `repeat(${cols}, 24px)`,
      gap: 16,
      opacity,
    }}>
      {Array.from({ length: rows * cols }).map((_, i) => (
        <div key={i} style={{
          width: 6, height: 6, borderRadius: "50%",
          background: C.mint,
        }} />
      ))}
    </div>
  );
}

function BigStat({ value, color = C.evergreen }: { value: string; color?: string }) {
  return (
    <div style={{
      fontFamily: "var(--font-geist-sans)",
      fontSize: "clamp(80px,10vw,140px)",
      fontWeight: 900,
      color,
      lineHeight: 0.9,
      letterSpacing: "-0.04em",
      fontVariantNumeric: "tabular-nums",
    }}>
      {value}
    </div>
  );
}

function DiamondShape({ size = 60, color = C.mint }: { size?: number; color?: string }) {
  return (
    <div style={{
      width: size, height: size,
      background: color,
      transform: "rotate(45deg)",
      borderRadius: 4,
      flexShrink: 0,
    }} />
  );
}

// ─── Slide 1 — TITLE ──────────────────────────────────────────────────────────
function Slide01() {
  return (
    <div style={{ width: "100%", height: "100vh", background: C.evergreen, display: "flex", overflow: "hidden" }}>
      {/* Left zone */}
      <div style={{
        width: "55%", height: "100vh", padding: 80,
        display: "flex", flexDirection: "column", justifyContent: "space-between",
      }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            width: 36, height: 36, borderRadius: "50%", background: C.mint,
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4 12L12 4M12 4H6M12 4V10" stroke={C.evergreen} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span style={{ fontFamily: "var(--font-geist-sans)", fontWeight: 800, fontSize: 17, color: C.mint, letterSpacing: "-0.02em" }}>
            ChurchPay
          </span>
        </div>

        {/* Middle */}
        <div>
          <div style={{
            fontFamily: "var(--font-geist-sans)", fontSize: 11, fontWeight: 700,
            color: C.mint, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 24,
          }}>
            Pre-seed · 2025
          </div>
          <h1 style={{
            fontFamily: "var(--font-geist-sans)",
            fontWeight: 900,
            fontSize: "clamp(72px,11vw,130px)",
            color: C.mint,
            lineHeight: 0.88,
            letterSpacing: "-0.04em",
            margin: 0,
          }}>
            CHURCH<br />
            <span style={{ color: C.celebrate }}>PAY</span>
          </h1>
          <div style={{
            fontFamily: "var(--font-geist-sans)", fontSize: 18, fontWeight: 600,
            color: `rgba(226,246,213,0.75)`, marginTop: 24, letterSpacing: "-0.01em",
          }}>
            Financial infrastructure for the global church
          </div>
          <div style={{
            fontFamily: "var(--font-geist-sans)", fontSize: 15, fontWeight: 600,
            color: `rgba(226,246,213,0.5)`, marginTop: 8,
          }}>
            Cross-border giving, settlement, and reconciliation
          </div>
        </div>

        {/* Bottom */}
        <div style={{
          fontFamily: "var(--font-geist-sans)", fontSize: 13, fontWeight: 600,
          color: `rgba(226,246,213,0.5)`,
        }}>
          Olayinka Akinhanmi · Obiaka&nbsp;&nbsp;|&nbsp;&nbsp;hello@churchpay.com
        </div>
      </div>

      {/* Right zone */}
      <div style={{
        width: "45%", height: "100vh",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        position: "relative", overflow: "hidden", padding: 48,
      }}>
        {/* Radial glow */}
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(226,246,213,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        <GlobeGraphic size={280} />

        {/* Currency chips */}
        {[
          { label: "₦ NGN", top: "22%", left: "4%" },
          { label: "£ GBP", top: "18%", right: "8%" },
          { label: "KSh KES", bottom: "30%", left: "2%" },
          { label: "$ USD", bottom: "28%", right: "6%" },
        ].map(({ label, ...pos }) => (
          <div key={label} style={{
            position: "absolute",
            ...pos,
            background: C.mint,
            color: C.evergreen,
            fontFamily: "var(--font-geist-sans)",
            fontWeight: 700,
            fontSize: 12,
            borderRadius: 999,
            padding: "6px 12px",
            whiteSpace: "nowrap",
          }}>
            {label}
          </div>
        ))}

        {/* Thin divider */}
        <div style={{
          position: "absolute", bottom: "18%", left: 0, right: 0,
          height: 1, background: `rgba(226,246,213,0.15)`,
        }} />

        {/* Slide label */}
        <div style={{
          position: "absolute", bottom: "12%", right: 32,
          fontFamily: "var(--font-geist-sans)", fontSize: 11, fontWeight: 600,
          color: `rgba(226,246,213,0.3)`, letterSpacing: "0.08em",
        }}>
          Slide 01
        </div>
      </div>
    </div>
  );
}

// ─── Slide 2 — WHO WE ARE ─────────────────────────────────────────────────────
function Slide02() {
  return (
    <div style={{ width: "100%", height: "100vh", background: C.canvas, display: "flex", overflow: "hidden" }}>
      {/* Left narrow bar */}
      <div style={{
        width: 200, flexShrink: 0, background: C.evergreen,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <div style={{
          fontFamily: "var(--font-geist-sans)", fontSize: 11, fontWeight: 700,
          color: C.mint, letterSpacing: "0.12em", textTransform: "uppercase",
          transform: "rotate(-90deg)", whiteSpace: "nowrap",
        }}>
          WHO WE ARE
        </div>
      </div>

      {/* Right content */}
      <div style={{
        flex: 1, padding: "64px 64px 64px 48px",
        display: "flex", flexDirection: "column", justifyContent: "center",
        overflow: "hidden",
      }}>
        <h2 style={{
          fontFamily: "var(--font-geist-sans)", fontWeight: 900,
          fontSize: "clamp(36px,5vw,60px)",
          letterSpacing: "-0.03em", color: C.dark,
          lineHeight: 0.95, maxWidth: 600, margin: 0,
        }}>
          We have lived this problem.
        </h2>

        {/* Founder cards */}
        <div style={{ display: "flex", flexDirection: "row", gap: 28, marginTop: 48 }}>
          {/* Olayinka */}
          <div style={{
            flex: 1, background: "#fff",
            border: "1px solid rgba(14,15,12,0.1)",
            borderRadius: 24, padding: 36,
            position: "relative", overflow: "hidden",
          }}>
            <div style={{
              position: "absolute", top: 0, left: 0, right: 0, height: 4,
              background: `linear-gradient(90deg, ${C.evergreen}, ${C.mint})`,
              borderRadius: "4px 4px 0 0",
            }} />
            <img src="/ola.jpg" alt="Olayinka Akinhanmi" style={{
              width: 88, height: 88, borderRadius: "50%", objectFit: "cover",
              objectPosition: "center top", display: "block",
            }} />
            <div style={{ fontFamily: "var(--font-geist-sans)", fontWeight: 800, fontSize: 17, color: C.dark, marginTop: 16 }}>
              Olayinka Akinhanmi
            </div>
            <div style={{
              display: "inline-block", marginTop: 8,
              background: C.mint, color: C.evergreen,
              borderRadius: 999, padding: "4px 10px",
              fontFamily: "var(--font-geist-sans)", fontSize: 11, fontWeight: 800,
            }}>
              Co-founder &amp; CEO
            </div>
            <p style={{
              fontFamily: "var(--font-geist-sans)", fontSize: 14, fontWeight: 600,
              color: C.secondary, lineHeight: 1.65, marginTop: 14, marginBottom: 0,
            }}>
              Founding PM and engineer of KingsPay — built and scaled the payment system for a 2M-member global church. Multi-time founder. 10+ years in high-compliance fintech.
            </p>
            <div style={{
              fontFamily: "var(--font-geist-sans)", fontSize: 11, fontWeight: 700,
              color: C.muted, marginTop: 16,
            }}>
              KingsPay · Nerditt
            </div>
          </div>

          {/* Obiaka */}
          <div style={{
            flex: 1, background: "#fff",
            border: "1px solid rgba(14,15,12,0.1)",
            borderRadius: 24, padding: 36,
            position: "relative", overflow: "hidden",
          }}>
            <div style={{
              position: "absolute", top: 0, left: 0, right: 0, height: 4,
              background: `linear-gradient(90deg, ${C.dark}, ${C.secondary})`,
              borderRadius: "4px 4px 0 0",
            }} />
            <img src="/obi.jpeg" alt="Obiaka" style={{
              width: 88, height: 88, borderRadius: "50%", objectFit: "cover",
              objectPosition: "center top", display: "block",
            }} />
            <div style={{ fontFamily: "var(--font-geist-sans)", fontWeight: 800, fontSize: 17, color: C.dark, marginTop: 16 }}>
              Obiaka
            </div>
            <div style={{
              display: "inline-block", marginTop: 8,
              background: C.dark, color: C.mint,
              borderRadius: 999, padding: "4px 10px",
              fontFamily: "var(--font-geist-sans)", fontSize: 11, fontWeight: 800,
            }}>
              Co-founder &amp; Liquidity / Risk
            </div>
            <p style={{
              fontFamily: "var(--font-geist-sans)", fontSize: 14, fontWeight: 600,
              color: C.secondary, lineHeight: 1.65, marginTop: 14, marginBottom: 0,
            }}>
              14 years at Goldman Sachs — VP and Portfolio Manager on the Emerging Markets Debt desk, Global Chief of Staff for Market Risk. Founder, Voltech Capital LP.
            </p>
            <div style={{
              fontFamily: "var(--font-geist-sans)", fontSize: 11, fontWeight: 700,
              color: C.muted, marginTop: 16,
            }}>
              Goldman Sachs · Voltech Capital
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Slide 3 — THE PROBLEM ────────────────────────────────────────────────────
function Slide03() {
  return (
    <div style={{
      width: "100%", height: "100vh", background: C.dark,
      display: "flex", alignItems: "center", justifyContent: "center",
      overflow: "hidden", position: "relative",
    }}>
      {/* NetworkDots texture top-right */}
      <div style={{ position: "absolute", top: 40, right: 40 }}>
        <NetworkDots rows={5} cols={5} opacity={0.15} />
      </div>

      {/* Decorative ? */}
      <div style={{
        position: "absolute", bottom: -40, right: 40,
        fontFamily: "var(--font-geist-sans)", fontSize: 280, fontWeight: 900,
        color: "rgba(255,255,255,0.02)", lineHeight: 1, userSelect: "none",
        pointerEvents: "none",
      }}>
        ?
      </div>

      <div style={{ maxWidth: 900, margin: "auto", padding: "80px 64px", width: "100%" }}>
        <div style={{
          fontFamily: "var(--font-geist-sans)", fontSize: 11, fontWeight: 800,
          color: C.celebrate, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 20,
        }}>
          THE PROBLEM
        </div>

        <div style={{ fontFamily: "var(--font-geist-sans)", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 0.9 }}>
          <div style={{ fontSize: "clamp(40px,6vw,72px)", color: C.mint }}>The church went</div>
          <div style={{ fontSize: "clamp(40px,6vw,72px)", color: C.mint }}>global.</div>
          <div style={{ fontSize: "clamp(40px,6vw,72px)", color: "rgba(226,246,213,0.4)", marginTop: 8 }}>The payment stack</div>
          <div style={{ fontSize: "clamp(40px,6vw,72px)", color: "rgba(226,246,213,0.4)" }}>did not.</div>
        </div>

        <p style={{
          fontFamily: "var(--font-geist-sans)", fontSize: 17, fontWeight: 600,
          color: "rgba(251,251,249,0.6)", lineHeight: 1.7,
          maxWidth: 640, marginTop: 48, marginBottom: 0,
        }}>
          Millions of people now watch and give across borders, yet most churches still cannot accept and reconcile international donations cleanly.
        </p>
      </div>
    </div>
  );
}

// ─── Slide 4 — CURRENT SOLUTIONS ─────────────────────────────────────────────
function Slide04() {
  const cards = [
    {
      label: "Bank wires",
      issues: ["3–5 business days", "6–13% in fees", "No donor attribution", "Requires bank details"],
    },
    {
      label: "Domestic processors",
      issues: ["Stop at the border", "Single currency only", "No FX handling", "Partial data"],
    },
    {
      label: "General processors",
      issues: ["Faith org restrictions", "Attribution loss", "FX fees hidden", "No reconciliation"],
    },
  ];

  return (
    <div style={{
      width: "100%", height: "100vh", background: C.canvas,
      display: "flex", flexDirection: "column", justifyContent: "center",
      padding: "80px 72px", overflow: "hidden",
    }}>
      <div style={{
        fontFamily: "var(--font-geist-sans)", fontSize: 11, fontWeight: 800,
        color: C.muted, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16,
      }}>
        TODAY&rsquo;S OPTIONS BREAK DOWN FAST
      </div>
      <h2 style={{
        fontFamily: "var(--font-geist-sans)", fontWeight: 800,
        fontSize: "clamp(28px,4vw,48px)",
        letterSpacing: "-0.03em", color: C.dark, margin: 0,
      }}>
        Every workaround has a fatal flaw.
      </h2>

      <div style={{ display: "flex", flexDirection: "row", gap: 20, marginTop: 48 }}>
        {cards.map((card) => (
          <div key={card.label} style={{
            flex: 1, background: "#fff",
            border: "1px solid rgba(14,15,12,0.1)",
            borderRadius: 20, padding: 32,
          }}>
            <div style={{
              width: 40, height: 40, borderRadius: "50%",
              background: "#FFF0F0",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 20, color: "#D03238", fontWeight: 900,
            }}>
              ✕
            </div>
            <div style={{
              fontFamily: "var(--font-geist-sans)", fontWeight: 800, fontSize: 18,
              color: C.dark, marginTop: 16,
            }}>
              {card.label}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 12 }}>
              {card.issues.map((issue) => (
                <div key={issue} style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#D03238", flexShrink: 0 }} />
                  <span style={{
                    fontFamily: "var(--font-geist-sans)", fontSize: 14, fontWeight: 600,
                    color: C.secondary,
                  }}>
                    {issue}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Callout */}
      <div style={{
        marginTop: 48,
        borderLeft: `4px solid ${C.evergreen}`,
        paddingLeft: 24, paddingTop: 16, paddingBottom: 16,
      }}>
        <p style={{
          fontFamily: "var(--font-geist-sans)", fontSize: 16, fontWeight: 700,
          color: C.dark, lineHeight: 1.5, margin: 0, maxWidth: 800,
        }}>
          The gap is not a feature gap. It is a fundamental architectural gap — no existing system was built for cross-border faith giving.
        </p>
      </div>
    </div>
  );
}

// ─── Slide 5 — WHAT IF ────────────────────────────────────────────────────────
function Slide05() {
  return (
    <div style={{
      width: "100%", height: "100vh", background: C.evergreen,
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      overflow: "hidden", position: "relative",
    }}>
      {/* Radial glow */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(226,246,213,0.06) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{
        display: "flex", flexDirection: "column", alignItems: "center",
        justifyContent: "center", textAlign: "center", padding: 80, width: "100%",
      }}>
        <div style={{
          fontFamily: "var(--font-geist-sans)", fontSize: 11, fontWeight: 700,
          color: `rgba(226,246,213,0.5)`, letterSpacing: "0.2em", textTransform: "uppercase",
          marginBottom: 28,
        }}>
          THE QUESTION
        </div>

        <div style={{ fontFamily: "var(--font-geist-sans)", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1.05 }}>
          <div style={{ fontSize: "clamp(32px,5vw,64px)", color: C.mint }}>What if a giver</div>
          <div style={{ fontSize: "clamp(32px,5vw,64px)", color: C.celebrate }}>in Lagos</div>
          <div style={{ fontSize: "clamp(32px,5vw,64px)", color: "rgba(226,246,213,0.7)" }}>could donate in naira,</div>
          <div style={{ fontSize: "clamp(32px,5vw,64px)", color: "rgba(226,246,213,0.7)" }}>and the church in Texas</div>
          <div style={{ fontSize: "clamp(32px,5vw,64px)", color: C.mint }}>received settled dollars</div>
          <div style={{ fontSize: "clamp(32px,5vw,64px)", color: C.celebrate }}>in seconds?</div>
        </div>

        <div style={{
          fontFamily: "var(--font-geist-sans)", fontSize: 16, fontWeight: 600,
          color: `rgba(226,246,213,0.6)`, marginTop: 40,
        }}>
          With full attribution. Zero friction. No bank account required.
        </div>

        {/* Flow illustration */}
        <div style={{
          display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center",
          gap: 12, marginTop: 56,
        }}>
          <div style={{
            background: `rgba(226,246,213,0.12)`, border: `1px solid rgba(226,246,213,0.2)`,
            borderRadius: 999, padding: "8px 16px",
            fontFamily: "var(--font-geist-sans)", fontWeight: 700, fontSize: 13, color: C.mint,
          }}>
            🇳🇬 Lagos
          </div>
          <div style={{
            display: "flex", alignItems: "center", gap: 4,
            fontFamily: "var(--font-geist-sans)", fontWeight: 900, fontSize: 22,
          }}>
            <span style={{ color: C.mint, opacity: 0.8 }}>₦</span>
            <span style={{
              display: "block", width: 60, height: 2,
              background: `linear-gradient(90deg, ${C.evergreenMid}, ${C.mint})`,
              borderRadius: 2,
            }} />
            <span style={{ color: C.celebrate, opacity: 0.9 }}>$</span>
          </div>
          <div style={{
            background: `rgba(226,246,213,0.12)`, border: `1px solid rgba(226,246,213,0.2)`,
            borderRadius: 999, padding: "8px 16px",
            fontFamily: "var(--font-geist-sans)", fontWeight: 700, fontSize: 13, color: C.celebrate,
          }}>
            🇺🇸 Texas
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Slide 6 — OUR SOLUTION ───────────────────────────────────────────────────
function Slide06() {
  const features = [
    { icon: "🌍", title: "Borderless checkout", sub: "Give in 30+ currencies" },
    { icon: "⚡", title: "Instant settlement", sub: "Funds land in seconds" },
    { icon: "📊", title: "Auto-reconciliation", sub: "Audit-ready from day one" },
    { icon: "💳", title: "Ministry cards", sub: "Spend directly from balance" },
  ];

  const givers = [
    { flag: "🇳🇬", name: "Adaeze", local: "₦25,000", usd: "$16" },
    { flag: "🇬🇧", name: "Marcus", local: "£200", usd: "$254" },
    { flag: "🇰🇪", name: "Sarah", local: "KES 8,000", usd: "$62" },
    { flag: "🇺🇸", name: "James", local: "$100", usd: "$100" },
  ];

  return (
    <div style={{ width: "100%", height: "100vh", background: C.canvas, display: "flex", overflow: "hidden" }}>
      {/* Left */}
      <div style={{
        width: "55%", padding: "80px 48px 80px 80px",
        display: "flex", flexDirection: "column", justifyContent: "center",
      }}>
        <div style={{
          fontFamily: "var(--font-geist-sans)", fontSize: 11, fontWeight: 800,
          color: C.muted, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16,
        }}>
          OUR SOLUTION
        </div>
        <h2 style={{
          fontFamily: "var(--font-geist-sans)", fontWeight: 900,
          fontSize: "clamp(32px,4.5vw,58px)",
          letterSpacing: "-0.03em", lineHeight: 0.95,
          color: C.dark, margin: 0,
        }}>
          Any giver. Any country. Any currency.
        </h2>
        <p style={{
          fontFamily: "var(--font-geist-sans)", fontSize: 16, fontWeight: 600,
          color: C.secondary, lineHeight: 1.65, marginTop: 20, maxWidth: 420,
        }}>
          ChurchPay lets any giver, in any country, give in their local currency. Borderless checkout. Instant settlement. One operating account for reconciliation, treasury, cards, and multi-currency visibility.
        </p>

        {/* Feature grid */}
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr",
          gap: 16, marginTop: 40,
        }}>
          {features.map((f) => (
            <div key={f.title} style={{
              background: "#fff", borderRadius: 14,
              border: "1px solid rgba(14,15,12,0.1)", padding: 20,
            }}>
              <div style={{ fontSize: 22 }}>{f.icon}</div>
              <div style={{
                fontFamily: "var(--font-geist-sans)", fontWeight: 800, fontSize: 14,
                color: C.dark, marginTop: 8,
              }}>
                {f.title}
              </div>
              <div style={{
                fontFamily: "var(--font-geist-sans)", fontSize: 12, fontWeight: 600,
                color: C.muted, marginTop: 4,
              }}>
                {f.sub}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right */}
      <div style={{
        width: "45%", background: C.evergreen,
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        padding: 48,
      }}>
        {/* Phone mockup */}
        <div style={{
          width: 300, background: C.canvas, borderRadius: 32,
          border: "6px solid rgba(255,255,255,0.12)", padding: 24,
          boxShadow: "0 32px 64px rgba(0,0,0,0.3)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{
              width: 20, height: 20, borderRadius: "50%", background: C.evergreen,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M2.5 7.5L7.5 2.5M7.5 2.5H4M7.5 2.5V6" stroke={C.mint} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span style={{
              fontFamily: "var(--font-geist-sans)", fontWeight: 800, fontSize: 15, color: C.dark,
            }}>Today&rsquo;s giving</span>
          </div>
          <div style={{
            fontFamily: "var(--font-geist-sans)", fontSize: 12, fontWeight: 700,
            color: C.evergreen, marginTop: 4, fontVariantNumeric: "tabular-nums",
          }}>
            from 14 countries · $4,820
          </div>
          <div style={{ height: 1, background: "rgba(14,15,12,0.08)", margin: "12px 0" }} />
          {givers.map((g, i) => (
            <div key={g.name}>
              <div style={{
                display: "flex", alignItems: "center", gap: 10,
                paddingTop: 10, paddingBottom: 10,
              }}>
                <div style={{
                  width: 32, height: 32, borderRadius: "50%",
                  background: "rgba(22,51,0,0.08)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 16, flexShrink: 0,
                }}>
                  {g.flag}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontFamily: "var(--font-geist-sans)", fontWeight: 700, fontSize: 13, color: C.dark,
                  }}>
                    {g.name}
                  </div>
                  <div style={{
                    fontFamily: "var(--font-geist-sans)", fontSize: 11, fontWeight: 600,
                    color: C.muted, fontVariantNumeric: "tabular-nums",
                  }}>
                    {g.local}
                  </div>
                </div>
                <div style={{
                  fontFamily: "var(--font-geist-sans)", fontWeight: 700, fontSize: 13,
                  color: C.evergreen, fontVariantNumeric: "tabular-nums",
                }}>
                  {g.usd}
                </div>
              </div>
              {i < givers.length - 1 && (
                <div style={{ height: 1, background: "rgba(14,15,12,0.06)" }} />
              )}
            </div>
          ))}
        </div>
        <div style={{
          fontFamily: "var(--font-geist-sans)", fontSize: 12, fontWeight: 700,
          color: C.mint, marginTop: 20, textAlign: "center",
        }}>
          Live giving feed
        </div>
      </div>
    </div>
  );
}

// ─── Slide 7 — VISION ─────────────────────────────────────────────────────────
function Slide07() {
  const pillars = [
    { dot: C.mint, title: "Giving", sub: "Any giver, any country" },
    { dot: C.celebrate, title: "Treasury", sub: "Hold, earn, and deploy funds" },
    { dot: C.mint, title: "Operations", sub: "Cards, payroll, and transfers" },
  ];

  return (
    <div style={{
      width: "100%", height: "100vh", background: C.dark,
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      overflow: "hidden", position: "relative",
    }}>
      {/* NetworkDots */}
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <NetworkDots rows={8} cols={12} opacity={0.08} />
      </div>
      {/* Glow */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(22,51,0,0.4) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{
        display: "flex", flexDirection: "column", alignItems: "center",
        textAlign: "center", padding: 80, zIndex: 1,
      }}>
        <div style={{
          fontFamily: "var(--font-geist-sans)", fontSize: 11, fontWeight: 800,
          color: C.celebrate, letterSpacing: "0.2em", textTransform: "uppercase",
        }}>
          OUR VISION
        </div>

        <div style={{ marginTop: 16 }}>
          <div style={{
            fontFamily: "var(--font-geist-sans)", fontWeight: 900,
            fontSize: "clamp(36px,6vw,76px)",
            color: C.canvas, letterSpacing: "-0.04em", lineHeight: 0.88,
          }}>
            The financial backbone
          </div>
          <div style={{
            fontFamily: "var(--font-geist-sans)", fontWeight: 900,
            fontSize: "clamp(36px,6vw,76px)",
            color: C.mint, letterSpacing: "-0.04em", lineHeight: 0.88,
          }}>
            of the global church.
          </div>
        </div>

        <div style={{
          width: 80, height: 3, background: C.celebrate,
          borderRadius: 9999, margin: "24px auto",
        }} />

        <p style={{
          fontFamily: "var(--font-geist-sans)", fontSize: 17, fontWeight: 600,
          color: "rgba(251,251,249,0.6)", lineHeight: 1.7,
          maxWidth: 560, marginBottom: 0,
        }}>
          We are building the rails for donations, treasury, and reconciliation across borders. Every church. Every currency. Every Sunday.
        </p>

        {/* Pillars */}
        <div style={{ display: "flex", flexDirection: "row", gap: 24, marginTop: 56, textAlign: "left" }}>
          {pillars.map((p) => (
            <div key={p.title} style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 16, padding: 24, minWidth: 180,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: p.dot, flexShrink: 0 }} />
                <div style={{
                  fontFamily: "var(--font-geist-sans)", fontWeight: 800, fontSize: 16, color: C.canvas,
                }}>
                  {p.title}
                </div>
              </div>
              <div style={{
                fontFamily: "var(--font-geist-sans)", fontSize: 13, fontWeight: 600,
                color: "rgba(251,251,249,0.5)",
              }}>
                {p.sub}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Slide 8 — TRACTION ───────────────────────────────────────────────────────
function Slide08() {
  return (
    <div style={{
      width: "100%", height: "100vh", background: C.canvas,
      display: "flex", flexDirection: "column", justifyContent: "center",
      padding: "80px 72px", overflow: "hidden",
    }}>
      <div style={{
        fontFamily: "var(--font-geist-sans)", fontSize: 11, fontWeight: 800,
        color: C.muted, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16,
      }}>
        TRACTION
      </div>
      <h2 style={{
        fontFamily: "var(--font-geist-sans)", fontWeight: 900,
        fontSize: "clamp(36px,5vw,64px)",
        letterSpacing: "-0.03em", color: C.dark, margin: 0,
      }}>
        This is already real.
      </h2>

      <div style={{ display: "flex", flexDirection: "row", marginTop: 56, gap: 0 }}>
        {[
          { value: "2M", label: "members on KingsPay, Olayinka's previous payment system" },
          { value: "6–10", label: "signed LOIs before a single cold call" },
          { value: "Live", label: "end-to-end prototype running today", italic: true },
          { value: "8", label: "target markets with active conversion underway" },
        ].map((stat, i) => (
          <div key={stat.value} style={{
            flex: 1,
            borderRight: i < 3 ? "1px solid rgba(14,15,12,0.08)" : "none",
            paddingLeft: i === 0 ? 0 : 40, paddingRight: 40,
            display: "flex", flexDirection: "column", gap: 8,
          }}>
            <div style={{
              fontFamily: "var(--font-geist-sans)",
              fontSize: "clamp(56px,7vw,100px)",
              fontWeight: 900,
              color: C.evergreen,
              lineHeight: 0.9,
              letterSpacing: "-0.04em",
              fontVariantNumeric: "tabular-nums",
              fontStyle: stat.italic ? "italic" : "normal",
            }}>
              {stat.value}
            </div>
            <div style={{
              fontFamily: "var(--font-geist-sans)", fontSize: 13, fontWeight: 600,
              color: C.secondary, lineHeight: 1.5, maxWidth: 180,
            }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Callout */}
      <div style={{
        marginTop: 56, maxWidth: 700,
        background: C.evergreen, borderRadius: 20,
        padding: 32, display: "flex", flexDirection: "row", gap: 20, alignItems: "stretch",
      }}>
        <div style={{ width: 4, background: C.celebrate, borderRadius: 2, flexShrink: 0 }} />
        <p style={{
          fontFamily: "var(--font-geist-sans)", fontSize: 18, fontWeight: 700,
          color: C.mint, lineHeight: 1.5, margin: 0,
        }}>
          We are now converting that intent into active volume.
        </p>
      </div>
    </div>
  );
}

// ─── Slide 9 — WHY WE WIN ─────────────────────────────────────────────────────
function Slide09() {
  const advantages = [
    {
      num: "01",
      title: "Network compounding",
      body: "Each new church adds givers. Each new giver makes the next church easier to land.",
    },
    {
      num: "02",
      title: "Incumbents retrofitting",
      body: "PushPay, Givelify, Tithely — all built for domestic giving. Cross-border is not a roadmap item, it is an architectural rethink.",
    },
    {
      num: "03",
      title: "Founder-market depth",
      body: "One founder lived the customer pain. The other understands how to move money safely at scale. This combination is rare.",
    },
  ];

  return (
    <div style={{
      width: "100%", height: "100vh", background: C.dark,
      display: "flex", flexDirection: "column", justifyContent: "center",
      padding: "80px 72px", overflow: "hidden",
    }}>
      <div style={{
        fontFamily: "var(--font-geist-sans)", fontSize: 11, fontWeight: 800,
        color: C.celebrate, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16,
      }}>
        WHY WE WIN
      </div>
      <h2 style={{
        fontFamily: "var(--font-geist-sans)", fontWeight: 900,
        fontSize: "clamp(32px,5vw,60px)",
        color: C.canvas, letterSpacing: "-0.03em", lineHeight: 0.95, margin: 0,
      }}>
        We were built borderless from day one.
      </h2>

      <div style={{ display: "flex", flexDirection: "row", gap: 64, marginTop: 56 }}>
        {/* Left — advantage list */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          {advantages.map((a, i) => (
            <div key={a.num} style={{
              display: "flex", flexDirection: "row",
              paddingTop: 28, paddingBottom: 28, gap: 24,
              borderBottom: i < advantages.length - 1 ? "1px solid rgba(255,255,255,0.07)" : "none",
            }}>
              <div style={{
                fontFamily: "var(--font-geist-sans)", fontSize: 40, fontWeight: 900,
                color: "rgba(226,246,213,0.15)", fontVariantNumeric: "tabular-nums",
                minWidth: 60, lineHeight: 1, flexShrink: 0,
              }}>
                {a.num}
              </div>
              <div>
                <div style={{
                  fontFamily: "var(--font-geist-sans)", fontWeight: 800, fontSize: 18,
                  color: C.canvas, marginBottom: 8,
                }}>
                  {a.title}
                </div>
                <p style={{
                  fontFamily: "var(--font-geist-sans)", fontSize: 14, fontWeight: 600,
                  color: "rgba(251,251,249,0.6)", lineHeight: 1.6, margin: 0,
                }}>
                  {a.body}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Right — moat diagram */}
        <div style={{
          flex: 1, display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", gap: 0,
        }}>
          {/* Box 1 */}
          <div style={{
            background: C.evergreen,
            border: `1.5px solid ${C.mint}`,
            borderRadius: 12, padding: "20px 32px",
            textAlign: "center", width: "100%", maxWidth: 280,
            fontFamily: "var(--font-geist-sans)", fontWeight: 800, fontSize: 15, color: C.mint,
          }}>
            Flagship megachurch
          </div>
          {/* Arrow */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0 }}>
            <div style={{ width: 2, height: 20, background: C.mint, opacity: 0.5 }} />
            <div style={{
              width: 0, height: 0,
              borderLeft: "6px solid transparent",
              borderRight: "6px solid transparent",
              borderTop: `8px solid rgba(226,246,213,0.5)`,
            }} />
          </div>
          {/* Box 2 */}
          <div style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 12, padding: "20px 32px",
            textAlign: "center", width: "100%", maxWidth: 280,
            fontFamily: "var(--font-geist-sans)", fontWeight: 700, fontSize: 14,
            color: "rgba(251,251,249,0.8)",
          }}>
            Denomination network<br />
            <span style={{ fontSize: 12, color: "rgba(251,251,249,0.5)" }}>(200–5,000 churches)</span>
          </div>
          {/* Arrow */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ width: 2, height: 20, background: C.mint, opacity: 0.5 }} />
            <div style={{
              width: 0, height: 0,
              borderLeft: "6px solid transparent",
              borderRight: "6px solid transparent",
              borderTop: `8px solid rgba(226,246,213,0.5)`,
            }} />
          </div>
          {/* Box 3 */}
          <div style={{
            background: C.celebrate,
            borderRadius: 12, padding: "20px 32px",
            textAlign: "center", width: "100%", maxWidth: 280,
            fontFamily: "var(--font-geist-sans)", fontWeight: 800, fontSize: 15, color: C.dark,
          }}>
            Giver network effect
          </div>
          <div style={{
            fontFamily: "var(--font-geist-sans)", fontSize: 11, fontWeight: 600,
            color: C.mint, marginTop: 16, textAlign: "center", opacity: 0.6,
          }}>
            Each layer compounds the next
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Slide 10 — TAILWINDS ─────────────────────────────────────────────────────
function Slide10() {
  return (
    <div style={{
      width: "100%", height: "100vh", background: C.canvas,
      display: "flex", flexDirection: "column", justifyContent: "center",
      padding: "80px 72px", overflow: "hidden",
    }}>
      <div style={{
        fontFamily: "var(--font-geist-sans)", fontSize: 11, fontWeight: 800,
        color: C.muted, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16,
      }}>
        TAILWINDS
      </div>
      <h2 style={{
        fontFamily: "var(--font-geist-sans)", fontWeight: 900,
        fontSize: "clamp(36px,5vw,64px)",
        letterSpacing: "-0.03em", color: C.dark, margin: 0,
      }}>
        The market is ready.
      </h2>

      <div style={{ display: "flex", flexDirection: "row", gap: 20, marginTop: 48, height: "55vh" }}>
        {/* Card 1 */}
        <div style={{
          flex: 1, background: C.evergreen, borderRadius: 24, padding: 40,
          display: "flex", flexDirection: "column", justifyContent: "space-between",
          overflow: "hidden",
        }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <GlobeGraphic size={160} />
          </div>
          <div>
            <div style={{
              fontFamily: "var(--font-geist-sans)", fontWeight: 900, fontSize: 22,
              color: C.mint, marginTop: 24,
            }}>
              The church is global
            </div>
            <p style={{
              fontFamily: "var(--font-geist-sans)", fontSize: 14, fontWeight: 600,
              color: "rgba(226,246,213,0.7)", lineHeight: 1.6, marginTop: 8, marginBottom: 0,
            }}>
              Top services stream to 50–60 countries every Sunday. The audience is borderless.
            </p>
          </div>
        </div>

        {/* Card 2 */}
        <div style={{
          flex: 1, background: C.mint, borderRadius: 24, padding: 40,
          display: "flex", flexDirection: "column", justifyContent: "space-between",
        }}>
          <div>
            <div style={{
              fontFamily: "var(--font-geist-sans)", fontWeight: 900, fontSize: 72,
              color: C.evergreen, lineHeight: 1, fontVariantNumeric: "tabular-nums",
            }}>
              49%
            </div>
            <div style={{
              fontFamily: "var(--font-geist-sans)", fontSize: 13, fontWeight: 700,
              color: C.evergreen, marginTop: 4,
            }}>
              of all US church giving is now by card
            </div>
          </div>
          <p style={{
            fontFamily: "var(--font-geist-sans)", fontSize: 14, fontWeight: 600,
            color: C.secondary, lineHeight: 1.6, marginBottom: 0,
          }}>
            Giving has gone digital and cashless. The behaviour moved online — it just cannot cross a border yet.
          </p>
        </div>

        {/* Card 3 */}
        <div style={{
          flex: 1, background: C.dark, borderRadius: 24, padding: 40,
          display: "flex", flexDirection: "column", justifyContent: "space-between",
        }}>
          <div>
            <div style={{
              fontFamily: "var(--font-geist-sans)", fontWeight: 900, fontSize: 72,
              color: C.celebrate, lineHeight: 1, fontVariantNumeric: "tabular-nums",
            }}>
              $250B+
            </div>
            <div style={{
              fontFamily: "var(--font-geist-sans)", fontSize: 13, fontWeight: 600,
              color: "rgba(251,251,249,0.6)", marginTop: 4,
            }}>
              stablecoin supply — the rails now exist
            </div>
          </div>
          <p style={{
            fontFamily: "var(--font-geist-sans)", fontSize: 14, fontWeight: 600,
            color: "rgba(251,251,249,0.65)", lineHeight: 1.6, marginBottom: 0,
          }}>
            For the first time, any currency in any country can be accepted, converted, settled, and held instantly at sub-cent cost.
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Slide 11 — TIMING ────────────────────────────────────────────────────────
function Slide11() {
  return (
    <div style={{
      width: "100%", height: "100vh", background: C.evergreen,
      display: "flex", flexDirection: "column", justifyContent: "center",
      padding: "80px 72px", overflow: "hidden",
    }}>
      <div style={{
        fontFamily: "var(--font-geist-sans)", fontSize: 11, fontWeight: 800,
        color: C.celebrate, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16,
      }}>
        TIMING
      </div>
      <h2 style={{
        fontFamily: "var(--font-geist-sans)", fontWeight: 900,
        fontSize: "clamp(32px,5vw,58px)",
        color: C.mint, letterSpacing: "-0.03em", lineHeight: 0.95,
        maxWidth: 700, margin: 0,
      }}>
        This is the first real window to solve this.
      </h2>
      <p style={{
        fontFamily: "var(--font-geist-sans)", fontSize: 17, fontWeight: 600,
        color: "rgba(226,246,213,0.7)", lineHeight: 1.7,
        maxWidth: 600, marginTop: 24, marginBottom: 0,
      }}>
        The behavior moved online, and the rails to support it have finally caught up. That creates a rare moment to standardize cross-border giving for faith communities.
      </p>

      {/* Timeline */}
      <div style={{ maxWidth: 800, marginTop: 64, position: "relative" }}>
        {/* Line */}
        <div style={{
          position: "absolute", top: 7, left: 0, right: 0, height: 2,
          background: `rgba(226,246,213,0.3)`,
        }} />
        {/* Celebrate segment: node2 to node3 */}
        <div style={{
          position: "absolute", top: 7, left: "calc(50% + 8px)", right: 0, height: 2,
          background: `rgba(255,192,145,0.6)`,
        }} />

        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
          {[
            { year: "2015", label: "Giving goes digital", highlight: false },
            { year: "2022", label: "Stablecoins reach scale", highlight: false },
            { year: "2025", label: "THE WINDOW", highlight: true },
          ].map((node) => (
            <div key={node.year} style={{
              display: "flex", flexDirection: "column", alignItems: "center", gap: 0,
            }}>
              {/* Year above */}
              <div style={{
                fontFamily: "var(--font-geist-sans)", fontSize: 11, fontWeight: 600,
                color: node.highlight ? C.celebrate : "rgba(226,246,213,0.4)",
                marginBottom: 4,
              }}>
                {node.year}
              </div>
              {/* Node dot */}
              <div style={{
                width: node.highlight ? 16 : 14, height: node.highlight ? 16 : 14,
                borderRadius: "50%",
                background: node.highlight ? C.celebrate : C.mint,
                position: "relative", zIndex: 1,
                boxShadow: node.highlight ? `0 0 12px rgba(255,192,145,0.6)` : "none",
              }} />
              {/* Label below */}
              <div style={{
                fontFamily: "var(--font-geist-sans)",
                fontSize: node.highlight ? 13 : 12,
                fontWeight: node.highlight ? 900 : 700,
                color: node.highlight ? C.celebrate : C.mint,
                marginTop: 10, textAlign: "center",
              }}>
                {node.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Slide 12 — FOUNDER-MARKET FIT ───────────────────────────────────────────
function Slide12() {
  return (
    <div style={{
      width: "100%", height: "100vh", background: C.canvas,
      display: "flex", flexDirection: "column", justifyContent: "center",
      padding: "80px 72px", overflow: "hidden",
    }}>
      <div style={{
        fontFamily: "var(--font-geist-sans)", fontSize: 11, fontWeight: 800,
        color: C.muted, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16,
      }}>
        FOUNDER-MARKET FIT
      </div>
      <h2 style={{
        fontFamily: "var(--font-geist-sans)", fontWeight: 900,
        fontSize: "clamp(32px,5vw,58px)",
        letterSpacing: "-0.03em", color: C.dark, margin: 0,
      }}>
        Built by the people who lived it.
      </h2>

      <div style={{ display: "flex", flexDirection: "row", gap: 28, marginTop: 48 }}>
        {/* Card 1 */}
        <div style={{
          flex: 1, background: C.evergreen, borderRadius: 24, padding: 40,
        }}>
          <img src="/ola.jpg" alt="Olayinka Akinhanmi" style={{
            width: 80, height: 80, borderRadius: "50%", objectFit: "cover",
            objectPosition: "center top", display: "block",
            border: `3px solid ${C.mint}`,
          }} />
          <div style={{
            fontFamily: "var(--font-geist-sans)", fontWeight: 800, fontSize: 18,
            color: C.mint, marginTop: 16,
          }}>
            Olayinka Akinhanmi
          </div>
          <div style={{
            fontFamily: "var(--font-geist-sans)", fontSize: 13, fontWeight: 600,
            color: `rgba(226,246,213,0.65)`, marginTop: 4,
          }}>
            Product &amp; Engineering
          </div>
          <div style={{ height: 1, background: `rgba(226,246,213,0.2)`, margin: "20px 0" }} />
          <p style={{
            fontFamily: "var(--font-geist-sans)", fontSize: 15, fontWeight: 600,
            color: `rgba(226,246,213,0.85)`, lineHeight: 1.65, margin: 0,
          }}>
            Built and scaled KingsPay for a 2M-member global church. Watched international givers drop off every Sunday because the system could not handle cross-border giving. Did not just see the problem — was responsible for the product that could not solve it.
          </p>
        </div>

        {/* Card 2 */}
        <div style={{
          flex: 1, background: C.dark, borderRadius: 24, padding: 40,
        }}>
          <img src="/obi.jpeg" alt="Obiaka" style={{
            width: 80, height: 80, borderRadius: "50%", objectFit: "cover",
            objectPosition: "center top", display: "block",
            border: "3px solid rgba(255,255,255,0.15)",
          }} />
          <div style={{
            fontFamily: "var(--font-geist-sans)", fontWeight: 800, fontSize: 18,
            color: C.canvas, marginTop: 16,
          }}>
            Obiaka
          </div>
          <div style={{
            fontFamily: "var(--font-geist-sans)", fontSize: 13, fontWeight: 600,
            color: "rgba(251,251,249,0.5)", marginTop: 4,
          }}>
            Liquidity &amp; Risk
          </div>
          <div style={{ height: 1, background: "rgba(255,255,255,0.1)", margin: "20px 0" }} />
          <p style={{
            fontFamily: "var(--font-geist-sans)", fontSize: 15, fontWeight: 600,
            color: "rgba(251,251,249,0.8)", lineHeight: 1.65, margin: 0,
          }}>
            14 years at Goldman Sachs in emerging markets debt. Runs Voltech Capital LP. Knows how to move institutional capital across borders, manage FX risk, and build the operational infrastructure for global money flows.
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Slide 13 — THE ASK ───────────────────────────────────────────────────────
function Slide13() {
  const chips = [
    "Convert LOIs to live churches",
    "Prove 8 target markets",
    "$50M+ annualized giving volume",
  ];

  return (
    <div style={{
      width: "100%", height: "100vh", background: C.dark,
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      overflow: "hidden", position: "relative",
    }}>
      {/* NetworkDots */}
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", opacity: 0.06 }}>
        <NetworkDots rows={7} cols={11} opacity={1} />
      </div>
      {/* Glow */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse 50% 40% at 50% 50%, rgba(226,246,213,0.04) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{
        display: "flex", flexDirection: "column", alignItems: "center",
        textAlign: "center", padding: 80, zIndex: 1,
      }}>
        <div style={{
          fontFamily: "var(--font-geist-sans)", fontSize: 11, fontWeight: 800,
          color: C.celebrate, letterSpacing: "0.2em", textTransform: "uppercase",
        }}>
          THE ASK
        </div>

        <div style={{
          fontFamily: "var(--font-geist-sans)", fontWeight: 900,
          fontSize: "clamp(96px,18vw,180px)",
          color: C.mint, fontVariantNumeric: "tabular-nums",
          letterSpacing: "-0.05em", lineHeight: 0.85, marginTop: 8,
        }}>
          $3M
        </div>

        <div style={{
          fontFamily: "var(--font-geist-sans)", fontSize: 18, fontWeight: 700,
          color: `rgba(226,246,213,0.5)`, marginTop: 16,
        }}>
          Pre-seed round
        </div>

        <div style={{
          width: 60, height: 3, background: C.celebrate,
          borderRadius: 9999, margin: "32px auto",
        }} />

        <div style={{ display: "flex", flexDirection: "row", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          {chips.map((chip) => (
            <div key={chip} style={{
              background: "rgba(226,246,213,0.06)",
              border: "1px solid rgba(226,246,213,0.12)",
              borderRadius: 999, padding: "10px 20px",
              fontFamily: "var(--font-geist-sans)", fontSize: 14, fontWeight: 600,
              color: `rgba(226,246,213,0.8)`,
            }}>
              {chip}
            </div>
          ))}
        </div>

        <div style={{
          fontFamily: "var(--font-geist-sans)", fontSize: 15, fontWeight: 600,
          color: `rgba(226,246,213,0.4)`, marginTop: 40,
        }}>
          hello@churchpay.com
        </div>
      </div>
    </div>
  );
}

// ─── Slide 14 — PROOF POINT ───────────────────────────────────────────────────
function Slide14() {
  return (
    <div style={{
      width: "100%", height: "100vh", background: C.canvas,
      display: "flex", flexDirection: "column", justifyContent: "center",
      padding: "80px 72px", overflow: "hidden",
    }}>
      <div style={{
        fontFamily: "var(--font-geist-sans)", fontSize: 11, fontWeight: 800,
        color: C.muted, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16,
      }}>
        PROOF POINT
      </div>
      <h2 style={{
        fontFamily: "var(--font-geist-sans)", fontWeight: 900,
        fontSize: "clamp(32px,5vw,58px)",
        letterSpacing: "-0.03em", color: C.dark, margin: 0,
      }}>
        The intent is already there.
      </h2>

      {/* Evidence card */}
      <div style={{
        background: C.evergreen, borderRadius: 30, padding: 56,
        maxWidth: 760, marginTop: 48,
        position: "relative", overflow: "hidden",
      }}>
        {/* BG decorative text */}
        <div style={{
          position: "absolute", right: -10, bottom: -30,
          fontFamily: "var(--font-geist-sans)", fontSize: 180, fontWeight: 900,
          color: "rgba(255,255,255,0.03)", lineHeight: 1,
          userSelect: "none", pointerEvents: "none",
        }}>
          LOI
        </div>

        {/* Label pill */}
        <div style={{
          display: "inline-block",
          background: C.celebrate, color: C.dark,
          borderRadius: 999, padding: "6px 14px",
          fontFamily: "var(--font-geist-sans)", fontSize: 12, fontWeight: 800,
          marginBottom: 24,
        }}>
          SIGNED LOI
        </div>

        <div style={{
          fontFamily: "var(--font-geist-sans)", fontWeight: 800, fontSize: 24,
          color: C.mint, lineHeight: 1.3,
        }}>
          Flagship church · Thousands of weekly international viewers
        </div>
        <p style={{
          fontFamily: "var(--font-geist-sans)", fontSize: 16, fontWeight: 600,
          color: `rgba(226,246,213,0.75)`, lineHeight: 1.7, marginTop: 16, marginBottom: 0,
        }}>
          Already signed a Letter of Intent. That gives us an anchor customer and a path into its broader denomination network — hundreds of affiliate churches sharing the same polity, audit, and banking infrastructure.
        </p>

        <div style={{ display: "flex", flexDirection: "row", gap: 24, marginTop: 32 }}>
          {[
            { label: "Anchor LOI", value: "Signed", dot: C.mint },
            { label: "Network path", value: "Denomination of 200–5,000 churches", dot: C.celebrate },
          ].map((chip) => (
            <div key={chip.label} style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 14, padding: "16px 20px",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: chip.dot, flexShrink: 0 }} />
                <div style={{
                  fontFamily: "var(--font-geist-sans)", fontSize: 11, fontWeight: 700,
                  color: "rgba(226,246,213,0.5)", letterSpacing: "0.08em", textTransform: "uppercase",
                }}>
                  {chip.label}
                </div>
              </div>
              <div style={{
                fontFamily: "var(--font-geist-sans)", fontSize: 14, fontWeight: 700,
                color: C.mint, marginTop: 4,
              }}>
                {chip.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Slide 15 — CALL TO ACTION ────────────────────────────────────────────────
function Slide15() {
  return (
    <div style={{
      width: "100%", height: "100vh", background: C.evergreen,
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      overflow: "hidden", position: "relative",
    }}>
      {/* Faint globe bottom-right */}
      <div style={{
        position: "absolute", bottom: -80, right: -80, opacity: 0.06,
        pointerEvents: "none",
      }}>
        <GlobeGraphic size={400} />
      </div>

      <div style={{
        display: "flex", flexDirection: "column", alignItems: "center",
        textAlign: "center", padding: 80, zIndex: 1, width: "100%",
      }}>
        {/* Logo large */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            width: 48, height: 48, borderRadius: "50%", background: C.mint,
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          }}>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M5 17L17 5M17 5H8M17 5V14" stroke={C.evergreen} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span style={{
            fontFamily: "var(--font-geist-sans)", fontWeight: 800, fontSize: 28,
            color: C.mint, letterSpacing: "-0.02em",
          }}>
            ChurchPay
          </span>
        </div>

        {/* Heading */}
        <div style={{ marginTop: 48 }}>
          <div style={{
            fontFamily: "var(--font-geist-sans)", fontWeight: 900,
            fontSize: "clamp(32px,5vw,60px)",
            color: C.mint, letterSpacing: "-0.03em", lineHeight: 0.92,
          }}>
            We are building the rail
          </div>
          <div style={{
            fontFamily: "var(--font-geist-sans)", fontWeight: 900,
            fontSize: "clamp(32px,5vw,60px)",
            color: C.mint, letterSpacing: "-0.03em", lineHeight: 0.92,
          }}>
            for the one donation
          </div>
          <div style={{
            fontFamily: "var(--font-geist-sans)", fontWeight: 900,
            fontSize: "clamp(32px,5vw,60px)",
            color: "rgba(226,246,213,0.5)", letterSpacing: "-0.03em", lineHeight: 0.92,
          }}>
            most systems still cannot process.
          </div>
        </div>

        <p style={{
          fontFamily: "var(--font-geist-sans)", fontSize: 16, fontWeight: 600,
          color: "rgba(226,246,213,0.65)", lineHeight: 1.7,
          maxWidth: 520, marginTop: 32, marginBottom: 0,
        }}>
          If you want to see the product, talk through the wedge, or pressure-test the business model — let&rsquo;s talk.
        </p>

        {/* CTA buttons */}
        <div style={{ display: "flex", flexDirection: "row", gap: 16, marginTop: 48, justifyContent: "center" }}>
          <a href="mailto:hello@churchpay.com" style={{
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            background: C.mint, color: C.evergreen,
            height: 52, padding: "0 32px",
            fontFamily: "var(--font-geist-sans)", fontSize: 16, fontWeight: 800,
            borderRadius: 999, textDecoration: "none", letterSpacing: "-0.01em",
            whiteSpace: "nowrap",
          }}>
            Schedule a call
          </a>
          <a href="mailto:hello@churchpay.com" style={{
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            background: "transparent",
            border: "1.5px solid rgba(226,246,213,0.3)",
            color: C.mint,
            height: 52, padding: "0 32px",
            fontFamily: "var(--font-geist-sans)", fontSize: 16, fontWeight: 700,
            borderRadius: 999, textDecoration: "none",
            whiteSpace: "nowrap",
          }}>
            hello@churchpay.com
          </a>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        position: "absolute", bottom: 40, left: 0, right: 0,
        display: "flex", flexDirection: "row", gap: 12, justifyContent: "center",
        alignItems: "center",
      }}>
        <span style={{
          fontFamily: "var(--font-geist-sans)", fontSize: 13, fontWeight: 600,
          color: `rgba(226,246,213,0.4)`,
        }}>
          Olayinka Akinhanmi · Obiaka
        </span>
        <span style={{ color: `rgba(226,246,213,0.2)`, fontSize: 13 }}>·</span>
        <span style={{
          fontFamily: "var(--font-geist-sans)", fontSize: 13, fontWeight: 600,
          color: `rgba(226,246,213,0.4)`,
        }}>
          hello@churchpay.com
        </span>
        <span style={{ color: `rgba(226,246,213,0.2)`, fontSize: 13 }}>·</span>
        <span style={{
          fontFamily: "var(--font-geist-sans)", fontSize: 13, fontWeight: 600,
          color: `rgba(226,246,213,0.4)`,
        }}>
          churchpay.com
        </span>
      </div>
    </div>
  );
}

// ─── Navigation bar ───────────────────────────────────────────────────────────
function NavBar({
  current,
  total,
  onPrev,
  onNext,
}: {
  current: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
}) {
  const isDark = SLIDES[current]?.dark ?? false;
  const navBg     = isDark ? "rgba(14,15,12,0.92)"  : "rgba(251,251,249,0.95)";
  const navBorder = isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(14,15,12,0.08)";
  const labelColor  = isDark ? "rgba(226,246,213,0.45)" : C.muted;
  const countColor  = isDark ? "rgba(226,246,213,0.55)" : C.muted;
  const dotActive   = isDark ? C.mint    : C.evergreen;
  const dotInactive = isDark ? "rgba(255,255,255,0.18)" : "rgba(14,15,12,0.15)";
  const btnBg       = isDark ? C.mint    : C.evergreen;
  const btnArrow    = isDark ? C.evergreen : C.mint;
  const btnDisabledBg = isDark ? "rgba(255,255,255,0.06)" : "rgba(14,15,12,0.05)";

  return (
    <div style={{
      position: "fixed", bottom: 0, left: 0, right: 0,
      height: 64, zIndex: 100,
      background: navBg,
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      borderTop: navBorder,
      display: "flex", alignItems: "center",
      paddingLeft: 40, paddingRight: 32,
    }}>
      {/* Left: slide title */}
      <div style={{
        fontFamily: "var(--font-geist-sans)", fontSize: 12, fontWeight: 600,
        color: labelColor, minWidth: 180, flexShrink: 0,
      }}>
        {SLIDES[current]?.title}
      </div>

      {/* Center: counter + dots */}
      <div style={{
        flex: 1, display: "flex", flexDirection: "column",
        alignItems: "center", gap: 6,
      }}>
        <div style={{
          fontFamily: "var(--font-geist-sans)", fontSize: 11, fontWeight: 700,
          color: countColor, fontVariantNumeric: "tabular-nums",
        }}>
          {current + 1} / {total}
        </div>
        <div style={{ display: "flex", flexDirection: "row", gap: 5, alignItems: "center" }}>
          {Array.from({ length: total }).map((_, i) => (
            <div
              key={i}
              style={{
                width: i === current ? 8 : 4,
                height: i === current ? 8 : 4,
                borderRadius: "50%",
                background: i === current ? dotActive : dotInactive,
                transition: "all 0.3s ease",
                flexShrink: 0,
              }}
            />
          ))}
        </div>
      </div>

      {/* Right: prev/next */}
      <div style={{ display: "flex", flexDirection: "row", gap: 8, flexShrink: 0 }}>
        <button
          onClick={onPrev}
          disabled={current === 0}
          aria-label="Previous slide"
          style={{
            width: 40, height: 40, borderRadius: 999,
            background: current === 0 ? btnDisabledBg : btnBg,
            border: "none", cursor: current === 0 ? "default" : "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "background 0.2s ease",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 12L6 8L10 4" stroke={current === 0 ? C.muted : btnArrow} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button
          onClick={onNext}
          disabled={current === total - 1}
          aria-label="Next slide"
          style={{
            width: 40, height: 40, borderRadius: 999,
            background: current === total - 1 ? btnDisabledBg : btnBg,
            border: "none", cursor: current === total - 1 ? "default" : "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "background 0.2s ease",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6 4L10 8L6 12" stroke={current === total - 1 ? C.muted : btnArrow} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
const TOTAL = SLIDES.length;

const SLIDE_COMPONENTS = [
  <Slide01 key={0} />,
  <Slide02 key={1} />,
  <Slide03 key={2} />,
  <Slide04 key={3} />,
  <Slide05 key={4} />,
  <Slide06 key={5} />,
  <Slide07 key={6} />,
  <Slide08 key={7} />,
  <Slide09 key={8} />,
  <Slide10 key={9} />,
  <Slide11 key={10} />,
  <Slide12 key={11} />,
  <Slide13 key={12} />,
  <Slide14 key={13} />,
  <Slide15 key={14} />,
];

export default function PitchPage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const goNext = useCallback(() => setCurrentSlide((s) => Math.min(s + 1, TOTAL - 1)), []);
  const goPrev = useCallback(() => setCurrentSlide((s) => Math.max(s - 1, 0)), []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") goNext();
      if (e.key === "ArrowLeft"  || e.key === "ArrowUp")   goPrev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [goNext, goPrev]);

  return (
    <div style={{ position: "fixed", inset: 0, overflow: "hidden", background: C.dark }}>
      <div style={{ position: "relative", width: "100%", height: "100vh" }}>
        {SLIDE_COMPONENTS.map((slide, i) => {
          const offset   = i - currentSlide;
          const isActive = offset === 0;
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                top: 0, left: 0,
                width: "100%", height: "100vh",
                opacity: isActive ? 1 : 0,
                transform: isActive
                  ? "translateX(0)"
                  : offset > 0
                    ? "translateX(4%)"
                    : "translateX(-4%)",
                transition: "opacity 0.45s cubic-bezier(0.4,0,0.2,1), transform 0.45s cubic-bezier(0.4,0,0.2,1)",
                pointerEvents: isActive ? "auto" : "none",
                zIndex: isActive ? 1 : 0,
              }}
            >
              {slide}
            </div>
          );
        })}
      </div>

      <NavBar
        current={currentSlide}
        total={TOTAL}
        onPrev={goPrev}
        onNext={goNext}
      />
    </div>
  );
}
