# Accessibility (a11y) Guide

We build software for businesses, which means our software must be usable by everyone, regardless of their abilities. Accessibility is not an afterthought; it is a legal and ethical requirement.

## Core Standards (WCAG 2.1 AA)

1. **Semantic HTML**: Use proper HTML elements. `<button>` for actions, `<a>` for navigation, `<nav>`, `<main>`, `<header>`, etc. Do not use a `<div>` with an `onClick` handler unless it's impossible to use a button.
2. **Keyboard Navigation**: Everything must be fully usable with a keyboard.
   - Use `:focus-visible` in Tailwind to provide clear focus rings.
   - Ensure a logical tab order (generally matching the visual layout).
   - Ensure users cannot get trapped in a component (like a modal).
3. **ARIA Attributes**:
   - Only use ARIA when semantic HTML is insufficient. "No ARIA is better than bad ARIA."
   - `aria-label` or `aria-labelledby` must be present on icon-only buttons.
   - `aria-expanded`, `aria-hidden`, `aria-live` should be managed appropriately (shadcn usually handles this out of the box).
4. **Color Contrast**: Ensure a minimum contrast ratio of 4.5:1 for normal text and 3:1 for large text/UI components.
5. **Screen Readers**: Test complex interactive components with a screen reader (VoiceOver/NVDA).

## Tools
- Radix UI (underlying shadcn) provides excellent accessibility primitives. Trust them.
- Use `eslint-plugin-jsx-a11y` to catch basic errors during development.
