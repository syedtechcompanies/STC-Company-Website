// ── Sub-components ────────────────────
//  DetailHero     → hero with title + subtitle
//  CarouselSection → wraps HeroCarousel with service images
//  AboutSection   → 2-col split: about text + benefits
//  BenefitItem    → single benefit row (title + body)
//  TuningSection  → full-width text block
//  RichImage      → full-width image
//  WhySection     → full-width text block

import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { SecHeading } from "../components/UI/Secheading.jsx";
import { ArrowBtn } from "../components/UI/ArrowBtn.jsx";
import CTASection from "../components/sections/Cta.jsx";
import useInView from "../hooks/useInView";
import HeroCarousel from "../components/common/Carousel.jsx";
import { demoServiceDetails, demoServices } from "../constants/demoData.js";

// ─────────────────────────────────────────────────────────────────────────────
// DetailHero
//
// Dark section at the top — small ArrowBtn tag + title + subtitle, same
// header pattern used on Member/Projects/Events/Services pages.
// Padding-top accounts for fixed navbar height.
// ─────────────────────────────────────────────────────────────────────────────
const DetailHero = ({ title, subtitle, onBack }) => (
  <section className="bg-bg-dark pt-36 pb-16 lg:pt-44 lg:pb-20">
    <div className="max-w-330 mx-auto px-2">
      <div className="flex flex-col items-center text-center lg:items-start lg:text-left lg:ml-10 mb-8">
        <ArrowBtn
          label="Back to Services"
          onClick={onBack}
          iconBg="bg-black"
          iconColor="text-white"
          textColor="text-black"
          padding="px-2 py-2"
          hoverBtnBg="hover:bg-white"
          hoverIconBg="group-hover:bg-black"
          hoverTextColor="group-hover:text-black"
        />
      </div>

      {/* Title + subtitle */}
      <div className="flex flex-col items-start lg:ml-10 gap-4">
        <SecHeading
          title={
            title.split(" ").length > 3
              ? [
                  title
                    .split(" ")
                    .slice(0, Math.ceil(title.split(" ").length / 2))
                    .join(" "),
                  title
                    .split(" ")
                    .slice(Math.ceil(title.split(" ").length / 2))
                    .join(" "),
                ]
              : [title]
          }
          text="lg:text-5xl font-extrabold"
        />

        <p className="text-text-muted text-base md:text-lg leading-tight max-w-lg text-left">
          {subtitle}
        </p>
      </div>
    </div>
  </section>
);

