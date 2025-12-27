"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.learnFromHumanCorrection = learnFromHumanCorrection;
const memoryStore_1 = require("../memory/memoryStore");
// Learn from human correction
function learnFromHumanCorrection(correction) {
    const existing = memoryStore_1.db
        .prepare(`SELECT * FROM vendor_memory WHERE vendor = ? AND pattern = ?`)
        .get(correction.vendor, correction.pattern);
    if (existing) {
        const newConfidence = correction.approved
            ? Math.min(existing.confidence + 0.1, 1.0)
            : Math.max(existing.confidence - 0.2, 0.0);
        memoryStore_1.db.prepare(`UPDATE vendor_memory
       SET confidence = ?, usage_count = usage_count + 1
       WHERE id = ?`).run(newConfidence, existing.id);
    }
    else if (correction.approved) {
        memoryStore_1.db.prepare(`INSERT INTO vendor_memory (vendor, pattern, meaning, confidence, usage_count)
       VALUES (?, ?, ?, ?, 1)`).run(correction.vendor, correction.pattern, correction.meaning, 0.6);
    }
    memoryStore_1.db.prepare(`INSERT INTO resolution_memory (invoice_id, resolution, timestamp)
     VALUES (?, ?, ?)`).run(correction.vendor, correction.approved ? "approved" : "rejected", new Date().toISOString());
}
