import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowDownRight, ArrowUpRight, BookOpen, ChevronDown, Facebook, Mail, Menu, Phone, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/timothy-portfolio-hero.jpg";
import contactBanner from "@/assets/contact-financial-banner.jpg";
import travelMapAsset from "@/assets/timothy-travel-map.png.asset.json";
import aaltoLogoAsset from "@/assets/aalto-university-logo.png.asset.json";
import tampereLogoAsset from "@/assets/tampere-university-logo.png.asset.json";

const workUrl = "https://drive.google.com/drive/folders/1YH5NBk6iQbgFOnCuQ5Le84UC7RR0V1jy?usp=drive_link";
const transcriptUrl = "https://drive.google.com/file/d/1vUTw9c2nO8ngR5mvj21gUYWJh39UAZvu/view?usp=drive_link";
const thesisUrl = "https://drive.google.com/file/d/1zg4gA3IqadKLh6plM5GcGYvfG8oN8_J_/view?usp=sharing";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Timothy Nghiem — Finance, Governance & Economics" },
    { name: "description", content: "Portfolio of Timothy (Thang) Nghiem — economics, finance, strategic governance, and quantitative analysis." },
    { property: "og:title", content: "Timothy Nghiem — Finance, Governance & Economics" },
    { property: "og:description", content: "Academic rigor and analytical work across capital, policy, and governance." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Index,
});

const nav = [["About", "about"], ["Academic", "academic"], ["Capabilities", "capabilities"], ["Selected Work", "work"], ["Perspective", "perspective"], ["Contact", "contact"]];

const capabilities = [
  ["01", "Quantitative Statistics & Econometrics", "Correlation matrix analysis, data scrubbing & filtering, multivariate regression modeling, and panel data analysis using Stata & SPSS."],
  ["02", "Applied Macro & Microeconomics", "Aggregate Demand/Supply, IS-LM frameworks, central bank reaction functions, monetary transmission, and financial accounting principles."],
  ["03", "Political Theory & Historical Systems", "Structural analysis of geopolitical developments and world history from 1800–Present, institutional economics, and political philosophies."],
  ["04", "Strategic & Military Doctrine", "Abstracted strategic planning, deep operations theory, structural maneuver frameworks, and risk distribution under high uncertainty."],
  ["05", "Research & Analytical Auditing", "Qualitative process-tracing, empirical data auditing, compliance mapping, and large-scale project risk assessment."],
];

function CapabilityIcon({ index }: { index: number }) {
  if (index === 0) return <svg viewBox="0 0 56 56" aria-hidden="true"><path d="M8 45V12M8 45h40M14 37l8-11 8 5 12-17" fill="none" stroke="currentColor" strokeWidth="1.5"/><circle cx="22" cy="26" r="2"/><circle cx="30" cy="31" r="2"/></svg>;
  if (index === 1) return <svg viewBox="0 0 56 56" aria-hidden="true"><path d="M8 43c11-1 17-8 21-19s9-15 19-16M8 12c11 0 17 7 21 18s9 14 19 14" fill="none" stroke="currentColor" strokeWidth="1.5"/><circle cx="29" cy="27" r="3"/></svg>;
  if (index === 2) return <svg viewBox="0 0 56 56" aria-hidden="true"><circle cx="28" cy="28" r="19" fill="none" stroke="currentColor" strokeWidth="1.5"/><path d="M9 28h38M28 9c7 7 7 31 0 38M28 9c-7 7-7 31 0 38" fill="none" stroke="currentColor" strokeWidth="1.5"/></svg>;
  if (index === 3) return <svg viewBox="0 0 56 56" aria-hidden="true"><path d="M28 7l17 7v12c0 11-7 18-17 23-10-5-17-12-17-23V14zM18 29h20M28 19v20" fill="none" stroke="currentColor" strokeWidth="1.5"/></svg>;
  return <svg viewBox="0 0 56 56" aria-hidden="true"><path d="M11 8h25l8 8v20M36 8v9h8M17 20h13M17 27h11" fill="none" stroke="currentColor" strokeWidth="1.5"/><circle cx="34" cy="36" r="9" fill="none" stroke="currentColor" strokeWidth="1.5"/><path d="M41 43l7 7" stroke="currentColor" strokeWidth="1.5"/></svg>;
}

