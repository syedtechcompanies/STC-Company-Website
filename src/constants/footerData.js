// FOOTER SECTION

export const NAV_COLUMNS = [
    {
        heading: "Navigations",
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
            "Software and digital product solutions for growing businesses.",
        logo: "logo.svg",
    },

    newsletter: {
        heading: "Subscribe to our newsletter",
        placeholder: "Enter your email",
        button: "Subscribe",
    },

    copyright: {
        text: `© ${new Date().getFullYear()} Syed Tec Company. All rights reserved.`,
    },
};