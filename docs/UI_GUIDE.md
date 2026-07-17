# UI & Design System Guide

We are building a premium, modern B2B SaaS platform. Aesthetics, usability, and speed are critical.

## Core Stack
- **Styling**: Tailwind CSS
- **Component Library**: shadcn/ui
- **Icons**: Lucide React
- **Animations**: Framer Motion (use sparingly for micro-interactions)

## Design Aesthetics
- **Colors**: Do not use raw Tailwind colors like `red-500` in application code. Use semantic CSS variables defined in `globals.css` (e.g., `bg-primary`, `text-muted-foreground`).
- **Typography**: Use the Inter or Geist font family. Maintain clear hierarchy (`h1` through `p`).
- **Spacing**: Follow the 4-point grid system (e.g., `p-4`, `gap-8`). Do not use arbitrary values unless absolutely necessary.
- **Dark Mode**: All components must support light and dark mode out-of-the-box. Use Tailwind's `dark:` variant extensively or rely on semantic tokens.

## Micro-Interactions & Feel
- **Hover States**: Every interactive element MUST have a hover state.
- **Loading States**: Use Skeleton loaders (shadcn `Skeleton`) instead of spinners for full-page or section loads to reduce layout shift.
- **Transitions**: Apply smooth transitions to color and layout changes (e.g., `transition-colors duration-200`).

## Layouts
- **Responsiveness**: Mobile-first design. Always test down to 320px width.
- **Dashboards**: Dashboards should be fluid or constrained to a massive `max-w-7xl` container. Utilize sidebars and sticky headers.

## Adding shadcn Components
Do not reinvent the wheel. If a component exists in shadcn:
`npx shadcn-ui@latest add [component]`
Customize it inside `src/components/ui/` only if necessary. Do not pollute the core primitives with business logic.
