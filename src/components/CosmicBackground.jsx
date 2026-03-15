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

    const draw = (t) => {
      const time = (t - t0) * 0.001;
      ctx.clearRect(0, 0, width, height);

      ctx.fillStyle = isDark ? '#09090B' : '#FFFFFF';
      ctx.fillRect(0, 0, width, height);

      ctx.globalCompositeOperation = 'source-over';

      for (const orb of orbs) {
        const ox = orb.x + Math.sin(time * orb.vx * 10 + orb.phase) * 0.15;
        const oy = orb.y + Math.cos(time * orb.vy * 10 + orb.phase * 0.7) * 0.12;

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

        const orbIndex = orbs.indexOf(orb);
        if (orbIndex === 0 || orbIndex === 3) {
          grad.addColorStop(0, 'rgba(196, 40, 126, 0.18)');
          grad.addColorStop(0.4, 'rgba(196, 40, 126, 0.06)');
          grad.addColorStop(1, 'rgba(196, 40, 126, 0)');
        } else if (orbIndex === 1) {
          grad.addColorStop(0, 'rgba(99, 40, 196, 0.14)');
          grad.addColorStop(0.4, 'rgba(59, 130, 246, 0.05)');
          grad.addColorStop(1, 'rgba(59, 130, 246, 0)');
        } else if (orbIndex === 2) {
          grad.addColorStop(0, 'rgba(224, 77, 157, 0.12)');
          grad.addColorStop(0.4, 'rgba(245, 158, 11, 0.03)');
          grad.addColorStop(1, 'rgba(245, 158, 11, 0)');
        } else {
          grad.addColorStop(0, 'rgba(180, 30, 100, 0.15)');
          grad.addColorStop(0.4, 'rgba(140, 20, 80, 0.04)');
          grad.addColorStop(1, 'rgba(140, 20, 80, 0)');
        }

        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);
      }

      // Neural connection lines
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        a.x += a.vx;
        a.y += a.vy;
        a.pulse += 0.02;

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
            const pulsePos = (Math.sin(time * 2 + i * 0.5) * 0.5 + 0.5);

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

      // Node points
      for (const node of nodes) {
        const glow = Math.sin(node.pulse) * 0.5 + 0.5;
        const size = node.size * (0.8 + glow * 0.4);

        const nodeGrad = ctx.createRadialGradient(
          node.x * width, node.y * height, 0,
          node.x * width, node.y * height, size * 6
        );
        nodeGrad.addColorStop(0, `rgba(196, 40, 126, ${0.15 * glow})`);
        nodeGrad.addColorStop(1, 'rgba(196, 40, 126, 0)');
        ctx.fillStyle = nodeGrad;
        ctx.fillRect(node.x * width - size * 6, node.y * height - size * 6, size * 12, size * 12);

        ctx.beginPath();
        ctx.arc(node.x * width, node.y * height, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(224, 77, 157, ${0.3 + glow * 0.4})`;
        ctx.fill();
      }

      // Scan line
      ctx.globalCompositeOperation = 'overlay';
      const scanY = (time * 40) % height;
      const scanGrad = ctx.createLinearGradient(0, scanY - 60, 0, scanY + 60);
      scanGrad.addColorStop(0, 'rgba(196, 40, 126, 0)');
      scanGrad.addColorStop(0.5, 'rgba(196, 40, 126, 0.015)');
      scanGrad.addColorStop(1, 'rgba(196, 40, 126, 0)');
      ctx.fillStyle = scanGrad;
      ctx.fillRect(0, scanY - 60, width, 120);

      // Ambient glow
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

    const loop = (t) => {
      draw(t);
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
