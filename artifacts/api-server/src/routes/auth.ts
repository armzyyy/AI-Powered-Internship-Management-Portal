import { Router } from "express";
import { db, usersTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router = Router();

// POST /auth/login
router.post("/auth/login", async (req, res): Promise<void> => {
  const { email, password } = req.body ?? {};
  if (!email || !password) {
    res.status(400).json({ error: "Email and password are required" });
    return;
  }
  const [user] = await db.select().from(usersTable).where(eq(usersTable.email, email)).limit(1);
  if (!user || user.password !== password) {
    res.status(401).json({ error: "Invalid email or password" });
    return;
  }
  const { password: _pw, ...safeUser } = user;
  res.json({ user: safeUser, token: `mock-token-${user.id}` });
});

// POST /auth/register
router.post("/auth/register", async (req, res): Promise<void> => {
  const { name, email, password, role, university, companyName } = req.body ?? {};
  if (!name || !email || !password || !role) {
    res.status(400).json({ error: "Name, email, password, and role are required" });
    return;
  }
  const existing = await db.select().from(usersTable).where(eq(usersTable.email, email)).limit(1);
  if (existing.length > 0) {
    res.status(400).json({ error: "Email already registered" });
    return;
  }
  const [user] = await db.insert(usersTable).values({
    name,
    email,
    password,
    role,
    university: university ?? null,
    companyName: companyName ?? null,
    skills: [],
    profileStrength: 40,
  }).returning();
  const { password: _pw, ...safeUser } = user;
  res.status(201).json({ user: safeUser, token: `mock-token-${user.id}` });
});

// POST /auth/logout
router.post("/auth/logout", async (_req, res): Promise<void> => {
  res.json({ message: "Logged out successfully" });
});

export default router;
