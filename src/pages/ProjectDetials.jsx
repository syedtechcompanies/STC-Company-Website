import React, { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import HeroCarousel from "../components/common/Carousel";
import { ProjectsFullData } from "../constants/demoData.js";

export default function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = ProjectsFullData.find((item) =>
      String(item.id) === id ||
      item.href?.split("/").pop() === id ||
      item.name?.toLowerCase().replaceAll(" ", "-") === id
  );

  const features = useMemo(() => {
    if (Array.isArray(project?.Features)) return project.Features;
    if (Array.isArray(project?.features)) return project.features;
    return [];
  }, [project]);

  const carouselData = useMemo(() => {
    if (!project) return [];

    const thumbnailUrl = project?.thumbnail?.url || project?.thumbnailImage || "";
    const screenshots = Array.isArray(project?.screenshots) ? project.screenshots : [];

    const slides = screenshots
      .map((item) => (typeof item === "string" ? item : item?.url))
      .filter(Boolean)
      .map((url) => ({
        image: url,
        title: project?.category || undefined,
        subtitle: project?.name || undefined,
      }));

    if (thumbnailUrl) {
      slides.unshift({
        image: thumbnailUrl,
        title: project?.name || undefined,
        subtitle: project?.category || undefined,
      });
    }

    return slides;
  }, [project]);

  const meta = useMemo(
    () => [
      { label: "Year", value: project?.year || "2026" },
      { label: "Category", value: project?.category || "-" },
      { label: "Features", value: `${features.length} Modules` },
      { label: "Status", value: project?.status || "Completed" },
    ],
    [features.length, project]
  );

  if (!project) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center gap-4 px-6 text-center"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        <p className="text-[5rem] sm:text-[7rem] font-black text-gray-100 leading-none select-none">
          404
        </p>
        <p className="text-gray-500 text-base sm:text-lg font-semibold">Project not found</p>
        <p className="text-gray-400 text-xs sm:text-sm max-w-xs sm:max-w-sm">
          {id ? `No project with id "${id}"` : "No id in URL."}
        </p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 text-sm font-semibold text-indigo-600 hover:text-indigo-800 active:text-indigo-900 transition-colors"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-white pt-16 sm:pt-20"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&family=Inter:wght@300;400;500;600&display=swap');
      `}</style>

      <main className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-10">
        {/* Back button — returns to the projects list */}
        <div className="pt-6 sm:pt-8">
          <button
            onClick={() => navigate("/projects")}
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </button>
        </div>

        {carouselData.length > 0 && (
          <section className="pt-6 sm:pt-10 pb-8 sm:pb-14">
            <HeroCarousel data={carouselData} />
          </section>
        )}

        <section className="pb-10 sm:pb-16 border-b border-gray-100">
          {project?.category && (
            <div className="mb-5 sm:mb-6">
              <span
                className="text-[11px] sm:text-xs font-medium text-gray-600 border border-gray-300 px-3.5 sm:px-4 py-1.5 rounded-full"
                style={{ letterSpacing: "0.03em" }}
              >
                {project.category}
              </span>
            </div>
          )}

          <h1
            className="text-gray-900 leading-[0.95] tracking-tighter mb-6 sm:mb-8 break-words"
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(2.2rem, 6vw, 4.5rem)",
              textTransform: "uppercase",
              letterSpacing: "-0.02em",
            }}
          >
            {project?.name || "Untitled Project"}
          </h1>

          {project?.description && (
            <p
              className="text-gray-500 mb-10 sm:mb-14 max-w-2xl"
              style={{
                fontSize: "14.5px",
                lineHeight: "1.75",
                fontWeight: 300,
              }}
            >
              {project.description}
            </p>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-6 sm:gap-y-8 gap-x-4">
            {meta.map(({ label, value }) => (
              <div key={label} className="min-w-0">
                <p
                  className="text-gray-400 mb-1 sm:mb-1.5"
                  style={{ fontSize: "12px", fontWeight: 400 }}
                >
                  {label} :
                </p>
                <p
                  className="font-semibold truncate"
                  style={{ fontSize: "14px", color: "#4f46e5" }}
                >
                  {value}
                </p>
              </div>
            ))}
          </div>

          {project?.href && (
            <a
              href={project.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 mt-8 sm:mt-10 text-sm font-semibold text-indigo-600 hover:text-indigo-800 active:text-indigo-900 transition-colors group"
            >
              Visit Project
              <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                →
              </span>
            </a>
          )}
        </section>

        {features.length > 0 && (
          <section className="pt-2 sm:pt-4 pb-16 sm:pb-24">
            {features.map((feat, i) => (
              <div key={feat?._id || `${feat?.title || "feature"}-${i}`}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-12 items-start py-7 sm:py-10">
                  <div className="flex items-center gap-4 sm:gap-5">
                    <span
                      className="flex-shrink-0 flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-gray-900 text-white text-xs sm:text-sm font-bold"
                      style={{ fontFamily: "'Inter', sans-serif", letterSpacing: "0.02em" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <h3
                      className="text-gray-900"
                      style={{
                        fontSize: "clamp(1.05rem, 2.2vw, 1.45rem)",
                        fontWeight: 600,
                        letterSpacing: "-0.01em",
                        lineHeight: 1.25,
                      }}
                    >
                      {feat?.title || "Untitled Feature"}
                    </h3>
                  </div>

                  {feat?.caption && (
                    <p
                      className="text-gray-500 pl-[52px] sm:pl-0"
                      style={{
                        fontSize: "14px",
                        lineHeight: "1.8",
                        fontWeight: 300,
                      }}
                    >
                      {feat.caption}
                    </p>
                  )}
                </div>
                {i < features.length - 1 && <div className="w-full h-px bg-gray-100" />}
              </div>
            ))}
          </section>
        )}
      </main>
    </div>
  );
}