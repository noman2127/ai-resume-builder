import mongoose, { Schema, Document, Model } from "mongoose";

export interface IResume extends Document {
  userId: mongoose.Types.ObjectId;
  fullName: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  skills: string;
  workExperience: string;
  education: string;
  projects: string;
  createdAt: Date;
  updatedAt: Date;
}

const ResumeSchema = new Schema<IResume>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, default: "" },
    location: { type: String, default: "" },
    summary: { type: String, default: "" },
    skills: { type: String, default: "" },
    workExperience: { type: String, default: "" },
    education: { type: String, default: "" },
    projects: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

// Prevent model recompilation in dev mode
const Resume: Model<IResume> =
  mongoose.models.Resume || mongoose.model<IResume>("Resume", ResumeSchema);

export default Resume;