function AnalyticalGraphic({ index }: { index: number }) {
  const shared = "fill-none stroke-current [stroke-linecap:round] [stroke-linejoin:round]";
  if (index === 0) return <svg viewBox="0 0 260 120" aria-label="Regression scatter plot and correlation matrix"><g className={`${shared} text-primary/35`} strokeWidth="1"><path d="M14 12v82h112M146 12v82h100"/><path d="M151 20h84M151 42h84M151 64h84M151 86h84M159 14v78M181 14v78M203 14v78M225 14v78"/></g><path d="M22 82L116 25" className={`${shared} text-map-visited`} strokeWidth="2"/><g className="fill-accent"><circle cx="29" cy="79" r="3"/><circle cx="43" cy="68" r="3"/><circle cx="58" cy="70" r="3"/><circle cx="72" cy="49" r="3"/><circle cx="88" cy="45" r="3"/><circle cx="106" cy="31" r="3"/></g><g className="fill-map-visited"><rect x="160" y="21" width="18" height="18"/><rect x="182" y="43" width="18" height="18" opacity=".7"/><rect x="204" y="65" width="18" height="18" opacity=".45"/><rect x="226" y="21" width="8" height="18" opacity=".25"/></g></svg>;
  if (index === 1) return <svg viewBox="0 0 260 120" aria-label="IS-LM and aggregate supply-demand equilibrium"><g className={`${shared} text-primary/35`} strokeWidth="1"><path d="M14 10v88h108M142 10v88h104"/></g><path d="M24 23c37 12 60 37 90 68M24 91c35-8 60-31 91-70" className={`${shared} text-map-visited`} strokeWidth="2"/><path d="M151 88c32-10 55-36 86-68M151 22c29 15 53 39 87 67" className={`${shared} text-accent`} strokeWidth="2"/><g className="fill-map-residence"><circle cx="69" cy="58" r="4"/><circle cx="194" cy="57" r="4"/></g></svg>;
  if (index === 2) return <svg viewBox="0 0 260 120" aria-label="Institutional timeline and governance matrix"><path d="M16 35h224" className={`${shared} text-primary/35`} strokeWidth="1"/><g className="fill-map-visited"><circle cx="30" cy="35" r="5"/><circle cx="84" cy="35" r="5"/><circle cx="138" cy="35" r="5"/><circle cx="192" cy="35" r="5"/><circle cx="238" cy="35" r="5"/></g><g className={`${shared} text-accent`} strokeWidth="1.5"><path d="M30 35v-15h54v15M138 35v-15h54v15"/><rect x="55" y="65" width="42" height="30"/><rect x="100" y="65" width="42" height="30"/><rect x="145" y="65" width="42" height="30"/><rect x="190" y="65" width="42" height="30"/></g></svg>;
  if (index === 3) return <svg viewBox="0 0 260 120" aria-label="Tactical maneuver and operational depth distribution"><g className={`${shared} text-primary/25`} strokeWidth="1"><path d="M20 18h220M20 43h220M20 68h220M20 93h220"/></g><path d="M24 91c30-4 40-23 64-28s39-1 61-22 47-18 84-23" className={`${shared} text-map-visited`} strokeWidth="3"/><path d="M24 91l23-2-8-14M149 41l-4 18 18-4M233 18l-18-3 7 17" className={`${shared} text-map-visited`} strokeWidth="2"/><g className="fill-accent"><rect x="60" y="24" width="18" height="12"/><rect x="112" y="75" width="18" height="12"/><rect x="181" y="43" width="18" height="12"/></g></svg>;
  return <svg viewBox="0 0 260 120" aria-label="Process tracing flowchart and audit risk matrix"><g className={`${shared} text-primary/35`} strokeWidth="1.5"><rect x="12" y="20" width="42" height="24"/><rect x="74" y="20" width="42" height="24"/><rect x="136" y="20" width="42" height="24"/><path d="M54 32h20M116 32h20"/></g><g className={`${shared} text-accent`} strokeWidth="1.5"><rect x="183" y="57" width="60" height="45"/><path d="M203 57v45M223 57v45M183 72h60M183 87h60"/></g><path d="M24 72h130M24 72l14-9M24 72l14 9" className={`${shared} text-map-visited`} strokeWidth="2"/><rect x="224" y="58" width="18" height="13" className="fill-map-residence"/></svg>;
}

