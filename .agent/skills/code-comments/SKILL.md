---
name: code-comments
description: >-
  Generates concise, meaningful code comments (1–3 lines) that explain intent,
  not implementation. Use when adding or updating comments in code, when the user
  asks for code comments, or when commenting non-obvious logic, business rules,
  edge cases, or workarounds in any language or framework.
---

# Generate Short, Effective Code Comments

## Purpose
Generate concise, meaningful code comments for any programming language, framework, or stack.

## Instructions
When adding or updating comments:

1. Keep comments short and effective
   - Min 1 line, max 3 lines; prefer 1 for simple non-obvious logic
   - Use 2–3 only when context is genuinely needed
   - Never comment obvious code

2. Focus on intent, not implementation
   - Explain WHY / non-obvious decisions
   - Do not restate what the code does
   - Mention business rules, constraints, edge cases, workarounds, side effects when relevant

3. Be technology-agnostic
   - Follow language/framework comment conventions
   - Prefer the project’s existing comment style when present

4. Analyze before commenting
   - Inspect surrounding code and context
   - Skip if self-explanatory
   - Avoid redundant, inaccurate, outdated, or speculative comments

5. Comment quality
   - Clear, professional, concise
   - No unnecessary jargon
   - Do not mention AI, agent, prompt, or code generation
   - No TODOs unless requested or already required by existing code

6. Placement
   - Place next to the code it explains
   - Preserve existing good comments; update/remove bad ones

7. Existing comments
   - Update when behavior changes
   - Remove contradictions and redundancy

8. Length decision
   - 1 line: simple non-obvious intent
   - 2 lines: brief needed context
   - 3 lines: complex rule / edge case / workaround / constraint
   - 0 lines: code already clear

## Output Requirements
- Prefer the shortest accurate comment (1–3 lines max)
- Do not comment every method/variable/block by default

## Examples
Avoid: `// Check if user is active` above `if (user.isActive())`  
Prefer: `// Prevent inactive users from starting a new session.`

Complex:
```typescript
// Fallback to cached permissions during brief offline bursts.
// Tokens are revalidated on reconnect; prevents sudden navigation drop.
```

## Final Rule
Internally ask: does this comment add context not obvious from the code?
If no → no comment. If yes → shortest accurate comment, 1–3 lines.
