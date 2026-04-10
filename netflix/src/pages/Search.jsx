import { useState, useEffect, useMemo } from "react";
import { base44 } from "@/api/base44Client";
import { Search as SearchIcon, X, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import ContentCard from "../components/ContentCard";
import { motion } from "framer-motion";

const categories = [
  { label: "Todos", value: "all" },
  { label: "Filmes", value: "movie" },
  { label: "Séries", value: "series" },
  { label: "Ação", value: "action" },
  { label: "Comédia", value: "comedy" },
  { label: "Drama", value: "drama" },
  { label: "Horror", value: "horror" },
  { label: "Sci-Fi", value: "sci_fi" },
  { label: "Documentário", value: "documentary" },
];

export default function Search() {
  const [query, setQuery] = useState("");
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    const load = async () => {
      const data = await base44.entities.Content.list();
      setContent(data);
      setLoading(false);
    };
    load();
  }, []);

  const filtered = useMemo(() => {
    let results = content;

    if (query) {
      const q = query.toLowerCase();
      results = results.filter(
        (c) =>
          c.title?.toLowerCase().includes(q) ||
          c.description?.toLowerCase().includes(q) ||
          c.cast?.toLowerCase().includes(q)
      );
    }

    if (activeCategory !== "all") {
      if (activeCategory === "movie" || activeCategory === "series") {
        results = results.filter((c) => c.type === activeCategory);
      } else {
        results = results.filter((c) => c.category === activeCategory);
      }
    }

    return results;
  }, [content, query, activeCategory]);

  return (
    <div className="pt-20 md:pt-24 px-6 md:px-12 max-w-7xl mx-auto">
      {/* Search Input */}
      <div className="relative mb-6">
        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar títulos, pessoas, gêneros..."
          className="pl-12 pr-10 py-6 bg-secondary border-0 text-lg rounded-lg placeholder:text-muted-foreground"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-4 top-1/2 -translate-y-1/2"
          >
            <X className="w-5 h-5 text-muted-foreground hover:text-foreground transition" />
          </button>
        )}
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto mb-8 pb-2" style={{ scrollbarWidth: "none" }}>
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setActiveCategory(cat.value)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeCategory === cat.value
                ? "bg-white text-black"
                : "bg-secondary text-foreground hover:bg-secondary/80"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Results */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-muted-foreground text-lg">Nenhum resultado encontrado</p>
          <p className="text-muted-foreground text-sm mt-1">
            Tente buscar por outro termo
          </p>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3"
        >
          {filtered.map((item, i) => (
            <ContentCard key={item.id} item={item} index={i} isLarge />
          ))}
        </motion.div>
      )}
    </div>
  );
}