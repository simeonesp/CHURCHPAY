"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <path d="M2 6.5L9 2l7 4.5V16a1 1 0 01-1 1H3a1 1 0 01-1-1V6.5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="none"/>
        <path d="M6.5 17V10.5h5V17" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    href: "/dashboard/giving-feed",
    label: "Giving feed",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <rect x="2" y="3" width="14" height="2" rx="1" fill="currentColor"/>
        <rect x="2" y="8" width="14" height="2" rx="1" fill="currentColor"/>
        <rect x="2" y="13" width="9" height="2" rx="1" fill="currentColor"/>
      </svg>
    ),
  },
  {
    href: "/dashboard/reconciliation",
    label: "Reconciliation",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M6 9l2.5 2.5L13 6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    href: "/dashboard/payouts",
    label: "Payouts & balance",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <rect x="1.5" y="4.5" width="15" height="10" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M1.5 8h15" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="4" y="11" width="4" height="1.5" rx="0.75" fill="currentColor"/>
      </svg>
    ),
  },
  {
    href: "/dashboard/reports",
    label: "Reports",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <path d="M10 2H4a1 1 0 00-1 1v12a1 1 0 001 1h10a1 1 0 001-1V6l-5-4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="none"/>
        <path d="M10 2v4h4" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M6 10h6M6 13h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    href: "/dashboard/settings",
    label: "Settings",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <circle cx="9" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M9 1.5v2M9 14.5v2M1.5 9h2M14.5 9h2M3.7 3.7l1.4 1.4M12.9 12.9l1.4 1.4M3.7 14.3l1.4-1.4M12.9 5.1l1.4-1.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  };

  return (
    <div
      className="flex"
      style={{ minHeight: "100vh", backgroundColor: "#FBFBF9" }}
    >
      {/* Fixed left sidebar */}
      <aside
        style={{
          width: 240,
          minWidth: 240,
          height: "100vh",
          position: "fixed",
          top: 0,
          left: 0,
          backgroundColor: "#fff",
          borderRight: "1px solid rgba(14,15,12,0.12)",
          display: "flex",
          flexDirection: "column",
          zIndex: 40,
        }}
      >
        {/* Logo */}
        <div style={{ padding: "24px 20px 20px" }}>
          <Link
            href="/dashboard"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              textDecoration: "none",
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                backgroundColor: "#163300",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M8 2L3 6v8h4v-4h2v4h4V6L8 2z" fill="#E2F6D5"/>
              </svg>
            </div>
            <span
              style={{
                fontFamily: "var(--font-geist-sans)",
                fontWeight: 800,
                fontSize: 16,
                color: "#0E0F0C",
                letterSpacing: "-0.02em",
              }}
            >
              ChurchPay
            </span>
          </Link>
        </div>

        {/* Church selector */}
        <div style={{ padding: "0 12px 16px" }}>
          <button
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 10px",
              borderRadius: 12,
              border: "1px solid rgba(14,15,12,0.12)",
              backgroundColor: "#FBFBF9",
              cursor: "pointer",
              textAlign: "left",
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                backgroundColor: "#163300",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-geist-sans)",
                  fontWeight: 700,
                  fontSize: 11,
                  color: "#E2F6D5",
                  letterSpacing: "0.02em",
                }}
              >
                LC
              </span>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontFamily: "var(--font-geist-sans)",
                  fontWeight: 600,
                  fontSize: 13,
                  color: "#0E0F0C",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                Lakewood Church
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: "#868685",
                  fontWeight: 500,
                  fontFamily: "var(--font-geist-sans)",
                }}
              >
                Admin workspace
              </div>
            </div>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0, color: "#868685" }}>
              <path d="M3.5 5.5L7 9l3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Nav divider */}
        <div style={{ height: 1, backgroundColor: "rgba(14,15,12,0.06)", margin: "0 20px 8px" }} />

        {/* Navigation */}
        <nav style={{ padding: "4px 12px", flex: 1 }}>
          <div style={{ marginBottom: 4 }}>
            <span
              style={{
                fontSize: 10,
                fontWeight: 700,
                color: "#868685",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                padding: "0 8px",
                fontFamily: "var(--font-geist-sans)",
              }}
            >
              Menu
            </span>
          </div>
          <ul style={{ listStyle: "none", padding: 0, margin: "6px 0 0" }}>
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.href} style={{ marginBottom: 2 }}>
                  <Link
                    href={item.href}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      padding: "9px 10px",
                      borderRadius: 10,
                      textDecoration: "none",
                      fontFamily: "var(--font-geist-sans)",
                      fontWeight: active ? 700 : 600,
                      fontSize: 13.5,
                      color: active ? "#163300" : "#454745",
                      backgroundColor: active ? "#E2F6D5" : "transparent",
                      transition: "background-color 0.12s ease, color 0.12s ease",
                    }}
                    onMouseEnter={(e) => {
                      if (!active) {
                        (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#E2F6D5";
                        (e.currentTarget as HTMLAnchorElement).style.color = "#163300";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!active) {
                        (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "transparent";
                        (e.currentTarget as HTMLAnchorElement).style.color = "#454745";
                      }
                    }}
                  >
                    <span style={{ flexShrink: 0, opacity: active ? 1 : 0.75 }}>
                      {item.icon}
                    </span>
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Bottom: Help link */}
        <div style={{ padding: "16px 20px 24px", borderTop: "1px solid rgba(14,15,12,0.08)" }}>
          <Link
            href="/dashboard/help"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              textDecoration: "none",
              color: "#868685",
              fontSize: 13,
              fontWeight: 600,
              fontFamily: "var(--font-geist-sans)",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.4"/>
              <path d="M6 6.5c0-1.1.9-2 2-2s2 .9 2 2c0 .9-.6 1.6-1.5 1.9V9.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
              <circle cx="8" cy="11.5" r="0.75" fill="currentColor"/>
            </svg>
            Help & support
          </Link>
        </div>
      </aside>

      {/* Main content area */}
      <main
        style={{
          marginLeft: 240,
          flex: 1,
          minWidth: 0,
          minHeight: "100vh",
          backgroundColor: "#FBFBF9",
        }}
      >
        {children}
      </main>
    </div>
  );
}
