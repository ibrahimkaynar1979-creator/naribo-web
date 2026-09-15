# PanelTakip QR Menü Architecture

## Domain
Restaurant -> Branch -> Categories -> Products -> Options / Allergens

## Customer routes
Target architecture: `/menu/[slug]` with a shared mobile application shell.

Primary views:
- Home
- Menu / categories
- Product detail
- Branch information
- Reviews
- Contact

There is intentionally no cart, ordering, checkout, payment, table number or waiter-call workflow in v1.

## Shared UI
`components/qr-menu/ui.tsx` contains primitives. New QR menu screens should be built from these primitives instead of page-specific controls.

## Design tokens
`lib/qr-menu/tokens.ts` is the single source of truth for PanelTakip spacing, typography, radii and base colors. Restaurant theme data can override the accent without changing the application structure.

## Data
`lib/qr-menu/types.ts` defines the contract. `lib/qr-menu/salt.ts` is the current demo adapter. It can later be replaced by a database/API adapter without rewriting customer screens.

## Rules
- Restaurant brand is primary in customer-facing screens.
- PanelTakip appears subtly as platform attribution.
- Mobile-first reference width is 390px.
- Product content is informational in v1.
- QR URL stays stable; restaurant content changes behind the slug.
