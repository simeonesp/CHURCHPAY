"use client";

const GIVING_ROWS = [
  {
    id: 1,
    giver: "Adaeze Okonkwo",
    flag: "🇳🇬",
    country: "Nigeria",
    original: "₦25,000",
    received: "$16.00",
    fund: "General",
    time: "2 min ago",
  },
  {
    id: 2,
    giver: "James Whitfield",
    flag: "🇬🇧",
    country: "United Kingdom",
    original: "£50.00",
    received: "$63.50",
    fund: "Missions",
    time: "5 min ago",
  },
  {
    id: 3,
    giver: "Priya Sharma",
    flag: "🇮🇳",
    country: "India",
    original: "₹4,200",
    received: "$50.40",
    fund: "General",
    time: "8 min ago",
  },
  {
    id: 4,
    giver: "Michael Chen",
    flag: "🇨🇦",
    country: "Canada",
    original: "C$75.00",
    received: "$55.60",
    fund: "Building Fund",
    time: "12 min ago",
  },
  {
    id: 5,
    giver: "Amara Diallo",
    flag: "🇬🇭",
    country: "Ghana",
    original: "GH₵800",
    received: "$52.10",
    fund: "General",
    time: "15 min ago",
  },
  {
    id: 6,
    giver: "Sarah Mwangi",
    flag: "🇰🇪",
    country: "Kenya",
    original: "KES 8,000",
    received: "$62.00",
    fund: "Missions",
    time: "18 min ago",
  },
  {
    id: 7,
    giver: "Taiwo Adeleke",
    flag: "🇿🇦",
    country: "South Africa",
    original: "R1,200",
    received: "$65.30",
    fund: "General",
    time: "22 min ago",
  },
  {
    id: 8,
    giver: "Emma Thompson",
    flag: "🇺🇸",
    country: "United States",
    original: "$100.00",
    received: "$100.00",
    fund: "Building Fund",
    time: "25 min ago",
  },
];

const COUNTRIES_BY_GIVING = [
  { flag: "🇺🇸", name: "United States", amount: "$1,840.00" },
  { flag: "🇬🇧", name: "United Kingdom", amount: "$720.50" },
  { flag: "🇨🇦", name: "Canada", amount: "$610.30" },
  { flag: "🇳🇬", name: "Nigeria", amount: "$480.00" },
  { flag: "🇦🇺", name: "Australia", amount: "$390.20" },
  { flag: "🇩🇪", name: "Germany", amount: "$280.40" },
  { flag: "🇿🇦", name: "South Africa", amount: "$245.60" },
  { flag: "🇰🇪", name: "Kenya", amount: "$212.00" },
  { flag: "🇬🇭", name: "Ghana", amount: "$195.30" },
  { flag: "🇮🇳", name: "India", amount: "$178.90" },
  { flag: "🇧🇷", name: "Brazil", amount: "$154.20" },
  { flag: "🇯🇲", name: "Jamaica", amount: "$88.70" },
  { flag: "🇸🇬", name: "Singapore", amount: "$74.40" },
  { flag: "🇳🇿", name: "New Zealand", amount: "$69.50" },
];

const TAB_NUM: React.CSSProperties = {
  fontVariantNumeric: "tabular-nums",
  fontFeatureSettings: '"tnum" 1',
};

