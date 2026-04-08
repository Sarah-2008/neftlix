import { useState } from "react";
import { Play, Plus, ThumbsUp, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function ContentCard({ item, index, isLarge = false }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className={`relative flex-shrink-0 ${
        isLarge ? "w-[200px] md:w-[250px]" : "w-[140px] md:w-[200px]"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/detail/${item.id}`}>
        <div
          className={`relative overflow-hidden rounded-md transition-all duration-300 ${
            isHovered ? "scale-110 z-20 shadow-2xl shadow-black/80" : ""
          } ${isLarge ? "aspect-[2/3]" : "aspect-video"}`}
        >
          <img
            src={isLarge ? item.image_url : (item.banner_url || item.image_url)}
            alt={item.title}
            className="w-full h-full object-cover"
          />
          {isLarge && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-3">
              <p className="text-xs font-semibold line-clamp-1">{item.title}</p>
            </div>
          )}

          {isHovered && !isLarge && (
            <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent flex flex-col justify-end p-3">
              <p className="text-xs font-bold mb-1 line-clamp-1">{item.title}</p>
              <div className="flex items-center gap-1">
                <button className="w-6 h-6 rounded-full bg-white flex items-center justify-center hover:bg-white/80 transition">
                  <Play className="w-3 h-3 fill-black text-black" />
                </button>
                <button className="w-6 h-6 rounded-full border border-white/40 flex items-center justify-center hover:border-white transition">
                  <Plus className="w-3 h-3" />
                </button>
                <button className="w-6 h-6 rounded-full border border-white/40 flex items-center justify-center hover:border-white transition">
                  <ThumbsUp className="w-3 h-3" />
                </button>
                <button className="w-6 h-6 rounded-full border border-white/40 flex items-center justify-center hover:border-white transition ml-auto">
                  <ChevronDown className="w-3 h-3" />
                </button>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-green-400 text-[10px] font-bold">{item.match_percentage || 95}% Match</span>
                <span className="text-[10px] border border-white/30 px-1">{item.rating || "16+"}</span>
              </div>
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
}