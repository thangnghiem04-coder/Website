# Multilingual Portfolio Header

## Goal
Add a simple language dropdown to the fixed header and make the full portfolio available in English, Spanish, French, and Chinese. Arabic will not be included.

## What to build
- Add a compact language selector beside the navigation on desktop and within the mobile header/menu.
- Show the four language options with the current language clearly selected.
- Translate all visible portfolio content, including navigation, headings, descriptions, experience details, project cards, tools, buttons, image descriptions, and contact text.
- Keep proper names, company names, product names, links, dates, qualifications, and technical terminology accurate.
- Change the page language metadata when the selection changes.
- Remember the selected language between visits without causing a loading mismatch.
- Preserve the current editorial styling, interactions, mobile layout, and reduced-motion behavior.

## Technical details
- Keep translations in a typed local dictionary so language switching is instant and does not depend on an external service.
- Default to English on first load, then restore a saved choice after the page loads.
- Use the existing button component and semantic design colors for the dropdown.
- Verify all four languages at desktop and mobile widths, including menu opening, long translated labels, accordions, links, and page overflow.
