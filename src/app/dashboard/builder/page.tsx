"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { 
  Download,
  Sparkles,
  Save,
  ChevronLeft,
  Loader2,
  CheckCircle2,
  AlertCircle,
  User,
  Briefcase,
  GraduationCap,
  Wrench,
  FileText
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

import { downloadResumeAsPDF } from "@/lib/ResumeDownload";
import { generateAIContent } from "@/lib/aiResumeGenerator";
import ResumePreview from "@/components/resume/ResumePreview";
import { ResumeData } from "@/types/resume";

function BuilderContent() {
  const searchParams = useSearchParams();
  const editId = searchParams.get("id");
  const { token } = useAuth();

  const [data, setData] = useState<ResumeData>({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    summary: "",
    skills: "",
    experience: "",
    education: "",
    projects: ""
  });

  const [isDownloading, setIsDownloading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [currentResumeId, setCurrentResumeId] = useState<string | null>(null);

  useEffect(() => {
    if (editId && token) {
      setCurrentResumeId(editId);
      fetch(`/api/resumes/${editId}`, {
        headers: { "Authorization": `Bearer ${token}` }
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.success && result.data) {
            const r = result.data;
            setData({
              fullName: r.fullName || "",
              email: r.email || "",
              phone: r.phone || "",
              location: r.location || "",
              summary: r.summary || "",
              skills: r.skills || "",
              experience: r.experience || r.workExperience || "",
              education: r.education || "",
              projects: r.projects || "",
            });
          }
        })
        .catch(() => setError("Failed to load resume for editing."));
    }
  }, [editId, token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDownload = async () => {
    if (isDownloading) return;
    setIsDownloading(true);
    setError(null);
    try {
      await downloadResumeAsPDF("resume-preview-content", {
        filename: `${data.fullName.replace(/\s+/g, "_") || "Resume"}_Draft.pdf`
      });
      setSuccessMsg("Export successful!");
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch {
      setError("Failed to generate PDF export.");
    } finally {
      setIsDownloading(false);
    }
  };

  const handleGenerateAI = async () => {
    if (isGenerating) return;
    setIsGenerating(true);
    setError(null);
    try {
      const result = await generateAIContent(data);
      setData(prev => ({
        ...prev,
        summary: result.summary || prev.summary,
        experience: result.experience || prev.experience,
        skills: result.skills || prev.skills,
        projects: result.projects || prev.projects,
      }));
      setSuccessMsg("AI Refinement complete!");
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "AI failed to respond.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = async () => {
    if (isSaving || !token) return;
    setIsSaving(true);
    setError(null);
    setSuccessMsg(null);
    try {
      const url = currentResumeId ? `/api/resumes/${currentResumeId}` : "/api/resumes/create";
      const method = currentResumeId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        throw new Error(result.error || "Failed to save resume");
      }

      if (!currentResumeId && result.data?._id) {
        setCurrentResumeId(result.data._id);
        const newUrl = `/dashboard/builder?id=${result.data._id}`;
        window.history.replaceState({ ...window.history.state, as: newUrl, url: newUrl }, '', newUrl);
      }

      setSuccessMsg("Design synced successfully!");
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save resume.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#020617] text-white overflow-hidden font-sans selection:bg-primary/30">
      {/* Top Professional Toolbar */}
      <header className="h-20 glass-card bg-[#020617]/50 backdrop-blur-2xl border-b border-white/5 px-8 flex items-center justify-between z-40 shrink-0">
        <div className="flex items-center gap-6">
          <Link 
            href="/dashboard/resumes" 
            className="p-3 bg-white/5 border border-white/5 rounded-2xl text-slate-400 hover:text-white hover:bg-white/10 transition-all active:scale-95 group"
          >
            <ChevronLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
          </Link>
          <div className="h-8 w-px bg-white/5" />
          <div className="flex flex-col text-left">
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">Editing Environment</span>
            <h1 className="text-xl font-black tracking-tight flex items-center gap-2">
              {data.fullName || "Untitled Narrative"}
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-6 mr-4">
            <div className="flex flex-col items-end">
              <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">Synchronization</span>
              <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Active</span>
            </div>
          </div>
          
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-3 px-8 py-4 glass-card bg-[#0f172a] hover:bg-[#1e293b] text-white rounded-[1.5rem] text-sm font-black transition-all active:scale-95 border border-white/5 shadow-2xl disabled:opacity-50"
          >
            {isSaving ? <Loader2 className="h-4 w-4 animate-spin text-primary" /> : <Save className="h-4 w-4 text-primary" />}
            {isSaving ? "SYNCING..." : "SAVE DESIGN"}
          </button>
          
          <button 
            onClick={handleDownload}
            disabled={isDownloading}
            className="flex items-center gap-3 px-8 py-4 bg-primary hover:bg-indigo-400 text-white rounded-[1.5rem] text-sm font-black transition-all active:scale-95 shadow-lg shadow-primary/20 disabled:opacity-50"
          >
            {isDownloading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
            EXPORT PDF
          </button>
        </div>
      </header>

      {/* Main Studio Workspace */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Left Side: Modular Editor */}
        <div className="w-full lg:w-[480px] flex flex-col border-r border-white/5 bg-[#080c1d] relative z-30">
          <div className="p-8 border-b border-white/5 bg-[#020617]/30">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-sm font-black text-white uppercase tracking-[0.25em]">Content Studio</h2>
              <div className="bg-primary/10 px-3 py-1 rounded-full border border-primary/20 flex items-center gap-2">
                <Sparkles className="h-3 w-3 text-primary" />
                <span className="text-[9px] font-black text-primary uppercase tracking-widest">AI Enhanced</span>
              </div>
            </div>

            {/* AI Generation Module */}
            <div className="glass-card bg-primary/5 border-primary/10 p-6 space-y-5 group hover:border-primary/30 transition-all duration-500 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-[80px] -mr-16 -mt-16 group-hover:bg-primary/30 transition-colors" />
              <div className="flex items-center gap-4 relative z-10 text-left">
                <div className="bg-primary text-white p-2.5 rounded-xl shadow-lg shadow-primary/20">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xs font-black text-white uppercase tracking-wider">AI Narrative Engine</h3>
                  <p className="text-[10px] text-slate-400 font-bold tracking-tight">Generate professional impact statements.</p>
                </div>
              </div>
              <button 
                onClick={handleGenerateAI}
                disabled={isGenerating}
                className="w-full py-4 bg-white text-slate-900 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-slate-200 transition-all active:scale-95 shadow-xl shadow-white/5 relative z-10 disabled:opacity-50"
              >
                {isGenerating ? (
                  <div className="flex items-center justify-center gap-3 animate-pulse">
                    <Loader2 className="h-4 w-4 animate-spin text-primary" />
                    <span>Processing Matrix...</span>
                  </div>
                ) : "Execute AI Refinement"}
              </button>
            </div>
            
            {(successMsg || error) && (
              <div className="mt-6 flex items-center justify-center animate-in fade-in slide-in-from-top-2">
                {successMsg && (
                  <div className="flex items-center gap-2 text-emerald-400 text-[10px] font-black uppercase tracking-widest whitespace-nowrap">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    {successMsg}
                  </div>
                )}
                {error && (
                  <div className="flex items-center gap-2 text-red-500 text-[10px] font-black uppercase tracking-widest whitespace-nowrap">
                    <AlertCircle className="h-3.5 w-3.5" />
                    {error}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar p-8 space-y-12 bg-[#020617]/40">
            {/* Input Groups */}
            <Section title="Identity Details" icon={<User className="h-4 w-4 text-primary" />}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                <Input label="Professional Full Name" name="fullName" value={data.fullName} onChange={handleChange} placeholder="e.g. Alex Sterling" />
                <Input label="Strategic Contact (Email)" name="email" value={data.email} onChange={handleChange} placeholder="alex@industry.com" />
                <Input label="Direct Line" name="phone" value={data.phone} onChange={handleChange} placeholder="+1 555 000 0000" />
                <Input label="Base Location" name="location" value={data.location} onChange={handleChange} placeholder="San Francisco, CA" />
              </div>
            </Section>

            <Section title="Career Narrative" icon={<Briefcase className="h-4 w-4 text-emerald-400" />}>
              <textarea
                name="experience"
                value={data.experience}
                onChange={handleChange}
                placeholder="Detail your professional impact and core responsibilities..."
                className="w-full h-48 px-6 py-5 bg-white/5 border border-white/5 rounded-3xl text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-emerald-500/5 focus:bg-white/10 focus:border-emerald-500/20 transition-all placeholder:text-slate-600 resize-none whitespace-pre-wrap"
              />
            </Section>

            <Section title="Technical Arsenal" icon={<Wrench className="h-4 w-4 text-amber-400" />}>
              <textarea
                name="skills"
                value={data.skills}
                onChange={handleChange}
                placeholder="List your core competencies separated by commas..."
                className="w-full h-32 px-6 py-5 bg-white/5 border border-white/5 rounded-3xl text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-amber-500/5 focus:bg-white/10 focus:border-amber-500/20 transition-all placeholder:text-slate-600 resize-none"
              />
            </Section>

            <Section title="Academic Foundation" icon={<GraduationCap className="h-4 w-4 text-blue-400" />}>
              <div className="text-left">
                <Input label="Degree & Institution" name="education" value={data.education} onChange={handleChange} placeholder="e.g. B.S. Cognitive Science, Ivy Institute" />
              </div>
            </Section>
            
            <Section title="Strategic Projects" icon={<FileText className="h-4 w-4 text-pink-400" />}>
              <textarea
                name="projects"
                value={data.projects}
                onChange={handleChange}
                placeholder="Key projects and significant industrial outputs..."
                className="w-full h-32 px-6 py-5 bg-white/5 border border-white/5 rounded-3xl text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-pink-500/5 focus:bg-white/10 focus:border-pink-500/20 transition-all placeholder:text-slate-600 resize-none whitespace-pre-wrap"
              />
            </Section>
          </div>
        </div>

        {/* Right Side: High-Fidelity Preview */}
        <div className="flex-1 bg-[#020617] p-12 lg:p-20 overflow-y-auto custom-scrollbar relative">
          <div className="absolute inset-0 opacity-10 pointer-events-none" 
               style={{ backgroundImage: 'radial-gradient(#818cf8 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }} />
          
          <div className="max-w-[850px] mx-auto relative z-10 transition-transform duration-700">
            <div className="glass-card bg-white p-2 shadow-[0_40px_100px_rgba(0,0,0,0.4)] relative border-white/10 overflow-hidden">
               <ResumePreview data={data} />
            </div>
            
            {/* Layout Controls Overlay */}
            <div className="fixed bottom-12 right-12 z-50 flex items-center gap-3">
              <div className="glass-card bg-[#0f172a]/80 backdrop-blur-xl p-2 rounded-2xl border border-white/5 shadow-2xl flex items-center gap-2">
                {[1, 2, 3].map((t) => (
                  <button key={t} className={`h-10 w-10 rounded-xl text-[10px] font-black transition-all ${t === 1 ? 'bg-primary text-white' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}>
                    0{t}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-500">
      <div className="flex items-center gap-3">
        <div className="bg-white/5 p-2 rounded-lg border border-white/5">
          {icon}
        </div>
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest leading-none">{title}</h3>
      </div>
      <div className="relative group">
        {children}
      </div>
    </div>
  );
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

function Input({ label, ...props }: InputProps) {
  return (
    <div className="space-y-3">
      <label className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-500 ml-4">{label}</label>
      <input
        className="w-full px-5 py-4 bg-white/5 border border-white/5 rounded-2xl text-sm font-bold text-white focus:outline-none focus:ring-4 focus:ring-primary/5 focus:bg-white/10 focus:border-primary/20 transition-all placeholder:text-slate-700"
        {...props}
      />
    </div>
  );
}

export default function BuilderPage() {
  return (
    <Suspense fallback={
      <div className="flex flex-col items-center justify-center h-full gap-6 bg-[#020617]">
        <div className="relative">
          <Loader2 className="h-16 w-16 animate-spin text-primary" />
          <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-6 w-6 text-primary" />
        </div>
        <div className="text-center space-y-2">
          <span className="text-xl font-black text-white uppercase tracking-tight block">Studio<span className="text-primary">.ai</span></span>
          <span className="text-slate-500 text-xs font-bold animate-pulse uppercase tracking-[0.3em]">Calibrating Workspace...</span>
        </div>
      </div>
    }>
      <BuilderContent />
    </Suspense>
  );
}
