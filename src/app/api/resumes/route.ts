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
  return decoded ? decoded.userId : null;
}

// GET /api/resumes — Fetch all resumes for the logged-in user
export async function GET(req: Request) {
  try {
    const userId = await getAuthenticatedUserId(req);
    if (!userId) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const resumes = await Resume.find({ userId }).sort({ updatedAt: -1 });
    const sanitized = resumes.map(serializeResume);
    return NextResponse.json({ success: true, data: sanitized });
  } catch (error) {
    console.error("Error fetching resumes:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch resumes" },
      { status: 500 }
    );
  }
}
