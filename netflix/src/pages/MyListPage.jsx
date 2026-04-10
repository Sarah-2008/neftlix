import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Loader2, List } from "lucide-react";
import ContentCard from "../components/ContentCard";
import { motion } from "framer-motion";

export default function MyListPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const user = await base44.auth.me();
      const myList = await base44.entities.MyList.filter({ user_email: user.email });
      
      if (myList.length === 0) {
        setItems([]);
        setLoading(false);
        return;
      }

      const allContent = await base44.entities.Content.list();
      const listContentIds = myList.map((m) => m.content_id);
      const listItems = allContent.filter((c) => listContentIds.includes(c.id));
      setItems(listItems);
      setLoading(false);
    };
    load();
  }, []);

  return (
    <div className="pt-20 md:pt-24 px-6 md:px-12 max-w-7xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold mb-8">Minha Lista</h1>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center">
            <List className="w-8 h-8 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground text-lg">Sua lista está vazia</p>
          <p className="text-muted-foreground text-sm text-center max-w-md">
            Adicione filmes e séries à sua lista para assistir mais tarde
          </p>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3"
        >
          {items.map((item, i) => (
            <ContentCard key={item.id} item={item} index={i} isLarge />
          ))}
        </motion.div>
      )}
    </div>
  );
}