import { Document } from "mongoose";

export function serializeResume(resume: Document | null) {
  if (!resume) return null;

  const obj = resume.toObject ? resume.toObject() : (resume as any);

  return {
    ...obj,
    _id: String(obj._id),
    userId: obj.userId ? String(obj.userId) : undefined,
  };
}
