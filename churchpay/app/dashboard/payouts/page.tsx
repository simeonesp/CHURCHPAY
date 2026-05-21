"use client";

const TAB_NUM: React.CSSProperties = {
  fontVariantNumeric: "tabular-nums",
  fontFeatureSettings: '"tnum" 1',
};

const PAYOUT_HISTORY = [
  { date: "May 16, 2025", amount: "$18,240.00", bank: "Chase ••4821", status: "Settled", ref: "PO-20250516" },
  { date: "May 9, 2025", amount: "$21,580.00", bank: "Chase ••4821", status: "Settled", ref: "PO-20250509" },
  { date: "May 2, 2025", amount: "$19,300.00", bank: "Chase ••4821", status: "Settled", ref: "PO-20250502" },
  { date: "Apr 25, 2025", amount: "$24,100.00", bank: "Chase ••4821", status: "Settled", ref: "PO-20250425" },
  { date: "Apr 18, 2025", amount: "$16,920.00", bank: "Chase ••4821", status: "Settled", ref: "PO-20250418" },
  { date: "Apr 11, 2025", amount: "$22,450.00", bank: "Chase ••4821", status: "Settled", ref: "PO-20250411" },
];

function StatusPill({ status }: { status: string }) {
  const map: Record<string, { bg: string; color: string }> = {
    Settled: { bg: "#E2F6D5", color: "#054D28" },
    Processing: { bg: "#FFF9DC", color: "#7A5A00" },
    Pending: { bg: "#F0F0EE", color: "#454745" },
  };
  const s = map[status] ?? map["Pending"];
  return (
    <span
      style={{
        fontSize: 11,
        fontWeight: 700,
        borderRadius: 9999,
        padding: "4px 10px",
        display: "inline-block",
        backgroundColor: s.bg,
        color: s.color,
        letterSpacing: "0.02em",
      }}
    >
      {status}
    </span>
  );
}

