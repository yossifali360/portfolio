"use client";
import { memo, useLayoutEffect, useRef } from "react";
import gsap from "gsap";

function strokeLength(el: SVGGeometryElement): number {
  const len = el.getTotalLength();
  return Number.isFinite(len) && len > 0 ? len : 0.01;
}

function YALoader({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const onCompleteRef = useRef(onComplete);

  useLayoutEffect(() => {
    onCompleteRef.current = onComplete;
  });

  useLayoutEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const ctx = gsap.context(() => {
      const shapes = svg.querySelectorAll("path, circle");
      if (!shapes.length) return;

      shapes.forEach((node) => {
        const el = node as SVGGeometryElement;
        const length = strokeLength(el);
        gsap.set(el, {
          strokeDasharray: length,
          strokeDashoffset: length,
          autoAlpha: 0,
        });
      });

      // Reveal SVG only after strokes are hidden (avoids cap “dots” before JS runs)
      gsap.set(svg, { autoAlpha: 1 });

      const tl = gsap.timeline({
        onComplete: () => {
          const el = containerRef.current;
          if (!el) {
            onCompleteRef.current();
            return;
          }
          gsap.to(el, {
            autoAlpha: 0,
            yPercent: -18,
            duration: 0.85,
            ease: "power3.inOut",
            onComplete: () => onCompleteRef.current(),
          });
        },
      });

      tl.to(shapes, {
        autoAlpha: 1,
        duration: 0.08,
      }).to(shapes, {
        strokeDashoffset: 0,
        duration: 1.9,
        ease: "expo.inOut",
        stagger: 0.055,
      });
    }, svg);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-100 flex items-center justify-center overflow-hidden bg-[#0a0a0b]"
    >
      <svg
        ref={svgRef}
        width="400"
        height="400"
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="invisible opacity-0 h-[min(56vh,400px)] w-[min(56vh,400px)] max-w-[92vw]"
        style={{ opacity: 0, visibility: "hidden" }}
        aria-hidden
      >
        <circle
          cx="200"
          cy="200"
          r="168"
          stroke="rgba(250,250,250,0.9)"
          strokeWidth="2.5"
          fill="none"
        />
        <circle
          cx="200"
          cy="200"
          r="156"
          stroke="rgba(250,250,250,0.35)"
          strokeWidth="2"
          fill="none"
        />

        <g transform="translate(-1 21)">
          <g fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path
              d="M 118 138 L 96 170 L 118 202"
              stroke="#fafafa"
              strokeWidth="3.75"
            />
            <g transform="translate(-28 0)">
              <g transform="translate(208,198) skewX(-12) translate(-208,-198)">
                <path
                  d="M 156 116 L 184 158"
                  stroke="#fafafa"
                  strokeWidth="16"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M 228 116 L 184 158 L 184 222"
                  stroke="#fafafa"
                  strokeWidth="16"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                <path
                  d="M 212 224 L 238 126 L 264 224"
                  stroke="#fafafa"
                  strokeWidth="16"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M 224 188 H 252"
                  stroke="#fafafa"
                  strokeWidth="13"
                  strokeLinecap="round"
                />
              </g>
              <path
                d="M 288 138 L 298 202"
                stroke="rgba(250,250,250,0.9)"
                strokeWidth="3.75"
              />
              <path
                d="M 312 138 L 334 170 L 312 202"
                stroke="#fafafa"
                strokeWidth="3.75"
              />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}

export default memo(YALoader);
