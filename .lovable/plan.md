# Recommended Improvements for Job Applications and Networking

## Goal
Make the portfolio work harder for recruiters and new professional contacts: faster to skim, easier to contact, easier to share.

## Recommended additions

1. **A short "at a glance" strip under the opening headline**
   Four compact facts a recruiter reads in five seconds: degree and field, 190 ECTS in two years, tools (Stata, SPSS, Excel, SAP), and availability/location (Finland, open to roles). This is the single highest-impact change for hiring.

2. **A one-page CV as a direct download**
   A prominent "Download CV" button in the opening area and in Contact. Recruiters expect a file, not only a Drive folder. You would need to send me the PDF, or I can lay one out from the site content for you to review.

3. **A LinkedIn link everywhere it matters**
   Currently only Facebook is listed. For hiring and networking, LinkedIn belongs in the contact list and next to your name. Please send me your profile URL.

4. **Turn Greenmore into a real experience entry**
   Right now Greenmore reads as an introduction to your tools. Add a proper role block: your title, the dates, and three or four concrete things you did and what resulted. Recruiters look for this specific shape.

5. **A brief "What I'm looking for" line in Contact**
   One or two sentences naming the roles, the type of organisation, and your availability. It converts a passive visitor into an email.

6. **Trim the "under development" blog section**
   An empty section signals unfinished work to a recruiter. I would either shrink it to a single quiet line, or move it below Contact, until the first essay exists.

7. **Sharing preview**
   Add a proper preview image and description so the link looks professional when pasted into LinkedIn, email, or a message. This directly affects networking.

8. **Small polish pass**
   Consistent section spacing on mobile, keyboard focus on the expanding rows, and a check that every external link opens correctly.

## Suggested order
Start with 1, 4, 5, 6 and 8, since those need nothing from you. Then add 2, 3 and 7 once you send the CV file, LinkedIn URL, and confirm your role titles and dates at Greenmore.

## Technical Details
- All work stays in `src/routes/index.tsx` and `src/styles.css`, using existing semantic tokens.
- The sharing preview uses a generated hosted image referenced from the route's `head()` as `og:image` and `twitter:image`.
- The CV is stored as a static asset and linked with a download attribute.
- Verify on desktop and mobile widths, plus keyboard navigation of the expandable rows.