export default function PayoutsPage() {
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
      <div style={{ marginBottom: 28 }}>
        <h1
          style={{
            fontSize: 24,
            fontWeight: 800,
            color: "#0E0F0C",
            letterSpacing: "-0.03em",
            lineHeight: 1,
          }}
        >
          Payouts &amp; balance
        </h1>
        <p style={{ fontSize: 13, color: "#868685", marginTop: 4, fontWeight: 500 }}>
          Your available funds and withdrawal history
        </p>
      </div>

      {/* BALANCE HERO CARD */}
      <div
        style={{
          borderRadius: 30,
          backgroundColor: "#163300",
          padding: "40px 44px",
          marginBottom: 20,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative circles */}
        <div
          style={{
            position: "absolute",
            top: -80,
            right: -80,
            width: 360,
            height: 360,
            borderRadius: "50%",
            background: "rgba(226,246,213,0.05)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -60,
            left: 300,
            width: 220,
            height: 220,
            borderRadius: "50%",
            background: "rgba(226,246,213,0.04)",
            pointerEvents: "none",
          }}
        />

        <div style={{ position: "relative" }}>
          <p
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: "rgba(226,246,213,0.6)",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginBottom: 8,
            }}
          >
            Available balance
          </p>

          <p
            style={{
              fontSize: 68,
              fontWeight: 900,
              color: "#E2F6D5",
              letterSpacing: "-0.05em",
              lineHeight: 1,
              marginBottom: 28,
              ...TAB_NUM,
            }}
          >
            $24,830.00
          </p>

          {/* CTA buttons */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
            <button
              style={{
                borderRadius: 9999,
                backgroundColor: "#E2F6D5",
                border: "none",
                padding: "12px 28px",
                fontSize: 14,
                fontWeight: 700,
                color: "#163300",
                cursor: "pointer",
                fontFamily: "var(--font-geist-sans)",
                letterSpacing: "-0.01em",
              }}
            >
              Withdraw to bank
            </button>
            <button
              style={{
                borderRadius: 9999,
                backgroundColor: "transparent",
                border: "1.5px solid rgba(226,246,213,0.35)",
                padding: "11px 24px",
                fontSize: 14,
                fontWeight: 600,
                color: "rgba(226,246,213,0.85)",
                cursor: "pointer",
                fontFamily: "var(--font-geist-sans)",
              }}
            >
              Schedule payout
            </button>
          </div>

          {/* Next payout */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              backgroundColor: "rgba(226,246,213,0.1)",
              border: "1px solid rgba(226,246,213,0.2)",
              borderRadius: 12,
              padding: "10px 16px",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <circle cx="7" cy="7" r="5.5" stroke="#E2F6D5" strokeWidth="1.3" opacity="0.7"/>
              <path d="M7 4.5v2.75l1.75 1" stroke="#E2F6D5" strokeWidth="1.3" strokeLinecap="round" opacity="0.7"/>
            </svg>
            <span style={{ fontSize: 13, fontWeight: 600, color: "rgba(226,246,213,0.8)" }}>
              Next payout:{" "}
              <span style={{ color: "#E2F6D5", fontWeight: 700, ...TAB_NUM }}>
                Friday, May 23 · $24,830.00
              </span>
            </span>
          </div>
        </div>
      </div>

      {/* CUSTODY REASSURANCE BLOCK */}
      <div
        style={{
          borderRadius: 30,
          backgroundColor: "#E2F6D5",
          padding: "28px 36px",
          marginBottom: 24,
          display: "flex",
          alignItems: "flex-start",
          gap: 20,
        }}
      >
        {/* Shield icon */}
        <div
          style={{
            flexShrink: 0,
            width: 48,
            height: 48,
            borderRadius: 14,
            backgroundColor: "#163300",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
            <path
              d="M11 2L4 5.5v5.5c0 4 3 7.5 7 8.5 4-1 7-4.5 7-8.5V5.5L11 2z"
              stroke="#E2F6D5"
              strokeWidth="1.6"
              strokeLinejoin="round"
              fill="none"
            />
            <path
              d="M8 11l2.5 2.5L14.5 8.5"
              stroke="#E2F6D5"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div>
          <h3
            style={{
              fontSize: 16,
              fontWeight: 800,
              color: "#163300",
              letterSpacing: "-0.02em",
              marginBottom: 6,
            }}
          >
            Your funds are held 1:1 by a regulated custodian, never by ChurchPay.
          </h3>
          <p
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: "#2A5A00",
              marginBottom: 4,
            }}
          >
            Withdraw anytime. No lockups. No crypto.
          </p>
          <p style={{ fontSize: 13, color: "#3A6600", fontWeight: 500 }}>
            Regulated by FinCEN &amp; state money transmitter laws. FDIC-insured equivalent via custodian partner.
            Your congregation&apos;s giving is always yours.
          </p>
        </div>
      </div>

      {/* Two-column row: Payout history + Bank account */}
      <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
        {/* PAYOUT HISTORY TABLE */}
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
          <div
            style={{
              padding: "18px 24px 14px",
              borderBottom: "1px solid rgba(14,15,12,0.08)",
            }}
          >
            <h3 style={{ fontSize: 15, fontWeight: 700, color: "#0E0F0C", letterSpacing: "-0.02em" }}>
              Payout history
            </h3>
            <p style={{ fontSize: 12, color: "#868685", marginTop: 2 }}>All settled payouts to your bank</p>
          </div>

          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ backgroundColor: "#FBFBF9", borderBottom: "1px solid rgba(14,15,12,0.08)" }}>
                  {["Date", "Amount", "Bank account", "Status", "Reference"].map((col) => (
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
                  ))}
                </tr>
              </thead>
              <tbody>
                {PAYOUT_HISTORY.map((row, i) => (
                  <tr
                    key={row.ref}
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
                    <td style={{ padding: "12px 16px", fontSize: 13, fontWeight: 600, color: "#454745" }}>
                      {row.date}
                    </td>
                    <td style={{ padding: "12px 16px", fontSize: 13.5, fontWeight: 700, color: "#0E0F0C", ...TAB_NUM }}>
                      {row.amount}
                    </td>
                    <td style={{ padding: "12px 16px", fontSize: 13, color: "#454745", fontWeight: 500 }}>
                      {row.bank}
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      <StatusPill status={row.status} />
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        fontSize: 12,
                        color: "#868685",
                        fontFamily: "var(--font-geist-mono, monospace)",
                        ...TAB_NUM,
                      }}
                    >
                      {row.ref}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: bank account card + stats */}
        <div style={{ width: 280, flexShrink: 0, display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Bank account */}
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: 16,
              border: "1px solid rgba(14,15,12,0.12)",
              padding: "20px 22px",
            }}
          >
            <p
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: "#868685",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginBottom: 12,
              }}
            >
              Payout destination
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  backgroundColor: "#0A4599",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span style={{ fontSize: 11, fontWeight: 800, color: "#fff", letterSpacing: "0.02em" }}>
                  JPM
                </span>
              </div>
              <div>
                <p style={{ fontSize: 14, fontWeight: 700, color: "#0E0F0C" }}>Chase Business</p>
                <p style={{ fontSize: 13, color: "#868685", fontWeight: 500, ...TAB_NUM }}>••4821</p>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px 0",
                borderTop: "1px solid rgba(14,15,12,0.07)",
              }}
            >
              <span style={{ fontSize: 12, color: "#054D28", fontWeight: 600 }}>
                ✓ Verified
              </span>
              <button
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: "#163300",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "var(--font-geist-sans)",
                  textDecoration: "underline",
                  textUnderlineOffset: 2,
                }}
              >
                Change bank
              </button>
            </div>
          </div>

          {/* Quick stats */}
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: 16,
              border: "1px solid rgba(14,15,12,0.12)",
              padding: "20px 22px",
            }}
          >
            <p
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: "#868685",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginBottom: 14,
              }}
            >
              Summary
            </p>
            {[
              { label: "Paid out this month", value: "$39,820.00" },
              { label: "Paid out this year", value: "$246,190.00" },
              { label: "Avg payout size", value: "$20,705.00" },
            ].map((s) => (
              <div
                key={s.label}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "8px 0",
                  borderBottom: "1px solid rgba(14,15,12,0.06)",
                }}
              >
                <span style={{ fontSize: 12.5, color: "#454745", fontWeight: 500 }}>{s.label}</span>
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: "#0E0F0C",
                    ...TAB_NUM,
                  }}
                >
                  {s.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
