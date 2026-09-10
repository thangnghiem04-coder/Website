# Portfolio Visual and Interaction Update

## Goal
Refine the existing personal portfolio with clearer geographic status, interactive capability details, and a stronger visual transition into the contact area while preserving its quiet-luxury editorial character.

## Updates
- Restyle the world map so unvisited land remains muted, France, China, Denmark, Germany, UAE, and Qatar use a dedicated accent blue, and Finland uses a distinctive gold-yellow residence color.
- Add a compact legend and preserve country hover, focus, and selection feedback for clarity and accessibility.
- Rename the capabilities heading to exactly `CORE CAPABILITIES`.
- Rework all five capability items into expandable cards: hover and keyboard focus reveal details on desktop, while click/tap controls the same content on touch devices.
- Give each expanded card a concise explanation and a tailored inline vector visualization:
  - regression scatter plot and correlation matrix
  - IS-LM and AS-AD equilibrium curves
  - institutional timeline and governance matrix
  - tactical maneuver and operational-depth diagram
  - process-tracing flow and audit-risk matrix
- Add a wide, high-contrast illustrated banner above the contact content, using an abstract vintage financial-curve and architectural-grid composition that matches the existing portfolio palette.
- Preserve reduced-motion behavior and ensure expanded content does not overlap or shift surrounding text unpredictably.

## Technical Details
- Keep the work within the existing `/` portfolio route and global design tokens.
- Implement diagrams as lightweight accessible inline SVGs and the contact banner as a generated local image asset.
- Use semantic blue, gold, map-neutral, and banner tokens rather than hardcoded colors in page markup.
- Verify hover, focus, click/tap, desktop layout, and mobile layout in the live preview.
