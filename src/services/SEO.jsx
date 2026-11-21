// components/SEO.jsx
import React from 'react';
import { Helmet } from "react-helmet-async";

const SEO = ({
    // Required props
    title,
    description,
    keywords,
    
    // Optional props with defaults
    url = "https://www.ssibannu.com/",
    image = "https://www.ssibannu.com/stc-logo.svg",
    imageWidth = "1200",
    imageHeight = "630",
    type = "website",
    siteName = "Syed Tec Company",
    locale = "en_US",
    
    // Schema props
    isLocalBusiness = true,
    isBreadcrumb = false,
    breadcrumbItems = [],
    
    // Additional meta
    author = "Syed Tec Company",
    robots = "index, follow, max-snippet:-1, max-video-preview:-1, max-image-preview:large",
    
    // Location
    city = "Bannu",
    region = "PK-KP",
    country = "PK",
    
    // Social
    twitterCard = "summary_large_image",
    facebookAppId = "", // Optional
    
    // Children for custom schema
    children
}) => {
    
    // ===== HELPER FUNCTIONS =====
    const generateKeywords = () => {
        const baseKeywords = [
            "Syed Tec Company",
            "STC software company",
            "software development",
            "web development",
            "mobile app development",
            "UI UX design",
            "digital solutions"
        ];
        
        if (keywords) {
            const customKeywords = Array.isArray(keywords) ? keywords : keywords.split(',').map(k => k.trim());
            return [...baseKeywords, ...customKeywords].join(', ');
        }
        
        return baseKeywords.join(', ');
    };

    // ===== SCHEMA BUILDERS =====
    const getLocalBusinessSchema = () => ({
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Syed Tec Company",
        "alternateName": "STC",
        "url": url,
        "logo": image,
        "description": description || "Syed Tec Company builds custom software and digital experiences for businesses.",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": city,
            "addressRegion": region,
            "addressCountry": country
        },
        "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "Customer Support",
            "availableLanguage": ["English", "Urdu"]
        }
    });

    const getBreadcrumbSchema = () => ({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbItems.map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.name,
            "item": item.url
        }))
    });

    // ===== BUILD SCHEMA LIST =====
    const schemas = [];
    
    if (isLocalBusiness) {
        schemas.push(getLocalBusinessSchema());
    }
    
    if (isBreadcrumb && breadcrumbItems.length > 0) {
        schemas.push(getBreadcrumbSchema());
    }

    // ===== RENDER =====
    return (
        <Helmet>
            {/* === Primary Meta Tags === */}
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={generateKeywords()} />
            
            {/* === Canonical URL === */}
            <link rel="canonical" href={url} />
            
            {/* === Language and Region === */}
            <html lang="en" />
            <meta name="geo.region" content={region} />
            <meta name="geo.placename" content={city} />
            <meta name="geo.position" content="32.9851;70.6048" />
            <meta name="ICBM" content="32.9851, 70.6048" />
            
            {/* === Mobile Optimization === */}
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta name="theme-color" content="#2563eb" />
            
            {/* === Open Graph / Facebook === */}
            <meta property="og:url" content={url} />
            <meta property="og:type" content={type} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="og:image:width" content={imageWidth} />
            <meta property="og:image:height" content={imageHeight} />
            <meta property="og:image:alt" content={`${siteName} - ${title}`} />
            <meta property="og:site_name" content={siteName} />
            <meta property="og:locale" content={locale} />
            {facebookAppId && <meta property="fb:app_id" content={facebookAppId} />}
            
            {/* === Twitter Card === */}
            <meta name="twitter:card" content={twitterCard} />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />
            <meta name="twitter:image:alt" content={`${siteName} - ${title}`} />
            
            {/* === Robots === */}
            <meta name="robots" content={robots} />
            <meta name="googlebot" content="index, follow" />
            
            {/* === Author & Publisher === */}
            <meta name="author" content={author} />
            <meta name="publisher" content={siteName} />
            <meta name="revisit-after" content="7 days" />
            <meta name="distribution" content="global" />
            
            {/* === Dublin Core === */}
            <meta name="DC.title" content={title} />
            <meta name="DC.description" content={description} />
            <meta name="DC.language" content={locale} />
            
            {/* === JSON-LD Structured Data === */}
            {schemas.map((schema, index) => (
                <script key={index} type="application/ld+json">
                    {JSON.stringify(schema)}
                </script>
            ))}
            
            {/* === Custom Schema === */}
            {children}
        </Helmet>
    );
};

export default SEO;