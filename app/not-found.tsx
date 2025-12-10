import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[var(--color-cream)] text-center px-4">
      <h1 className="text-3xl md:text-4xl font-semibold text-[var(--color-primary)] mb-4">
        404 – Page not found
      </h1>
      <p className="text-[var(--color-charcoal)] mb-6 max-w-md">
        Looks like this page has been erased from the sketchbook.  
        Try going back to the main gallery.
      </p>
      <Link href="/"
        className="inline-flex items-center justify-center px-4 py-2 rounded-md bg-[var(--color-primary)] text-white text-sm font-medium hover:bg-[var(--color-primary-dark)] transition-colors"
      >
        Back to home
      </Link>
    </main>
  );
}