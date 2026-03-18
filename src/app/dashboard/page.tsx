"use client";

import Link from "next/link";
import { PlusCircle, FileText, Clock, Sparkles, Zap } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function DashboardPage() {
  const { user } = useAuth();
  
  return (
    <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between items-start gap-8">
        <div className="space-y-2">
          <h1 className="text-5xl font-black text-white tracking-tight">
            Hello, {user?.name.split(' ')[0]}!
          </h1>
          <p className="text-slate-400 mt-2 text-lg font-medium">Your career journey continues here. What&apos;s next?</p>
        </div>
        <Link
          href="/dashboard/builder"
          className="bg-primary text-white px-8 py-4 rounded-[2rem] font-black shadow-2xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 group"
        >
          <PlusCircle className="h-6 w-6" />
          Create New Resume
        </Link>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <StatsCard 
          icon={<FileText className="h-6 w-6" />} 
          label="Total Resumes" 
          value="12" 
          trend="+2 this month"
          color="bg-primary/20 text-primary border border-primary/10"
        />
        <StatsCard 
          icon={<Clock className="h-6 w-6" />} 
          label="Last Activity" 
          value="2h ago" 
          trend="Editor used"
          color="bg-slate-800 text-slate-400 border border-white/5"
        />
        <StatsCard 
          icon={<Zap className="h-6 w-6" />} 
          label="AI Credits" 
          value="85%" 
          trend="Premium Plan"
          color="bg-amber-500/20 text-amber-500 border border-amber-500/10"
        />
      </div>

      {/* AI Hero Section */}
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-primary to-purple-600 rounded-[3.5rem] blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative glass-card bg-[#0f172a]/80 backdrop-blur-2xl p-12 md:p-16 flex flex-col items-center text-center">
          <div className="bg-primary/20 h-20 w-20 rounded-[2rem] flex items-center justify-center text-primary mb-8 animate-bounce transition-all duration-700">
            <Sparkles className="h-10 w-10 text-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-6">Master Your Application</h2>
          <p className="text-slate-400 font-medium text-lg leading-relaxed max-w-xl mb-12">
            Use our industry-leading AI to transform your experience into a compelling narrative that recruiters can&apos;t ignore.
          </p>
          <Link
            href="/dashboard/builder"
            className="inline-flex items-center justify-center rounded-[2rem] bg-slate-900 text-white px-10 py-5 text-lg font-black transition-all hover:bg-slate-800 hover:scale-105 active:scale-95 shadow-xl shadow-slate-900/20"
          >
            Launch Builder Studio
          </Link>
        </div>
      </div>
    </div>
  );
}

function StatsCard({ icon, label, value, trend, color }: { icon: React.ReactNode; label: string; value: string; trend: string; color: string }) {
  return (
    <div className="glass-card bg-[#0f172a]/60 p-8 hover:shadow-2xl hover:shadow-primary/5 transition-all group overflow-hidden relative">
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-primary/10 transition-colors"></div>
      <div className="flex items-center gap-5 mb-6 relative z-10">
        <div className={`${color} p-4 rounded-2xl transition-transform duration-500 group-hover:scale-110`}>
          {icon}
        </div>
        <span className="text-xs font-black text-slate-400 uppercase tracking-widest leading-none">{label}</span>
      </div>
      <div className="flex items-end justify-between relative z-10">
        <div className="text-4xl font-black text-white tracking-tighter">{value}</div>
        <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest bg-white/5 px-2 py-1 rounded-lg border border-white/5">{trend}</div>
      </div>
    </div>
  );
}
