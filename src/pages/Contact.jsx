// import React from "react";
// import { MapPin, Phone, Mail } from "lucide-react";
// import { socialLinks } from "../constants/socialLinks.js";
// import ContactForm from "../components/UI/Form.jsx";
// import { Helmet } from "react-helmet-async";


// const ContactPage = () => {
//     return (
//         <>

//             <Helmet>
//                 <title>Contact SSI Bannu | Get in Touch for IT Services & Courses</title>

//                 <meta
//                     name="description"
//                     content="Contact SSI Bannu for web development, software solutions and IT courses in Bannu. We are here to help you grow your career."
//                 />

//                 <meta
//                     name="keywords"
//                     content="contact SSI Bannu, software house contact Bannu, IT academy contact, web development Bannu"
//                 />

//                 <link rel="canonical" href="https://www.ssibannu.com/contact" />

//                 <meta property="og:title" content="Contact SSI Bannu" />
//                 <meta
//                     property="og:description"
//                     content="Get in touch with SSI Bannu for IT services and training in Bannu."
//                 />
//                 <meta property="og:type" content="website" />
//                 <meta property="og:url" content="https://www.ssibannu.com/contact" />

//                 <meta
//                     property="og:image"
//                     content="https://res.cloudinary.com/dzo12ba3f/image/upload/v1777612042/ssiLogo_xzv8qq.png"
//                 />
//             </Helmet>

//             <section className="min-h-screen bg-bg-dark pt-36 pb-20 px-6 lg:px-8">

//                 <div className="max-w-330 mx-auto">

//                     {/* ── HEADING ── */}
//                     <div className="text-center mb-16">
//                         <h1 className="text-text-dark font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight mb-4">
//                             Let's work together
//                         </h1>
//                         <p className="text-text-muted max-w-xl mx-auto text-sm sm:text-base">
//                             Let’s build something impactful together.
//                         </p>
//                     </div>

//                     {/* ── IMAGE + MAP ── */}
//                     <div className="grid md:grid-cols-2 gap-10 mb-20 items-center">

//                         {/* Image */}
//                         <div className="flex justify-center md:justify-start">
//                             <img
//                                 src="https://res.cloudinary.com/dzo12ba3f/image/upload/v1778054308/ssi-frontend-media/file_l3rctm.jpg"
//                                 alt="Contact"
//                                 className="w-72 md:w-96 rounded-2xl object-cover"
//                             />
//                         </div>

//                         {/* Map */}
//                         <div className="rounded-2xl overflow-hidden border border-border-dark h-[300px] md:h-[350px]">
//                             <iframe
//                                 title="Bannu Map"
//                                 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d107096.64159926581!2d70.48658987237324!3d32.98346808626968!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38d807d15d5dcb9f%3A0x594a45bd114db9!2sSYED%20SFOFTWARE%20HOUSE%20bANNU!5e0!3m2!1sen!2s!4v1777877680061!5m2!1sen!2s"
//                                 className="w-full h-full grayscale invert contrast-75"
//                                 loading="lazy"
//                             />
//                         </div>
//                     </div>

//                     {/* ── FORM + INFO ── */}
//                     <div className="grid md:grid-cols-2 gap-12">

//                         {/* FORM */}
//                         <ContactForm />

//                         {/* CONTACT INFO */}
//                         <div className="space-y-6">

//                             <div className="flex gap-4">
//                                 <Phone className="text-text-muted" />
//                                 <div>
//                                     <h3 className="text-text-dark font-semibold">Call</h3>
//                                     <p className="text-text-muted text-sm">+92319162469</p>
//                                 </div>
//                             </div>

//                             <div className="flex gap-4">
//                                 <Mail className="text-text-muted" />
//                                 <div>
//                                     <h3 className="text-text-dark font-semibold">Email</h3>
//                                     <p className="text-text-muted text-sm">info@ssi.com</p>
//                                 </div>
//                             </div>

