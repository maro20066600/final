import Image from 'next/image';
import { useState } from 'react';

export default function Header() {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div 
            className="relative w-full flex justify-center mb-12 overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="relative">
                <Image
                    src="/images/PHOTO-2025-07-10-01-09-12.jpg"
                    alt="وزارة الشباب والرياضة - YLY"
                    width={1920}
                    height={1080}
                    className="w-auto h-auto"
                    priority
                />
                <div className={`
                    absolute inset-0 bg-gradient-to-b from-transparent to-black/30
                    transition-opacity duration-700
                    ${isHovered ? 'opacity-70' : 'opacity-40'}
                `}/>
                
                {/* Magical Particles Effect */}
                <div className={`
                    absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2)_1px,transparent_1px)]
                    bg-[length:20px_20px]
                    transition-opacity duration-700 ease-in-out
                    ${isHovered ? 'opacity-100' : 'opacity-0'}
                `}/>
            </div>
        </div>
    );
} 