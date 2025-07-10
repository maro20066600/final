'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function SuccessPage() {
    useEffect(() => {
        // يمكن إضافة تتبع analytics هنا إذا كنت تريد
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F5F7F8] py-12 px-4 sm:px-6 lg:px-8">
            <motion.div 
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-md"
            >
                <div>
                    <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
                        className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100"
                    >
                        <svg 
                            className="h-10 w-10 text-green-600" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth="2" 
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                    </motion.div>
                    
                    <motion.h2 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="mt-6 text-center text-3xl font-extrabold text-gray-900"
                    >
                        تم التسجيل بنجاح!
                    </motion.h2>
                    
                    <motion.p 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="mt-2 text-center text-sm text-gray-600"
                    >
                        شكراً لتسجيلك مع متطوعي وزارة الشباب والرياضة YLY، استنّى رسالتنا 😉
                    </motion.p>

                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="mt-8 flex justify-center"
                    >
                        <a
                            href="https://www.facebook.com/Ylyministryy"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 gap-2"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            استنّانا على صفحة الفيسبوك
                        </a>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}
