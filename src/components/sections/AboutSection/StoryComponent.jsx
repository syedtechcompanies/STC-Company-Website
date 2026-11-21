import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowBtn } from '../../UI/ArrowBtn';
import ScrollReveal from '../../../hooks/ScrollReveal';

const StoryComponent = () => {

    const navigate = useNavigate();

    return (
        <div className="w-full bg-white pt-20">

            <div className="mx-auto px-3">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 xl:gap-16">

                    {/* Left Section */}
                    <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start">

                        {/* Section Button */}
                        <div className="mb-3 sm:mb-4 md:mb-6">
                            <ArrowBtn
                                onClick={() => navigate('/services')}
                                label="Our Services"
                                iconBg="bg-black"
                                iconColor="text-white"
                                textColor="text-black"
                                padding="px-2 py-2"
                                hoverBtnBg="hover:bg-white"
                                hoverIconBg="group-hover:bg-black"
                                hoverTextColor="group-hover:text-black"
                            />
                        </div>

                        {/* Heading */}
                        <h2 className="font-medium text-2xl sm:text-3xl md:text-4xl lg:text-[48px] xl:text-[52px] leading-tight tracking-tight text-center lg:text-left">
                            Starting small to shaping
                            <br className="hidden sm:block" />
                            digital experiences
                        </h2>

                    </div>

                    {/* Right Section - Text Content */}
                    <div className="w-full lg:w-1/2">
                        <div className="flex flex-col gap-5 sm:gap-5 gap-y-5">

                            <p className="sm:text-base md:text-lg text-gray-500 text-[16px] leading-relaxed tracking-tighter">
                                Syed Tec Company was founded to help organizations solve real problems through thoughtful technology. We bring together software development, product design, and practical business insight to create useful digital experiences.
                            </p>

                            <p className="sm:text-base md:text-lg text-gray-500 text-[16px] leading-relaxed tracking-tighter">
                                We focus on clear communication, reliable delivery, and solutions built around each client's needs. From early planning through launch, our team works to make every project useful, accessible, and ready to grow.
                            </p>

                        </div>
                    </div>
                </div>
            </div>

            {/* Images Section - single row, fully responsive, no scatter animation */}
            <ScrollReveal className="w-full mt-10">
                <div className="flex flex-row gap-3 sm:gap-4 md:gap-5 lg:gap-6 px-3 w-full">
                    <img
                        src="https://res.cloudinary.com/dzo12ba3f/image/upload/v1778054586/file_qd9o9h.webp"
                        alt="story-1"
                        className="w-1/3 h-52 sm:h-72 md:h-96 lg:h-[32rem] object-cover rounded-xl sm:rounded-2xl transition-transform duration-500 ease-out hover:scale-[1.03]"
                        loading="lazy"
                    />
                    <img
                        src="https://res.cloudinary.com/dzo12ba3f/image/upload/v1778054583/file_dopmcv.webp"
                        alt="story-2"
                        className="w-1/3 h-52 sm:h-72 md:h-96 lg:h-[32rem] object-cover rounded-xl sm:rounded-2xl transition-transform duration-500 ease-out hover:scale-[1.03]"
                        loading="lazy"
                    />
                    <img
                        src="https://res.cloudinary.com/dzo12ba3f/image/upload/v1778054582/file_o4rme5.webp"
                        alt="story-3"
                        className="w-1/3 h-52 sm:h-72 md:h-96 lg:h-[32rem] object-cover rounded-xl sm:rounded-2xl transition-transform duration-500 ease-out hover:scale-[1.03]"
                        loading="lazy"
                    />
                </div>
            </ScrollReveal>

        </div>
    );
};

export default StoryComponent;
