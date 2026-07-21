import { Router } from "express";
import { db, internshipsTable, applicationsTable, usersTable } from "@workspace/db";
import { eq, ilike, or, desc, asc, and } from "drizzle-orm";

const router = Router();

function daysLeft(deadline: string): number {
  const now = new Date();
  const d = new Date(deadline);
  return Math.floor((d.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

// GET /internships
router.get("/internships", async (req, res): Promise<void> => {
  const { search, location, sort, status } = req.query as Record<string, string>;

  let query = db.select().from(internshipsTable);
  const conditions = [];

  if (search) {
    conditions.push(
      or(
        ilike(internshipsTable.role, `%${search}%`),
        ilike(internshipsTable.company, `%${search}%`),
      )!
    );
  }
  if (location && location !== "all") {
    const typeMap: Record<string, string> = {
      remote: "Remote",
      hybrid: "Hybrid",
      "on-site": "On-site",
    };
    const mapped = typeMap[location.toLowerCase()];
    if (mapped) conditions.push(eq(internshipsTable.type, mapped));
  }
  if (status && status !== "all") {
    conditions.push(eq(internshipsTable.status, status));
  }

  // @ts-ignore - drizzle where chaining
  const baseQuery = conditions.length ? query.where(and(...conditions)) : query;
  // @ts-ignore
  const orderedQuery = sort === "deadline"
    ? baseQuery.orderBy(asc(internshipsTable.deadline))
    : baseQuery.orderBy(desc(internshipsTable.createdAt));

  const rows = await orderedQuery;
  const results = rows.map(r => ({ ...r, daysLeft: daysLeft(r.deadline) }));
  res.json({ results, count: results.length });
});

// POST /internships
router.post("/internships", async (req, res): Promise<void> => {
  const body = req.body ?? {};
  const [row] = await db.insert(internshipsTable).values({
    role: body.role,
    company: body.company,
    location: body.location,
    type: body.type,
    duration: body.duration,
    stipend: body.stipend,
    deadline: body.deadline,
    openings: body.openings ?? 1,
    description: body.description,
    tags: body.tags ?? [],
    status: "open",
  }).returning();
  res.status(201).json({ ...row, daysLeft: daysLeft(row.deadline) });
});

// GET /internships/:id
router.get("/internships/:id", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(raw, 10);
  const [row] = await db.select().from(internshipsTable).where(eq(internshipsTable.id, id)).limit(1);
  if (!row) { res.status(404).json({ error: "Not found" }); return; }
  res.json({ ...row, daysLeft: daysLeft(row.deadline) });
});

// PATCH /internships/:id
router.patch("/internships/:id", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(raw, 10);
  const body = req.body ?? {};
  const [row] = await db.update(internshipsTable).set(body).where(eq(internshipsTable.id, id)).returning();
  if (!row) { res.status(404).json({ error: "Not found" }); return; }
  res.json({ ...row, daysLeft: daysLeft(row.deadline) });
});

// DELETE /internships/:id
router.delete("/internships/:id", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(raw, 10);
  await db.delete(internshipsTable).where(eq(internshipsTable.id, id));
  res.json({ message: "Internship deleted" });
});

// POST /internships/:id/apply
router.post("/internships/:id/apply", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(raw, 10);
  const { coverLetter, resumeUrl } = req.body ?? {};
  // In a real app we'd get studentId from auth token; use 1 as demo
  const studentId = 1;
  const [app] = await db.insert(applicationsTable).values({
    internshipId: id,
    studentId,
    status: "pending",
    coverLetter: coverLetter ?? null,
    resumeUrl: resumeUrl ?? null,
  }).returning();
  const [internship] = await db.select().from(internshipsTable).where(eq(internshipsTable.id, id)).limit(1);
  res.status(201).json({ ...app, internship: internship ? { ...internship, daysLeft: daysLeft(internship.deadline) } : null });
});

export default router;
