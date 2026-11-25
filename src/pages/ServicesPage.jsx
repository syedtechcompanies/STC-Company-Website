import { Link } from "react-router-dom";
import { SecHeading } from "../components/UI/Secheading.jsx";
import CTASection from "../components/sections/Cta.jsx";
import useInView from "../hooks/useInView.js";
import { getServicesPageHeader } from "../constants/servicesPageData.js";
import { ArrowBtn } from "../components/UI/ArrowBtn.jsx";
import { useState, useEffect } from "react";
import { demoServices } from "../constants/demoData.js";
import SEO from "../services/SEO";

// ─────────────────────────────────────────────────────────────────────────────
// SubServiceRow Component
// ─────────────────────────────────────────────────────────────────────────────
const SubServiceRow = ({ item, serviceId }) => (
  <Link
    to={`/services/${item._id}/${serviceId}`}
    className="relative overflow-hidden flex items-center justify-between gap-4 border-b border-border-dark py-8 group"
  >
    <span
      aria-hidden="true"
      className="absolute inset-0 bg-secondary z-0 translate-y-full group-hover:translate-y-0 transition-transform duration-380 ease-[cubic-bezier(0.22,1,0.36,1)]"
    />
    <div className="relative z-10 flex items-center gap-5 min-w-0">
      <span className="text-sm font-medium shrink-0 text-text-muted group-hover:text-black transition-colors duration-300">
        {item.number}
      </span>
      <span className="text-lg md:text-xl font-semibold truncate text-text-heading group-hover:text-black transition-colors duration-300">
        {item.title}
      </span>
    </div>
    <ArrowBtn
      iconBg="bg-white/10"
      iconColor="text-white"
      hoverIconBg="group-hover:bg-black"
      hoverIconColor="group-hover:text-white"
    />
  </Link>
);

// ─────────────────────────────────────────────────────────────────────────────
// ServiceCategoryBlock Component
// ─────────────────────────────────────────────────────────────────────────────
const ServiceCategoryBlock = ({ category, index }) => {
  const [ref, isInView] = useInView({ threshold: 0.1 });
  const imageRight = index % 2 === 0;

  return (
    <div
      ref={ref}
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.55s ease ${index * 80}ms, transform 0.55s cubic-bezier(0.22,1,0.36,1) ${index * 80}ms`,
      }}
      className="py-12 md:py-16"
    >
      <div
        className={`grid grid-cols-1 gap-10 lg:gap-16 ${
          imageRight ? "lg:grid-cols-[4fr_2fr]" : "lg:grid-cols-[2fr_4fr]"
        }`}
      >
        {/* Subcategory rows */}
        <div className={imageRight ? "order-1" : "order-2"}>
          <h3 className="text-text-heading font-medium text-2xl md:text-2xl lg:text-3xl tracking-tight mb-8">
            {category.title}
          </h3>
          <div className="border-t border-border-dark">
            {category.subCategories?.map((sub, i) => (
              <SubServiceRow
                serviceId={category._id}
                key={sub.id}
                item={{ ...sub, number: String(i + 1).padStart(2, "0") }}
              />
            ))}
          </div>
        </div>

        {/* Thumbnail */}
        <div
          className={`w-full rounded-2xl overflow-hidden border border-border-dark ${
            imageRight ? "order-2" : "order-1"
          }`}
          style={{ minHeight: "240px" }}
        >
          <img
            src={category.thumbnail}
            alt={category.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// ServicesHero Component
// ─────────────────────────────────────────────────────────────────────────────
const ServicesHero = ({ heading, subtitle }) => (
  <section className="bg-bg-dark pt-36 pb-16 lg:pt-44 lg:pb-6">
    <div className="max-w-330 mx-auto px-3">
      <div className="flex flex-col items-center text-center lg:items-start lg:text-left mb-8">
        <ArrowBtn
          label="Capabilities"
          iconBg="bg-black"
          iconColor="text-white"
          textColor="text-black"
          padding="px-2 py-2"
          hoverBtnBg="hover:bg-white"
          hoverIconBg="group-hover:bg-black"
          hoverTextColor="group-hover:text-black"
        />
      </div>

      <div className="flex flex-col items-start gap-4">
        <SecHeading title={heading} text="lg:text-6xl" font="font-extrabold" />
        <p className="text-text-muted font-thin md:text-lg max-w-xl tracking-tight text-left">
          {subtitle}
        </p>
      </div>
    </div>
  </section>
);

// ─────────────────────────────────────────────────────────────────────────────
// Main ServicesPage Component
// ─────────────────────────────────────────────────────────────────────────────
const ServicesPage = () => {
  const header = getServicesPageHeader();
  const [scrolled, setScrolled] = useState(false);
  const services = demoServices;

  // Scroll effect for hero
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);


  return (
    <>
      {/* ✅ SEO Component - Complete SEO for Services Page */}
      <SEO
        title="Software & Digital Services | Syed Tec Company"
        description="Syed Tec Company provides web and mobile app development, custom software, UI/UX design, and digital product services."
        keywords="Syed Tec Company services, software development, web development, mobile app development, custom software, UI UX design, digital products"
        url="https://www.ssibannu.com/services"
        image="https://www.ssibannu.com/stc-logo.svg"
        imageWidth="1200"
        imageHeight="630"
        siteName="Syed Tec Company"
        locale="en_US"
        author="Syed Tec Company"
        city="Bannu"
        region="PK-KP"
        twitterCard="summary_large_image"
        isLocalBusiness={true}
        isBreadcrumb={true}
        breadcrumbItems={[
          { name: "Home", url: "https://www.ssibannu.com/" },
          { name: "Services", url: "https://www.ssibannu.com/services" },
        ]}
      />

      <main className="relative bg-bg-dark">
        {/* Hero Section with blur effect */}
        <div
          className={`sticky top-0 transition-all duration-300 ${
            scrolled ? "blur-md opacity-40" : "blur-none opacity-100"
          }`}
        >
          <ServicesHero heading={header.heading} subtitle={header.subtitle} />
        </div>

        {/* Services Categories */}
        <section className="pb-20 lg:pb-28 bg-bg-dark">
          <div className="max-w-330 mx-auto px-3">
            {services?.map((category, index) => (
              <ServiceCategoryBlock
                key={category._id || index}
                category={category}
                index={index}
              />
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <CTASection />
      </main>
    </>
  );
};

export default ServicesPage;