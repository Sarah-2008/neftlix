import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function TopTenRow({ title, items }) {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const amount = direction === "left" ? -400 : 400;
      scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
    }
  };

  if (!items.length) return null;

  return (
    <div className="relative group/row mb-8">
      <h2 className="text-lg md:text-xl font-bold mb-3 px-6 md:px-12">
        {title}
      </h2>

      <div className="relative">
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-0 bottom-0 z-10 w-12 bg-black/50 opacity-0 group-hover/row:opacity-100 transition-opacity flex items-center justify-center hover:bg-black/70"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto px-6 md:px-12 items-end"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {items.slice(0, 10).map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="flex-shrink-0 flex items-end gap-0"
            >
              <span
                className="text-7xl md:text-8xl font-black leading-none select-none"
                style={{
                  WebkitTextStroke: "2px hsl(0 0% 40%)",
                  color: "transparent",
                  marginRight: "-16px",
                  zIndex: 1,
                }}
              >
                {index + 1}
              </span>
              <Link to={`/detail/${item.id}`}>
                <div className="w-[110px] md:w-[130px] aspect-[2/3] rounded-md overflow-hidden relative hover:scale-105 transition-transform">
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-0 bottom-0 z-10 w-12 bg-black/50 opacity-0 group-hover/row:opacity-100 transition-opacity flex items-center justify-center hover:bg-black/70"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}