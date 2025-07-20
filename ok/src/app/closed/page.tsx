'use client';

import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import Confetti from 'react-confetti';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function ClosedPage() {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#F5F7F8] relative overflow-hidden">
      {/* Header with Logos */}
      <div className="flex justify-between items-center px-1 py-2 mb-4">
        <div className="w-[90px] md:w-[120px]">
          <Image
            src="/images/LOGO L/White_M.png"
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
            src="/images/LOGO L/White_YLY.png"
            alt="YLY Logo"
            width={120}
            height={120}
            className="h-auto"
            priority
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
        {showConfetti && <Confetti numberOfPieces={400} recycle={false} />}
        
        <motion.div 
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-md"
        >
          <div>
            {/* ✨ أيقونة النجاح */}
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
              className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-100"
            >
              <svg className="h-10 w-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </motion.div>

            {/* 🎉 عنوان النجاح */}
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-6 text-center text-3xl font-extrabold text-gray-900"
            >
              تم إغلاق باب التسجيل!
            </motion.h2>

            {/* 🎯 عداد المتقدمين */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-6 text-center"
            >
              <h3 className="text-4xl font-bold text-blue-600 mb-4">
                <CountUp end={60000} duration={4} separator="," />
                +
              </h3>
              <p className="text-lg text-gray-600 mb-2">متقدم للتطوع</p>
            </motion.div>

            {/* 📝 رسالة */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-6 text-center"
            >
              <p className="text-gray-600 text-lg mb-4">
                شكراً لكل المتقدمين! تم تحقيق الهدف وأكثر 🎉
              </p>
              <p className="text-gray-600">
                انتظروا رسالة على الواتساب لتحديد موعد المقابلة 📱
              </p>
            </motion.div>

            {/* 🌐 روابط السوشيال */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-8 grid grid-cols-2 gap-4"
            >
              <a
                href="https://www.facebook.com/ylyministry"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                فيسبوك
              </a>
              <a
                href="https://www.instagram.com/ylyministry"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center p-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
              >
                انستجرام
              </a>
              <a
                href="https://www.tiktok.com/@ylyministry"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center p-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
              >
                تيك توك
              </a>
              <a
                href="https://www.linkedin.com/company/ylyministry"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center p-3 bg-blue-800 text-white rounded-lg hover:bg-blue-900 transition-colors"
              >
                لينكد إن
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Developer Signature */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="w-full py-8 text-center bg-white/50 backdrop-blur-sm"
      >
        <motion.p 
          className="text-gray-600 text-2xl md:text-2xl lg:text-3xl font-semibold"
          animate={{ 
            y: [-10, 0, -10],
            transition: {
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
        >
          Developed with{' '}
          <motion.span
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-block text-blue-500"
          >
            💙
          </motion.span>
          {' '}by{' '}
          <motion.a
            href="https://linktr.ee/marwan_maro"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 font-bold"
            whileHover={{ 
              scale: 1.1,
              rotate: [-2, 2, -2],
              transition: { duration: 0.3 }
            }}
            whileTap={{ scale: 0.95 }}
          >
            MARO
          </motion.a>
        </motion.p>
      </motion.div>
    </div>
  );
} 
