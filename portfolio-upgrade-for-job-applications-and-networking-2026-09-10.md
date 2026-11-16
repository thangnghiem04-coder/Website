# Portfolio Upgrade for Job Applications and Networking

## Goal
Make the site work as a hiring document: fast to skim, credible on experience, easy to contact and share. No LinkedIn is used.

## What to build

1. **"At a glance" strip under the opening headline**
   Four facts from the CV a recruiter reads in five seconds: Business Administration graduate (Aalto / Tampere), 190 ECTS in two years, core tools (Advanced Excel, Stata, SPSS, SAP S/4HANA, MS Dynamics 365), and status — based in Tampere, Finnish Continuous Residence Permit (A) with full work rights, open to hybrid, remote or on-site roles across Finland.

2. **Download CV button**
   The uploaded one-page CV made downloadable, with a clear button in the opening area and again in Contact.

3. **Real experience section, replacing the current Greenmore intro-only treatment**
   Two role entries in a clean editorial layout, keeping the existing Greenmore story paragraph and Hanoi map as supporting context, followed by the existing tool rows:

   - **Junior Management — Business & Financial Data Analyst**, Greenmore Architecture, Vietnam (Hybrid), 2023 – Present
     Financial and operational reporting: reconciling cross-departmental transactions into monthly budget-vs-actual variance reports for executive leadership.
     Document and contract analysis: reviewing project documents and records to extract the figures and terms that inform decisions.
     Finance tracking and modelling: maintaining structured spreadsheets for ongoing financial analysis, plus automated Power Query workflows and dashboards that cut manual compilation time by 40%.
     Project research and negotiation support: researching project information and supporting the negotiation process.
     Data auditing and compliance: routine audits of project accounting entries and client records across remote and local operations.

   - **Quantitative Business Researcher & Data Analyst**, Capital Infrastructure & Corporate Governance Project, Finland, 2024 – 2025
     Econometric modelling and longitudinal analysis in Stata and SPSS to evaluate project execution efficiency and cost allocation.
     Executive reporting: turning quantitative findings into structured summaries and visual charts for multi-stakeholder reviews.

4. **Languages line**
   English (fluent/professional), Finnish (B1), Vietnamese (native) — placed with the status details.

5. **"What I'm looking for" in Contact**
   Two sentences naming the target roles (business/financial analysis, financial controlling, data analytics), openness to hybrid, remote or on-site work in Finland, and availability. Facebook stays as the only social link; no LinkedIn.

6. **Quieter blog section**
   The "currently under development" blog block reduced to a short restrained note so an empty section doesn't dominate. The excavator animation is kept but scaled down.

7. **Sharing preview**
   A generated preview image plus sharpened title and description so the link looks professional when pasted into email or a message.

8. **Polish pass**
   Mobile spacing consistency, visible keyboard focus on the expanding rows, and a check that every external link and the CV download work.

## Technical Details
- Work stays in `src/routes/index.tsx` and `src/styles.css`, using existing semantic tokens; no hardcoded colors.
- The CV PDF and the preview image are stored through the project asset system and referenced by their generated URLs; the CV link carries a download attribute.
- `og:image` and `twitter:image` are added to the route's own `head()` using the absolute hosted preview image URL.
- The new experience entries live inside the existing Skills & Experience section, above the tool rows; section numbering stays as is.
- Verify at desktop and mobile widths, including keyboard navigation of the expandable rows.
