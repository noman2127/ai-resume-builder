"use client";

import { ResumeData } from "@/types/resume";

interface ResumePreviewProps {
  data: ResumeData;
}

export default function ResumePreview({ data }: ResumePreviewProps) {
  // We use hex colors here specifically for PDF compatibility. 
  // html2canvas (used by html2pdf.js) doesn't support modern color functions like lab() or oklch() 
  // which Tailwind v4 can sometimes generate for its default color palette.
  return (
    <div 
      id="resume-preview-content" 
      style={{ backgroundColor: '#ffffff', color: '#0f172a' }}
      className="shrink-0 shadow-[0_20px_50px_rgba(0,0,0,0.1)] w-full max-w-[800px] min-h-[1050px] p-16 md:p-20 font-sans border border-[#f1f5f9] flex flex-col gap-10"
    >
      {/* Header section with modern professional layout */}
      <header className="border-b-4 border-[#0f172a] pb-10 flex flex-col gap-4">
        <h1 className="text-5xl font-black tracking-tight uppercase leading-none" style={{ color: '#0f172a' }}>
          {data.fullName || "NAME_REQUIRED"}
        </h1>
        <div className="flex flex-wrap items-center gap-x-8 gap-y-2 text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: '#64748b' }}>
          {data.email && <div className="flex items-center gap-2"><span>{data.email}</span></div>}
          {data.phone && <div className="flex items-center gap-2"><span style={{ color: '#cbd5e1' }}>•</span><span>{data.phone}</span></div>}
          {data.location && <div className="flex items-center gap-2"><span style={{ color: '#cbd5e1' }}>•</span><span>{data.location}</span></div>}
        </div>
      </header>

      {/* Main Content Layout */}
      <div className="flex flex-col gap-10">
        {/* Professional Summary/DNA */}
        {data.summary && (
          <section className="space-y-4">
            <h2 className="text-[12px] font-black uppercase tracking-[0.3em] flex items-center gap-4" style={{ color: '#94a3b8' }}>
              Professional DNA
              <div className="flex-1 h-px bg-[#f1f5f9]" />
            </h2>
            <p className="text-sm font-medium leading-[1.8] text-justify" style={{ color: '#334155' }}>
              {data.summary}
            </p>
          </section>
        )}

        {/* Career Narrative/Experience */}
        {data.experience && (
          <section className="space-y-6">
            <h2 className="text-[12px] font-black uppercase tracking-[0.3em] flex items-center gap-4" style={{ color: '#94a3b8' }}>
              Career Trajectory
              <div className="flex-1 h-px bg-[#f1f5f9]" />
            </h2>
            <div className="text-xs font-semibold leading-[2] whitespace-pre-line" style={{ color: '#1e293b' }}>
              {data.experience}
            </div>
          </section>
        )}

        {/* Technical Arsenal/Skills */}
        {data.skills && (
          <section className="space-y-4">
            <h2 className="text-[12px] font-black uppercase tracking-[0.3em] flex items-center gap-4" style={{ color: '#94a3b8' }}>
              Strategic Arsenal
              <div className="flex-1 h-px bg-[#f1f5f9]" />
            </h2>
            <div className="flex flex-wrap gap-2 pt-2">
              {data.skills.split(',').map((skill, index) => (
                <span 
                  key={index} 
                  style={{ backgroundColor: '#f8fafc', color: '#0f172a', borderColor: '#e2e8f0' }}
                  className="px-3 py-1.5 border rounded-lg text-[10px] font-black uppercase tracking-wider"
                >
                  {skill.trim()}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Academic Foundation/Education */}
        {data.education && (
          <section className="space-y-4">
            <h2 className="text-[12px] font-black uppercase tracking-[0.3em] flex items-center gap-4" style={{ color: '#94a3b8' }}>
              Academia & Honors
              <div className="flex-1 h-px bg-[#f1f5f9]" />
            </h2>
            <div className="text-xs font-semibold leading-relaxed whitespace-pre-line" style={{ color: '#1e293b' }}>
              {data.education}
            </div>
          </section>
        )}

        {/* Strategic Projects */}
        {data.projects && (
          <section className="space-y-4">
            <h2 className="text-[12px] font-black uppercase tracking-[0.3em] flex items-center gap-4" style={{ color: '#94a3b8' }}>
              Strategic Projects
              <div className="flex-1 h-px bg-[#f1f5f9]" />
            </h2>
            <div className="text-xs font-semibold leading-relaxed whitespace-pre-line" style={{ color: '#1e293b' }}>
              {data.projects}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
