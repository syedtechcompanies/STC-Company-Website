import { useState, useRef, useEffect, forwardRef } from "react";
import { Users } from "lucide-react";
import { ArrowBtn } from "../UI/ArrowBtn.jsx";
import { SecHeading } from "../UI/Secheading";
import { TeamData } from "../../constants/HomeData.js";
import { SliderArrow } from "../common/SliderArrow.jsx";

function memberCountLabel(count) {
  if (count === null) return "LOADING MEMBERS";
  if (count === 0) return "NO MEMBERS YET";
  return count + " MEMBER" + (count !== 1 ? "S" : "") + " ON THE TEAM";
}
 
// ─── Team Card ───────────────────────────────────────────────────────────
// Identical to TeamSection's card: same size, same theme tokens, same
// hover-photo reveal, same fadeInUp entrance. forwardRef so the slider can
// measure the first card's real width for the translateX math.
const TeamCard = forwardRef(function TeamCard({ member, animDelay = 0 }, ref) {
  const photo =
    member.image && member.image.secure_url
      ? member.image.secure_url
      : member.image;
 
  const hoverPhoto =
    member.hoverImage && member.hoverImage.secure_url
      ? member.hoverImage.secure_url
      : member.hoverImage;
 
  return (
    <article
      ref={ref}
      style={{ animationDelay: `${animDelay}ms` }}
      className="shrink-0 w-64 sm:w-68 lg:w-70 group cursor-pointer animate-fadeInUp"
    >
      {/* Image */}
      <div className="relative w-full aspect-[4/5] overflow-hidden rounded-2xl bg-bg-main/10">
        {photo ? (
          <img
            src={photo}
            alt={member.name}
            className="w-full h-full object-cover object-center"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-bg-main/10">
            <Users size={38} className="text-text-muted" />
          </div>
        )}
 
        {/* Hover image reveal */}
        {hoverPhoto && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
            <img
              src={hoverPhoto}
              alt={member.name}
              className="
                w-full h-full object-cover object-center
                transition-all duration-[1200ms]
                ease-[cubic-bezier(0.22,1,0.36,1)]
                scale-110 group-hover:scale-100
                [clip-path:inset(0_0_100%_0)]
                group-hover:[clip-path:inset(0_0_0_0)]
              "
              loading="lazy"
            />
          </div>
        )}
 
        {/* Bottom shadow */}
        <div
          className="
            absolute bottom-0 left-0 right-0 h-10
            bg-gradient-to-t from-black/20 to-transparent
            pointer-events-none z-20
            transition-opacity duration-[1200ms]
            group-hover:opacity-0
          "
        />
 
        {/* Active / inactive badge */}
        <span
          className={
            "absolute top-3 left-3 z-20 inline-flex items-center gap-1 " +
            "text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full " +
            (member.active
              ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
              : "bg-neutral-100 text-neutral-400 border border-neutral-200")
          }
        >
          <span
            className={
              "w-1.5 h-1.5 rounded-full " +
              (member.active ? "bg-emerald-500" : "bg-neutral-400")
            }
          />
          {member.active ? "Active" : "Inactive"}
        </span>
      </div>
 
      {/* Member info */}
      <div className="text-center px-1 mt-4">
        <h3 className="text-text-heading font-bold text-lg sm:text-xl tracking-tight leading-snug">
          {member.name}
        </h3>
 
        <div className="mt-2 flex items-center justify-center gap-2">
          <span className="h-px w-3 bg-secondary/60" />
          <p className="text-text-label text-[11px] sm:text-xs font-semibold uppercase tracking-wider">
            {member.role}
          </p>
          <span className="h-px w-3 bg-secondary/60" />
        </div>
      </div>
    </article>
  );
});
 
// ─── Skeleton ──────────────────────────────────────────────────────────────
 
function TeamSkeleton({ count = 4 }) {
  return (
    <div className="flex gap-6 overflow-hidden">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="shrink-0 w-64 sm:w-68 lg:w-70 animate-pulse">
          <div className="w-full aspect-[4/5] rounded-2xl bg-border-light" />
          <div className="mt-4 h-5 rounded bg-border-light w-3/4 mx-auto" />
          <div className="mt-2 h-3 rounded bg-border-light w-1/2 mx-auto" />
        </div>
      ))}
    </div>
  );
}
 
// ─── Member Page ────────────────────────────────────────────────────────
 
