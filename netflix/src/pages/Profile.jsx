import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { User, LogOut, Settings, Bell, HelpCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";

const menuItems = [
  { icon: Bell, label: "Notificações", description: "Gerencie suas notificações" },
  { icon: Settings, label: "Configurações da Conta", description: "Altere seus dados pessoais" },
  { icon: HelpCircle, label: "Ajuda", description: "Central de ajuda e suporte" },
];

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const me = await base44.auth.me();
      setUser(me);
      setLoading(false);
    };
    load();
  }, []);

  const handleLogout = () => {
    base44.auth.logout();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="pt-20 md:pt-24 px-6 md:px-12 max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Profile Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-lg bg-gradient-to-br from-primary to-red-700 flex items-center justify-center">
            <User className="w-8 h-8 md:w-10 md:h-10 text-white" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-bold">{user?.full_name || "Usuário"}</h1>
            <p className="text-muted-foreground text-sm">{user?.email}</p>
          </div>
        </div>

        {/* Subscription Card */}
        <div className="bg-gradient-to-r from-secondary to-card rounded-xl p-6 mb-8 border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Plano Atual</p>
              <p className="text-lg font-bold">Premium</p>
              <p className="text-sm text-muted-foreground">Ultra HD + 4 telas</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-black text-primary">R$ 55,90</p>
              <p className="text-xs text-muted-foreground">/mês</p>
            </div>
          </div>
        </div>

        {/* Menu */}
        <div className="space-y-1 mb-8">
          {menuItems.map((menuItem, i) => {
            const Icon = menuItem.icon;
            return (
              <button
                key={i}
                className="w-full flex items-center gap-4 p-4 rounded-lg hover:bg-secondary transition group"
              >
                <div className="w-10 h-10 rounded-full bg-secondary group-hover:bg-accent flex items-center justify-center">
                  <Icon className="w-5 h-5 text-muted-foreground" />
                </div>
                <div className="text-left flex-1">
                  <p className="font-medium text-sm">{menuItem.label}</p>
                  <p className="text-xs text-muted-foreground">{menuItem.description}</p>
                </div>
              </button>
            );
          })}
        </div>

        <Separator className="mb-6" />

        {/* Logout */}
        <Button
          onClick={handleLogout}
          variant="ghost"
          className="w-full justify-start gap-3 text-muted-foreground hover:text-destructive"
        >
          <LogOut className="w-5 h-5" />
          Sair da Conta
        </Button>
      </motion.div>
    </div>
  );
}