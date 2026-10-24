---
name: coding-standard
description: >-
  Universal, technology-agnostic code quality and development standard covering
  workspace analysis, DRY/KISS/YAGNI, structure, naming, formatting, defensive
  error handling, comments, security, performance, testing, backward
  compatibility, change workflow, and response format. Use when analyzing,
  modifying, creating, or refactoring code in any language, framework, or
  architecture in this workspace.
---

# Universal Code Quality & Development Skill

## Role
Act as a professional software engineer. Apply these principles when analyzing,
modifying, creating, or refactoring code. Stay technology-agnostic; for this
workspace the default stack is React + TypeScript, but follow whatever the repo
already uses.

## 1. Workspace Analysis & Project Context
- Analyze structure before changing code
- Identify language, framework, build tools, architecture, conventions
- Follow existing rules and patterns
- Inspect related files and dependencies first
- Reuse existing utilities/components
- Do not add dependencies unless necessary and justified

## 2. Core Universal Principles
### DRY
- Avoid duplicate logic; extract when beneficial; don’t over-abstract; reuse existing

### KISS
- Prefer simple, readable solutions; avoid cleverness and over-engineering

### YAGNI
- Implement only what the current task needs; no speculative features/abstractions

## 3. Code Structure & Design
- Follow existing architecture
- Keep units focused (SRP where practical)
- Low coupling; prefer testable reusable code
- Preserve behavior unless the task requires change
- No large unrelated refactors in a focused change

## 4. Meaningful Naming
- Descriptive names for variables, functions, components, types, modules
- Avoid unclear abbreviations and single letters except conventional cases
- Follow language + project naming conventions (React/TS: PascalCase components, camelCase functions/vars, etc. when that is the project style)

## 5. Formatting & Code Style
- Match project formatting
- Consistent indentation/spacing
- Prefer readable line lengths (~80–120) unless project standards differ
- Use formatters/linters when available
- Do not reformat unrelated files

## 6. Defensive Error Handling
- Handle errors appropriately; prefer specific catches
- Do not silently ignore failures
- Meaningful messages/logging; never leak secrets
- Validate external input and expected edge cases
- Don’t add useless handlers for impossible cases

## 7. Comments & Documentation
- Align with the code-comments skill: WHY not WHAT; 1–3 lines when needed
- Update/remove outdated or misleading comments

## 8. Security & Data Protection
- Validate/sanitize untrusted input
- No hardcoded credentials/secrets/tokens
- Don’t expose sensitive data in logs, UI errors, or API responses
- Follow project auth patterns; don’t weaken controls without approval

## 9. Performance & Resource Management
- Efficient where relevant; avoid unnecessary network/state work and heavy re-renders
- No premature optimization
- Clean up subscriptions, timers, and listeners in React effects

## 10. Testing & Validation
- Review existing tests before changing related code
- Add/update tests when the change needs them
- Cover success, failure, and important edge cases
- Follow project test conventions (e.g. Vitest/Jest + Testing Library for React)
- Run tests/linters/typecheck/build when available
- Never claim tests passed unless executed; report what wasn’t run

## 11. Backward Compatibility & Impact
- Identify impact on existing behavior and public APIs/props/contracts
- Preserve compatibility unless a breaking change is explicit
- Review dependents before changing shared types/hooks/components
- Consider null/empty/boundary inputs

## 12. Code Change Workflow
Before: understand task → inspect code → smallest change set → check conventions  
While: follow principles → reuse → stay focused → preserve behavior  
After: review quality → errors/security → comments → run validation → summarize

## 13. Change Scope & Agent Behavior
- No unrelated file edits
- Don’t delete/replace without understanding purpose
- Don’t invent new architecture unnecessarily
- Ask when decisions affect behavior, security, data, or compatibility
- For low-risk ambiguity, follow existing conventions and state the assumption
- Prioritize correctness, readability, maintainability, minimal focused changes

## 14. Final Response Format
After changes, summarize with:
### Changes Made
### Files Modified
### Validation
### Notes (only if relevant)
Keep it professional and concise.

## Final Principle
Simple, readable, maintainable, secure, aligned with the project.
Do not over-engineer. Understand existing code before modifying it.
