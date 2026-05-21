"use client";

import { use } from "react";
import Link from "next/link";

export default function TrustFramePage({
  params,
}: {
  params: Promise<{ church: string }>;
}) {
  const { church } = use(params);

  // In a real app, fetch church data from the church slug.
  // For this prototype, we display Lakewood Church for all slugs.
  const churchName = "Lakewood Church";
  const churchLocation = "Houston, TX · United States";

  return (
    <div
      className="flex flex-col"
      style={{ minHeight: "100svh", padding: "0 24px 32px" }}
    >
      {/* Top bar */}
      <div
        className="flex items-center gap-2"
        style={{ paddingTop: 20, paddingBottom: 8 }}
      >
        <div
          className="flex items-center justify-center"
          style={{
            width: 28,
            height: 28,
            borderRadius: 9999,
            backgroundColor: "#163300",
            flexShrink: 0,
          }}
        >
          <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
            <path
              d="M10 3L17 10L10 17M3 10H17"
              stroke="#E2F6D5"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <span
          style={{
            fontSize: 15,
            fontWeight: 700,
            color: "#0E0F0C",
            letterSpacing: "-0.01em",
          }}
        >
          ChurchPay
        </span>
      </div>

      {/* Main content — generous top space */}
      <div
        className="flex flex-col items-center"
        style={{ paddingTop: 96, flex: 1 }}
      >
        {/* Church icon */}
        <div
          className="flex items-center justify-center"
          style={{
            width: 80,
            height: 80,
            borderRadius: 9999,
            backgroundColor: "#E2F6D5",
            marginBottom: 24,
          }}
        >
          {/* Church / cross icon */}
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
            {/* Cross */}
            <rect x="16" y="4" width="4" height="16" rx="2" fill="#163300" />
            <rect x="10" y="8" width="16" height="4" rx="2" fill="#163300" />
            {/* Church body */}
            <path
              d="M8 20h20v12H8z"
              rx="2"
              fill="none"
              stroke="#163300"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            {/* Door */}
            <path
              d="M15 32v-5a3 3 0 0 1 6 0v5"
              stroke="#163300"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Church name */}
        <h1
          className="text-center"
          style={{
            fontSize: 32,
            fontWeight: 800,
            color: "#0E0F0C",
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            marginBottom: 8,
          }}
        >
          {churchName}
        </h1>

        {/* Location */}
        <p
          className="text-center"
          style={{
            fontSize: 15,
            fontWeight: 600,
            color: "#868685",
            marginBottom: 20,
          }}
        >
          {churchLocation}
        </p>

        {/* Verified badge */}
        <div
          className="flex items-center gap-1.5"
          style={{
            backgroundColor: "#E2F6D5",
            borderRadius: 9999,
            paddingTop: 6,
            paddingBottom: 6,
            paddingLeft: 12,
            paddingRight: 14,
          }}
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="7" fill="#163300" />
            <path
              d="M5 8l2.5 2.5L11 5.5"
              stroke="#E2F6D5"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: "#163300",
            }}
          >
            Verified church on ChurchPay
          </span>
        </div>
      </div>

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* Bottom CTA */}
      <div className="flex flex-col gap-3">
        <Link
          href={`/give/${church}/amount`}
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
          Give
        </Link>

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
