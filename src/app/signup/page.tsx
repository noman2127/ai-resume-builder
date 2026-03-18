"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, Lock, User, ArrowRight, Loader2, Sparkles } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (data.success) {
        login(data.token, data.user);
      } else {
        setError(data.error || "Signup failed. Please try again.");
      }
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans selection:bg-primary/30">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px] animate-pulse delay-700" />
      </div>

      <div className="w-full max-w-md relative z-10 animate-in fade-in zoom-in-95 duration-700">
        {/* Logo Section */}
        <div className="flex flex-col items-center mb-12 group">
          <div className="bg-primary/20 h-20 w-20 rounded-[2.5rem] flex items-center justify-center text-primary mb-6 shadow-2xl shadow-primary/20 group-hover:scale-110 transition-transform duration-700 border border-primary/10">
            <Sparkles className="h-10 w-10" />
          </div>
          <h1 className="text-4xl font-black text-white tracking-tighter uppercase group-hover:tracking-widest transition-all duration-700">
            Studio<span className="text-primary">.ai</span>
          </h1>
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mt-3">Advanced Narrative Engine</p>
        </div>

        {/* Signup Form Card */}
        <div className="glass-card bg-[#0f172a]/80 backdrop-blur-2xl p-10 md:p-12 shadow-[0_40px_100px_rgba(0,0,0,0.4)] border border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
          
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-black text-white tracking-tight mb-2">Create Identity</h2>
            <p className="text-sm text-slate-500 font-bold uppercase tracking-wider">Join the professional network</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="group relative">
              <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-slate-600 group-focus-within:text-primary transition-colors" />
              </div>
              <input
                type="text"
                required
                className="w-full pl-14 pr-6 py-5 bg-white/5 border border-white/5 rounded-2xl text-sm font-bold text-white placeholder:text-slate-700 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:bg-white/10 focus:border-primary/20 transition-all"
                placeholder="FULL_LEGAL_NAME"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="group relative">
              <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-slate-600 group-focus-within:text-primary transition-colors" />
              </div>
              <input
                type="email"
                required
                className="w-full pl-14 pr-6 py-5 bg-white/5 border border-white/5 rounded-2xl text-sm font-bold text-white placeholder:text-slate-700 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:bg-white/10 focus:border-primary/20 transition-all font-mono"
                placeholder="AUTHENTICATION_EMAIL"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="group relative">
              <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-slate-600 group-focus-within:text-primary transition-colors" />
              </div>
              <input
                type="password"
                required
                className="w-full pl-14 pr-6 py-5 bg-white/5 border border-white/5 rounded-2xl text-sm font-bold text-white placeholder:text-slate-700 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:bg-white/10 focus:border-primary/20 transition-all font-mono"
                placeholder="SECRET_CREDENTIAL"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-[10px] font-black uppercase tracking-widest animate-in shake duration-300">
                Error: {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-5 bg-primary hover:bg-indigo-400 text-white rounded-2xl text-sm font-black tracking-[0.2em] uppercase transition-all shadow-xl shadow-primary/20 active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-3 group"
            >
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />}
              {loading ? "PROCESSING..." : "Initialize Profile"}
            </button>
          </form>

          <div className="mt-10 pt-10 border-t border-white/5 text-center">
            <p className="text-xs font-black text-slate-500 uppercase tracking-widest">
              Existing identity?{" "}
              <Link href="/login" className="text-primary hover:text-indigo-400 transition-colors">
                Authorize Here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
