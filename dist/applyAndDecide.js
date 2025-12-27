"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyMemoryAndDecide = applyMemoryAndDecide;
// Apply recalled memory and decide action
function applyMemoryAndDecide(recalledMemory) {
    const proposedCorrections = [];
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
