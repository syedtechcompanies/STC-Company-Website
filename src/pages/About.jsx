
// const About = () => {
//     return (
//         <>

//             <Helmet>
//                 <meta
//                     name="description"
//                     content="Learn about SSI Bannu, a leading software house and IT academy in Bannu providing web development, software solutions and IT training."
//                 />

//                 <meta
//                     name="keywords"
//                     content="about SSI Bannu, software house Bannu, IT academy Bannu, web development company Bannu"
//                 />

//                 <link rel="canonical" href="https://www.ssibannu.com/about" />

//                 <meta property="og:title" content="About SSI Bannu" />
//                 <meta
//                     property="og:description"
//                     content="Discover SSI Bannu - a trusted IT academy and software house in Bannu."
//                 />
//                 <meta property="og:type" content="website" />
//                 <meta property="og:url" content="https://www.ssibannu.com/about" />

//                 <meta
//                     property="og:image"
//                     content="https://res.cloudinary.com/dzo12ba3f/image/upload/v1777612042/ssiLogo_xzv8qq.png"
//                 />
//             </Helmet>

//             <main className='pt-4'>
//                 <AboutusComponent />
//                 <StoryComponent />
//                 <OurTeam />
//                 <Testimonial />
//             </main>

//         </>
//     )
// }

// export default About


import React from 'react'
import ValuesComponent from "../components/sections/AboutSection/ValuesComponent.jsx"
import AboutusComponent from '../components/sections/AboutSection/AboutusComponent.jsx'
import StoryComponent from '../components/sections/AboutSection/StoryComponent.jsx'
import OurTeam from '../components/sections/OurTeam'
import Testimonial from '../components/sections/AboutSection/Testimonial.jsx'
import SEO from '../services/SEO'

const About = () => {
    return (
        <>
            {/* ✅ SEO Component - Complete SEO for About Page */}
            <SEO
                // Primary Meta Tags
                title="About Syed Tec Company (STC)"
                description="Meet the team and learn how Syed Tec Company helps businesses build useful digital products and software."
                keywords="about Syed Tec Company, STC, software company, digital products, web development, software solutions"
                
                // URL & Images
                url="https://www.ssibannu.com/about"
                image="https://www.ssibannu.com/stc-logo.svg"
                imageWidth="1200"
                imageHeight="630"
                
                // Site Info
                siteName="Syed Tec Company"
                locale="en_US"
                author="Syed Tec Company"
                
                // Location - Bannu Specific
                city="Bannu"
                region="PK-KP"
                
                // Social Media
                twitterCard="summary_large_image"
                
                // Schema Options
                isLocalBusiness={true}
                isBreadcrumb={true}
                breadcrumbItems={[
                    { name: "Home", url: "https://www.ssibannu.com/" },
                    { name: "About", url: "https://www.ssibannu.com/about" }
                ]}
            />

            <main className='pt-4'>
                <AboutusComponent />
                <StoryComponent />
                <OurTeam />
                <Testimonial />
            </main>
        </>
    )
}

export default About