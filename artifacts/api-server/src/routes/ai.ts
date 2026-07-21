import { Router } from "express";

const router = Router();

// POST /ai/resume-review
router.post("/ai/resume-review", async (req, res): Promise<void> => {
  const { resumeText, targetRole } = req.body ?? {};
  if (!resumeText) { res.status(400).json({ error: "resumeText is required" }); return; }

  // Mock AI response — in production would call an LLM
  const wordCount = resumeText.split(/\s+/).length;
  const score = Math.min(95, Math.max(40, 60 + Math.floor(wordCount / 10)));
  res.json({
    score,
    feedback: `Your resume is ${wordCount < 100 ? "brief" : "well-detailed"} and covers key competencies. ${targetRole ? `For a ${targetRole} role, ` : ""}consider quantifying your achievements with metrics.`,
    suggestions: [
      "Add quantifiable metrics to your project descriptions (e.g., 'increased performance by 30%')",
      "Include a concise professional summary at the top",
      "Tailor your skills section to match the job description keywords",
      "Ensure consistent formatting throughout (font sizes, bullet styles)",
      "Add links to your portfolio, GitHub, or LinkedIn profile",
    ],
  });
});

// POST /ai/cover-letter
router.post("/ai/cover-letter", async (req, res): Promise<void> => {
  const { internshipId, studentBackground } = req.body ?? {};
  if (!internshipId || !studentBackground) {
    res.status(400).json({ error: "internshipId and studentBackground are required" });
    return;
  }
  res.json({
    result: `Dear Hiring Manager,

I am writing to express my strong interest in the internship opportunity at your organization. With a background in ${studentBackground}, I am confident in my ability to contribute meaningfully to your team.

During my academic journey, I have developed strong problem-solving skills and hands-on experience with relevant technologies. I am particularly excited about this role because it aligns with my passion for continuous learning and professional growth.

I would welcome the opportunity to discuss how my skills and enthusiasm can contribute to your team's success. Thank you for considering my application.

Sincerely,
[Your Name]`,
  });
});

// POST /ai/interview-questions
router.post("/ai/interview-questions", async (req, res): Promise<void> => {
  const { role, company } = req.body ?? {};
  if (!role || !company) {
    res.status(400).json({ error: "role and company are required" });
    return;
  }
  res.json({
    questions: [
      `Tell me about yourself and why you are interested in the ${role} position at ${company}.`,
      `What specific technical skills do you bring that make you a strong candidate for this ${role} role?`,
      `Describe a challenging project you worked on. What was your approach and what did you learn?`,
      `How do you stay updated with the latest trends and developments in your field?`,
      `Where do you see yourself professionally in the next 3–5 years?`,
      `How do you handle tight deadlines and multiple competing priorities?`,
      `Describe a situation where you had to collaborate with a difficult team member. How did you handle it?`,
      `What do you know about ${company} and why do you want to work here specifically?`,
    ],
  });
});

// POST /ai/report-generator
router.post("/ai/report-generator", async (req, res): Promise<void> => {
  const { notes, weekNumber } = req.body ?? {};
  if (!notes || !weekNumber) {
    res.status(400).json({ error: "notes and weekNumber are required" });
    return;
  }
  res.json({
    result: `Week ${weekNumber} Report

Summary of Activities:
${notes}

Key Accomplishments This Week:
- Completed assigned tasks on schedule with positive feedback from supervisor
- Applied theoretical knowledge from coursework to practical real-world problems
- Collaborated effectively with team members on ongoing projects
- Attended team meetings and contributed ideas to project discussions

Challenges Encountered:
- Navigated unfamiliar tools and technologies through self-directed learning
- Balanced internship responsibilities with academic commitments

Learning Outcomes:
This week reinforced the importance of communication and adaptability in a professional environment. I have strengthened my technical skills and gained valuable insight into industry workflows.

Plans for Next Week:
- Continue with current project milestones
- Seek feedback from supervisor on deliverables
- Explore additional learning resources related to current assignments`,
  });
});

// POST /ai/skill-gap
router.post("/ai/skill-gap", async (req, res): Promise<void> => {
  const { studentSkills, targetRole } = req.body ?? {};
  if (!studentSkills || !targetRole) {
    res.status(400).json({ error: "studentSkills and targetRole are required" });
    return;
  }
  const roleSkillMap: Record<string, string[]> = {
    "Frontend Engineer": ["React", "TypeScript", "CSS", "Accessibility", "Testing", "Performance Optimization"],
    "Data Analyst": ["Python", "SQL", "Pandas", "Data Visualization", "Statistics", "Excel"],
    "Backend Engineer": ["Node.js", "Databases", "REST APIs", "Docker", "Security", "Testing"],
    "Product Designer": ["Figma", "UX Research", "Prototyping", "Design Systems", "User Testing"],
    "default": ["Communication", "Problem Solving", "Teamwork", "Time Management", "Adaptability"],
  };

  const required = roleSkillMap[targetRole] ?? roleSkillMap["default"];
  const studentSkillsLower = (studentSkills as string[]).map((s: string) => s.toLowerCase());
  const missing = required.filter(s => !studentSkillsLower.includes(s.toLowerCase()));
  const matchPercent = Math.round(((required.length - missing.length) / required.length) * 100);

  res.json({
    missingSkills: missing,
    recommendations: missing.map(skill => `Complete a short online course or project focused on ${skill} to strengthen your profile.`),
    matchPercent,
  });
});

export default router;
