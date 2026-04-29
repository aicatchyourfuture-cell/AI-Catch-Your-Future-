import { Router, type IRouter } from "express";
import { db, inquiriesTable } from "@workspace/db";
import { CreateInquiryBody } from "@workspace/api-zod";
import { sendInquiryNotification } from "../lib/mailer";

const router: IRouter = Router();

router.post("/inquiries", async (req, res): Promise<void> => {
  const parsed = CreateInquiryBody.safeParse(req.body);
  if (!parsed.success) {
    req.log.warn(
      { errors: parsed.error.message },
      "Invalid inquiry submission",
    );
    res.status(400).json({ error: "Please check the form and try again." });
    return;
  }

  const inquiryType = parsed.data.inquiryType as
    | "lookbook"
    | "trade"
    | "general";

  const [row] = await db
    .insert(inquiriesTable)
    .values(parsed.data)
    .returning();

  req.log.info(
    { id: row.id, inquiryType: row.inquiryType },
    "Inquiry recorded",
  );

  // Notify the atelier without blocking the response. Errors are logged so a
  // mail outage never makes the public form fail.
  void sendInquiryNotification({
    id: row.id,
    name: row.name,
    email: row.email,
    inquiryType,
    message: row.message,
    createdAt: row.createdAt,
  }).catch((err) => {
    req.log.error({ err, id: row.id }, "Failed to send inquiry notification");
  });

  res.status(201).json({
    id: row.id,
    name: row.name,
    email: row.email,
    inquiryType: row.inquiryType,
    message: row.message,
    createdAt: row.createdAt.toISOString(),
  });
});

export default router;
