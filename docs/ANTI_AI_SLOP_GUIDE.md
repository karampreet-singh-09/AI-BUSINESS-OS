# Human-First Development & Anti-AI Slop Guide

While this repository leverages AI Agents to accelerate development, the codebase itself MUST remain **Human-First**. The ultimate consumers and maintainers of this code are human engineers. 

We strictly forbid "AI Slop"—the phenomenon where an AI generates massive, repetitive, overly complex, or unreadable blocks of code just to brute-force a feature to work.

If a new human engineer cannot clone this repository, read the code, and understand exactly how a feature works *without* relying on AI, we have failed our architectural duties.

## 1. The "Anti-Slop" Directives

### Absolutely No Duplicate Code (DRY)
AI models have a tendency to copy-paste entire files or components rather than abstracting them. 
- **Rule:** If you find yourself (or an AI) writing the same logic or UI structure twice, **STOP**. Extract it into a shared utility function, a custom React Hook, or a shared UI component.
- **Example:** Do not create `ContactTable.tsx` and `OrganizationTable.tsx` if 90% of the logic is identical. Create a shared `<DataTable />` component and pass configuration props to it.

### Keep Files Small and Focused
Massive, 1000-line files are a classic sign of AI slop. 
- **Rule:** A single file should rarely exceed 200-300 lines. 
- Break large components down into smaller, composable sub-components. 
- Separate data fetching, business logic, and UI rendering.

### Avoid "Magic" and Over-Engineering
AI sometimes generates overly clever, highly abstracted code using obscure language features.
- **Rule:** Write boring, predictable code. 
- Avoid unnecessary metaprogramming, complex reduce functions, or deeply nested ternaries.
- If a junior or mid-level human engineer has to stare at a block of code for 10 minutes to understand it, it is too complex. Rewrite it to be explicit.

## 2. Readability First

### Self-Documenting Code
- Use highly descriptive variable and function names.
- **Bad:** `const d = fetchD(id);`
- **Good:** `const organizationDetails = fetchOrganizationDetailsById(orgId);`

### Meaningful Comments
Do not write comments that explain *what* the code is doing (the code itself should explain that). Write comments that explain *why* the code is doing it.
- **Bad:** `// maps over the users array`
- **Good:** `// We map over users here to filter out inactive accounts before passing to Stripe, preventing failed billing webhooks.`

### Clear Control Flow
- Return early. Do not nest `if/else` blocks infinitely.
- **Bad:**
  ```typescript
  if (user) {
    if (org) {
      if (hasPermission) {
        doAction();
      }
    }
  }
  ```
- **Good:**
  ```typescript
  if (!user) return { error: "Unauthorized" };
  if (!org) return { error: "No organization found" };
  if (!hasPermission) return { error: "Insufficient permissions" };
  doAction();
  ```

## 3. Human Handoff Test
Before merging any Pull Request (whether written by a human or an AI Agent), ask yourself:
> *"If our AI tooling went completely offline tomorrow, could a new human engineer pick up this feature and debug it easily?"*

If the answer is no, the PR must be refactored before merging.
