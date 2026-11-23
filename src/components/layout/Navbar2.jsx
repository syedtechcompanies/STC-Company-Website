import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function Navbar2() {
  const navigate = useNavigate();

  const [activeLink, setActiveLink] = useState("HOME");
  const [menuOpen, setMenuOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const [showBottomFade, setShowBottomFade] = useState(false); // "more content below" hint

  const navbarRef = useRef(null);
  const mobileMenuRef = useRef(null);

  // Collapse navbar on scroll down, expand on scroll up
  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      window.requestAnimationFrame(() => {
        const currentY = window.scrollY;
        // Ignore tiny scroll jitters (rubber-banding on mobile)
        if (Math.abs(currentY - lastY) > 4) {
          setIsExpanded(currentY < lastY || currentY < 40);
          lastY = currentY;
        }
        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        menuOpen &&
        navbarRef.current &&
        !navbarRef.current.contains(e.target)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [menuOpen]);

  // Close menus on Escape, and lock body scroll while mobile menu is open
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Close mobile menu on viewport resize past the lg breakpoint
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Show a bottom fade whenever there's more menu content below the fold —
  // makes it obvious the panel scrolls instead of looking like it's just cut off.
  function checkOverflow() {
    const el = mobileMenuRef.current;
    if (!el) return;
    setShowBottomFade(el.scrollHeight - el.scrollTop - el.clientHeight > 4);
  }

  useEffect(() => {
    if (!menuOpen) return;
    const timer = setTimeout(checkOverflow, 320); // wait for slide-down entrance
    window.addEventListener("resize", checkOverflow);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", checkOverflow);
    };
  }, [menuOpen]);

  const navLink = (label, path, key = label) => (
    <button
      key={key}
      onClick={() => {
        setActiveLink(key);
        navigate(path);
      }}
      className="relative px-3 py-1.5 text-sm font-medium rounded-full group"
    >
      <span
        className={`block transition-all duration-300 group-hover:-translate-y-full group-hover:opacity-0 ${
          activeLink === key ? "text-gray-900" : "text-gray-500"
        }`}
      >
        {label}
      </span>
      <span className="absolute inset-0 flex items-center justify-center translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 text-indigo-500 transition-all duration-300">
        {label}
      </span>
    </button>
  );

  const mobileLink = (label, path, key = label) => (
    <button
      key={key}
      onClick={() => {
        setActiveLink(key);
        navigate(path);
        setMenuOpen(false);
      }}
      className="relative w-full py-3 text-center rounded-xl overflow-hidden group"
    >
      <span
        className={`block transition-all duration-300 group-hover:-translate-y-full group-hover:opacity-0 ${
          activeLink === key ? "text-gray-900 font-medium" : "text-gray-600"
        }`}
      >
        {label}
      </span>
      <span className="absolute inset-0 flex items-center justify-center translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 text-indigo-600 font-medium">
        {label}
      </span>
    </button>
  );

  return (
    <>
      <nav
        ref={navbarRef}
        className="fixed top-3 sm:top-5 left-1/2 -translate-x-1/2 z-50 flex items-center bg-white/95 backdrop-blur-md rounded-full border border-gray-200 shadow-lg max-w-[calc(100vw-24px)]"
        style={{
          height: "55px",
          paddingLeft: "10px",
          paddingRight: "10px",
          width: "max-content",
          justifyContent: "space-between",
          gap: "8px",
          overflow: "visible",
          transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        <button
          type="button"
          onClick={() => navigate("/")}
          aria-label="Syed Tec Company home"
          className="rounded-full overflow-hidden bg-blue-50 border-2 border-white shadow-sm shrink-0"
          style={{
            width: isExpanded ? "48px" : "36px",
            height: isExpanded ? "48px" : "36px",
            transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)",
          }}
        >
          <img
            src="/assets/stc.png"
            alt="STC"
            className="w-full h-full object-contain"
          />
        </button>

        {/* Status */}
        <div
          className="items-center gap-2 px-3 py-1.5 bg-green-50 rounded-full shrink-0 hidden sm:flex"
          style={{
            whiteSpace: "nowrap",
            opacity: isExpanded ? 0 : 1,
            pointerEvents: isExpanded ? "none" : "auto",
            maxWidth: isExpanded ? "0px" : "220px",
            overflow: "hidden",
            padding: isExpanded ? "0" : undefined,
            transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)",
          }}
        >
          <span className="text-sm text-gray-700 whitespace-nowrap">
            Available for Work
          </span>
          <span className="w-2.5 h-2.5 bg-green-500 rounded-full inline-block ml-1 animate-pulse" />
        </div>

        {/* Desktop Links */}
        <div
          className="items-center shrink-0 lg:flex hidden"
          style={{
            gap: "4px",
            opacity: isExpanded ? 1 : 0,
            maxWidth: isExpanded ? "600px" : "0px",
            overflow: "visible",
            pointerEvents: isExpanded ? "auto" : "none",
            transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)",
          }}
        >
          {navLink("HOME", "/", "HOME")}
          {navLink("ABOUT", "/about", "ABOUT")}
          {navLink("PROJECTS", "/projects", "PROJECTS")}
          {navLink("SERVICES", "/services", "SERVICES")}
          {navLink("TEAM", "/team", "TEAM")}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Contact */}
          <button
            onClick={() => navigate("/contact")}
            className="lg:block hidden px-4 h-9 rounded-full text-white text-sm bg-gray-900 hover:bg-gray-800"
            style={{
              opacity: isExpanded ? 1 : 0,
              maxWidth: isExpanded ? "120px" : "0px",
              overflow: "hidden",
              pointerEvents: isExpanded ? "auto" : "none",
              padding: isExpanded ? undefined : "0",
              transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)",
            }}
          >
            CONTACT
          </button>

          {/* Hamburger */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpen((prev) => !prev);
            }}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            className="lg:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5 rounded-full hover:bg-gray-100"
          >
            <span
              className={`w-5 h-0.5 bg-gray-800 rounded-full transition-all duration-300 ${
                menuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`w-5 h-0.5 bg-gray-800 rounded-full transition-all duration-300 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`w-5 h-0.5 bg-gray-800 rounded-full transition-all duration-300 ${
                menuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/20 z-40 lg:hidden animate-fadeIn"
            onClick={() => setMenuOpen(false)}
          />
          <div
            className="fixed z-50 lg:hidden bg-white rounded-2xl border border-gray-200 shadow-xl animate-slideDown overflow-hidden"
            style={{
              top: "calc(70px + env(safe-area-inset-top))",
              left: "50%",
              transform: "translateX(-50%)",
              width: "calc(100% - 32px)",
              maxWidth: "min(92vw, 440px)",
              maxHeight:
                "calc(100dvh - 100px - env(safe-area-inset-top) - env(safe-area-inset-bottom))",
            }}
          >
            <div
              ref={mobileMenuRef}
              onScroll={checkOverflow}
              className="dropdown-scroll h-full overflow-y-auto overscroll-contain p-4 flex flex-col gap-2"
              style={{
                paddingBottom: "calc(1rem + env(safe-area-inset-bottom))",
              }}
            >
            {mobileLink("HOME", "/", "HOME")}
            {mobileLink("ABOUT", "/about", "ABOUT")}
            {mobileLink("PROJECTS", "/projects", "PROJECTS")}
            {mobileLink("SERVICES", "/services", "SERVICES")}
            {mobileLink("TEAM", "/team", "TEAM")}

            <div className="h-px bg-gray-100 my-1" />

            <button
              onClick={() => {
                navigate("/contact");
                setMenuOpen(false);
              }}
              className="relative w-full py-3 text-center rounded-xl overflow-hidden group mt-1"
            >
              <span className="block transition-all duration-300 group-hover:-translate-y-full group-hover:opacity-0 bg-gray-900 text-white font-medium rounded-xl py-3">
                CONTACT
              </span>
              <span className="absolute inset-0 flex items-center justify-center translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 bg-indigo-600 text-white font-medium rounded-xl">
                CONTACT
              </span>
            </button>
            </div>

            {/* "More below" hint — fades in only while the panel actually has
                unscrolled content, and fades out once you reach the bottom
                (e.g. once CONTACT is fully visible). Sits above the scroll
                layer so it never scrolls away itself. */}
            <div
              aria-hidden="true"
              className={`pointer-events-none absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-white to-transparent transition-opacity duration-200 ${
                showBottomFade ? "opacity-100" : "opacity-0"
              }`}
            />
          </div>
        </>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(-16px) scale(0.97);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0) scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        .animate-slideDown {
          animation: slideDown 0.35s cubic-bezier(0.22, 1, 0.36, 1);
        }

        /* Smooth, minimal scrollbar for the Pages dropdowns */
        .dropdown-scroll {
          scroll-behavior: smooth;
          scrollbar-width: thin;
          scrollbar-color: #d1d5db transparent;
        }
        .dropdown-scroll::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .dropdown-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .dropdown-scroll::-webkit-scrollbar-thumb {
          background-color: #d1d5db;
          border-radius: 9999px;
        }
        .dropdown-scroll::-webkit-scrollbar-thumb:hover {
          background-color: #9ca3af;
        }
      `}</style>
    </>
  );
}

export default Navbar2;