                                                                                       AI Invoice Memory Agent
                                                                          Memory-Driven Learning Layer for Invoice Automation
                                         


                    Tech Stack

                    TypeScript (strict mode)

                    Node.js

                    SQLite (better-sqlite3)

                    
1. **Overview**

This project implements a memory-driven learning layer for invoice automation systems.
Instead of treating each invoice as a standalone document, the system retains past human corrections and vendor-specific patterns and applies them to future invoices to improve automation quality over time.
The assignment focuses on agent reasoning, memory, and learning behavior, not OCR or extraction accuracy. All invoice data is assumed to be pre-extracted.

2.**Problem Statement**

In real-world invoice processing, many issues recur across invoices, such as:
Vendor-specific terminology (e.g., alternative field labels)
VAT inclusion or exclusion patterns
Repeated quantity or pricing discrepancies
Payment terms such as Skonto
Traditional systems discard human corrections after review, resulting in repeated manual effort.
This project addresses that limitation by introducing a persistent memory layer that learns from previous corrections and reuses them safely.

3. **Solution Summary**

The system introduces a memory layer that performs four core actions:
Recall relevant past learnings for a given invoice
Apply those learnings cautiously based on confidence
Decide whether to auto-correct or escalate for human review
Learn from new human feedback and update memory

Key design principles:

Conservative automation (no risky auto-application)

Confidence-based reinforcement

Full explainability and auditability

Persistent learning using SQLite

No machine-learning model training (heuristics only)

4. **Architecture**
   
src/
├── agent/
│   ├── recall.ts           # Memory retrieval logic
│   ├── applyAndDecide.ts   # Decision and escalation logic
│   └── learn.ts            # Learning from human corrections
├── memory/
│   └── memoryStore.ts      # SQLite persistence layer
├── data/
│   └── dataLoader.ts       # Loads provided sample data
├── demo/
│   ├── runDemo.ts          # Basic demonstration
│   └── runPdfDataDemo.ts   # Full PDF data demo
└── index.ts


5. **Memory Types Implemented**
   
1. Vendor Memory
Stores vendor-specific patterns and recurring behaviors.
Example:
Supplier GmbH → "Leistungsdatum" corresponds to serviceDate

2. Correction Memory
Learns from repeated human corrections applied across invoices.
Example:
"MwSt. inkl." → Prices include VAT

3. Resolution Memory
Tracks how discrepancies were resolved:
Approved corrections increase confidence
Rejected corrections reduce confidence
This prevents incorrect learnings from dominating system behavior.

6. **Decision Logic** 

     For each invoice, the system executes the following pipeline:

A. Recall Memory
Matches vendor name and raw invoice text against stored memory.
Apply Memory
Proposes corrections only when confidence is sufficient.

B. Decide
Auto-accept if confidence crosses a safe threshold
Otherwise escalate for human review

C. Learn
Updates memory based on human approval or rejection.

D. Audit
Provides reasoning and confidence for every decision.
Low-confidence memory is never auto-applied.

7. **Output Format**
For each invoice, the system produces an explainable JSON output:

{
  "normalizedInvoice": {},
  "proposedCorrections": [],
  "requiresHumanReview": true,
  "reasoning": "Explanation of decision",
  "confidenceScore": 0.0,
  "auditTrail": []
}

8. **Sample Data Used** 

All sample data provided in the assignment PDF is used:

data/
├── invoices.json
├── human_corrections.json
├── purchase_orders.json
└── delivery_notes.json

Invoices are processed sequentially
Human corrections are applied where available
Purchase orders and delivery notes are loaded to support extensibility

9. **Demo: Learning Over Time** 
How to run the demo

npm run build
node dist/demo/runPdfDataDemo.js

Q. What the demo demonstrates

A. Initial run with no memory → human review required
B. Human correction applied → memory stored
C. Subsequent runs → memory recall
D. Confidence increases over time
E. Fewer flags and smarter suggestions
F. Learning persists across executions via SQLite
G. Running the demo multiple times clearly shows learning over time, which is the primary objective of this assignment.

10. **Persistence** 

SQLite database: memory.db
Memory persists across application restarts
Enables long-term learning without retraining

Tech Stack

TypeScript (strict mode)

Node.js

SQLite (better-sqlite3)

No external ML frameworks

11. **Conclusion** 

This project demonstrates a safe, explainable, and persistent memory-driven AI agent for invoice automation.
By retaining past human decisions and applying them cautiously, the system improves automation quality while preventing incorrect learning.
The implementation fulfills all requirements of the internship assessment and demonstrates learning over time using the provided sample data.
