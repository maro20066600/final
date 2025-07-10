import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const { token } = await request.json();

        const secretKey = process.env.RECAPTCHA_SECRET_KEY;
        if (!secretKey) {
            throw new Error('reCAPTCHA secret key is not configured');
        }

        // التحقق من reCAPTCHA مع خادم Google
        const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `secret=${secretKey}&response=${token}`,
        });

        const data = await response.json();

        // إرجاع النتيجة
        return NextResponse.json({
            success: data.success,
            error: data.success ? null : 'reCAPTCHA verification failed',
        });
    } catch (error) {
        console.error('reCAPTCHA verification error:', error);
        return NextResponse.json({
            success: false,
            error: 'Internal server error during reCAPTCHA verification',
        }, { status: 500 });
    }
} 