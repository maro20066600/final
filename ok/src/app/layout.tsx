import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'استمارة التطوع - وزارة الشباب والرياضة',
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
