"use client";

import Link from "next/link";
import {
  FileText,
  Sparkles,
  Download,
  Layout,
  ArrowRight,
  CheckCircle,
  Zap,
  Shield,
  Clock
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function LandingPage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans selection:bg-primary/30 overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#020617]/50 backdrop-blur-2xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 group px-4 py-2 rounded-2xl transition-all hover:bg-white/5 cursor-pointer">
            <div className="bg-primary p-2.5 rounded-2xl text-white shadow-2xl shadow-primary/20 group-hover:scale-110 transition-transform">
              <FileText className="h-6 w-6" />
            </div>
            <span className="font-black text-2xl tracking-tight">Resume<span className="text-primary">AI</span></span>
          </div>
          <div className="hidden md:flex items-center gap-10">
            <Link href="#features" className="text-[11px] font-black text-slate-400 uppercase tracking-widest hover:text-white transition-all">Capabilities</Link>
            <Link href="#pricing" className="text-[11px] font-black text-slate-400 uppercase tracking-widest hover:text-white transition-all">Investment</Link>
            <Link href="#demo" className="text-[11px] font-black text-slate-400 uppercase tracking-widest hover:text-white transition-all">Architecture</Link>
          </div>
          <div className="flex items-center gap-4">
            {user ? (
              <Link
                href="/dashboard"
                className="bg-white text-slate-900 px-8 py-3 rounded-2xl font-black text-sm transition-all hover:bg-slate-200 active:scale-95 shadow-2xl shadow-white/5"
              >
                GO TO STUDIO
              </Link>
            ) : (
              <>
                <Link href="/login" className="hidden sm:block text-[11px] font-black text-slate-400 uppercase tracking-widest hover:text-white transition-all mr-4">Log in</Link>
                <Link
                  href="/signup"
                  className="bg-primary text-white px-8 py-3 rounded-2xl font-black text-sm transition-all hover:opacity-90 active:scale-95 shadow-2xl shadow-primary/20"
                >
                  START BUILDING
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="relative pt-44 pb-32 lg:pt-64 lg:pb-48 overflow-hidden">
          {/* Advanced Background System */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 overflow-hidden">
            <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-primary/20 blur-[150px] rounded-full animate-pulse duration-[10s]" />
            <div className="absolute bottom-[10%] right-[-10%] w-[50%] h-[50%] bg-purple-500/10 blur-[120px] rounded-full" />
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
              style={{ backgroundImage: 'radial-gradient(#818cf8 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
          </div>

          <div className="container mx-auto px-6 text-center">
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-primary text-[10px] font-black uppercase tracking-[0.25em] mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              Intelligence Driven Design
            </div>

            <h1 className="text-7xl md:text-[10rem] font-black tracking-tight text-white mb-10 max-w-6xl mx-auto leading-[0.85] animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-100">
              Master Your <span className="text-gradient">Career</span> Narrative.
            </h1>

            <p className="text-xl md:text-2xl text-slate-400 max-w-4xl mx-auto mb-16 font-medium leading-relaxed animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200 px-4">
              Forge high-performance, ATS-optimized resumes in seconds. Professional aesthetics, AI-powered copywriting, and instant industrial-grade PDF export.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-in fade-in slide-in-from-bottom-16 duration-1000 delay-300">
              <Link
                href="/signup"
                className="w-full sm:w-auto px-12 py-6 bg-primary text-white rounded-[2.5rem] font-black text-xl transition-all hover:scale-105 active:scale-95 shadow-[0_20px_60px_rgba(99,102,241,0.4)] flex items-center justify-center gap-4 group"
              >
                INITIALIZE BUILDER
                <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="#features"
                className="w-full sm:w-auto px-12 py-6 glass-card bg-white/5 text-white rounded-[2.5rem] font-black text-xl border border-white/10 transition-all hover:bg-white/10 flex items-center justify-center gap-3"
              >
                SYSTEM DEMO
              </Link>
            </div>

            {/* Industrial Preview Mockup */}
            <div className="mt-36 relative max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-24 duration-1000 delay-500 px-2">
              <div className="absolute inset-0 bg-primary/20 blur-[150px] opacity-10 -z-10 rounded-full" />
              <div className="glass-card bg-[#020617]/80 rounded-[3rem] border border-white/10 shadow-[0_48px_100px_rgba(0,0,0,0.6)] overflow-hidden p-4 md:p-8 backdrop-blur-3xl">
                <div className="rounded-[2.5rem] border border-white/5 overflow-hidden shadow-2xl flex flex-col md:flex-row h-[700px] bg-[#050b1d]">
                  <div className="w-full md:w-[320px] bg-[#020617]/50 p-10 border-r border-white/5">
                    <div className="space-y-8 text-left">
                      <div className="space-y-4">
                        <div className="h-2 w-16 bg-primary/20 rounded-full" />
                        <div className="h-10 w-2/3 bg-white/5 rounded-2xl" />
                      </div>
                      <div className="space-y-3">
                        <div className="h-4 w-full bg-white/5 rounded-xl underline-offset-4" />
                        <div className="h-4 w-5/6 bg-white/5 rounded-xl" />
                      </div>
                      <div className="pt-10 space-y-6">
                        <div className="h-4 w-1/2 bg-white/5 rounded-full" />
                        <div className="flex flex-wrap gap-3">
                          {[1, 2, 3, 4, 5, 6].map(i => <div key={i} className="h-8 w-14 bg-primary/5 border border-primary/10 rounded-xl" />)}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block flex-1 p-16 overflow-hidden relative">
                    <div className="absolute inset-x-16 top-16 bottom-0 bg-white shadow-2xl rounded-t-[2.5rem] p-16 space-y-12">
                      <div className="space-y-6">
                        <div className="h-12 w-[40%] bg-slate-900 rounded-2xl" />
                        <div className="flex gap-6">
                          <div className="h-4 w-24 bg-slate-200 rounded-full" />
                          <div className="h-4 w-24 bg-slate-200 rounded-full" />
                        </div>
                      </div>
                      <div className="space-y-8 pt-6">
                        <div className="h-4 w-full bg-slate-100 rounded-full" />
                        <div className="h-4 w-full bg-slate-100 rounded-full" />
                        <div className="h-4 w-3/4 bg-slate-100 rounded-full" />
                      </div>
                      <div className="grid grid-cols-2 gap-10 pt-10">
                        {[1, 2].map(i => (
                          <div key={i} className="space-y-4">
                            <div className="h-6 w-2/3 bg-slate-200 rounded-xl" />
                            <div className="h-3 w-full bg-slate-100 rounded-full" />
                            <div className="h-3 w-full bg-slate-100 rounded-full" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section id="features" className="py-40 bg-[#030718] relative">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
          <div className="container mx-auto px-6">
            <div className="text-center mb-32 space-y-6">
              <h2 className="text-5xl md:text-7xl font-black tracking-tight mb-8 text-white uppercase leading-none">Industrial Edge</h2>
              <p className="text-xl text-slate-400 max-w-3xl mx-auto font-medium leading-relaxed">
                Engineered for maximum career velocity. Stand out in the most competitive talent pipelines with our advanced toolset.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-10 max-w-7xl mx-auto px-4">
              <FeatureCard
                icon={<Sparkles className="h-8 w-8" />}
                title="AI Narrative Forge"
                desc="Generate high-impact performance metrics and strategic summaries instantly based on industrial benchmarks."
                color="primary"
              />
              <FeatureCard
                icon={<Layout className="h-8 w-8" />}
                title="Synchronous Studio"
                desc="A precision split-screen environment allowing real-time structural updates with high-fidelity preview."
                color="blue"
              />
              <FeatureCard
                icon={<Zap className="h-8 w-8" />}
                title="ATS Optimization"
                desc="Engineered formatting that guarantees 100% extraction accuracy by top-tier applicant tracking systems."
                color="emerald"
              />
            </div>
          </div>
        </section>

        {/* Trust/Metric Section */}
        <section className="py-24 border-y border-white/5 bg-[#020617]/50">
          <div className="container mx-auto px-6">
            <div className="flex flex-wrap justify-center gap-12 md:gap-32 text-center text-slate-500 font-black uppercase tracking-[0.3em] text-xs">
              <div className="space-y-2">
                <span className="text-2xl text-white block">50k+</span>
                <span>Resumes Built</span>
              </div>
              <div className="space-y-2">
                <span className="text-2xl text-white block">99.8%</span>
                <span>ATS Accuracy</span>
              </div>
              <div className="space-y-2">
                <span className="text-2xl text-white block">350+</span>
                <span>Global Hires</span>
              </div>
            </div>
          </div>
        </section>

        {/* Investment Section (Pricing) */}
        <section id="pricing" className="py-40 relative">
          <div className="container mx-auto px-6">
            <div className="text-center mb-24 space-y-6">
              <h2 className="text-5xl md:text-7xl font-black tracking-tight text-white uppercase leading-none">Strategic Plans</h2>
              <p className="text-xl text-slate-400 max-w-2xl mx-auto font-medium">
                Value-engineered for every stage of your career trajectory.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto px-4">
              <PricingCard
                title="LITE"
                price="0"
                desc="Perfect for launching your baseline professional identity."
                features={["1 Strategic Resume", "Standard AI Core (5 credits)", "Industrial PDF Export", "Global Standard Template"]}
                cta="DEPLOY FOR FREE"
              />
              <PricingCard
                title="MAX"
                price="19"
                desc="For professionals requiring maximum industrial leverage."
                features={["Unlimited Multi-ID Support", "Full AI Narrative Engine", "All Premium Architectures", "Priority Server Status", "Expert Career Analytics"]}
                cta="ACTIVATE MAX"
                highlighted
              />
            </div>
          </div>
        </section>
      </main>

      {/* Industrial Footer */}
      <footer className="bg-[#010413] pt-32 pb-16 text-white border-t border-white/5">
        <div className="container mx-auto px-10">
          <div className="flex flex-col md:flex-row justify-between items-start gap-16 border-b border-white/5 pb-24 mb-16">
            <div className="space-y-8">
              <div className="flex items-center gap-4 group">
                <div className="bg-primary p-3 rounded-2xl shadow-2xl shadow-primary/20 transition-transform group-hover:scale-110">
                  <FileText className="h-8 w-8" />
                </div>
                <span className="font-black text-4xl tracking-tight">Resume<span className="text-primary">AI</span></span>
              </div>
              <p className="text-slate-500 font-bold max-w-sm leading-relaxed">
                Engineering the future of professional job acquisition through advanced AI design systems.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-20">
              <div className="space-y-6">
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white">System</h4>
                <div className="flex flex-col gap-4 text-slate-500 font-black text-[11px] uppercase tracking-widest">
                  <Link href="#" className="hover:text-white transition-colors">Architecture</Link>
                  <Link href="#" className="hover:text-white transition-colors">Features</Link>
                  <Link href="#" className="hover:text-white transition-colors">Roadmap</Link>
                </div>
              </div>
              <div className="space-y-6">
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Direct</h4>
                <div className="flex flex-col gap-4 text-slate-500 font-black text-[11px] uppercase tracking-widest">
                  <Link href="#" className="hover:text-white transition-colors">Twitter</Link>
                  <Link href="#" className="hover:text-white transition-colors">GitHub</Link>
                  <Link href="#" className="hover:text-white transition-colors">LinkedIn</Link>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-slate-600 font-black text-[10px] uppercase tracking-[0.2em]">
            <p>© 2026 ResumeAI Systems. All Rights Reserved.</p>
            <div className="flex gap-12">
              <Link href="#" className="hover:text-white transition-colors">Protocol</Link>
              <Link href="#" className="hover:text-white transition-colors">Compliance</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, desc, color }: { icon: React.ReactNode; title: string; desc: string; color: string }) {
  const colorMap: Record<string, string> = {
    primary: "bg-primary/20 text-primary border-primary/20 shadow-primary/10",
    blue: "bg-blue-500/20 text-blue-400 border-blue-500/20 shadow-blue-500/10",
    emerald: "bg-emerald-500/20 text-emerald-400 border-emerald-500/20 shadow-emerald-500/10"
  };

  const classes = colorMap[color] || colorMap.primary;

  return (
    <div className="glass-card bg-white/5 rounded-[2.5rem] p-12 border border-white/5 hover:border-white/10 hover:bg-white/[0.07] transition-all group relative overflow-hidden">
      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-10 group-hover:scale-110 transition-transform shadow-2xl border ${classes}`}>
        {icon}
      </div>
      <h3 className="text-2xl font-black mb-4 tracking-tight uppercase">{title}</h3>
      <p className="text-slate-400 font-bold leading-relaxed text-sm">
        {desc}
      </p>
    </div>
  );
}

function PricingCard({ title, price, desc, features, cta, highlighted = false }: {
  title: string;
  price: string;
  desc: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
}) {
  return (
    <div className={`
      rounded-[3.5rem] p-12 flex flex-col transition-all duration-700 hover:scale-[1.02] border
      ${highlighted
        ? 'bg-primary text-white shadow-[0_48px_100px_rgba(99,102,241,0.4)] border-primary relative overflow-hidden'
        : 'bg-white/5 border-white/5 text-white hover:bg-white/[0.07]'}
    `}>
      {highlighted && (
        <div className="absolute top-10 right-[-45px] rotate-45 bg-white text-primary text-[10px] font-black uppercase tracking-[0.25em] px-16 py-1.5 shadow-2xl">
          Top Tier
        </div>
      )}
      <div className="mb-12">
        <h3 className="text-[12px] font-black mb-8 uppercase tracking-[0.4em] opacity-60">{title}</h3>
        <div className="flex items-baseline gap-2 mb-6">
          <span className="text-7xl font-black tracking-tight">${price}</span>
          <span className={`text-xl font-black ${highlighted ? 'text-white/60' : 'text-slate-500'}`}>/MO</span>
        </div>
        <p className={`text-lg font-bold leading-relaxed ${highlighted ? 'text-white' : 'text-slate-400'}`}>{desc}</p>
      </div>

      <ul className="space-y-5 mb-16 flex-1">
        {features.map((f: string, i: number) => (
          <li key={i} className="flex items-center gap-4">
            <div className={`p-1 rounded-full ${highlighted ? 'bg-white text-primary' : 'bg-primary/20 text-primary'}`}>
              <CheckCircle className="h-4 w-4 shrink-0" />
            </div>
            <span className="font-black text-[11px] uppercase tracking-widest">{f}</span>
          </li>
        ))}
      </ul>

      <button className={`
        w-full py-6 rounded-3xl font-black text-sm uppercase tracking-widest transition-all active:scale-95 shadow-2xl
        ${highlighted
          ? 'bg-white text-primary hover:bg-slate-100'
          : 'bg-primary text-white hover:opacity-90 shadow-primary/20'}
      `}>
        {cta}
      </button>
    </div>
  );
}
