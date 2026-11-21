import { AnimatePresence, motion } from "framer-motion";
import { X, Layers, Clock3, ArrowLeft } from "lucide-react";

// Pads single digits so the badge always reads "01", "02" ... "09", "10"
function padNumber(n) {
  return n < 10 ? "0" + n : String(n);
}

/**
 * Phasedetails
 * A focused, professional detail modal for a SINGLE topic inside a phase.
 * Only the topic that was clicked is shown here — not the whole phase.
 *
 * Props:
 * - open: boolean — whether the modal is visible
 * - onClose: () => void — used by both the ✕ button and the "Back" button
 * - step: the topic object { title, desc, subtopics }
 * - phase: the parent phase object { title, duration }
 * - phaseIndex: number (0-based)
 * - topicIndex: number (0-based)
 * - accent: hex color string used for the parent phase
 */
function Phasedetails(props) {
  const { open, onClose, step, phase, phaseIndex, topicIndex, accent } = props;
  const color = accent || "#111827";

  if (!step) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          {/* ── Backdrop ── */}
          <motion.div
            className="absolute inset-0 bg-neutral-900/40 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* ── Panel ── */}
          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0, y: 28, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="relative w-full sm:max-w-lg max-h-[88vh] overflow-y-auto bg-white rounded-t-[28px] sm:rounded-[28px] shadow-2xl border border-neutral-100"
          >
            {/* ── Accent header strip ── */}
            <div
              className="relative px-6 sm:px-8 pt-7 pb-6 overflow-hidden"
              style={{ background: `linear-gradient(180deg, ${color}0F, transparent)` }}
            >
              <button
                onClick={onClose}
                aria-label="Close"
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white border border-neutral-200 flex items-center justify-center text-neutral-400 hover:text-neutral-900 hover:border-neutral-900 transition-colors"
              >
                <X size={15} />
              </button>

              <div className="flex items-center gap-2.5 mb-4">
                <span
                  className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide px-3 py-1 rounded-full"
                  style={{ backgroundColor: color + "14", color }}
                >
                  <Layers size={11} />
                  Phase {padNumber(phaseIndex + 1)}
                  {phase?.title ? ` · ${phase.title}` : ""}
                </span>
              </div>

              <div className="flex items-start gap-3">
                <span
                  className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-black text-white shadow-sm flex-shrink-0 mt-0.5"
                  style={{ backgroundColor: color }}
                >
                  {padNumber(topicIndex + 1)}
                </span>
                <h2 className="text-2xl sm:text-[26px] font-black text-neutral-900 leading-tight tracking-tight">
                  {step.title}
                </h2>
              </div>

              {phase?.duration && (
                <p className="mt-3 ml-12 inline-flex items-center gap-1.5 text-xs font-medium text-neutral-400">
                  <Clock3 size={12} />
                  Part of a {phase.duration} phase
                </p>
              )}
            </div>

            <div className="h-px bg-neutral-100" />

            {/* ── Body ── */}
            <div className="px-6 sm:px-8 py-7 space-y-7">
              {/* Description */}
              {step.desc ? (
                <p className="text-xl sm:text-2xl font-bold italic text-neutral-800 leading-snug">
                  “{step.desc}”
                </p>
              ) : (
                <p className="text-sm text-neutral-300 italic">
                  No description added for this topic yet.
                </p>
              )}

              {/* Subtopics / key concepts */}
              {step.subtopics && step.subtopics.length > 0 && (
                <ul className="space-y-3">
                  {step.subtopics.map(function (sub, i) {
                    const title = typeof sub === "string" ? sub : sub.title;
                    const desc = typeof sub === "string" ? null : sub.desc;
                    return (
                      <li
                        key={i}
                        className="flex items-start gap-3 rounded-xl border border-neutral-100 bg-neutral-50/70 px-4 py-3.5"
                      >
                        <span
                          className="mt-1.5 w-2 h-2 rounded-full flex-shrink-0"
                          style={{ backgroundColor: color }}
                        />
                        <div>
                          <p className="text-base sm:text-lg font-bold text-neutral-900 leading-snug">
                            {title}
                          </p>
                          {desc && (
                            <p className="text-sm text-neutral-500 mt-1 italic leading-relaxed">
                              {desc}
                            </p>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            {/* ── Footer: Back ── */}
            <div className="px-6 sm:px-8 pb-7 pt-1">
              <button
                onClick={onClose}
                className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold text-white shadow-sm hover:opacity-90 transition-opacity"
                style={{ backgroundColor: color }}
              >
                <ArrowLeft size={15} />
                Back
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Phasedetails;