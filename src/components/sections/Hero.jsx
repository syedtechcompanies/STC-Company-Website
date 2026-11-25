import {
  Code2,
  Palette,
  Film,
  ShieldCheck,
  Sparkles,
  Atom,
  Cpu,
  Smartphone,
  PenTool,
  Box,
} from "lucide-react";

import { Link } from "react-router-dom";
import React, { useEffect, useState, useRef } from "react";

import {
  blenderSvg,
  premierProSvg,
  reactSvg,
  shopifySvg,
} from "../../constants/icons";

const MARQUEE_ITEMS = [
  { label: "Web Development", icon: Code2 },
  { label: "Product Design", icon: Palette },
  { label: "Motion & Video", icon: Film },
  { label: "Cybersecurity", icon: ShieldCheck },
  { label: "Digital Strategy", icon: Sparkles },
  { label: "React Applications", icon: Atom },
  { label: "Custom Software", icon: Cpu },
  { label: "Mobile Applications", icon: Smartphone },
  { label: "Brand Identity", icon: PenTool },
  { label: "3D Visualization", icon: Box },
];

const FLOAT_ICONS = [
  {
    id: "blender",
    side: "left",
    top: "12%",
    offset: "clamp(1rem, 6vw, 6rem)",
    rotation: -6,
    bobDuration: "4s",
    delay: 0.3,
    svg: blenderSvg,
  },
  {
    id: "code",
    side: "left",
    top: "58%",
    offset: "clamp(1rem, 6vw, 6rem)",
    rotation: 8,
    bobDuration: "5s",
    delay: 0.6,
    svg: reactSvg,
  },
  {
    id: "premier-pro",
    side: "right",
    top: "12%",
    offset: "clamp(1rem, 6vw, 6rem)",
    rotation: 7,
    bobDuration: "4.5s",
    delay: 0.5,
    svg: premierProSvg,
  },
  {
    id: "shopify",
    side: "right",
    top: "58%",
    offset: "clamp(1rem, 6vw, 6rem)",
    rotation: -5,
    bobDuration: "3.8s",
    delay: 0.8,
    svg: shopifySvg,
  },
];

// ─────────────────────────────────────────────────────────
// Particle Background
// ─────────────────────────────────────────────────────────

class Particle {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.reset();
  }

  reset() {
    this.x = Math.random() * this.canvas.width;
    this.y = Math.random() * this.canvas.height;
    this.size = Math.random() * 1.5 + 0.4;
    this.vx = Math.random() * 0.35 - 0.175;
    this.vy = Math.random() * 0.35 - 0.175;
    this.opacity = Math.random() * 0.4 + 0.1;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0 || this.x > this.canvas.width) this.vx *= -1;
    if (this.y < 0 || this.y > this.canvas.height) this.vy *= -1;
  }

  draw() {
    this.ctx.globalAlpha = this.opacity;
    this.ctx.fillStyle = "#9ca3af";
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    this.ctx.fill();
  }
}

const ParticleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let particles = [];
    let rafId;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const init = () => {
      resize();

      particles = [];

      const count = Math.min(Math.floor(canvas.width / 14), 90);

      for (let i = 0; i < count; i++) {
        particles.push(new Particle(canvas, ctx));
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.globalAlpha = 1;

      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      rafId = requestAnimationFrame(animate);
    };

    const ro = new ResizeObserver(init);

    ro.observe(canvas);

    init();
    animate();

    return () => {
      ro.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-55 z-0"
    />
  );
};

// ─────────────────────────────────────────────────────────
// Floating Icon
// ─────────────────────────────────────────────────────────

const FloatIcon = ({ icon }) => {
  const [phase, setPhase] = useState("hidden");

  const [isLg, setIsLg] = useState(() => window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => setIsLg(window.innerWidth >= 1024);

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("sliding"), icon.delay * 1000 + 600);

    const t2 = setTimeout(
      () => setPhase("bobbing"),
      icon.delay * 1000 + 600 + 750,
    );

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [icon.delay]);

  if (!isLg) return null;

  const posStyle =
    icon.side === "left"
      ? {
          top: icon.top,
          left: icon.offset,
        }
      : {
          top: icon.top,
          right: icon.offset,
        };

  const slideFrom =
    icon.side === "left"
      ? `calc(-${icon.offset} - 56px)`
      : `calc(${icon.offset} + 56px)`;

  const getTransform = () => {
    if (phase === "hidden") {
      return `translateX(${slideFrom}) rotate(${icon.rotation}deg)`;
    }

    if (phase === "sliding") {
      return `translateX(0px) rotate(${icon.rotation}deg)`;
    }

    return undefined;
  };

  return (
    <div
      className="
            absolute
            hidden lg:flex
            items-center
            justify-center
            w-20
            h-20
            rounded-2xl
            bg-white/75
            border
            border-black/[0.07]
            backdrop-blur-lg
            p-2
            shadow-lg
            "
      style={{
        ...posStyle,
        transform: phase !== "bobbing" ? getTransform() : undefined,

        transition:
          phase === "sliding"
            ? "transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)"
            : "none",

        animation:
          phase === "bobbing"
            ? `floatBob ${icon.bobDuration} ease-in-out infinite`
            : "none",

        "--rot": `${icon.rotation}deg`,
        zIndex: 4,
      }}
    >
      <img
        src={icon.svg}
        alt={icon.id}
        className="w-full h-full object-contain"
      />
    </div>
  );
};

// ─────────────────────────────────────────────────────────
// Infinite Marquee
// ─────────────────────────────────────────────────────────

