import Image from "next/image";

const images = [
 { src: "https://picsum.photos/800/1000?random=1", alt: "Concept Art 1" },
  { src: "https://picsum.photos/700/900?random=2", alt: "Concept Art 2" },
  { src: "https://picsum.photos/900/1200?random=3", alt: "Concept Art 3" },
  { src: "https://picsum.photos/800/600?random=4", alt: "Concept Art 4" },
  { src: "https://picsum.photos/700/1100?random=5", alt: "Concept Art 5" },
  { src: "https://picsum.photos/1000/800?random=6", alt: "Concept Art 6" },
];

export default function PortfolioPage() {
  return (
    <main className="container mx-auto py-10">
      <h1 className="text-2xl md:text-3xl font-semibold text-[var(--color-primary)] mb-8">
        Portfolio
      </h1>

      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
  {images.map((img) => (
    <div key={img.src} className="mb-6 break-inside-avoid">
      <Image
        src={img.src}
        alt={img.alt}
        width={800}
        height={1000}
        className="w-full h-auto rounded-lg block"
      />
    </div>
  ))}
</div>
    </main>
  );
}