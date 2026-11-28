export { ProjectsFullData } from "./Projectsdata.js";
export { TeamData } from "./HomeData.js";

export const demoServices = [
  {
    _id: "web-development",
    title: "Development Work",
    thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200",
    subCategories: [
      { id: "website-development", title: "Website Development", number: "01" },
      { id: "desktop-development", title: "Desktop Development", number: "02" },
      { id: "android-development", title: "Android Development", number: "03" },
    ],
  },
  {
    _id: "design-branding",
    title: "Design & Branding",
    thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200",
    subCategories: [
      { id: "ui-ux", title: "UI/UX Design", number: "01" },
      { id: "brand-identity", title: "Brand Identity", number: "02" },
      { id: "graphics", title: "Graphic Design", number: "03" },
    ],
  },
];

export const demoServiceDetails = {
  "web-apps": {
    id: "web-apps",
    title: "Custom Web Applications",
    subtitle: "Fast, scalable, and tailored for your business.",
    about: "We design and build reliable web applications with modern technology, clear workflows, and responsive interfaces.",
    description: "From internal dashboards to customer-facing platforms, every solution is built around practical requirements.",
    benefits: [
      { title: "Responsive Design", caption: "Works smoothly across mobile, tablet, and desktop devices." },
      { title: "Modern Technology", caption: "Built with maintainable components and current development practices." },
    ],
    whyTake: "A custom web application helps automate work, improve customer experience, and scale with your organization.",
    images: [
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1400&auto=format&fit=crop&q=85",
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1400&auto=format&fit=crop&q=85",
    ],
  },
  "ui-ux": {
    id: "ui-ux",
    title: "UI/UX Design",
    subtitle: "Clear, useful, and engaging digital experiences.",
    about: "We turn ideas into accessible interfaces through research, wireframes, prototypes, and visual design.",
    description: "Our process focuses on users, usability, and a consistent visual system.",
    benefits: [
      { title: "User-Focused", caption: "Interfaces are planned around real tasks and user expectations." },
      { title: "Prototype Ready", caption: "Clickable flows make ideas easy to validate before development." },
    ],
    whyTake: "Good UI/UX improves usability, trust, and conversion across every digital product.",
    images: [
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1400&auto=format&fit=crop&q=85",
      "https://images.unsplash.com/photo-1559028006-448665bd7c7f?w=1400&auto=format&fit=crop&q=85",
    ],
  },
  "business-sites": {
    id: "business-sites",
    title: "Business Websites",
    subtitle: "A clear, fast, and professional home for your business online.",
    about: "We build responsive websites that explain your offer, represent your brand, and make it easy for customers to take the next step.",
    description: "From company websites to portfolio and landing pages, we focus on clear content, accessible design, and dependable performance.",
    benefits: [
      { title: "Responsive Layouts", caption: "Designed to work well on phones, tablets, and desktops." },
      { title: "Clear Calls to Action", caption: "Help visitors find information and contact your team." },
    ],
    whyTake: "A professional website gives customers a reliable way to discover your business and understand what you offer.",
    images: [
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1400&auto=format&fit=crop&q=85",
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1400&auto=format&fit=crop&q=85",
    ],
  },
  ecommerce: {
    id: "ecommerce",
    title: "E-commerce Solutions",
    subtitle: "Simple, secure shopping experiences for your customers.",
    about: "We create online stores that make it easy to browse products, place orders, and manage everyday commerce workflows.",
    description: "Storefronts are tailored to your catalog, business requirements, and customer experience goals.",
    benefits: [
      { title: "Smooth Checkout", caption: "Clear purchase flows designed for desktop and mobile." },
      { title: "Product Management", caption: "Organized product details, categories, and inventory workflows." },
    ],
    whyTake: "An effective online store helps businesses reach more customers and manage orders with less friction.",
    images: [
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1400&auto=format&fit=crop&q=85",
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1400&auto=format&fit=crop&q=85",
    ],
  },
  "website-development": {
    id: "website-development",
    title: "Website Development",
    subtitle: "Responsive, reliable websites tailored to your business.",
    about: "We build websites that present your business clearly and help customers find the information and services they need.",
    description: "From company websites to landing pages, we focus on responsive layouts, accessible content, and dependable performance.",
    benefits: [
      { title: "Responsive Design", caption: "Works smoothly across mobile, tablet, and desktop devices." },
      { title: "Built for Your Goals", caption: "Pages and features are planned around your business and customers." },
    ],
    whyTake: "A well-built website helps people discover your business, understand your offer, and get in touch.",
    images: [
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1400&auto=format&fit=crop&q=85",
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1400&auto=format&fit=crop&q=85",
    ],
  },
  "desktop-development": {
    id: "desktop-development",
    title: "Desktop Development",
    subtitle: "Desktop software designed around your workflows.",
    about: "We develop desktop applications that help teams manage their everyday work with focused, easy-to-use software.",
    description: "From internal tools to specialized business applications, we build practical desktop experiences for your requirements.",
    benefits: [
      { title: "Purpose-Built Tools", caption: "Features and workflows are tailored to your team's needs." },
      { title: "Reliable Performance", caption: "Designed for dependable use across daily operations." },
    ],
    whyTake: "Custom desktop software can streamline work and provide tools that fit the way your team operates.",
    images: [
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1400&auto=format&fit=crop&q=85",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1400&auto=format&fit=crop&q=85",
    ],
  },
  "android-development": {
    id: "android-development",
    title: "Android Development",
    subtitle: "Useful Android apps for your customers and your team.",
    about: "We create Android applications that make your services and workflows accessible on mobile devices.",
    description: "From planning to release, we focus on clear interfaces, useful features, and reliable performance across Android devices.",
    benefits: [
      { title: "Mobile-First Experience", caption: "Interfaces designed for everyday use on Android phones and tablets." },
      { title: "Practical Features", caption: "App functionality is built around your users and business goals." },
    ],
    whyTake: "An Android app can make your services easier to access and help your customers stay connected wherever they are.",
    images: [
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9?w=1400&auto=format&fit=crop&q=85",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1400&auto=format&fit=crop&q=85",
    ],
  },
  "brand-identity": {
    id: "brand-identity",
    title: "Brand Identity",
    subtitle: "A consistent identity that makes your business recognizable.",
    about: "We create visual identity systems that help businesses communicate clearly across their website and digital channels.",
    description: "Our design work can include logo direction, typography, color, and practical brand guidelines.",
    benefits: [
      { title: "Consistent Visuals", caption: "A cohesive system for your brand's digital presence." },
      { title: "Practical Guidelines", caption: "Reusable direction that supports future marketing and product work." },
    ],
    whyTake: "A thoughtful brand identity helps your business communicate with clarity and build recognition over time.",
    images: [
      "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1400&auto=format&fit=crop&q=85",
      "https://images.unsplash.com/photo-1634942536790-2536e140de4c?w=1400&auto=format&fit=crop&q=85",
    ],
  },
  graphics: {
    id: "graphics",
    title: "Graphic Design",
    subtitle: "Purposeful visuals for your brand and digital products.",
    about: "We design digital and marketing assets that support your brand and communicate information clearly.",
    description: "From social graphics to product visuals, each asset is shaped for its audience and platform.",
    benefits: [
      { title: "Brand-Aligned", caption: "Visuals follow a consistent style across your communication." },
      { title: "Platform-Ready", caption: "Assets are prepared for the channels where your audience sees them." },
    ],
    whyTake: "Clear, consistent visuals make your brand easier to recognize and your message easier to understand.",
    images: [
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1400&auto=format&fit=crop&q=85",
      "https://images.unsplash.com/photo-1545235617-9465d2a55698?w=1400&auto=format&fit=crop&q=85",
    ],
  },
};
