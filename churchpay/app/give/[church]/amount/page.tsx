"use client";

import { use, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const SUGGESTED_AMOUNTS = [5000, 10000, 25000, 50000];

// Approximate mid-market rate: ₦1 ≈ $0.00064  (₦25,000 ≈ $16)
function nairaToUSD(naira: number): number {
  return Math.round((naira * 0.00064) * 100) / 100;
}

function formatNaira(amount: number): string {
  return amount.toLocaleString("en-NG");
}

function formatUSD(amount: number): string {
  return amount.toFixed(2);
}

export default function AmountPage({
  params,
}: {
  params: Promise<{ church: string }>;
}) {
  const { church } = use(params);
  const router = useRouter();

  const churchName = "Lakewood Church";
  const [amount, setAmount] = useState(25000);
  const usd = nairaToUSD(amount);

  return (
    <div
      className="flex flex-col"
      style={{ minHeight: "100svh", padding: "0 0 32px" }}
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
              textAlign: "center",
            }}
          >
            Giving to {churchName}
          </span>
        </div>
      </div>

      {/* Content */}
      <div
        className="flex flex-col items-center"
        style={{ padding: "12px 24px 0", flex: 1 }}
      >
        {/* Currency selector */}
        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            backgroundColor: "#F3F3F1",
            border: "1px solid rgba(14,15,12,0.10)",
            borderRadius: 9999,
            paddingTop: 8,
            paddingBottom: 8,
            paddingLeft: 14,
            paddingRight: 12,
            cursor: "pointer",
            marginBottom: 32,
          }}
        >
          <span
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: "#0E0F0C",
            }}
          >
            ₦ NGN
          </span>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path
              d="M4 6l4 4 4-4"
              stroke="#454745"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Large amount display */}
        <div
          className="flex items-start"
          style={{ marginBottom: 8 }}
        >
          <span
            style={{
              fontSize: 28,
              fontWeight: 800,
              color: "#868685",
              lineHeight: 1,
              marginTop: 12,
              marginRight: 4,
              fontVariantNumeric: "tabular-nums",
            }}
          >
            ₦
          </span>
          <span
            className="amount-display"
            style={{
              fontSize: 80,
              fontWeight: 800,
              color: "#0E0F0C",
              lineHeight: 0.95,
              letterSpacing: "-0.04em",
              fontVariantNumeric: "tabular-nums",
              fontFeatureSettings: '"tnum" 1',
            }}
          >
            {formatNaira(amount)}
          </span>
        </div>

        {/* The conversion line */}
        <div
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: "#454745",
            marginBottom: 32,
            textAlign: "center",
            fontVariantNumeric: "tabular-nums",
            fontFeatureSettings: '"tnum" 1',
            lineHeight: 1.4,
          }}
        >
          You give{" "}
          <span style={{ color: "#0E0F0C", fontWeight: 700 }}>
            ₦{formatNaira(amount)}
          </span>{" "}
          · {churchName} receives{" "}
          <span style={{ color: "#163300", fontWeight: 700 }}>
            ${formatUSD(usd)}
          </span>{" "}
          · mid-market rate, no added fee
        </div>

        {/* Suggested amount pills */}
        <div
          className="flex gap-2 flex-wrap justify-center"
          style={{ marginBottom: 28 }}
        >
          {SUGGESTED_AMOUNTS.map((amt) => {
            const selected = amt === amount;
            return (
              <button
                key={amt}
                onClick={() => setAmount(amt)}
                style={{
                  borderRadius: 9999,
                  paddingTop: 10,
                  paddingBottom: 10,
                  paddingLeft: 18,
                  paddingRight: 18,
                  fontSize: 14,
                  fontWeight: 700,
                  cursor: "pointer",
                  fontVariantNumeric: "tabular-nums",
                  fontFeatureSettings: '"tnum" 1',
                  transition: "all 0.15s ease",
                  backgroundColor: selected ? "#163300" : "#F3F3F1",
                  color: selected ? "#E2F6D5" : "#0E0F0C",
                  border: selected
                    ? "1px solid #163300"
                    : "1px solid rgba(14,15,12,0.12)",
                }}
              >
                ₦{formatNaira(amt)}
              </button>
            );
          })}
        </div>

        {/* Fund picker */}
        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "4px 0",
            marginBottom: 16,
          }}
        >
          <span style={{ fontSize: 14, fontWeight: 600, color: "#454745" }}>
            Fund:
          </span>
          <span style={{ fontSize: 14, fontWeight: 700, color: "#0E0F0C" }}>
            General
          </span>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path
              d="M4 6l4 4 4-4"
              stroke="#454745"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* Bottom CTA */}
      <div style={{ padding: "0 24px" }}>
        <Link
          href={`/give/${church}/pay`}
          className="flex items-center justify-center btn-pill"
          style={{
            backgroundColor: "#163300",
            color: "#E2F6D5",
            height: 56,
            fontSize: 17,
            fontWeight: 700,
            textDecoration: "none",
            letterSpacing: "-0.01em",
          }}
        >
          Continue
        </Link>
      </div>
    </div>
  );
}
