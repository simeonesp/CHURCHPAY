"use client";

import { useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type CardData = {
  id: number;
  name: string;
  cardholderName: string;
  numberEnding: string;
  expiry: string;
  badge: string;
  badgeBg: string;
  badgeColor: string;
  network: "visa" | "mastercard";
  gradient: string;
  textColor: string;
  chipColor: string;
  isPending?: boolean;
};

type TabKey = "transactions" | "pending" | "declined";

// ─── Constants ────────────────────────────────────────────────────────────────

const TAB_NUM: React.CSSProperties = {
  fontVariantNumeric: "tabular-nums",
  fontFeatureSettings: '"tnum" 1',
};

const FONT = "var(--font-geist-sans)";

const CARDS: CardData[] = [
  {
    id: 1,
    name: "General Fund",
    cardholderName: "Lakewood Church",
    numberEnding: "4821",
    expiry: "12/27",
    badge: "Virtual",
    badgeBg: "#163300",
    badgeColor: "#E2F6D5",
    network: "visa",
    gradient: "linear-gradient(135deg, #E2F6D5 0%, #c8edbc 100%)",
    textColor: "#163300",
    chipColor: "#C9A84C",
    isPending: false,
  },
  {
    id: 2,
    name: "Missions Fund",
    cardholderName: "Lakewood Church",
    numberEnding: "9034",
    expiry: "12/27",
    badge: "Virtual",
    badgeBg: "#E2F6D5",
    badgeColor: "#163300",
    network: "visa",
    gradient: "linear-gradient(135deg, #163300 0%, #254a0f 100%)",
    textColor: "#E2F6D5",
    chipColor: "#C9A84C",
    isPending: false,
  },
  {
    id: 3,
    name: "Corporate Spend",
    cardholderName: "Lakewood Church",
    numberEnding: "7712",
    expiry: "12/27",
    badge: "Corporate",
    badgeBg: "#FFC091",
    badgeColor: "#0E0F0C",
    network: "mastercard",
    gradient: "linear-gradient(135deg, #1a1a18 0%, #2d2d2a 100%)",
    textColor: "#FBFBF9",
    chipColor: "#C9A84C",
    isPending: false,
  },
  {
    id: 4,
    name: "ChurchPay Black",
    cardholderName: "Lakewood Church",
    numberEnding: "---",
    expiry: "— —/— —",
    badge: "Physical",
    badgeBg: "#FFC091",
    badgeColor: "#0E0F0C",
    network: "visa",
    gradient: "linear-gradient(135deg, #0E0F0C 0%, #1c1c1a 60%, #2a2018 100%)",
    textColor: "#FBFBF9",
    chipColor: "#C9A84C",
    isPending: true,
  },
];

const TRANSACTIONS = [
  {
    date: "May 21",
    merchant: "Amazon Business",
    category: "Office supplies",
    amount: "-$124.99",
    status: "Settled",
  },
  {
    date: "May 20",
    merchant: "Delta Airlines",
    category: "Travel",
    amount: "-$842.00",
    status: "Settled",
  },
  {
    date: "May 19",
    merchant: "Office Depot",
    category: "Office supplies",
    amount: "-$67.30",
    status: "Settled",
  },
  {
    date: "May 18",
    merchant: "Hilton Hotels",
    category: "Accommodation",
    amount: "-$389.00",
    status: "Settled",
  },
  {
    date: "May 17",
    merchant: "Zoom Video",
    category: "Software",
    amount: "-$149.90",
    status: "Settled",
  },
  {
    date: "May 16",
    merchant: "Uber",
    category: "Transport",
    amount: "-$34.20",
    status: "Settled",
  },
  {
    date: "May 15",
    merchant: "Spotify Business",
    category: "Software",
    amount: "-$9.99",
    status: "Settled",
  },
  {
    date: "May 14",
    merchant: "Canva",
    category: "Software",
    amount: "-$12.99",
    status: "Settled",
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function NetworkLogo({
  network,
  color,
  size = "sm",
}: {
  network: "visa" | "mastercard";
  color: string;
  size?: "sm" | "lg";
}) {
  if (network === "visa") {
    return (
      <span
        style={{
          fontFamily: "Georgia, serif",
          fontStyle: "italic",
          fontWeight: 900,
          fontSize: size === "lg" ? 22 : 16,
          color,
          letterSpacing: "-0.03em",
          lineHeight: 1,
        }}
      >
        VISA
      </span>
    );
  }
  // Mastercard — two overlapping circles
  const r = size === "lg" ? 13 : 9;
  const w = size === "lg" ? 38 : 28;
  const h = size === "lg" ? 26 : 18;
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none">
      <circle cx={r} cy={h / 2} r={r} fill="#EB001B" fillOpacity="0.9" />
      <circle cx={w - r} cy={h / 2} r={r} fill="#F79E1B" fillOpacity="0.9" />
      <ellipse
        cx={w / 2}
        cy={h / 2}
        rx={r * 0.45}
        ry={r * 0.82}
        fill="#FF5F00"
        fillOpacity="0.85"
      />
    </svg>
  );
}

function ContactlessIcon({ color }: { color: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M8 3c2.76 0 5 2.24 5 5s-2.24 5-5 5"
        stroke={color}
        strokeWidth="1.3"
        strokeLinecap="round"
        opacity="0.9"
      />
      <path
        d="M8 5.5c1.38 0 2.5 1.12 2.5 2.5S9.38 10.5 8 10.5"
        stroke={color}
        strokeWidth="1.3"
        strokeLinecap="round"
        opacity="0.7"
      />
      <path
        d="M8 8c0 0 0 0 0 0"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.5"
      />
    </svg>
  );
}

function PaymentCard({
  card,
  selected,
  onClick,
  width = 300,
}: {
  card: CardData;
  selected: boolean;
  onClick: () => void;
  width?: number;
}) {
  const height = Math.round(width / 1.586);
  const scale = width / 300;

  return (
    <div
      onClick={onClick}
      style={{
        position: "relative",
        width,
        height,
        borderRadius: 20 * scale,
        background: card.gradient,
        cursor: card.isPending ? "default" : "pointer",
        flexShrink: 0,
        boxShadow: selected
          ? `0 0 0 3px #163300, 0 8px 32px rgba(0,0,0,0.18)`
          : "0 4px 20px rgba(0,0,0,0.13)",
        transition: "box-shadow 0.18s ease, transform 0.15s ease",
        transform: selected ? "translateY(-2px)" : "none",
        userSelect: "none",
        overflow: "hidden",
      }}
    >
      {/* Card badge — top right */}
      <div
        style={{
          position: "absolute",
          top: 16 * scale,
          right: 16 * scale,
          backgroundColor: card.badgeBg,
          color: card.badgeColor,
          borderRadius: 9999,
          padding: `${3 * scale}px ${9 * scale}px`,
          fontSize: 10 * scale,
          fontWeight: 700,
          fontFamily: FONT,
          letterSpacing: "0.04em",
        }}
      >
        {card.badge}
      </div>

      {/* Card name — top left */}
      <div
        style={{
          position: "absolute",
          top: 18 * scale,
          left: 24 * scale,
          fontSize: 11 * scale,
          fontWeight: 600,
          color: card.textColor,
          fontFamily: FONT,
          opacity: 0.8,
          letterSpacing: "0.04em",
          textTransform: "uppercase",
        }}
      >
        {card.name}
      </div>

      {/* Chip */}
      <div
        style={{
          position: "absolute",
          left: 24 * scale,
          top: 76 * scale,
          width: 32 * scale,
          height: 24 * scale,
          borderRadius: 5 * scale,
          backgroundColor: card.chipColor,
          boxShadow: "inset 0 1px 2px rgba(0,0,0,0.15)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Chip lines */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 3 * scale,
          }}
        >
          <div
            style={{
              width: 20 * scale,
              height: 1 * scale,
              backgroundColor: "rgba(0,0,0,0.25)",
              borderRadius: 1,
            }}
          />
          <div
            style={{
              width: 20 * scale,
              height: 1 * scale,
              backgroundColor: "rgba(0,0,0,0.25)",
              borderRadius: 1,
            }}
          />
          <div
            style={{
              width: 20 * scale,
              height: 1 * scale,
              backgroundColor: "rgba(0,0,0,0.25)",
              borderRadius: 1,
            }}
          />
        </div>
      </div>

      {/* Contactless icon — right of chip */}
      <div
        style={{
          position: "absolute",
          left: 64 * scale,
          top: 80 * scale,
          opacity: 0.85,
        }}
      >
        <ContactlessIcon color={card.textColor} />
      </div>

      {/* Card number */}
      <div
        style={{
          position: "absolute",
          bottom: 44 * scale,
          left: 24 * scale,
          right: 24 * scale,
          fontSize: 14 * scale,
          fontWeight: 700,
          color: card.textColor,
          letterSpacing: "0.15em",
          fontFamily: "monospace",
          ...TAB_NUM,
        }}
      >
        {card.isPending
          ? "•••• •••• •••• — — —"
          : `•••• •••• •••• ${card.numberEnding}`}
      </div>

      {/* Cardholder name */}
      <div
        style={{
          position: "absolute",
          bottom: 18 * scale,
          left: 24 * scale,
          fontSize: 10.5 * scale,
          fontWeight: 600,
          color: card.textColor,
          fontFamily: FONT,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          opacity: 0.85,
        }}
      >
        {card.cardholderName}
      </div>

      {/* Expiry — bottom right above network */}
      <div
        style={{
          position: "absolute",
          bottom: 26 * scale,
          right: 24 * scale,
          textAlign: "right",
        }}
      >
        <div
          style={{
            fontSize: 7 * scale,
            fontWeight: 700,
            color: card.textColor,
            opacity: 0.6,
            letterSpacing: "0.06em",
            fontFamily: FONT,
            textTransform: "uppercase",
            marginBottom: 2 * scale,
          }}
        >
          Valid thru
        </div>
        <div
          style={{
            fontSize: 10 * scale,
            fontWeight: 700,
            color: card.textColor,
            fontFamily: "monospace",
            letterSpacing: "0.06em",
            opacity: 0.9,
            ...TAB_NUM,
          }}
        >
          {card.isPending ? "— —/— —" : card.expiry}
        </div>
      </div>

      {/* Network logo — bottom right */}
      <div
        style={{
          position: "absolute",
          bottom: 14 * scale,
          right: 20 * scale,
        }}
      >
        <NetworkLogo network={card.network} color={card.textColor} size="sm" />
      </div>

      {/* Pending overlay */}
      {card.isPending && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 20 * scale,
            backgroundColor: "rgba(14,15,12,0.52)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
        >
          <button
            style={{
              borderRadius: 9999,
              backgroundColor: "transparent",
              border: "2px solid #E2F6D5",
              padding: "10px 20px",
              fontSize: 13 * scale,
              fontWeight: 700,
              color: "#E2F6D5",
              cursor: "pointer",
              fontFamily: FONT,
              letterSpacing: "-0.01em",
            }}
          >
            Order physical card →
          </button>
        </div>
      )}
    </div>
  );
}

function MiniCard({ card }: { card: CardData }) {
  return <PaymentCard card={card} selected={false} onClick={() => {}} width={180} />;
}

function IssueCardForm({ onClose }: { onClose: () => void }) {
  const [cardType, setCardType] = useState<"virtual" | "corporate" | "physical">("virtual");

  const cardTypeOptions: {
    key: "virtual" | "corporate" | "physical";
    label: string;
    sub: string;
  }[] = [
    { key: "virtual", label: "Virtual card", sub: "Instant, for online spend" },
    { key: "corporate", label: "Corporate card", sub: "For organizational expenses" },
    { key: "physical", label: "Physical card", sub: "Delivered in 5–7 business days" },
  ];

  return (
    <div
      style={{
        borderRadius: 30,
        border: "1px solid rgba(14,15,12,0.12)",
        backgroundColor: "#fff",
        padding: "32px 36px",
        marginBottom: 32,
        position: "relative",
      }}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        aria-label="Close"
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          width: 32,
          height: 32,
          borderRadius: 9999,
          border: "1px solid rgba(14,15,12,0.14)",
          backgroundColor: "#FBFBF9",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          color: "#454745",
        }}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path
            d="M2 2l10 10M12 2L2 12"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      </button>

      <h2
        style={{
          fontSize: 20,
          fontWeight: 800,
          color: "#0E0F0C",
          letterSpacing: "-0.03em",
          marginBottom: 24,
          fontFamily: FONT,
        }}
      >
        Issue a new card
      </h2>

      {/* Card type selector */}
      <div style={{ marginBottom: 24 }}>
        <label
          style={{
            fontSize: 12,
            fontWeight: 700,
            color: "#454745",
            textTransform: "uppercase",
            letterSpacing: "0.07em",
            display: "block",
            marginBottom: 10,
            fontFamily: FONT,
          }}
        >
          Card type
        </label>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {cardTypeOptions.map((opt) => (
            <button
              key={opt.key}
              onClick={() => setCardType(opt.key)}
              style={{
                flex: "1 1 160px",
                borderRadius: 16,
                border: `1.5px solid ${cardType === opt.key ? "#163300" : "rgba(14,15,12,0.14)"}`,
                backgroundColor: cardType === opt.key ? "#E2F6D5" : "#FBFBF9",
                padding: "14px 16px",
                cursor: "pointer",
                textAlign: "left",
                transition: "border-color 0.15s, background-color 0.15s",
              }}
            >
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: cardType === opt.key ? "#163300" : "#0E0F0C",
                  fontFamily: FONT,
                  marginBottom: 3,
                }}
              >
                {opt.label}
              </div>
              <div
                style={{
                  fontSize: 11.5,
                  fontWeight: 500,
                  color: "#868685",
                  fontFamily: FONT,
                }}
              >
                {opt.sub}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Form grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
        {/* Card label */}
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <label
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: "#454745",
              textTransform: "uppercase",
              letterSpacing: "0.07em",
              fontFamily: FONT,
            }}
          >
            Card label
          </label>
          <input
            type="text"
            placeholder="e.g. Youth Ministry Spend"
            style={{
              borderRadius: 12,
              border: "1px solid rgba(14,15,12,0.18)",
              backgroundColor: "#FBFBF9",
              padding: "11px 14px",
              fontSize: 13.5,
              fontWeight: 600,
              color: "#0E0F0C",
              fontFamily: FONT,
              outline: "none",
            }}
          />
        </div>

        {/* Fund assignment */}
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <label
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: "#454745",
              textTransform: "uppercase",
              letterSpacing: "0.07em",
              fontFamily: FONT,
            }}
          >
            Fund assignment
          </label>
          <select
            style={{
              borderRadius: 12,
              border: "1px solid rgba(14,15,12,0.18)",
              backgroundColor: "#FBFBF9",
              padding: "11px 14px",
              fontSize: 13.5,
              fontWeight: 600,
              color: "#0E0F0C",
              fontFamily: FONT,
              outline: "none",
              cursor: "pointer",
              appearance: "auto",
            }}
          >
            <option>General</option>
            <option>Missions</option>
            <option>Building Fund</option>
            <option>Youth Ministry</option>
          </select>
        </div>

        {/* Monthly limit */}
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <label
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: "#454745",
              textTransform: "uppercase",
              letterSpacing: "0.07em",
              fontFamily: FONT,
            }}
          >
            Monthly limit
          </label>
          <div style={{ position: "relative" }}>
            <span
              style={{
                position: "absolute",
                left: 14,
                top: "50%",
                transform: "translateY(-50%)",
                fontSize: 13.5,
                fontWeight: 700,
                color: "#454745",
                fontFamily: FONT,
                pointerEvents: "none",
              }}
            >
              $
            </span>
            <input
              type="number"
              defaultValue="5000"
              style={{
                width: "100%",
                borderRadius: 12,
                border: "1px solid rgba(14,15,12,0.18)",
                backgroundColor: "#FBFBF9",
                padding: "11px 14px 11px 26px",
                fontSize: 13.5,
                fontWeight: 600,
                color: "#0E0F0C",
                fontFamily: FONT,
                outline: "none",
                boxSizing: "border-box",
                ...TAB_NUM,
              }}
            />
          </div>
        </div>

        {/* Cardholder name */}
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <label
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: "#454745",
              textTransform: "uppercase",
              letterSpacing: "0.07em",
              fontFamily: FONT,
            }}
          >
            Cardholder name
          </label>
          <input
            type="text"
            defaultValue="Lakewood Church"
            style={{
              borderRadius: 12,
              border: "1px solid rgba(14,15,12,0.18)",
              backgroundColor: "#FBFBF9",
              padding: "11px 14px",
              fontSize: 13.5,
              fontWeight: 600,
              color: "#0E0F0C",
              fontFamily: FONT,
              outline: "none",
            }}
          />
        </div>
      </div>

      {/* CTA + small print */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
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
            fontFamily: FONT,
            letterSpacing: "-0.01em",
          }}
        >
          Issue card
        </button>
        <p
          style={{
            fontSize: 12,
            color: "#868685",
            fontFamily: FONT,
            fontWeight: 500,
            maxWidth: 380,
          }}
        >
          Virtual cards are available immediately. Physical cards ship to your verified address.
        </p>
      </div>
    </div>
  );
}

