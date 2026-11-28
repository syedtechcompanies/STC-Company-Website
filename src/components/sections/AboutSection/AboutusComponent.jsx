import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import AnimatedNumber from '../../../components/UI/AnimatedNumber.jsx';
import ScrollReveal from '../../../hooks/ScrollReveal';

const AboutusComponent = () => {
    const stats = [
        { value: "85", label: "Across disciplines", name: "Projects" },
        { value: "90", label: "Relationships nurtured", name: "Satisfaction" },
        { value: "95", label: "From insight to execution", name: "Approach" },
    ];

    const headerRef = useRef(null);
    const statsRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline();

        tl.fromTo(headerRef.current,
            { y: 100, opacity: 0 },
            { y: 0, opacity: 1, duration: 1 }
        )
            .fromTo(statsRef.current,
                { y: 100, opacity: 0 },
                { y: 0, opacity: 1, duration: 1 },
                "-=0.3"
            );
    }, []);

    return (
        <div className="w-full bg-white px-2 mt-18">
            <div className="mx-auto">
                {/* Header */}
                <div ref={headerRef} className="flex flex-col items-center gap-4 md:gap-6 lg:items-start lg:gap-2">
                    <h1 className="text-5xl sm:text-6xl lg:text-[80px] font-bold text-black text-center lg:text-left">
                        Who we are
                    </h1>

                    <p className="text-md sm:text-lg text-gray-500 text-center lg:text-left max-w-xl">
                        We combine practical engineering with thoughtful design.
                        <br />
                        design and useful features, project after project.
                    </p>
                </div>

                {/* Image */}
                <ScrollReveal className="mt-6 md:mt-8 lg:mt-12">
                    <img
                        src="https://res.cloudinary.com/dzo12ba3f/image/upload/v1778054579/file_bzdrsq.webp"
                        alt="About us"
                        className="w-full h-auto object-cover rounded-lg"
                        loading='lazy'
                    />
                </ScrollReveal>

                {/* Stats */}
                <div ref={statsRef} className="mt-8 md:mt-10 lg:mt-16">
                    <div className="border border-[#D1D1D1] rounded-2xl bg-white overflow-hidden">
                        <div className="flex flex-row">
                            {stats.map((item, index) => (
                                <div key={index} className="min-w-0 flex-1 flex flex-col items-center justify-center text-center px-2 py-5 sm:px-3 md:py-8 relative">

                                    {index !== 0 && (
                                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-12 md:h-20 bg-[#E5E5E5]" />
                                    )}

                                    <h2 className="whitespace-nowrap text-2xl sm:text-3xl md:text-5xl lg:text-[64px] font-medium text-[#1a1a1a] flex items-center">
                                        <AnimatedNumber number={parseInt(item.value)} />
                                        %
                                    </h2>

                                    <p className="mt-2 text-[10px] leading-tight text-gray-500 sm:text-xs md:text-sm">
                                        {item.label}
                                    </p>

                                    <p className="mt-1 text-xs font-medium text-black sm:text-sm md:text-base">
                                        {item.name}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutusComponent;