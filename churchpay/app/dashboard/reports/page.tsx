"use client";

import { useState } from "react";

const TAB_NUM: React.CSSProperties = {
  fontVariantNumeric: "tabular-nums",
  fontFeatureSettings: '"tnum" 1',
};

const PREVIEW_ROWS = [
  { date: "May 21", giver: "Emma Thompson", country: "🇺🇸 United States", amount: "$100.00", fund: "Building Fund" },
  { date: "May 21", giver: "James Whitfield", country: "🇬🇧 United Kingdom", amount: "$63.50", fund: "Missions" },
  { date: "May 21", giver: "Adaeze Okonkwo", country: "🇳🇬 Nigeria", amount: "$16.00", fund: "General" },
  { date: "May 20", giver: "Ingrid Möller", country: "🇩🇪 Germany", amount: "$65.40", fund: "Missions" },
  { date: "May 20", giver: "Lucas Ferreira", country: "🇧🇷 Brazil", amount: "$58.20", fund: "Building Fund" },
];

const QUICK_EXPORTS = [
  {
    label: "Year to date",
    period: "Jan 1 – May 21, 2025",
    amount: "$572,840.00",
    gifts: "8,241 gifts",
  },
  {
    label: "Last month",
    period: "April 2025",
    amount: "$98,640.00",
    gifts: "1,628 gifts",
  },
  {
    label: "Last quarter",
    period: "Q1 2025 (Jan–Mar)",
    amount: "$310,200.00",
    gifts: "4,980 gifts",
  },
];

