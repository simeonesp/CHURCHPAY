"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

// ─── Design tokens ──────────────────────────────────────────────────────────
const C = {
  canvas: "#FBFBF9",
  ink: "#0E0F0C",
  inkSecondary: "#454745",
  inkMuted: "#868685",
  evergreen: "#163300",
  mint: "#E2F6D5",
  positive: "#054D28",
  danger: "#D03238",
  border: "rgba(14,15,12,0.12)",
  borderFocus: "#163300",
  white: "#ffffff",
} as const;

// ─── Shared style helpers ────────────────────────────────────────────────────
const inputStyle = (error?: boolean, focused?: boolean): React.CSSProperties => ({
  width: "100%",
  padding: "11px 14px",
  borderRadius: 12,
  border: `1.5px solid ${error ? C.danger : focused ? C.evergreen : C.border}`,
  backgroundColor: C.white,
  color: C.ink,
  fontSize: 15,
  fontFamily: "var(--font-geist-sans)",
  fontWeight: 500,
  outline: "none",
  transition: "border-color 0.15s ease",
  boxShadow: focused ? `0 0 0 3px rgba(22,51,0,0.08)` : "none",
});

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: 13,
  fontWeight: 700,
  color: C.ink,
  marginBottom: 6,
  fontFamily: "var(--font-geist-sans)",
};

const helperStyle: React.CSSProperties = {
  fontSize: 12,
  color: C.inkMuted,
  marginTop: 5,
  fontFamily: "var(--font-geist-sans)",
  fontWeight: 500,
  lineHeight: 1.5,
};

const errorStyle: React.CSSProperties = {
  fontSize: 12,
  color: C.danger,
  marginTop: 5,
  fontFamily: "var(--font-geist-sans)",
  fontWeight: 600,
};

// ─── Field wrapper ───────────────────────────────────────────────────────────
function Field({
  label,
  helper,
  error,
  children,
}: {
  label: string;
  helper?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ marginBottom: 20 }}>
      <label style={labelStyle}>{label}</label>
      {children}
      {error && <p style={errorStyle}>{error}</p>}
      {!error && helper && <p style={helperStyle}>{helper}</p>}
    </div>
  );
}

// ─── Controlled input ────────────────────────────────────────────────────────
function Input({
  value,
  onChange,
  type = "text",
  placeholder,
  error,
}: {
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  error?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={inputStyle(error, focused)}
    />
  );
}

// ─── Controlled select ───────────────────────────────────────────────────────
function Select({
  value,
  onChange,
  options,
  error,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  error?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{
        ...inputStyle(error, focused),
        appearance: "none",
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='14' height='14' viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M3.5 5.5L7 9l3.5-3.5' stroke='%23868685' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right 14px center",
        paddingRight: 40,
        cursor: "pointer",
      }}
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}

// ─── Password input ──────────────────────────────────────────────────────────
function PasswordInput({
  value,
  onChange,
  placeholder,
  error,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  error?: boolean;
}) {
  const [show, setShow] = useState(false);
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ position: "relative" }}>
      <input
        type={show ? "text" : "password"}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{ ...inputStyle(error, focused), paddingRight: 48 }}
      />
      <button
        type="button"
        onClick={() => setShow(!show)}
        style={{
          position: "absolute",
          right: 14,
          top: "50%",
          transform: "translateY(-50%)",
          background: "none",
          border: "none",
          cursor: "pointer",
          color: C.inkMuted,
          padding: 2,
          display: "flex",
          alignItems: "center",
        }}
        aria-label={show ? "Hide password" : "Show password"}
      >
        {show ? (
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M2 2l14 14M7.4 7.5A2.5 2.5 0 0011.5 11.6M5 4.9A8.5 8.5 0 001.5 9c1.2 3 4.2 5 7.5 5a8.3 8.3 0 003.8-.9M8 4c.3 0 .7 0 1 .1A8.5 8.5 0 0116.5 9a8.5 8.5 0 01-2.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <ellipse cx="9" cy="9" rx="7.5" ry="4.5" stroke="currentColor" strokeWidth="1.5"/>
            <circle cx="9" cy="9" r="2" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
        )}
      </button>
    </div>
  );
}

