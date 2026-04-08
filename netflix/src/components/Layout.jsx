import { Outlet, Link, useLocation } from "react-router-dom";
import { Home, Search, List, User } from "lucide-react";

const navItems = [
  { path: "/", icon: Home, label: "Início" },
  { path: "/search", icon: Search, label: "Buscar" },
  { path: "/my-list", icon: List, label: "Minha Lista" },
  { path: "/profile", icon: User, label: "Perfil" },
];

export default function Layout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation - Desktop */}
      <header className="fixed top-0 left-0 right-0 z-50 hidden md:block">
        <div className="bg-gradient-to-b from-black/90 via-black/60 to-transparent px-6 py-4">
          <div className="flex items-center gap-8 max-w-7xl mx-auto">
            <Link to="/" className="text-primary font-extrabold text-2xl tracking-tighter">
              NETSTREAM
            </Link>
            <nav className="flex items-center gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-sm font-medium transition-colors hover:text-white ${
                    location.pathname === item.path
                      ? "text-white"
                      : "text-muted-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pb-20 md:pb-0">
        <Outlet />
      </main>

      {/* Bottom Navigation - Mobile */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-black/95 backdrop-blur-lg border-t border-border">
        <div className="flex items-center justify-around py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center gap-1 px-3 py-1 transition-colors ${
                  isActive ? "text-white" : "text-muted-foreground"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-[10px] font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}