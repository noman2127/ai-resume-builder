"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  FileText, 
  Search, 
  Plus, 
  Edit2, 
  Trash2, 
  Calendar,
  AlertCircle,
  Loader2
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface ResumeItem {
  _id: string;
  fullName: string;
  email: string;
  skills: string;
  createdAt: string;
  updatedAt: string;
}

export default function MyResumesPage() {
  const { token } = useAuth();
  const [resumes, setResumes] = useState<ResumeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchResumes = async () => {
    if (!token) return;
    try {
      setLoading(true);
      const res = await fetch("/api/resumes", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      const result = await res.json();
      if (result.success) {
        const data = result.data as Array<{ _id: unknown }>;
        setResumes(
          data.map((r) => ({
            ...r,
            _id: String(r._id),
          })) as ResumeItem[]
        );
      } else {
        setError(result.error || "Failed to load resumes");
      }
    } catch (err) {
      console.error("Failed to fetch resumes:", err);
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResumes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this resume? This action cannot be undone.")) return;
    
    setDeletingId(id);
    try {
      const res = await fetch(`/api/resumes/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });
      const result = await res.json();
      if (result.success) {
        setResumes(resumes.filter((r) => r._id !== id));
      } else {
        alert(result.error || "Delete failed");
      }
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const filteredResumes = resumes.filter(r => 
    (r.fullName || "Untitled").toLowerCase().includes(searchQuery.toLowerCase()) ||
    (r.email || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="h-96 flex flex-col items-center justify-center gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-primary opacity-50" />
        <p className="text-slate-400 font-bold text-sm tracking-widest uppercase">Fetching Collection...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-2">
          <h1 className="text-5xl font-black text-white tracking-tight">My Resumes</h1>
          <p className="text-slate-400 text-lg font-medium">Manage and refine your professional portfolio.</p>
        </div>
        <Link
          href="/dashboard/builder"
          className="bg-primary text-white px-8 py-4 rounded-[2rem] font-black shadow-2xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 group"
        >
          <Plus className="h-6 w-6" />
          New Masterpiece
        </Link>
      </div>

      {/* Search and Filters */}
      <div className="relative group max-w-2xl">
        <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-slate-500 group-focus-within:text-primary transition-colors" />
        </div>
        <input
          type="text"
          placeholder="Search by name or email..."
          className="block w-full pl-14 pr-6 py-5 bg-white/5 border border-white/5 rounded-[2rem] text-white placeholder:text-slate-500 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/20 transition-all font-bold shadow-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {error ? (
        <div className="bg-red-50 border border-red-100 text-red-600 px-8 py-6 rounded-3xl flex items-center gap-4">
          <AlertCircle className="h-6 w-6" />
          <p className="font-bold">{error}</p>
        </div>
      ) : filteredResumes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredResumes.map((resume) => (
            <div
              key={resume._id}
              className="group glass-card bg-[#0f172a]/40 p-8 transition-all duration-500 relative flex flex-col h-full hover:bg-[#0f172a]/60 hover:shadow-2xl hover:shadow-primary/5"
            >
              <div className="bg-white/5 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 border border-white/5">
                <FileText className="h-8 w-8 text-slate-500 group-hover:text-primary transition-colors" />
              </div>
              
              <div className="flex-1 space-y-2 mb-6 text-left">
                <h3 className="text-xl font-black text-white line-clamp-1 py-1">{resume.fullName || "Untitled Resume"}</h3>
                <p className="text-sm text-slate-500 font-bold truncate">{resume.email}</p>
              </div>

              {resume.skills && (
                <div className="mb-6 h-[40px] overflow-hidden">
                  <div className="flex flex-wrap gap-2">
                    {resume.skills.split(",").slice(0, 3).map((skill, i) => (
                      <span key={i} className="text-[9px] font-black uppercase tracking-wider bg-white/5 text-slate-400 px-2 py-1 rounded-lg border border-white/5">
                        {skill.trim()}
                      </span>
                    ))}
                    {resume.skills.split(",").length > 3 && (
                      <span className="text-[9px] font-black uppercase bg-white/10 text-slate-500 px-2 py-1 rounded-lg border border-white/5">
                        +{resume.skills.split(",").length - 3}
                      </span>
                    )}
                  </div>
                </div>
              )}

              <div className="flex items-center gap-2 mb-8 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                <Calendar className="h-3 w-3" />
                Updated {formatDate(resume.updatedAt)}
              </div>

              <div className="grid grid-cols-2 gap-3 pt-6 border-t border-white/5">
                <Link
                  href={`/dashboard/builder?id=${resume._id}`}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-white text-slate-900 rounded-2xl text-xs font-black hover:bg-slate-200 transition-colors active:scale-95 shadow-xl shadow-white/5"
                >
                  <Edit2 className="h-3.5 w-3.5" />
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(resume._id)}
                  disabled={deletingId === resume._id}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-white/5 border border-white/5 text-red-400 rounded-2xl text-xs font-black hover:bg-red-400/10 transition-colors active:scale-95 disabled:opacity-50"
                >
                  {deletingId === resume._id ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <Trash2 className="h-3.5 w-3.5" />
                  )}
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="glass-card bg-[#0f172a]/60 p-20 text-center">
          <div className="bg-white/5 w-24 h-24 rounded-[2rem] flex items-center justify-center mx-auto mb-10 border border-white/5">
            <FileText className="h-10 w-10 text-slate-700" />
          </div>
          <h2 className="text-3xl font-black text-white mb-6">No resumes found</h2>
          <p className="text-slate-500 font-medium text-lg leading-relaxed max-w-md mx-auto mb-12">
            {searchQuery 
              ? `We couldn&apos;t find anything matching "${searchQuery}".` 
              : "You haven&apos;t created any resumes yet. Let&apos;s build your first one now!"}
          </p>
          {!searchQuery && (
            <Link
              href="/dashboard/builder"
              className="inline-flex items-center justify-center rounded-[2rem] bg-slate-900 text-white px-10 py-5 text-lg font-black transition-all hover:bg-slate-800 hover:scale-105 active:scale-95 shadow-xl shadow-slate-900/20"
            >
              Start Building
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
