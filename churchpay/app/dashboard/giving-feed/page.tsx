"use client";

import { useState } from "react";

const TAB_NUM: React.CSSProperties = {
  fontVariantNumeric: "tabular-nums",
  fontFeatureSettings: '"tnum" 1',
};

const ALL_ROWS = [
  { id: "TXN-00841", giver: "Adaeze Okonkwo", flag: "🇳🇬", country: "Nigeria", original: "₦25,000", received: "$16.00", fund: "General", status: "Settled", time: "2 min ago" },
  { id: "TXN-00840", giver: "James Whitfield", flag: "🇬🇧", country: "United Kingdom", original: "£50.00", received: "$63.50", fund: "Missions", status: "Settled", time: "5 min ago" },
  { id: "TXN-00839", giver: "Priya Sharma", flag: "🇮🇳", country: "India", original: "₹4,200", received: "$50.40", fund: "General", status: "Processing", time: "8 min ago" },
  { id: "TXN-00838", giver: "Michael Chen", flag: "🇨🇦", country: "Canada", original: "C$75.00", received: "$55.60", fund: "Building Fund", status: "Settled", time: "12 min ago" },
  { id: "TXN-00837", giver: "Amara Diallo", flag: "🇬🇭", country: "Ghana", original: "GH₵800", received: "$52.10", fund: "General", status: "Settled", time: "15 min ago" },
  { id: "TXN-00836", giver: "Sarah Mwangi", flag: "🇰🇪", country: "Kenya", original: "KES 8,000", received: "$62.00", fund: "Missions", status: "Processing", time: "18 min ago" },
  { id: "TXN-00835", giver: "Taiwo Adeleke", flag: "🇿🇦", country: "South Africa", original: "R1,200", received: "$65.30", fund: "General", status: "Settled", time: "22 min ago" },
  { id: "TXN-00834", giver: "Emma Thompson", flag: "🇺🇸", country: "United States", original: "$100.00", received: "$100.00", fund: "Building Fund", status: "Settled", time: "25 min ago" },
  { id: "TXN-00833", giver: "Olawale Ogundimu", flag: "🇳🇬", country: "Nigeria", original: "₦50,000", received: "$32.10", fund: "Missions", status: "Settled", time: "31 min ago" },
  { id: "TXN-00832", giver: "Charlotte Davies", flag: "🇦🇺", country: "Australia", original: "A$80.00", received: "$52.30", fund: "General", status: "Settled", time: "38 min ago" },
  { id: "TXN-00831", giver: "Kwame Asante", flag: "🇬🇭", country: "Ghana", original: "GH₵600", received: "$39.10", fund: "Building Fund", status: "Processing", time: "44 min ago" },
  { id: "TXN-00830", giver: "Ingrid Möller", flag: "🇩🇪", country: "Germany", original: "€60.00", received: "$65.40", fund: "Missions", status: "Settled", time: "52 min ago" },
  { id: "TXN-00829", giver: "Rahul Verma", flag: "🇮🇳", country: "India", original: "₹6,500", received: "$78.00", fund: "General", status: "Settled", time: "1 hr ago" },
  { id: "TXN-00828", giver: "Grace Osei", flag: "🇬🇭", country: "Ghana", original: "GH₵450", received: "$29.30", fund: "General", status: "Settled", time: "1 hr ago" },
  { id: "TXN-00827", giver: "Lucas Ferreira", flag: "🇧🇷", country: "Brazil", original: "R$300", received: "$58.20", fund: "Building Fund", status: "Settled", time: "1 hr ago" },
  { id: "TXN-00826", giver: "Nia Jackson", flag: "🇯🇲", country: "Jamaica", original: "J$6,000", received: "$38.50", fund: "General", status: "Settled", time: "2 hr ago" },
];

function StatusPill({ status }: { status: string }) {
  const styles: Record<string, React.CSSProperties> = {
    Settled: {
      backgroundColor: "#E2F6D5",
      color: "#054D28",
    },
    Processing: {
      backgroundColor: "#FFF9DC",
      color: "#7A5A00",
    },
    Pending: {
      backgroundColor: "#F0F0EE",
      color: "#454745",
    },
  };
  return (
    <span
      style={{
        fontSize: 11,
        fontWeight: 700,
        borderRadius: 9999,
        padding: "4px 10px",
        display: "inline-block",
        letterSpacing: "0.02em",
        ...(styles[status] ?? styles["Pending"]),
      }}
    >
      {status}
    </span>
  );
}

const PAGE_SIZE = 10;

