"use client";

export default function GiveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="flex justify-center"
      style={{ minHeight: "100svh", backgroundColor: "#FBFBF9" }}
    >
      <div
        className="w-full flex flex-col"
        style={{ maxWidth: 390, minHeight: "100svh", backgroundColor: "#FBFBF9" }}
      >
        {children}
      </div>
    </div>
  );
}
