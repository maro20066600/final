'use client';

import ContactForm from '@/components/ContactForm';
import Image from 'next/image';
import SocialLinks from '@/components/SocialLinks';

export default function HomePage() {
    return (
        <main className="min-h-screen bg-[#F5F7F8] text-black">
            {/* Mobile Logos */}
            <div className="flex justify-between items-center px-0.5 py-2 mb-4">
                <div className="w-[75px]">
                    <Image
                        src="/images/LOGO L/Blue_YLY.png"
                        alt="YLY Logo"
                        width={75}
                        height={75}
                        className="h-auto"
                        priority
                    />
                </div>
                <div className="flex-1 px-0 text-center">
                    <h2 className="font-bold">
                        <span className="text-xs block text-gray-800">متطوعي وزارة</span>
                        <span className="text-xs block text-gray-800">الشباب والرياضة</span>
                        <span className="text-blue-500 text-base block">YLY</span>
                    </h2>
                </div>
                <div className="w-[75px]">
                    <Image
                        src="/images/logo R/Blue_M.png"
                        alt="M Logo"
                        width={75}
                        height={75}
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