function CapabilityCard({ item, index, expanded, onToggle, onEnter, onLeave }: { item: string[]; index: number; expanded: boolean; onToggle: () => void; onEnter: () => void; onLeave: () => void }) {
  const [num, title, description] = item;
  return <article className="group border-b border-r border-border bg-background/35 transition-colors hover:bg-card focus-within:bg-card" onMouseEnter={onEnter} onMouseLeave={onLeave}>
    <Button type="button" variant="ghost" onClick={onToggle} onFocus={onEnter} aria-expanded={expanded} aria-controls={`capability-panel-${index}`} className="h-auto min-h-[250px] w-full items-stretch justify-start rounded-none p-7 text-left text-foreground hover:bg-transparent hover:text-foreground md:p-9">
      <span className="flex w-full flex-col whitespace-normal">
        <span className="flex items-start justify-between"><span className="text-xs text-muted-foreground">{num}</span><span className="h-20 w-20 text-accent [&>svg]:h-full [&>svg]:w-full md:h-24 md:w-24"><CapabilityIcon index={index}/></span></span>
        <span className="mt-12 flex items-end justify-between gap-6"><span className="max-w-sm font-display text-3xl font-normal leading-tight">{title}</span><ChevronDown className={`mb-1 h-5 w-5 shrink-0 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}/></span>
      </span>
    </Button>
    <div id={`capability-panel-${index}`} className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out ${expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
      <div className="overflow-hidden"><div className="grid gap-6 border-t border-border px-7 pb-8 pt-6 md:grid-cols-[.8fr_1.2fr] md:px-9"><p className="text-sm leading-7 text-muted-foreground">{description}</p><div className="min-h-28 text-foreground"><AnalyticalGraphic index={index}/></div></div></div>
    </div>
  </article>;
}

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCapability, setActiveCapability] = useState<number | null>(null);
  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/85 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-5 md:px-10">
          <a href="#top" className="font-display text-2xl tracking-[0.08em]" aria-label="Timothy Nghiem home">T. NGHIEM</a>
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Main navigation">{nav.map(([label, id]) => <a key={id} href={`#${id}`} className="text-xs uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-foreground">{label}</a>)}</nav>
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen ? <X /> : <Menu />}</Button>
        </div>
        {menuOpen && <nav className="border-t border-border bg-background px-5 py-6 lg:hidden">{nav.map(([label,id]) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)} className="block border-b border-border py-3 text-sm uppercase tracking-[0.12em]">{label}</a>)}</nav>}
      </header>

      <main id="top">
        <section className="relative min-h-[92vh] overflow-hidden pt-20">
          <img src={heroImage} alt="Archival economic charts, world map, compass, and financial ledger on a walnut desk" width={1600} height={1200} className="absolute inset-0 h-full w-full object-cover" fetchPriority="high" />
          <div className="absolute inset-0 bg-primary/72" />
          <div className="relative mx-auto flex min-h-[calc(92vh-5rem)] max-w-[1440px] items-end px-5 py-14 md:px-10 md:py-20">
            <div className="reveal-up max-w-5xl text-primary-foreground">
              <p className="mb-7 text-xs font-medium uppercase tracking-[0.2em] text-primary-foreground/70">Finance · Governance · Economics</p>
              <h1 className="max-w-5xl font-display text-6xl leading-[0.94] md:text-8xl lg:text-[7.5rem]">Navigating Macro-Dynamics &amp; Strategic Governance.</h1>
              <p className="mt-8 max-w-2xl text-base leading-relaxed text-primary-foreground/75 md:text-lg">Timothy (Thang) Nghiem — Business Administration &amp; Applied Economics Graduate.</p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Button asChild variant="portfolio" size="portfolio" className="bg-background text-foreground hover:bg-background/90"><a href={workUrl} target="_blank" rel="noreferrer">Explore work samples <ArrowUpRight /></a></Button>
                <Button asChild variant="portfolioOutline" size="portfolio" className="border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground hover:text-primary"><a href={transcriptUrl} target="_blank" rel="noreferrer">Academic transcript <ArrowUpRight /></a></Button>
              </div>
              <p className="mt-10 max-w-2xl border-l border-primary-foreground/35 pl-4 text-xs leading-relaxed text-primary-foreground/60">Under Asian cultural naming: Nghiem Duc Thang <span className="mx-2">|</span> Western address: Timothy (or callsign “Cal”).</p>
            </div>
          </div>
        </section>

        <section id="about" className="mx-auto max-w-[1440px] scroll-mt-20 px-5 py-24 md:px-10 md:py-36">
          <div className="grid gap-14 lg:grid-cols-[.8fr_1.6fr]">
            <div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">01 / About</p><h2 className="mt-6 font-display text-5xl leading-none md:text-7xl">The Intersection of Capital, Policy, and Governance</h2></div>
            <div className="lg:pt-12"><p className="max-w-3xl text-xl leading-relaxed text-muted-foreground md:text-2xl">I operate at the crossroads where macroeconomic realities meet geopolitical strategy. With a foundation in Business Administration, economics, and administrative politics, my focus centers on how policy shifts and market dynamics govern capital allocation and risk.</p></div>
          </div>
          <div className="mt-20 grid gap-8 lg:grid-cols-[1.5fr_.7fr] lg:items-end"><figure className="glass-panel overflow-hidden"><img src={travelMapAsset.url} alt="World map highlighting Vietnam, China, France, Germany, Denmark, Finland, Qatar, and the UAE" width={1000} height={666} loading="lazy" className="h-auto w-full"/></figure><div className="pb-2"><p className="font-display text-4xl">8 countries</p><p className="mt-4 leading-relaxed text-muted-foreground">Born and raised in Vietnam, with experience across China, France, Denmark, Germany, UAE, and Qatar — currently based in Finland.</p></div></div>
        </section>

        <section id="academic" className="section-rule scroll-mt-20 bg-primary text-primary-foreground">
          <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
            <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end"><div><p className="text-xs uppercase tracking-[0.18em] text-primary-foreground/55">02 / Academic rigor</p><h2 className="mt-5 max-w-3xl font-display text-5xl leading-none md:text-7xl">Strategic vision, built on evidence.</h2></div><Button asChild variant="portfolioOutline" size="portfolio" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground hover:text-primary"><a href={transcriptUrl} target="_blank" rel="noreferrer">View official transcript <ArrowUpRight /></a></Button></div>
            <div className="mt-16 grid border border-primary-foreground/20 md:grid-cols-2">
              <div className="p-8 md:border-r md:border-primary-foreground/20 md:p-12"><div className="font-display text-8xl md:text-9xl">190</div><p className="mt-4 text-sm uppercase tracking-[0.16em] text-primary-foreground/60">ECTS completed in 2 years</p><div className="mt-6 grid grid-cols-2 gap-4"><div><p className="text-sm text-primary-foreground/70">Tampere University</p><div className="mt-3 flex h-28 items-center justify-center bg-background p-4"><img src={tampereLogoAsset.url} alt="Tampere University logo" width={304} height={387} loading="lazy" className="h-20 w-auto object-contain"/></div></div><div><p className="text-sm text-primary-foreground/70">Aalto University</p><div className="mt-3 flex h-28 items-center justify-center bg-background p-4"><img src={aaltoLogoAsset.url} alt="Aalto University logo" width={768} height={768} loading="lazy" className="h-24 w-full object-contain"/></div></div></div></div>
              <div className="divide-y divide-primary-foreground/20"><div className="p-8 md:p-10"><p className="text-xs uppercase tracking-[0.15em] text-secondary">Mastering Large Engineering Projects</p><p className="mt-4 leading-relaxed text-primary-foreground/70">Investigating structural governance, capital expenditure auditing, and risk management frameworks in multi-billion euro infrastructure assets.</p></div><div className="p-8 md:p-10"><p className="text-xs uppercase tracking-[0.15em] text-secondary">Quantitative Exploration</p><p className="mt-4 leading-relaxed text-primary-foreground/70">Actively expanding practical capabilities in coding and machine learning for economic predictions and automated auditing.</p></div></div>
            </div>
            <p className="mt-10 max-w-4xl border-l border-accent pl-6 font-display text-2xl italic text-primary-foreground/80">While evaluating complex systems holistically, my core operational focus lies in Finance and Economics—where data, structure, and strategic leverage yield maximum impact.</p>
            <a href={thesisUrl} target="_blank" rel="noreferrer" className="group mt-12 grid gap-6 border-t border-primary-foreground/20 pt-8 transition-colors hover:text-secondary md:grid-cols-[1fr_auto] md:items-end"><div><p className="text-xs uppercase tracking-[0.15em] text-secondary">Bachelor’s Thesis</p><h3 className="mt-3 font-display text-3xl md:text-4xl">Finance through the lens of large-project management</h3><p className="mt-4 max-w-3xl leading-relaxed text-primary-foreground/65">The thesis connects financial judgment with the realities of managing large projects: capital allocation, governance structures, risk exposure, and the long-term decisions that determine whether complex investments create durable value.</p></div><span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em]">Read thesis <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"/></span></a>
          </div>
        </section>

        <section id="capabilities" className="mx-auto max-w-[1440px] scroll-mt-20 px-5 py-24 md:px-10 md:py-36">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">03 / Capabilities</p><h2 className="mt-5 font-display text-5xl uppercase md:text-7xl">Core Capabilities</h2>
          <div className="mt-16 grid border-l border-t border-border md:grid-cols-2">{capabilities.map((item, i) => <CapabilityCard key={item[1]} item={item} index={i} expanded={activeCapability === i} onToggle={() => setActiveCapability(activeCapability === i && window.matchMedia("(hover: none)").matches ? null : i)} onEnter={() => setActiveCapability(i)} onLeave={() => setActiveCapability((current) => current === i ? null : current)}/>)}</div>
        </section>

        <section id="work" className="section-rule scroll-mt-20">
          <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:px-10 md:py-36 lg:grid-cols-2 lg:items-center">
            <div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">04 / Selected work</p><h2 className="mt-5 font-display text-5xl leading-none md:text-7xl">Selected Deliverables &amp; Analytical Dossiers</h2></div>
            <a href={workUrl} target="_blank" rel="noreferrer" className="group glass-panel block p-8 transition-transform hover:-translate-y-1 md:p-12"><div className="flex items-start justify-between"><BookOpen className="h-10 w-10 text-accent"/><ArrowUpRight className="h-6 w-6 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"/></div><p className="mt-16 text-xs uppercase tracking-[0.15em] text-muted-foreground">Private portfolio archive</p><h3 className="mt-3 font-display text-4xl">Work Samples</h3><p className="mt-5 max-w-xl leading-7 text-muted-foreground">Contains quantitative research datasets, empirical project analyses, financial modeling samples, and governance evaluation reports.</p><div className="mt-10 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.15em]">Open Google Drive <ArrowDownRight className="h-4 w-4"/></div></a>
          </div>
        </section>

        <section id="perspective" className="scroll-mt-20 bg-secondary/45">
          <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32"><div className="grid gap-10 lg:grid-cols-2"><div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">05 / Perspective</p><h2 className="mt-5 font-display text-5xl md:text-7xl">Personal Blog &amp; Essays</h2></div><div className="border-t border-primary pt-7"><p className="text-xs uppercase tracking-[0.15em] text-muted-foreground">Currently under development</p><p className="mt-6 max-w-2xl text-xl leading-relaxed">This portal will serve as an analytical archive for essays on geopolitical risk, quantitative economics, and financial structures.</p></div></div></div>
        </section>

        <section className="mx-auto max-w-[1440px] px-5 py-20 md:px-10 md:py-28"><blockquote className="glass-panel mx-auto max-w-5xl p-8 font-display text-2xl italic leading-relaxed md:p-14 md:text-4xl">“Author&apos;s Note: This digital portal was architected and deployed utilizing state-of-the-art AI systems—reflecting my ongoing commitment to leveraging cutting-edge technology, optimizing operational workflows, and mastering next-generation analytical tools.”</blockquote></section>
      </main>

      <footer id="contact" className="scroll-mt-20 bg-primary text-primary-foreground">
        <div className="relative h-56 overflow-hidden border-b border-primary-foreground/20 md:h-80"><img src={contactBanner} alt="Abstract financial curves crossing an architectural grid" width={1920} height={768} loading="lazy" className="h-full w-full object-cover"/><div className="absolute inset-0 bg-primary/20"/></div>
        <div className="mx-auto max-w-[1440px] px-5 pb-10 pt-20 md:px-10 md:pt-28"><p className="text-xs uppercase tracking-[0.18em] text-primary-foreground/50">06 / Contact</p><div className="mt-7 grid gap-12 lg:grid-cols-[1.5fr_1fr]"><h2 className="font-display text-6xl leading-none md:text-8xl">Let’s discuss the systems behind the numbers.</h2><div className="space-y-4 lg:pt-4"><a href="mailto:thangnghiem04@gmail.com" className="flex items-center gap-3 border-b border-primary-foreground/20 pb-4 text-sm hover:text-secondary"><Mail className="h-4 w-4"/>thangnghiem04@gmail.com</a><a href="tel:+358466128746" className="flex items-center gap-3 border-b border-primary-foreground/20 pb-4 text-sm hover:text-secondary"><Phone className="h-4 w-4"/>+358 466 128 746</a><a href="https://www.facebook.com/thang.nghiem.00/" target="_blank" rel="noreferrer" className="flex items-center gap-3 border-b border-primary-foreground/20 pb-4 text-sm hover:text-secondary"><Facebook className="h-4 w-4"/>Facebook <ArrowUpRight className="ml-auto h-4 w-4"/></a><a href={workUrl} target="_blank" rel="noreferrer" className="flex items-center gap-3 border-b border-primary-foreground/20 pb-4 text-sm hover:text-secondary">Portfolio folder <ArrowUpRight className="ml-auto h-4 w-4"/></a><a href={transcriptUrl} target="_blank" rel="noreferrer" className="flex items-center gap-3 border-b border-primary-foreground/20 pb-4 text-sm hover:text-secondary">Academic transcript <ArrowUpRight className="ml-auto h-4 w-4"/></a></div></div><div className="mt-24 flex flex-col justify-between gap-4 border-t border-primary-foreground/20 pt-7 text-xs text-primary-foreground/45 sm:flex-row"><span>© Timothy (Thang) Nghiem. All rights reserved.</span><span>Based in Finland · Working globally</span></div></div>
      </footer>
    </div>
  );
}
