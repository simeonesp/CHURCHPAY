"use client";

import { use } from "react";
import Link from "next/link";

export default function ConfirmPage({
  params,
}: {
  params: Promise<{ church: string }>;
}) {
  const { church } = use(params);

  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div
      className="flex flex-col animate-fade-up"
      style={{ minHeight: "100svh", padding: "0 20px 40px" }}
    >
      {/* Warm glow background accent — subtle radial behind the checkmark */}
      <div
        aria-hidden
        style={{
          position: "fixed",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: 390,
          height: 280,
          background:
            "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(255,192,145,0.22) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Content */}
      <div
        className="flex flex-col items-center"
        style={{ paddingTop: 72, position: "relative", zIndex: 1 }}
      >
        {/* Success checkmark circle */}
        <div
          className="animate-glow"
          style={{
            width: 84,
            height: 84,
            borderRadius: 9999,
            backgroundColor: "#FFF5EE",
            border: "3px solid #FFC091",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 28,
          }}
        >
          <svg width="38" height="38" viewBox="0 0 40 40" fill="none">
            <circle cx="20" cy="20" r="18" fill="#E2F6D5" />
            <path
              d="M12 20l6 6 10-12"
              stroke="#163300"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Thank you heading */}
        <h1
          className="text-center"
          style={{
            fontSize: 36,
            fontWeight: 800,
            color: "#0E0F0C",
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            marginBottom: 10,
          }}
        >
          Thank you, Sam.
        </h1>

        {/* Subtitle */}
        <p
          className="text-center"
          style={{
            fontSize: 16,
            fontWeight: 600,
            color: "#454745",
            marginBottom: 32,
            letterSpacing: "-0.01em",
          }}
        >
          Your gift is on its way.
        </p>

        {/* Gift summary card */}
        <div
          className="card-lg w-full"
          style={{ padding: "22px 22px", marginBottom: 16 }}
        >
          <SummaryRow label="You gave" value="₦25,000" valueStyle={{ fontVariantNumeric: "tabular-nums", fontFeatureSettings: '"tnum" 1' }} />
          <Divider />
          <SummaryRow
            label="Lakewood receives"
            value="$16.00"
            valueStyle={{
              color: "#163300",
              fontVariantNumeric: "tabular-nums",
              fontFeatureSettings: '"tnum" 1',
            }}
          />
          <Divider />
          <SummaryRow label="Rate" value="Mid-market rate" />
          <Divider />
          <SummaryRow label="Date" value={today} />
          <Divider />
          <SummaryRow
            label="Reference"
            value="CPY-20240521-7834"
            valueStyle={{
              fontFamily: "var(--font-geist-mono, monospace)",
              fontSize: 13,
              letterSpacing: "0.02em",
              color: "#454745",
            }}
          />
        </div>

        {/* Action row */}
        <div className="flex gap-3 w-full" style={{ marginBottom: 32 }}>
          <button
            style={{
              flex: 1,
              height: 48,
              borderRadius: 9999,
              border: "1.5px solid rgba(14,15,12,0.18)",
              backgroundColor: "transparent",
              fontSize: 14,
              fontWeight: 700,
              color: "#0E0F0C",
              cursor: "pointer",
              letterSpacing: "-0.01em",
            }}
          >
            Save receipt
          </button>
          <button
            style={{
              flex: 1,
              height: 48,
              borderRadius: 9999,
              border: "1.5px solid rgba(14,15,12,0.18)",
              backgroundColor: "transparent",
              fontSize: 14,
              fontWeight: 700,
              color: "#0E0F0C",
              cursor: "pointer",
              letterSpacing: "-0.01em",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
            }}
          >
            <svg width="15" height="15" viewBox="0 0 20 20" fill="none">
              <path
                d="M13 3l4 4-4 4M17 7H7a4 4 0 0 0 0 8h1"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Share
          </button>
        </div>

        {/* Separator */}
        <div
          style={{
            width: "100%",
            height: 1,
            backgroundColor: "rgba(14,15,12,0.08)",
            marginBottom: 24,
          }}
        />

        {/* Soft app prompt card */}
        <div
          style={{
            width: "100%",
            borderRadius: 20,
            backgroundColor: "#F5F5F3",
            padding: "20px 20px",
            marginBottom: 28,
          }}
        >
          {/* App icon row */}
          <div className="flex items-center gap-3" style={{ marginBottom: 12 }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                backgroundColor: "#163300",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                <path
                  d="M10 3L17 10L10 17M3 10H17"
                  stroke="#E2F6D5"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <p
                style={{
                  fontSize: 15,
                  fontWeight: 800,
                  color: "#0E0F0C",
                  lineHeight: 1.2,
                  letterSpacing: "-0.02em",
                }}
              >
                Give every Sunday in one tap
              </p>
              <p
                style={{
                  fontSize: 13,
                  fontWeight: 500,
                  color: "#454745",
                  lineHeight: 1.3,
                  marginTop: 2,
                }}
              >
                Get the ChurchPay app for recurring giving
              </p>
            </div>
          </div>

          {/* Store badge pills */}
          <div className="flex gap-2">
            <a
              href="#"
              style={{
                flex: 1,
                height: 40,
                borderRadius: 9999,
                backgroundColor: "#0E0F0C",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                textDecoration: "none",
              }}
            >
              {/* Apple icon */}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#ffffff",
                  letterSpacing: "-0.01em",
                }}
              >
                App Store
              </span>
            </a>
            <a
              href="#"
              style={{
                flex: 1,
                height: 40,
                borderRadius: 9999,
                backgroundColor: "#0E0F0C",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                textDecoration: "none",
              }}
            >
              {/* Google Play triangle icon */}
              <svg width="13" height="13" viewBox="0 0 24 24" fill="white">
                <path d="M5 3l14 9-14 9V3z" />
              </svg>
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#ffffff",
                  letterSpacing: "-0.01em",
                }}
              >
                Google Play
              </span>
            </a>
          </div>
        </div>

        {/* Footer links */}
        <div className="flex items-center justify-center gap-3">
          <a
            href="#"
            style={{
              fontSize: 12,
              color: "#868685",
              fontWeight: 500,
              textDecoration: "none",
            }}
          >
            Terms
          </a>
          <span style={{ color: "#868685", fontSize: 12 }}>·</span>
          <a
            href="#"
            style={{
              fontSize: 12,
              color: "#868685",
              fontWeight: 500,
              textDecoration: "none",
            }}
          >
            Privacy
          </a>
          <span style={{ color: "#868685", fontSize: 12 }}>·</span>
          <a
            href="#"
            style={{
              fontSize: 12,
              color: "#868685",
              fontWeight: 500,
              textDecoration: "none",
            }}
          >
            Help
          </a>
        </div>
      </div>
    </div>
  );
}

// ---- Sub-components ----

function SummaryRow({
  label,
  value,
  valueStyle,
}: {
  label: string;
  value: string;
  valueStyle?: React.CSSProperties;
}) {
  return (
    <div
      className="flex items-center justify-between"
      style={{ paddingTop: 11, paddingBottom: 11 }}
    >
      <span
        style={{
          fontSize: 14,
          fontWeight: 600,
          color: "#868685",
          letterSpacing: "-0.005em",
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontSize: 14,
          fontWeight: 700,
          color: "#0E0F0C",
          letterSpacing: "-0.01em",
          ...valueStyle,
        }}
      >
        {value}
      </span>
    </div>
  );
}

function Divider() {
  return (
    <div
      style={{
        height: 1,
        backgroundColor: "rgba(14,15,12,0.07)",
        marginLeft: -2,
        marginRight: -2,
      }}
    />
  );
}
