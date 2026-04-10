import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import HeroBanner from "../components/HeroBanner";
import ContentRow from "../components/ContentRow";
import TopTenRow from "../components/TopTenRow";
import { Loader2 } from "lucide-react";

export default function Home() {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadContent = async () => {
      const data = await base44.entities.Content.list();
      setContent(data);
      setLoading(false);
    };
    loadContent();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const featured = content.filter((c) => c.is_featured);
  const trending = content.filter((c) => c.is_trending);
  const popular = content.filter((c) => c.category === "popular");
  const action = content.filter((c) => c.category === "action");
  const drama = content.filter((c) => c.category === "drama");
  const newReleases = content.filter((c) => c.category === "new_releases");
  const series = content.filter((c) => c.type === "series");
  const movies = content.filter((c) => c.type === "movie");

  return (
    <div className="-mt-16 md:-mt-20">
      <HeroBanner featured={featured.length ? featured : content.slice(0, 3)} />

      <div className="-mt-16 relative z-10 space-y-2">
        <ContentRow title="Em Alta" items={trending} />
        <TopTenRow title="Top 10 no Brasil Hoje" items={content} />
        <ContentRow title="Populares" items={popular} isLarge />
        <ContentRow title="Ação e Aventura" items={action} />
        <ContentRow title="Séries" items={series} isLarge />
        <ContentRow title="Dramas" items={drama} />
        <ContentRow title="Lançamentos" items={newReleases} />
        <ContentRow title="Filmes" items={movies} />
      </div>
    </div>
  );
}