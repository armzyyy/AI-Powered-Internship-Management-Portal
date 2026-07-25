import { Router } from "express";
import { db, usersTable } from "@workspace/db";
import { eq, ilike, or } from "drizzle-orm";

const router = Router();

function safeUser(user: typeof usersTable.$inferSelect) {
  const { password: _pw, ...rest } = user;
  return rest;
}

// GET /users
router.get("/users", async (req, res): Promise<void> => {
  const { role, search } = req.query as Record<string, string>;
  let rows = await db.select().from(usersTable);
  if (role && role !== "all") {
    rows = rows.filter(u => u.role === role);
  }
  if (search) {
    const q = search.toLowerCase();
    rows = rows.filter(u => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q));
  }
  res.json(rows.map(safeUser));
});

// GET /users/:id
router.get("/users/:id", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(raw, 10);
  const [user] = await db.select().from(usersTable).where(eq(usersTable.id, id)).limit(1);
  if (!user) { res.status(404).json({ error: "Not found" }); return; }
  res.json(safeUser(user));
});

// PATCH /users/:id
router.patch("/users/:id", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(raw, 10);
  const { name, bio, phone, university, companyName, skills } = req.body ?? {};
  const updates: Record<string, unknown> = {};
  if (name !== undefined) updates.name = name;
  if (bio !== undefined) updates.bio = bio;
  if (phone !== undefined) updates.phone = phone;
  if (university !== undefined) updates.university = university;
  if (companyName !== undefined) updates.companyName = companyName;
  if (skills !== undefined) updates.skills = skills;
  const [updated] = await db.update(usersTable).set(updates).where(eq(usersTable.id, id)).returning();
  if (!updated) { res.status(404).json({ error: "Not found" }); return; }
  res.json(safeUser(updated));
});

// DELETE /users/:id
router.delete("/users/:id", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(raw, 10);
  await db.delete(usersTable).where(eq(usersTable.id, id));
  res.json({ message: "User deleted" });
});

// GET /profile (demo: returns user id=1)
router.get("/profile", async (_req, res): Promise<void> => {
  const [user] = await db.select().from(usersTable).where(eq(usersTable.id, 1)).limit(1);
  if (!user) { res.status(404).json({ error: "Not found" }); return; }
  res.json(safeUser(user));
});

// PATCH /profile
router.patch("/profile", async (req, res): Promise<void> => {
  const { name, bio, phone, university, companyName, skills } = req.body ?? {};
  const updates: Record<string, unknown> = {};
  if (name !== undefined) updates.name = name;
  if (bio !== undefined) updates.bio = bio;
  if (phone !== undefined) updates.phone = phone;
  if (university !== undefined) updates.university = university;
  if (companyName !== undefined) updates.companyName = companyName;
  if (skills !== undefined) updates.skills = skills;
  const [updated] = await db.update(usersTable).set(updates).where(eq(usersTable.id, 1)).returning();
  if (!updated) { res.status(404).json({ error: "Not found" }); return; }
  res.json(safeUser(updated));
});

export default router;
