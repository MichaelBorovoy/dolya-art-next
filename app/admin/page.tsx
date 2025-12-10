"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";
import Image from "next/image";



export default function AdminPage() {
    const { data: session, status } = useSession();
    const [uploading, setUploading] = useState(false);
    const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
    const [category, setCategory] = useState("portfolio");

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("category", category);

    setUploading(true);
    setUploadedUrl(null);

    try {
        const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
        });

        if (!res.ok) {
        alert("Error on downloading");
        return;
        }

        const data = await res.json();
        setUploadedUrl(data.url);
        console.log("uploaded:", data);
    } finally {
        setUploading(false);
    }
    };

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

        <section className="bg-white border border-[var(--color-accent-light)] rounded-lg p-6 mt-8">
            <h2 className="text-lg font-semibold mb-3 text-[var(--color-charcoal)]">
                Download Image
            </h2>

            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                <div>
                <label className="block text-sm mb-1">Categories</label>
                <select
                    className="border rounded-md px-3 py-2 text-sm"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="portfolio">Portfolio</option>
                    <option value="concept-art">Concept Art</option>
                    <option value="mobile-games-casino">Mobile Games / Casino</option>
                    <option value="sketches">Sketches</option>
                </select>
                </div>

                <div>
                <label className="block text-sm mb-1">Choose the file</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleUpload}
                    disabled={uploading}
                    className="text-sm"
                />
                </div>
            </div>

            {uploading && <p className="text-sm">Loading...</p>}

            {uploadedUrl && (
                <div className="mt-4">
                <p className="text-sm text-[var(--color-charcoal)] mb-2">
                    Image link:
                </p>
                <code className="block text-xs bg-[var(--color-cream)] p-2 rounded break-all">
                    {uploadedUrl}
                </code>
                <div className="mt-3 max-w-xs">
                    <Image
                    src={uploadedUrl}
                    alt="Uploaded preview"
                    width={400}
                    height={400}
                    className="w-full h-auto rounded-lg"
                    />
                </div>
                </div>
            )}
        </section>
        </main>
    );
}