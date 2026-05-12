import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

export default function PrivacyPolicy() {
  return (
    <div className="bg-background text-on-surface font-body-md min-h-screen flex flex-col">
      <header className="bg-surface shadow-sm sticky top-0 w-full z-50 flex justify-between items-center px-margin-mobile py-2 md:px-margin-desktop">
        <Link to="/" className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-headline-sm">medical_services</span>
          <h1 className="font-headline-sm text-headline-sm font-bold text-primary">DentMatch KE</h1>
        </Link>
        <Link to="/" className="text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1">
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          <span className="hidden sm:inline font-label-md">Back to Home</span>
        </Link>
      </header>
      
      <main className="flex-1 max-w-4xl mx-auto w-full px-margin-mobile py-12 md:py-20 md:px-margin-desktop">
        <h1 className="font-headline-lg text-primary mb-6">Privacy Policy</h1>
        <p className="text-on-surface-variant mb-8 text-label-md">Last Updated: May 2026</p>
        
        <div className="space-y-8 text-body-md">
          <section>
            <h2 className="font-headline-md text-on-surface mb-3">1. Introduction</h2>
            <p className="text-on-surface-variant">
              Welcome to DentMatch KE ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about this privacy notice, or our practices with regards to your personal information, please contact us.
            </p>
            <p className="text-on-surface-variant mt-2">
              This Privacy Policy applies to all information collected through our website (DentMatch KE) and related services, sales, marketing, or events.
            </p>
          </section>

          <section>
            <h2 className="font-headline-md text-on-surface mb-3">2. Information We Collect</h2>
            <p className="text-on-surface-variant">We collect personal information that you voluntarily provide to us when you register on the website, express an interest in obtaining information about us or our products and services, when you participate in activities on the website, or otherwise when you contact us.</p>
            <ul className="list-disc pl-5 mt-2 text-on-surface-variant space-y-1">
              <li><strong>Personal Info Provided by You:</strong> We collect names; phone numbers; email addresses; KMPDC registration numbers; job titles; and other similar information.</li>
              <li><strong>Credentials:</strong> We utilize One-Time Passwords (OTPs) sent via SMS for authentication. We do not store or use conventional passwords.</li>
              <li><strong>Document Uploads:</strong> For verification purposes, we collect identification documents and medical practitioner licenses as required by the Kenya Medical Practitioners and Dentists Council (KMPDC).</li>
            </ul>
          </section>

          <section>
            <h2 className="font-headline-md text-on-surface mb-3">3. How We Use Your Information</h2>
            <p className="text-on-surface-variant">We use personal information collected via our website for a variety of business purposes described below:</p>
            <ul className="list-disc pl-5 mt-2 text-on-surface-variant space-y-1">
              <li><strong>To facilitate account creation and logon process.</strong></li>
              <li><strong>To verify your professional status:</strong> Your KMPDC license and other documents are used to verify your eligibility to practice dentistry in Kenya.</li>
              <li><strong>To fulfill and manage connections:</strong> To match dental professionals with clinics seeking locum or permanent staff.</li>
              <li><strong>To send administrative information to you:</strong> We may use your personal information to send you product, service, and new feature information and/or information about changes to our terms, conditions, and policies.</li>
              <li><strong>To protect our Services:</strong> We may use your information as part of our efforts to keep our website safe and secure (for example, for fraud monitoring and prevention).</li>
            </ul>
          </section>

          <section>
            <h2 className="font-headline-md text-on-surface mb-3">4. Will Your Information Be Shared With Anyone?</h2>
            <p className="text-on-surface-variant">We only share and disclose your information in the following situations:</p>
            <ul className="list-disc pl-5 mt-2 text-on-surface-variant space-y-1">
              <li><strong>Compliance with Laws:</strong> We may disclose your information where we are legally required to do so in order to comply with applicable law, governmental requests, a judicial proceeding, court order, or legal process.</li>
              <li><strong>Vital Interests and Legal Rights:</strong> We may disclose your information where we believe it is necessary to investigate, prevent, or take action regarding potential violations of our policies, suspected fraud, situations involving potential threats to the safety of any person and illegal activities.</li>
              <li><strong>With other Users:</strong> When you share personal information or otherwise interact with public areas of the website, such personal information may be viewed by all verified users (e.g., verified clinics can see your profile when you apply for a locum position).</li>
            </ul>
          </section>

          <section>
            <h2 className="font-headline-md text-on-surface mb-3">5. Data Retention</h2>
            <p className="text-on-surface-variant">
              We will only keep your personal information for as long as it is necessary for the purposes set out in this privacy notice, unless a longer retention period is required or permitted by law (such as tax, accounting or other legal requirements).
            </p>
          </section>

          <section>
            <h2 className="font-headline-md text-on-surface mb-3">6. Security of Your Information</h2>
            <p className="text-on-surface-variant">
              We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure.
            </p>
          </section>

          <section>
            <h2 className="font-headline-md text-on-surface mb-3">7. Contact Us</h2>
            <p className="text-on-surface-variant">
              If you have questions or comments about this notice, you may email us at privacy@dentmatch.co.ke.
            </p>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
