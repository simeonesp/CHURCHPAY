"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function PayPage({
  params,
}: {
  params: Promise<{ church: string }>;
}) {
  const { church } = use(params);
  const router = useRouter();

  // Summary amounts (in a real app, passed via state/query params)
  const nairaAmount = "25,000";
  const usdAmount = "$16";
  const churchName = "Lakewood";

  return (
    <div
      className="flex flex-col"
      style={{ minHeight: "100svh", padding: "0 0 40px" }}
    >
      {/* Top bar */}
      <div
        className="flex items-center"
        style={{
          paddingTop: 20,
          paddingBottom: 12,
          paddingLeft: 20,
          paddingRight: 20,
          position: "relative",
        }}
      >
        {/* Back arrow */}
        <button
          onClick={() => router.back()}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 4,
            color: "#0E0F0C",
            display: "flex",
            alignItems: "center",
            position: "absolute",
            left: 20,
          }}
          aria-label="Go back"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path
              d="M19 12H5M11 6l-6 6 6 6"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Centered title */}
        <div className="flex-1 flex justify-center">
          <span
            style={{
              fontSize: 15,
              fontWeight: 700,
              color: "#0E0F0C",
              letterSpacing: "-0.01em",
            }}
          >
            Choose payment
          </span>
        </div>
      </div>

      {/* Summary chip */}
      <div
        className="flex justify-center"
        style={{ paddingBottom: 24, paddingTop: 4 }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            backgroundColor: "#E2F6D5",
            borderRadius: 9999,
            paddingTop: 7,
            paddingBottom: 7,
            paddingLeft: 14,
            paddingRight: 14,
          }}
        >
          <span
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: "#163300",
              fontVariantNumeric: "tabular-nums",
              fontFeatureSettings: '"tnum" 1',
              letterSpacing: "-0.01em",
            }}
          >
            ₦{nairaAmount} → {usdAmount} to {churchName}
          </span>
        </div>
      </div>

      {/* Payment methods */}
      <div
        className="flex flex-col"
        style={{ padding: "0 20px", gap: 10 }}
      >
        {/* Apple Pay */}
        <Link
          href={`/give/${church}/confirm`}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            padding: "16px 18px",
            borderRadius: 16,
            border: "1px solid rgba(14,15,12,0.12)",
            backgroundColor: "#FBFBF9",
            textDecoration: "none",
            cursor: "pointer",
          }}
        >
          {/* Apple Pay logo */}
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 10,
              backgroundColor: "#000000",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            {/* Apple logo SVG */}
            <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
          </div>
          <div className="flex flex-col" style={{ flex: 1, gap: 2 }}>
            <span
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: "#0E0F0C",
                letterSpacing: "-0.01em",
              }}
            >
              Apple Pay
            </span>
            <span style={{ fontSize: 13, fontWeight: 500, color: "#868685" }}>
              Touch ID to confirm
            </span>
          </div>
          <ChevronRight />
        </Link>

        {/* Google Pay */}
        <Link
          href={`/give/${church}/confirm`}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            padding: "16px 18px",
            borderRadius: 16,
            border: "1px solid rgba(14,15,12,0.12)",
            backgroundColor: "#FBFBF9",
            textDecoration: "none",
            cursor: "pointer",
          }}
        >
          {/* Google Pay G logo */}
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 10,
              backgroundColor: "#ffffff",
              border: "1px solid rgba(14,15,12,0.10)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
          </div>
          <div className="flex flex-col" style={{ flex: 1, gap: 2 }}>
            <span
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: "#0E0F0C",
                letterSpacing: "-0.01em",
              }}
            >
              Google Pay
            </span>
          </div>
          <ChevronRight />
        </Link>

        {/* M-Pesa */}
        <Link
          href={`/give/${church}/confirm`}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            padding: "16px 18px",
            borderRadius: 16,
            border: "1px solid rgba(14,15,12,0.12)",
            backgroundColor: "#FBFBF9",
            textDecoration: "none",
            cursor: "pointer",
          }}
        >
          {/* M-Pesa logo */}
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 10,
              backgroundColor: "#00A94F",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <span
              style={{
                fontSize: 11,
                fontWeight: 900,
                color: "#ffffff",
                letterSpacing: "-0.02em",
                lineHeight: 1,
              }}
            >
              M
            </span>
          </div>
          <div className="flex flex-col" style={{ flex: 1, gap: 2 }}>
            <span
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: "#0E0F0C",
                letterSpacing: "-0.01em",
              }}
            >
              M-Pesa
            </span>
            <span
              style={{
                fontSize: 13,
                fontWeight: 500,
                color: "#868685",
                fontVariantNumeric: "tabular-nums",
                fontFeatureSettings: '"tnum" 1',
              }}
            >
              +254 7XX XXX XXX
            </span>
          </div>
          <ChevronRight />
        </Link>

        {/* Divider */}
        <div
          className="flex items-center gap-3"
          style={{ paddingTop: 4, paddingBottom: 4 }}
        >
          <div
            style={{
              flex: 1,
              height: 1,
              backgroundColor: "rgba(14,15,12,0.10)",
            }}
          />
          <span
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: "#868685",
              whiteSpace: "nowrap",
            }}
          >
            or pay by card
          </span>
          <div
            style={{
              flex: 1,
              height: 1,
              backgroundColor: "rgba(14,15,12,0.10)",
            }}
          />
        </div>

        {/* Card */}
        <Link
          href={`/give/${church}/confirm`}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            padding: "16px 18px",
            borderRadius: 16,
            border: "1px solid rgba(14,15,12,0.12)",
            backgroundColor: "#FBFBF9",
            textDecoration: "none",
            cursor: "pointer",
          }}
        >
          {/* Card icon */}
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 10,
              backgroundColor: "#F3F3F1",
              border: "1px solid rgba(14,15,12,0.10)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <rect
                x="2"
                y="5"
                width="20"
                height="14"
                rx="3"
                stroke="#454745"
                strokeWidth="2"
              />
              <path
                d="M2 10h20"
                stroke="#454745"
                strokeWidth="2"
              />
              <rect x="5" y="14" width="4" height="2" rx="1" fill="#454745" />
            </svg>
          </div>
          <div className="flex flex-col" style={{ flex: 1, gap: 2 }}>
            <span
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: "#0E0F0C",
                letterSpacing: "-0.01em",
              }}
            >
              Debit or credit card
            </span>
            <span style={{ fontSize: 13, fontWeight: 500, color: "#868685" }}>
              New or saved
            </span>
          </div>
          <ChevronRight />
        </Link>
      </div>

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* Security footer */}
      <div
        className="flex items-center justify-center gap-1.5"
        style={{ paddingTop: 24 }}
      >
        <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
          <path
            d="M8 1L3 3.5v4.5c0 2.97 2.1 5.74 5 6.4 2.9-.66 5-3.43 5-6.4V3.5L8 1z"
            stroke="#868685"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="M5.5 8l1.8 1.8L10.5 6"
            stroke="#868685"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span
          style={{
            fontSize: 12,
            fontWeight: 500,
            color: "#868685",
            letterSpacing: "-0.005em",
          }}
        >
          Secured by ChurchPay · 256-bit encryption
        </span>
      </div>
    </div>
  );
}

function ChevronRight() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      style={{ flexShrink: 0, opacity: 0.4 }}
    >
      <path
        d="M9 6l6 6-6 6"
        stroke="#0E0F0C"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
