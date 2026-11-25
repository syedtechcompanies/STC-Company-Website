// FOOTER SECTION

export const NAV_COLUMNS = [
    {
        heading: "Explore",
        links: [
            { label: "Home", href: "/" },
            { label: "About us", href: "/about" },
            { label: "Projects", href: "/projects" },
            { label: "Services", href: "/services" },
        ],
    },

    {
        heading: "Company",
        links: [
            { label: "Contact", href: "/contact" },
            { label: "Team", href: "/team" },
        ],
    },

    // {
    //     heading: "Resources",
    //     links: [
    //         { label: "Style Guide", href: "/style-guide" },
    //         { label: "Licenses", href: "/licenses" },
    //         { label: "Changelog", href: "/changelog" },
    //         { label: "401", href: "/401" },
    //     ],
    // },
];



export const FooterLists = {
    brand: {
        name: "STC",
        description:
            "Turning business challenges into clear, capable digital experiences.",
        logo: "logo.svg",
    },

    newsletter: {
        heading: "Product ideas, delivered",
        placeholder: "Your work email",
        button: "Join updates",
    },

    copyright: {
        text: `© ${new Date().getFullYear()} Syed Tec Company. All rights reserved.`,
    },
};