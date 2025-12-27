"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recallMemory = recallMemory;
const memoryStore_1 = require("../memory/memoryStore");
// Recall memory based on vendor + raw text
function recallMemory(vendor, rawText) {
    const recalled = [];
    // Vendor memory
    const vendorMemories = memoryStore_1.db
        .prepare(`SELECT * FROM vendor_memory WHERE vendor = ?`)
        .all(vendor);
    for (const mem of vendorMemories) {
        if (rawText.includes(mem.pattern) && mem.confidence >= 0.5) {
            recalled.push({
                id: mem.id,
                description: `Pattern "${mem.pattern}" means ${mem.meaning}`,
                confidence: mem.confidence
            });
        }
    }
    // Correction memory
    const correctionMemories = memoryStore_1.db
        .prepare(`SELECT * FROM correction_memory`)
        .all();
    for (const mem of correctionMemories) {
        if (rawText.includes(mem.condition) && mem.confidence >= 0.5) {
            recalled.push({
                id: mem.id,
                description: `Condition "${mem.condition}" → Action "${mem.action}"`,
                confidence: mem.confidence
            });
        }
    }
    return recalled;
}
