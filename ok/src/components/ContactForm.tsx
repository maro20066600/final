'use client';

import { useState } from 'react';
import { database } from '@/lib/firebase';
import { ref, push } from 'firebase/database';
import { sendToGoogleSheets } from '@/lib/googleSheets';
import type { VolunteerFormData } from '@/lib/googleSheets';
import { useRouter } from 'next/navigation';
import Header from './Header';
import MyRecaptcha from './MyRecaptcha';

// تعريف اللجان المتاحة
const COMMITTEES = [
    'Public Relations (PR) - العلاقات العامة',
    'Human Resources (HR) - الموارد البشرية',
    'Operations (OR) - العمليات',
    'Social Media (SM) - وسائل التواصل الاجتماعي'
];

// تعريف المحافظات
const GOVERNORATES = [
    'أسوان',
    'الأقصر',
    'قنا',
    'سوهاج',
    'أسيوط',
    'المنيا',
    'بني سويف',
    'الفيوم',
    'الجيزة',
    'القاهرة',
    'القليوبية',
    'المنوفية',
    'الغربية',
    'كفر الشيخ',
    'الدقهلية',
    'دمياط',
    'الشرقية',
    'الإسماعيلية',
    'بورسعيد',
    'السويس',
    'البحيرة',
    'الإسكندرية',
    'مرسى مطروح',
    'شمال سيناء',
    'جنوب سيناء',
    'البحر الأحمر',
    'الوادي الجديد'
];