export default function DashboardPage() {
  return (
    <div
      style={{
        padding: "32px 36px",
        maxWidth: 1400,
        margin: "0 auto",
        fontFamily: "var(--font-geist-sans)",
      }}
    >
      {/* Page header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 28,
        }}
      >
        <div>
          <h1
            style={{
              fontSize: 24,
              fontWeight: 800,
              color: "#0E0F0C",
              letterSpacing: "-0.03em",
              lineHeight: 1,
            }}
          >
            Dashboard
          </h1>
          <p
            style={{
              fontSize: 13,
              color: "#868685",
              marginTop: 4,
              fontWeight: 500,
            }}
          >
            Wednesday, May 21 2025
          </p>
        </div>
        <button
          style={{
            borderRadius: 9999,
            border: "1.5px solid rgba(14,15,12,0.2)",
            backgroundColor: "transparent",
            padding: "8px 20px",
            fontSize: 13,
            fontWeight: 600,
            color: "#0E0F0C",
            cursor: "pointer",
            fontFamily: "var(--font-geist-sans)",
            letterSpacing: "-0.01em",
          }}
        >
          Export today
        </button>
      </div>

      {/* HERO CARD */}
      <div
        style={{
          borderRadius: 30,
          backgroundColor: "#163300",
          padding: "36px 40px",
          marginBottom: 24,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle pattern overlay */}
        <div
          style={{
            position: "absolute",
            top: -60,
            right: -60,
            width: 320,
            height: 320,
            borderRadius: "50%",
            background: "rgba(226,246,213,0.05)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -80,
            left: 200,
            width: 240,
            height: 240,
            borderRadius: "50%",
            background: "rgba(226,246,213,0.04)",
            pointerEvents: "none",
          }}
        />

        {/* Headline */}
        <div style={{ position: "relative" }}>
          <p
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: "rgba(226,246,213,0.7)",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: 10,
            }}
          >
            Today&apos;s giving
          </p>
          <h2
            style={{
              fontSize: 52,
              fontWeight: 900,
              color: "#E2F6D5",
              letterSpacing: "-0.04em",
              lineHeight: 1,
              marginBottom: 8,
            }}
          >
            Giving from{" "}
            <span
              style={{
                display: "inline-block",
                backgroundColor: "rgba(226,246,213,0.15)",
                borderRadius: 12,
                padding: "0 10px",
                border: "1.5px solid rgba(226,246,213,0.25)",
              }}
            >
              14
            </span>{" "}
            countries
          </h2>
          <p
            style={{
              fontSize: 15,
              color: "rgba(226,246,213,0.6)",
              fontWeight: 500,
              marginBottom: 28,
            }}
          >
            Your congregation is giving from around the world, in real time.
          </p>

          {/* Stat chips row */}
          <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
            {[
              { label: "Today", value: "$4,820" },
              { label: "This week", value: "$28,340" },
              { label: "This month", value: "$112,600" },
            ].map((stat) => (
              <div
                key={stat.label}
                style={{
                  backgroundColor: "rgba(226,246,213,0.10)",
                  border: "1px solid rgba(226,246,213,0.2)",
                  borderRadius: 14,
                  padding: "12px 20px",
                  minWidth: 140,
                }}
              >
                <p
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: "rgba(226,246,213,0.6)",
                    textTransform: "uppercase",
                    letterSpacing: "0.07em",
                    marginBottom: 4,
                  }}
                >
                  {stat.label}
                </p>
                <p
                  style={{
                    fontSize: 26,
                    fontWeight: 800,
                    color: "#E2F6D5",
                    letterSpacing: "-0.03em",
                    ...TAB_NUM,
                  }}
                >
                  {stat.value}
                </p>
              </div>
            ))}
          </div>

          {/* Country flags row */}
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: 11, color: "rgba(226,246,213,0.5)", fontWeight: 500, marginRight: 4 }}>
              Countries active:
            </span>
            {["🇳🇬", "🇬🇧", "🇺🇸", "🇨🇦", "🇬🇭", "🇰🇪", "🇿🇦", "🇮🇳"].map((flag, i) => (
              <span key={i} style={{ fontSize: 20 }}>{flag}</span>
            ))}
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: "rgba(226,246,213,0.6)",
                backgroundColor: "rgba(226,246,213,0.1)",
                borderRadius: 9999,
                padding: "2px 8px",
                marginLeft: 2,
              }}
            >
              +6 more
            </span>
          </div>
        </div>
      </div>

      {/* Main content row: Table + Right panel */}
      <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
        {/* GIVING FEED TABLE */}
        <div
          style={{
            flex: 1,
            minWidth: 0,
            backgroundColor: "#fff",
            borderRadius: 16,
            border: "1px solid rgba(14,15,12,0.12)",
            overflow: "hidden",
          }}
        >
          {/* Table header row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "18px 24px 14px",
              borderBottom: "1px solid rgba(14,15,12,0.08)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <h3
                style={{
                  fontSize: 15,
                  fontWeight: 700,
                  color: "#0E0F0C",
                  letterSpacing: "-0.02em",
                }}
              >
                Live giving feed
              </h3>
              {/* Pulsing dot */}
              <span
                style={{
                  position: "relative",
                  display: "inline-flex",
                  width: 10,
                  height: 10,
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: "50%",
                    backgroundColor: "#054D28",
                    animation: "ping 1.5s cubic-bezier(0,0,0.2,1) infinite",
                    opacity: 0.5,
                  }}
                />
                <span
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    backgroundColor: "#054D28",
                    display: "block",
                    position: "relative",
                  }}
                />
              </span>
            </div>
            <button
              style={{
                borderRadius: 9999,
                border: "1.5px solid rgba(14,15,12,0.15)",
                backgroundColor: "transparent",
                padding: "6px 14px",
                fontSize: 12,
                fontWeight: 600,
                color: "#454745",
                cursor: "pointer",
                fontFamily: "var(--font-geist-sans)",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M10 6A4 4 0 112 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M10 3v3h-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Refresh
            </button>
          </div>

          {/* Table */}
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr
                  style={{
                    backgroundColor: "#FBFBF9",
                    borderBottom: "1px solid rgba(14,15,12,0.08)",
                  }}
                >
                  {["Giver", "Country", "Original amount", "Received", "Fund", "Time"].map(
                    (col) => (
                      <th
                        key={col}
                        style={{
                          textAlign: "left",
                          padding: "10px 16px",
                          fontSize: 11,
                          fontWeight: 700,
                          color: "#868685",
                          textTransform: "uppercase",
                          letterSpacing: "0.06em",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {col}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {GIVING_ROWS.map((row, i) => (
                  <tr
                    key={row.id}
                    style={{
                      backgroundColor: i % 2 === 0 ? "#fff" : "#FBFBF9",
                      borderBottom: "1px solid rgba(14,15,12,0.05)",
                      transition: "background-color 0.1s ease",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLTableRowElement).style.backgroundColor = "#F0FBE8";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLTableRowElement).style.backgroundColor =
                        i % 2 === 0 ? "#fff" : "#FBFBF9";
                    }}
                  >
                    <td
                      style={{
                        padding: "12px 16px",
                        fontSize: 13.5,
                        fontWeight: 600,
                        color: "#0E0F0C",
                      }}
                    >
                      {row.giver}
                    </td>
                    <td style={{ padding: "12px 16px", fontSize: 13.5, color: "#454745" }}>
                      <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <span style={{ fontSize: 16 }}>{row.flag}</span>
                        {row.country}
                      </span>
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        fontSize: 13.5,
                        fontWeight: 600,
                        color: "#454745",
                        ...TAB_NUM,
                      }}
                    >
                      {row.original}
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        fontSize: 13.5,
                        fontWeight: 700,
                        color: "#054D28",
                        ...TAB_NUM,
                      }}
                    >
                      {row.received}
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 600,
                          backgroundColor: "#FBFBF9",
                          border: "1px solid rgba(14,15,12,0.12)",
                          borderRadius: 9999,
                          padding: "3px 10px",
                          color: "#454745",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {row.fund}
                      </span>
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        fontSize: 12,
                        color: "#868685",
                        fontWeight: 500,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {row.time}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div style={{ width: 300, flexShrink: 0, display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Balance card */}
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: 16,
              border: "1px solid rgba(14,15,12,0.12)",
              padding: "22px 22px",
            }}
          >
            <p
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: "#868685",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginBottom: 6,
              }}
            >
              Current balance
            </p>
            <p
              style={{
                fontSize: 34,
                fontWeight: 800,
                color: "#0E0F0C",
                letterSpacing: "-0.04em",
                lineHeight: 1.05,
                marginBottom: 16,
                ...TAB_NUM,
              }}
            >
              $24,830.00
            </p>
            <button
              style={{
                width: "100%",
                borderRadius: 9999,
                backgroundColor: "#163300",
                border: "none",
                padding: "11px 20px",
                fontSize: 13,
                fontWeight: 700,
                color: "#E2F6D5",
                cursor: "pointer",
                fontFamily: "var(--font-geist-sans)",
                letterSpacing: "-0.01em",
              }}
            >
              Withdraw to bank
            </button>
          </div>

          {/* Countries giving card */}
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: 16,
              border: "1px solid rgba(14,15,12,0.12)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                padding: "16px 22px 12px",
                borderBottom: "1px solid rgba(14,15,12,0.07)",
              }}
            >
              <h4
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#0E0F0C",
                  letterSpacing: "-0.01em",
                }}
              >
                Countries giving today
              </h4>
              <p style={{ fontSize: 11, color: "#868685", marginTop: 2 }}>
                14 countries · live
              </p>
            </div>
            <div style={{ maxHeight: 340, overflowY: "auto", padding: "8px 0" }}>
              {COUNTRIES_BY_GIVING.map((c, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "8px 22px",
                    borderBottom:
                      i < COUNTRIES_BY_GIVING.length - 1
                        ? "1px solid rgba(14,15,12,0.04)"
                        : "none",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 16 }}>{c.flag}</span>
                    <span
                      style={{
                        fontSize: 13,
                        fontWeight: 600,
                        color: "#454745",
                      }}
                    >
                      {c.name}
                    </span>
                  </div>
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: "#054D28",
                      ...TAB_NUM,
                    }}
                  >
                    {c.amount}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Ping animation */}
      <style>{`
        @keyframes ping {
          75%, 100% { transform: scale(2.2); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
