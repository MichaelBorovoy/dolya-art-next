"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export default function AdminPage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </main>
    );
  }
  if (!session) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[var(--color-cream)]">
        <div className="w-full max-w-sm rounded-xl border border-[var(--color-accent-light)] bg-white p-6 shadow-md">
          <h1 className="text-xl font-semibold text-[var(--color-primary)] mb-4">
            Admin Login
          </h1>
          <p className="text-sm text-[var(--color-charcoal)] mb-4">
            Sign in via Google.
          </p>
          <button
            onClick={() => signIn("google")}
            className="w-full bg-[var(--color-primary)] text-white py-2 rounded-md text-sm font-medium hover:bg-[var(--color-primary-dark)] transition-colors"
          >
            Sign In Google
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--color-cream)] pt-24 container mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-[var(--color-primary)]">
          Admin Panel
        </h1>
        <div className="flex items-center gap-3 text-sm">
          <span className="text-[var(--color-charcoal)]">
            {session.user?.email}
          </span>
          <button
            onClick={() => signOut()}
            className="border px-3 py-1 rounded-md hover:bg-white"
          >
            Sign Out
          </button>
        </div>
      </div>

      <section className="bg-white border border-[var(--color-accent-light)] rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-2 text-[var(--color-charcoal)]">
          Upload images ( it is a mock page for now)
        </h2>
        <p className="text-sm text-[var(--color-charcoal)]">
          Authorization via Google is working. Next we will add download in Storage or manage categories.
        </p>
      </section>
    </main>
  );
}