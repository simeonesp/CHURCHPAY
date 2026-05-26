"use client";

import Link from "next/link";

// ─── Brand tokens ───────────────────────────────────────────────────────────
const C = {
  canvas:     "#FBFBF9",
  dark:       "#0E0F0C",
  evergreen:  "#163300",
  mint:       "#E2F6D5",
  celebrate:  "#FFC091",
  textPrimary:"#0E0F0C",
  textSecond: "#454745",
  textMuted:  "#868685",
  border:     "rgba(14,15,12,0.12)",
  borderSoft: "rgba(14,15,12,0.08)",
};

// ─── Reusable primitives ─────────────────────────────────────────────────────

function PillButton({
  children,
  bg,
  color,
  height = 40,
  px = 20,
  fontSize = 14,
  border,
  style,
}: {
  children: React.ReactNode;
  bg: string;
  color: string;
  height?: number;
  px?: number;
  fontSize?: number;
  border?: string;
  style?: React.CSSProperties;
}) {
  return (
    <button
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        height,
        paddingLeft: px,
        paddingRight: px,
        borderRadius: 9999,
        backgroundColor: bg,
        color,
        fontSize,
        fontWeight: 700,
        border: border ?? "none",
        cursor: "pointer",
        fontFamily: "var(--font-geist-sans)",
        whiteSpace: "nowrap",
        letterSpacing: "-0.01em",
        ...style,
      }}
    >
      {children}
    </button>
  );
}

function SectionLabel({ children, light = false }: { children: string; light?: boolean }) {
  return (
    <p
      style={{
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: "0.15em",
        textTransform: "uppercase",
        color: light ? "rgba(226,246,213,0.6)" : C.textMuted,
        marginBottom: 20,
      }}
    >
      {children}
    </p>
  );
}

