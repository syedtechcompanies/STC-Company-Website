// import React from 'react'
// import OurTeam from '../components/sections/OurTeam'
// import About from '../components/sections/About'
// import FAQ from '../components/sections/FAQ'
// import Cta from '../components/sections/Cta'
// import Services from '../components/sections/Services'
// import Projects from '../components/sections/Projects'
// import HeroSection from '../components/sections/Hero'
// // import { Helmet } from "react-helmet-async";
// import SEO from '../services/SEO.jsx'


// const Home = () => {


//     return (
//         <>

//             <Helmet>
//                 <title>SSI Bannu | Best Software House in Bannu</title>
//                 <meta name="description" content="SSI Bannu provides web development, software solutions and IT courses in Bannu." />
//                 <meta name="keywords" content="software house in Bannu, web development Bannu, IT courses Bannu" />

//                 <link rel="canonical" href="https://www.ssibannu.com/" />

//                 <meta property="og:url" content="https://www.ssibannu.com/" />
//                 <meta property="og:type" content="website" />
//                 <meta property="og:title" content="SSI Bannu" />
//                 <meta property="og:description" content="Best IT and Software Academy in Bannu" />
//                 <meta property="og:image" content="https://res.cloudinary.com/dzo12ba3f/image/upload/v1777612042/ssiLogo_xzv8qq.png" />
//                 <meta property="og:image:width" content="1200" />
//                 <meta property="og:image:height" content="630" />
//             </Helmet>

//             <main className='min-h-auto w-full'>

//                 <HeroSection />

//                 <About />

//                 <Projects />

//                 <Services />

//                 <OurTeam />

//                 <FAQ />

//                 <Cta />
//             </main>

//         </>
//     )
// }

// export default Home


import React from 'react'
import OurTeam from '../components/sections/OurTeam'
import About from '../components/sections/About'
import FAQ from '../components/sections/FAQ'
import Services from '../components/sections/Services'
import Projects from '../components/sections/Projects'
import HeroSection from '../components/sections/Hero'
import SEO from '../services/SEO.jsx'

const Home = () => {
    return (
        <>
            {/* ✅ SEO Component - All SEO in one place */}
            <SEO
                title="Syed Tec Company (STC) | Software & Digital Solutions"

                description="Syed Tec Company builds custom software, websites, mobile applications, and digital experiences for businesses."

                keywords={[
                    "Syed Tec Company",
                    "STC software company",
                    "software development",
                    "custom software solutions",
                    "web development",
                    "mobile app development",
                    "UI UX design",
                    "digital product design",
                    "business technology solutions",
                    "software company Bannu",
                ]}

                url="https://www.ssibannu.com/"
                image="https://www.ssibannu.com/stc-logo.svg"

                siteName="Syed Tec Company"

                author="Syed Tec Company"

                city="Bannu"
                region="PK-KP"

                isLocalBusiness={true}
                isBreadcrumb={true}
                breadcrumbItems={[
                    {
                        name: "Home",
                        url: "https://www.ssibannu.com/"
                    }
                ]}
            />

            <main className='min-h-auto w-full'>
                <HeroSection />
                <About />
                <Projects />
                <Services />
                <OurTeam />
                <FAQ />
            </main>
        </>
    )
}

export default Home


