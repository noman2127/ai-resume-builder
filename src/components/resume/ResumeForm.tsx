"use client";

import { User, Code, Briefcase, GraduationCap, FileText, Sparkles, MapPin, Mail, Phone } from "lucide-react";
import { ResumeData } from "@/types/resume";

interface ResumeFormProps {
  data: ResumeData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export default function ResumeForm({ data, onChange }: ResumeFormProps) {
  return (
    <div className="w-full space-y-12 pb-10">
      {/* Personal Information */}
      <section className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-500">
        <div className="flex items-center gap-4">
          <div className="bg-primary/20 p-3 rounded-2xl text-primary border border-primary/10 shadow-lg shadow-primary/5">
            <User className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-black text-white tracking-tight uppercase">Identity Architecture</h2>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">Core Professional Metadata</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <InputGroup 
            label="Full Identity Name" 
            name="fullName" 
            value={data.fullName} 
            onChange={onChange} 
            placeholder="e.g. Alex Sterling" 
            icon={<User className="h-4 w-4" />}
          />
          <InputGroup 
            label="Electronic Mail" 
            name="email" 
            value={data.email} 
            onChange={onChange} 
            placeholder="alex@industry.com" 
            icon={<Mail className="h-4 w-4" />}
          />
          <InputGroup 
            label="Direct Line" 
            name="phone" 
            value={data.phone} 
            onChange={onChange} 
            placeholder="+1 (555) 000-0000" 
            icon={<Phone className="h-4 w-4" />}
          />
          <InputGroup 
            label="Base Location" 
            name="location" 
            value={data.location} 
            onChange={onChange} 
            placeholder="Metropolis, Global" 
            icon={<MapPin className="h-4 w-4" />}
          />
        </div>
      </section>

      {/* Professional Summary */}
      <section className="space-y-6 animate-in fade-in slide-in-from-left-6 duration-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-purple-500/20 p-3 rounded-2xl text-purple-400 border border-purple-500/10 shadow-lg shadow-purple-500/5">
              <Sparkles className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-black text-white tracking-tight uppercase">Professional DNA</h2>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">Strategic Narrative Summary</p>
            </div>
          </div>
          {data.summary && (
            <div className="bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest">Optimized</span>
            </div>
          )}
        </div>
        <textarea
          name="summary"
          value={data.summary}
          onChange={onChange}
          rows={4}
          className="w-full p-6 bg-white/5 border border-white/5 rounded-3xl text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-purple-500/5 focus:bg-white/10 focus:border-purple-500/20 transition-all placeholder:text-slate-600 resize-none"
          placeholder="Briefly describe your career impact and core value proposition..."
        />
      </section>

      {/* Detailed Sections */}
      <TextAreaSection 
        title="Technical Arsenal" 
        name="skills" 
        value={data.skills} 
        onChange={onChange} 
        icon={<Code className="h-6 w-6" />}
        accentColor="amber"
        placeholder="List your core competencies separated by commas..."
        rows={3}
      />

      <TextAreaSection 
        title="Professional Trajectory" 
        name="experience" 
        value={data.experience} 
        onChange={onChange} 
        icon={<Briefcase className="h-6 w-6" />}
        accentColor="emerald"
        placeholder="Detailed career history and key impact milestones..."
        rows={6}
      />

      <TextAreaSection 
        title="Academia & Honors" 
        name="education" 
        value={data.education} 
        onChange={onChange} 
        icon={<GraduationCap className="h-6 w-6" />}
        accentColor="blue"
        placeholder="Educational credentials and significant academic achievements..."
        rows={4}
      />

      <TextAreaSection 
        title="Strategic Projects" 
        name="projects" 
        value={data.projects} 
        onChange={onChange} 
        icon={<FileText className="h-6 w-6" />}
        accentColor="pink"
        placeholder="Key projects, open-source contributions, or industrial case studies..."
        rows={4}
      />
    </div>
  );
}

interface InputGroupProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  icon: React.ReactNode;
}

function InputGroup({ label, name, value, onChange, placeholder, icon }: InputGroupProps) {
  return (
    <div className="space-y-3">
      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-4">{label}</label>
      <div className="relative group">
        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors">
          {icon}
        </div>
        <input
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          className="w-full pl-14 pr-6 py-4 bg-white/5 border border-white/5 rounded-2xl text-sm font-bold text-white focus:outline-none focus:ring-4 focus:ring-primary/5 focus:bg-white/10 focus:border-primary/20 transition-all placeholder:text-slate-700"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}

interface TextAreaSectionProps {
  title: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  icon: React.ReactNode;
  placeholder: string;
  rows: number;
  accentColor: string;
}

function TextAreaSection({ title, name, value, onChange, icon, placeholder, rows, accentColor }: TextAreaSectionProps) {
  const colorMap: Record<string, string> = {
    amber: "text-amber-400 bg-amber-400/20 border-amber-400/10 shadow-amber-400/5 ring-amber-500/5 border-amber-500/20",
    emerald: "text-emerald-400 bg-emerald-400/20 border-emerald-400/10 shadow-emerald-400/5 ring-emerald-500/5 border-emerald-500/20",
    blue: "text-blue-400 bg-blue-400/20 border-blue-400/10 shadow-blue-400/5 ring-blue-500/5 border-blue-500/20",
    pink: "text-pink-400 bg-pink-400/20 border-pink-400/10 shadow-pink-400/5 ring-pink-500/5 border-pink-500/20"
  };

  const classes = colorMap[accentColor] || "";
  const [textClasses, bgClasses, borderClasses, shadowClasses, ringClasses, focusBorderClasses] = classes.split(" ");

  return (
    <section className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-500">
      <div className="flex items-center gap-4">
        <div className={`${bgClasses} ${textClasses} p-3 rounded-2xl border ${borderClasses} shadow-lg ${shadowClasses}`}>
          {icon}
        </div>
        <div>
          <h2 className="text-xl font-black text-white tracking-tight uppercase leading-none">{title}</h2>
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">Professional Component</p>
        </div>
      </div>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        rows={rows}
        className={`w-full p-6 bg-white/5 border border-white/5 rounded-2.5rem text-sm font-medium text-white focus:outline-none focus:ring-4 ${ringClasses} focus:bg-white/10 ${focusBorderClasses} transition-all placeholder:text-slate-700 resize-none whitespace-pre-wrap`}
        placeholder={placeholder}
      />
    </section>
  );
}