// ─── Pill button ─────────────────────────────────────────────────────────────
function PillBtn({
  children,
  onClick,
  variant = "primary",
  fullWidth = false,
  disabled = false,
  type = "button",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "outline";
  fullWidth?: boolean;
  disabled?: boolean;
  type?: "button" | "submit";
}) {
  const [hovered, setHovered] = useState(false);
  const base: React.CSSProperties = {
    borderRadius: 9999,
    padding: "13px 28px",
    fontFamily: "var(--font-geist-sans)",
    fontWeight: 700,
    fontSize: 15,
    cursor: disabled ? "not-allowed" : "pointer",
    transition: "transform 0.15s ease, opacity 0.15s ease",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    border: "none",
    width: fullWidth ? "100%" : undefined,
    opacity: disabled ? 0.5 : 1,
    transform: hovered && !disabled ? "scale(1.02)" : "scale(1)",
  };
  const themed: React.CSSProperties =
    variant === "primary"
      ? { backgroundColor: C.evergreen, color: C.mint }
      : {
          backgroundColor: "transparent",
          color: C.evergreen,
          border: `1.5px solid ${C.evergreen}`,
        };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ ...base, ...themed }}
    >
      {children}
    </button>
  );
}

// ─── Back link ───────────────────────────────────────────────────────────────
function BackLink({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        color: C.inkMuted,
        fontSize: 14,
        fontWeight: 600,
        fontFamily: "var(--font-geist-sans)",
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: 0,
        marginBottom: 28,
      }}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      Back
    </button>
  );
}

// ─── Progress stepper ────────────────────────────────────────────────────────
const STEPS = [
  "Verify church",
  "Set up account",
  "Connect payouts",
  "Get your give link",
];

