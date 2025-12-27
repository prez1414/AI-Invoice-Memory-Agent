import { db } from "../memory/memoryStore";

interface HumanCorrection {
  vendor: string;
  pattern: string;
  meaning: string;
  approved: boolean;
}

// Learn from human correction
export function learnFromHumanCorrection(correction: HumanCorrection) {
  const existing = db
    .prepare(
      `SELECT * FROM vendor_memory WHERE vendor = ? AND pattern = ?`
    )
    .get(correction.vendor, correction.pattern) as
    | { id: number; confidence: number; usage_count: number }
    | undefined;

  if (existing) {
    const newConfidence = correction.approved
      ? Math.min(existing.confidence + 0.1, 1.0)
      : Math.max(existing.confidence - 0.2, 0.0);

    db.prepare(
      `UPDATE vendor_memory
       SET confidence = ?, usage_count = usage_count + 1
       WHERE id = ?`
    ).run(newConfidence, existing.id);
  } else if (correction.approved) {
    db.prepare(
      `INSERT INTO vendor_memory (vendor, pattern, meaning, confidence, usage_count)
       VALUES (?, ?, ?, ?, 1)`
    ).run(
      correction.vendor,
      correction.pattern,
      correction.meaning,
      0.6
    );
  }

  db.prepare(
    `INSERT INTO resolution_memory (invoice_id, resolution, timestamp)
     VALUES (?, ?, ?)`
  ).run(
    correction.vendor,
    correction.approved ? "approved" : "rejected",
    new Date().toISOString()
  );
}
