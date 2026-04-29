import { Router, type IRouter } from "express";
import { desc } from "drizzle-orm";
import { db, inquiriesTable } from "@workspace/db";
import { AdminLoginBody } from "@workspace/api-zod";
import {
  ADMIN_COOKIE,
  ADMIN_COOKIE_VALUE,
  adminCookieOptions,
  requireAdmin,
} from "../middlewares/requireAdmin";

const router: IRouter = Router();

router.post("/admin/login", async (req, res): Promise<void> => {
  const adminPassword = process.env["ADMIN_PASSWORD"];
  if (!adminPassword) {
    req.log.error("ADMIN_PASSWORD is not configured");
    res.status(500).json({ error: "Admin login is not configured." });
    return;
  }

  const parsed = AdminLoginBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(401).json({ error: "Invalid credentials." });
    return;
  }

  if (parsed.data.password !== adminPassword) {
    req.log.warn("Failed admin login attempt");
    res.status(401).json({ error: "Invalid credentials." });
    return;
  }

  res.cookie(ADMIN_COOKIE, ADMIN_COOKIE_VALUE, adminCookieOptions);
  res.status(200).json({ authenticated: true });
});

router.post("/admin/logout", (_req, res): void => {
  res.clearCookie(ADMIN_COOKIE, { path: adminCookieOptions.path });
  res.status(204).end();
});

router.get("/admin/me", (req, res): void => {
  const value = req.signedCookies[ADMIN_COOKIE];
  if (value === ADMIN_COOKIE_VALUE) {
    res.status(200).json({ authenticated: true });
    return;
  }
  res.status(401).json({ error: "Not authenticated." });
});

router.get(
  "/admin/inquiries",
  requireAdmin,
  async (_req, res): Promise<void> => {
    const rows = await db
      .select()
      .from(inquiriesTable)
      .orderBy(desc(inquiriesTable.createdAt));

    res.status(200).json({
      items: rows.map((row) => ({
        id: row.id,
        name: row.name,
        email: row.email,
        inquiryType: row.inquiryType,
        message: row.message,
        createdAt: row.createdAt.toISOString(),
      })),
    });
  },
);

export default router;
