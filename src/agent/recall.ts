import { db } from "../memory/memoryStore";

interface VendorMemoryRow {
  id: number;
  vendor: string;
  pattern: string;
  meaning: string;
  confidence: number;
}

interface CorrectionMemoryRow {
  id: number;
  condition: string;
  action: string;
  confidence: number;
}

export interface RecalledMemory {
  id: number;
  description: string;
  confidence: number;
}

// Recall memory based on vendor + raw text
export function recallMemory(vendor: string, rawText: string): RecalledMemory[] {
  const recalled: RecalledMemory[] = [];

  // Vendor memory
  const vendorMemories = db
    .prepare(`SELECT * FROM vendor_memory WHERE vendor = ?`)
    .all(vendor) as VendorMemoryRow[];

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
  const correctionMemories = db
    .prepare(`SELECT * FROM correction_memory`)
    .all() as CorrectionMemoryRow[];

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
