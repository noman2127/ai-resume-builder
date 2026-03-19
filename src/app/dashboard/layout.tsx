"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  LayoutDashboard, 
  PlusCircle, 
  Files, 
  Settings, 
  LogOut,
  User,
  Menu,
  ChevronRight,
  Sparkles,
  Search
} from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Create New", href: "/dashboard/builder", icon: PlusCircle },
  { name: "My Resumes", href: "/dashboard/resumes", icon: Files },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Protected route check
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-[#020617] gap-6">
        <div className="relative">
          <div className="h-16 w-16 rounded-3xl border-4 border-primary/20 border-t-primary animate-spin" />
          <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-6 w-6 text-primary" />
        </div>
        <div className="text-center space-y-2">
          <p className="text-xl font-black text-white tracking-tight uppercase">Studio<span className="text-primary">.ai</span></p>
          <p className="text-slate-500 font-bold text-sm animate-pulse tracking-widest uppercase">Securing Session...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#020617] font-sans selection:bg-primary/30 text-white">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden animate-in fade-in duration-300"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-[#080c1d] border-r border-white/5 transform transition-transform duration-500 ease-out lg:relative lg:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full p-8">
          {/* Logo Section */}
          <div className="flex items-center gap-4 mb-14 px-2 group">
            <div className="bg-primary/20 h-11 w-11 rounded-2xl flex items-center justify-center text-primary shadow-lg shadow-primary/10 group-hover:scale-110 transition-transform duration-500">
              <Sparkles className="h-6 w-6" />
            </div>
            <span className="font-black text-xl tracking-tight text-white uppercase group-hover:tracking-widest transition-all duration-500">
              Studio<span className="text-primary">.ai</span>
            </span>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsSidebarOpen(false)}
                className={`
                  flex items-center gap-4 px-6 py-4 rounded-2xl text-[13px] font-black uppercase tracking-wider transition-all duration-300 group
                  ${pathname === item.href 
                    ? 'bg-primary/10 text-primary shadow-lg shadow-primary/5' 
                    : 'text-slate-500 hover:text-white hover:bg-white/5'}
                `}
              >
                <div className={`transition-transform duration-300 group-hover:scale-110 ${pathname === item.href ? 'text-primary' : 'text-slate-600'}`}>
                  <item.icon className="h-5 w-5" />
                </div>
                {item.name}
                {pathname === item.href && (
                  <div className="ml-auto h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_10px_#6366f1]" />
                )}
              </Link>
            ))}
          </nav>

          {/* User Profile Section */}
          <div className="mt-auto pt-8 border-t border-white/5">
            <div className="bg-white/5 rounded-3xl p-5 group hover:bg-white/10 transition-all cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary border border-primary/10">
                  <User className="h-5 w-5" />
                </div>
                <div className="flex-1 overflow-hidden">
                  <p className="text-xs font-black text-white truncate">{user?.name}</p>
                  <p className="text-[10px] font-bold text-slate-500 truncate">{user?.email}</p>
                </div>
                <button 
                  onClick={logout}
                  className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all"
                  title="Logout"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Top Header */}
        <header className="h-20 border-b border-white/5 flex items-center justify-between px-4 sm:px-8 bg-[#020617]/50 backdrop-blur-xl z-30 sticky top-0">
          <button 
            className="lg:hidden p-2 text-slate-400 hover:text-white transition-colors"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
          
          <div className="hidden lg:flex items-center gap-2 text-xs font-black text-slate-500 uppercase tracking-widest">
            <span className="hover:text-white transition-colors cursor-pointer">Portal</span>
            <ChevronRight className="h-3 w-3" />
            <span className="text-white">{pathname?.split('/').pop()?.replace('-', ' ')}</span>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative pointer-events-none opacity-50 hidden sm:block">
              <div className="absolute inset-y-0 left-4 flex items-center">
                <Search className="h-4 w-4 text-slate-500" />
              </div>
              <input 
                type="text" 
                placeholder="Global Search..." 
                className="bg-white/5 border-none rounded-2xl py-2 pl-12 pr-6 text-[10px] font-bold tracking-widest uppercase w-64"
              />
            </div>
            <div className="h-5 w-px bg-white/5" />
            <div className="h-10 w-10 text-slate-900 font-bold bg-primary flex items-center justify-center rounded-xl shadow-lg shadow-primary/20">
              {user?.name?.[0]}
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 sm:p-6 lg:p-12">
          {children}
        </div>
      </main>
    </div>
  );
}
