import { Router } from "express";
import { db, usersTable, internshipsTable, applicationsTable, reportsTable } from "@workspace/db";
import { eq, and } from "drizzle-orm";

const router = Router();

function daysLeft(deadline: string): number {
  const now = new Date();
  const d = new Date(deadline);
  return Math.floor((d.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

// GET /dashboard/student
router.get("/dashboard/student", async (_req, res): Promise<void> => {
  const studentId = 1; // demo
  const allApplications = await db.select().from(applicationsTable).where(eq(applicationsTable.studentId, studentId));
  const allReports = await db.select().from(reportsTable).where(eq(reportsTable.studentId, studentId));
  const [user] = await db.select().from(usersTable).where(eq(usersTable.id, studentId)).limit(1);

  const accepted = allApplications.find(a => a.status === "accepted");

  // Enrich applications with internship
  const enrichedApps = await Promise.all(allApplications.slice(0, 5).map(async (app) => {
    const [internship] = await db.select().from(internshipsTable).where(eq(internshipsTable.id, app.internshipId)).limit(1);
    return { ...app, studentName: user?.name ?? null, internship: internship ? { ...internship, daysLeft: daysLeft(internship.deadline) } : null };
  }));

  const pendingFeedback = allReports.filter(r => r.status === "pending").length;
  const notifications = [
    { id: 1, type: "feedback", message: "Faculty feedback ready on your Week 5 report.", time: "2h ago", read: false },
    { id: 2, type: "deadline", message: "Week 6 report deadline is in 3 days.", time: "1d ago", read: false },
    { id: 3, type: "application", message: "Your application status was updated.", time: "3d ago", read: true },
  ];

  const acceptedApp = allApplications.find(a => a.status === "accepted");
  const journeyStep = acceptedApp ? (allReports.length > 0 ? 2 : 1) : 0;

  res.json({
    activeInternship: accepted ? accepted.internshipId : null,
    reportsSubmitted: allReports.length,
    totalReports: 12,
    pendingFeedback,
    profileStrength: user?.profileStrength ?? 50,
    recentApplications: enrichedApps,
    recentReports: allReports.slice(-3).reverse().map(r => ({ ...r, studentName: user?.name ?? null })),
    notifications,
    journeyStep,
  });
});

// GET /dashboard/faculty
router.get("/dashboard/faculty", async (_req, res): Promise<void> => {
  const allReports = await db.select().from(reportsTable);
  const pendingReports = allReports.filter(r => r.status === "pending").length;
  const reviewedThisWeek = allReports.filter(r => r.status === "reviewed").length;
  const students = await db.select().from(usersTable).where(eq(usersTable.role, "student"));

  const enrichedReports = await Promise.all(allReports.slice(0, 10).map(async (r) => {
    const [student] = await db.select({ name: usersTable.name }).from(usersTable).where(eq(usersTable.id, r.studentId)).limit(1);
    return { ...r, studentName: student?.name ?? null };
  }));

  res.json({
    pendingReports,
    totalStudents: students.length,
    reviewedThisWeek,
    students: students.map(({ password: _pw, ...rest }) => rest),
    recentReports: enrichedReports,
  });
});

// GET /dashboard/company
router.get("/dashboard/company", async (_req, res): Promise<void> => {
  const internships = await db.select().from(internshipsTable);
  const applications = await db.select().from(applicationsTable);
  const activeListings = internships.filter(i => i.status === "open").length;
  const pendingReviews = applications.filter(a => a.status === "pending").length;

  const enrichedApps = await Promise.all(applications.slice(0, 5).map(async (app) => {
    const [student] = await db.select({ name: usersTable.name }).from(usersTable).where(eq(usersTable.id, app.studentId)).limit(1);
    const [internship] = await db.select().from(internshipsTable).where(eq(internshipsTable.id, app.internshipId)).limit(1);
    return { ...app, studentName: student?.name ?? null, internship: internship ? { ...internship, daysLeft: daysLeft(internship.deadline) } : null };
  }));

  res.json({
    activeListings,
    totalApplicants: applications.length,
    pendingReviews,
    internships: internships.map(i => ({ ...i, daysLeft: daysLeft(i.deadline) })),
    recentApplications: enrichedApps,
  });
});

// GET /dashboard/admin
router.get("/dashboard/admin", async (_req, res): Promise<void> => {
  const users = await db.select().from(usersTable);
  const internships = await db.select().from(internshipsTable);
  const applications = await db.select().from(applicationsTable);
  const reports = await db.select().from(reportsTable);

  const usersByRole: Record<string, number> = {};
  users.forEach(u => { usersByRole[u.role] = (usersByRole[u.role] ?? 0) + 1; });

  res.json({
    totalUsers: users.length,
    totalInternships: internships.length,
    totalApplications: applications.length,
    totalReports: reports.length,
    usersByRole,
    recentUsers: users.slice(-5).map(({ password: _pw, ...rest }) => rest),
    recentInternships: internships.slice(-5).map(i => ({ ...i, daysLeft: daysLeft(i.deadline) })),
  });
});

export default router;