function OurTeam() {
  const members = TeamData.Members;
  const loading = false;
 
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(4);
  const [cardWidth, setCardWidth] = useState(284 + 24); // fallback width + gap
 
  const sliderRef = useRef(null);
  const firstCardRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
 
  // ─── Responsive: cards per view + measured card width ────────────────────
 
  
  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 640) setCardsPerView(1);
      else if (window.innerWidth < 1024) setCardsPerView(2);
      else setCardsPerView(4);
 
      if (firstCardRef.current) {
        const gap = 24; // gap-6 = 24px
        setCardWidth(firstCardRef.current.offsetWidth + gap);
      }
    };
 
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [members]);
 
  const maxIndex = Math.max(0, members.length - cardsPerView);
 
  const goTo = (index) => {
    const clamped = Math.max(0, Math.min(index, maxIndex));
    setCurrentIndex(clamped);
  };
 
  const translateX = currentIndex * cardWidth;
 
  // ─── Swipe handlers ────────────────────────────────────────────────────
 
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = () => {
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 50) goTo(currentIndex + 1); // swipe left → next
    else if (distance < -50) goTo(currentIndex - 1); // swipe right → prev
  };
 
  const hasMembers = members.length > 0;
  const isEmpty = members.length === 0;
 
  // ─── Render ──────────────────────────────────────────────────────────────
 
  return (
    <main className="w-full min-w-0 min-h-0 overflow-x-hidden bg-bg-dark pt-12 pb-12">
      <div className="max-w-330 mx-auto p-4" id="members">
        {/* HEADER */}
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <ArrowBtn
            label="Meet the Team"
            iconBg="bg-black"
            iconColor="text-white"
            textColor="text-black"
            padding="px-2 py-2"
            hoverBtnBg="hover:bg-white"
            hoverIconBg="group-hover:bg-black"
            hoverTextColor="group-hover:text-black"
          />
        </div>
 
        {/* Heading + Desktop Controls */}
        <div className="mt-6 mb-8 flex items-center justify-between gap-4">
          <div className="w-full text-center lg:text-left">
            <SecHeading title="People behind the craft." subtitle="Built through collaboration." />
 
            <p className="mt-3 text-xs font-bold tracking-[0.18em] text-text-muted uppercase">
              {memberCountLabel(members.length)}
            </p>
          </div>
 
          {hasMembers && (
            <div className="hidden lg:flex items-center gap-2 shrink-0">
              <SliderArrow
                direction="left"
                onClick={() => goTo(currentIndex - 1)}
                disabled={currentIndex === 0}
              />
              <SliderArrow
                direction="right"
                onClick={() => goTo(currentIndex + 1)}
                disabled={currentIndex >= maxIndex}
              />
            </div>
          )}
        </div>
 
        {/* Loading */}
        {loading && <TeamSkeleton count={cardsPerView} />}
 
        {/* Empty */}
        {isEmpty && (
          <div className="flex flex-col items-center justify-center min-h-[280px] py-10">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-4">
              <Users size={19} className="text-white" strokeWidth={1.8} />
            </div>
            <p className="text-sm text-text-muted">No members added yet.</p>
          </div>
        )}
 
        {/* SLIDER TRACK */}
        {hasMembers && (
          <>
            <div
              ref={sliderRef}
              className="overflow-hidden"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div
                className="flex gap-6"
                style={{
                  transform: `translateX(-${translateX}px)`,
                  transition: "transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)",
                }}
              >
                {members.map((member, idx) => (
                  <TeamCard
                    key={member.id}
                    member={member}
                    animDelay={idx < cardsPerView ? idx * 100 : 0}
                    ref={idx === 0 ? firstCardRef : null}
                  />
                ))}
              </div>
            </div>
 
            {/* MOBILE/TABLET ARROWS */}
            <div className="flex justify-end gap-2 mt-6 lg:hidden">
              <SliderArrow
                direction="left"
                onClick={() => goTo(currentIndex - 1)}
                disabled={currentIndex === 0}
              />
              <SliderArrow
                direction="right"
                onClick={() => goTo(currentIndex + 1)}
                disabled={currentIndex >= maxIndex}
              />
            </div>
 
            {/* DOTS */}
            {maxIndex > 0 && (
              <div className="flex items-center gap-2 mb-2 ">
                {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    aria-label={`Go to slide ${i + 1}`}
                    className={`
                      h-0.75 rounded-full transition-all duration-300 cursor-pointer
                      ${i === currentIndex
                        ? "w-8 bg-secondary"
                        : "w-4 bg-border-dark hover:bg-text-muted"
                      }
                    `}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
 
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.5s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
      `}</style>
    </main>
  );
}
 
export default OurTeam;