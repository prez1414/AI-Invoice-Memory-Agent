import Database from "better-sqlite3";
import path from "path";

// Create or open SQLite DB file
const dbPath = path.join(process.cwd(), "memory.db");
export const db = new Database(dbPath);

// Initialize memory tables
export function initializeMemoryTables() {
  db.prepare(`
    CREATE TABLE IF NOT EXISTS vendor_memory (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      vendor TEXT,
      pattern TEXT,
      meaning TEXT,
      confidence REAL,
      usage_count INTEGER DEFAULT 0
    )
  `).run();

  db.prepare(`
    CREATE TABLE IF NOT EXISTS correction_memory (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      condition TEXT,
      action TEXT,
      confidence REAL,
      usage_count INTEGER DEFAULT 0
    )
  `).run();

  db.prepare(`
    CREATE TABLE IF NOT EXISTS resolution_memory (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      invoice_id TEXT,
      resolution TEXT,
      timestamp TEXT
    )
  `).run();
}
