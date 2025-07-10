'use client';

import ReCAPTCHA from 'react-google-recaptcha';

export default function MyRecaptcha({ onVerify }: { onVerify: (token: string) => void }) {
  return (
    <div className="flex justify-center">
      <ReCAPTCHA
        sitekey="6LdaiH4rAAAAAHaHkRBMEg98wu0VSxq-NaNbqJg0"
        onChange={(token) => {
          if (token) onVerify(token);
        }}
      />
    </div>
  );
} 