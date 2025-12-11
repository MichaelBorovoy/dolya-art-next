import GalleryPreview from "@/components/GalleryPreview";
import { supabaseServer } from "@/lib/supabaseServer";


// const images = [
//  { src: "https://picsum.photos/800/1000?random=1", alt: "Concept Art 1" },
//   { src: "https://picsum.photos/700/900?random=2", alt: "Concept Art 2" },
//   { src: "https://picsum.photos/900/1200?random=3", alt: "Concept Art 3" },
//   { src: "https://picsum.photos/800/600?random=4", alt: "Concept Art 4" },
//   { src: "https://picsum.photos/700/1100?random=5", alt: "Concept Art 5" },
//   { src: "https://picsum.photos/1000/800?random=6", alt: "Concept Art 6" },
// ];
type Artwork = {
  id: string;
  title: string | null;
  image_url: string;
  priority: number;
};

async function getPortfolioArtworks(): Promise<Artwork[]> {
    const { data, error } = await supabaseServer
        .from("art_work_categories")
        .select(
        `
        priority,
        art_works (
            id,
            title,
            image_url
        ),
        categories!inner (
            slug
        )
        `
        )
        .eq("categories.slug", "portfolio")
        .order("priority", { ascending: true });
    console.log(data)
    if (error) {
        console.error(error);
        return [];
    }

    return (data || []).map((row: any) => ({
        id: row.art_works.id,
        title: row.art_works.title,
        image_url: row.art_works.image_url,
        priority: row.priority,
    }));
}

export default async function PortfolioPage() {
    const artworks = await getPortfolioArtworks();
    const images = artworks.map((a) => ({
        src: a.image_url,
        alt: a.title || "Artwork",
    }));
    return (
        <main className="container mx-auto py-10">
        <h1 className="text-2xl md:text-3xl font-semibold text-[var(--color-primary)] mb-8">
            Portfolio
        </h1>

            <GalleryPreview images={images} />

        </main>
    );
}