import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { Play, Plus, ThumbsUp, Share2, ArrowLeft, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import ContentRow from "../components/ContentRow";
import { toast } from "sonner";

export default function Detail() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [similar, setSimilar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [inMyList, setInMyList] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const [contentItem, allContent, me] = await Promise.all([
        base44.entities.Content.filter({ id }),
        base44.entities.Content.list(),
        base44.auth.me(),
      ]);
      
      const foundItem = contentItem[0];
      setItem(foundItem);
      setUser(me);

      if (foundItem) {
        const similarItems = allContent.filter(
          (c) => c.id !== foundItem.id && (c.category === foundItem.category || c.type === foundItem.type)
        );
        setSimilar(similarItems.slice(0, 10));
      }

      if (me) {
        const myList = await base44.entities.MyList.filter({ user_email: me.email, content_id: id });
        setInMyList(myList.length > 0);
      }

      setLoading(false);
    };
    load();
  }, [id]);

  const toggleMyList = async () => {
    if (inMyList) {
      const existing = await base44.entities.MyList.filter({ user_email: user.email, content_id: id });
      if (existing.length) {
        await base44.entities.MyList.delete(existing[0].id);
      }
      setInMyList(false);
      toast.success("Removido da sua lista");
    } else {
      await base44.entities.MyList.create({ content_id: id, user_email: user.email });
      setInMyList(true);
      toast.success("Adicionado à sua lista");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!item) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <p className="text-lg text-muted-foreground">Conteúdo não encontrado</p>
        <Link to="/">
          <Button>Voltar ao Início</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="relative w-full h-[50vh] md:h-[70vh]">
        <img
          src={item.banner_url || item.image_url}
          alt={item.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-transparent to-transparent" />

        <Link
          to="/"
          className="absolute top-6 left-6 md:top-24 md:left-12 z-10 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center hover:bg-black/70 transition"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
      </div>

      {/* Info */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="-mt-32 relative z-10 px-6 md:px-12 max-w-4xl"
      >
        <h1 className="text-3xl md:text-5xl font-black mb-4">{item.title}</h1>

        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="text-green-400 font-bold">{item.match_percentage || 95}% Match</span>
          <span className="text-muted-foreground">{item.year}</span>
          <Badge variant="outline" className="text-xs border-white/30">
            {item.rating || "16+"}
          </Badge>
          <span className="text-muted-foreground">{item.duration}</span>
        </div>

        <div className="flex items-center gap-3 mb-6">
          <Button className="bg-white hover:bg-white/90 text-black font-semibold px-8 py-5 gap-2">
            <Play className="w-5 h-5 fill-black" />
            Assistir
          </Button>
          <button
            onClick={toggleMyList}
            className="w-10 h-10 rounded-full border border-white/40 flex items-center justify-center hover:border-white transition"
          >
            {inMyList ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
          </button>
          <button className="w-10 h-10 rounded-full border border-white/40 flex items-center justify-center hover:border-white transition">
            <ThumbsUp className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 rounded-full border border-white/40 flex items-center justify-center hover:border-white transition">
            <Share2 className="w-5 h-5" />
          </button>
        </div>

        <p className="text-sm md:text-base text-foreground/80 mb-6 max-w-2xl leading-relaxed">
          {item.description}
        </p>

        <div className="space-y-2 text-sm mb-8">
          {item.cast && (
            <p>
              <span className="text-muted-foreground">Elenco: </span>
              <span className="text-foreground/80">{item.cast}</span>
            </p>
          )}
          {item.genre && item.genre.length > 0 && (
            <p>
              <span className="text-muted-foreground">Gêneros: </span>
              <span className="text-foreground/80">{item.genre.join(", ")}</span>
            </p>
          )}
          <p>
            <span className="text-muted-foreground">Tipo: </span>
            <span className="text-foreground/80">
              {item.type === "series" ? "Série" : "Filme"}
            </span>
          </p>
        </div>
      </motion.div>

      {/* Similar */}
      {similar.length > 0 && (
        <div className="mt-8 pb-8">
          <ContentRow title="Títulos Semelhantes" items={similar} />
        </div>
      )}
    </div>
  );
}