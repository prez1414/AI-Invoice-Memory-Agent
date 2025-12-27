import { initializeMemoryTables } from "../memory/memoryStore";
import { recallMemory } from "../agent/recall";
import { applyMemoryAndDecide } from "../agent/applyAndDecide";
import { learnFromHumanCorrection } from "../agent/learn";
import {
  invoices,
  humanCorrections
} from "../data/dataLoader";

console.log("\n================ PDF DATA DEMO START ================\n");

initializeMemoryTables();

for (const invoice of invoices) {
  console.log(`--- Processing Invoice ${invoice.invoiceId} (${invoice.vendor}) ---`);

  // RECALL
  const recalled = recallMemory(invoice.vendor, invoice.rawText);

  // APPLY + DECIDE
  const decision = applyMemoryAndDecide(recalled);

  console.log(JSON.stringify(decision, null, 2));

  // LEARN (if human correction exists)
  const correction = humanCorrections.find(
    (c) => c.invoiceId === invoice.invoiceId
  );

  if (correction) {
    console.log("\n--- HUMAN CORRECTION APPLIED ---");

    learnFromHumanCorrection({
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