export default function ReportsPage() {
  const [fromDate, setFromDate] = useState("2025-05-01");
  const [toDate, setToDate] = useState("2025-05-21");
  const [funds, setFunds] = useState({
    all: true,
    missions: false,
    general: false,
    building: false,
  });
  const [campus, setCampus] = useState("all");

  const toggleFund = (key: keyof typeof funds) => {
    if (key === "all") {
      setFunds({ all: true, missions: false, general: false, building: false });
    } else {
      setFunds((prev) => ({
        ...prev,
        all: false,
        [key]: !prev[key],
      }));
    }
  };

  const inputStyle: React.CSSProperties = {
    borderRadius: 10,
    border: "1.5px solid rgba(14,15,12,0.18)",
    backgroundColor: "#FBFBF9",
    padding: "9px 14px",
    fontSize: 13,
    fontWeight: 600,
    color: "#0E0F0C",
    fontFamily: "var(--font-geist-sans)",
    outline: "none",
    ...TAB_NUM,
  };

  return (
    <div
      style={{
        padding: "32px 36px",
        maxWidth: 1100,
        margin: "0 auto",
        fontFamily: "var(--font-geist-sans)",
      }}
    >
      {/* Page header */}
      <div style={{ marginBottom: 8 }}>
        <h1
          style={{
            fontSize: 24,
            fontWeight: 800,
            color: "#0E0F0C",
            letterSpacing: "-0.03em",
            lineHeight: 1,
          }}
        >
          Reports &amp; exports
        </h1>
      </div>

      {/* Framing text */}
      <p
        style={{
          fontSize: 20,
          fontWeight: 700,
          color: "#454745",
          letterSpacing: "-0.02em",
          marginBottom: 28,
        }}
      >
        Audit-grade records, ready for your board.
      </p>

      {/* Main two-column layout */}
      <div style={{ display: "flex", gap: 20, alignItems: "flex-start", marginBottom: 20 }}>
        {/* GENERATE REPORT CARD */}
        <div
          style={{
            flex: 1,
            minWidth: 0,
            backgroundColor: "#fff",
            borderRadius: 30,
            border: "2px solid #163300",
            padding: "32px 32px",
          }}
        >
          <div style={{ marginBottom: 22 }}>
            <h2
              style={{
                fontSize: 20,
                fontWeight: 800,
                color: "#163300",
                letterSpacing: "-0.03em",
                marginBottom: 4,
              }}
            >
              Generate board report
            </h2>
            <p style={{ fontSize: 13, color: "#868685", fontWeight: 500 }}>
              PDF formatted for your finance committee or board packet.
            </p>
          </div>

          {/* Date range */}
          <div style={{ marginBottom: 20 }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: "#454745", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 10 }}>
              Date range
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div>
                <label style={{ fontSize: 11, color: "#868685", fontWeight: 600, display: "block", marginBottom: 4 }}>
                  From
                </label>
                <input
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  style={inputStyle}
                />
              </div>
              <span style={{ color: "#868685", fontSize: 16, marginTop: 16 }}>→</span>
              <div>
                <label style={{ fontSize: 11, color: "#868685", fontWeight: 600, display: "block", marginBottom: 4 }}>
                  To
                </label>
                <input
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  style={inputStyle}
                />
              </div>
            </div>
          </div>

          {/* Fund scope */}
          <div style={{ marginBottom: 20 }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: "#454745", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 10 }}>
              Fund scope
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {[
                { key: "all" as const, label: "All funds" },
                { key: "missions" as const, label: "Missions" },
                { key: "general" as const, label: "General" },
                { key: "building" as const, label: "Building Fund" },
              ].map((f) => (
                <button
                  key={f.key}
                  onClick={() => toggleFund(f.key)}
                  style={{
                    borderRadius: 9999,
                    border: `1.5px solid ${funds[f.key] ? "#163300" : "rgba(14,15,12,0.15)"}`,
                    backgroundColor: funds[f.key] ? "#E2F6D5" : "transparent",
                    padding: "7px 16px",
                    fontSize: 13,
                    fontWeight: 600,
                    color: funds[f.key] ? "#163300" : "#454745",
                    cursor: "pointer",
                    fontFamily: "var(--font-geist-sans)",
                    transition: "all 0.12s ease",
                  }}
                >
                  {funds[f.key] && (
                    <span style={{ marginRight: 4 }}>✓</span>
                  )}
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Campus filter */}
          <div style={{ marginBottom: 28 }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: "#454745", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 10 }}>
              Campus
            </p>
            <div style={{ display: "flex", gap: 8 }}>
              {[
                { value: "all", label: "All campuses" },
                { value: "main", label: "Main" },
                { value: "online", label: "Online" },
              ].map((c) => (
                <button
                  key={c.value}
                  onClick={() => setCampus(c.value)}
                  style={{
                    borderRadius: 9999,
                    border: `1.5px solid ${campus === c.value ? "#163300" : "rgba(14,15,12,0.15)"}`,
                    backgroundColor: campus === c.value ? "#E2F6D5" : "transparent",
                    padding: "7px 16px",
                    fontSize: 13,
                    fontWeight: 600,
                    color: campus === c.value ? "#163300" : "#454745",
                    cursor: "pointer",
                    fontFamily: "var(--font-geist-sans)",
                    transition: "all 0.12s ease",
                  }}
                >
                  {campus === c.value && (
                    <span style={{ marginRight: 4 }}>✓</span>
                  )}
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <button
              style={{
                borderRadius: 9999,
                backgroundColor: "#163300",
                border: "none",
                padding: "12px 28px",
                fontSize: 14,
                fontWeight: 700,
                color: "#E2F6D5",
                cursor: "pointer",
                fontFamily: "var(--font-geist-sans)",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M2 10v2h10v-2M7 2v7M4.5 6.5L7 9l2.5-2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Generate PDF
            </button>
            <button
              style={{
                borderRadius: 9999,
                backgroundColor: "transparent",
                border: "1.5px solid rgba(14,15,12,0.2)",
                padding: "11px 22px",
                fontSize: 14,
                fontWeight: 600,
                color: "#454745",
                cursor: "pointer",
                fontFamily: "var(--font-geist-sans)",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <rect x="1.5" y="1.5" width="11" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
                <path d="M4 5h6M4 7.5h6M4 10h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
              Export CSV
            </button>
          </div>

          {/* Last generated */}
          <p style={{ fontSize: 12, color: "#868685", fontWeight: 500 }}>
            Last generated: May 21, 2025 at 9:15 AM
          </p>
        </div>

        {/* REPORT PREVIEW CARD */}
        <div
          style={{
            width: 380,
            flexShrink: 0,
            backgroundColor: "#fff",
            borderRadius: 16,
            border: "1px solid rgba(14,15,12,0.12)",
            overflow: "hidden",
          }}
        >
          {/* Preview header bar */}
          <div
            style={{
              backgroundColor: "#163300",
              padding: "14px 20px",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M8 1H3a1 1 0 00-1 1v10a1 1 0 001 1h8a1 1 0 001-1V6L8 1z" stroke="#E2F6D5" strokeWidth="1.3" fill="none"/>
              <path d="M8 1v5h4" stroke="#E2F6D5" strokeWidth="1.3"/>
            </svg>
            <span style={{ fontSize: 12, fontWeight: 700, color: "#E2F6D5", letterSpacing: "0.02em" }}>
              REPORT PREVIEW
            </span>
          </div>

          <div style={{ padding: "20px 24px" }}>
            {/* Report header */}
            <div
              style={{
                borderBottom: "2px solid #163300",
                paddingBottom: 12,
                marginBottom: 14,
              }}
            >
              <p style={{ fontSize: 14, fontWeight: 800, color: "#163300", marginBottom: 2 }}>
                Lakewood Church — Giving Report
              </p>
              <p style={{ fontSize: 12, color: "#868685", fontWeight: 500, ...TAB_NUM }}>
                May 2025 · All funds · All campuses
              </p>
            </div>

            {/* Mini table */}
            <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 14 }}>
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(14,15,12,0.1)" }}>
                  {["Date", "Giver", "Country", "Amount", "Fund"].map((col) => (
                    <th
                      key={col}
                      style={{
                        textAlign: "left",
                        padding: "5px 6px",
                        fontSize: 9,
                        fontWeight: 700,
                        color: "#868685",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                      }}
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {PREVIEW_ROWS.map((row, i) => (
                  <tr
                    key={i}
                    style={{
                      backgroundColor: i % 2 === 0 ? "#fff" : "#FBFBF9",
                      borderBottom: "1px solid rgba(14,15,12,0.04)",
                    }}
                  >
                    <td style={{ padding: "5px 6px", fontSize: 10, color: "#454745", ...TAB_NUM }}>
                      {row.date}
                    </td>
                    <td style={{ padding: "5px 6px", fontSize: 10, fontWeight: 600, color: "#0E0F0C" }}>
                      {row.giver}
                    </td>
                    <td style={{ padding: "5px 6px", fontSize: 10, color: "#454745" }}>
                      {row.country}
                    </td>
                    <td style={{ padding: "5px 6px", fontSize: 10, fontWeight: 700, color: "#054D28", ...TAB_NUM }}>
                      {row.amount}
                    </td>
                    <td style={{ padding: "5px 6px", fontSize: 9, color: "#868685" }}>
                      {row.fund}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Totals row */}
            <div
              style={{
                backgroundColor: "#F0FBE8",
                borderRadius: 8,
                padding: "8px 10px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 14,
              }}
            >
              <span style={{ fontSize: 11, fontWeight: 700, color: "#163300" }}>Total received</span>
              <span style={{ fontSize: 13, fontWeight: 800, color: "#163300", ...TAB_NUM }}>$303.10</span>
            </div>

            {/* Reassurance */}
            <div
              style={{
                backgroundColor: "#FBFBF9",
                borderRadius: 10,
                padding: "10px 12px",
                borderLeft: "3px solid #163300",
              }}
            >
              <p style={{ fontSize: 11, fontWeight: 600, color: "#454745" }}>
                Traceable record per gift. Auditor-formatted.
              </p>
              <p style={{ fontSize: 11, color: "#868685", marginTop: 2 }}>
                Each transaction includes a unique ID, timestamp, and original currency for full auditability.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* QUICK EXPORTS ROW */}
      <div style={{ marginBottom: 20 }}>
        <h3
          style={{
            fontSize: 16,
            fontWeight: 700,
            color: "#0E0F0C",
            letterSpacing: "-0.02em",
            marginBottom: 14,
          }}
        >
          Quick exports
        </h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
          {QUICK_EXPORTS.map((ex) => (
            <div
              key={ex.label}
              style={{
                backgroundColor: "#fff",
                borderRadius: 16,
                border: "1px solid rgba(14,15,12,0.12)",
                padding: "20px 22px",
                display: "flex",
                flexDirection: "column",
                gap: 6,
              }}
            >
              <p style={{ fontSize: 13, fontWeight: 700, color: "#0E0F0C", letterSpacing: "-0.01em" }}>
                {ex.label}
              </p>
              <p style={{ fontSize: 12, color: "#868685", fontWeight: 500 }}>{ex.period}</p>
              <p
                style={{
                  fontSize: 22,
                  fontWeight: 800,
                  color: "#054D28",
                  letterSpacing: "-0.03em",
                  marginTop: 4,
                  ...TAB_NUM,
                }}
              >
                {ex.amount}
              </p>
              <p style={{ fontSize: 11, color: "#868685" }}>{ex.gifts}</p>
              <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                <button
                  style={{
                    flex: 1,
                    borderRadius: 9999,
                    backgroundColor: "#163300",
                    border: "none",
                    padding: "8px 0",
                    fontSize: 12,
                    fontWeight: 700,
                    color: "#E2F6D5",
                    cursor: "pointer",
                    fontFamily: "var(--font-geist-sans)",
                  }}
                >
                  PDF
                </button>
                <button
                  style={{
                    flex: 1,
                    borderRadius: 9999,
                    backgroundColor: "transparent",
                    border: "1.5px solid rgba(14,15,12,0.18)",
                    padding: "8px 0",
                    fontSize: 12,
                    fontWeight: 600,
                    color: "#454745",
                    cursor: "pointer",
                    fontFamily: "var(--font-geist-sans)",
                  }}
                >
                  CSV
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* INTEGRATIONS */}
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: 16,
          border: "1px solid rgba(14,15,12,0.12)",
          padding: "24px 28px",
        }}
      >
        <div style={{ marginBottom: 18 }}>
          <h3
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: "#0E0F0C",
              letterSpacing: "-0.02em",
              marginBottom: 4,
            }}
          >
            Accounting integrations
          </h3>
          <p style={{ fontSize: 13, color: "#868685", fontWeight: 500 }}>
            Sync your giving data directly into your accounting software.
          </p>
        </div>

        <div style={{ display: "flex", gap: 14 }}>
          {[
            {
              name: "QuickBooks",
              description: "Sync all transactions to QuickBooks Online",
              logo: "QB",
              color: "#2CA01C",
            },
            {
              name: "Sage",
              description: "Export to Sage Intacct or Sage 50",
              logo: "S",
              color: "#00DC82",
            },
          ].map((integration) => (
            <div
              key={integration.name}
              style={{
                flex: 1,
                borderRadius: 14,
                border: "1.5px solid rgba(14,15,12,0.12)",
                padding: "18px 20px",
                display: "flex",
                alignItems: "center",
                gap: 14,
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 10,
                  backgroundColor: integration.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <span
                  style={{
                    fontSize: 14,
                    fontWeight: 800,
                    color: "#fff",
                    letterSpacing: "0.02em",
                  }}
                >
                  {integration.logo}
                </span>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 14, fontWeight: 700, color: "#0E0F0C", marginBottom: 2 }}>
                  {integration.name}
                </p>
                <p style={{ fontSize: 12, color: "#868685", fontWeight: 500 }}>
                  {integration.description}
                </p>
              </div>
              <button
                style={{
                  borderRadius: 9999,
                  backgroundColor: "#163300",
                  border: "none",
                  padding: "9px 20px",
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#E2F6D5",
                  cursor: "pointer",
                  fontFamily: "var(--font-geist-sans)",
                  whiteSpace: "nowrap",
                }}
              >
                Sync to {integration.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
