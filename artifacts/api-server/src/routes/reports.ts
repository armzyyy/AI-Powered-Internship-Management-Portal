import { Router } from "express";
import { db, reportsTable, usersTable } from "@workspace/db";
import { eq, and } from "drizzle-orm";

const router = Router();

// GET /reports
router.get("/reports", async (req, res): Promise<void> => {
  const { status, studentId } = req.query as Record<string, string>;
  const conditions = [];
  if (status && status !== "all") conditions.push(eq(reportsTable.status, status));
  if (studentId) conditions.push(eq(reportsTable.studentId, parseInt(studentId, 10)));

  const rows = conditions.length
    ? await db.select().from(reportsTable).where(and(...conditions))
    : await db.select().from(reportsTable);

  const enriched = await Promise.all(rows.map(async (r) => {
    const [student] = await db.select({ name: usersTable.name }).from(usersTable).where(eq(usersTable.id, r.studentId)).limit(1);
    return { ...r, studentName: student?.name ?? null };
  }));
  res.json(enriched);
});

// POST /reports
router.post("/reports", async (req, res): Promise<void> => {
  const { weekNumber, title, content } = req.body ?? {};
  if (!weekNumber || !title || !content) {
    res.status(400).json({ error: "weekNumber, title, and content are required" });
    return;
  }
  // Demo: use studentId = 1
  const studentId = 1;
  const [row] = await db.insert(reportsTable).values({
    studentId,
    weekNumber: parseInt(weekNumber, 10),
    title,
    content,
    status: "pending",
  }).returning();
  res.status(201).json({ ...row, studentName: null });
});

// GET /reports/:id
router.get("/reports/:id", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(raw, 10);
  const [row] = await db.select().from(reportsTable).where(eq(reportsTable.id, id)).limit(1);
  if (!row) { res.status(404).json({ error: "Not found" }); return; }
  const [student] = await db.select({ name: usersTable.name }).from(usersTable).where(eq(usersTable.id, row.studentId)).limit(1);
  res.json({ ...row, studentName: student?.name ?? null });
});

// PATCH /reports/:id
router.patch("/reports/:id", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(raw, 10);
  const { content, feedback, status } = req.body ?? {};
  const updates: Record<string, unknown> = {};
  if (content !== undefined) updates.content = content;
  if (feedback !== undefined) { updates.feedback = feedback; updates.status = "reviewed"; }
  if (status !== undefined) updates.status = status;
  const [updated] = await db.update(reportsTable).set(updates).where(eq(reportsTable.id, id)).returning();
  if (!updated) { res.status(404).json({ error: "Not found" }); return; }
  const [student] = await db.select({ name: usersTable.name }).from(usersTable).where(eq(usersTable.id, updated.studentId)).limit(1);
  res.json({ ...updated, studentName: student?.name ?? null });
});

export default router;
