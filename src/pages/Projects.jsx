import { useState, forwardRef } from "react";
import { FolderKanban, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { ArrowBtn } from "../components/UI/ArrowBtn.jsx";
import { SecHeading } from "../components/UI/Secheading";
import { ProjectsFullData } from "../constants/demoData.js";
import SEO from "../services/SEO";

function projectCountLabel(count) {
  if (count === null) return "LOADING PROJECTS";
  if (count === 0) return "NO PROJECTS YET";
  return count + " PROJECT" + (count !== 1 ? "S" : "") + " COMPLETED";
}

// ─── Image URL resolver ────────────────────────────────────────────────
// Handles: plain string URL, Cloudinary-style object ({secure_url} or {url}),
// or an array of images (uses the first one). Returns null if nothing usable.
function getImageUrl(img) {
  if (!img) return null;
  if (typeof img === "string") return img.trim() || null;
  if (Array.isArray(img)) return getImageUrl(img[0]);
  if (typeof img === "object") return img.secure_url || img.url || null;
  return null;
}

// ─── Project Card ────────────────────────────────────────────────────────
// Rectangle (landscape) card, 2-up grid.
const ProjectCard = forwardRef(function ProjectCard(
  { project, animDelay = 0 },
  ref
) {
  const navigate = useNavigate();
  const [imgFailed, setImgFailed] = useState(false);
  const [hoverImgFailed, setHoverImgFailed] = useState(false);

  const photo = getImageUrl(project.thumbnail ?? project.thumbnailImage);
  const hoverPhoto = getImageUrl(project.screenshots);

  // Whole card navigates to the project detail page at /projects/<id>.
  // The external link icon is independent — if the project has its own
  // `link` URL, clicking the icon opens that in a new tab instead
  // (stopPropagation keeps it from also triggering the card navigation).
  const handleCardClick = () => {
    navigate(`/projectDetails/${project.id ?? project._id}`);
  };

  const handleExternalLinkClick = (e) => {
    e.stopPropagation();
    if (!project.link) return;
    window.open(project.link, "_blank", "noopener,noreferrer");
  };

  return (
    <article
      ref={ref}
      onClick={handleCardClick}
      style={{ animationDelay: `${animDelay}ms` }}
      className="group cursor-pointer animate-fadeInUp block w-full active:scale-[0.98] transition-transform duration-200"
    >
      {/* Image — landscape rectangle, kept small via a wider aspect ratio */}
      <div className="relative w-full aspect-[16/9] overflow-hidden rounded-xl sm:rounded-2xl bg-bg-main/10 border border-white/5 shadow-sm group-hover:shadow-lg group-hover:border-white/10 transition-all duration-300">
        {photo && !imgFailed ? (
          <img
            src={photo}
            alt={project.title ?? project.name}
            className="w-full h-full object-cover object-center"
            loading="lazy"
            onError={() => setImgFailed(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-bg-main/10">
            <FolderKanban size={24} className="sm:hidden text-text-muted" />
            <FolderKanban size={38} className="hidden sm:block text-text-muted" />
          </div>
        )}

        {/* Hover image reveal */}
        {hoverPhoto && !hoverImgFailed && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
            <img
              src={hoverPhoto}
              alt={project.title ?? project.name}
              className="
                w-full h-full object-cover object-center
                transition-all duration-[1200ms]
                ease-[cubic-bezier(0.22,1,0.36,1)]
                scale-110 group-hover:scale-100
                [clip-path:inset(0_0_100%_0)]
                group-hover:[clip-path:inset(0_0_0_0)]
              "
              loading="lazy"
              onError={() => setHoverImgFailed(true)}
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

        {/* Touch-device affordance — hover reveal doesn't fire on tap, so mobile
            gets a small persistent label instead. Hidden from sm up, where the
            hover interaction already communicates "there's more here". */}
        <div className="absolute bottom-2.5 left-2.5 z-20 sm:hidden">
          <span className="inline-flex items-center gap-1 rounded-full bg-black/50 backdrop-blur-sm px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
            View Project
          </span>
        </div>

        {/* External link icon — always visible; independent click target */}
        <button
          type="button"
          onClick={handleExternalLinkClick}
          aria-label="Open live project"
          className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 z-30 w-9 h-9 sm:w-8 sm:h-8 rounded-full bg-white shadow-md flex items-center justify-center active:scale-90 transition-transform"
        >
          <ExternalLink size={14} className="text-text-heading" />
        </button>
      </div>

      {/* Project info */}
      <div className="text-left px-0.5 sm:px-1 mt-3 sm:mt-5">
        <h3 className="text-text-heading font-bold text-base sm:text-xl lg:text-2xl tracking-tight leading-snug line-clamp-2">
          {project.title ?? project.name}
        </h3>

        <div className="mt-1.5 sm:mt-2 flex items-center gap-2">
          <span className="h-px w-3 bg-secondary/60" />
          <p className="text-text-label text-[9px] sm:text-[11px] lg:text-xs font-semibold uppercase tracking-wider">
            {project.category}
          </p>
        </div>
      </div>
    </article>
  );
});

// ─── Skeleton ──────────────────────────────────────────────────────────────

function ProjectSkeleton({ count = 4 }) {
  return (
    <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-8 sm:gap-y-14">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="w-full animate-pulse">
          <div className="w-full aspect-[16/9] rounded-xl sm:rounded-2xl bg-border-light" />
          <div className="mt-3 sm:mt-5 h-4 sm:h-6 rounded bg-border-light w-2/3" />
          <div className="mt-2 h-2.5 sm:h-3 rounded bg-border-light w-1/3" />
        </div>
      ))}
    </div>
  );
}

// ─── Projects Page ──────────────────────────────────────────────────────

function Projects() {
  const projects = ProjectsFullData;
  const loading = false;

  const hasProjects = projects.length > 0;
  const isEmpty = projects.length === 0;

  // ─── Render ──────────────────────────────────────────────────────────────

  return (
    <>
      <SEO
        title="Projects | Syed Tech Company"
        description="Explore software, web, mobile, and digital product projects by Syed Tech Company."
        keywords="Syed Tech Company projects, software portfolio, web development, custom software, mobile apps, digital products"
        url="https://www.ssibannu.com/projects"
        image="https://www.ssibannu.com/stc-logo.svg"
        imageWidth="1200"
        imageHeight="630"
        siteName="Syed Tech Company"
        locale="en_US"
        author="Syed Tech Company"
        city="Bannu"
        region="PK-KP"
        twitterCard="summary_large_image"
        isLocalBusiness={true}
        isBreadcrumb={true}
        breadcrumbItems={[
          { name: "Home", url: "https://www.ssibannu.com/" },
          { name: "Projects", url: "https://www.ssibannu.com/projects" },
        ]}
      />

      <main className="w-full min-w-0 min-h-[calc(100vh-80px)] overflow-x-hidden bg-bg-dark pt-28 pb-20">
        <div className="max-w-330 mx-auto px-4 sm:px-6 lg:px-4 py-4" id="projects">
          {/* HEADER */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <ArrowBtn
              label="Work & Outcomes"
              iconBg="bg-black"
              iconColor="text-white"
              textColor="text-black"
              padding="px-2 py-2"
              hoverBtnBg="hover:bg-white"
              hoverIconBg="group-hover:bg-black"
              hoverTextColor="group-hover:text-black"
            />
          </div>

          {/* Heading */}
          <div className="mt-6 mb-12">
            <div className="w-full text-center lg:text-left">
              <SecHeading title="Digital work." subtitle="Designed with intent." />

              <p className="mt-3 text-xs font-bold tracking-[0.18em] text-text-muted uppercase">
                {projectCountLabel(loading ? null : projects.length)}
              </p>

            </div>
          </div>

          {/* Loading */}
          {loading && <ProjectSkeleton count={4} />}

          {/* Empty */}
          {isEmpty && (
            <div className="flex flex-col items-center justify-center min-h-[280px] py-10">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-4">
                <FolderKanban size={19} className="text-white" strokeWidth={1.8} />
              </div>
              <p className="text-sm text-text-muted">No projects added yet.</p>
            </div>
          )}

          {/* PROJECT GRID — 2-up at every breakpoint, mobile-first */}
          {hasProjects && (
            <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-8 sm:gap-y-14">
              {projects.map((project, idx) => (
                <ProjectCard
                  key={project.id ?? project._id}
                  project={project}
                  animDelay={idx < 4 ? (idx % 2) * 100 : 0}
                />
              ))}
            </div>
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
    </>
  );
}

export default Projects;