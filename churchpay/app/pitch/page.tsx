"use client";

import { useState, useEffect, useCallback } from "react";

// ─── Brand tokens ─────────────────────────────────────────────────────────────
const C = {
  canvas:    "#FBFBF9",
  dark:      "#0E0F0C",
  evergreen: "#163300",
  mint:      "#E2F6D5",
  celebrate: "#FFC091",
  secondary: "#454745",
  muted:     "#868685",
};

// ─── Logo ─────────────────────────────────────────────────────────────────────
function Logo({ dark = false }: { dark?: boolean }) {
  const text  = dark ? C.mint  : C.evergreen;
  const bg    = dark ? C.mint  : C.evergreen;
  const arrow = dark ? C.evergreen : C.mint;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div style={{
        width: 28, height: 28, borderRadius: "50%",
        background: bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
      }}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M3 11L11 3M11 3H5M11 3V9" stroke={arrow} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <span style={{ fontFamily: "var(--font-geist-sans)", fontWeight: 800, fontSize: 15, color: text, letterSpacing: "-0.02em" }}>
        ChurchPay
      </span>
    </div>
  );
}

// ─── Slide shell ──────────────────────────────────────────────────────────────
function SlideShell({
  bg, children, slideNumber, dark = false,
}: {
  bg: string; children: React.ReactNode; slideNumber: number; dark?: boolean;
}) {
  const numColor = dark ? "rgba(226,246,213,0.35)" : "rgba(14,15,12,0.18)";
  return (
    <div style={{
      width: "100%", height: "100vh", background: bg,
      position: "relative", overflow: "hidden",
      display: "flex", flexDirection: "column",
    }}>
      {/* Logo top-left */}
      <div style={{ position: "absolute", top: 32, left: 40, zIndex: 10 }}>
        <Logo dark={dark} />
      </div>
      {/* Slide number bottom-left */}
      <div style={{
        position: "absolute", bottom: 76, left: 40, zIndex: 10,
        fontFamily: "var(--font-geist-sans)", fontSize: 11, fontWeight: 700,
        color: numColor, letterSpacing: "0.08em",
      }}>
        {String(slideNumber).padStart(2, "0")}
      </div>
      {children}
    </div>
  );
}