function WalletSummaryStrip() {
  const stats = [
    { label: "Total balance", value: "$24,830.00" },
    { label: "This month spend", value: "$3,240.00" },
    { label: "Active cards", value: "4", noTabNum: true },
  ];

  return (
    <div style={{ display: "flex", gap: 16, marginTop: 32 }}>
      {stats.map((stat) => (
        <div
          key={stat.label}
          style={{
            flex: 1,
            borderRadius: 16,
            border: "1px solid rgba(14,15,12,0.12)",
            backgroundColor: "#fff",
            padding: "20px 24px",
          }}
        >
          <p
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: "#868685",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              fontFamily: FONT,
              marginBottom: 8,
            }}
          >
            {stat.label}
          </p>
          <p
            style={{
              fontSize: 28,
              fontWeight: 800,
              color: "#0E0F0C",
              letterSpacing: "-0.04em",
              lineHeight: 1,
              fontFamily: FONT,
              ...(stat.noTabNum ? {} : TAB_NUM),
            }}
          >
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  );
}

function CardDetailPanel({
  card,
  onOpenIssueForm,
}: {
  card: CardData;
  onOpenIssueForm: () => void;
}) {
  if (card.isPending) {
    // Show issue form shortcut for pending card
    return (
      <div
        style={{
          borderRadius: 30,
          border: "1px solid rgba(14,15,12,0.12)",
          backgroundColor: "#fff",
          padding: "36px 40px",
          display: "flex",
          alignItems: "center",
          gap: 32,
          marginBottom: 32,
        }}
      >
        <MiniCard card={card} />
        <div>
          <p
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: "#868685",
              textTransform: "uppercase",
              letterSpacing: "0.07em",
              fontFamily: FONT,
              marginBottom: 6,
            }}
          >
            ChurchPay Black — Physical
          </p>
          <h3
            style={{
              fontSize: 20,
              fontWeight: 800,
              color: "#0E0F0C",
              letterSpacing: "-0.02em",
              fontFamily: FONT,
              marginBottom: 6,
            }}
          >
            Order your physical card
          </h3>
          <p
            style={{
              fontSize: 13,
              color: "#868685",
              fontFamily: FONT,
              fontWeight: 500,
              marginBottom: 20,
            }}
          >
            Ships to your verified address in 5–7 business days.
          </p>
          <button
            onClick={onOpenIssueForm}
            style={{
              borderRadius: 9999,
              backgroundColor: "#163300",
              border: "none",
              padding: "11px 24px",
              fontSize: 13,
              fontWeight: 700,
              color: "#E2F6D5",
              cursor: "pointer",
              fontFamily: FONT,
            }}
          >
            Order physical card
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        borderRadius: 30,
        border: "1px solid rgba(14,15,12,0.12)",
        backgroundColor: "#fff",
        padding: "32px 36px",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 40,
        marginBottom: 32,
      }}
    >
      {/* Left column */}
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <MiniCard card={card} />

        <div>
          {/* Card name + badge */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <h3
              style={{
                fontSize: 17,
                fontWeight: 800,
                color: "#0E0F0C",
                letterSpacing: "-0.02em",
                fontFamily: FONT,
              }}
            >
              {card.name}
            </h3>
            <span
              style={{
                backgroundColor: card.badgeBg,
                color: card.badgeColor,
                borderRadius: 9999,
                padding: "3px 10px",
                fontSize: 11,
                fontWeight: 700,
                fontFamily: FONT,
              }}
            >
              {card.badge}
            </span>
          </div>

          {/* Masked number */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
            <p
              style={{
                fontSize: 15,
                fontWeight: 700,
                color: "#0E0F0C",
                letterSpacing: "0.12em",
                fontFamily: "monospace",
                ...TAB_NUM,
              }}
            >
              {`•••• •••• •••• ${card.numberEnding}`}
            </p>
            <button
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: 12,
                fontWeight: 600,
                color: "#868685",
                fontFamily: FONT,
                textDecoration: "underline",
                padding: 0,
              }}
            >
              Show number
            </button>
          </div>

          {/* Expiry + status */}
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#868685",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  fontFamily: FONT,
                }}
              >
                Expires:{" "}
              </span>
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#0E0F0C",
                  fontFamily: "monospace",
                  ...TAB_NUM,
                }}
              >
                {card.expiry}
              </span>
            </div>
            <span
              style={{
                backgroundColor: "#E2F6D5",
                color: "#054D28",
                borderRadius: 9999,
                padding: "3px 10px",
                fontSize: 11,
                fontWeight: 700,
                fontFamily: FONT,
              }}
            >
              Active
            </span>
          </div>
        </div>
      </div>

      {/* Right column */}
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {/* Spend + bar */}
        <div>
          <p
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: "#868685",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              fontFamily: FONT,
              marginBottom: 6,
            }}
          >
            Spent this month
          </p>
          <p
            style={{
              fontSize: 34,
              fontWeight: 800,
              color: "#0E0F0C",
              letterSpacing: "-0.04em",
              lineHeight: 1,
              fontFamily: FONT,
              marginBottom: 14,
              ...TAB_NUM,
            }}
          >
            $3,240.00
          </p>

          {/* Spend bar */}
          <div
            style={{
              height: 8,
              borderRadius: 9999,
              backgroundColor: "#E2F6D5",
              overflow: "hidden",
              marginBottom: 6,
            }}
          >
            <div
              style={{
                width: "65%",
                height: "100%",
                borderRadius: 9999,
                backgroundColor: "#163300",
              }}
            />
          </div>
          <p
            style={{
              fontSize: 12,
              fontWeight: 500,
              color: "#868685",
              fontFamily: FONT,
              ...TAB_NUM,
            }}
          >
            Limit: $5,000 / month
          </p>
        </div>

        {/* Control buttons */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {/* Freeze card */}
          <button
            style={{
              borderRadius: 9999,
              border: "1px solid rgba(14,15,12,0.18)",
              backgroundColor: "transparent",
              padding: "8px 14px",
              fontSize: 12.5,
              fontWeight: 600,
              color: "#0E0F0C",
              cursor: "pointer",
              fontFamily: FONT,
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <rect x="6" y="1" width="2" height="12" rx="1" fill="currentColor" />
              <rect
                x="1"
                y="6"
                width="12"
                height="2"
                rx="1"
                fill="currentColor"
              />
              <circle cx="7" cy="7" r="2" fill="currentColor" fillOpacity="0.3" />
            </svg>
            Freeze card
          </button>

          {/* Adjust limit */}
          <button
            style={{
              borderRadius: 9999,
              border: "1px solid rgba(14,15,12,0.18)",
              backgroundColor: "transparent",
              padding: "8px 14px",
              fontSize: 12.5,
              fontWeight: 600,
              color: "#0E0F0C",
              cursor: "pointer",
              fontFamily: FONT,
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M2 4h10M2 7h6M2 10h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="10" cy="4" r="1.5" fill="currentColor" />
              <circle cx="8" cy="7" r="1.5" fill="currentColor" />
              <circle cx="10" cy="10" r="1.5" fill="currentColor" />
            </svg>
            Adjust limit
          </button>

          {/* View PIN */}
          <button
            style={{
              borderRadius: 9999,
              border: "1px solid rgba(14,15,12,0.18)",
              backgroundColor: "transparent",
              padding: "8px 14px",
              fontSize: 12.5,
              fontWeight: 600,
              color: "#0E0F0C",
              cursor: "pointer",
              fontFamily: FONT,
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <ellipse cx="7" cy="7" rx="6" ry="3.5" stroke="currentColor" strokeWidth="1.4" />
              <circle cx="7" cy="7" r="1.5" fill="currentColor" />
            </svg>
            View PIN
          </button>

          {/* Cancel card */}
          <button
            style={{
              borderRadius: 9999,
              border: "1px solid rgba(208,50,56,0.35)",
              backgroundColor: "transparent",
              padding: "8px 14px",
              fontSize: 12.5,
              fontWeight: 600,
              color: "#D03238",
              cursor: "pointer",
              fontFamily: FONT,
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.4" />
              <path d="M4.5 4.5l5 5M9.5 4.5l-5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
            Cancel card
          </button>
        </div>
      </div>
    </div>
  );
}

function TransactionTable() {
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr
            style={{
              backgroundColor: "#FBFBF9",
              borderBottom: "1px solid rgba(14,15,12,0.08)",
            }}
          >
            {["Date", "Merchant", "Category", "Amount", "Status"].map((col) => (
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
                  fontFamily: FONT,
                }}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {TRANSACTIONS.map((tx, i) => (
            <tr
              key={i}
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
                  padding: "13px 16px",
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#454745",
                  whiteSpace: "nowrap",
                  fontFamily: FONT,
                }}
              >
                {tx.date}
              </td>
              <td
                style={{
                  padding: "13px 16px",
                  fontSize: 13.5,
                  fontWeight: 700,
                  color: "#0E0F0C",
                  fontFamily: FONT,
                }}
              >
                {tx.merchant}
              </td>
              <td style={{ padding: "13px 16px" }}>
                <span
                  style={{
                    fontSize: 11.5,
                    fontWeight: 600,
                    backgroundColor: "#F4F4F2",
                    color: "#868685",
                    borderRadius: 9999,
                    padding: "3px 10px",
                    whiteSpace: "nowrap",
                    fontFamily: FONT,
                  }}
                >
                  {tx.category}
                </span>
              </td>
              <td
                style={{
                  padding: "13px 16px",
                  fontSize: 14,
                  fontWeight: 700,
                  color: "#D03238",
                  whiteSpace: "nowrap",
                  fontFamily: FONT,
                  ...TAB_NUM,
                }}
              >
                {tx.amount}
              </td>
              <td style={{ padding: "13px 16px" }}>
                <span
                  style={{
                    fontSize: 11.5,
                    fontWeight: 600,
                    backgroundColor: "#E2F6D5",
                    color: "#054D28",
                    borderRadius: 9999,
                    padding: "3px 10px",
                    whiteSpace: "nowrap",
                    fontFamily: FONT,
                  }}
                >
                  {tx.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function EmptyTab({ label }: { label: string }) {
  return (
    <div
      style={{
        padding: "60px 40px",
        textAlign: "center",
        color: "#868685",
        fontFamily: FONT,
        fontSize: 14,
        fontWeight: 500,
      }}
    >
      No {label.toLowerCase()} transactions for this card.
    </div>
  );
}

// ─── Main page ─────────────────────────────────────────────────────────────────

export default function CardsPage() {
  const [selectedCard, setSelectedCard] = useState(0);
  const [activeTab, setActiveTab] = useState<TabKey>("transactions");
  const [showIssueForm, setShowIssueForm] = useState(false);

  const tabs: { key: TabKey; label: string }[] = [
    { key: "transactions", label: "Recent transactions" },
    { key: "pending", label: "Pending" },
    { key: "declined", label: "Declined" },
  ];

  const handleCardClick = (index: number) => {
    if (CARDS[index].isPending) {
      setShowIssueForm(true);
      return;
    }
    setSelectedCard(index);
  };

  return (
    <div
      style={{
        fontFamily: FONT,
        maxWidth: 1400,
        margin: "0 auto",
      }}
    >
      {/* Page header row */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          padding: "32px 40px 0",
          gap: 16,
        }}
      >
        <div>
          <h1
            style={{
              fontSize: 26,
              fontWeight: 800,
              color: "#0E0F0C",
              letterSpacing: "-0.03em",
              lineHeight: 1,
              fontFamily: FONT,
            }}
          >
            Cards &amp; Wallet
          </h1>
          <p
            style={{
              fontSize: 13.5,
              color: "#868685",
              marginTop: 5,
              fontWeight: 500,
              fontFamily: FONT,
            }}
          >
            Issue virtual cards and manage spend
          </p>
        </div>
        <button
          onClick={() => setShowIssueForm((v) => !v)}
          style={{
            borderRadius: 9999,
            backgroundColor: "#163300",
            border: "none",
            padding: "11px 22px",
            fontSize: 13,
            fontWeight: 700,
            color: "#E2F6D5",
            cursor: "pointer",
            fontFamily: FONT,
            display: "flex",
            alignItems: "center",
            gap: 7,
            letterSpacing: "-0.01em",
            flexShrink: 0,
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path
              d="M7 1v12M1 7h12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          Issue new card
        </button>
      </div>

      {/* Main content area with side padding */}
      <div style={{ padding: "0 40px 48px" }}>
        {/* Wallet summary strip */}
        <WalletSummaryStrip />

        {/* Issue card form (slide-down) */}
        {showIssueForm && (
          <div style={{ marginTop: 28 }}>
            <IssueCardForm onClose={() => setShowIssueForm(false)} />
          </div>
        )}

        {/* Card gallery section */}
        <div style={{ marginTop: 36 }}>
          {/* Section header */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
            <h2
              style={{
                fontSize: 16,
                fontWeight: 800,
                color: "#0E0F0C",
                letterSpacing: "-0.02em",
                fontFamily: FONT,
              }}
            >
              Your cards
            </h2>
            <span
              style={{
                backgroundColor: "#E2F6D5",
                color: "#163300",
                borderRadius: 9999,
                padding: "2px 10px",
                fontSize: 12,
                fontWeight: 700,
                fontFamily: FONT,
              }}
            >
              4
            </span>
          </div>

          {/* Horizontal scroll row of cards */}
          <div
            style={{
              display: "flex",
              gap: 20,
              overflowX: "auto",
              paddingBottom: 8,
              scrollbarWidth: "none",
            }}
          >
            {CARDS.map((card, i) => (
              <div key={card.id} style={{ flexShrink: 0 }}>
                <PaymentCard
                  card={card}
                  selected={!card.isPending && selectedCard === i}
                  onClick={() => handleCardClick(i)}
                  width={300}
                />
                {card.isPending && (
                  <p
                    style={{
                      fontSize: 11.5,
                      color: "#868685",
                      fontFamily: FONT,
                      fontWeight: 500,
                      textAlign: "center",
                      marginTop: 8,
                    }}
                  >
                    Ships in 5–7 business days
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Selected card detail panel */}
        <div style={{ marginTop: 36 }}>
          <CardDetailPanel
            card={CARDS[selectedCard]}
            onOpenIssueForm={() => setShowIssueForm(true)}
          />
        </div>

        {/* Tabs + transaction table */}
        <div
          style={{
            borderRadius: 30,
            border: "1px solid rgba(14,15,12,0.12)",
            backgroundColor: "#fff",
            overflow: "hidden",
          }}
        >
          {/* Tab bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 0,
              padding: "0 24px",
              borderBottom: "1px solid rgba(14,15,12,0.08)",
            }}
          >
            {tabs.map((tab) => {
              const active = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  style={{
                    background: "none",
                    border: "none",
                    borderBottom: active
                      ? "2px solid #163300"
                      : "2px solid transparent",
                    padding: "16px 16px 14px",
                    fontSize: 13.5,
                    fontWeight: active ? 700 : 600,
                    color: active ? "#163300" : "#868685",
                    cursor: "pointer",
                    fontFamily: FONT,
                    letterSpacing: "-0.01em",
                    transition: "color 0.12s, border-color 0.12s",
                  }}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Tab content */}
          {activeTab === "transactions" && <TransactionTable />}
          {activeTab === "pending" && <EmptyTab label="Pending" />}
          {activeTab === "declined" && <EmptyTab label="Declined" />}
        </div>
      </div>
    </div>
  );
}
