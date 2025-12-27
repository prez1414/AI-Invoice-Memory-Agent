"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
exports.initializeMemoryTables = initializeMemoryTables;
const better_sqlite3_1 = __importDefault(require("better-sqlite3"));
const path_1 = __importDefault(require("path"));
// Create or open SQLite DB file
const dbPath = path_1.default.join(process.cwd(), "memory.db");
exports.db = new better_sqlite3_1.default(dbPath);
// Initialize memory tables
function initializeMemoryTables() {
    exports.db.prepare(`
    CREATE TABLE IF NOT EXISTS vendor_memory (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      vendor TEXT,
      pattern TEXT,
      meaning TEXT,
      confidence REAL,
      usage_count INTEGER DEFAULT 0
    )
  `).run();
    exports.db.prepare(`
    CREATE TABLE IF NOT EXISTS correction_memory (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      condition TEXT,
      action TEXT,
      confidence REAL,
      usage_count INTEGER DEFAULT 0
    )
  `).run();
    exports.db.prepare(`
    CREATE TABLE IF NOT EXISTS resolution_memory (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      invoice_id TEXT,
      resolution TEXT,
      timestamp TEXT
    )
  `).run();
}
