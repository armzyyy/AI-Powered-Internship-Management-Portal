import { Router } from "express";
import { db, applicationsTable, internshipsTable, usersTable } from "@workspace/db";
import { eq, and } from "drizzle-orm";

const router = Router();

function daysLeft(deadline: string): number {
  const now = new Date();
  const d = new Date(deadline);
  return Math.floor((d.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

// GET /applications
router.get("/applications", async (req, res): Promise<void> => {
  const { status, internshipId } = req.query as Record<string, string>;
  const conditions = [];
  if (status && status !== "all") conditions.push(eq(applicationsTable.status, status));
  if (internshipId) conditions.push(eq(applicationsTable.internshipId, parseInt(internshipId, 10)));

  const apps = conditions.length
    ? await db.select().from(applicationsTable).where(and(...conditions))
    : await db.select().from(applicationsTable);

  const enriched = await Promise.all(apps.map(async (app) => {
    const [internship] = await db.select().from(internshipsTable).where(eq(internshipsTable.id, app.internshipId)).limit(1);
    const [student] = await db.select({ name: usersTable.name }).from(usersTable).where(eq(usersTable.id, app.studentId)).limit(1);
    return {
      ...app,
      studentName: student?.name ?? null,
      internship: internship ? { ...internship, daysLeft: daysLeft(internship.deadline) } : null,
    };
  }));
  res.json(enriched);
});

// GET /applications/:id
router.get("/applications/:id", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(raw, 10);
  const [app] = await db.select().from(applicationsTable).where(eq(applicationsTable.id, id)).limit(1);
  if (!app) { res.status(404).json({ error: "Not found" }); return; }
  const [internship] = await db.select().from(internshipsTable).where(eq(internshipsTable.id, app.internshipId)).limit(1);
  const [student] = await db.select({ name: usersTable.name }).from(usersTable).where(eq(usersTable.id, app.studentId)).limit(1);
  res.json({
    ...app,
    studentName: student?.name ?? null,
    internship: internship ? { ...internship, daysLeft: daysLeft(internship.deadline) } : null,
  });
});

// PATCH /applications/:id
router.patch("/applications/:id", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(raw, 10);
  const { status } = req.body ?? {};
  const [updated] = await db.update(applicationsTable).set({ status }).where(eq(applicationsTable.id, id)).returning();
  if (!updated) { res.status(404).json({ error: "Not found" }); return; }
  res.json(updated);
});

export default router;
