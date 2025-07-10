// src/lib/googleSheets.ts

// 🔁 ضع هنا رابط Google Apps Script الخاص بك بعد النشر (Publish > Deploy > Web App)
const GOOGLE_SHEETS_URL =
  'https://script.google.com/macros/s/AKfycbx1Myn25ZvT5_ZyI8ab4bfqgBDT5E1Zb8YSm-Ic64g7yynQygBVfPkOY79FtV5EfvHE1Q/exec';

// شكل البيانات المتوقع إرساله (يمكنك تعديله حسب النموذج)
export type VolunteerFormData = {
    timestamp: string;
    fullNameArabic: string;
    fullNameEnglish: string;
    phone: string;
    email: string;
    governorate: string;
    university: string;
    faculty: string;
    year: string;
    committee: string;
    hasVolunteered: string;
    volunteer: string;
    acceptTerms: boolean;
};

// إرسال البيانات إلى Google Sheets باستخدام Google Apps Script
export async function sendToGoogleSheets(data: VolunteerFormData): Promise<boolean> {
  try {
    await fetch(GOOGLE_SHEETS_URL, {
      method: 'POST',
      mode: 'no-cors', // 👈 هذا مهم لتجنب مشكلة CORS في المتصفح
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    // لا يمكن قراءة الرد عند استخدام no-cors، لذلك نعتبر أنه ناجح
    return true;
  } catch (error) {
    console.error('Error sending data to Google Sheets:', error);
    return false;
  }
} 
