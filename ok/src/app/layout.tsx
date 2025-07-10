import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'متطوعي وزارة الشباب والرياضة YLY',
  description: 'نموذج التسجيل للتطوع في وزارة الشباب والرياضة',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        {children}
      </body>
    </html>
  );
}