function Stepper({ current }: { current: number }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 0 36px",
        gap: 0,
        maxWidth: 640,
        margin: "0 auto",
      }}
    >
      {STEPS.map((label, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <div
            key={label}
            style={{ display: "flex", alignItems: "center", flex: i < STEPS.length - 1 ? 1 : undefined }}
          >
            {/* Step circle + label */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, flexShrink: 0 }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  backgroundColor: done || active ? C.evergreen : "transparent",
                  border: `2px solid ${done || active ? C.evergreen : C.border}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.2s ease",
                }}
              >
                {done ? (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2.5 7l3 3 6-6" stroke={C.mint} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : (
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 700,
                      color: active ? C.mint : C.inkMuted,
                      fontFamily: "var(--font-geist-sans)",
                    }}
                  >
                    {i + 1}
                  </span>
                )}
              </div>
              <span
                style={{
                  fontSize: 12,
                  fontWeight: active ? 700 : 600,
                  color: active ? C.evergreen : done ? C.inkSecondary : C.inkMuted,
                  fontFamily: "var(--font-geist-sans)",
                  whiteSpace: "nowrap",
                  letterSpacing: "-0.01em",
                }}
              >
                {label}
              </span>
            </div>

            {/* Connector line */}
            {i < STEPS.length - 1 && (
              <div
                style={{
                  flex: 1,
                  height: 2,
                  backgroundColor: i < current ? C.evergreen : C.border,
                  margin: "0 6px",
                  marginBottom: 24,
                  transition: "background-color 0.3s ease",
                  borderRadius: 1,
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Shield icon ─────────────────────────────────────────────────────────────
function ShieldIcon({ color }: { color: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
      <path
        d="M8 1.5L2.5 4v4c0 3.1 2.4 5.8 5.5 6.4C11.1 13.8 13.5 11.1 13.5 8V4L8 1.5z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M5.5 8l1.5 1.5 3-3"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ─── Types ───────────────────────────────────────────────────────────────────
interface ChurchForm {
  churchName: string;
  country: string;
  stateProvince: string;
  registrationNumber: string;
  website: string;
}

interface AccountForm {
  fullName: string;
  email: string;
  role: string;
  password: string;
  confirmPassword: string;
  phone: string;
  agreedToTerms: boolean;
}

interface PayoutForm {
  method: "ach" | "wire" | "uk";
  routingNumber: string;
  accountNumber: string;
  accountType: string;
  bankName: string;
  iban: string;
  swift: string;
  sortCode: string;
  ukAccountNumber: string;
}

// ─── Step 0: Verify church ───────────────────────────────────────────────────
function StepVerifyChurch({
  form,
  setForm,
  onNext,
}: {
  form: ChurchForm;
  setForm: (f: ChurchForm) => void;
  onNext: () => void;
}) {
  const [errors, setErrors] = useState<Partial<ChurchForm>>({});

  function validate() {
    const e: Partial<ChurchForm> = {};
    if (!form.churchName.trim()) e.churchName = "Please enter your church name.";
    if (!form.country) e.country = "Please select a country.";
    if (!form.registrationNumber.trim()) e.registrationNumber = "Please enter your registration number.";
    if (!form.website.trim()) e.website = "Please enter your website.";
    return e;
  }

  function handleContinue() {
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    onNext();
  }

  function update(key: keyof ChurchForm, value: string) {
    setForm({ ...form, [key]: value });
    if (errors[key]) setErrors({ ...errors, [key]: undefined });
  }

  const countries = [
    { value: "", label: "Select a country" },
    { value: "US", label: "United States" },
    { value: "GB", label: "United Kingdom" },
    { value: "NG", label: "Nigeria" },
    { value: "KE", label: "Kenya" },
    { value: "GH", label: "Ghana" },
    { value: "CA", label: "Canada" },
    { value: "IN", label: "India" },
    { value: "ZA", label: "South Africa" },
    { value: "OTHER", label: "Other" },
  ];

  return (
    <div>
      <h1
        style={{
          fontSize: 32,
          fontWeight: 800,
          color: C.ink,
          letterSpacing: "-0.03em",
          lineHeight: 1.1,
          marginBottom: 10,
          fontFamily: "var(--font-geist-sans)",
        }}
      >
        Let&apos;s verify your church
      </h1>
      <p style={{ fontSize: 16, color: C.inkSecondary, marginBottom: 32, lineHeight: 1.55, fontFamily: "var(--font-geist-sans)", fontWeight: 500 }}>
        We need a few details to confirm your organization. This protects your congregation&apos;s giving.
      </p>

      <Field label="Church or organization name" error={errors.churchName}>
        <Input
          value={form.churchName}
          onChange={(v) => update("churchName", v)}
          placeholder="e.g. Lakewood Community Church"
          error={!!errors.churchName}
        />
      </Field>

      <Field label="Country" error={errors.country}>
        <Select
          value={form.country}
          onChange={(v) => update("country", v)}
          options={countries}
          error={!!errors.country}
        />
      </Field>

      <Field label="State / Province">
        <Input
          value={form.stateProvince}
          onChange={(v) => update("stateProvince", v)}
          placeholder="e.g. Texas"
        />
      </Field>

      <Field
        label="Registration number (EIN, charity number, etc.)"
        helper={
          form.country === "GB"
            ? "In the UK, this is your charity number from the Charity Commission."
            : "In the US, this is your 9-digit EIN from the IRS. In the UK, it's your charity number."
        }
        error={errors.registrationNumber}
      >
        <Input
          value={form.registrationNumber}
          onChange={(v) => update("registrationNumber", v)}
          placeholder={form.country === "GB" ? "e.g. 1234567" : "e.g. 12-3456789"}
          error={!!errors.registrationNumber}
        />
      </Field>

      <Field
        label="Church website"
        helper="We use this to verify your organization exists."
        error={errors.website}
      >
        <Input
          value={form.website}
          onChange={(v) => update("website", v)}
          type="url"
          placeholder="https://yourachurch.org"
          error={!!errors.website}
        />
      </Field>

      {/* Reassurance block */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: 10,
          padding: "14px 16px",
          borderRadius: 12,
          backgroundColor: C.mint,
          marginBottom: 28,
          marginTop: 4,
        }}
      >
        <ShieldIcon color={C.evergreen} />
        <p style={{ fontSize: 13, color: C.positive, fontWeight: 600, fontFamily: "var(--font-geist-sans)", lineHeight: 1.5 }}>
          Your information is encrypted and only used for verification. We never share it.
        </p>
      </div>

      <PillBtn fullWidth onClick={handleContinue}>
        Continue →
      </PillBtn>
    </div>
  );
}

// ─── Step 1: Set up account ──────────────────────────────────────────────────
function StepSetupAccount({
  form,
  setForm,
  churchName,
  onNext,
  onBack,
}: {
  form: AccountForm;
  setForm: (f: AccountForm) => void;
  churchName: string;
  onNext: () => void;
  onBack: () => void;
}) {
  const [errors, setErrors] = useState<Partial<Record<keyof AccountForm, string>>>({});

  function validate() {
    const e: Partial<Record<keyof AccountForm, string>> = {};
    if (!form.fullName.trim()) e.fullName = "Please enter your full name.";
    if (!form.email.trim() || !form.email.includes("@")) e.email = "Please enter a valid email address.";
    if (!form.role) e.role = "Please select your role.";
    if (!form.password || form.password.length < 8) e.password = "Password must be at least 8 characters.";
    if (form.password !== form.confirmPassword) e.confirmPassword = "Passwords do not match.";
    if (!form.agreedToTerms) e.agreedToTerms = "Please agree to the Terms of Service to continue.";
    return e;
  }

  function handleContinue() {
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    onNext();
  }

  function update<K extends keyof AccountForm>(key: K, value: AccountForm[K]) {
    setForm({ ...form, [key]: value });
    if (errors[key]) setErrors({ ...errors, [key]: undefined });
  }

  const roles = [
    { value: "", label: "Select your role" },
    { value: "finance_director", label: "Finance Director" },
    { value: "treasurer", label: "Treasurer" },
    { value: "pastor", label: "Pastor" },
    { value: "administrator", label: "Church Administrator" },
    { value: "other", label: "Other" },
  ];

  return (
    <div>
      <BackLink onClick={onBack} />

      <h1
        style={{
          fontSize: 32,
          fontWeight: 800,
          color: C.ink,
          letterSpacing: "-0.03em",
          lineHeight: 1.1,
          marginBottom: 10,
          fontFamily: "var(--font-geist-sans)",
        }}
      >
        Create your account
      </h1>
      <p style={{ fontSize: 16, color: C.inkSecondary, marginBottom: 32, lineHeight: 1.55, fontFamily: "var(--font-geist-sans)", fontWeight: 500 }}>
        This is the admin account for managing giving
        {churchName ? ` at ${churchName}` : ""}.
      </p>

      <Field label="Full name" error={errors.fullName}>
        <Input
          value={form.fullName}
          onChange={(v) => update("fullName", v)}
          placeholder="e.g. James Okafor"
          error={!!errors.fullName}
        />
      </Field>

      <Field label="Email address" error={errors.email}>
        <Input
          value={form.email}
          onChange={(v) => update("email", v)}
          type="email"
          placeholder="you@yourachurch.org"
          error={!!errors.email}
        />
      </Field>

      <Field label="Role" error={errors.role}>
        <Select
          value={form.role}
          onChange={(v) => update("role", v)}
          options={roles}
          error={!!errors.role}
        />
      </Field>

      <Field label="Password" error={errors.password}>
        <PasswordInput
          value={form.password}
          onChange={(v) => update("password", v)}
          placeholder="Min. 8 characters"
          error={!!errors.password}
        />
      </Field>

      <Field label="Confirm password" error={errors.confirmPassword}>
        <PasswordInput
          value={form.confirmPassword}
          onChange={(v) => update("confirmPassword", v)}
          placeholder="Re-enter your password"
          error={!!errors.confirmPassword}
        />
      </Field>

      <Field label="Phone number" helper="For important account alerts only.">
        <Input
          value={form.phone}
          onChange={(v) => update("phone", v)}
          type="tel"
          placeholder="+1 555 000 0000"
        />
      </Field>

      {/* Terms checkbox */}
      <div style={{ marginBottom: 28 }}>
        <label
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: 12,
            cursor: "pointer",
          }}
        >
          <div style={{ position: "relative", flexShrink: 0, marginTop: 1 }}>
            <input
              type="checkbox"
              checked={form.agreedToTerms}
              onChange={(e) => update("agreedToTerms", e.target.checked)}
              style={{ position: "absolute", opacity: 0, width: 18, height: 18, cursor: "pointer" }}
            />
            <div
              style={{
                width: 18,
                height: 18,
                borderRadius: 5,
                border: `2px solid ${errors.agreedToTerms ? C.danger : form.agreedToTerms ? C.evergreen : C.border}`,
                backgroundColor: form.agreedToTerms ? C.evergreen : C.white,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.15s ease",
              }}
            >
              {form.agreedToTerms && (
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M1.5 5l2.5 2.5 4.5-4.5" stroke={C.mint} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </div>
          </div>
          <span style={{ fontSize: 14, color: C.inkSecondary, fontFamily: "var(--font-geist-sans)", fontWeight: 500, lineHeight: 1.5 }}>
            I agree to ChurchPay&apos;s{" "}
            <a href="#" style={{ color: C.evergreen, fontWeight: 700 }}>Terms of Service</a>
            {" "}and{" "}
            <a href="#" style={{ color: C.evergreen, fontWeight: 700 }}>Privacy Policy</a>
          </span>
        </label>
        {errors.agreedToTerms && <p style={{ ...errorStyle, marginTop: 8 }}>{errors.agreedToTerms}</p>}
      </div>

      <PillBtn fullWidth onClick={handleContinue}>
        Continue →
      </PillBtn>
    </div>
  );
}

// ─── Step 2: Connect payouts ─────────────────────────────────────────────────
function StepConnectPayouts({
  form,
  setForm,
  onNext,
  onBack,
}: {
  form: PayoutForm;
  setForm: (f: PayoutForm) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});

  const methods = [
    {
      id: "ach" as const,
      title: "US Bank Account (ACH)",
      desc: "Best for US-based churches. Funds arrive in 1–2 business days.",
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <rect x="2" y="5" width="16" height="11" rx="2" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M2 9h16" stroke="currentColor" strokeWidth="1.5"/>
          <rect x="4.5" y="12" width="4" height="1.5" rx="0.75" fill="currentColor"/>
        </svg>
      ),
    },
    {
      id: "wire" as const,
      title: "International wire",
      desc: "For churches outside the US and UK. Accepts IBAN and SWIFT.",
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M10 2.5c-2 2-3 4.5-3 7.5s1 5.5 3 7.5M10 2.5c2 2 3 4.5 3 7.5s-1 5.5-3 7.5M2.5 10h15" stroke="currentColor" strokeWidth="1.5"/>
        </svg>
      ),
    },
    {
      id: "uk" as const,
      title: "UK Bank Account (Faster Payments)",
      desc: "For UK-registered churches. Funds arrive same day.",
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <rect x="2" y="5" width="16" height="11" rx="2" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M2 9h16" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M5 12.5l1.5-3 1.5 3M5.5 11.5h2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
  ];

  function validate() {
    const e: Partial<Record<string, string>> = {};
    if (form.method === "ach") {
      if (!form.routingNumber || form.routingNumber.length !== 9) e.routingNumber = "Routing number must be exactly 9 digits.";
      if (!form.accountNumber) e.accountNumber = "Please enter your account number.";
    }
    if (form.method === "wire") {
      if (!form.iban) e.iban = "Please enter your IBAN.";
      if (!form.swift) e.swift = "Please enter your SWIFT/BIC code.";
    }
    if (form.method === "uk") {
      if (!form.sortCode) e.sortCode = "Please enter your sort code.";
      if (!form.ukAccountNumber) e.ukAccountNumber = "Please enter your account number.";
    }
    return e;
  }

  function handleContinue() {
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    onNext();
  }

  function update<K extends keyof PayoutForm>(key: K, value: PayoutForm[K]) {
    setForm({ ...form, [key]: value });
    if (errors[key as string]) setErrors({ ...errors, [key as string]: undefined });
  }

  const accountTypes = [
    { value: "checking", label: "Checking" },
    { value: "savings", label: "Savings" },
  ];

  return (
    <div>
      <BackLink onClick={onBack} />

      <h1
        style={{
          fontSize: 32,
          fontWeight: 800,
          color: C.ink,
          letterSpacing: "-0.03em",
          lineHeight: 1.1,
          marginBottom: 10,
          fontFamily: "var(--font-geist-sans)",
        }}
      >
        Where should we send your funds?
      </h1>
      <p style={{ fontSize: 16, color: C.inkSecondary, marginBottom: 28, lineHeight: 1.55, fontFamily: "var(--font-geist-sans)", fontWeight: 500 }}>
        Add a bank account to receive your congregation&apos;s giving. Funds are usually available within 2 business days.
      </p>

      {/* Method radio cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
        {methods.map((m) => {
          const selected = form.method === m.id;
          return (
            <button
              key={m.id}
              type="button"
              onClick={() => update("method", m.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                padding: "14px 16px",
                borderRadius: 16,
                border: `${selected ? 2 : 1.5}px solid ${selected ? C.evergreen : C.border}`,
                backgroundColor: selected ? `rgba(22,51,0,0.04)` : C.white,
                cursor: "pointer",
                textAlign: "left",
                transition: "all 0.15s ease",
              }}
            >
              {/* Radio indicator */}
              <div
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                  border: `2px solid ${selected ? C.evergreen : C.border}`,
                  backgroundColor: selected ? C.evergreen : "transparent",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  transition: "all 0.15s ease",
                }}
              >
                {selected && <div style={{ width: 7, height: 7, borderRadius: "50%", backgroundColor: C.mint }} />}
              </div>

              {/* Icon */}
              <div style={{ color: selected ? C.evergreen : C.inkMuted, flexShrink: 0, transition: "color 0.15s ease" }}>
                {m.icon}
              </div>

              {/* Text */}
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: C.ink, fontFamily: "var(--font-geist-sans)", marginBottom: 2 }}>
                  {m.title}
                </div>
                <div style={{ fontSize: 13, color: C.inkMuted, fontFamily: "var(--font-geist-sans)", fontWeight: 500 }}>
                  {m.desc}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* ACH fields */}
      {form.method === "ach" && (
        <div
          style={{
            padding: "20px",
            borderRadius: 16,
            border: `1px solid ${C.border}`,
            backgroundColor: C.white,
            marginBottom: 20,
          }}
        >
          <Field label="Routing number" error={errors.routingNumber} helper="9 digits — found at the bottom left of your check.">
            <Input
              value={form.routingNumber}
              onChange={(v) => update("routingNumber", v.replace(/\D/g, "").slice(0, 9))}
              placeholder="e.g. 021000021"
              error={!!errors.routingNumber}
            />
          </Field>
          <Field label="Account number" error={errors.accountNumber}>
            <Input
              value={form.accountNumber}
              onChange={(v) => update("accountNumber", v)}
              placeholder="Enter your account number"
              error={!!errors.accountNumber}
            />
          </Field>
          <Field label="Account type">
            <Select
              value={form.accountType}
              onChange={(v) => update("accountType", v)}
              options={accountTypes}
            />
          </Field>
          <Field label="Bank name">
            <Input
              value={form.bankName}
              onChange={(v) => update("bankName", v)}
              placeholder="e.g. Chase Bank"
            />
          </Field>
        </div>
      )}

      {/* Wire fields */}
      {form.method === "wire" && (
        <div
          style={{
            padding: "20px",
            borderRadius: 16,
            border: `1px solid ${C.border}`,
            backgroundColor: C.white,
            marginBottom: 20,
          }}
        >
          <Field label="IBAN" error={errors.iban}>
            <Input
              value={form.iban}
              onChange={(v) => update("iban", v)}
              placeholder="e.g. GB29 NWBK 6016 1331 9268 19"
              error={!!errors.iban}
            />
          </Field>
          <Field label="SWIFT / BIC code" error={errors.swift}>
            <Input
              value={form.swift}
              onChange={(v) => update("swift", v)}
              placeholder="e.g. BARCGB22"
              error={!!errors.swift}
            />
          </Field>
        </div>
      )}

      {/* UK fields */}
      {form.method === "uk" && (
        <div
          style={{
            padding: "20px",
            borderRadius: 16,
            border: `1px solid ${C.border}`,
            backgroundColor: C.white,
            marginBottom: 20,
          }}
        >
          <Field label="Sort code" error={errors.sortCode}>
            <Input
              value={form.sortCode}
              onChange={(v) => update("sortCode", v)}
              placeholder="e.g. 20-00-00"
              error={!!errors.sortCode}
            />
          </Field>
          <Field label="Account number" error={errors.ukAccountNumber}>
            <Input
              value={form.ukAccountNumber}
              onChange={(v) => update("ukAccountNumber", v)}
              placeholder="e.g. 12345678"
              error={!!errors.ukAccountNumber}
            />
          </Field>
        </div>
      )}

      {/* Custody trust block */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: 10,
          padding: "16px",
          borderRadius: 16,
          backgroundColor: C.mint,
          marginBottom: 28,
        }}
      >
        <ShieldIcon color={C.evergreen} />
        <p style={{ fontSize: 13, color: C.positive, fontWeight: 600, fontFamily: "var(--font-geist-sans)", lineHeight: 1.5 }}>
          Your funds are held 1:1 by a regulated custodian, never by ChurchPay. Withdraw any time.
        </p>
      </div>

      <PillBtn fullWidth onClick={handleContinue}>
        Continue →
      </PillBtn>
    </div>
  );
}

// ─── Copy-to-clipboard hook ──────────────────────────────────────────────────
function useCopy(text: string) {
  const [copied, setCopied] = useState(false);
  function copy() {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }
  return { copied, copy };
}

// ─── Step 3: Get your give link ──────────────────────────────────────────────
function StepGiveLink({ churchName }: { churchName: string }) {
  const slug = churchName
    ? churchName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
    : "your-church";
  const giveUrl = `churchpay.com/give/${slug}`;
  const embedCode = `<script src="https://churchpay.com/embed.js" data-church="${slug}"></script>`;

  const { copied: urlCopied, copy: copyUrl } = useCopy(`https://${giveUrl}`);
  const { copied: embedCopied, copy: copyEmbed } = useCopy(embedCode);

  const [openAccordion, setOpenAccordion] = useState<number | null>(null);

  const nextSteps = [
    {
      title: "Share your give link in Sunday bulletin",
      detail: "Print the URL or QR code in your weekly bulletin so givers can scan and give in seconds.",
    },
    {
      title: "Add the QR code to screens during service",
      detail: "Display the QR code on your projector screen during the offering to make giving easy for every attendee.",
    },
    {
      title: "Try a test gift",
      detail: (
        <span>
          Send a small test gift to confirm everything is working.{" "}
          <a href={`/give/${slug}`} style={{ color: C.evergreen, fontWeight: 700 }}>
            Send a $1 test gift →
          </a>
        </span>
      ),
    },
  ];

  return (
    <div>
      {/* Celebration card */}
      <div
        style={{
          backgroundColor: C.mint,
          borderRadius: 30,
          padding: "32px 28px",
          textAlign: "center",
          marginBottom: 32,
        }}
      >
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            backgroundColor: C.evergreen,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 16px",
          }}
        >
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path d="M5 14l6 6 12-12" stroke={C.mint} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h1
          style={{
            fontSize: 28,
            fontWeight: 800,
            color: C.evergreen,
            letterSpacing: "-0.03em",
            marginBottom: 8,
            fontFamily: "var(--font-geist-sans)",
          }}
        >
          You&apos;re ready to receive giving
        </h1>
        <p style={{ fontSize: 15, color: C.positive, fontWeight: 600, fontFamily: "var(--font-geist-sans)", marginBottom: 4 }}>
          {churchName || "Your church"} is verified and ready.
        </p>
        <p style={{ fontSize: 14, color: C.positive, fontFamily: "var(--font-geist-sans)", fontWeight: 500 }}>
          Your congregation can now give from anywhere in the world.
        </p>
      </div>

      {/* Give link */}
      <div style={{ marginBottom: 24 }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: C.inkMuted, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8, fontFamily: "var(--font-geist-sans)" }}>
          Your give link
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "11px 14px",
            borderRadius: 12,
            border: `1.5px solid ${C.border}`,
            backgroundColor: C.white,
            marginBottom: 10,
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, color: C.inkMuted }}>
            <path d="M6.5 9.5a3.5 3.5 0 005 0l2-2a3.5 3.5 0 00-5-5L7.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M9.5 6.5a3.5 3.5 0 00-5 0l-2 2a3.5 3.5 0 005 5l1-1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <span
            style={{
              fontSize: 14,
              fontFamily: "var(--font-geist-sans)",
              fontWeight: 600,
              color: C.ink,
              flex: 1,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {giveUrl}
          </span>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <PillBtn variant="outline" onClick={copyUrl}>
            {urlCopied ? "Copied!" : "Copy link"}
          </PillBtn>
          <PillBtn variant="outline" onClick={() => {}}>
            Download QR code
          </PillBtn>
        </div>
      </div>

      {/* Embed section */}
      <div
        style={{
          padding: "20px",
          borderRadius: 16,
          border: `1px solid ${C.border}`,
          backgroundColor: C.white,
          marginBottom: 24,
        }}
      >
        <p style={{ fontSize: 14, fontWeight: 700, color: C.ink, marginBottom: 4, fontFamily: "var(--font-geist-sans)" }}>
          Add to your website
        </p>
        <p style={{ fontSize: 13, color: C.inkMuted, marginBottom: 12, fontFamily: "var(--font-geist-sans)", fontWeight: 500 }}>
          Paste this snippet anywhere on your church website to embed a give button.
        </p>
        <div
          style={{
            backgroundColor: "#0E0F0C",
            borderRadius: 10,
            padding: "12px 14px",
            marginBottom: 12,
            overflowX: "auto",
          }}
        >
          <code
            style={{
              fontSize: 12,
              color: C.mint,
              fontFamily: "var(--font-geist-mono, monospace)",
              fontWeight: 500,
              whiteSpace: "pre",
            }}
          >
            {embedCode}
          </code>
        </div>
        <PillBtn variant="outline" onClick={copyEmbed}>
          {embedCopied ? "Copied!" : "Copy embed code"}
        </PillBtn>
      </div>

      {/* Next steps accordion */}
      <div style={{ marginBottom: 32 }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: C.inkMuted, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10, fontFamily: "var(--font-geist-sans)" }}>
          Next steps
        </p>
        <div
          style={{
            borderRadius: 16,
            border: `1px solid ${C.border}`,
            overflow: "hidden",
            backgroundColor: C.white,
          }}
        >
          {nextSteps.map((step, i) => (
            <div key={i} style={{ borderBottom: i < nextSteps.length - 1 ? `1px solid ${C.border}` : "none" }}>
              <button
                type="button"
                onClick={() => setOpenAccordion(openAccordion === i ? null : i)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 12,
                  padding: "14px 16px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: "50%",
                      backgroundColor: C.mint,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <span style={{ fontSize: 11, fontWeight: 800, color: C.evergreen, fontFamily: "var(--font-geist-sans)" }}>{i + 1}</span>
                  </div>
                  <span style={{ fontSize: 14, fontWeight: 600, color: C.ink, fontFamily: "var(--font-geist-sans)" }}>
                    {step.title}
                  </span>
                </div>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  style={{
                    flexShrink: 0,
                    color: C.inkMuted,
                    transform: openAccordion === i ? "rotate(180deg)" : "none",
                    transition: "transform 0.2s ease",
                  }}
                >
                  <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              {openAccordion === i && (
                <div style={{ padding: "0 16px 16px 48px" }}>
                  <p style={{ fontSize: 13, color: C.inkSecondary, fontFamily: "var(--font-geist-sans)", fontWeight: 500, lineHeight: 1.55 }}>
                    {step.detail}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Go to dashboard CTA */}
      <Link href="/dashboard" style={{ display: "block" }}>
        <PillBtn fullWidth>
          Go to dashboard →
        </PillBtn>
      </Link>
    </div>
  );
}

// ─── Main page ───────────────────────────────────────────────────────────────
export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [visible, setVisible] = useState(true);
  const contentRef = useRef<HTMLDivElement>(null);

  const [churchForm, setChurchForm] = useState<ChurchForm>({
    churchName: "",
    country: "",
    stateProvince: "",
    registrationNumber: "",
    website: "",
  });

  const [accountForm, setAccountForm] = useState<AccountForm>({
    fullName: "",
    email: "",
    role: "",
    password: "",
    confirmPassword: "",
    phone: "",
    agreedToTerms: false,
  });

  const [payoutForm, setPayoutForm] = useState<PayoutForm>({
    method: "ach",
    routingNumber: "",
    accountNumber: "",
    accountType: "checking",
    bankName: "",
    iban: "",
    swift: "",
    sortCode: "",
    ukAccountNumber: "",
  });

  function transition(to: number) {
    setVisible(false);
    setTimeout(() => {
      setCurrentStep(to);
      setVisible(true);
      if (contentRef.current) {
        contentRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 180);
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: C.canvas }}>
      {/* ── Top nav bar ──────────────────────────────────────────────────── */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          backgroundColor: C.canvas,
          borderBottom: `1px solid ${C.border}`,
          backdropFilter: "blur(8px)",
        }}
      >
        <div
          style={{
            maxWidth: 960,
            margin: "0 auto",
            padding: "0 24px",
            height: 60,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              textDecoration: "none",
            }}
          >
            <div
              style={{
                width: 30,
                height: 30,
                borderRadius: "50%",
                backgroundColor: C.evergreen,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M8 2L3 6v8h4v-4h2v4h4V6L8 2z" fill={C.mint}/>
              </svg>
            </div>
            <span
              style={{
                fontFamily: "var(--font-geist-sans)",
                fontWeight: 800,
                fontSize: 16,
                color: C.ink,
                letterSpacing: "-0.02em",
              }}
            >
              ChurchPay
            </span>
          </Link>

          {/* Right actions */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button
              type="button"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: C.inkMuted,
                fontSize: 13,
                fontWeight: 600,
                fontFamily: "var(--font-geist-sans)",
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "6px 10px",
                borderRadius: 8,
              }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 1.5v1M7 11.5v1M1.5 7h1M11.5 7h1M3 3l.7.7M10.3 10.3l.7.7M3 11l.7-.7M10.3 3.7l.7-.7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <circle cx="7" cy="7" r="2" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
              Save progress
            </button>
            <a
              href="#"
              style={{
                color: C.inkMuted,
                fontSize: 13,
                fontWeight: 600,
                fontFamily: "var(--font-geist-sans)",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: 5,
                padding: "6px 10px",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.3"/>
                <path d="M5.5 5.5c0-.8.7-1.5 1.5-1.5s1.5.7 1.5 1.5c0 .7-.5 1.3-1.2 1.5V8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                <circle cx="7" cy="10" r="0.6" fill="currentColor"/>
              </svg>
              Help
            </a>
          </div>
        </div>
      </header>

      {/* ── Main content ─────────────────────────────────────────────────── */}
      <main
        ref={contentRef}
        style={{ maxWidth: 960, margin: "0 auto", padding: "40px 24px 80px" }}
      >
        {/* Stepper */}
        <Stepper current={currentStep} />

        {/* Step content with fade transition */}
        <div
          style={{
            maxWidth: 560,
            margin: "0 auto",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(10px)",
            transition: "opacity 0.18s ease, transform 0.18s ease",
          }}
        >
          {currentStep === 0 && (
            <StepVerifyChurch
              form={churchForm}
              setForm={setChurchForm}
              onNext={() => transition(1)}
            />
          )}
          {currentStep === 1 && (
            <StepSetupAccount
              form={accountForm}
              setForm={setAccountForm}
              churchName={churchForm.churchName}
              onNext={() => transition(2)}
              onBack={() => transition(0)}
            />
          )}
          {currentStep === 2 && (
            <StepConnectPayouts
              form={payoutForm}
              setForm={setPayoutForm}
              onNext={() => transition(3)}
              onBack={() => transition(1)}
            />
          )}
          {currentStep === 3 && (
            <StepGiveLink churchName={churchForm.churchName} />
          )}
        </div>
      </main>
    </div>
  );
}
