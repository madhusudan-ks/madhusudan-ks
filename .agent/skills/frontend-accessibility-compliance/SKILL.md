---
name: frontend-accessibility-compliance
description: >-
  Enforces WCAG 2.2 AA accessibility when writing or changing React TypeScript
  UI — semantics, keyboard operability, focus management, live regions, contrast,
  reduced motion, and forms. Prefer native HTML and existing project components;
  produce an ARC Toolkit / axe DevTools verification checklist for manual
  sign-off. Use whenever creating or modifying UI under src/, or when the user
  mentions accessibility, a11y, WCAG, screen readers, keyboard navigation,
  ARC Toolkit, or axe DevTools.
---

# Frontend Accessibility Compliance

## When this applies
Any change under `src/` that renders UI — components, pages, layouts, modals,
forms, and styles that affect color, focus, or motion.
Pure logic, types, and config with no UI are out of scope.

**Standard:** WCAG 2.2 Level AA.

Assume a typical React + TypeScript app (e.g. Vite). Discover real paths and
components in THIS repo; do not invent product-specific primitives.

## Reuse before building
Before adding new a11y helpers, search the repo for existing:
- Skip link / skip-to-content
- Live region / status announcer (`aria-live`)
- Modal/dialog with focus trap
- Contrast or theme helpers
- Shared Button/Input/Form components

Prefer native HTML and existing shared UI. If a design system is present, use
its components and their built-in semantics — do not re-wrap with redundant ARIA.

## Authoring rules

**Semantics first.** Use native elements (`button`, `a`, `input`, `label`, `nav`,
`main`, `h1`–`h6`). Use ARIA only when no native element fits. A `div`/`span`
with `onClick` as a control is a defect.

**Keyboard.** Every interactive control must be reachable and operable by
keyboard alone. Follow WAI-ARIA Authoring Practices for composite widgets
(roving tabindex, arrow keys within, Tab between). Never use `tabIndex` > 0.
`Escape` closes dialogs and popovers.

**Focus.** Visible focus on every focusable element — never remove outline
without a replacement. Move focus into a dialog on open and back to the trigger
on close. Do not trap focus except in an open modal.

**Names.** Every control needs an accessible name. Prefer visible label text;
use `aria-label` / `aria-labelledby` only when needed (e.g. icon-only buttons).

**Forms.** Associate labels with `htmlFor`/`id`. Link errors with
`aria-describedby` and mark invalid fields `aria-invalid`. Errors must be text
(not color alone) and announced appropriately.

**Status and async.** Use `aria-live="polite"` for status updates; `assertive`
only for urgent errors. Do not announce on every keystroke.

**Color.** Contrast: 4.5:1 normal text, 3:1 large text and UI boundaries.
Never convey meaning by color alone — pair with text, icon, or shape.
Respect `prefers-contrast` / high-contrast themes if the app has them.

**Motion.** Honor `prefers-reduced-motion: reduce`. No content flashing more
than three times per second.

**Images.** Meaningful images need `alt`; decorative images use `alt=""`.
Inline SVGs: `role="img"` + `<title>`, or `aria-hidden="true"` if decorative.

**Zoom and target size.** Layout must work at 200% zoom and ~320px width.
Interactive targets should be at least 24×24 CSS pixels (WCAG 2.2 Target Size).

**Routing / SPAs.** On client-side navigation, manage focus (e.g. move to main
heading or landmark) so screen-reader users know the view changed.

## Tests
Match whatever the project already uses (commonly Vitest or Jest + Testing Library):

- Query by role and accessible name (`getByRole('button', { name: /submit/i })`)
- A test that only uses `getByTestId` does not prove accessibility
- Assert behavior: focus placement, Escape closes, keyboard within widgets, live region updates
- Place tests next to components or under a dedicated `src/**/__tests__` / `*.test.tsx` pattern already used in the repo

Do not add `axe-core`, `jest-axe`, or `eslint-plugin-jsx-a11y` unless the user asks.
Manual browser scanning is covered below.

## Manual verification — ARC Toolkit and axe DevTools
These browser extensions cannot be run by the agent. After a UI change, give the
user a checklist; do not claim the change was verified.

Start the app (`npm run dev` or the project’s equivalent) and open the affected view.

**axe DevTools** — page scan; aim for zero violations on the changed view; review “Needs Review”.  
**ARC Toolkit** — heading order, landmarks, tab order, computed accessible names.  
**Keyboard walkthrough** — finds defects automation misses.

### Checklist template
Provide this checklist in your final response whenever modifying UI:

```markdown
### Accessibility Verification Checklist (WCAG 2.2 AA)

- [ ] **axe DevTools Scan**
  - Run automated scan in browser DevTools.
  - 0 automatic violations.
  - Review and confirm items under "Needs Review".

- [ ] **ARC Toolkit Audit**
  - Landmark hierarchy is valid (`header`, `nav`, `main`, `footer`).
  - Headings are sequential (`h1` -> `h2` -> `h3`, no skipped levels).
  - Every interactive control has a clear computed accessible name.

- [ ] **Keyboard Walkthrough**
  - All interactive elements are reachable with `Tab` / `Shift+Tab`.
  - Visible focus indicators remain distinct on all focused elements.
  - Dialogs trap focus inside; `Escape` closes modal; focus returns to the triggering button.
  - Menus/tabs/radios support arrow key navigation.

- [ ] **Color & Contrast**
  - Text contrast is >= 4.5:1 (normal text) or >= 3:1 (large text >= 18pt / 14pt bold).
  - Essential UI boundaries and active states meet >= 3:1 contrast.
  - Information is not communicated solely by color.

- [ ] **Live Regions & Error Feedback**
  - Asynchronous status updates use `aria-live="polite"`.
  - Form field errors linked via `aria-describedby` with `aria-invalid="true"`.

- [ ] **Responsive & Motion**
  - Verified layout zoom at 200% on ~320px screen width without clipping.
  - Touch/pointer target sizes meet minimum 24×24 CSS pixels.
  - Animations respect `@media (prefers-reduced-motion: reduce)`.
```
