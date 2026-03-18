import { ResumeData } from "@/types/resume";

export const generateAIContent = async (
  currentData: ResumeData
): Promise<Partial<ResumeData>> => {
  try {
    const response = await fetch("/api/generate-resume", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        skills: currentData.skills,
        experience: currentData.experience,
        education: currentData.education,
        projects: currentData.projects,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to generate AI content");
    }

    return await response.json();
  } catch (error) {
    console.error("AI Generation Error:", error);
    throw error;
  }
};