// ─── 1. NAVBAR ───────────────────────────────────────────────────────────────
function Navbar() {
  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 64,
        zIndex: 50,
        backgroundColor: C.canvas,
        borderBottom: `1px solid ${C.borderSoft}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 40px",
      }}
    >
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            backgroundColor: C.evergreen,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          {/* Arrow-up icon */}
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 12V4M8 4L4.5 7.5M8 4L11.5 7.5" stroke={C.mint} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <span
          style={{
            fontFamily: "var(--font-geist-sans)",
            fontWeight: 800,
            fontSize: 17,
            color: C.dark,
            letterSpacing: "-0.02em",
          }}
        >
          ChurchPay
        </span>
      </div>

      {/* Center links */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 32,
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        {["How it works", "For churches", "Pricing", "Security"].map((link) => (
          <a
            key={link}
            href="#"
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: C.textSecond,
              textDecoration: "none",
              fontFamily: "var(--font-geist-sans)",
            }}
          >
            {link}
          </a>
        ))}
      </div>

      {/* Right side */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <a
          href="#"
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: C.textSecond,
            textDecoration: "none",
            fontFamily: "var(--font-geist-sans)",
          }}
        >
          Log in
        </a>
        <PillButton bg={C.evergreen} color={C.mint} height={40} px={20} fontSize={14}>
          Get started
        </PillButton>
      </div>
    </nav>
  );
}

// ─── Hero phone mockup ────────────────────────────────────────────────────────
function HeroPhone() {
  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      {/* Phone frame */}
      <div
        style={{
          width: 375,
          height: 680,
          borderRadius: 40,
          backgroundColor: C.dark,
          border: `8px solid ${C.dark}`,
          boxShadow: "0 40px 80px rgba(14,15,12,0.18)",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* Screen */}
        <div
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: C.canvas,
            display: "flex",
            flexDirection: "column",
            padding: "24px 20px 20px",
            boxSizing: "border-box",
          }}
        >
          {/* Top bar */}
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <span
              style={{
                fontSize: 13,
                fontWeight: 800,
                color: C.evergreen,
                letterSpacing: "-0.02em",
                fontFamily: "var(--font-geist-sans)",
              }}
            >
              ChurchPay
            </span>
          </div>

          {/* Church info */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
              marginBottom: 16,
            }}
          >
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: "50%",
                backgroundColor: C.mint,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L12 6M12 2L9 5M12 2L15 5" stroke={C.evergreen} strokeWidth="1.8" strokeLinecap="round" />
                <path d="M4 10H20V21H4V10Z" stroke={C.evergreen} strokeWidth="1.8" strokeLinejoin="round" />
                <path d="M9 21V15H15V21" stroke={C.evergreen} strokeWidth="1.8" strokeLinejoin="round" />
                <path d="M2 10L12 4L22 10" stroke={C.evergreen} strokeWidth="1.8" strokeLinejoin="round" />
              </svg>
            </div>
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  fontSize: 16,
                  fontWeight: 800,
                  color: C.dark,
                  fontFamily: "var(--font-geist-sans)",
                }}
              >
                Lakewood Church
              </div>
              <div style={{ fontSize: 12, fontWeight: 600, color: C.textMuted }}>Houston, TX</div>
            </div>
            {/* Verified badge */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 4,
                backgroundColor: C.mint,
                borderRadius: 9999,
                padding: "3px 10px",
              }}
            >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M2 5L4 7L8 3" stroke={C.evergreen} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: C.evergreen,
                  fontFamily: "var(--font-geist-sans)",
                }}
              >
                Verified church
              </span>
            </div>
          </div>

          {/* Divider */}
          <div
            style={{
              height: 1,
              backgroundColor: C.border,
              margin: "8px 0 20px",
            }}
          />

          {/* Fund option */}
          <div
            style={{
              border: `1.5px solid ${C.evergreen}`,
              borderRadius: 12,
              padding: "12px 16px",
              marginBottom: 10,
              backgroundColor: "rgba(22,51,0,0.04)",
            }}
          >
            <div style={{ fontSize: 12, fontWeight: 700, color: C.evergreen }}>General Offering</div>
            <div style={{ fontSize: 11, fontWeight: 600, color: C.textMuted }}>Supporting all ministries</div>
          </div>
          <div
            style={{
              border: `1px solid ${C.border}`,
              borderRadius: 12,
              padding: "12px 16px",
              marginBottom: 20,
            }}
          >
            <div style={{ fontSize: 12, fontWeight: 700, color: C.dark }}>Building Fund</div>
            <div style={{ fontSize: 11, fontWeight: 600, color: C.textMuted }}>New sanctuary project</div>
          </div>

          {/* Spacer */}
          <div style={{ flex: 1 }} />

          {/* CTA */}
          <div
            style={{
              backgroundColor: C.evergreen,
              borderRadius: 9999,
              height: 52,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 12,
            }}
          >
            <span
              style={{
                color: C.mint,
                fontSize: 15,
                fontWeight: 700,
                fontFamily: "var(--font-geist-sans)",
              }}
            >
              Give
            </span>
          </div>

          {/* Footer tiny */}
          <div style={{ textAlign: "center" }}>
            <span
              style={{
                fontSize: 10,
                color: C.textMuted,
                fontWeight: 600,
                fontFamily: "var(--font-geist-sans)",
              }}
            >
              Secured by ChurchPay · Regulated custodian
            </span>
          </div>
        </div>
      </div>

      {/* Floating conversion card */}
      <div
        style={{
          position: "absolute",
          bottom: -20,
          right: -80,
          backgroundColor: "#fff",
          borderRadius: 16,
          border: `1px solid ${C.border}`,
          padding: "14px 20px",
          boxShadow: "0 8px 32px rgba(14,15,12,0.10)",
          minWidth: 200,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: "#22c55e",
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontSize: 18,
              fontWeight: 900,
              color: C.dark,
              fontVariantNumeric: "tabular-nums",
              letterSpacing: "-0.02em",
              fontFamily: "var(--font-geist-sans)",
            }}
          >
            &#8358;25,000 &#8594; $16.00
          </span>
        </div>
        <div
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: C.textMuted,
            fontFamily: "var(--font-geist-sans)",
          }}
        >
          Sent to Lakewood
        </div>
      </div>
    </div>
  );
}

// ─── 2. HERO ─────────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section
      style={{
        backgroundColor: C.canvas,
        paddingTop: 120,
        minHeight: "90vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        padding: "120px 40px 100px",
        boxSizing: "border-box",
      }}
    >
      {/* Headline */}
      <h1
        style={{
          maxWidth: 900,
          margin: "0 auto",
          fontSize: "clamp(56px, 8vw, 96px)",
          fontWeight: 900,
          lineHeight: 0.92,
          letterSpacing: "-0.04em",
          color: C.dark,
          fontFamily: "var(--font-geist-sans)",
        }}
      >
        GIVING WITHOUT
        <br />
        <span style={{ position: "relative", display: "inline-block" }}>
          <span
            style={{
              position: "relative",
              zIndex: 1,
              backgroundColor: C.mint,
              borderRadius: 12,
              padding: "0 16px",
              display: "inline-block",
            }}
          >
            BORDERS
          </span>
        </span>
      </h1>

      {/* Subheadline */}
      <p
        style={{
          maxWidth: 560,
          margin: "28px auto 0",
          fontSize: 18,
          fontWeight: 600,
          color: C.textSecond,
          lineHeight: 1.5,
          fontFamily: "var(--font-geist-sans)",
        }}
      >
        ChurchPay lets your diaspora congregation give in their currency. Your church receives in yours
        — instantly, verified, and with full audit records.
      </p>

      {/* CTA row */}
      <div
        style={{
          display: "flex",
          gap: 12,
          justifyContent: "center",
          flexWrap: "wrap",
          margin: "40px auto 0",
        }}
      >
        <PillButton bg={C.evergreen} color={C.mint} height={52} px={28} fontSize={16}>
          Start receiving giving
        </PillButton>
        <PillButton
          bg="transparent"
          color={C.dark}
          height={52}
          px={28}
          fontSize={16}
          border="1.5px solid rgba(14,15,12,0.18)"
        >
          See how it works
        </PillButton>
      </div>

      {/* Social proof strip */}
      <div
        style={{
          display: "flex",
          gap: 0,
          justifyContent: "center",
          flexWrap: "wrap",
          marginTop: 48,
          fontSize: 13,
          fontWeight: 600,
          color: C.textMuted,
          fontFamily: "var(--font-geist-sans)",
        }}
      >
        {["2,400+ churches", "47 countries", "No added FX fees", "Audit-grade records"].map(
          (item, i, arr) => (
            <span key={item} style={{ display: "flex", alignItems: "center" }}>
              {item}
              {i < arr.length - 1 && (
                <span style={{ margin: "0 16px", opacity: 0.4 }}>&#183;</span>
              )}
            </span>
          )
        )}
      </div>

      {/* Hero visual */}
      <div
        style={{
          marginTop: 72,
          display: "flex",
          justifyContent: "center",
          paddingBottom: 60,
        }}
      >
        <HeroPhone />
      </div>
    </section>
  );
}

// ─── 3. TRUST BAR ────────────────────────────────────────────────────────────
function TrustBar() {
  const orgs = ["Hillsong", "Redeemed Church", "RCCG", "Potter's House", "Elevation Church"];
  return (
    <section
      style={{
        backgroundColor: "#fff",
        borderTop: `1px solid ${C.borderSoft}`,
        borderBottom: `1px solid ${C.borderSoft}`,
        padding: "28px 40px",
        textAlign: "center",
      }}
    >
      <p
        style={{
          fontSize: 13,
          fontWeight: 600,
          color: C.textMuted,
          marginBottom: 20,
          fontFamily: "var(--font-geist-sans)",
        }}
      >
        Trusted by churches alongside
      </p>
      <div
        style={{
          display: "flex",
          gap: 12,
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {orgs.map((org) => (
          <div
            key={org}
            style={{
              backgroundColor: "#F0F0EE",
              color: C.textMuted,
              fontWeight: 700,
              fontSize: 13,
              borderRadius: 9999,
              padding: "10px 20px",
              fontFamily: "var(--font-geist-sans)",
              letterSpacing: "-0.01em",
            }}
          >
            {org}
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Mini QR code placeholder ─────────────────────────────────────────────────
function QRPlaceholder() {
  const cells = Array.from({ length: 64 }, (_, i) => {
    const row = Math.floor(i / 8);
    const col = i % 8;
    // Corner squares
    const isCorner =
      (row < 3 && col < 3) ||
      (row < 3 && col > 4) ||
      (row > 4 && col < 3);
    const filled = isCorner || Math.random() > 0.5;
    return filled;
  });

  return (
    <div
      style={{
        width: 80,
        height: 80,
        backgroundColor: C.mint,
        borderRadius: 8,
        padding: 8,
        display: "grid",
        gridTemplateColumns: "repeat(8, 1fr)",
        gap: 1,
        boxSizing: "border-box",
      }}
    >
      {cells.map((filled, i) => (
        <div
          key={i}
          style={{
            backgroundColor: filled ? C.evergreen : "transparent",
            borderRadius: 1,
          }}
        />
      ))}
    </div>
  );
}

// ─── Mini table rows ──────────────────────────────────────────────────────────
function MiniTable() {
  const rows = [
    { name: "Adewale O.", amount: "$16.00", date: "Today" },
    { name: "Ruth M.", amount: "£12.00", date: "Today" },
    { name: "James K.", amount: "Ksh 2,100", date: "Yesterday" },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {rows.map((row) => (
        <div
          key={row.name}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "6px 0",
            borderBottom: `1px solid ${C.border}`,
          }}
        >
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: C.dark }}>{row.name}</div>
            <div style={{ fontSize: 10, fontWeight: 600, color: C.textMuted }}>{row.date}</div>
          </div>
          <div
            style={{
              fontSize: 13,
              fontWeight: 800,
              color: C.evergreen,
              fontVariantNumeric: "tabular-nums",
              fontFamily: "var(--font-geist-sans)",
            }}
          >
            {row.amount}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── 4. HOW IT WORKS ─────────────────────────────────────────────────────────
function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      style={{
        backgroundColor: C.canvas,
        padding: "120px 40px",
        textAlign: "center",
      }}
    >
      <SectionLabel>HOW IT WORKS</SectionLabel>
      <h2
        style={{
          fontSize: "clamp(40px, 6vw, 72px)",
          fontWeight: 900,
          lineHeight: 0.95,
          letterSpacing: "-0.03em",
          color: C.dark,
          fontFamily: "var(--font-geist-sans)",
          margin: 0,
        }}
      >
        THREE STEPS TO
        <br />
        GLOBAL GIVING
      </h2>

      <div
        style={{
          display: "flex",
          gap: 40,
          marginTop: 72,
          flexWrap: "wrap",
          justifyContent: "center",
          textAlign: "left",
        }}
      >
        {/* Step 1 */}
        <div style={{ flex: "1 1 280px", maxWidth: 340 }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              backgroundColor: C.evergreen,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 20,
            }}
          >
            <span
              style={{
                color: C.mint,
                fontSize: 15,
                fontWeight: 900,
                fontFamily: "var(--font-geist-sans)",
              }}
            >
              01
            </span>
          </div>
          <h3
            style={{
              fontSize: 22,
              fontWeight: 800,
              color: C.dark,
              marginBottom: 10,
              fontFamily: "var(--font-geist-sans)",
              letterSpacing: "-0.02em",
            }}
          >
            Share your give link
          </h3>
          <p
            style={{
              fontSize: 15,
              fontWeight: 600,
              color: C.textSecond,
              lineHeight: 1.6,
              marginBottom: 24,
            }}
          >
            Place the QR code on screens during service. Members scan — no app needed.
          </p>
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: 16,
              border: `1px solid ${C.border}`,
              padding: 24,
              height: 160,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
            }}
          >
            <QRPlaceholder />
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: C.textMuted,
                fontFamily: "var(--font-geist-sans)",
                letterSpacing: "0.05em",
              }}
            >
              churchpay.co/lakewood
            </div>
          </div>
        </div>

        {/* Step 2 */}
        <div style={{ flex: "1 1 280px", maxWidth: 340 }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              backgroundColor: C.evergreen,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 20,
            }}
          >
            <span
              style={{
                color: C.mint,
                fontSize: 15,
                fontWeight: 900,
                fontFamily: "var(--font-geist-sans)",
              }}
            >
              02
            </span>
          </div>
          <h3
            style={{
              fontSize: 22,
              fontWeight: 800,
              color: C.dark,
              marginBottom: 10,
              fontFamily: "var(--font-geist-sans)",
              letterSpacing: "-0.02em",
            }}
          >
            Give in any currency
          </h3>
          <p
            style={{
              fontSize: 15,
              fontWeight: 600,
              color: C.textSecond,
              lineHeight: 1.6,
              marginBottom: 24,
            }}
          >
            Members give in their local currency — Naira, Pounds, Dollars, Ksh. Conversion shown before they confirm.
          </p>
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: 16,
              border: `1px solid ${C.border}`,
              padding: 24,
              height: 160,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                fontSize: 32,
                fontWeight: 900,
                color: C.dark,
                fontVariantNumeric: "tabular-nums",
                letterSpacing: "-0.03em",
                fontFamily: "var(--font-geist-sans)",
                lineHeight: 1,
              }}
            >
              &#8358;25,000
            </div>
            <div
              style={{
                fontSize: 20,
                fontWeight: 700,
                color: C.textMuted,
                marginTop: 6,
                fontVariantNumeric: "tabular-nums",
                fontFamily: "var(--font-geist-sans)",
              }}
            >
              &#8594; $16
            </div>
            <div
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: C.textMuted,
                marginTop: 10,
                backgroundColor: "#F0F0EE",
                borderRadius: 9999,
                padding: "3px 10px",
              }}
            >
              Live interbank rate
            </div>
          </div>
        </div>

        {/* Step 3 */}
        <div style={{ flex: "1 1 280px", maxWidth: 340 }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              backgroundColor: C.evergreen,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 20,
            }}
          >
            <span
              style={{
                color: C.mint,
                fontSize: 15,
                fontWeight: 900,
                fontFamily: "var(--font-geist-sans)",
              }}
            >
              03
            </span>
          </div>
          <h3
            style={{
              fontSize: 22,
              fontWeight: 800,
              color: C.dark,
              marginBottom: 10,
              fontFamily: "var(--font-geist-sans)",
              letterSpacing: "-0.02em",
            }}
          >
            You receive, reconciled
          </h3>
          <p
            style={{
              fontSize: 15,
              fontWeight: 600,
              color: C.textSecond,
              lineHeight: 1.6,
              marginBottom: 24,
            }}
          >
            Funds arrive in your bank account, fully attributed, export-ready for your accountant.
          </p>
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: 16,
              border: `1px solid ${C.border}`,
              padding: 24,
              height: 160,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <MiniTable />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Mini card render ─────────────────────────────────────────────────────────
function MiniCardRender() {
  return (
    <div
      style={{
        width: 150,
        height: 95,
        borderRadius: 12,
        background: "linear-gradient(135deg, #163300, #254a0f)",
        padding: "14px 16px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span
          style={{
            fontSize: 10,
            fontWeight: 700,
            color: "rgba(226,246,213,0.8)",
            fontFamily: "var(--font-geist-sans)",
          }}
        >
          CHURCHPAY
        </span>
        <div
          style={{
            width: 18,
            height: 13,
            borderRadius: 2,
            background: "rgba(226,246,213,0.3)",
          }}
        />
      </div>
      <div>
        <div
          style={{
            fontSize: 12,
            fontWeight: 700,
            color: "rgba(226,246,213,0.9)",
            letterSpacing: "0.12em",
            fontFamily: "var(--font-geist-sans)",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          &#183;&#183;&#183;&#183; 4821
        </div>
      </div>
    </div>
  );
}

// ─── Mini report preview ──────────────────────────────────────────────────────
function MiniReport() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <div
        style={{
          height: 12,
          width: "70%",
          backgroundColor: "rgba(14,15,12,0.15)",
          borderRadius: 4,
        }}
      />
      <div
        style={{
          height: 8,
          width: "90%",
          backgroundColor: "rgba(14,15,12,0.08)",
          borderRadius: 4,
        }}
      />
      <div
        style={{
          height: 8,
          width: "80%",
          backgroundColor: "rgba(14,15,12,0.08)",
          borderRadius: 4,
        }}
      />
      <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
        {[40, 60, 50, 45, 70, 55, 65].map((h, i) => (
          <div
            key={i}
            style={{
              height: h,
              width: 10,
              backgroundColor: "rgba(22,51,0,0.25)",
              borderRadius: 3,
              alignSelf: "flex-end",
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ─── 5. WHAT CHURCHPAY ENABLES ───────────────────────────────────────────────
function EnablesSection() {
  return (
    <section
      style={{
        backgroundColor: C.dark,
        padding: "120px 40px",
        color: C.canvas,
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <SectionLabel light>WHAT CHURCHPAY ENABLES</SectionLabel>
        <h2
          style={{
            fontSize: "clamp(40px, 6vw, 72px)",
            fontWeight: 900,
            lineHeight: 0.95,
            letterSpacing: "-0.03em",
            color: C.canvas,
            fontFamily: "var(--font-geist-sans)",
            margin: "0 0 72px",
            maxWidth: 700,
          }}
        >
          EVERYTHING YOUR FINANCE LEAD NEEDS
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 24,
          }}
        >
          {/* Tile 1 — Giving */}
          <div
            style={{
              backgroundColor: C.evergreen,
              borderRadius: 30,
              padding: 40,
              gridRow: "span 1",
            }}
          >
            <div
              style={{
                display: "inline-block",
                backgroundColor: "rgba(226,246,213,0.15)",
                color: C.mint,
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.1em",
                borderRadius: 9999,
                padding: "4px 12px",
                marginBottom: 20,
                fontFamily: "var(--font-geist-sans)",
              }}
            >
              GIVING
            </div>
            <h3
              style={{
                fontSize: 24,
                fontWeight: 800,
                color: C.canvas,
                marginBottom: 12,
                fontFamily: "var(--font-geist-sans)",
                letterSpacing: "-0.02em",
                lineHeight: 1.2,
              }}
            >
              Multi-currency, zero added fees
            </h3>
            <p
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: "rgba(251,251,249,0.7)",
                lineHeight: 1.6,
                marginBottom: 28,
              }}
            >
              Accept giving in 30+ currencies. Members see the exact FX rate before they give.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {["&#8358; NGN", "&#163; GBP", "$ USD", "KSh KES"].map((chip, i) => (
                <div
                  key={i}
                  style={{
                    backgroundColor: "rgba(226,246,213,0.15)",
                    color: C.mint,
                    fontSize: 12,
                    fontWeight: 700,
                    borderRadius: 9999,
                    padding: "6px 14px",
                    fontFamily: "var(--font-geist-sans)",
                    fontVariantNumeric: "tabular-nums",
                  }}
                  dangerouslySetInnerHTML={{ __html: chip }}
                />
              ))}
            </div>
          </div>

          {/* Tile 2 — Cards */}
          <div
            style={{
              backgroundColor: C.mint,
              borderRadius: 30,
              padding: 40,
            }}
          >
            <div
              style={{
                display: "inline-block",
                backgroundColor: "rgba(22,51,0,0.12)",
                color: C.evergreen,
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.1em",
                borderRadius: 9999,
                padding: "4px 12px",
                marginBottom: 20,
                fontFamily: "var(--font-geist-sans)",
              }}
            >
              CARDS
            </div>
            <h3
              style={{
                fontSize: 24,
                fontWeight: 800,
                color: C.dark,
                marginBottom: 12,
                fontFamily: "var(--font-geist-sans)",
                letterSpacing: "-0.02em",
                lineHeight: 1.2,
              }}
            >
              Virtual &amp; physical spend cards
            </h3>
            <p
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: C.textSecond,
                lineHeight: 1.6,
                marginBottom: 28,
              }}
            >
              Issue cards for staff and ministries. Set limits, freeze instantly, track every transaction.
            </p>
            <MiniCardRender />
          </div>

          {/* Tile 3 — Records */}
          <div
            style={{
              backgroundColor: C.mint,
              borderRadius: 30,
              padding: 40,
            }}
          >
            <div
              style={{
                display: "inline-block",
                backgroundColor: "rgba(22,51,0,0.12)",
                color: C.evergreen,
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.1em",
                borderRadius: 9999,
                padding: "4px 12px",
                marginBottom: 20,
                fontFamily: "var(--font-geist-sans)",
              }}
            >
              RECORDS
            </div>
            <h3
              style={{
                fontSize: 24,
                fontWeight: 800,
                color: C.dark,
                marginBottom: 12,
                fontFamily: "var(--font-geist-sans)",
                letterSpacing: "-0.02em",
                lineHeight: 1.2,
              }}
            >
              Board-ready reports in one click
            </h3>
            <p
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: C.textSecond,
                lineHeight: 1.6,
                marginBottom: 28,
              }}
            >
              Generate auditor-formatted PDF reports. Every gift traceable, every payout documented.
            </p>
            <MiniReport />
          </div>

          {/* Tile 4 — Payouts */}
          <div
            style={{
              backgroundColor: C.celebrate,
              borderRadius: 30,
              padding: 40,
            }}
          >
            <div
              style={{
                display: "inline-block",
                backgroundColor: "rgba(14,15,12,0.1)",
                color: C.dark,
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.1em",
                borderRadius: 9999,
                padding: "4px 12px",
                marginBottom: 20,
                fontFamily: "var(--font-geist-sans)",
              }}
            >
              PAYOUTS
            </div>
            <h3
              style={{
                fontSize: 24,
                fontWeight: 800,
                color: C.dark,
                marginBottom: 12,
                fontFamily: "var(--font-geist-sans)",
                letterSpacing: "-0.02em",
                lineHeight: 1.2,
              }}
            >
              Withdraw any time. No lockups.
            </h3>
            <p
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: C.textSecond,
                lineHeight: 1.6,
                marginBottom: 28,
              }}
            >
              Funds held 1:1 by a regulated custodian. Withdraw to your bank account whenever you want.
            </p>
            <div
              style={{
                fontSize: 36,
                fontWeight: 900,
                color: C.dark,
                fontVariantNumeric: "tabular-nums",
                letterSpacing: "-0.03em",
                fontFamily: "var(--font-geist-sans)",
              }}
            >
              $24,830.00
            </div>
            <div
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: C.textSecond,
                marginTop: 4,
              }}
            >
              Available to withdraw
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── 6. BIG STAT ─────────────────────────────────────────────────────────────
function BigStatSection() {
  return (
    <section
      style={{
        backgroundColor: C.canvas,
        padding: "120px 40px",
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontSize: "clamp(72px, 14vw, 160px)",
          fontWeight: 900,
          letterSpacing: "-0.04em",
          color: C.evergreen,
          fontVariantNumeric: "tabular-nums",
          fontFamily: "var(--font-geist-sans)",
          lineHeight: 0.9,
        }}
      >
        $8.4M
      </div>
      <div
        style={{
          fontSize: 20,
          fontWeight: 700,
          color: C.dark,
          marginTop: 24,
          fontFamily: "var(--font-geist-sans)",
        }}
      >
        received by churches last month
      </div>
      <div
        style={{
          fontSize: 15,
          color: C.textMuted,
          fontWeight: 600,
          marginTop: 12,
          fontFamily: "var(--font-geist-sans)",
        }}
      >
        from 47 countries &#183; 2,400+ verified churches &#183; growing every Sunday
      </div>
    </section>
  );
}

// ─── 6b. SCAN · GIVE · KEEP ──────────────────────────────────────────────────
function ScanGiveKeepSection() {
  const tiles = [
    {
      bg: "#E2F6D5",
      textColor: "#163300",
      icon: (
        <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
          <circle cx="22" cy="22" r="14" stroke="#163300" strokeWidth="3.5" fill="none"/>
          <path d="M32 32L44 44" stroke="#163300" strokeWidth="3.5" strokeLinecap="round"/>
          <path d="M17 22h10M22 17v10" stroke="#163300" strokeWidth="2.5" strokeLinecap="round"/>
        </svg>
      ),
      heading: "SCAN",
      body: "Type a 5-character code or scan the QR code on screen. No menus to dig through — just your church, ministry or cause.",
    },
    {
      bg: "#163300",
      textColor: "#E2F6D5",
      icon: (
        <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
          <rect x="6" y="14" width="40" height="26" rx="5" stroke="#E2F6D5" strokeWidth="3" fill="none"/>
          <path d="M6 22h40" stroke="#E2F6D5" strokeWidth="3"/>
          <rect x="12" y="30" width="10" height="4" rx="2" fill="#E2F6D5"/>
          <circle cx="38" cy="32" r="3" fill="#E2F6D5"/>
        </svg>
      ),
      heading: "GIVE",
      body: "Choose an amount in your currency. Tithe, offering, building fund, missions — give to exactly the right place. See the rate before you confirm.",
    },
    {
      bg: "#FFC091",
      textColor: "#0E0F0C",
      icon: (
        <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
          <rect x="12" y="6" width="28" height="40" rx="4" stroke="#0E0F0C" strokeWidth="3" fill="none"/>
          <path d="M19 18h14M19 25h14M19 32h9" stroke="#0E0F0C" strokeWidth="2.5" strokeLinecap="round"/>
          <path d="M32 36l3 3 5-5" stroke="#0E0F0C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      heading: "KEEP",
      body: "Get an instant, currency-correct receipt. Download or export your full giving statement any time — audit-ready from day one.",
    },
  ];

  return (
    <section style={{ backgroundColor: C.canvas, padding: "100px 40px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Label */}
        <div
          style={{
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: C.evergreen,
            fontFamily: "var(--font-geist-sans)",
            marginBottom: 20,
          }}
        >
          HOW GIVING WORKS ON CHURCHPAY
        </div>

        {/* Heading */}
        <div
          style={{
            fontSize: "clamp(40px, 6vw, 72px)",
            fontWeight: 900,
            lineHeight: 0.92,
            letterSpacing: "-0.03em",
            color: C.dark,
            fontFamily: "var(--font-geist-sans)",
            marginBottom: 56,
            maxWidth: 800,
          }}
        >
          SCAN IT. GIVE IT.
          <br />
          KEEP THE RECORD.
        </div>

        {/* Tiles */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 20,
          }}
        >
          {tiles.map((tile) => (
            <div
              key={tile.heading}
              style={{
                backgroundColor: tile.bg,
                borderRadius: 24,
                padding: "40px 36px 40px",
                display: "flex",
                flexDirection: "column",
                minHeight: 340,
              }}
            >
              {/* Icon top */}
              <div style={{ marginBottom: "auto", paddingBottom: 40 }}>
                {tile.icon}
              </div>

              {/* Heading */}
              <div
                style={{
                  fontSize: 22,
                  fontWeight: 900,
                  letterSpacing: "-0.02em",
                  color: tile.textColor,
                  fontFamily: "var(--font-geist-sans)",
                  marginBottom: 12,
                }}
              >
                {tile.heading}
              </div>

              {/* Body */}
              <div
                style={{
                  fontSize: 15,
                  fontWeight: 600,
                  lineHeight: 1.55,
                  color: tile.textColor,
                  opacity: 0.8,
                  fontFamily: "var(--font-geist-sans)",
                }}
              >
                {tile.body}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Giver phone mockup ───────────────────────────────────────────────────────
function GiverPhone() {
  return (
    <div
      style={{
        width: 300,
        borderRadius: 32,
        border: "6px solid rgba(255,255,255,0.15)",
        backgroundColor: C.canvas,
        padding: 24,
        boxSizing: "border-box",
      }}
    >
      {/* Currency selector */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          backgroundColor: "rgba(226,246,213,0.15)",
          borderRadius: 9999,
          padding: "6px 14px",
          marginBottom: 16,
        }}
      >
        <span
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: C.mint,
            fontFamily: "var(--font-geist-sans)",
          }}
        >
          &#8358; Nigerian Naira
        </span>
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path d="M2 4L5 7L8 4" stroke={C.mint} strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>

      {/* Big amount */}
      <div
        style={{
          fontSize: 64,
          fontWeight: 900,
          color: C.canvas,
          fontVariantNumeric: "tabular-nums",
          letterSpacing: "-0.04em",
          lineHeight: 1,
          fontFamily: "var(--font-geist-sans)",
          marginBottom: 20,
        }}
      >
        25,000
      </div>

      {/* Suggested pills */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
        {[
          { label: "&#8358;5,000", selected: false },
          { label: "&#8358;10,000", selected: false },
          { label: "&#8358;25,000", selected: true },
        ].map((pill, i) => (
          <div
            key={i}
            style={{
              borderRadius: 9999,
              padding: "6px 14px",
              fontSize: 13,
              fontWeight: 700,
              fontFamily: "var(--font-geist-sans)",
              backgroundColor: pill.selected ? C.mint : "rgba(255,255,255,0.1)",
              color: pill.selected ? C.evergreen : "rgba(251,251,249,0.6)",
              fontVariantNumeric: "tabular-nums",
            }}
            dangerouslySetInnerHTML={{ __html: pill.label }}
          />
        ))}
      </div>

      {/* Conversion line */}
      <div
        style={{
          fontSize: 12,
          fontWeight: 600,
          color: "rgba(251,251,249,0.5)",
          fontFamily: "var(--font-geist-sans)",
          marginBottom: 20,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        You give &#8358;25,000 &#183; Lakewood receives $16
      </div>

      {/* Continue button */}
      <div
        style={{
          backgroundColor: C.mint,
          borderRadius: 9999,
          height: 48,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            color: C.evergreen,
            fontSize: 15,
            fontWeight: 700,
            fontFamily: "var(--font-geist-sans)",
          }}
        >
          Continue
        </span>
      </div>
    </div>
  );
}

// ─── 7. FOR YOUR CONGREGATION ─────────────────────────────────────────────────
function CongregationSection() {
  return (
    <section
      style={{
        backgroundColor: C.evergreen,
        padding: "120px 40px",
        color: C.canvas,
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          display: "flex",
          gap: 80,
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {/* Left column */}
        <div style={{ flex: "1 1 340px" }}>
          <div
            style={{
              display: "inline-block",
              backgroundColor: "rgba(226,246,213,0.15)",
              color: C.mint,
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.1em",
              borderRadius: 9999,
              padding: "4px 12px",
              marginBottom: 24,
              fontFamily: "var(--font-geist-sans)",
            }}
          >
            FOR GIVERS
          </div>
          <h2
            style={{
              fontSize: "clamp(36px, 5vw, 64px)",
              fontWeight: 900,
              lineHeight: 0.92,
              letterSpacing: "-0.03em",
              color: C.canvas,
              fontFamily: "var(--font-geist-sans)",
              margin: "0 0 24px",
            }}
          >
            GIVE IN SECONDS.
            <br />
            FROM ANYWHERE.
          </h2>
          <p
            style={{
              color: "rgba(251,251,249,0.75)",
              fontSize: 16,
              fontWeight: 600,
              lineHeight: 1.6,
              marginBottom: 32,
            }}
          >
            No app to download. No account to create. Your congregation scans a QR code, picks an amount in their
            currency, and pays with the wallet already on their phone — Apple Pay, Google Pay, M-Pesa.
          </p>
          <PillButton
            bg={C.mint}
            color={C.evergreen}
            height={48}
            px={24}
            fontSize={15}
          >
            See the giver experience &#8594;
          </PillButton>
        </div>

        {/* Right column — phone */}
        <div style={{ flex: "1 1 300px", display: "flex", justifyContent: "center" }}>
          <GiverPhone />
        </div>
      </div>
    </section>
  );
}

// ─── Icon components ──────────────────────────────────────────────────────────
function ShieldIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path
        d="M14 3L5 7V14C5 19.5 9 24.7 14 26C19 24.7 23 19.5 23 14V7L14 3Z"
        stroke={C.evergreen}
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M10 14L12.5 16.5L18 11"
        stroke={C.evergreen}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect x="6" y="12" width="16" height="13" rx="3" stroke={C.evergreen} strokeWidth="1.8" />
      <path
        d="M9 12V9C9 6.24 11.24 4 14 4C16.76 4 19 6.24 19 9V12"
        stroke={C.evergreen}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <circle cx="14" cy="18" r="1.5" fill={C.evergreen} />
    </svg>
  );
}

function FileIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path
        d="M8 4H17L23 10V24H8V4Z"
        stroke={C.evergreen}
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M17 4V10H23" stroke={C.evergreen} strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M11 15H20M11 19H17" stroke={C.evergreen} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

// ─── 8. SECURITY ─────────────────────────────────────────────────────────────
function SecuritySection() {
  const cards = [
    {
      Icon: ShieldIcon,
      title: "Funds held by regulated custodians",
      body: "Your giving is held 1:1, never pooled, withdrawable any time.",
    },
    {
      Icon: LockIcon,
      title: "Bank-grade encryption",
      body: "256-bit TLS, SOC 2 Type II, PCI-DSS compliant payment processing.",
    },
    {
      Icon: FileIcon,
      title: "Audit-grade records",
      body: "Every gift attributed, every conversion documented. Board-ready exports on demand.",
    },
  ];

  return (
    <section
      style={{
        backgroundColor: C.canvas,
        padding: "100px 40px",
        textAlign: "center",
      }}
    >
      <SectionLabel>BUILT FOR STEWARDSHIP</SectionLabel>
      <h2
        style={{
          fontSize: "clamp(36px, 5vw, 60px)",
          fontWeight: 900,
          lineHeight: 0.95,
          letterSpacing: "-0.03em",
          color: C.dark,
          fontFamily: "var(--font-geist-sans)",
          margin: "0 0 56px",
        }}
      >
        TRUST AT EVERY LAYER
      </h2>

      <div
        style={{
          display: "flex",
          gap: 24,
          maxWidth: 900,
          margin: "0 auto",
          flexWrap: "wrap",
          justifyContent: "center",
          textAlign: "left",
        }}
      >
        {cards.map(({ Icon, title, body }) => (
          <div
            key={title}
            style={{
              flex: "1 1 240px",
              backgroundColor: "#fff",
              borderRadius: 16,
              border: `1px solid ${C.border}`,
              padding: 32,
            }}
          >
            <div style={{ marginBottom: 16 }}>
              <Icon />
            </div>
            <h3
              style={{
                fontSize: 16,
                fontWeight: 800,
                color: C.dark,
                marginBottom: 10,
                fontFamily: "var(--font-geist-sans)",
                letterSpacing: "-0.01em",
                lineHeight: 1.3,
              }}
            >
              {title}
            </h3>
            <p
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: C.textSecond,
                lineHeight: 1.6,
              }}
            >
              {body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── 9. CTA BANNER ───────────────────────────────────────────────────────────
function CTABanner() {
  return (
    <section
      style={{
        backgroundColor: C.evergreen,
        padding: "100px 40px",
        textAlign: "center",
      }}
    >
      <h2
        style={{
          fontSize: "clamp(36px, 6vw, 72px)",
          fontWeight: 900,
          letterSpacing: "-0.03em",
          lineHeight: 0.92,
          color: C.canvas,
          fontFamily: "var(--font-geist-sans)",
          margin: 0,
        }}
      >
        YOUR CONGREGATION IS GLOBAL.
        <br />
        YOUR GIVING SHOULD BE TOO.
      </h2>
      <div style={{ marginTop: 40 }}>
        <PillButton bg={C.mint} color={C.evergreen} height={56} px={32} fontSize={17}>
          Get started &#8212; it&apos;s free
        </PillButton>
      </div>
      <p
        style={{
          color: "rgba(226,246,213,0.6)",
          fontSize: 13,
          marginTop: 16,
          fontWeight: 600,
          fontFamily: "var(--font-geist-sans)",
        }}
      >
        Setup in under 45 minutes &#183; No card required
      </p>
    </section>
  );
}

// ─── 10. FOOTER ──────────────────────────────────────────────────────────────
const footerColumns = [
  {
    heading: "Product",
    links: ["Give links", "Spend cards", "Payouts", "Reporting"],
  },
  {
    heading: "Company",
    links: ["About", "Blog", "Careers", "Press"],
  },
  {
    heading: "Legal",
    links: ["Privacy", "Terms", "Cookie policy", "Compliance"],
  },
  {
    heading: "Support",
    links: ["Help center", "Contact us", "Status", "Community"],
  },
];

function Footer() {
  return (
    <footer
      style={{
        backgroundColor: C.dark,
        padding: "80px 40px 0",
        color: C.canvas,
        fontFamily: "var(--font-geist-sans)",
        overflow: "hidden",
      }}
    >
      {/* Top row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 48,
          marginBottom: 60,
        }}
      >
        {/* Logo */}
        <div style={{ flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                backgroundColor: C.mint,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M8 12V4M8 4L4.5 7.5M8 4L11.5 7.5"
                  stroke={C.evergreen}
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span
              style={{
                fontWeight: 800,
                fontSize: 17,
                color: C.canvas,
                letterSpacing: "-0.02em",
              }}
            >
              ChurchPay
            </span>
          </div>
          <p
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: "rgba(251,251,249,0.4)",
              maxWidth: 220,
              lineHeight: 1.6,
            }}
          >
            Global giving infrastructure for the modern church.
          </p>
        </div>

        {/* Link columns */}
        <div
          style={{
            display: "flex",
            gap: 48,
            flexWrap: "wrap",
          }}
        >
          {footerColumns.map((col) => (
            <div key={col.heading}>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: "rgba(251,251,249,0.4)",
                  letterSpacing: "0.08em",
                  marginBottom: 16,
                  textTransform: "uppercase",
                }}
              >
                {col.heading}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {col.links.map((link) => (
                  <a
                    key={link}
                    href="#"
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: "rgba(251,251,249,0.6)",
                      textDecoration: "none",
                    }}
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div
        style={{
          height: 1,
          backgroundColor: "rgba(251,251,249,0.08)",
          marginBottom: 28,
        }}
      />

      {/* Bottom row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 16,
          paddingBottom: 28,
        }}
      >
        <span
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: "rgba(251,251,249,0.4)",
          }}
        >
          &#169; 2025 ChurchPay
        </span>
        <div style={{ display: "flex", gap: 10 }}>
          {["App Store", "Google Play"].map((label) => (
            <a
              key={label}
              href="#"
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: "rgba(251,251,249,0.5)",
                textDecoration: "none",
                border: "1px solid rgba(251,251,249,0.15)",
                borderRadius: 9999,
                padding: "6px 16px",
              }}
            >
              {label}
            </a>
          ))}
        </div>
      </div>

      {/* Massive wordmark */}
      <div
        style={{
          textAlign: "center",
          fontSize: "clamp(60px, 12vw, 140px)",
          fontWeight: 900,
          letterSpacing: "-0.04em",
          color: "rgba(251,251,249,0.06)",
          lineHeight: 0.85,
          userSelect: "none",
          paddingBottom: 0,
          marginBottom: -8,
        }}
      >
        CHURCHPAY
      </div>
    </footer>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function LandingPage() {
  return (
    <div
      style={{
        fontFamily: "var(--font-geist-sans)",
        overflowX: "hidden",
      }}
    >
      <Navbar />
      <HeroSection />
      <TrustBar />
      <HowItWorksSection />
      <EnablesSection />
      <BigStatSection />
      <ScanGiveKeepSection />
      <CongregationSection />
      <SecuritySection />
      <CTABanner />
      <Footer />
    </div>
  );
}
