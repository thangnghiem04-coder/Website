# Add GitHub repo link to "Portfolio development & deployment" card

## What
Add a link to the user's GitHub repository on the first card of the "Personal AI & tech projects" subsection, matching the existing "View sample pipeline work" link style on the second card.

- Repo URL: `https://github.com/thangnghiem04-coder/tnghiem-folio-axis`
- Link label: "View on GitHub"
- Opens in a new tab (`target="_blank" rel="noreferrer"`), opens with an arrow icon, accent color, same hover animation as the pipeline link.

## Changes (src/routes/index.tsx only)
1. Add `const repoUrl = "https://github.com/thangnghiem04-coder/tnghiem-folio-axis";` next to the existing `pipelineUrl` constant.
2. In the AI projects card grid, extend the existing conditional link so card 0 (`i === 0`) renders a "View on GitHub" link and card 1 (`i === 1`) keeps the "View sample pipeline work" link — both with identical styling (accent text, uppercase tracking, ArrowUpRight hover shift).

## Verification
- Build passes (`build-errors.log` shows no errors).
- Playwright check: both links visible on the first two cards, open in new tab, no console errors; quick mobile-width render check.
