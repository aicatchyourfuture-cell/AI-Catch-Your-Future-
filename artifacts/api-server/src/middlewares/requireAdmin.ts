import type { RequestHandler } from "express";

export const ADMIN_COOKIE = "cf_admin";
export const ADMIN_COOKIE_VALUE = "ok";

export const adminCookieOptions = {
  httpOnly: true,
  signed: true,
  sameSite: "lax" as const,
  secure: process.env["NODE_ENV"] === "production",
  path: "/",
  maxAge: 1000 * 60 * 60 * 24 * 7,
};

export const requireAdmin: RequestHandler = (req, res, next) => {
  const value = req.signedCookies[ADMIN_COOKIE];
  if (value !== ADMIN_COOKIE_VALUE) {
    res.status(401).json({ error: "Not authenticated." });
    return;
  }
  next();
};
