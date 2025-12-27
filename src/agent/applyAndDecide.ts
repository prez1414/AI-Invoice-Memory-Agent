import type { RecalledMemory } from "./recall";


interface DecisionResult {
  normalizedInvoice: Record<string, unknown>;
  proposedCorrections: string[];
  requiresHumanReview: boolean;
  reasoning: string;
  confidenceScore: number;
}

// Apply recalled memory and decide action
export function applyMemoryAndDecide(
  recalledMemory: RecalledMemory[]
): DecisionResult {
  const proposedCorrections: string[] = [];
  let confidenceScore = 0;

  for (const mem of recalledMemory) {
    proposedCorrections.push(mem.description);
    confidenceScore += mem.confidence;
  }

  // Normalize confidence
  if (recalledMemory.length > 0) {
    confidenceScore = confidenceScore / recalledMemory.length;
  }

  const requiresHumanReview = confidenceScore < 0.75;

  const reasoning = requiresHumanReview
    ? "Memory was found, but confidence is not high enough to auto-apply corrections."
    : "High-confidence memory patterns matched previous approved corrections.";

  return {
    normalizedInvoice: {},
    proposedCorrections,
    requiresHumanReview,
    reasoning,
    confidenceScore
  };
}
