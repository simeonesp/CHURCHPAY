"use client";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-16" style={{ backgroundColor: "#FBFBF9" }}>
      <div className="w-full max-w-4xl">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-16">
          <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: "#163300" }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 3L17 10L10 17M3 10H17" stroke="#E2F6D5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="text-2xl font-bold tracking-tight" style={{ color: "#0E0F0C" }}>ChurchPay</span>
        </div>

        <h1 className="text-5xl font-black mb-4 tracking-tight" style={{ color: "#0E0F0C", lineHeight: "0.95" }}>
          Global giving<br />for churches
        </h1>
        <p className="text-lg mb-16" style={{ color: "#454745" }}>
          Receive giving from your congregation, wherever they are.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Give Flow */}
          <div className="p-8 rounded-[30px] border" style={{ borderColor: "rgba(14,15,12,0.12)", backgroundColor: "#fff" }}>
            <div className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "#868685" }}>Mobile Web</div>
            <h2 className="text-2xl font-bold mb-2" style={{ color: "#0E0F0C" }}>Give checkout</h2>
            <p className="text-sm mb-8" style={{ color: "#454745" }}>
              The giver's hero flow — from QR scan to confirmed gift in under 60 seconds.
            </p>
            <div className="flex flex-col gap-2">
              <Link href="/give/lakewood" className="flex items-center justify-between px-5 py-3 rounded-2xl font-semibold text-sm" style={{ backgroundColor: "#163300", color: "#E2F6D5" }}>
                <span>Trust frame (Screen 1)</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
              <Link href="/give/lakewood/amount" className="flex items-center justify-between px-5 py-3 rounded-2xl font-semibold text-sm" style={{ backgroundColor: "#E2F6D5", color: "#163300" }}>
                <span>Amount + conversion (Screen 2)</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
              <Link href="/give/lakewood/pay" className="flex items-center justify-between px-5 py-3 rounded-2xl font-semibold text-sm" style={{ backgroundColor: "#E2F6D5", color: "#163300" }}>
                <span>Payment (Screen 3)</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
              <Link href="/give/lakewood/confirm" className="flex items-center justify-between px-5 py-3 rounded-2xl font-semibold text-sm" style={{ backgroundColor: "#E2F6D5", color: "#163300" }}>
                <span>Confirmation (Screen 4–5)</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
            </div>
          </div>

          {/* Dashboard + Onboarding */}
          <div className="p-8 rounded-[30px] border" style={{ borderColor: "rgba(14,15,12,0.12)", backgroundColor: "#fff" }}>
            <div className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "#868685" }}>Desktop</div>
            <h2 className="text-2xl font-bold mb-2" style={{ color: "#0E0F0C" }}>Finance dashboard</h2>
            <p className="text-sm mb-8" style={{ color: "#454745" }}>
              The church finance lead's daily workspace — trust instrument and operations hub.
            </p>
            <div className="flex flex-col gap-2">
              <Link href="/onboarding" className="flex items-center justify-between px-5 py-3 rounded-2xl font-semibold text-sm" style={{ backgroundColor: "#163300", color: "#E2F6D5" }}>
                <span>Church onboarding</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
              <Link href="/dashboard" className="flex items-center justify-between px-5 py-3 rounded-2xl font-semibold text-sm" style={{ backgroundColor: "#E2F6D5", color: "#163300" }}>
                <span>Dashboard home</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
              <Link href="/dashboard/giving-feed" className="flex items-center justify-between px-5 py-3 rounded-2xl font-semibold text-sm" style={{ backgroundColor: "#E2F6D5", color: "#163300" }}>
                <span>Giving feed</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
              <Link href="/dashboard/payouts" className="flex items-center justify-between px-5 py-3 rounded-2xl font-semibold text-sm" style={{ backgroundColor: "#E2F6D5", color: "#163300" }}>
                <span>Payouts &amp; balance</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
              <Link href="/dashboard/reports" className="flex items-center justify-between px-5 py-3 rounded-2xl font-semibold text-sm" style={{ backgroundColor: "#E2F6D5", color: "#163300" }}>
                <span>Reports &amp; exports</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
