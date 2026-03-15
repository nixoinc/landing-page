import { useEffect, useRef, useState } from 'react';

function useThemeDetect() {
  const [isDark, setIsDark] = useState(!document.documentElement.classList.contains('light'));

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(!document.documentElement.classList.contains('light'));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
    return () => observer.disconnect();
  }, []);

  return isDark;
}

export default function CosmicBackground() {
  const isDark = useThemeDetect();
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const animRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let width, height;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize);

    const handleMouse = (e) => {
      mouseRef.current.x = e.clientX / width;
      mouseRef.current.y = e.clientY / height;
    };
    window.addEventListener('mousemove', handleMouse);

    // Orb configuration
    const orbs = [
      { x: 0.2, y: 0.3, r: 0.35, vx: 0.012, vy: 0.008, phase: 0 },
      { x: 0.8, y: 0.2, r: 0.3, vx: -0.009, vy: 0.011, phase: 2 },
      { x: 0.5, y: 0.7, r: 0.4, vx: 0.007, vy: -0.01, phase: 4 },
      { x: 0.3, y: 0.8, r: 0.25, vx: -0.011, vy: -0.007, phase: 1.5 },
      { x: 0.7, y: 0.5, r: 0.32, vx: 0.008, vy: 0.013, phase: 3.2 },
    ];

    // Particle nodes for dark mode
    const nodes = Array.from({ length: 40 }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.0004,
      vy: (Math.random() - 0.5) * 0.0004,
      size: Math.random() * 2 + 1,
      pulse: Math.random() * Math.PI * 2,
    }));

    const t0 = performance.now();

    const drawDark = (t) => {
      const time = (t - t0) * 0.001;
      ctx.clearRect(0, 0, width, height);

      // Deep void base
      ctx.fillStyle = '#09090B';
      ctx.fillRect(0, 0, width, height);

      // Morphing gradient orbs with gooey blending
      ctx.globalCompositeOperation = 'screen';

      for (const orb of orbs) {
        const ox = orb.x + Math.sin(time * orb.vx * 10 + orb.phase) * 0.15;
        const oy = orb.y + Math.cos(time * orb.vy * 10 + orb.phase * 0.7) * 0.12;

        // Mouse influence
        const mx = mouseRef.current.x;
        const my = mouseRef.current.y;
        const dx = mx - ox;
        const dy = my - oy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const influence = Math.max(0, 1 - dist * 2) * 0.03;

        const fx = ox + dx * influence;
        const fy = oy + dy * influence;

        const px = fx * width;
        const py = fy * height;
        const pr = orb.r * Math.min(width, height) * (0.9 + Math.sin(time * 0.5 + orb.phase) * 0.1);

        const grad = ctx.createRadialGradient(px, py, 0, px, py, pr);

        // Different orbs get different color treatments
        const orbIndex = orbs.indexOf(orb);
        if (orbIndex === 0 || orbIndex === 3) {
          // Brand pink orbs
          grad.addColorStop(0, 'rgba(196, 40, 126, 0.18)');
          grad.addColorStop(0.4, 'rgba(196, 40, 126, 0.06)');
          grad.addColorStop(1, 'rgba(196, 40, 126, 0)');
        } else if (orbIndex === 1) {
          // Electric blue-violet
          grad.addColorStop(0, 'rgba(99, 40, 196, 0.14)');
          grad.addColorStop(0.4, 'rgba(59, 130, 246, 0.05)');
          grad.addColorStop(1, 'rgba(59, 130, 246, 0)');
        } else if (orbIndex === 2) {
          // Warm magenta-amber
          grad.addColorStop(0, 'rgba(224, 77, 157, 0.12)');
          grad.addColorStop(0.4, 'rgba(245, 158, 11, 0.03)');
          grad.addColorStop(1, 'rgba(245, 158, 11, 0)');
        } else {
          // Deep rose
          grad.addColorStop(0, 'rgba(180, 30, 100, 0.15)');
          grad.addColorStop(0.4, 'rgba(140, 20, 80, 0.04)');
          grad.addColorStop(1, 'rgba(140, 20, 80, 0)');
        }

        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);
      }

      // Neural connection lines between nearby nodes
      ctx.globalCompositeOperation = 'screen';
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        a.x += a.vx;
        a.y += a.vy;
        a.pulse += 0.02;

        // Bounce
        if (a.x < 0 || a.x > 1) a.vx *= -1;
        if (a.y < 0 || a.y > 1) a.vy *= -1;
        a.x = Math.max(0, Math.min(1, a.x));
        a.y = Math.max(0, Math.min(1, a.y));

        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = (a.x - b.x) * width;
          const dy = (a.y - b.y) * height;
          const d = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 180;

          if (d < maxDist) {
            const alpha = (1 - d / maxDist) * 0.08;
            // Pulse traveling along the line
            const pulsePos = (Math.sin(time * 2 + i * 0.5) * 0.5 + 0.5);
            const px = a.x * width + (b.x * width - a.x * width) * pulsePos;
            const py = a.y * height + (b.y * height - a.y * height) * pulsePos;

            const lineGrad = ctx.createLinearGradient(
              a.x * width, a.y * height,
              b.x * width, b.y * height
            );
            lineGrad.addColorStop(0, `rgba(196, 40, 126, ${alpha * 0.5})`);
            lineGrad.addColorStop(pulsePos, `rgba(196, 40, 126, ${alpha * 2})`);
            lineGrad.addColorStop(1, `rgba(196, 40, 126, ${alpha * 0.5})`);

            ctx.beginPath();
            ctx.moveTo(a.x * width, a.y * height);
            ctx.lineTo(b.x * width, b.y * height);
            ctx.strokeStyle = lineGrad;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Draw node points
      for (const node of nodes) {
        const glow = Math.sin(node.pulse) * 0.5 + 0.5;
        const size = node.size * (0.8 + glow * 0.4);

        // Outer glow
        const nodeGrad = ctx.createRadialGradient(
          node.x * width, node.y * height, 0,
          node.x * width, node.y * height, size * 6
        );
        nodeGrad.addColorStop(0, `rgba(196, 40, 126, ${0.15 * glow})`);
        nodeGrad.addColorStop(1, 'rgba(196, 40, 126, 0)');
        ctx.fillStyle = nodeGrad;
        ctx.fillRect(node.x * width - size * 6, node.y * height - size * 6, size * 12, size * 12);

        // Core dot
        ctx.beginPath();
        ctx.arc(node.x * width, node.y * height, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(224, 77, 157, ${0.3 + glow * 0.4})`;
        ctx.fill();
      }

      // Subtle scan line effect
      ctx.globalCompositeOperation = 'overlay';
      const scanY = (time * 40) % height;
      const scanGrad = ctx.createLinearGradient(0, scanY - 60, 0, scanY + 60);
      scanGrad.addColorStop(0, 'rgba(196, 40, 126, 0)');
      scanGrad.addColorStop(0.5, 'rgba(196, 40, 126, 0.015)');
      scanGrad.addColorStop(1, 'rgba(196, 40, 126, 0)');
      ctx.fillStyle = scanGrad;
      ctx.fillRect(0, scanY - 60, width, 120);

      // Top-down ambient glow
      ctx.globalCompositeOperation = 'screen';
      const ambientGrad = ctx.createRadialGradient(
        width * 0.5 + Math.sin(time * 0.3) * 100, -height * 0.1,
        0,
        width * 0.5, height * 0.3,
        height * 0.7
      );
      ambientGrad.addColorStop(0, 'rgba(196, 40, 126, 0.06)');
      ambientGrad.addColorStop(0.5, 'rgba(120, 20, 80, 0.02)');
      ambientGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = ambientGrad;
      ctx.fillRect(0, 0, width, height);

      ctx.globalCompositeOperation = 'source-over';
    };

    const drawLight = (t) => {
      const time = (t - t0) * 0.001;
      ctx.clearRect(0, 0, width, height);

      // Warm white base
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, width, height);

      ctx.globalCompositeOperation = 'multiply';

      // Flowing silk ribbons — layered curved gradient bands
      for (let i = 0; i < 5; i++) {
        const yBase = height * (0.15 + i * 0.18);
        const amplitude = height * (0.08 + i * 0.02);
        const freq = 0.002 + i * 0.0005;
        const speed = 0.3 + i * 0.08;
        const phaseOffset = i * 1.3;

        ctx.beginPath();
        ctx.moveTo(-50, yBase);

        for (let x = -50; x <= width + 50; x += 3) {
          const wave1 = Math.sin(x * freq + time * speed + phaseOffset) * amplitude;
          const wave2 = Math.sin(x * freq * 1.7 + time * speed * 0.6 + phaseOffset * 2) * amplitude * 0.4;
          const mouseInfluence = Math.sin((x / width) * Math.PI) * (mouseRef.current.y - 0.5) * 30;
          const y = yBase + wave1 + wave2 + mouseInfluence;
          ctx.lineTo(x, y);
        }

        ctx.lineTo(width + 50, height + 50);
        ctx.lineTo(-50, height + 50);
        ctx.closePath();

        const ribbonGrad = ctx.createLinearGradient(0, yBase - amplitude, 0, yBase + amplitude);

        if (i === 0) {
          ribbonGrad.addColorStop(0, 'rgba(255, 240, 248, 0.6)');
          ribbonGrad.addColorStop(1, 'rgba(252, 231, 243, 0.3)');
        } else if (i === 1) {
          ribbonGrad.addColorStop(0, 'rgba(252, 231, 243, 0.4)');
          ribbonGrad.addColorStop(1, 'rgba(245, 208, 230, 0.2)');
        } else if (i === 2) {
          ribbonGrad.addColorStop(0, 'rgba(248, 220, 236, 0.35)');
          ribbonGrad.addColorStop(1, 'rgba(240, 200, 224, 0.15)');
        } else if (i === 3) {
          ribbonGrad.addColorStop(0, 'rgba(245, 215, 235, 0.3)');
          ribbonGrad.addColorStop(1, 'rgba(235, 195, 220, 0.1)');
        } else {
          ribbonGrad.addColorStop(0, 'rgba(240, 210, 230, 0.25)');
          ribbonGrad.addColorStop(1, 'rgba(230, 190, 215, 0.08)');
        }

        ctx.fillStyle = ribbonGrad;
        ctx.fill();
      }

      // Prismatic caustic light refractions
      ctx.globalCompositeOperation = 'screen';

      for (let i = 0; i < 3; i++) {
        const cx = width * (0.3 + i * 0.2) + Math.sin(time * 0.4 + i * 2) * 120;
        const cy = height * (0.2 + i * 0.15) + Math.cos(time * 0.3 + i * 1.5) * 80;
        const cr = Math.min(width, height) * (0.25 + Math.sin(time * 0.2 + i) * 0.05);

        const causticGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, cr);

        if (i === 0) {
          causticGrad.addColorStop(0, 'rgba(196, 40, 126, 0.06)');
          causticGrad.addColorStop(0.3, 'rgba(224, 77, 157, 0.03)');
          causticGrad.addColorStop(0.7, 'rgba(245, 158, 200, 0.01)');
          causticGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
        } else if (i === 1) {
          causticGrad.addColorStop(0, 'rgba(180, 140, 255, 0.04)');
          causticGrad.addColorStop(0.4, 'rgba(200, 170, 255, 0.02)');
          causticGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
        } else {
          causticGrad.addColorStop(0, 'rgba(255, 200, 150, 0.04)');
          causticGrad.addColorStop(0.4, 'rgba(255, 220, 180, 0.02)');
          causticGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
        }

        ctx.fillStyle = causticGrad;
        ctx.fillRect(0, 0, width, height);
      }

      // Iridescent shimmer bands — diagonal light streaks
      ctx.globalCompositeOperation = 'overlay';
      for (let i = 0; i < 3; i++) {
        const angle = -0.3 + i * 0.15;
        const offset = Math.sin(time * 0.5 + i * 2.1) * 200;

        ctx.save();
        ctx.translate(width * 0.5, height * 0.5);
        ctx.rotate(angle);

        const bandWidth = 300 + i * 50;
        const bandY = offset + i * 150 - 200;

        const shimmerGrad = ctx.createLinearGradient(0, bandY - bandWidth / 2, 0, bandY + bandWidth / 2);
        shimmerGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
        shimmerGrad.addColorStop(0.3, `rgba(196, 40, 126, ${0.015 - i * 0.003})`);
        shimmerGrad.addColorStop(0.5, `rgba(255, 255, 255, ${0.03 - i * 0.005})`);
        shimmerGrad.addColorStop(0.7, `rgba(180, 140, 255, ${0.012 - i * 0.002})`);
        shimmerGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.fillStyle = shimmerGrad;
        ctx.fillRect(-width, bandY - bandWidth / 2, width * 2, bandWidth);
        ctx.restore();
      }

      // Soft floating orbs (like bokeh)
      ctx.globalCompositeOperation = 'multiply';
      for (let i = 0; i < 6; i++) {
        const bx = width * (0.1 + i * 0.16) + Math.sin(time * 0.2 + i * 1.8) * 60;
        const by = height * (0.3 + (i % 3) * 0.2) + Math.cos(time * 0.15 + i * 2.2) * 40;
        const br = 40 + i * 15 + Math.sin(time * 0.3 + i) * 10;

        const bokehGrad = ctx.createRadialGradient(bx, by, 0, bx, by, br);
        bokehGrad.addColorStop(0, 'rgba(252, 240, 248, 0.7)');
        bokehGrad.addColorStop(0.6, 'rgba(250, 235, 245, 0.3)');
        bokehGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.fillStyle = bokehGrad;
        ctx.beginPath();
        ctx.arc(bx, by, br, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalCompositeOperation = 'source-over';
    };

    const loop = (t) => {
      if (isDark) {
        drawDark(t);
      } else {
        drawLight(t);
      }
      animRef.current = requestAnimationFrame(loop);
    };

    animRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouse);
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      className="cosmic-bg"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}
