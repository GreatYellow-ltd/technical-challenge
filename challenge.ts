// =============================================================================
// GREAT YELLOW — Unit Allocation Kata
// =============================================================================
//
// Context:
// Great Yellow manages ecosystem service units from land restoration projects.
// Units go through a lifecycle: forecasted -> issued -> allocated
// Available units = issued - allocated
//
// See README.md for full instructions.
// =============================================================================

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

interface Inventory {
  inventoryId: string;
  scheme: "BNG" | "WCC";
  forecasted: number;
  issued: number;
  allocated: number;
}

interface AllocationRequest {
  requestId: string;
  inventoryId: string;
  quantity: number;
  buyerName: string;
}

type ValidationResult = {
  requestId: string;
  valid: boolean;
  reason?: string;
};

// -----------------------------------------------------------------------------
// Sample Data
// -----------------------------------------------------------------------------

const inventory: Inventory[] = [
  { inventoryId: "INV-001", scheme: "BNG", forecasted: 100, issued: 100, allocated: 60 },
  { inventoryId: "INV-002", scheme: "BNG", forecasted: 50,  issued: 50,  allocated: 50 },
  { inventoryId: "INV-003", scheme: "BNG", forecasted: 75,  issued: 75,  allocated: 30 },
  { inventoryId: "INV-004", scheme: "WCC", forecasted: 500, issued: 400, allocated: 150 },
  { inventoryId: "INV-005", scheme: "WCC", forecasted: 200, issued: 0,   allocated: 0 },
];

const allocationRequests: AllocationRequest[] = [
  { requestId: "REQ-001", inventoryId: "INV-001", quantity: 30,  buyerName: "Acme Developments" },
  { requestId: "REQ-002", inventoryId: "INV-002", quantity: 10,  buyerName: "Beta Builders" },
  { requestId: "REQ-003", inventoryId: "INV-003", quantity: 50,  buyerName: "Gamma Construction" },
  { requestId: "REQ-004", inventoryId: "INV-004", quantity: 300, buyerName: "Delta Energy" },
  { requestId: "REQ-005", inventoryId: "INV-001", quantity: 20,  buyerName: "Echo Properties" },
  { requestId: "REQ-006", inventoryId: "INV-999", quantity: 25,  buyerName: "Unknown Corp" },
];

// -----------------------------------------------------------------------------
// Level 1 — Code Review: Walk us through this code. What would you improve?
// Level 2 — Refactor: Apply your improvements. Same behaviour, cleaner code.
// Level 3 — Batch Processing: Adapt so earlier allocations reduce availability
//           for subsequent requests.
// -----------------------------------------------------------------------------

function validateRequests(
  inventory: Inventory[],
  requests: AllocationRequest[]
): ValidationResult[] {
  const results: ValidationResult[] = [];

  for (let i = 0; i < requests.length; i++) {
    const request = requests[i];
    const inv = inventory.find(
      (item) => item.inventoryId === request.inventoryId
    );

    if (inv !== undefined) {
      const available = inv.issued - inv.allocated;

      if (request.quantity <= available) {
        results.push({
          requestId: request.requestId,
          valid: true,
        });
      } else {
        results.push({
          requestId: request.requestId,
          valid: false,
          reason: `Insufficient units: requested ${request.quantity}, available ${available}`,
        });
      }
    } else {
      results.push({
        requestId: request.requestId,
        valid: false,
        reason: `Inventory not found: ${request.inventoryId}`,
      });
    }
  }

  return results;
}

// -----------------------------------------------------------------------------
// Run
// -----------------------------------------------------------------------------

const results = validateRequests(inventory, allocationRequests);
console.log(JSON.stringify(results, null, 2));