const InfiniteMarquee = ({ items = [], speed = 20 }) => {
  const tripled = [...items, ...items, ...items];

  return (
    <div className="relative w-full overflow-hidden py-4">
      {/* Left Fade */}
      <div
        className="absolute left-0 top-0 bottom-0 w-20 sm:w-28 lg:w-36 z-10 pointer-events-none"
        style={{
          background: "linear-gradient(to right, #eff6ff, transparent)",
        }}
      />

      {/* Right Fade */}
      <div
        className="absolute right-0 top-0 bottom-0 w-20 sm:w-28 lg:w-36 z-10 pointer-events-none"
        style={{
          background: "linear-gradient(to left, #eff6ff, transparent)",
        }}
      />

      {/* Track */}
      <div
        className="flex w-max gap-4"
        style={{
          animation: `marqueeRTL ${speed}s linear infinite`,
        }}
      >
        {tripled.map((item, i) => {
          const Icon = item.icon;

          return (
            <div
              key={i}
              className="
                            flex
                            items-center
                            gap-2
                            px-4
                            py-2
                            rounded-full
                            bg-white/5
                            backdrop-blur-md
                            border
                            border-white/10
                            text-sm
                            text-text-muted
                            shrink-0
                            "
            >
              <Icon size={16} className="text-primary" />

              <span>{item.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────
// Hero Section
// ─────────────────────────────────────────────────────────

const HeroSection = () => {
  const [bodyVisible, setBodyVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      setBodyVisible(true);
    }, 200);

    return () => clearTimeout(t);
  }, []);

  return (
    <section
      className="
            relative
            min-h-[620px]
            lg:min-h-[680px]
            w-full
            flex
            flex-col
            overflow-hidden
            "
    >
      <style>{`
                @keyframes marqueeRTL {
                    from {
                        transform: translateX(-33.333%);
                    }

                    to {
                        transform: translateX(0);
                    }
                }

                @keyframes floatBob {
                    0%, 100% {
                        transform: translateY(0px) rotate(var(--rot, 0deg));
                    }

                    50% {
                        transform: translateY(-10px) rotate(var(--rot, 0deg));
                    }
                }

                @keyframes pingAnim {
                    0% {
                        transform: scale(1);
                        opacity: 0.4;
                    }

                    100% {
                        transform: scale(2.4);
                        opacity: 0;
                    }
                }
            `}</style>

      <ParticleBackground />

      {/* Floating Icons */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        {FLOAT_ICONS.map((icon, idx) => (
          <FloatIcon key={idx} icon={icon} />
        ))}
      </div>

      {/* Main Content */}
      <div
        className="
                flex-1
                flex
                items-center
                justify-center
                w-full
                relative
                z-10
                px-3
                sm:px-4
                lg:px-6
                py-8
                sm:py-10
                transition-all
                duration-700
                "
        style={{
          opacity: bodyVisible ? 1 : 0,
          transform: bodyVisible ? "translateY(0)" : "translateY(24px)",
        }}
      >
        <div
          className="
                    relative
                    flex
                    flex-col
                    items-center
                    text-center
                    w-full
                    max-w-7xl
                    mx-auto
                    "
        >
          {/* Decorative Background */}
          <div
            className="
                        absolute
                        inset-0
                        rounded-3xl
                        pointer-events-none
                        backdrop-blur-xl
                        border
                        border-blue-200/30
                        "
            style={{
              background: "rgba(219, 234, 254, 0.35)",

              maskImage:
                "linear-gradient(to bottom, black 55%, transparent 100%)",

              WebkitMaskImage:
                "linear-gradient(to bottom, black 55%, transparent 100%)",

              zIndex: 0,
            }}
          />

          {/* Content */}
          <div
            className="
                        relative
                        z-10
                        w-full
                        px-4
                        sm:px-6
                        lg:px-10
                        py-8
                        sm:py-10
                        flex
                        flex-col
                        items-center
                        "
          >
            {/* Badge */}
            <div
              className="
                            inline-flex
                            items-center
                            gap-2
                            mb-6
                            px-4
                            py-1.5
                            rounded-full
                            text-indigo-600
                            text-[0.68rem]
                            font-bold
                            tracking-[0.18em]
                            uppercase
                            border
                            border-indigo-200/50
                            bg-white/60
                            backdrop-blur-md
                            "
            >
              <span className="relative inline-block w-2 h-2">
                <span
                  className="
                                    absolute
                                    inset-0
                                    rounded-full
                                    bg-indigo-500
                                    opacity-40
                                    "
                  style={{
                    animation: "pingAnim 1.5s ease-in-out infinite",
                  }}
                />

                <span
                  className="
                                    absolute
                                    inset-0
                                    rounded-full
                                    bg-indigo-500
                                    "
                />
              </span>
              Purpose-built digital solutions
            </div>

            {/* Heading */}
            <h1
              className="
                            w-full
                            max-w-[95%]
                            sm:max-w-3xl
                            lg:max-w-5xl
                            font-bold
                            leading-[1.1]
                            tracking-tight
                            text-gray-700
                            mb-4
                            "
              style={{
                fontSize: "clamp(2rem, 4vw, 4.5rem)",

                letterSpacing: "-0.025em",
              }}
            >
              <span
                className="block"
                style={{
                  background:
                    "linear-gradient(to right, #404040 25%, #0e7490 100%)",

                  WebkitBackgroundClip: "text",

                  WebkitTextFillColor: "transparent",

                  backgroundClip: "text",
                }}
              >
                From Bold Ideas to
              </span>

              <span
                className="block"
                style={{
                  background:
                    "linear-gradient(to right, #404040 25%, #0e7490 100%)",

                  WebkitBackgroundClip: "text",

                  WebkitTextFillColor: "transparent",

                  backgroundClip: "text",
                }}
              >
                Digital Experiences That Matter.
              </span>
            </h1>

            {/* Subtitle */}
            <p
              className="
                            leading-relaxed
                            w-full
                            max-w-[95%]
                            sm:max-w-2xl
                            mb-8
                            text-[#404040]
                            px-1
                            "
              style={{
                fontSize: "clamp(0.95rem, 2vw, 1.08rem)",
              }}
            >
              Syed Tech Company helps businesses turn complex challenges into
              intuitive websites, mobile apps, and custom software—built for
              lasting impact in <strong className="text-gray-900 font-semibold">Bannu</strong>.
            </p>

            {/* Buttons */}
            <div
              className="
                            flex
                            flex-col
                            sm:flex-row
                            gap-3
                            w-full
                            sm:w-auto
                            justify-center
                            items-center
                            "
            >
              <Link
                to="/contact"
                className="
                                bg-gray-900
                                text-white
                                w-full
                                sm:w-auto
                                px-8
                                py-3
                                rounded-full
                                text-sm
                                font-semibold
                                cursor-pointer
                                transition-opacity
                                duration-200
                                hover:opacity-85
                                border-none
                                "
              >
                Start a Project
              </Link>

              <Link to="/services" className="w-full sm:w-auto">
                <span
                  className="
                                    bg-transparent
                                    text-gray-900
                                    w-full
                                    sm:w-auto
                                    px-8
                                    py-3
                                    rounded-full
                                    text-sm
                                    font-semibold
                                    cursor-pointer
                                    border-[1.5px]
                                    border-gray-900
                                    hover:bg-gray-900
                                    hover:text-white
                                    transition-all
                                    duration-200
                                    "
                >
                  View Our Expertise
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Marquee */}
      <div className="relative z-10 pb-3 lg:pb-6">
        <InfiniteMarquee items={MARQUEE_ITEMS} speed={20} />
      </div>
    </section>
  );
};

export default HeroSection;