export default function ContactForm() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formError, setFormError] = useState('');
    const [captchaToken, setCaptchaToken] = useState('');

    const [formData, setFormData] = useState<Omit<VolunteerFormData, "timestamp">>({
        fullNameArabic: '',
        phone: '',
        email: '',
        governorate: '',
        university: '',
        faculty: '',
        year: '',
        committee: '',
        hasVolunteered: '',
        volunteer: '',
        acceptTerms: false
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        
        // Handle checkbox separately
        if (type === 'checkbox') {
            const target = e.target as HTMLInputElement;
            setFormData(prev => ({
                ...prev,
                [name]: target.checked
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));

            // Clear any existing error
            setFormError('');

            // Validate phone number as user types
            if (name === 'phone' && value && !/^01[0125][0-9]{0,8}$/.test(value)) {
                setFormError('رقم الموبايل يجب أن يبدأ بـ 01 ويتكون من 11 رقم');
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isSubmitting) return;

        // التحقق من الكابتشا
        if (!captchaToken) {
            setFormError('من فضلك أكّد أنك لست روبوتًا');
            return;
        }

        // التحقق من صحة رقم الموبايل
        if (!/^01[0125][0-9]{8}$/.test(formData.phone)) {
            setFormError('رقم الموبايل غير صحيح. يجب أن يكون 11 رقم ويبدأ بـ 01');
            return;
        }

        // التحقق من اختيار خيار التطوع السابق
        if (!formData.hasVolunteered) {
            setFormError('من فضلك اختر ما إذا كنت قد تطوعت من قبل أم لا');
            return;
        }

        // التحقق من إدخال خبرة التطوع إذا كان الاختيار "نعم"
        if (formData.hasVolunteered === "نعم" && !formData.volunteer.trim()) {
            setFormError('من فضلك اكتب عن خبرتك في التطوع');
            return;
        }

        try {
            setIsSubmitting(true);
            setFormError('');

            // إضافة الطابع الزمني
            const timestamp = new Date().toISOString();
            const fullFormData = {
                ...formData,
                timestamp
            };

            // حفظ في Firebase
            try {
                const volunteerRef = ref(database, 'volunteers');
                await push(volunteerRef, fullFormData);
            } catch (firebaseError) {
                console.error('Firebase error:', firebaseError);
                setFormError('حدث خطأ في حفظ البيانات. يرجى المحاولة مرة أخرى.');
                return;
            }

            // إرسال إلى Google Sheets
            try {
                const sheetsResult = await sendToGoogleSheets(fullFormData);
                if (!sheetsResult) {
                    throw new Error('Failed to send to Google Sheets');
                }
            } catch (sheetsError) {
                console.error('Google Sheets error:', sheetsError);
                setFormError('حدث خطأ في إرسال البيانات. يرجى المحاولة مرة أخرى.');
                return;
            }

            // التوجيه إلى صفحة النجاح
            router.push('/success');
        } catch (error) {
            console.error('Error submitting form:', error);
            setFormError('حدث خطأ أثناء إرسال النموذج. يرجى المحاولة مرة أخرى.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <Header />
            <div className="w-full p-8 bg-white rounded-lg shadow-sm transition-colors">
                <form onSubmit={handleSubmit} className="space-y-8">
                    <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">استمارة التسجيل</h2>
                    
                    {/* عرض رسالة الخطأ إذا وجدت */}
                    {formError && (
                        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-right">
                            {formError}
                        </div>
                    )}

                    {/* البيانات الشخصية */}
                    <div className="bg-white border border-gray-100 shadow-sm p-6 rounded-lg space-y-4">
                        <h3 className="text-xl font-semibold text-gray-800 mb-6">البيانات الشخصية</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="fullNameArabic" className="block text-right mb-2 font-medium text-gray-700">
                                    الاسم رباعي:
                                </label>
                                <input
                                    type="text"
                                    id="fullNameArabic"
                                    name="fullNameArabic"
                                    value={formData.fullNameArabic}
                                    onChange={handleChange}
                                    required
                                    className="form-input w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-[#F8FAFC] text-gray-800 border-gray-200 placeholder-gray-400"
                                    placeholder="الاسم رباعي"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-right mb-2 font-medium text-gray-700">
                                    البريد الإلكتروني:
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="form-input w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-[#F8FAFC] text-gray-800 border-gray-200 placeholder-gray-400"
                                    placeholder="example@domain.com"
                                    dir="ltr"
                                />
                            </div>

                            <div>
                                <label htmlFor="phone" className="block text-right mb-2 font-medium text-gray-700">
                                    رقم الموبايل (واتساب):
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                    pattern="^01[0125][0-9]{8}$"
                                    maxLength={11}
                                    className="form-input w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-[#F8FAFC] text-gray-800 border-gray-200 placeholder-gray-400"
                                    placeholder="01xxxxxxxxx"
                                    dir="ltr"
                                />
                                <p className="mt-1 text-xs text-gray-500 text-right">
                                    يجب أن يبدأ بـ 01 ويتكون من 11 رقم ويكون واتساب
                                </p>
                            </div>

                            <div>
                                <label htmlFor="governorate" className="block text-right mb-2 font-medium text-gray-700">
                                    المحافظة:
                                </label>
                                <select
                                    id="governorate"
                                    name="governorate"
                                    value={formData.governorate}
                                    onChange={handleChange}
                                    required
                                    className="form-input w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-[#F8FAFC] text-gray-800 border-gray-200"
                                >
                                    <option value="">اختر المحافظة</option>
                                    {GOVERNORATES.map((gov) => (
                                        <option key={gov} value={gov}>{gov}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* البيانات الأكاديمية */}
                    <div className="bg-white border border-gray-100 shadow-sm p-6 rounded-lg space-y-4">
                        <h3 className="text-xl font-semibold text-gray-800 mb-6">البيانات الأكاديمية</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="university" className="block text-right mb-2 font-medium text-gray-700">
                                    الجامعة:
                                </label>
                                <input
                                    type="text"
                                    id="university"
                                    name="university"
                                    value={formData.university}
                                    onChange={handleChange}
                                    required
                                    className="form-input w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-[#F8FAFC] text-gray-800 border-gray-200 placeholder-gray-400"
                                    placeholder="اسم الجامعة"
                                />
                            </div>

                            <div>
                                <label htmlFor="faculty" className="block text-right mb-2 font-medium text-gray-700">
                                    الكلية:
                                </label>
                                <input
                                    type="text"
                                    id="faculty"
                                    name="faculty"
                                    value={formData.faculty}
                                    onChange={handleChange}
                                    required
                                    className="form-input w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-[#F8FAFC] text-gray-800 border-gray-200 placeholder-gray-400"
                                    placeholder="اسم الكلية"
                                />
                            </div>

                            <div>
                                <label htmlFor="year" className="block text-right mb-2 font-medium text-gray-700">
                                    السنة الدراسية:
                                </label>
                                <select
                                    id="year"
                                    name="year"
                                    value={formData.year}
                                    onChange={handleChange}
                                    required
                                    className="form-input w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-[#F8FAFC] text-gray-800 border-gray-200"
                                >
                                    <option value="">اختر الفرقة الدراسية</option>
                                    <option value="الفرقة الأولى">الفرقة الأولى</option>
                                    <option value="الفرقة الثانية">الفرقة الثانية</option>
                                    <option value="الفرقة الثالثة">الفرقة الثالثة</option>
                                    <option value="الفرقة الرابعة">الفرقة الرابعة</option>
                                    <option value="الفرقة الخامسة">الفرقة الخامسة</option>
                                    <option value="خريج">خريج</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="committee" className="block text-right mb-2 font-medium text-gray-700">
                                    اللجنة المختارة: *
                                </label>
                                <select
                                    id="committee"
                                    name="committee"
                                    value={formData.committee}
                                    onChange={handleChange}
                                    required
                                    className="form-select w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-[#F8FAFC] text-gray-800 border-gray-200"
                                >
                                    <option value="">اختر اللجنة</option>
                                    {COMMITTEES.map((committee) => (
                                        <option key={committee} value={committee}>
                                            {committee}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* الأنشطة التطوعية */}
                    <div className="bg-white border border-gray-100 shadow-sm p-6 rounded-lg space-y-4">
                        <h3 className="text-xl font-semibold text-gray-800 mb-6">الأنشطة التطوعية</h3>
                        
                        <div className="space-y-6">
                            <div>
                                <label className="block text-right mb-2 font-medium text-gray-700">
                                    هل سبق لك التطوع من قبل؟ *
                                </label>
                                <div className="flex gap-6 justify-end">
                                    <label className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            name="hasVolunteered"
                                            value="نعم"
                                            checked={formData.hasVolunteered === "نعم"}
                                            onChange={handleChange}
                                            required
                                            className="form-radio text-blue-600 bg-[#F8FAFC] border-gray-200"
                                        />
                                        <span className="mr-2 text-gray-700">نعم</span>
                                    </label>
                                    <label className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            name="hasVolunteered"
                                            value="لا"
                                            checked={formData.hasVolunteered === "لا"}
                                            onChange={handleChange}
                                            required
                                            className="form-radio text-blue-600 bg-[#F8FAFC] border-gray-200"
                                        />
                                        <span className="mr-2 text-gray-700">لا</span>
                                    </label>
                                </div>
                            </div>

                            {formData.hasVolunteered === "نعم" && (
                                <div>
                                    <label htmlFor="volunteer" className="block text-right mb-2 font-medium text-gray-700">
                                        اذكر الأنشطة التطوعية التي شاركت فيها: *
                                    </label>
                                    <textarea
                                        id="volunteer"
                                        name="volunteer"
                                        value={formData.volunteer}
                                        onChange={handleChange}
                                        required
                                        className="form-textarea w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-[#F8FAFC] text-gray-800 border-gray-200 placeholder-gray-400 resize-none"
                                        placeholder="اذكر الأنشطة التطوعية التي شاركت فيها، مثل: المبادرات، الفعاليات، الحملات، المؤتمرات"
                                        rows={4}
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* الشروط والأحكام */}
                    <div className="bg-white border border-gray-100 shadow-sm p-6 rounded-lg space-y-4">
                        <h3 className="text-xl font-semibold text-gray-800 mb-6">الشروط والأحكام</h3>
                        
                        <div className="prose text-gray-600 text-sm">
                            <p>بالتسجيل في هذا النموذج، أنت توافق على ما يلي:</p>
                            <ul className="list-disc mr-6 mt-2 space-y-2">
                                <li>تلقي رسائل وإشعارات عبر البريد الإلكتروني أو الهاتف المحمول بخصوص الأنشطة التطوعية.</li>
                                <li>الالتزام بقواعد وأنظمة العمل التطوعي في الوزارة.</li>
                                <li>صحة جميع البيانات المقدمة في النموذج.</li>
                            </ul>
                        </div>

                        <div className="mt-6">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    name="acceptTerms"
                                    checked={formData.acceptTerms}
                                    onChange={handleChange}
                                    required
                                    className="w-4 h-4 text-blue-600 bg-[#F8FAFC] border-gray-200 rounded focus:ring-blue-500"
                                />
                                <span className="text-gray-700">
                                    أوافق على الشروط والأحكام المذكورة أعلاه
                                </span>
                            </label>
                        </div>
                    </div>

                    {/* كابتشا Google */}
                    <div className="mt-8">
                        <MyRecaptcha onVerify={(token) => setCaptchaToken(token)} />
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="relative w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
                    >
                        <span className={isSubmitting ? 'invisible' : 'visible'}>
                            إرسال
                        </span>
                        {isSubmitting && (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            </div>
                        )}
                    </button>
                </form>
            </div>
        </>
    );
}
