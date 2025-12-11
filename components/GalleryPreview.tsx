"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export type GalleryImage = {
  src: string;
  alt: string;
};

type GalleryPreviewProps = {
  images: GalleryImage[];
};



export default function GalleryPreview({ images }: GalleryPreviewProps) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const openLightbox = (i: number) => {
    setIndex(i);
    setOpen(true);
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  if (!images || images.length === 0) return null;

  return (
    <>
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
        {images.map((img, i) => (
          <div
            key={img.src}
            className="mb-6 break-inside-avoid cursor-zoom-in"
            onClick={() => openLightbox(i)}
          >
            <Image
              src={img.src}
              alt={img.alt}
              width={800}
              height={1000}
              className="w-full h-auto rounded-lg block transition-transform duration-300 hover:scale-[1.02]"
            />
          </div>
        ))}
      </div>
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative max-w-5xl max-h-[90vh] w-full"
            onClick={(e) => e.stopPropagation()} 
          >
            <button
              type="button"
              className="absolute -top-10 right-0 text-white text-2xl"
              onClick={() => setOpen(false)}
            >
              ✕
            </button>
            <Image
            src={images[index].src}
            alt={images[index].alt}
            width={2000}
            height={2000}
            className="max-h-[95vh] max-w-[95vw] w-auto h-auto mx-auto rounded-lg shadow-lg"
            />
            {index > 0 && (
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-4xl"
                onClick={() => setIndex((i) => i - 1)}
              >
              </button>
            )}
            {index < images.length - 1 && (
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-4xl"
                onClick={() => setIndex((i) => i + 1)}
              >
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}