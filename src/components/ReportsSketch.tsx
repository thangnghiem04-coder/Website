import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

/*
 * Decorative ballpoint-pen sketch for the "Business Analytics & Strategic Advisory Reports" card:
 * a hand-drawn bar chart, an ink blot and a pen that traces the trend line.
 * Purely visual (aria-hidden, no real data). Animation styles live in src/styles.css (.ink-sketch).
 * It draws itself once when scrolled into view; with prefers-reduced-motion it appears finished.
 */
const TREND_DELAY_MS = 1400;
const TREND_DURATION_MS = 1500;

export function ReportsSketch() {
  const rootRef = useRef<HTMLDivElement>(null);
  const trendRef = useRef<SVGPathElement>(null);
  const penRef = useRef<SVGGElement>(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !("IntersectionObserver" in window)) {
      setDrawn(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setDrawn(true);
        observer.disconnect();
      }
    }, { threshold: 0.4 });
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!drawn) return;
    const trend = trendRef.current;
    const pen = penRef.current;
    if (!trend || !pen) return;

    const length = trend.getTotalLength();
    trend.style.strokeDasharray = `${length} ${length * 2}`;
    const place = (progress: number) => {
      const point = trend.getPointAtLength(length * progress);
      const wobble = progress > 0 && progress < 1 ? Math.sin(progress * 38) * 1.1 : 0;
      pen.setAttribute("transform", `translate(${point.x.toFixed(1)} ${point.y.toFixed(1)}) rotate(${wobble.toFixed(2)})`);
      trend.style.strokeDashoffset = String(length * 1.02 * (1 - progress));
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      place(1);
      return;
    }

    place(0);
    let frame = 0;
    const timer = window.setTimeout(() => {
      const startedAt = performance.now();
      const step = (now: number) => {
        const t = Math.min(1, (now - startedAt) / TREND_DURATION_MS);
        place(t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
        if (t < 1) frame = requestAnimationFrame(step);
      };
      frame = requestAnimationFrame(step);
    }, TREND_DELAY_MS);
    return () => {
      window.clearTimeout(timer);
      cancelAnimationFrame(frame);
    };
  }, [drawn]);

  return (
    <div ref={rootRef} aria-hidden="true" className={`ink-sketch pointer-events-none mx-auto w-full max-w-[28rem] select-none${drawn ? " is-drawn" : ""}`}>
      <svg viewBox="0 0 440 360" className="h-auto w-full overflow-visible">
<defs><radialGradient id="reports-ink-halo"><stop offset="0" stopColor="var(--ink)" stopOpacity="0.16"/><stop offset="1" stopColor="var(--ink)" stopOpacity="0"/></radialGradient><filter id="reports-ink-rough" x="-20%" y="-20%" width="140%" height="140%"><feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" seed="5" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="3"/></filter></defs>
<circle className="ink-fade" cx="92" cy="126" r="46" fill="url(#reports-ink-halo)" style={{ "--ink-delay": "0ms", "--ink-dur": "1400ms" } as CSSProperties}/>
<g filter="url(#reports-ink-rough)"><path className="ink-drop fill-ink" d="M112.8 126C112.9 128 114.2 130 114.1 131.9C114.1 133.9 113.5 136.1 112.5 137.8C111.5 139.6 109.7 140.7 108.3 142.3C106.9 143.8 105.9 146.2 104.1 147C102.3 147.7 99.6 146.3 97.6 146.7C95.5 147.1 93.8 149.7 92 149.4C90.2 149.1 88.9 145.5 86.9 144.9C85 144.3 82.1 146.6 80.5 145.9C78.9 145.2 78.3 142.4 77.1 140.9C76 139.4 74.7 138.2 73.6 136.6C72.6 135.1 71 133.4 70.8 131.7C70.6 129.9 73.8 128.3 72.5 126C71.1 123.7 62.8 120.1 62.8 118.2C62.7 116.3 69.9 115.8 72.4 114.7C74.8 113.5 75.7 112.3 77.3 111.3C79 110.4 80.7 110.2 82.2 109.1C83.7 108 84.7 105.7 86.3 104.8C87.9 103.9 90.2 103.5 92 103.8C93.8 104.1 95.4 105.8 97.3 106.4C99.1 107 101 106.6 102.9 107.2C104.7 107.7 105.4 109.3 108.2 109.8C111.1 110.2 119.1 108.1 120 109.8C120.9 111.6 115 117.5 113.8 120.1C112.6 122.8 112.8 124 112.8 126Z" fillOpacity="0.93" style={{ "--ink-delay": "60ms", "--ink-dur": "700ms" } as CSSProperties}/>
<circle className="ink-drop fill-ink" cx="58.5" cy="138.2" r="4.2" fillOpacity="0.9" style={{ "--ink-delay": "260ms", "--ink-dur": "420ms" } as CSSProperties}/>
<circle className="ink-drop fill-ink" cx="90.2" cy="63.8" r="2.3" fillOpacity="0.9" style={{ "--ink-delay": "330ms", "--ink-dur": "420ms" } as CSSProperties}/>
<circle className="ink-drop fill-ink" cx="31.7" cy="111.8" r="2.7" fillOpacity="0.9" style={{ "--ink-delay": "400ms", "--ink-dur": "420ms" } as CSSProperties}/>
<circle className="ink-drop fill-ink" cx="122.1" cy="62.1" r="1.7" fillOpacity="0.9" style={{ "--ink-delay": "470ms", "--ink-dur": "420ms" } as CSSProperties}/>
<circle className="ink-drop fill-ink" cx="122.3" cy="84.9" r="2.9" fillOpacity="0.9" style={{ "--ink-delay": "540ms", "--ink-dur": "420ms" } as CSSProperties}/>
<circle className="ink-drop fill-ink" cx="26.6" cy="97.3" r="1.2" fillOpacity="0.9" style={{ "--ink-delay": "610ms", "--ink-dur": "420ms" } as CSSProperties}/>
<circle className="ink-drop fill-ink" cx="53.3" cy="137.7" r="3.2" fillOpacity="0.9" style={{ "--ink-delay": "680ms", "--ink-dur": "420ms" } as CSSProperties}/>
<circle className="ink-drop fill-ink" cx="154.3" cy="127.3" r="2" fillOpacity="0.9" style={{ "--ink-delay": "750ms", "--ink-dur": "420ms" } as CSSProperties}/>
</g>
<path className="ink-stroke fill-none stroke-primary" d="M30.6 112.7C30.7 116.2 31.1 126.7 31.3 133.6C31.5 140.6 31.8 147.6 31.8 154.6C31.9 161.6 31.7 168.6 31.8 175.6C31.9 182.5 32.5 189.5 32.4 196.5C32.2 203.5 31.1 210.5 31 217.5C30.8 224.5 31.4 231.5 31.5 238.4C31.7 245.4 31.8 252.4 31.8 259.4C31.8 266.4 31.8 273.4 31.7 280.4C31.6 287.3 31.5 294.3 31.4 301.3C31.3 308.3 31 315.3 31.1 322.3C31.3 329.3 32.1 339.7 32.2 343.2" pathLength="1" strokeWidth="1.7" strokeOpacity="0.8" strokeLinecap="round" strokeLinejoin="round" style={{ "--ink-delay": "250ms", "--ink-dur": "600ms" } as CSSProperties} />
<path className="ink-stroke fill-none stroke-primary" d="M26.5 339.5C29.9 339.4 40.2 339.1 47 339.1C53.9 339 60.7 339.1 67.5 339.3C74.4 339.5 81.2 340.2 88.1 340.3C94.9 340.3 101.8 339.8 108.6 339.7C115.5 339.6 122.3 339.7 129.1 339.7C136 339.8 142.8 340.1 149.7 339.9C156.5 339.7 163.4 338.6 170.2 338.7C177 338.7 183.9 340 190.7 340.3C197.6 340.5 204.4 340.3 211.3 340.2C218.1 340.2 224.9 340.2 231.8 340C238.6 339.9 245.5 339.3 252.3 339.3C259.2 339.3 266 339.9 272.8 339.9C279.7 339.9 286.5 339.5 293.4 339.4C300.2 339.2 307.1 339 313.9 339.1C320.8 339.2 327.6 340.2 334.4 340.1C341.3 340.1 348.1 338.9 355 338.6C361.8 338.3 368.7 338.4 375.5 338.4C382.3 338.5 389.2 339 396 339C402.9 339 413.1 338.6 416.6 338.6" pathLength="1" strokeWidth="1.7" strokeOpacity="0.8" strokeLinecap="round" strokeLinejoin="round" style={{ "--ink-delay": "250ms", "--ink-dur": "600ms" } as CSSProperties} />
<path className="ink-stroke fill-none stroke-primary" d="M33.5 117C33.2 120.4 32.1 130.6 31.7 137.5C31.3 144.3 31.3 151.2 31.2 158C31.1 164.9 31.2 171.7 31.3 178.6C31.5 185.4 31.9 192.3 32.1 199.1C32.4 206 33.1 212.8 33 219.7C32.8 226.5 31.4 233.4 31.4 240.2C31.4 247.1 33.2 253.9 33 260.8C32.8 267.6 30.6 274.5 30.2 281.3C29.8 288.1 30.7 295 30.6 301.9C30.5 308.7 29.7 315.5 29.6 322.4C29.6 329.2 30.4 339.5 30.5 342.9" pathLength="1" strokeWidth="0.8" strokeOpacity="0.45" strokeLinecap="round" strokeLinejoin="round" style={{ "--ink-delay": "450ms", "--ink-dur": "600ms" } as CSSProperties} />
<path className="ink-stroke fill-none stroke-primary" d="M29.4 341.5C32.9 341.3 43.5 340.2 50.6 340.3C57.7 340.4 64.8 341.9 71.8 342.2C78.9 342.5 86 342.1 93 342C100.1 342 107.2 342 114.2 342C121.3 342 128.4 342.4 135.4 342C142.5 341.6 149.6 340 156.6 339.8C163.7 339.7 170.8 340.9 177.9 341.2C184.9 341.5 192 341.7 199.1 341.4C206.1 341.2 213.2 339.6 220.3 339.6C227.3 339.6 234.4 341.3 241.5 341.4C248.5 341.5 255.6 340.8 262.7 340.4C269.7 340 276.8 339.1 283.9 338.9C290.9 338.8 298 339.5 305.1 339.5C312.2 339.5 319.2 338.9 326.3 338.9C333.4 338.9 340.4 339.4 347.5 339.6C354.6 339.9 361.6 340 368.7 340.3C375.8 340.6 382.8 341.4 389.9 341.3C397 341.2 407.6 339.9 411.1 339.6" pathLength="1" strokeWidth="0.8" strokeOpacity="0.45" strokeLinecap="round" strokeLinejoin="round" style={{ "--ink-delay": "450ms", "--ink-dur": "600ms" } as CSSProperties} />
<path className="ink-stroke fill-none stroke-primary" d="M25.4 153.9C26.5 153.8 29.9 153.8 32.1 153.7C34.4 153.6 37.7 153.4 38.8 153.4 M25.5 213.9C26.6 213.9 29.9 213.8 32.1 213.7C34.4 213.7 37.7 213.7 38.8 213.7 M25.7 274.1C26.8 274.1 30 273.8 32.1 273.7C34.2 273.6 37.4 273.4 38.4 273.4" pathLength="1" strokeWidth="1.1" strokeOpacity="0.6" strokeLinecap="round" strokeLinejoin="round" style={{ "--ink-delay": "700ms", "--ink-dur": "500ms" } as CSSProperties} />
<path className="ink-stroke fill-none stroke-primary" d="M54.3 343.8C54.3 340.2 54.7 329.6 54.7 322.5C54.8 315.3 54.5 308.2 54.5 301.1C54.4 294 54.5 283.4 54.5 279.8 M50 282.2C54.3 282.4 67 283.1 75.4 283.2C83.9 283.4 96.6 283.1 100.8 283.1 M99.9 280.1C99.9 283.7 99.9 294.5 99.7 301.7C99.5 308.9 98.7 316.1 98.6 323.3C98.5 330.5 99 341.4 99.1 345" pathLength="1" strokeWidth="1.8" strokeOpacity="0.85" strokeLinecap="round" strokeLinejoin="round" style={{ "--ink-delay": "600ms", "--ink-dur": "520ms" } as CSSProperties} />
<path className="ink-stroke fill-none stroke-primary" d="M56.6 341.8C56.6 336.8 57.2 321.8 56.9 311.9C56.7 301.9 55.2 287 54.8 282.1 M53.4 283.7C57.2 283.6 68.4 283.4 75.9 283.4C83.5 283.4 94.7 283.6 98.5 283.6" pathLength="1" strokeWidth="0.8" strokeOpacity="0.4" strokeLinecap="round" strokeLinejoin="round" style={{ "--ink-delay": "780ms", "--ink-dur": "480ms" } as CSSProperties} />
<path className="ink-stroke fill-none stroke-accent" d="M57.4 293.5L64 284.9 M56.8 300.8L72.4 285.8 M57.1 308L80.2 284.3 M57.2 316.2L88.9 284 M57.4 325.9L96.5 284.8 M57.5 332.9L96.6 292.1 M61.1 337.6L96.6 301.9 M69.3 336.4L97.3 308.9 M76.4 336.2L97.5 317.3 M84.5 336.7L97.9 325.6 M92.4 336.9L96.7 332.5" pathLength="1" strokeWidth="1.1" strokeOpacity="0.8" strokeLinecap="round" strokeLinejoin="round" style={{ "--ink-delay": "900ms", "--ink-dur": "700ms" } as CSSProperties} />
<path className="ink-stroke fill-none stroke-primary" d="M115.8 343.7C115.9 339.6 116.8 327.3 116.8 319.1C116.9 310.9 116.2 302.7 116.2 294.5C116.3 286.3 117.2 278.1 117.3 269.9C117.4 261.7 117 249.3 116.9 245.2 M114.4 247.9C118.4 247.8 130.3 247.4 138.3 247.4C146.3 247.3 158.2 247.7 162.2 247.8 M161.9 246.3C162 250.4 162.5 262.7 162.4 270.9C162.4 279.1 161.7 287.3 161.6 295.5C161.5 303.7 161.6 312 161.7 320.2C161.8 328.4 162.1 340.7 162.2 344.8" pathLength="1" strokeWidth="1.8" strokeOpacity="0.85" strokeLinecap="round" strokeLinejoin="round" style={{ "--ink-delay": "730ms", "--ink-dur": "520ms" } as CSSProperties} />
<path className="ink-stroke fill-none stroke-primary" d="M117.7 340.6C117.7 336.7 117.3 325.1 117.4 317.4C117.5 309.6 118.5 301.9 118.5 294.1C118.4 286.4 117.6 278.6 117.3 270.9C117 263.1 116.9 251.5 116.8 247.6 M114.9 249.4C118.8 249.5 130.3 250.2 138 250.1C145.7 249.9 157.2 248.8 161.1 248.5" pathLength="1" strokeWidth="0.8" strokeOpacity="0.4" strokeLinecap="round" strokeLinejoin="round" style={{ "--ink-delay": "910ms", "--ink-dur": "480ms" } as CSSProperties} />
<path className="ink-stroke fill-none stroke-accent" d="M118.1 258.6L127.3 251.2 M119.9 267.6L134.9 250.4 M118 274.5L143.8 250.9 M118.3 282.4L151.6 251.5 M119.2 290.2L158.9 252 M118.5 299.5L160 260 M119 307.8L159.8 267.9 M118.5 315.5L158.6 275.5 M118.6 323.3L158 282.4 M118.1 330.1L158.8 290.2 M120.7 336.8L159.6 298.1 M129.4 336.1L159.9 306.2 M137 336.2L158.2 314.2 M144.1 336.5L158.5 322.1 M153 337.3L159.7 331.1" pathLength="1" strokeWidth="1.1" strokeOpacity="0.8" strokeLinecap="round" strokeLinejoin="round" style={{ "--ink-delay": "1030ms", "--ink-dur": "700ms" } as CSSProperties} />
<path className="ink-stroke fill-none stroke-primary" d="M178.4 342.5C178.3 338.1 177.9 324.8 177.8 315.9C177.8 307 178.2 298.2 178.1 289.3C178 280.4 177.5 267.2 177.4 262.7 M175.6 263.9C179.7 263.7 192 263 200.2 262.9C208.4 262.8 220.6 263.3 224.7 263.3 M224.4 261.1C224.2 265.7 223.6 279.4 223.4 288.5C223.2 297.6 223.1 306.7 223.2 315.9C223.3 325 223.9 338.7 224 343.3" pathLength="1" strokeWidth="1.8" strokeOpacity="0.85" strokeLinecap="round" strokeLinejoin="round" style={{ "--ink-delay": "860ms", "--ink-dur": "520ms" } as CSSProperties} />
<path className="ink-stroke fill-none stroke-primary" d="M179.9 340.2C180.1 335.9 180.6 323.2 180.7 314.8C180.8 306.3 180.8 297.8 180.5 289.3C180.2 280.9 179 268.2 178.7 264 M177.2 266.1C181 266.2 192.3 267 199.9 266.7C207.5 266.5 218.8 265.1 222.5 264.7" pathLength="1" strokeWidth="0.8" strokeOpacity="0.4" strokeLinecap="round" strokeLinejoin="round" style={{ "--ink-delay": "1040ms", "--ink-dur": "480ms" } as CSSProperties} />
<path className="ink-stroke fill-none stroke-accent" d="M181.1 274.2L188.5 266.2 M181.8 283.1L196.7 266.3 M181.9 290.7L204.2 267.8 M180.5 298.6L212 266.3 M181.7 306.2L221.2 267.8 M180.2 315.9L220.2 275.2 M180.7 322.9L221.4 283.7 M181.6 331.8L220.7 290.5 M182.3 336.3L220.7 299.4 M190.9 337.9L221 306 M198.3 336.7L221.1 315.3 M207.8 337.2L220.2 322.7 M214.7 337.3L220.2 330.7" pathLength="1" strokeWidth="1.1" strokeOpacity="0.8" strokeLinecap="round" strokeLinejoin="round" style={{ "--ink-delay": "1160ms", "--ink-dur": "700ms" } as CSSProperties} />
<path className="ink-stroke fill-none stroke-primary" d="M240.4 343.9C240.4 340.2 240.1 329 240.1 321.5C240.1 314 240.2 306.6 240.4 299.1C240.5 291.6 241.1 284.2 241 276.7C240.9 269.2 239.9 261.7 239.9 254.3C239.9 246.8 241.2 239.3 241.2 231.9C241.3 224.4 240.4 213.2 240.2 209.5 M236.6 211.5C240.7 211.7 253.1 212.4 261.3 212.7C269.6 212.9 282 213 286.1 213 M285.7 211.6C285.6 215.2 285.2 226.2 285.3 233.4C285.4 240.7 286.2 248 286.2 255.3C286.2 262.6 285.3 269.8 285.4 277.1C285.4 284.4 286.6 291.7 286.6 298.9C286.6 306.2 285.5 313.5 285.4 320.8C285.3 328.1 285.9 339 286 342.6" pathLength="1" strokeWidth="1.8" strokeOpacity="0.85" strokeLinecap="round" strokeLinejoin="round" style={{ "--ink-delay": "990ms", "--ink-dur": "520ms" } as CSSProperties} />
<path className="ink-stroke fill-none stroke-primary" d="M241.9 340.4C241.8 336.8 241.4 326.1 241.1 319C240.9 311.8 240.6 304.7 240.5 297.5C240.5 290.4 240.8 283.2 241 276.1C241.2 268.9 241.8 261.8 241.7 254.6C241.7 247.5 240.8 240.3 240.6 233.2C240.4 226 240.5 215.3 240.5 211.7 M238.1 214.1C242 214.2 253.8 214.8 261.7 214.5C269.6 214.2 281.4 212.8 285.3 212.5" pathLength="1" strokeWidth="0.8" strokeOpacity="0.4" strokeLinecap="round" strokeLinejoin="round" style={{ "--ink-delay": "1170ms", "--ink-dur": "480ms" } as CSSProperties} />
<path className="ink-stroke fill-none stroke-accent" d="M242.6 222.2L251.7 216 M243.3 230.3L258.4 215.8 M243.7 238.8L266.9 215 M242.4 247.3L274.2 215.3 M242.5 255.7L282.9 214.7 M243.2 263.6L282.6 222.8 M243.5 271.6L283.6 230.6 M242.1 279.7L282 239 M242.1 286L282.1 247 M243.5 295.8L282.7 255.9 M242.5 303.8L284 263.3 M242.3 310.7L282.8 270.7 M243.9 319.4L283.1 278.4 M242.1 326.5L283.7 286.4 M243.9 335.3L282.3 295.5 M249.6 338L283.8 303.7 M257.8 337.6L283 311.2 M264.9 337.3L284 319.6 M273 337.5L283.3 326.6" pathLength="1" strokeWidth="1.1" strokeOpacity="0.8" strokeLinecap="round" strokeLinejoin="round" style={{ "--ink-delay": "1290ms", "--ink-dur": "700ms" } as CSSProperties} />
<path className="ink-stroke fill-none stroke-primary" d="M302 342.9C302 339.5 302.5 329.3 302.3 322.5C302.2 315.6 301.1 308.8 301.2 302C301.2 295.2 302.4 288.4 302.7 281.5C302.9 274.7 302.8 267.9 302.6 261.1C302.5 254.3 302.1 247.4 302 240.6C301.8 233.8 301.5 227 301.5 220.2C301.5 213.4 302 206.5 302 199.7C301.9 192.9 301.5 182.7 301.4 179.3 M298.9 179.7C303 179.9 315.4 180.6 323.7 180.8C332 180.9 344.4 180.7 348.5 180.7 M348.2 178.8C348.3 182.2 349 192.6 348.8 199.5C348.7 206.4 347.4 213.3 347.2 220.2C347.1 227.1 347.8 234 347.9 240.9C348.1 247.8 348.3 254.7 348.2 261.6C348.1 268.5 347.5 275.4 347.4 282.3C347.4 289.2 347.8 296.2 347.9 303.1C347.9 310 347.8 316.9 347.8 323.8C347.8 330.7 347.8 341 347.8 344.5" pathLength="1" strokeWidth="1.8" strokeOpacity="0.85" strokeLinecap="round" strokeLinejoin="round" style={{ "--ink-delay": "1120ms", "--ink-dur": "520ms" } as CSSProperties} />
<path className="ink-stroke fill-none stroke-primary" d="M303.5 341.1C303.4 337.3 303.2 325.7 303.1 318C303 310.4 302.8 302.7 302.8 295C302.8 287.3 302.6 279.6 303 271.9C303.3 264.2 304.9 256.6 304.9 248.9C304.9 241.2 303.2 233.5 303.1 225.8C303 218.1 304.1 210.4 304.1 202.8C304.2 195.1 303.5 183.5 303.4 179.7 M300.4 181.7C304.3 181.4 316.2 180.2 324.1 180.1C332 180.1 343.9 181.1 347.9 181.3" pathLength="1" strokeWidth="0.8" strokeOpacity="0.4" strokeLinecap="round" strokeLinejoin="round" style={{ "--ink-delay": "1300ms", "--ink-dur": "480ms" } as CSSProperties} />
<path className="ink-stroke fill-none stroke-accent" d="M304.3 188.3L310.6 183.7 M305.3 194.8L316.9 182.4 M305.2 200.3L323.8 183.4 M304 207.7L329.7 183.1 M304.8 213.7L335.7 182.4 M304.2 219.3L341 182.3 M304.9 224.8L345.7 185.5 M304.1 231.1L344.5 190.4 M305.6 237L345.7 196.5 M304.9 242.5L345.5 203.3 M305 249L344.6 209.6 M304.4 255.6L345.2 214.7 M305.3 260.8L344.6 221.6 M306 266.7L345.6 226.2 M305.8 272.2L344.5 233.9 M304.5 279.4L345.5 239.7 M305.5 285.2L345.2 244.3 M305 290.8L345.8 250 M304.7 298L344 258 M305.4 302.3L344.3 262.8 M304.9 308.4L344.4 269.1 M304.4 314.3L345.8 275.6 M304 320.9L345.5 280.2 M304.5 327.6L344.3 286.2 M304.1 333.5L345.4 293.1 M306 337.8L345.4 298.8 M312.6 336.5L345.4 304.5 M318.7 336.1L344.1 311.5 M325.4 337.8L344.6 316.2 M330.8 336.2L344 323.4 M336.6 337.5L344.9 329.6 M306 330.2L310.2 336.5 M305.9 326L316.7 336.7 M305.7 318L322.3 337 M304.7 314L329 336.4 M304 306.9L336 337.5 M304.5 301.6L340.1 337.6 M304.6 294.1L344.8 335.3 M304.4 288.7L345.2 328.1 M304.9 282.7L344.6 323.4 M304.8 277.6L344.4 316.6 M304.1 270.2L344.6 310.8 M305.3 264.1L344.1 304.3 M304.6 259.7L344.1 298.4 M305.2 252.7L345 293.7 M304.3 247.1L345.9 286.2 M304.6 241.8L344.8 281.2 M306 235.1L345.8 275.6 M304.7 229L345.6 269.4 M305.1 223.9L344.2 262.8 M305.8 216.9L344.1 257.3 M304.3 211.2L344.6 251.1 M305.4 205.1L345.3 245.1 M304.4 199.4L344.5 239.8 M305.9 192L344.2 232.8 M304 187L344.5 227.7 M307.3 183.1L344.3 221.9 M313.8 182.2L345.6 214.3 M318.4 182.6L344 208.8 M324.7 182.1L345.1 203.6 M330.3 183.6L344.8 197.1 M336.9 182.8L344.2 190.7" pathLength="1" strokeWidth="1.1" strokeOpacity="0.9" strokeLinecap="round" strokeLinejoin="round" style={{ "--ink-delay": "1420ms", "--ink-dur": "700ms" } as CSSProperties} />
<path ref={trendRef} className="ink-trend fill-none stroke-ink" d="M44 286C49.5 280.3 61.2 263.3 77 252C92.8 240.7 118.3 221.7 139 218C159.7 214.3 180.3 236.7 201 230C221.7 223.3 242.3 192.7 263 178C283.7 163.3 307.5 152.3 325 142C342.5 131.7 360.8 120.3 368 116" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round"/>
<path className="ink-stroke fill-none stroke-ink" d="M353 116.7L368 116L360.5 129" pathLength="1" strokeWidth="2.3" strokeOpacity="1" strokeLinecap="round" strokeLinejoin="round" style={{ "--ink-delay": "2950ms", "--ink-dur": "220ms" } as CSSProperties} />
<path className="ink-stroke fill-none stroke-ink" d="M257.9 161.5C261.2 162.3 271.8 163.7 277.7 166.3C283.7 168.8 289.4 172.2 293.4 176.6C297.3 180.9 300.3 186.6 301.5 192.2C302.7 197.9 303.3 205.1 300.7 210.6C298.2 216.1 292.3 222 286.3 225.2C280.3 228.4 271.6 230.1 264.6 229.9C257.6 229.7 249.9 227.2 244.2 224.1C238.6 221 234.2 216.1 230.6 211.2C226.9 206.3 222.9 200.6 222.2 194.8C221.6 189 223.2 181.8 226.5 176.3C229.8 170.8 235.7 164.6 242.1 161.7C248.5 158.8 258 158.2 265.1 159.1C272.3 160 279.4 163.6 285 167.2C290.6 170.7 296.4 178.4 298.7 180.7" pathLength="1" strokeWidth="1.5" strokeOpacity="0.75" strokeLinecap="round" strokeLinejoin="round" style={{ "--ink-delay": "3150ms", "--ink-dur": "650ms" } as CSSProperties} />
<g className="ink-fade" style={{ "--ink-delay": "1100ms", "--ink-dur": "350ms" } as CSSProperties}>
<g ref={penRef} transform="translate(44 286)">
<g transform="translate(4 5) rotate(-58)" fillOpacity="0.14" className="fill-primary"><path d="M0 0L15 -3.6L21 -4.2L52 -4.8L106 -5.2L106 5.2L52 4.8L21 4.2L15 3.6Z"/></g>
<g transform="rotate(-58)">
<path className="fill-muted-foreground" d="M0 0L15 -3.6L15 3.6Z"/>
<circle className="fill-ink" cx="0.6" cy="0" r="1.3"/>
<rect className="fill-muted-foreground" x="15" y="-4.3" width="6" height="8.6" rx="1"/>
<path className="fill-accent" d="M21 -4.2L52 -4.8L52 4.8L21 4.2Z"/>
<path className="stroke-primary fill-none" d="M28 -4.4L28 4.4M33 -4.5L33 4.5M38 -4.6L38 4.6M43 -4.7L43 4.7" strokeWidth="0.8" strokeOpacity="0.35"/>
<path className="fill-primary" d="M52 -4.8L106 -5.2L106 5.2L52 4.8Z"/>
<path className="stroke-secondary fill-none" d="M55 -2.6L103 -3" strokeWidth="1.2" strokeOpacity="0.55" strokeLinecap="round"/>
<rect className="fill-muted-foreground" x="72" y="-7.4" width="38" height="2.8" rx="1.4"/>
<circle className="fill-muted-foreground" cx="110" cy="-6" r="2"/>
<rect className="fill-muted-foreground" x="106" y="-3" width="8" height="6" rx="2"/>
</g></g></g>
      </svg>
    </div>
  );
}