//                             <div className="flex gap-4">
//                                 <MapPin className="text-text-muted" />
//                                 <div>
//                                     <h3 className="text-text-dark font-semibold">Location</h3>
//                                     <p className="text-text-muted text-sm">Bannu, KPK, Pakistan</p>
//                                 </div>
//                             </div>

//                             {/* Social */}
//                             <div className="pt-4">
//                                 <p className="text-text-label text-xs uppercase tracking-widest mb-3">
//                                     Follow Us
//                                 </p>
//                                 <div className="flex gap-4">
//                                     {socialLinks.map((link, i) => (
//                                         <a key={i} href={link.href}
//                                             className={link.hoverClass} >
//                                             <link.Icon className={` w-5 h-5`} />
//                                         </a>
//                                     ))}
//                                 </div>
//                             </div>

//                         </div>

//                     </div>
//                 </div>
//             </section>
//         </>
//     );
// };

// export default ContactPage;


import React from "react";
import { MapPin, Phone, MessageCircle } from "lucide-react";
import { socialLinks } from "../constants/socialLinks.js";
import ContactForm from "../components/UI/Form.jsx";
import SEO from '../services/SEO'; // ✅ SEO Component Import

const ContactPage = () => {
    // 🔹 Schema for Contact Page
    const contactSchema = {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "name": "Contact Syed Tech Company",
        "description": "Get in touch with Syed Tech Company about software development and digital product services.",
        "url": "https://www.ssibannu.com/contact",
        "mainEntity": {
            "@type": "Organization",
            "name": "Syed Tech Company",
            "address": {
                "@type": "PostalAddress",
                "addressLocality": "Bannu",
                "addressRegion": "KPK",
                "addressCountry": "Pakistan"
            },
            "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+92319162469",
                "contactType": "Customer Support",
                "availableLanguage": ["English", "Urdu"]
            }
        }
    };

    return (
        <>
            {/* ✅ SEO Component - Complete SEO for Contact Page */}
            <SEO
                // Primary Meta Tags
                title="Contact Syed Tech Company | Start a Project"
                description="Contact Syed Tech Company to discuss custom software, web development, mobile applications, and digital product design."
                keywords="contact Syed Tech Company, STC software company, software development, web development, mobile apps, digital product design"

                // URL & Images
                url="https://www.ssibannu.com/contact"
                image="https://www.ssibannu.com/stc-logo.svg"
                imageWidth="1200"
                imageHeight="630"

                // Site Info
                siteName="Syed Tech Company"
                locale="en_US"
                author="Syed Tech Company"

                // Location - Bannu Specific
                city="Bannu"
                region="PK-KP"

                // Social Media
                twitterCard="summary_large_image"

                // ✅ Schema Options
                isLocalBusiness={true}     // ✅ Local Business Schema
                isBreadcrumb={true}        // ✅ Breadcrumb Schema
                breadcrumbItems={[
                    { name: "Home", url: "https://www.ssibannu.com/" },
                    { name: "Contact", url: "https://www.ssibannu.com/contact" }
                ]}
            >
                {/* ✅ Custom Schema for Contact Page */}
                <script type="application/ld+json">
                    {JSON.stringify(contactSchema)}
                </script>
            </SEO>

            <section className="bg-bg-section px-5 pb-16 pt-28 sm:px-8 md:pt-32 lg:px-10 lg:pb-24">
                <div className="mx-auto w-full max-w-330">
                    <header className="mb-10 max-w-4xl md:mb-14">
                        <div>
                            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-text-label">
                                Contact Syed Tech Company
                            </p>
                            <h1 className="max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight text-text-dark sm:text-5xl lg:text-6xl">
                                Let&apos;s talk about your next project.
                            </h1>
                            <p className="mt-5 max-w-xl text-base leading-relaxed text-text-label md:text-lg">
                                Tell us what you want to build or improve. We&apos;ll listen to your goals and help you find a practical next step.
                            </p>
                        </div>
                    </header>

                    <div className="grid min-w-0 gap-6 xl:grid-cols-2 xl:gap-8">
                        <div className="relative h-[360px] min-w-0 overflow-hidden rounded-3xl border border-border-light bg-white sm:h-[440px]">
                            <img
                                src="https://res.cloudinary.com/dzo12ba3f/image/upload/v1778054308/ssi-frontend-media/file_l3rctm.jpg"
                                alt="Syed Tech Company office in Bannu"
                                className="absolute inset-0 h-full w-full object-cover object-top"
                                loading="lazy"
                            />
                        </div>

                        <div className="min-w-0 rounded-3xl border border-border-light bg-white p-6 sm:p-8 lg:p-10">
                            <h2 className="mb-2 text-2xl font-semibold tracking-tight text-text-dark sm:text-3xl">
                                Tell us about your project
                            </h2>
                            <p className="mb-7 max-w-xl text-sm leading-relaxed text-text-label sm:text-base">
                                Share a few details and our team will be ready to discuss your idea.
                            </p>
                            <ContactForm />
                        </div>
                    </div>

                    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        <a
                            href="tel:+92319162469"
                            className="flex items-start gap-3 rounded-2xl border border-border-light bg-white p-5 transition-shadow hover:shadow-lg"
                        >
                            <Phone className="mt-0.5 h-5 w-5 shrink-0 text-text-dark" />
                            <span>
                                <span className="block font-semibold text-text-dark">Call our team</span>
                                <span className="mt-1 block text-sm text-text-label">+92 319 162469</span>
                            </span>
                        </a>

                        <a
                            href="https://wa.me/923213268095"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-start gap-3 rounded-2xl border border-border-light bg-white p-5 transition-shadow hover:shadow-lg"
                        >
                            <MessageCircle className="mt-0.5 h-5 w-5 shrink-0 text-text-dark" />
                            <span>
                                <span className="block font-semibold text-text-dark">WhatsApp</span>
                                <span className="mt-1 block text-sm text-text-label">+92 321 3268095</span>
                            </span>
                        </a>

                        <div className="flex items-start gap-3 rounded-2xl border border-border-light bg-white p-5">
                            <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-text-dark" />
                            <span>
                                <span className="block font-semibold text-text-dark">Visit us</span>
                                <span className="mt-1 block text-sm text-text-label">Bannu, KPK, Pakistan</span>
                            </span>
                        </div>

                        <div className="flex items-center justify-between gap-3 rounded-2xl bg-bg-card p-5 text-text-primary">
                            <span className="text-sm font-semibold">Follow STC</span>
                            <span className="flex gap-2">
                                {socialLinks.map((link) => (
                                    <a
                                        key={link.label}
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={`Follow Syed Tech Company on ${link.label}`}
                                        className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white hover:text-black"
                                    >
                                        <link.Icon className="h-4 w-4" />
                                    </a>
                                ))}
                            </span>
                        </div>
                    </div>

                    <section className="mt-14 md:mt-20">
                        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                            <div>
                                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-text-label">
                                    Find us
                                </p>
                                <h2 className="text-2xl font-semibold tracking-tight text-text-dark sm:text-3xl">
                                    Come meet us in Bannu
                                </h2>
                            </div>
                            <p className="text-sm text-text-label">Bannu, KPK, Pakistan</p>
                        </div>
                        <div className="h-[300px] overflow-hidden rounded-3xl border border-border-light bg-white shadow-sm sm:h-[380px] lg:h-[440px]">
                            <iframe
                                title="Syed Tech Company location map - Bannu, Pakistan"
                                src="https://www.google.com/maps?q=32.98346808626968,70.48658987237324&z=15&output=embed"
                                className="h-full w-full border-0"
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>
                    </section>
                </div>
            </section>
        </>
    );
};

export default ContactPage;