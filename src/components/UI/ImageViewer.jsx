import { useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

export default function ImageViewer({ src, alt, className = "" }) {
  const [open, setOpen] = useState(false);

  if (!src) return null;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`p-0 border-0 bg-transparent cursor-zoom-in ${className}`}
      >
        <img src={src} alt={alt || "Image"} className="w-full h-full object-cover" />
      </button>

      {open &&
        createPortal(
          <div
            className="fixed inset-0 z-50 bg-black flex items-center justify-center"
            onClick={() => setOpen(false)}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                setOpen(false);
              }}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 text-white flex items-center justify-center active:scale-90 transition-transform z-10"
            >
              <X size={20} />
            </button>
            <img
              src={src}
              alt={alt || "Image"}
              className="w-full h-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>,
          document.body
        )}
    </>
  );
}