// ─── Slide 1 – Cover ──────────────────────────────────────────────────────────
function Slide01({ n }: { n: number }) {
  return (
    <SlideShell bg={C.evergreen} slideNumber={n} dark>
      <div style={{
        flex: 1, display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        paddingTop: "18vh", paddingBottom: "10vh", paddingLeft: 40, paddingRight: 40,
        textAlign: "center",
      }}>
        <h1 style={{
          fontFamily: "var(--font-geist-sans)",
          fontWeight: 900,
          fontSize: "clamp(64px,10vw,120px)",
          color: C.mint,
          letterSpacing: "-0.04em",
          lineHeight: 0.9,
          margin: 0,
        }}>
          ChurchPay
        </h1>
        <p style={{
          fontFamily: "var(--font-geist-sans)",
          fontSize: 20, fontWeight: 600,
          color: "rgba(226,246,213,0.7)",
          marginTop: 24, marginBottom: 0,
          letterSpacing: "-0.01em",
        }}>
          Financial infrastructure for the global church.
        </p>
      </div>
      {/* Footer */}
      <div style={{
        position: "absolute", bottom: 40, left: 40, right: 40,
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <span style={{ fontFamily: "var(--font-geist-sans)", fontSize: 12, fontWeight: 600, color: "rgba(226,246,213,0.4)" }}>
          Olayinka Akinhanmi · Obi
        </span>
        <span style={{ fontFamily: "var(--font-geist-sans)", fontSize: 12, fontWeight: 600, color: "rgba(226,246,213,0.4)" }}>
          hello@churchpay.com
        </span>
      </div>
    </SlideShell>
  );
}

// ─── Slide 2 – Team ───────────────────────────────────────────────────────────
function Slide02({ n }: { n: number }) {
  return (
    <SlideShell bg={C.canvas} slideNumber={n}>
      <div style={{
        flex: 1, display: "flex", flexDirection: "column",
        paddingTop: 100, paddingLeft: 72, paddingRight: 72, paddingBottom: 80,
        maxWidth: 1100, margin: "0 auto", width: "100%",
      }}>
        <div style={{
          fontFamily: "var(--font-geist-sans)", fontSize: 11, fontWeight: 700,
          color: C.muted, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 20,
        }}>
          Meet the Team
        </div>
        <h2 style={{
          fontFamily: "var(--font-geist-sans)",
          fontWeight: 800,
          fontSize: "clamp(28px,4vw,52px)",
          letterSpacing: "-0.03em",
          color: C.dark,
          margin: 0, lineHeight: 1.1,
        }}>
          Built by people who've done this before.
        </h2>

        {/* Founder cards */}
        <div style={{ display: "flex", flexDirection: "row", gap: 32, marginTop: 40 }}>
          {/* Olayinka */}
          <div style={{
            flex: 1, background: "#fff", border: "1px solid rgba(14,15,12,0.12)",
            borderRadius: 16, padding: 32,
          }}>
            <img src="/ola.jpg" alt="Olayinka Akinhanmi" style={{
              width: 96, height: 96, borderRadius: "50%", objectFit: "cover",
              objectPosition: "center top", display: "block",
            }} />
            <div style={{ fontFamily: "var(--font-geist-sans)", fontWeight: 800, fontSize: 18, color: C.dark, marginTop: 16 }}>
              Olayinka Akinhanmi
            </div>
            <div style={{
              display: "inline-block", marginTop: 8, padding: "4px 12px",
              background: C.mint, color: C.evergreen, borderRadius: 999,
              fontFamily: "var(--font-geist-sans)", fontSize: 12, fontWeight: 700,
            }}>
              Co-founder & CEO / Product
            </div>
            <p style={{
              fontFamily: "var(--font-geist-sans)", fontSize: 14, fontWeight: 600,
              color: C.secondary, lineHeight: 1.65, marginTop: 16, marginBottom: 0,
            }}>
              Founding PM and engineer of KingsPay — built and scaled the payment ecosystem for a 2M-member global church. Multi-time founder; solo-architected, coded, and operated Nerditt to scale. 10+ years building high-compliance fintech for exactly this customer.
            </p>
          </div>

          {/* Obi */}
          <div style={{
            flex: 1, background: "#fff", border: "1px solid rgba(14,15,12,0.12)",
            borderRadius: 16, padding: 32,
          }}>
            <img src="/obi.jpeg" alt="Obi" style={{
              width: 96, height: 96, borderRadius: "50%", objectFit: "cover",
              objectPosition: "center top", display: "block",
            }} />
            <div style={{ fontFamily: "var(--font-geist-sans)", fontWeight: 800, fontSize: 18, color: C.dark, marginTop: 16 }}>
              Obi
            </div>
            <div style={{
              display: "inline-block", marginTop: 8, padding: "4px 12px",
              background: C.dark, color: C.mint, borderRadius: 999,
              fontFamily: "var(--font-geist-sans)", fontSize: 12, fontWeight: 700,
            }}>
              Co-founder & Liquidity / Risk
            </div>
            <p style={{
              fontFamily: "var(--font-geist-sans)", fontSize: 14, fontWeight: 600,
              color: C.secondary, lineHeight: 1.65, marginTop: 16, marginBottom: 0,
            }}>
              14 years at Goldman Sachs — VP and Portfolio Manager on the Emerging Markets Debt desk, including Global Chief of Staff for Market Risk. Founder of Voltech Capital LP. Deep expertise in sovereign debt, FX, market risk, and moving institutional capital at scale.
            </p>
          </div>
        </div>

        {/* Logo strip */}
        <div style={{ display: "flex", gap: 32, marginTop: 28, alignItems: "center" }}>
          <span style={{
            fontFamily: "var(--font-geist-sans)", fontSize: 13, fontWeight: 700,
            color: C.muted, padding: "6px 16px",
            border: "1px solid rgba(14,15,12,0.1)", borderRadius: 8,
          }}>Goldman Sachs</span>
          <span style={{
            fontFamily: "var(--font-geist-sans)", fontSize: 13, fontWeight: 700,
            color: C.muted, padding: "6px 16px",
            border: "1px solid rgba(14,15,12,0.1)", borderRadius: 8,
          }}>KingsPay</span>
        </div>
      </div>
    </SlideShell>
  );
}

// ─── Slide 3 – Opportunity ────────────────────────────────────────────────────
function Slide03({ n }: { n: number }) {
  return (
    <SlideShell bg={C.canvas} slideNumber={n}>
      <div style={{
        flex: 1, display: "flex", flexDirection: "column",
        paddingTop: 100, paddingLeft: 72, paddingRight: 72, paddingBottom: 60,
        maxWidth: 1100, margin: "0 auto", width: "100%",
      }}>
        <div style={{
          fontFamily: "var(--font-geist-sans)", fontSize: 11, fontWeight: 700,
          color: C.muted, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 20,
        }}>
          Opportunity
        </div>
        <h2 style={{
          fontFamily: "var(--font-geist-sans)",
          fontWeight: 800,
          fontSize: "clamp(24px,3.5vw,44px)",
          letterSpacing: "-0.03em",
          color: C.dark,
          margin: 0, lineHeight: 1.1, maxWidth: 700,
        }}>
          The church went global.<br />The collection plate didn't.
        </h2>

        {/* Three stat blocks */}
        <div style={{ display: "flex", flexDirection: "row", gap: 40, marginTop: 48 }}>
          {[
            { stat: "$146.5B", label: "given to religion in the U.S. alone in 2024¹" },
            { stat: "$905B",   label: "sent across borders in remittances in 2024²" },
            { stat: "6.65%",   label: "average cost to move money across a border³" },
          ].map(({ stat, label }) => (
            <div key={stat} style={{ flex: 1, borderLeft: `3px solid ${C.evergreen}`, paddingLeft: 24 }}>
              <div style={{
                fontFamily: "var(--font-geist-sans)", fontWeight: 900, fontSize: 48,
                color: C.evergreen, letterSpacing: "-0.03em", fontVariantNumeric: "tabular-nums",
                lineHeight: 1,
              }}>
                {stat}
              </div>
              <div style={{
                fontFamily: "var(--font-geist-sans)", fontSize: 13, fontWeight: 600,
                color: C.muted, marginTop: 8, lineHeight: 1.5,
              }}>
                {label}
              </div>
            </div>
          ))}
        </div>

        {/* Paragraph */}
        <div style={{
          marginTop: 40, maxWidth: 800,
          borderLeft: `3px solid ${C.mint}`, paddingLeft: 24, borderRadius: 2,
        }}>
          <p style={{
            fontFamily: "var(--font-geist-sans)", fontSize: 15, fontWeight: 600,
            color: C.secondary, lineHeight: 1.65, margin: 0,
          }}>
            Religious giving is a trillion-dollar global flow — but no church on Earth can accept a donation from a giver in another country. The intent exists every Sunday; the rail does not.
          </p>
        </div>

        {/* Footnotes */}
        <div style={{
          marginTop: 24, fontFamily: "var(--font-geist-sans)", fontSize: 11,
          fontWeight: 600, color: C.muted, lineHeight: 1.8,
        }}>
          ¹ Giving USA 2025 &nbsp;&nbsp; ² World Bank / IOM, 2024 &nbsp;&nbsp; ³ World Bank RPW, Q2 2024
        </div>
      </div>
    </SlideShell>
  );
}

// ─── Slide 4 – Solution ───────────────────────────────────────────────────────
function Slide04({ n }: { n: number }) {
  return (
    <SlideShell bg={C.dark} slideNumber={n} dark>
      <div style={{
        flex: 1, display: "flex", flexDirection: "column",
        paddingTop: 100, paddingLeft: 72, paddingRight: 72, paddingBottom: 80,
        maxWidth: 1100, margin: "0 auto", width: "100%",
      }}>
        <div style={{
          fontFamily: "var(--font-geist-sans)", fontSize: 11, fontWeight: 700,
          color: C.mint, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 20,
        }}>
          Our Solution
        </div>
        <h2 style={{
          fontFamily: "var(--font-geist-sans)", fontWeight: 800,
          fontSize: "clamp(18px,2.8vw,34px)",
          color: C.canvas, letterSpacing: "-0.02em", lineHeight: 1.3,
          margin: 0, maxWidth: 800,
        }}>
          ChurchPay is the financial infrastructure that lets any giver, anywhere, give to any church — in their own currency, in seconds.
        </h2>

        {/* Three pillars */}
        <div style={{ display: "flex", flexDirection: "row", gap: 24, marginTop: 48 }}>
          {[
            {
              icon: "🌍",
              title: "Borderless Giving",
              body: "A giver in any country pays in their local currency — card, wallet, mobile money, or stablecoin. The church receives funds in seconds.",
            },
            {
              icon: "⚡",
              title: "Instant Settlement",
              body: "Stablecoin rails convert and settle globally at sub-cent cost — no SWIFT, no 14-day wires, no 6–13% fees.",
            },
            {
              icon: "🛡️",
              title: "One Operating Account",
              body: "On top of giving: hold funds, earn yield, issue cards, and reconcile every currency in real time.",
            },
          ].map(({ icon, title, body }) => (
            <div key={title} style={{
              flex: 1,
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 20, padding: 32,
            }}>
              <div style={{ fontSize: 32 }}>{icon}</div>
              <div style={{
                fontFamily: "var(--font-geist-sans)", fontWeight: 800, fontSize: 18,
                color: C.canvas, marginTop: 16,
              }}>
                {title}
              </div>
              <p style={{
                fontFamily: "var(--font-geist-sans)", fontSize: 14, fontWeight: 600,
                color: "rgba(251,251,249,0.65)", lineHeight: 1.65, marginTop: 10, marginBottom: 0,
              }}>
                {body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </SlideShell>
  );
}

// ─── Slide 5 – How it Works ───────────────────────────────────────────────────
function Slide05({ n }: { n: number }) {
  const steps = [
    {
      num: "01",
      title: "Church connects",
      body: "The church drops a ChurchPay link or QR into its livestream, app, or website. Setup takes minutes, no engineering required.",
    },
    {
      num: "02",
      title: "Giver gives, anywhere",
      body: "A viewer in any country taps to give in their local currency — via card, wallet, mobile money, or stablecoin. No new bank account, no friction.",
    },
    {
      num: "03",
      title: "ChurchPay settles instantly",
      body: "Funds are converted and settle to the church's account in USDC (or local currency) within seconds, with full donor attribution.",
    },
    {
      num: "04",
      title: "Church holds, spends, sends",
      body: "The church manages funds in one dashboard — earns yield on reserves, issues ministry cards, runs payroll, and sends missions transfers worldwide.",
    },
  ];

  return (
    <SlideShell bg={C.canvas} slideNumber={n}>
      <div style={{
        flex: 1, display: "flex", flexDirection: "column",
        paddingTop: 100, paddingLeft: 72, paddingRight: 72, paddingBottom: 80,
        maxWidth: 1100, margin: "0 auto", width: "100%",
      }}>
        <div style={{
          fontFamily: "var(--font-geist-sans)", fontSize: 11, fontWeight: 700,
          color: C.muted, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 20,
        }}>
          How it Works
        </div>
        <h2 style={{
          fontFamily: "var(--font-geist-sans)", fontWeight: 800,
          fontSize: "clamp(28px,4vw,52px)",
          letterSpacing: "-0.03em", color: C.dark, margin: 0,
        }}>
          Four steps. Zero friction.
        </h2>

        <div style={{ display: "flex", flexDirection: "row", gap: 20, marginTop: 48, alignItems: "stretch" }}>
          {steps.map((step, i) => (
            <div key={step.num} style={{ display: "flex", flexDirection: "row", alignItems: "stretch", flex: 1 }}>
              <div style={{
                flex: 1,
                background: "#fff",
                border: "1px solid rgba(14,15,12,0.12)",
                borderRadius: 16, padding: "28px 24px",
                display: "flex", flexDirection: "column",
              }}>
                <div style={{
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                  background: C.evergreen, color: C.mint,
                  borderRadius: 999, padding: "4px 12px",
                  fontFamily: "var(--font-geist-sans)", fontSize: 12, fontWeight: 800,
                  alignSelf: "flex-start",
                  fontVariantNumeric: "tabular-nums",
                }}>
                  {step.num}
                </div>
                <div style={{
                  fontFamily: "var(--font-geist-sans)", fontWeight: 800, fontSize: 16,
                  color: C.dark, marginTop: 16, lineHeight: 1.3,
                }}>
                  {step.title}
                </div>
                <p style={{
                  fontFamily: "var(--font-geist-sans)", fontSize: 13, fontWeight: 600,
                  color: C.secondary, lineHeight: 1.65, marginTop: 10, marginBottom: 0,
                }}>
                  {step.body}
                </p>
              </div>
              {i < steps.length - 1 && (
                <div style={{
                  display: "flex", alignItems: "center", justifyContent: "center",
                  padding: "0 8px", color: C.muted,
                  fontFamily: "var(--font-geist-sans)", fontWeight: 700, fontSize: 18,
                  flexShrink: 0,
                }}>
                  →
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </SlideShell>
  );
}

// ─── Slide 6 – Product Benefits ───────────────────────────────────────────────
function Slide06({ n }: { n: number }) {
  const bullets = [
    "Receive from 200 countries — not 1–5 like every incumbent",
    "Any currency in, USD or local out — converted at mid-market rates",
    "Settlement in seconds, not days or weeks",
    "Full donor attribution on every gift, automatically",
    "Real-time books — auto-reconciled, audit-ready on day one",
    "No new bank account, no crypto knowledge required",
  ];

  const rows = [
    { initial: "A", name: "Adaeze · Lagos", amount: "₦25,000 → $16" },
    { initial: "M", name: "Marcus · London", amount: "£200 → $254" },
    { initial: "J", name: "Jin-soo · Seoul", amount: "₩50,000 → $36" },
  ];

  return (
    <SlideShell bg={C.evergreen} slideNumber={n} dark>
      <div style={{
        flex: 1, display: "flex", flexDirection: "row",
        paddingTop: 100, paddingLeft: 72, paddingRight: 72, paddingBottom: 80, gap: 60,
        maxWidth: 1200, margin: "0 auto", width: "100%", alignItems: "center",
      }}>
        {/* Left column */}
        <div style={{ flex: 1 }}>
          <div style={{
            fontFamily: "var(--font-geist-sans)", fontSize: 11, fontWeight: 700,
            color: "rgba(226,246,213,0.5)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 20,
          }}>
            What the Church Gets
          </div>
          <h2 style={{
            fontFamily: "var(--font-geist-sans)", fontWeight: 800,
            fontSize: "clamp(24px,3vw,40px)",
            color: C.canvas, letterSpacing: "-0.03em", lineHeight: 1.1, margin: 0,
          }}>
            One dashboard.<br />Every currency.<br />Every country.
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 28 }}>
            {bullets.map((b) => (
              <div key={b} style={{ display: "flex", flexDirection: "row", gap: 12, alignItems: "flex-start" }}>
                <div style={{
                  width: 20, height: 20, borderRadius: "50%",
                  background: C.mint, display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0, marginTop: 2,
                }}>
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path d="M1 4L3.5 6.5L9 1" stroke={C.evergreen} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span style={{
                  fontFamily: "var(--font-geist-sans)", fontSize: 14, fontWeight: 600,
                  color: "rgba(251,251,249,0.85)", lineHeight: 1.5,
                }}>
                  {b}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right column – phone mockup */}
        <div style={{ flexShrink: 0 }}>
          <div style={{
            width: 300, background: C.canvas, borderRadius: 32,
            border: "6px solid rgba(255,255,255,0.15)",
            padding: "24px 20px", maxHeight: 460,
          }}>
            <div style={{
              fontFamily: "var(--font-geist-sans)", fontWeight: 800, fontSize: 15,
              color: C.dark,
            }}>
              Today's giving
            </div>
            <div style={{
              fontFamily: "var(--font-geist-sans)", fontSize: 12, fontWeight: 600,
              color: C.muted, marginTop: 4,
            }}>
              from 38 countries · <span style={{ color: C.evergreen, fontVariantNumeric: "tabular-nums" }}>$94,247</span>
            </div>

            <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 0 }}>
              {rows.map((row, i) => (
                <div key={row.name}>
                  <div style={{
                    display: "flex", flexDirection: "row", alignItems: "center",
                    gap: 12, paddingTop: 12, paddingBottom: 12,
                  }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: "50%",
                      background: i === 0 ? "#F9EDD4" : i === 1 ? "#D4E8FF" : "#D4F0FF",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontFamily: "var(--font-geist-sans)", fontWeight: 800, fontSize: 14,
                      color: C.dark, flexShrink: 0,
                    }}>
                      {row.initial}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{
                        fontFamily: "var(--font-geist-sans)", fontSize: 13, fontWeight: 700, color: C.dark,
                      }}>
                        {row.name}
                      </div>
                      <div style={{
                        fontFamily: "var(--font-geist-sans)", fontSize: 12, fontWeight: 600,
                        color: C.muted, fontVariantNumeric: "tabular-nums",
                      }}>
                        {row.amount}
                      </div>
                    </div>
                  </div>
                  {i < rows.length - 1 && (
                    <div style={{ height: 1, background: "rgba(14,15,12,0.08)" }} />
                  )}
                </div>
              ))}
            </div>

            {/* Bottom indicator */}
            <div style={{
              marginTop: 16, background: C.mint, borderRadius: 10, padding: "10px 14px",
              fontFamily: "var(--font-geist-sans)", fontSize: 12, fontWeight: 700,
              color: C.evergreen, textAlign: "center",
            }}>
              Live · Updated just now
            </div>
          </div>
        </div>
      </div>
    </SlideShell>
  );
}

// ─── Slide 7 – Why Now ────────────────────────────────────────────────────────
function Slide07({ n }: { n: number }) {
  const reasons = [
    {
      num: "01",
      title: "The church became a global product",
      body: "The pandemic forced every major congregation online. Viewership is now global and permanent — but the giving infrastructure never caught up. A giver watching from Lagos, London, or Seoul has no way to give.",
    },
    {
      num: "02",
      title: "Stablecoin rails finally work at scale",
      body: "USDC and on-chain FX settlement have reached the institutional-grade speed and cost profile needed for this use case. Sub-cent conversion, sub-10-second finality, globally accessible — the rails exist today that didn't exist three years ago.",
    },
    {
      num: "03",
      title: "Regulators are catching up, not cracking down",
      body: "The U.S., EU, and key emerging markets are establishing clear stablecoin frameworks in 2024–2025⁴. For the first time, a compliant cross-border stablecoin product can be built without regulatory ambiguity.",
    },
  ];

  return (
    <SlideShell bg={C.canvas} slideNumber={n}>
      <div style={{
        flex: 1, display: "flex", flexDirection: "column",
        paddingTop: 100, paddingLeft: 72, paddingRight: 72, paddingBottom: 60,
        maxWidth: 1000, margin: "0 auto", width: "100%",
      }}>
        <div style={{
          fontFamily: "var(--font-geist-sans)", fontSize: 11, fontWeight: 700,
          color: C.muted, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 20,
        }}>
          Why Now?
        </div>
        <h2 style={{
          fontFamily: "var(--font-geist-sans)", fontWeight: 800,
          fontSize: "clamp(28px,4vw,52px)",
          letterSpacing: "-0.03em", color: C.dark, margin: 0,
        }}>
          Three forces converging. Right now.
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: 0, marginTop: 40, maxWidth: 880 }}>
          {reasons.map((r, i) => (
            <div key={r.num} style={{
              display: "flex", flexDirection: "row", gap: 32,
              paddingTop: 28, paddingBottom: 28,
              borderBottom: i < reasons.length - 1 ? "1px solid rgba(14,15,12,0.08)" : "none",
              alignItems: "flex-start",
            }}>
              <div style={{
                fontFamily: "var(--font-geist-sans)", fontWeight: 900, fontSize: 44,
                color: C.mint, letterSpacing: "-0.03em", minWidth: 72,
                fontVariantNumeric: "tabular-nums", lineHeight: 1, flexShrink: 0,
              }}>
                {r.num}
              </div>
              <div>
                <div style={{
                  fontFamily: "var(--font-geist-sans)", fontWeight: 800, fontSize: 18,
                  color: C.dark, marginBottom: 8,
                }}>
                  {r.title}
                </div>
                <p style={{
                  fontFamily: "var(--font-geist-sans)", fontSize: 14, fontWeight: 600,
                  color: C.secondary, lineHeight: 1.65, margin: 0,
                }}>
                  {r.body}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div style={{
          marginTop: 16, fontFamily: "var(--font-geist-sans)", fontSize: 11,
          fontWeight: 600, color: C.muted,
        }}>
          ⁴ EU MiCA regulation effective June 2024; U.S. GENIUS Act advancing in Congress, 2025
        </div>
      </div>
    </SlideShell>
  );
}

// ─── Slide 8 – Growth Strategy ────────────────────────────────────────────────
function Slide08({ n }: { n: number }) {
  const rows = [
    {
      channel: "Global megachurches",
      how: "Land flagship churches with large international livestream audiences — single decision-maker (senior pastor + finance lead)",
      why: "They lose donations every Sunday from viewers who can't give",
    },
    {
      channel: "Denominations",
      how: "Each anchor sits inside a network of 200–5,000 affiliate churches sharing polity, audit, and banking",
      why: "Expand across the network at near-zero CAC",
    },
    {
      channel: "The giver network",
      how: "Once a giver has a ChurchPay account, they can give to any church on the platform",
      why: "Each new church adds givers; each new giver makes the next church easier to land",
    },
  ];

  return (
    <SlideShell bg={C.dark} slideNumber={n} dark>
      <div style={{
        flex: 1, display: "flex", flexDirection: "column",
        paddingTop: 100, paddingLeft: 72, paddingRight: 72, paddingBottom: 80,
        maxWidth: 1100, margin: "0 auto", width: "100%",
      }}>
        <div style={{
          fontFamily: "var(--font-geist-sans)", fontSize: 11, fontWeight: 700,
          color: C.mint, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 20,
        }}>
          How We Will Grow
        </div>
        <h2 style={{
          fontFamily: "var(--font-geist-sans)", fontWeight: 800,
          fontSize: "clamp(24px,3.5vw,44px)",
          color: C.canvas, letterSpacing: "-0.03em", margin: 0,
        }}>
          A compounding distribution engine.
        </h2>

        <table style={{
          marginTop: 40, width: "100%", borderCollapse: "collapse",
          fontFamily: "var(--font-geist-sans)",
        }}>
          <thead>
            <tr style={{ background: "rgba(255,255,255,0.06)" }}>
              {["CHANNEL", "HOW?", "WHY THEY CARE"].map((h) => (
                <th key={h} style={{
                  padding: "14px 20px", textAlign: "left",
                  fontSize: 11, fontWeight: 700,
                  color: "rgba(251,251,249,0.45)", letterSpacing: "0.08em",
                }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={row.channel} style={{
                borderBottom: i < rows.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
              }}>
                <td style={{
                  padding: "18px 20px", fontSize: 14, fontWeight: 700,
                  color: C.mint, verticalAlign: "top", minWidth: 180,
                }}>
                  {row.channel}
                </td>
                <td style={{
                  padding: "18px 20px", fontSize: 13, fontWeight: 600,
                  color: "rgba(251,251,249,0.8)", verticalAlign: "top", lineHeight: 1.55,
                }}>
                  {row.how}
                </td>
                <td style={{
                  padding: "18px 20px", fontSize: 13, fontWeight: 600,
                  color: "rgba(251,251,249,0.8)", verticalAlign: "top", lineHeight: 1.55,
                }}>
                  {row.why}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SlideShell>
  );
}

// ─── Slide 9 – Market Size ────────────────────────────────────────────────────
function Slide09({ n }: { n: number }) {
  return (
    <SlideShell bg={C.canvas} slideNumber={n}>
      <div style={{
        flex: 1, display: "flex", flexDirection: "column",
        paddingTop: 100, paddingLeft: 72, paddingRight: 72, paddingBottom: 60,
        maxWidth: 1100, margin: "0 auto", width: "100%",
      }}>
        <div style={{
          fontFamily: "var(--font-geist-sans)", fontSize: 11, fontWeight: 700,
          color: C.muted, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 20,
        }}>
          Market Size
        </div>
        <h2 style={{
          fontFamily: "var(--font-geist-sans)", fontWeight: 800,
          fontSize: "clamp(24px,3.5vw,44px)",
          letterSpacing: "-0.03em", color: C.dark, margin: 0,
        }}>
          A trillion-dollar category with no incumbent.
        </h2>

        {/* Three stat blocks */}
        <div style={{ display: "flex", flexDirection: "row", gap: 40, marginTop: 36 }}>
          {[
            { stat: "$1.5T",   label: "given by individuals worldwide in 2024¹·²" },
            { stat: "$146.5B", label: "given to religion in the U.S. alone in 2024¹" },
            { stat: "$905B",   label: "moved across borders in remittances in 2024, avg cost 6.65%²·³" },
          ].map(({ stat, label }) => (
            <div key={stat} style={{ flex: 1, borderLeft: `3px solid ${C.evergreen}`, paddingLeft: 20 }}>
              <div style={{
                fontFamily: "var(--font-geist-sans)", fontWeight: 900, fontSize: 40,
                color: C.evergreen, letterSpacing: "-0.03em", fontVariantNumeric: "tabular-nums", lineHeight: 1,
              }}>
                {stat}
              </div>
              <div style={{
                fontFamily: "var(--font-geist-sans)", fontSize: 12, fontWeight: 600,
                color: C.muted, marginTop: 6, lineHeight: 1.5,
              }}>
                {label}
              </div>
            </div>
          ))}
        </div>

        {/* TAM / SAM / SOM */}
        <div style={{ display: "flex", flexDirection: "row", gap: 20, marginTop: 36 }}>
          <div style={{
            flex: 1, background: C.evergreen, borderRadius: 30, padding: 28,
          }}>
            <div style={{ fontFamily: "var(--font-geist-sans)", fontSize: 11, fontWeight: 800, color: "rgba(226,246,213,0.6)", letterSpacing: "0.08em", textTransform: "uppercase" }}>TAM</div>
            <div style={{ fontFamily: "var(--font-geist-sans)", fontWeight: 900, fontSize: 38, color: C.mint, letterSpacing: "-0.03em", fontVariantNumeric: "tabular-nums", marginTop: 6 }}>$1.3T+</div>
            <div style={{ fontFamily: "var(--font-geist-sans)", fontSize: 13, fontWeight: 600, color: "rgba(226,246,213,0.65)", marginTop: 6, lineHeight: 1.4 }}>annual global religious giving</div>
          </div>
          <div style={{
            flex: 1, background: C.mint, borderRadius: 30, padding: 28,
          }}>
            <div style={{ fontFamily: "var(--font-geist-sans)", fontSize: 11, fontWeight: 800, color: "rgba(22,51,0,0.5)", letterSpacing: "0.08em", textTransform: "uppercase" }}>SAM</div>
            <div style={{ fontFamily: "var(--font-geist-sans)", fontWeight: 900, fontSize: 38, color: C.evergreen, letterSpacing: "-0.03em", fontVariantNumeric: "tabular-nums", marginTop: 6 }}>$135B</div>
            <div style={{ fontFamily: "var(--font-geist-sans)", fontSize: 13, fontWeight: 600, color: "rgba(22,51,0,0.65)", marginTop: 6, lineHeight: 1.4 }}>mid-to-large churches across 8 target markets</div>
          </div>
          <div style={{
            flex: 1, background: C.celebrate, borderRadius: 30, padding: 28,
          }}>
            <div style={{ fontFamily: "var(--font-geist-sans)", fontSize: 11, fontWeight: 800, color: "rgba(14,15,12,0.45)", letterSpacing: "0.08em", textTransform: "uppercase" }}>SOM</div>
            <div style={{ fontFamily: "var(--font-geist-sans)", fontWeight: 900, fontSize: 38, color: C.dark, letterSpacing: "-0.03em", fontVariantNumeric: "tabular-nums", marginTop: 6 }}>$210M ARR</div>
            <div style={{ fontFamily: "var(--font-geist-sans)", fontSize: 13, fontWeight: 600, color: "rgba(14,15,12,0.6)", marginTop: 6, lineHeight: 1.4 }}>Year 5: 1,500 churches × $14M avg annual flow × 1% net take</div>
          </div>
        </div>

        {/* Footnotes */}
        <div style={{
          marginTop: 20, fontFamily: "var(--font-geist-sans)", fontSize: 11,
          fontWeight: 600, color: C.muted, lineHeight: 1.8,
        }}>
          ¹ Giving USA 2025 &nbsp;&nbsp; ² World Bank / IOM, 2024 &nbsp;&nbsp; ³ World Bank RPW, Q2 2024
        </div>
      </div>
    </SlideShell>
  );
}

// ─── Slide 10 – Business Model ────────────────────────────────────────────────
function Slide10({ n }: { n: number }) {
  return (
    <SlideShell bg={C.canvas} slideNumber={n}>
      <div style={{
        flex: 1, display: "flex", flexDirection: "column",
        paddingTop: 100, paddingLeft: 72, paddingRight: 72, paddingBottom: 80,
        maxWidth: 1100, margin: "0 auto", width: "100%",
      }}>
        <div style={{
          fontFamily: "var(--font-geist-sans)", fontSize: 11, fontWeight: 700,
          color: C.muted, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 20,
        }}>
          Business Model
        </div>
        <h2 style={{
          fontFamily: "var(--font-geist-sans)", fontWeight: 800,
          fontSize: "clamp(24px,3.5vw,44px)",
          letterSpacing: "-0.03em", color: C.dark, margin: 0,
        }}>
          Three compounding revenue lines.
        </h2>

        <div style={{ display: "flex", flexDirection: "row", gap: 24, marginTop: 40 }}>
          {/* Card 1 */}
          <div style={{
            flex: 1, background: C.evergreen, borderRadius: 30, padding: 36,
            display: "flex", flexDirection: "column",
          }}>
            <div style={{ fontSize: 36 }}>💳</div>
            <div style={{
              fontFamily: "var(--font-geist-sans)", fontWeight: 800, fontSize: 19,
              color: C.mint, marginTop: 16,
            }}>
              Donation processing
            </div>
            <p style={{
              fontFamily: "var(--font-geist-sans)", fontSize: 13, fontWeight: 600,
              color: "rgba(226,246,213,0.75)", lineHeight: 1.65, marginTop: 10,
              flex: 1,
            }}>
              2.5% + $0.30 per transaction — same economics as PushPay, but works across borders.
            </p>
            <div style={{
              display: "inline-flex", marginTop: 16, alignSelf: "flex-start",
              background: C.mint, color: C.evergreen,
              borderRadius: 999, padding: "4px 12px",
              fontFamily: "var(--font-geist-sans)", fontSize: 11, fontWeight: 800,
              fontVariantNumeric: "tabular-nums",
            }}>
              ~50% of revenue at scale
            </div>
          </div>

          {/* Card 2 */}
          <div style={{
            flex: 1, background: C.mint, borderRadius: 30, padding: 36,
            display: "flex", flexDirection: "column",
          }}>
            <div style={{ fontSize: 36 }}>📈</div>
            <div style={{
              fontFamily: "var(--font-geist-sans)", fontWeight: 800, fontSize: 19,
              color: C.evergreen, marginTop: 16,
            }}>
              Yield on reserves
            </div>
            <p style={{
              fontFamily: "var(--font-geist-sans)", fontSize: 13, fontWeight: 600,
              color: "rgba(22,51,0,0.7)", lineHeight: 1.65, marginTop: 10,
              flex: 1,
            }}>
              1.5–2% net interest spread on USDC held in tokenized T-bills (BlackRock BUIDL, Ondo USDY). Compounds with platform balances.
            </p>
            <div style={{
              display: "inline-flex", marginTop: 16, alignSelf: "flex-start",
              background: C.evergreen, color: C.mint,
              borderRadius: 999, padding: "4px 12px",
              fontFamily: "var(--font-geist-sans)", fontSize: 11, fontWeight: 800,
            }}>
              ~35%
            </div>
          </div>

          {/* Card 3 */}
          <div style={{
            flex: 1, background: C.canvas,
            border: "2px solid rgba(14,15,12,0.12)",
            borderRadius: 30, padding: 36,
            display: "flex", flexDirection: "column",
          }}>
            <div style={{ fontSize: 36 }}>🗓️</div>
            <div style={{
              fontFamily: "var(--font-geist-sans)", fontWeight: 800, fontSize: 19,
              color: C.dark, marginTop: 16,
            }}>
              Subscription
            </div>
            <p style={{
              fontFamily: "var(--font-geist-sans)", fontSize: 13, fontWeight: 600,
              color: C.secondary, lineHeight: 1.65, marginTop: 10,
              flex: 1,
            }}>
              $299–$4,900/month per church for the operating-account dashboard, card issuance, and books integration.
            </p>
            <div style={{
              display: "inline-flex", marginTop: 16, alignSelf: "flex-start",
              background: "rgba(14,15,12,0.07)", color: C.muted,
              borderRadius: 999, padding: "4px 12px",
              fontFamily: "var(--font-geist-sans)", fontSize: 11, fontWeight: 800,
            }}>
              ~15%
            </div>
          </div>
        </div>
      </div>
    </SlideShell>
  );
}

// ─── Slide 11 – Closing / The Ask ─────────────────────────────────────────────
function Slide11({ n }: { n: number }) {
  return (
    <SlideShell bg={C.evergreen} slideNumber={n} dark>
      <div style={{
        flex: 1, display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        paddingLeft: 40, paddingRight: 40, paddingBottom: 80,
        textAlign: "center",
      }}>
        <div style={{
          fontFamily: "var(--font-geist-sans)", fontSize: 11, fontWeight: 700,
          color: "rgba(226,246,213,0.5)", letterSpacing: "0.1em", textTransform: "uppercase",
          marginBottom: 24,
        }}>
          Join us
        </div>
        <h2 style={{
          fontFamily: "var(--font-geist-sans)", fontWeight: 900,
          fontSize: "clamp(32px,5.5vw,68px)",
          color: C.mint, letterSpacing: "-0.04em", lineHeight: 0.92,
          maxWidth: 800, margin: 0,
        }}>
          The rail the global church has been waiting for.
        </h2>
        <p style={{
          fontFamily: "var(--font-geist-sans)", fontSize: 16, fontWeight: 600,
          color: "rgba(226,246,213,0.7)", lineHeight: 1.65,
          maxWidth: 600, marginTop: 24, marginBottom: 0,
        }}>
          ChurchPay is building the financial infrastructure for the global church — starting with the one transaction no one else can process: a donation that crosses a border.
        </p>
        <div style={{
          marginTop: 48, display: "flex", flexDirection: "column", gap: 12, alignItems: "center",
        }}>
          <div style={{
            fontFamily: "var(--font-geist-sans)", fontSize: 15, fontWeight: 700,
            color: C.mint, letterSpacing: "-0.01em",
          }}>
            Raising · hello@churchpay.com · churchpay.com
          </div>
        </div>
      </div>
      {/* Footer */}
      <div style={{
        position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)",
        fontFamily: "var(--font-geist-sans)", fontSize: 12, fontWeight: 600,
        color: "rgba(226,246,213,0.35)",
      }}>
        Olayinka Akinhanmi · Obi
      </div>
    </SlideShell>
  );
}

// ─── Slide metadata ───────────────────────────────────────────────────────────
const SLIDE_LABELS = [
  "Cover",
  "Meet the Team",
  "Opportunity",
  "Our Solution",
  "How it Works",
  "What the Church Gets",
  "Why Now",
  "Growth Strategy",
  "Market Size",
  "Business Model",
  "The Ask",
];

// ─── Navigation bar ───────────────────────────────────────────────────────────
function NavBar({
  current, total, onPrev, onNext,
}: {
  current: number; total: number; onPrev: () => void; onNext: () => void;
}) {
  const isDarkSlide = [0, 3, 5, 7, 10].includes(current);
  const navBg = isDarkSlide
    ? "rgba(14,15,12,0.92)"
    : "rgba(251,251,249,0.95)";
  const navBorder = isDarkSlide
    ? "1px solid rgba(255,255,255,0.08)"
    : "1px solid rgba(14,15,12,0.08)";
  const labelColor = isDarkSlide ? "rgba(226,246,213,0.45)" : C.muted;
  const countColor = isDarkSlide ? "rgba(226,246,213,0.55)" : C.muted;
  const dotActive  = isDarkSlide ? C.mint    : C.evergreen;
  const dotInactive = isDarkSlide ? "rgba(255,255,255,0.18)" : "rgba(14,15,12,0.15)";

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
      {/* Left: slide label */}
      <div style={{
        fontFamily: "var(--font-geist-sans)", fontSize: 12, fontWeight: 600,
        color: labelColor, minWidth: 180, flexShrink: 0,
      }}>
        {SLIDE_LABELS[current]}
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

      {/* Right: prev / next buttons */}
      <div style={{ display: "flex", flexDirection: "row", gap: 8, flexShrink: 0 }}>
        <button
          onClick={onPrev}
          disabled={current === 0}
          aria-label="Previous slide"
          style={{
            width: 40, height: 40, borderRadius: 999,
            background: current === 0
              ? (isDarkSlide ? "rgba(255,255,255,0.06)" : "rgba(14,15,12,0.05)")
              : C.evergreen,
            border: "none", cursor: current === 0 ? "default" : "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "background 0.2s ease",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 12L6 8L10 4" stroke={current === 0 ? C.muted : C.mint} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button
          onClick={onNext}
          disabled={current === total - 1}
          aria-label="Next slide"
          style={{
            width: 40, height: 40, borderRadius: 999,
            background: current === total - 1
              ? (isDarkSlide ? "rgba(255,255,255,0.06)" : "rgba(14,15,12,0.05)")
              : C.evergreen,
            border: "none", cursor: current === total - 1 ? "default" : "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "background 0.2s ease",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6 4L10 8L6 12" stroke={current === total - 1 ? C.muted : C.mint} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
const TOTAL = 11;

export default function PitchPage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const goNext = useCallback(() => setCurrentSlide((s) => Math.min(s + 1, TOTAL - 1)), []);
  const goPrev = useCallback(() => setCurrentSlide((s) => Math.max(s - 1, 0)), []);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") goNext();
      if (e.key === "ArrowLeft"  || e.key === "ArrowUp")   goPrev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [goNext, goPrev]);

  const slides = [
    <Slide01 n={1}  key={0} />,
    <Slide02 n={2}  key={1} />,
    <Slide03 n={3}  key={2} />,
    <Slide04 n={4}  key={3} />,
    <Slide05 n={5}  key={4} />,
    <Slide06 n={6}  key={5} />,
    <Slide07 n={7}  key={6} />,
    <Slide08 n={8}  key={7} />,
    <Slide09 n={9}  key={8} />,
    <Slide10 n={10} key={9} />,
    <Slide11 n={11} key={10} />,
  ];

  return (
    <div style={{ position: "fixed", inset: 0, overflow: "hidden", background: C.dark }}>
      {/* Slide stack */}
      <div style={{ position: "relative", width: "100%", height: "100vh" }}>
        {slides.map((slide, i) => {
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
                  : offset > 0 ? "translateX(6%)" : "translateX(-6%)",
                transition: "opacity 0.4s cubic-bezier(0.4,0,0.2,1), transform 0.4s cubic-bezier(0.4,0,0.2,1)",
                pointerEvents: isActive ? "auto" : "none",
                zIndex: isActive ? 1 : 0,
              }}
            >
              {slide}
            </div>
          );
        })}
      </div>

      {/* Navigation */}
      <NavBar
        current={currentSlide}
        total={TOTAL}
        onPrev={goPrev}
        onNext={goNext}
      />
    </div>
  );
}
