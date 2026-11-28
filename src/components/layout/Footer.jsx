import { createElement, useId, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUp, Check, Loader2 } from "lucide-react";
import { UseInViewWrapper } from "../UI/UseInViewWrapper";

import { NAV_COLUMNS, FooterLists } from "../../constants/footerData.js";
import { socialLinks } from "../../constants/socialLinks.js";

const EMAIL_REGEX = /^\S+@\S+\.\S+$/;

// ─── SocialIcon ───────────────────────────────────────────────────────────────
const SocialIcon = ({ href, label, Icon }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="
      flex h-10 w-10 items-center justify-center rounded-full
      border border-border-dark bg-white/[0.03] text-text-muted
      transition-colors duration-200
      hover:border-white/30 hover:bg-white/10 hover:text-white
      focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white
    "
  >
    {createElement(Icon, { size: 17, "aria-hidden": true })}
  </a>
);

// ─── NewsletterForm ───────────────────────────────────────────────────────────
const NewsletterForm = () => {
  const inputId = useId();
  const messageId = useId();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | error | success
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!EMAIL_REGEX.test(email.trim())) {
      setStatus("error");
      return;
    }

    setLoading(true);
    try {
      // TODO: replace with your real API call
      await new Promise((res) => setTimeout(res, 800));
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="w-full max-w-md">
      <label
        htmlFor={inputId}
        className="mb-3 block text-base font-semibold text-text-primary"
      >
        Get our latest updates
      </label>

      <div
        className={`
          flex items-center gap-2 rounded-full border bg-white/[0.03] p-1.5 pl-5
          transition-colors duration-200
          focus-within:border-white/40
          ${status === "error" ? "border-accent" : "border-border-dark"}
        `}
      >
        <input
          id={inputId}
          type="email"
          inputMode="email"
          autoComplete="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status !== "idle") setStatus("idle");
          }}
          placeholder="you@example.com"
          aria-invalid={status === "error"}
          aria-describedby={messageId}
          className="
            min-w-0 flex-1 bg-transparent py-2.5 text-sm
            text-text-primary outline-none placeholder:text-text-label
          "
        />
        <button
          type="submit"
          disabled={loading}
          aria-label="Subscribe to newsletter"
          className="
            flex h-11 w-11 shrink-0 items-center justify-center rounded-full
            bg-secondary text-text-dark
            transition-colors duration-200
            hover:bg-white
            focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white
            disabled:cursor-not-allowed disabled:opacity-60
          "
        >
          {loading ? (
            <Loader2 size={18} className="animate-spin" aria-hidden="true" />
          ) : (
            <ArrowRight size={18} aria-hidden="true" />
          )}
        </button>
      </div>

      <p
        id={messageId}
        role="status"
        aria-live="polite"
        className={`mt-3 flex min-h-5 items-center gap-1.5 text-sm ${
          status === "error" ? "text-accent" : "text-text-muted"
        }`}
      >
        {status === "success" && (
          <>
            <Check size={14} aria-hidden="true" />
            You're subscribed. Thanks for joining us.
          </>
        )}
        {status === "error" && "Enter a valid email address and try again."}
      </p>
    </form>
  );
};

// ─── FooterLink (internal → router Link, external/anchor → <a>) ──────────────
const FooterLink = ({ href, label }) => {
  const cls = `
    inline-block text-text-muted transition-colors duration-200
    hover:text-text-primary
    focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white
  `;
  const isInternal = href?.startsWith("/") && !href.startsWith("//");
  return isInternal ? (
    <Link to={href} className={cls}>
      {label}
    </Link>
  ) : (
    <a href={href} className={cls}>
      {label}
    </a>
  );
};

// ─── Footer ───────────────────────────────────────────────────────────────────
const Footer = () => (
  <footer className="bg-bg-card">
    <div className="max-w-330 mx-auto px-6 lg:px-10">
      <UseInViewWrapper distance={30} duration={600} delay={100} className="w-full">
        <div
          className="
            grid grid-cols-1 gap-12 py-14
            lg:grid-cols-12 lg:gap-8 lg:py-16
          "
        >
          {/* Brand */}
          <div className="lg:col-span-4">
            <Link
              to="/"
              aria-label="Syed Tec Company home"
              className="inline-flex items-center gap-3"
            >
              <img
                src="/assets/stclogo-transparent.png"
                alt="Syed Tec Company"
                className="h-16 w-16 shrink-0 object-contain sm:h-20 sm:w-20"
              />
              <span className="text-3xl font-bold tracking-wide text-white sm:text-4xl">
                STC
              </span>
            </Link>

            {FooterLists.brand?.description && (
              <p className="mt-5 max-w-xs text-sm leading-relaxed text-text-muted">
                {FooterLists.brand.description}
              </p>
            )}

            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map((s) => (
                <SocialIcon key={s.label} {...s} />
              ))}
            </div>
          </div>

          {/* Nav columns */}
          <nav
            aria-label="Footer"
            className="
              grid grid-cols-2 gap-x-8 gap-y-10
              sm:gap-x-12 lg:col-span-4 lg:col-start-6
            "
          >
            {NAV_COLUMNS.map((col) => (
              <div key={col.heading}>
                <h3 className="mb-4 font-semibold tracking-wide text-text-primary">
                  {col.heading}
                </h3>
                <ul className="flex flex-col gap-3 text-sm sm:text-base">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <FooterLink {...link} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          {/* Newsletter */}
          <div className="lg:col-span-3 lg:justify-self-end">
            <NewsletterForm />
          </div>
        </div>
      </UseInViewWrapper>

      {/* Bottom bar */}
      <div
        className="
          flex flex-col items-center justify-between gap-4
          border-t border-border-dark py-6 text-center
          sm:flex-row sm:text-left
        "
      >
        <p className="text-sm text-text-muted">{FooterLists.copyright.text}</p>

        <button
          type="button"
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
                ? "auto"
                : "smooth",
            })
          }
          className="
            inline-flex items-center gap-2 rounded-full border border-border-dark
            px-4 py-2 text-sm text-text-muted
            transition-colors duration-200
            hover:border-white/30 hover:text-text-primary
            focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white
          "
        >
          Back to top
          <ArrowUp size={14} aria-hidden="true" />
        </button>
      </div>
    </div>
  </footer>
);

export default Footer;
