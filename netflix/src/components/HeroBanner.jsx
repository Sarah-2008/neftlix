import { useState, useEffect } from "react";
import { Play, Info, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function HeroBanner({ featured }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (featured.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featured.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [featured.length]);

  if (!featured.length) return null;

  const item = featured[currentIndex];

  return (
    <div className="relative w-full h-[70vh] md:h-[85vh] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={item.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <img
            src={item.banner_url || item.image_url}
            alt={item.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-16 md:bottom-24 left-0 right-0 px-6 md:px-12 max-w-7xl mx-auto">
        <motion.div
          key={item.id + "-info"}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="text-primary font-bold text-sm tracking-wider">N</span>
            <span className="text-xs text-muted-foreground font-semibold tracking-widest uppercase">
              {item.type === "series" ? "Série" : "Filme"}
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black mb-3 leading-tight max-w-xl">
            {item.title}
          </h1>
          <p className="text-sm md:text-base text-foreground/80 max-w-lg mb-6 line-clamp-3">
            {item.description}
          </p>
          <div className="flex items-center gap-3">
            <Button className="bg-white hover:bg-white/90 text-black font-semibold px-6 py-5 rounded-md gap-2">
              <Play className="w-5 h-5 fill-black" />
              Assistir
            </Button>
            <Link to={`/detail/${item.id}`}>
              <Button variant="secondary" className="bg-white/20 hover:bg-white/30 text-white font-semibold px-6 py-5 rounded-md gap-2 backdrop-blur-sm">
                <Info className="w-5 h-5" />
                Mais Informações
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Dots indicator */}
      {featured.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {featured.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`w-2 h-2 rounded-full transition-all ${
                i === currentIndex ? "bg-white w-6" : "bg-white/40"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}