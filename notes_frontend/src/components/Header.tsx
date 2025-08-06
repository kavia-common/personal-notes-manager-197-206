"use client";

// PUBLIC_INTERFACE
/**
 * Header for the notes application.
 * Minimalistic, fixed, displays app title.
 */
export default function Header() {
  return (
    <header className="w-full px-6 py-4 flex items-center justify-between border-b bg-white" style={{background:"var(--background)"}}>
      <h1 className="text-2xl font-bold tracking-tight" style={{color:"var(--foreground)"}}>
        Notes
      </h1>
      {/* Placeholder for future actions or user avatar */}
    </header>
  );
}
