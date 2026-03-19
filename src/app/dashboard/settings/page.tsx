"use client";

import React, { useState } from "react";
import { 
  User, 
  Lock, 
  Bell, 
  Save, 
  CheckCircle2,
  ShieldCheck,
  Zap,
  Layout,
  ChevronRight,
  Loader2
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function SettingsPage() {
  const { user } = useAuth();
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("profile");
  const [isUpdating, setIsUpdating] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    setSuccessMsg("System records updated successfully!");
    setIsUpdating(false);
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-5xl font-black text-white tracking-tight">Settings</h1>
        <p className="text-slate-400 text-lg font-medium">Control center for your professional identity.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Navigation Sidebar */}
        <div className="lg:w-72 shrink-0 space-y-2">
          <TabButton 
            icon={<User />} 
            label="Internal Profile" 
            active={activeTab === "profile"} 
            onClick={() => setActiveTab("profile")}
          />
          <TabButton 
            icon={<Lock />} 
            label="Security Protocol" 
            active={activeTab === "security"} 
            onClick={() => setActiveTab("security")}
          />
          <TabButton 
            icon={<Layout />} 
            label="Studio Design" 
            active={activeTab === "appearance"} 
            onClick={() => setActiveTab("appearance")}
          />
          <TabButton 
            icon={<Bell />} 
            label="System Alerts" 
            active={activeTab === "notifications"} 
            onClick={() => setActiveTab("notifications")}
          />
        </div>

        {/* Dynamic Content Area */}
        <div className="flex-1 space-y-10">
          {successMsg && (
            <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-6 py-4 rounded-[2rem] flex items-center gap-4 animate-in zoom-in-95 duration-300 shadow-sm backdrop-blur-md">
              <CheckCircle2 className="h-6 w-6" />
              <span className="font-black text-sm uppercase tracking-widest">{successMsg}</span>
            </div>
          )}

          {activeTab === "profile" && (
            <div className="space-y-10">
               {/* Profile Section */}
              <section className="glass-card bg-[#0f172a]/40 p-6 sm:p-10 space-y-8 sm:space-y-10">
                <div className="flex items-center gap-6 pb-8 border-b border-white/5">
                   <div className="h-16 w-16 rounded-[1.5rem] bg-primary/20 flex items-center justify-center text-primary shadow-inner border border-primary/10">
                      <User className="h-8 w-8" />
                   </div>
                   <div>
                      <h2 className="text-xl font-black text-white">Personal Architecture</h2>
                      <p className="text-sm text-slate-500 font-bold">Manage your core identity data.</p>
                   </div>
                </div>
                
                <form onSubmit={handleSave} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-4">Display Name</label>
                      <input 
                        type="text" 
                        defaultValue={user?.name}
                        className="w-full px-6 py-4 bg-white/5 border border-white/5 rounded-2xl text-sm font-black text-white focus:outline-none focus:ring-4 focus:ring-primary/5 focus:bg-white/10 focus:border-primary/20 transition-all" 
                      />
                    </div>
                    <div className="space-y-3 opacity-60">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 ml-4">Auth Identifier (Email)</label>
                      <input 
                        type="email" 
                        readOnly
                        defaultValue={user?.email}
                        className="w-full px-6 py-4 bg-white/5 border border-white/5 rounded-2xl text-sm font-black text-slate-500 cursor-not-allowed" 
                      />
                      <p className="text-[9px] font-bold text-slate-600 ml-4 italic text-left">Contact support to change auth provider</p>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <button 
                      type="submit" 
                      disabled={isUpdating}
                      className="bg-slate-900 text-white px-10 py-5 rounded-[2rem] text-sm font-black shadow-2xl shadow-slate-900/20 hover:bg-slate-800 transition-all flex items-center gap-3 active:scale-95 disabled:opacity-50"
                    >
                      {isUpdating ? <Loader2 className="h-4 w-4 animate-spin text-slate-400" /> : <Save className="h-4 w-4 text-primary" />}
                      {isUpdating ? "Syncing..." : "Update Identity"}
                    </button>
                  </div>
                </form>
              </section>

              {/* Account Deletion Area */}
              <section className="bg-red-500/5 rounded-[3rem] border border-red-500/10 p-6 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                 <div className="space-y-1 text-left">
                    <h3 className="text-sm font-black text-red-400 uppercase tracking-widest">Danger Zone</h3>
                    <p className="text-sm font-medium text-red-600/60">Permanently terminate your account and all stored data.</p>
                 </div>
                 <button className="w-full md:w-auto px-8 py-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-2xl text-xs font-black hover:bg-red-500 hover:text-white transition-all shadow-sm active:scale-95">
                    Terminate Account
                 </button>
              </section>
            </div>
          )}

          {activeTab === "security" && (
            <section className="glass-card bg-[#0f172a]/40 p-6 sm:p-10 space-y-8 sm:space-y-10">
               <div className="flex items-center gap-6 pb-8 border-b border-white/5">
                  <div className="h-16 w-16 rounded-[1.5rem] bg-amber-500/20 flex items-center justify-center text-amber-500 shadow-inner border border-amber-500/10">
                     <ShieldCheck className="h-8 w-8" />
                  </div>
                  <div>
                     <h2 className="text-xl font-black text-white">Security Protocol</h2>
                     <p className="text-sm text-slate-500 font-bold">Strengthen your account fortification.</p>
                  </div>
               </div>

               <div className="space-y-8 max-w-md text-left">
                 <div className="space-y-3">
                   <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-4">Current Password</label>
                   <input type="password" placeholder="••••••••" className="w-full px-6 py-4 bg-white/5 border border-white/5 rounded-2xl text-sm font-black text-white focus:outline-none focus:ring-4 focus:ring-primary/5 focus:bg-white/10 focus:border-primary/20 transition-all placeholder:text-slate-700" />
                 </div>
                 <div className="space-y-3">
                   <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-4">New Secret Key</label>
                   <input type="password" placeholder="••••••••" className="w-full px-6 py-4 bg-white/5 border border-white/5 rounded-2xl text-sm font-black text-white focus:outline-none focus:ring-4 focus:ring-primary/5 focus:bg-white/10 focus:border-primary/20 transition-all placeholder:text-slate-700" />
                 </div>
                 <button className="text-primary font-black text-xs uppercase tracking-[0.2em] hover:text-indigo-400 transition-all flex items-center gap-2 group">
                   Authorize Change <ChevronRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                 </button>
               </div>
            </section>
          )}

          {(activeTab === "appearance" || activeTab === "notifications") && (
            <div className="glass-card bg-[#0f172a]/60 p-8 sm:p-12 md:p-20 text-center">
               <div className="bg-white/5 w-24 h-24 rounded-[2rem] flex items-center justify-center mx-auto mb-10 border border-white/5">
                  <Zap className="h-10 w-10 text-slate-700" />
               </div>
               <h2 className="text-3xl font-black text-white mb-6 uppercase tracking-tighter">Feature Evolution</h2>
               <p className="text-slate-500 font-medium text-lg leading-relaxed max-w-md mx-auto">
                 We are currently refining these modules to ensure a premium experience. Stay tuned for the next system update.
               </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function TabButton({ icon, label, active = false, onClick }: { icon: React.ReactNode, label: string, active?: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`
        w-full flex items-center justify-between gap-3 px-6 py-5 rounded-2xl text-sm font-black transition-all group
        ${active 
          ? 'bg-primary/10 text-primary shadow-lg shadow-primary/5' 
          : 'text-slate-500 hover:bg-white/5 hover:text-white'}
      `}
    >
      <div className="flex items-center gap-4">
        <div className={`transition-colors ${active ? 'text-primary' : 'text-slate-300 group-hover:text-slate-400'}`}>
          {React.cloneElement(icon as React.ReactElement<{ className?: string }>, { className: "h-5 w-5" })}
        </div>
        <span className="uppercase tracking-[0.1em]">{label}</span>
      </div>
      {active && <div className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_10px_#6366f1]" />}
    </button>
  );
}
