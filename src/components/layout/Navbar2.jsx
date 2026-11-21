import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function Navbar2() {
  const navigate = useNavigate();

  const [activeLink, setActiveLink] = useState("HOME");
  const [menuOpen, setMenuOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const [pagesDropdownOpen, setPagesDropdownOpen] = useState(false); // desktop "PAGES" dropdown
  const [pagesOpen, setPagesOpen] = useState(false); // mobile "PAGES" accordion
  const [showBottomFade, setShowBottomFade] = useState(false); // "more content below" hint
  const [pagesScrollFade, setPagesScrollFade] = useState({ left: false, right: false }); // horizontal scroll hint

  const navbarRef = useRef(null);
  const pagesDropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const mobilePagesSectionRef = useRef(null);
  const mobilePagesScrollRef = useRef(null); // horizontal PAGES row

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
      if (
        pagesDropdownOpen &&
        pagesDropdownRef.current &&
        !pagesDropdownRef.current.contains(e.target)
      ) {
        setPagesDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [menuOpen, pagesDropdownOpen]);

  // Close menus on Escape, and lock body scroll while mobile menu is open
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setPagesDropdownOpen(false);
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
        setPagesOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // When the mobile "PAGES" accordion opens, bring it fully into view instead
  // of leaving its top (or the links below it) clipped by the menu's own scroll area.
  useEffect(() => {
    if (!pagesOpen) return;
    const timer = setTimeout(() => {
      mobilePagesSectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
      checkOverflow();
      checkPagesScrollFade();
    }, 260); // wait for the accordion's height transition to finish
    return () => clearTimeout(timer);
  }, [pagesOpen]);

  // Reset the accordion state whenever the mobile menu itself closes
  useEffect(() => {
    if (!menuOpen) setPagesOpen(false);
  }, [menuOpen]);

  // Show a bottom fade whenever there's more menu content below the fold —
  // makes it obvious the panel scrolls instead of looking like it's just cut off.
  function checkOverflow() {
    const el = mobileMenuRef.current;
    if (!el) return;
    setShowBottomFade(el.scrollHeight - el.scrollTop - el.clientHeight > 4);
  }

  // Same idea, but for the horizontal PAGES row: fade on whichever side still
  // has unscrolled links, so it reads as "swipe me" instead of "cut off".
  function checkPagesScrollFade() {
    const el = mobilePagesScrollRef.current;
    if (!el) return;
    setPagesScrollFade({
      left: el.scrollLeft > 4,
      right: el.scrollWidth - el.scrollLeft - el.clientWidth > 4,
    });
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

  const pagesLinks = [
    { label: "Projects", href: "/projects" },
    { label: "Services", href: "/services" },
    { label: "Team", href: "/team" },
    { label: "Contact", href: "/contact" },
  ];

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
          className="rounded-full bg-gray-900 text-white font-bold tracking-tight border-2 border-white shadow-sm shrink-0"
          style={{
            width: isExpanded ? "48px" : "36px",
            height: isExpanded ? "48px" : "36px",
            transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)",
          }}
        >
          STC
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

          {/* PAGES Dropdown */}
          <div className="relative" ref={pagesDropdownRef}>
            <button
              onClick={() => setPagesDropdownOpen((prev) => !prev)}
              aria-haspopup="true"
              aria-expanded={pagesDropdownOpen}
              className="relative px-3 py-1.5 text-sm font-medium rounded-full group flex items-center gap-1"
            >
              <span className="text-gray-500">PAGES</span>
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${
                  pagesDropdownOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Dropdown Menu — vertical list; scrolls if it would overflow the viewport */}
            <div
              aria-hidden={!pagesDropdownOpen}
              style={{
                opacity: pagesDropdownOpen ? 1 : 0,
                transform: pagesDropdownOpen
                  ? "translateY(0) scaleY(1)"
                  : "translateY(-8px) scaleY(0.97)",
                pointerEvents: pagesDropdownOpen ? "auto" : "none",
                transformOrigin: "top",
                transition:
                  "opacity 0.25s ease, transform 0.25s cubic-bezier(0.22,1,0.36,1)",
                maxHeight: "min(60vh, 420px)",
              }}
              className="dropdown-scroll absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 bg-white border border-gray-200 rounded-2xl p-2.5 w-56 shadow-2xl shadow-black/10 overflow-y-auto overscroll-contain"
            >
              <ul className="flex flex-col gap-1">
                {pagesLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={() => setPagesDropdownOpen(false)}
                      className="text-sm text-gray-700 hover:text-indigo-600 transition-colors duration-150 block w-full text-left py-2.5 px-3.5 rounded-xl hover:bg-gray-50 active:bg-gray-100"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
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

            <div ref={mobilePagesSectionRef} className="relative z-10 scroll-mt-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setPagesOpen((prev) => !prev);
                }}
                aria-expanded={pagesOpen}
                className="w-full py-3 text-center rounded-xl overflow-hidden group flex items-center justify-center gap-2"
              >
                <span className="text-gray-600">PAGES</span>
                <svg
                  className={`w-4 h-4 text-gray-600 transition-transform duration-300 ${
                    pagesOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/*
                Single scroll container for vertical scrolling: the inner layer
                (mobileMenuRef) handles the page's own vertical scroll. This row
                itself scrolls sideways (horizontally) so the accordion's open
                height stays small and predictable on phones. Left/right fades
                (below) signal there are more links off-screen so it reads as
                "swipe me" rather than "cut off".
              */}
              <div
                className={`relative overflow-hidden ${
                  pagesOpen ? "max-h-20 opacity-100 mt-2" : "max-h-0 opacity-0"
                }`}
                style={{
                  transition:
                    "max-height 0.35s cubic-bezier(0.22,1,0.36,1), opacity 0.25s ease-out, margin-top 0.35s cubic-bezier(0.22,1,0.36,1)",
                }}
              >
                <div
                  ref={mobilePagesScrollRef}
                  onScroll={checkPagesScrollFade}
                  className="dropdown-scroll flex flex-row flex-nowrap gap-2 overflow-x-auto overscroll-contain px-1 pb-2"
                  style={{ scrollSnapType: "x proximity" }}
                >
                  {pagesLinks.map((link, i) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={(e) => {
                        e.stopPropagation();
                        setMenuOpen(false);
                      }}
                      className="shrink-0 whitespace-nowrap py-2.5 px-4 text-sm text-gray-600 bg-gray-50/80 hover:bg-indigo-50 hover:text-indigo-600 active:scale-95 rounded-full transition-all duration-200"
                      style={{
                        scrollSnapAlign: "start",
                        opacity: pagesOpen ? 1 : 0,
                        transform: pagesOpen ? "translateY(0)" : "translateY(4px)",
                        transition: `opacity 0.3s ease-out ${
                          pagesOpen ? i * 0.03 : 0
                        }s, transform 0.3s cubic-bezier(0.22,1,0.36,1) ${
                          pagesOpen ? i * 0.03 : 0
                        }s, background-color 0.2s ease, color 0.2s ease`,
                      }}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>

                {/* Left fade — only visible once the user has scrolled right */}
                <div
                  aria-hidden="true"
                  className={`pointer-events-none absolute top-0 bottom-2 left-0 w-8 bg-gradient-to-r from-white to-transparent transition-opacity duration-200 ${
                    pagesScrollFade.left ? "opacity-100" : "opacity-0"
                  }`}
                />
                {/* Right fade — visible while more links sit off-screen to the right */}
                <div
                  aria-hidden="true"
                  className={`pointer-events-none absolute top-0 bottom-2 right-0 w-10 bg-gradient-to-l from-white to-transparent flex items-center justify-end transition-opacity duration-200 ${
                    pagesScrollFade.right ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <svg
                    className="w-4 h-4 text-gray-400 mr-1 animate-pulse"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </div>

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