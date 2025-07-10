'use client';

import ContactForm from '@/components/ContactForm';
import Image from 'next/image';
import SocialLinks from '@/components/SocialLinks';

export default function HomePage() {
    return (
        <main className="min-h-screen bg-[#F5F7F8] text-black">
            {/* Logos Header */}
            <div className="flex justify-between items-center px-1 py-2 mb-4">
                <div className="w-[90px] md:w-[120px]">
                    <Image
                        src="/images/logo R/Blue_M.png"
                        alt="M Logo"
                        width={120}
                        height={120}
                        className="h-auto"
                        priority
                    />
                </div>
                <div className="flex-1 px-1 md:px-4 text-center">
                    {/* Mobile View */}
                    <h2 className="font-bold md:hidden whitespace-nowrap">
                        <span className="text-sm text-gray-800">متطوعي وزارة الشباب والرياضة</span>
                        <span className="text-blue-500 text-lg mr-1">YLY</span>
                    </h2>
                    {/* Desktop View */}
                    <h2 className="hidden md:block font-bold whitespace-nowrap">
                        <span className="text-3xl lg:text-4xl text-gray-800">متطوعي وزارة الشباب والرياضة</span>
                        <span className="text-blue-500 text-3xl lg:text-4xl mr-3">YLY</span>
                    </h2>
                </div>
                <div className="w-[90px] md:w-[120px]">
                    <Image
                        src="/images/LOGO L/Blue_YLY.png"
                        alt="YLY Logo"
                        width={120}
                        height={120}
                        className="h-auto"
                        priority
                    />
                </div>
            </div>

            <div className="w-full max-w-4xl mx-auto px-4">
                <ContactForm />
            </div>
            <SocialLinks />
        </main>
    );
}
