import { useEffect, useRef } from "react";

/**
 * Animated hero background inspired by CLEVER°FRANKE: a field of soft,
 * translucent circles in widely varied sizes — from tiny dots to large
 * glowing orbs — drifting slowly across a warm brown surface. Particles
 * are linked by bold, bright lines that read as a living network. Colors
 * come from computed CSS tokens so the palette always matches the theme.
 */
export function HeroAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const styles = getComputedStyle(document.documentElement);
    const lineColor = styles.getPropertyValue("--hero-line").trim() || "#e8c97a";
    const fallbacks = ["#f2c14e", "#f7e3b0", "#c98a4b", "#a0672f", "#f5f0e0", "#8a5a2e"];
    const palette = [
      "--hero-particle-1",
      "--hero-particle-2",
      "--hero-particle-3",
      "--hero-particle-4",
      "--hero-particle-5",
      "--hero-particle-6",
    ]
      .map((v) => styles.getPropertyValue(v).trim())
      .filter(Boolean);
    const colors = palette.length > 0 ? palette : fallbacks;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let raf = 0;
    let time = 0;
    let mobile = false;
    const mouse = { x: -9999, y: -9999, active: false };

    type Particle = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      big: boolean;
      alpha: number;
      color: string;
      phase: number;
    };
    let particles: Particle[] = [];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // a few large soft orbs plus many small dots — fewer on phones
      mobile = width < 768;
      const smallCount = mobile
        ? 22
        : Math.min(160, Math.max(70, Math.floor((width * height) / 11000)));
      const bigCount = mobile ? 4 : Math.min(26, Math.max(10, Math.floor((width * height) / 60000)));
      const make = (big: boolean): Particle => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * (big ? 0.22 : 0.5),
        vy: (Math.random() - 0.5) * (big ? 0.18 : 0.4),
        size: big ? 40 + Math.random() * 110 : 2.5 + Math.random() * 7,
        big,
        alpha: big ? 0.1 + Math.random() * 0.14 : 0.75 + Math.random() * 0.25,
        color: colors[Math.floor(Math.random() * colors.length)]!,
        phase: Math.random() * Math.PI * 2,
      });
      particles = [
        ...Array.from({ length: bigCount }, () => make(true)),
        ...Array.from({ length: smallCount }, () => make(false)),
      ];
    };

    const posOf = (p: Particle) => ({
      x: p.x + Math.sin(time * 0.4 + p.phase) * 10,
      y: p.y + Math.cos(time * 0.32 + p.phase) * 10,
    });

    const drawFrame = () => {
      ctx.clearRect(0, 0, width, height);

      // large soft orbs first, underneath everything — translucent,
      // overlapping, gently glowing
      for (const p of particles) {
        if (!p.big) continue;
        const { x, y } = posOf(p);
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, p.size);
        gradient.addColorStop(0, p.color);
        gradient.addColorStop(1, "transparent");
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // network of bold, bright lines between the small particles —
      // drawn additively so the lines emit light against the brown
      ctx.globalCompositeOperation = "lighter";
      ctx.strokeStyle = lineColor;
      const linkDist = mobile ? 95 : 190;
      const smalls = particles.filter((p) => !p.big);
      for (let i = 0; i < smalls.length; i++) {
        const a = posOf(smalls[i]!);
        for (let j = i + 1; j < smalls.length; j++) {
          const bp = smalls[j]!;
          if (Math.abs(a.x - bp.x) > linkDist || Math.abs(a.y - bp.y) > linkDist) continue;
          const b = posOf(bp);
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < linkDist) {
            const t = 1 - dist / linkDist;
            ctx.globalAlpha = t * (mobile ? 0.55 : 0.95);
            ctx.lineWidth = mobile ? 0.8 + 1.2 * t : 1.6 + 2.6 * t;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 1;

      // small bright dots on top, with a soft halo
      for (const p of particles) {
        if (p.big) continue;
        const { x, y } = posOf(p);
        p.x += p.vx;
        p.y += p.vy;
        if (p.x > width + 12) p.x = -12;
        if (p.x < -12) p.x = width + 12;
        if (p.y > height + 12) p.y = -12;
        if (p.y < -12) p.y = height + 12;

        const dx = x - mouse.x;
        const dy = y - mouse.y;
        const dist = Math.hypot(dx, dy);
        const near = mouse.active && dist < 200;

        ctx.beginPath();
        ctx.fillStyle = p.color;
        ctx.globalAlpha = near ? 1 : p.alpha;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 16;
        ctx.arc(x, y, near ? p.size * 1.7 : p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        if (near) {
          ctx.beginPath();
          ctx.strokeStyle = lineColor;
          ctx.globalAlpha = (1 - dist / 200) * 0.85;
          ctx.lineWidth = 2.2;
          ctx.moveTo(x, y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }
      ctx.globalAlpha = 1;

      // keep the big orbs drifting
      for (const p of particles) {
        if (!p.big) continue;
        p.x += p.vx;
        p.y += p.vy;
        if (p.x > width + p.size) p.x = -p.size;
        if (p.x < -p.size) p.x = width + p.size;
        if (p.y > height + p.size) p.y = -p.size;
        if (p.y < -p.size) p.y = height + p.size;
      }

      // soft glow following the cursor
      if (mouse.active) {
        const gradient = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 240);
        gradient.addColorStop(0, lineColor);
        gradient.addColorStop(1, "transparent");
        ctx.globalAlpha = 0.14;
        ctx.fillStyle = gradient;
        ctx.fillRect(mouse.x - 240, mouse.y - 240, 480, 480);
        ctx.globalAlpha = 1;
      }
    };

    const tick = () => {
      time += 0.016;
      drawFrame();
      raf = requestAnimationFrame(tick);
    };

    const onMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;
      mouse.active = true;
    };
    const onLeave = () => {
      mouse.active = false;
      mouse.x = -9999;
      mouse.y = -9999;
    };

    resize();
    // keep the drawing size in sync whenever the section height changes
    // (e.g. switching language shortens the headline)
    let lastW = width;
    let lastH = height;
    const observer = new ResizeObserver(() => {
      const rect = canvas.getBoundingClientRect();
      if (Math.abs(rect.width - lastW) < 1 && Math.abs(rect.height - lastH) < 1) return;
      resize();
      lastW = width;
      lastH = height;
      if (reduced) drawFrame();
    });
    observer.observe(canvas);
    const host = canvas.parentElement ?? canvas;
    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);

    if (reduced) {
      drawFrame(); // single static frame, no motion
    } else {
      raf = requestAnimationFrame(tick);
    }

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full" />;
}
