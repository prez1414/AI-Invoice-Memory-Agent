                                                       AI Invoice Memory Agent
                                            Memory-Driven Learning Layer for Invoice Automation
                                         
     
**Tech Stack**
     TypeScript (strict mode)
     Node.js
     SQLite (better-sqlite3)



No external ML or AI libraries 
 1. **Overview**
This project implements a memory-driven learning layer for invoice automation systems.
Instead of treating every invoice as a new, isolated document, the system remembers past human corrections and vendor-specific patterns and reuses them to improve automation quality over time.
The focus of this assignment is not OCR or extraction accuracy.
All invoice data is assumed to be pre-extracted.
The goal is to design a system that learns, reasons, and improves safely.                                        


2. **Problem Statement**
Organizations process hundreds of invoices daily.
Many corrections repeat across invoices, such as:
Vendor-specific field labels
VAT handling differences
Recurring quantity or pricing mismatchesPayment terms like Skonto
Traditional systems discard these corrections after manual review.
As a result, the same mistakes repeat, increasing human workload.
This project solves that problem by introducing a persistent memory layer that learns from past corrections and applies them to future invoices.

3. **Architecture**

src/
├── agent/
│   ├── recall.ts           # Retrieves relevant memory
│   ├── applyAndDecide.ts   # Applies memory & makes decisions
│   └── learn.ts            # Learns from human corrections
├── memory/
│   └── memoryStore.ts      # SQLite persistence layer
├── data/
│   └── dataLoader.ts       # Loads sample PDF data
├── demo/
│   ├── runDemo.ts          # Basic demo
│   └── runPdfDataDemo.ts   # PDF sample data demo
└── index.ts

4. **Sample Data Used**
All sample data provided in the assignment PDF is used:

data/
├── invoices.json
├── human_corrections.json
├── purchase_orders.json
└── delivery_notes.json

Invoice data is processed sequentially
Human corrections are applied where available
Purchase orders and delivery notes are loaded to support extensibility

5. **Memory Types Implemented**
       a. Vendor Memory
                 Stores vendor-specific patterns and behaviors.
                 Example: Supplier GmbH → "Leistungsdatum" means serviceDate



     b. Correction Memory
                Learns from repeated human corrections across invoices.
                 Example:  "MwSt. inkl." → Prices include VAT
                    

    c.Resolution Memory
                Tracks how discrepancies were resolved:

                Approved corrections increase confidence

                Rejected corrections reduce confidence

                This prevents incorrect learnings from dominating the system.


6. **Decision Logic**
                  For each invoice, the system follows this pipeline:

a. Recall Memory
Match vendor name and raw invoice text against stored memory

b. Apply Memory
Suggest corrections only if confidence is sufficient

c. Decide
Auto-accept when confidence crosses a safe threshold
Otherwise escalate for human review

c. Learn
Update memory based on human approval or rejection

d. Audit
Provide reasoning and confidence for every decision
    
                     Low-confidence memory is never auto-applied.


7. **Output Format**

For each invoice, the system produces an explainable JSON output:

{
  "normalizedInvoice": { },
  "proposedCorrections": [],
  "requiresHumanReview": true,
  "reasoning": "Explanation of why memory was or was not applied",
  "confidenceScore": 0.0,
  "auditTrail": []
}

This ensures transparency and auditability.


8. **How to run the demo:** 
                              npm run build
                              node dist/demo/runPdfDataDemo.js 

What the demo demonstrates:

a. First invoice → no memory → human review required

b. Human correction applied → memory updated

c. Subsequent invoices → memory recalled

d. Confidence increases across runs

e. Fewer flags and smarter suggestions over time

f. Memory persists across executions via SQLite

g. Running the demo multiple times clearly shows learning over time, which is the core requirement of this assignment.


9. Conclusion

This project demonstrates a safe, explainable, and persistent learning agent for invoice automation.
By remembering past human decisions and applying them cautiously, the system improves automation rates while avoiding risky behavior.

The implementation fulfills all requirements of the assignment and demonstrates learning over time using the provided sample data.
                                                                
