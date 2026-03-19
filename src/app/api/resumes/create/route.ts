import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Resume from "@/models/Resume";
import { verifyToken } from "@/lib/auth";
import { serializeResume } from "@/lib/serializers";

// Helper to get userId from Authorization header
async function getAuthenticatedUserId(req: Request) {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) return null;
  const token = authHeader.split(" ")[1];
  const decoded = verifyToken(token);
  return decoded ? decoded.id : null;
}

// POST /api/resumes/create — Save a new resume in MongoDB
export async function POST(req: Request) {
  try {
    const userId = await getAuthenticatedUserId(req);
    if (!userId) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const body = await req.json();

    const resume = await Resume.create({
      userId,
      fullName: body.fullName,
      email: body.email,
      phone: body.phone,
      location: body.location,
      summary: body.summary || "",
      skills: body.skills,
      workExperience: body.experience || body.workExperience,
      education: body.education,
      projects: body.projects,
    });

    return NextResponse.json(
      { success: true, message: "Resume saved successfully", data: serializeResume(resume) },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating resume:", error);
    return NextResponse.json(
      { success: false, error: "Failed to save resume" },
      { status: 500 }
    );
  }
}