export default function GivingFeedPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [filterCountry, setFilterCountry] = useState("All");
  const [filterFund, setFilterFund] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");

  const filtered = ALL_ROWS.filter((r) => {
    const matchSearch =
      search === "" ||
      r.giver.toLowerCase().includes(search.toLowerCase()) ||
      r.country.toLowerCase().includes(search.toLowerCase()) ||
      r.id.toLowerCase().includes(search.toLowerCase());
    const matchCountry = filterCountry === "All" || r.country === filterCountry;
    const matchFund = filterFund === "All" || r.fund === filterFund;
    const matchStatus = filterStatus === "All" || r.status === filterStatus;
    return matchSearch && matchCountry && matchFund && matchStatus;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const uniqueCountries = Array.from(new Set(ALL_ROWS.map((r) => r.country))).sort();
  const uniqueFunds = Array.from(new Set(ALL_ROWS.map((r) => r.fund))).sort();

  const filterSelectStyle: React.CSSProperties = {
    borderRadius: 9999,
    border: "1.5px solid rgba(14,15,12,0.15)",
    backgroundColor: "#fff",
    padding: "7px 14px",
    fontSize: 12.5,
    fontWeight: 600,
    color: "#0E0F0C",
    cursor: "pointer",
    fontFamily: "var(--font-geist-sans)",
    outline: "none",
    appearance: "none" as const,
    paddingRight: 32,
  };

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
            Giving feed
          </h1>
          <p
            style={{
              fontSize: 13,
              color: "#868685",
              marginTop: 4,
              fontWeight: 500,
            }}
          >
            All transactions · live
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
          }}
        >
          Export CSV
        </button>
      </div>

      {/* Filter bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 20,
          flexWrap: "wrap",
        }}
      >
        <div style={{ position: "relative" }}>
          <select
            value={filterCountry}
            onChange={(e) => { setFilterCountry(e.target.value); setPage(1); }}
            style={filterSelectStyle}
          >
            <option value="All">All countries</option>
            {uniqueCountries.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "#868685" }} aria-hidden="true">
            <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        <div style={{ position: "relative" }}>
          <select
            value={filterFund}
            onChange={(e) => { setFilterFund(e.target.value); setPage(1); }}
            style={filterSelectStyle}
          >
            <option value="All">All funds</option>
            {uniqueFunds.map((f) => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "#868685" }} aria-hidden="true">
            <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        <div style={{ position: "relative" }}>
          <select
            value={filterStatus}
            onChange={(e) => { setFilterStatus(e.target.value); setPage(1); }}
            style={filterSelectStyle}
          >
            <option value="All">All statuses</option>
            <option value="Settled">Settled</option>
            <option value="Processing">Processing</option>
            <option value="Pending">Pending</option>
          </select>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "#868685" }} aria-hidden="true">
            <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        {/* Date range — static display */}
        <button
          style={{
            borderRadius: 9999,
            border: "1.5px solid rgba(14,15,12,0.15)",
            backgroundColor: "#fff",
            padding: "7px 14px",
            fontSize: 12.5,
            fontWeight: 600,
            color: "#454745",
            cursor: "pointer",
            fontFamily: "var(--font-geist-sans)",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
            <rect x="1.5" y="2.5" width="10" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.3"/>
            <path d="M4.5 1.5v2M8.5 1.5v2M1.5 5.5h10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
          </svg>
          May 21, 2025
        </button>
      </div>

      {/* Stats summary */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 12,
          marginBottom: 24,
        }}
      >
        {[
          { label: "Total gifts today", value: "847", isCount: true },
          { label: "Total amount", value: "$4,820", isMoney: true },
          { label: "Avg gift", value: "$5.70", isMoney: true },
          { label: "Countries", value: "14", isCount: true },
        ].map((stat) => (
          <div
            key={stat.label}
            style={{
              backgroundColor: "#fff",
              borderRadius: 16,
              border: "1px solid rgba(14,15,12,0.12)",
              padding: "16px 20px",
            }}
          >
            <p
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: "#868685",
                textTransform: "uppercase",
                letterSpacing: "0.07em",
                marginBottom: 6,
              }}
            >
              {stat.label}
            </p>
            <p
              style={{
                fontSize: 26,
                fontWeight: 800,
                color: "#0E0F0C",
                letterSpacing: "-0.03em",
                ...(stat.isMoney ? TAB_NUM : {}),
              }}
            >
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Table card */}
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: 16,
          border: "1px solid rgba(14,15,12,0.12)",
          overflow: "hidden",
        }}
      >
        {/* Search bar */}
        <div
          style={{
            padding: "16px 20px",
            borderBottom: "1px solid rgba(14,15,12,0.08)",
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div style={{ position: "relative", flex: 1, maxWidth: 360 }}>
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              style={{
                position: "absolute",
                left: 12,
                top: "50%",
                transform: "translateY(-50%)",
                color: "#868685",
                pointerEvents: "none",
              }}
              aria-hidden="true"
            >
              <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.4"/>
              <path d="M9.5 9.5L12.5 12.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
            <input
              type="text"
              placeholder="Search giver, country, or ID…"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              style={{
                width: "100%",
                borderRadius: 9999,
                border: "1.5px solid rgba(14,15,12,0.15)",
                backgroundColor: "#FBFBF9",
                padding: "8px 14px 8px 34px",
                fontSize: 13,
                fontWeight: 500,
                color: "#0E0F0C",
                fontFamily: "var(--font-geist-sans)",
                outline: "none",
              }}
            />
          </div>
          <p style={{ fontSize: 12, color: "#868685", fontWeight: 500, marginLeft: "auto" }}>
            {filtered.length} transaction{filtered.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Table */}
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ backgroundColor: "#FBFBF9", borderBottom: "1px solid rgba(14,15,12,0.08)" }}>
                {["ID", "Giver", "Country", "Original", "Received", "Fund", "Status", "Time"].map((col) => (
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
              {paginated.map((row, i) => (
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
                      padding: "11px 16px",
                      fontSize: 12,
                      fontWeight: 600,
                      color: "#868685",
                      fontFamily: "var(--font-geist-mono, monospace)",
                      ...TAB_NUM,
                    }}
                  >
                    {row.id}
                  </td>
                  <td style={{ padding: "11px 16px", fontSize: 13.5, fontWeight: 600, color: "#0E0F0C" }}>
                    {row.giver}
                  </td>
                  <td style={{ padding: "11px 16px", fontSize: 13, color: "#454745" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <span style={{ fontSize: 16 }}>{row.flag}</span>
                      {row.country}
                    </span>
                  </td>
                  <td style={{ padding: "11px 16px", fontSize: 13, fontWeight: 600, color: "#454745", ...TAB_NUM }}>
                    {row.original}
                  </td>
                  <td style={{ padding: "11px 16px", fontSize: 13, fontWeight: 700, color: "#054D28", ...TAB_NUM }}>
                    {row.received}
                  </td>
                  <td style={{ padding: "11px 16px" }}>
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
                  <td style={{ padding: "11px 16px" }}>
                    <StatusPill status={row.status} />
                  </td>
                  <td style={{ padding: "11px 16px", fontSize: 12, color: "#868685", fontWeight: 500, whiteSpace: "nowrap" }}>
                    {row.time}
                  </td>
                </tr>
              ))}
              {paginated.length === 0 && (
                <tr>
                  <td colSpan={8} style={{ padding: "32px", textAlign: "center", color: "#868685", fontSize: 13 }}>
                    No transactions match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "14px 20px",
            borderTop: "1px solid rgba(14,15,12,0.08)",
          }}
        >
          <p style={{ fontSize: 12, color: "#868685", fontWeight: 500 }}>
            Showing {Math.min((page - 1) * PAGE_SIZE + 1, filtered.length)}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length}
          </p>
          <div style={{ display: "flex", gap: 6 }}>
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              style={{
                borderRadius: 9999,
                border: "1.5px solid rgba(14,15,12,0.15)",
                backgroundColor: "transparent",
                padding: "6px 14px",
                fontSize: 12,
                fontWeight: 600,
                color: page === 1 ? "#868685" : "#0E0F0C",
                cursor: page === 1 ? "default" : "pointer",
                fontFamily: "var(--font-geist-sans)",
              }}
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                style={{
                  borderRadius: 9999,
                  border: "1.5px solid rgba(14,15,12,0.15)",
                  backgroundColor: p === page ? "#163300" : "transparent",
                  padding: "6px 12px",
                  fontSize: 12,
                  fontWeight: 600,
                  color: p === page ? "#E2F6D5" : "#454745",
                  cursor: "pointer",
                  fontFamily: "var(--font-geist-sans)",
                  minWidth: 32,
                }}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              style={{
                borderRadius: 9999,
                border: "1.5px solid rgba(14,15,12,0.15)",
                backgroundColor: "transparent",
                padding: "6px 14px",
                fontSize: 12,
                fontWeight: 600,
                color: page === totalPages ? "#868685" : "#0E0F0C",
                cursor: page === totalPages ? "default" : "pointer",
                fontFamily: "var(--font-geist-sans)",
              }}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
