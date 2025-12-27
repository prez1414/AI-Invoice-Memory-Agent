"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const memoryStore_1 = require("../memory/memoryStore");
const recall_1 = require("../agent/recall");
const applyAndDecide_1 = require("../agent/applyAndDecide");
const learn_1 = require("../agent/learn");
const dataLoader_1 = require("../data/dataLoader");
console.log("\n================ PDF DATA DEMO START ================\n");
(0, memoryStore_1.initializeMemoryTables)();
for (const invoice of dataLoader_1.invoices) {
    console.log(`--- Processing Invoice ${invoice.invoiceId} (${invoice.vendor}) ---`);
    // RECALL
    const recalled = (0, recall_1.recallMemory)(invoice.vendor, invoice.rawText);
    // APPLY + DECIDE
    const decision = (0, applyAndDecide_1.applyMemoryAndDecide)(recalled);
    console.log(JSON.stringify(decision, null, 2));
    // LEARN (if human correction exists)
    const correction = dataLoader_1.humanCorrections.find((c) => c.invoiceId === invoice.invoiceId);
    if (correction) {
        console.log("\n--- HUMAN CORRECTION APPLIED ---");
        (0, learn_1.learnFromHumanCorrection)({
            vendor: invoice.vendor,
            pattern: correction.pattern,
            meaning: correction.meaning,
            approved: correction.decision === "approved"
        });
        console.log("Memory updated.\n");
    }
    console.log("--------------------------------------------------\n");
}
console.log("================ PDF DATA DEMO END ================\n");
