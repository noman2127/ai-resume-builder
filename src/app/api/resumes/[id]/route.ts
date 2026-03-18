import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Resume from "@/models/Resume";
import { verifyToken } from "@/lib/auth";

// Helper to get userId from Authorization header
async function getAuthenticatedUserId(req: Request) {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) return null;
  const token = authHeader.split(" ")[1];
  const decoded = verifyToken(token);
  return decoded ? decoded.userId : null;
}

// GET /api/resumes/[id] — Fetch a single resume
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const userId = await getAuthenticatedUserId(req);
    if (!userId) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const { id } = await params;
    const resume = await Resume.findOne({ _id: id, userId });

    if (!resume) {
      return NextResponse.json(
        { success: false, error: "Resume not found or unauthorized" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: resume });
  } catch (error) {
    console.error("Error fetching resume:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch resume" },
      { status: 500 }
    );
  }
}

// PUT /api/resumes/[id] — Update a resume
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const userId = await getAuthenticatedUserId(req);
    if (!userId) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const { id } = await params;
    const body = await req.json();

    const resume = await Resume.findOneAndUpdate(
      { _id: id, userId },
      {
        fullName: body.fullName,
        email: body.email,
        phone: body.phone,
        location: body.location,
        summary: body.summary || "",
        skills: body.skills,
        workExperience: body.experience || body.workExperience,
        education: body.education,
        projects: body.projects,
      },
      { new: true, runValidators: true }
    );

    if (!resume) {
      return NextResponse.json(
        { success: false, error: "Resume not found or unauthorized" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Resume updated successfully",
      data: resume,
    });
  } catch (error) {
    console.error("Error updating resume:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update resume" },
      { status: 500 }
    );
  }
}

// DELETE /api/resumes/[id] — Delete a resume
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const userId = await getAuthenticatedUserId(req);
    if (!userId) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const { id } = await params;
    const resume = await Resume.findOneAndDelete({ _id: id, userId });

    if (!resume) {
      return NextResponse.json(
        { success: false, error: "Resume not found or unauthorized" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Resume deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting resume:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete resume" },
      { status: 500 }
    );
  }
}