// ─────────────────────────────────────────────────────────────────────────────
// CarouselSection  — wraps HeroCarousel with service images
// ─────────────────────────────────────────────────────────────────────────────
const CarouselSection = ({ service }) => {
  // Build carousel data: one slide per image in service.images[]
  // title = category pill, subtitle = service title, href = undefined (no external link)
  const carouselData = (service.images ?? [])
    .filter((src) => typeof src === "string" && src.trim() !== "")
    .map((src) => ({
      image: src,
      title: service.category ?? undefined,
      subtitle: service.title ?? undefined,
      href: undefined,
    }));

  // If no images at all, fall back to thumbnail as single slide
  if (carouselData.length === 0 && service.thumbnail) {
    carouselData.push({
      image: service.thumbnail,
      title: service.category ?? undefined,
      subtitle: service.title ?? undefined,
      href: undefined,
    });
  }

  if (carouselData.length === 0) return null;

  return (
    <section className="bg-bg-dark py-12 lg:py-16">
      <div className="max-w-330 mx-auto px-6 lg:px-10">
        <HeroCarousel data={carouselData} />
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// BenefitItem
// Single benefit row — bold title + body text.
// Scroll-triggered stagger on each item.
//
// Props:
//   benefit    — { title, body }
//   animDelay  — stagger delay in ms
// ─────────────────────────────────────────────────────────────────────────────
const BenefitItem = ({ benefit, animDelay }) => {
  const [ref, isInView] = useInView({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.5s ease ${animDelay}ms, transform 0.5s cubic-bezier(0.22,1,0.36,1) ${animDelay}ms`,
      }}
      className="flex flex-col gap-1.5 py-5 border-b border-border-dark last:border-b-0"
    >
      <p className="text-text-heading font-semibold text-lg leading-tight tracking-tight">
        {benefit.title}
      </p>
      <p className="text-text-muted leading-relaxed font-thin">{benefit.body}</p>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// AboutSection
// Two-column layout:
//   Left  (sticky on desktop): "About This Service?" + 2 paragraphs
//   Right:                      Benefits list
//
// Mobile: single column, about text stacks above benefits.
// ─────────────────────────────────────────────────────────────────────────────
const AboutSection = ({ content, benefits }) => {
  return (
    <section className="bg-bg-dark py-16 lg:py-24">
      <div className="max-w-330 mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-12 lg:gap-20">
          {/* ── Left: About text ── */}
          <div className="lg:self-start">
            <SecHeading title={content.aboutHeading} />

            <p className="text-text-muted text-base leading-relaxed mt-5">
              {content.aboutParagraph1}
            </p>

            <p className="text-text-muted text-base leading-relaxed">
              {content.aboutParagraph2}
            </p>
          </div>

          {/* ── Right: Benefits list ── */}
          <div>
            <p className="text-text-heading text-lg md:text-3xl font-semibold uppercase tracking-widest mb-2">
              Benefits
            </p>

            <div className="border-t border-border-dark">
              {benefits.map((benefit, idx) => (
                <BenefitItem
                  key={benefit.title}
                  benefit={benefit}
                  animDelay={idx * 80}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// TuningSection
// Full-width text block — heading + 2 paragraphs.
// Simple scroll-triggered fade.
// ─────────────────────────────────────────────────────────────────────────────
const TuningSection = ({ content }) => {
  const [ref, isInView] = useInView({ threshold: 0.15 });

  return (
    <section className="bg-bg-dark pb-16 lg:pb-20">
      <div className="max-w-330 mx-auto px-4">
        <div
          ref={ref}
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.6s ease, transform 0.6s cubic-bezier(0.22,1,0.36,1)",
          }}
          className="max-w-3xl"
        >
          <h3 className="text-text-heading font-bold text-2xl md:text-3xl lg:text-4xl leading-tight tracking-tight mb-7">
            {content.tuningHeading}
          </h3>

          <p className="text-text-muted text-base leading-tighter tracking-tight mb-5">
            {content.tuningParagraph1}
          </p>
          <p className="text-text-muted text-base leading-tighter tracking-tight">
            {content.tuningParagraph2}
          </p>
        </div>
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// RichImage
// Full-width single image between tuning and why sections.
// Scroll-triggered reveal.
// ─────────────────────────────────────────────────────────────────────────────
const RichImage = ({ src }) => {
  const [ref, isInView] = useInView({ threshold: 0.1 });

  return (
    <section className="bg-bg-dark pb-16 lg:pb-20">
      <div className="max-w-330 mx-auto px-6 lg:px-10">
        <div
          ref={ref}
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? "translateY(0)" : "translateY(28px)",
            transition: "opacity 0.7s ease, transform 0.7s cubic-bezier(0.22,1,0.36,1)",
          }}
          className="rounded-xl overflow-hidden w-full border border-border-dark"
          style={{ height: "clamp(320px, 56vw, 660px)" }}
        >
          <img
            src={src}
            alt="Service detail"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// WhySection
// "why you should take the service" — heading + 3 paragraphs.
// Last content block before the CTA.
// ─────────────────────────────────────────────────────────────────────────────
const WhySection = ({ content }) => {
  const [ref, isInView] = useInView({ threshold: 0.15 });

  return (
    <section className="bg-bg-dark pb-20 lg:pb-28">
      <div className="max-w-330 mx-auto px-6 lg:px-8">
        <div
          ref={ref}
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.6s ease, transform 0.6s cubic-bezier(0.22,1,0.36,1)",
          }}
          className="max-w-full"
        >
          <h3 className="text-text-heading font-medium text-2xl md:text-3xl lg:text-4xl leading-tight tracking-tight mb-7">
            {content.whyHeading}
          </h3>

          <p className="text-text-muted text-base leading-tighter mb-5">
            {content.whyParagraph1}
          </p>
          <p className="text-text-muted text-base leading-tighter mb-5">
            {content.whyParagraph2}
          </p>
          <p className="text-text-muted text-base leading-tighter">
            {content.whyParagraph3}
          </p>
        </div>
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// NotFound (inline fallback)
// Shown when slug doesn't match any service in the data.
// ─────────────────────────────────────────────────────────────────────────────
const NotFound = () => (
  <section className="bg-bg-dark min-h-screen flex items-center justify-center">
    <div className="text-center">
      <p className="text-text-muted text-lg mb-4">Service not found.</p>
      <Link
        to="/services"
        className="text-text-heading font-semibold underline hover:text-text-muted transition-colors"
      >
        Back to Services
      </Link>
    </div>
  </section>
);

const ServiceDetails = () => {
  const { subServiceId: id, serviceId } = useParams();
  const navigate = useNavigate();

  // ── Find matching subcategory + its parent category ──
  const [service, setService] = useState();
  const [parentCategory, setParentCategory] = useState();

  useEffect(() => {
    setService(demoServiceDetails[id] || demoServiceDetails["web-apps"]);
    setParentCategory(demoServices.find((item) => item._id === serviceId) || demoServices[0]);
  }, [id, serviceId]);

  if (!service) return <NotFound />;

  // ── Map data to what each section expects ──

  // AboutSection expects: content{} + benefits[]
  const aboutContent = {
    aboutHeading: ["About", "This Service"], // SecHeading accepts array
    aboutParagraph1: service.about,
    aboutParagraph2: service.description,
  };

  const benefits = service.benefits.map((b) => ({
    title: b.title,
    body: b.caption,
  }));

  // TuningSection expects: content{ tuningHeading, tuningParagraph1, tuningParagraph2 }
  const tuningContent = {
    tuningHeading: `${parentCategory.title} — ${service.title}`,
    tuningParagraph1: service.description,
    tuningParagraph2: service.about,
  };

  // RichImage expects: src
  const richImageSrc =
    service.images.find((src, index) => index > 0 && Boolean(src)) ??
    service.images.find(Boolean) ??
    parentCategory.thumbnail;

  // WhySection expects: content{ whyHeading, whyParagraph1, whyParagraph2, whyParagraph3 }
  // whyTake is one paragraph — we split it into sentences for the 3 slots
  const whySentences = service.whyTake.split(/(?<=\.)\s+/);
  const third = Math.ceil(whySentences.length / 3);
  const whyContent = {
    whyHeading: "Why Choose This Service?",
    whyParagraph1: whySentences.slice(0, third).join(" "),
    whyParagraph2: whySentences.slice(third, third * 2).join(" "),
    whyParagraph3: whySentences.slice(third * 2).join(" "),
  };

  return (
    <main className="bg-bg-dark">
      <DetailHero
        title={service.title}
        subtitle={service.subtitle}
        onBack={() => navigate("/services")}
      />

      {/* Carousel — all service.images passed to HeroCarousel */}
      <CarouselSection service={service} />

      <AboutSection content={aboutContent} benefits={benefits} />

      <TuningSection content={tuningContent} />

      <RichImage src={richImageSrc} />

      <WhySection content={whyContent} />

      <CTASection />
    </main>
  );
};

export default React.memo(ServiceDetails);