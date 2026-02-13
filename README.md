# Great Yellow Technical Challenge

## Unit Allocation Kata

### Context

Great Yellow operates a nature finance platform that manages ecosystem service units from land restoration projects. Think of it like inventory management, but for environmental credits.

**The basics:**
- Land is enrolled in environmental schemes (like biodiversity restoration)
- Each enrolment generates **units** that can be sold to buyers
- Units go through a lifecycle: `forecasted -> issued -> allocated`
- **Available units** = `issued - allocated`

---

## Getting Started

The quickest way to get going is with GitHub Codespaces — click the green **Code** button on the repo and select **Open with Codespaces**. This gives you a ready-to-go environment in your browser, no local setup needed.

Alternatively, clone and run locally:
```bash
git clone <repo-url>
cd great-yellow-technical-challenge
npm run start
```

For auto-rerun on save while you work, use watch mode:
```bash
npm run dev
```

**Requirements for local setup:** Node.js 24+ which has built-in TypeScript support. If you're on an older version of Node, you can use `npx tsx challenge.ts` instead.

---

## The Data

You'll be working with two datasets (already loaded in `challenge.ts`, also available as CSVs in `data/`):

### `inventory.csv`
```csv
inventoryId,scheme,forecasted,issued,allocated
INV-001,BNG,100,100,60
INV-002,BNG,50,50,50
INV-003,BNG,75,75,30
INV-004,WCC,500,400,150
INV-005,WCC,200,0,0
```

| Field | Description |
|-------|-------------|
| `inventoryId` | Unique identifier for the unit inventory |
| `scheme` | The environmental scheme (`BNG` = Biodiversity Net Gain, `WCC` = Woodland Carbon Code) |
| `forecasted` | Total units expected from this land |
| `issued` | Units officially created and available for sale |
| `allocated` | Units already committed to buyers |

### `allocation_requests.csv`
```csv
requestId,inventoryId,quantity,buyerName
REQ-001,INV-001,30,Acme Developments
REQ-002,INV-002,10,Beta Builders
REQ-003,INV-003,50,Gamma Construction
REQ-004,INV-004,300,Delta Energy
REQ-005,INV-001,20,Echo Properties
REQ-006,INV-999,25,Unknown Corp
```

| Field | Description |
|-------|-------------|
| `requestId` | Unique identifier for the allocation request |
| `inventoryId` | Which inventory the buyer wants units from |
| `quantity` | Number of units requested |
| `buyerName` | Name of the purchasing organisation |

---

## Level 1: Code Review (Warm-up)

Open `challenge.ts`. Everything you need is in this one file — types, sample data, and an existing implementation that validates allocation requests against inventory.

**A request is valid if:**
1. The inventory exists
2. The requested quantity <= available units (where `available = issued - allocated`)

We'd like you to:
1. **Walk us through the code** — explain what it's doing and how it works
2. **Identify any improvements** — what would you change and why?

Don't write any code for this level, just talk us through it.

---

## Level 2: Refactor

Refactor the existing `validateRequests` function — apply any improvements you'd make. The behaviour should stay the same (validate each request independently), just cleaner code. Run `node challenge.ts` before and after to verify the output hasn't changed.

---

## Level 3: Batch Processing

Adapt your refactored solution so that requests are processed **in order** — if an earlier request is valid and consumes units, that reduces availability for subsequent requests.

Using the sample data, if processed in order:
- REQ-001 requests 30 from INV-001 (available: 40) -> valid, 10 remaining
- REQ-005 requests 20 from INV-001 (available: 10) -> now invalid!

**Expected output:**
```json
[
  { "requestId": "REQ-001", "valid": true },
  { "requestId": "REQ-002", "valid": false, "reason": "Insufficient units: requested 10, available 0" },
  { "requestId": "REQ-003", "valid": false, "reason": "Insufficient units: requested 50, available 45" },
  { "requestId": "REQ-004", "valid": false, "reason": "Insufficient units: requested 300, available 250" },
  { "requestId": "REQ-005", "valid": false, "reason": "Insufficient units: requested 20, available 10" },
  { "requestId": "REQ-006", "valid": false, "reason": "Inventory not found: INV-999" }
]
```

---

## Discussion Questions

These won't be coded, but we'll discuss your approach:

1. **Concurrency**: What if two users submit requests for the same inventory simultaneously? How might you handle this?

2. **Undo/Cancel**: A confirmed allocation gets cancelled. How would you release those units back?

3. **Audit trail**: The business needs to know who allocated what, when. How would you track this?

---

## Guidelines

- **Language**: The challenge is in TypeScript, which we use day-to-day. Everything is set up for you in `challenge.ts`.
- **Time**: Aim for Levels 1-3. We'll discuss broader questions with any remaining time.
- **Questions**: Please ask! Clarifying requirements is a skill we value.
- **Trade-offs**: If you make assumptions or take shortcuts, tell us why.

---

## What We're Looking For

| Aspect | What we want to see |
|--------|---------------------|
| **Problem decomposition** | Breaking the problem into clear steps |
| **Communication** | Explaining your thinking as you go |
| **Edge case awareness** | Spotting issues before they bite |
| **Code clarity** | Readable > clever |
| **Trade-off reasoning** | "I chose X because Y, accepting Z" |

We're **not** assessing:
- Memorised algorithms
- Framework knowledge
- Speed of typing
- Perfect syntax

---

*Good luck! Remember: we'd rather see clear thinking on Levels 1-2 than rushed code on Level 3.*
