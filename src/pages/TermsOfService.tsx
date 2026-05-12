import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

export default function TermsOfService() {
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
        <h1 className="font-headline-lg text-primary mb-6">Terms of Service</h1>
        <p className="text-on-surface-variant mb-8 text-label-md">Last Updated: May 2026</p>
        
        <div className="space-y-8 text-body-md">
          <section>
            <h2 className="font-headline-md text-on-surface mb-3">1. Agreement to Terms</h2>
            <p className="text-on-surface-variant">
              By accessing or using DentMatch KE (the "Service"), you agree to be bound by these Terms of Service. If you disagree with any part of the terms, then you may not access the Service. DentMatch KE is a platform connecting registered dental professionals with dental clinics in Kenya.
            </p>
          </section>

          <section>
            <h2 className="font-headline-md text-on-surface mb-3">2. Eligibility and Verification</h2>
            <ul className="list-disc pl-5 mt-2 text-on-surface-variant space-y-1">
              <li><strong>Professionals:</strong> You must be a qualified dental professional registered with the Kenya Medical Practitioners and Dentists Council (KMPDC) and hold a valid, unencumbered license to practice. You agree to provide accurate and up-to-date KMPDC registration details.</li>
              <li><strong>Clinics:</strong> You must be a registered dental clinic operating legally within Kenya.</li>
              <li>We reserve the right to verify your credentials before granting full access to the platform and to suspend or terminate accounts found to have fraudulent or expired credentials.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-headline-md text-on-surface mb-3">3. User Accounts</h2>
            <p className="text-on-surface-variant mb-2">When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.</p>
            <p className="text-on-surface-variant">You are responsible for safeguarding your access to the phone number used for authentication. DentMatch KE uses One-Time Passwords (OTPs) via SMS; therefore, immediate access to your registered device is critical. You are responsible for any activities or actions under your account.</p>
          </section>

          <section>
            <h2 className="font-headline-md text-on-surface mb-3">4. The Platform and Transactions</h2>
            <ul className="list-disc pl-5 mt-2 text-on-surface-variant space-y-1">
              <li><strong>Matchmaking:</strong> DentMatch KE acts as an intermediary platform to facilitate connections for locum and permanent dental positions. We do not employ the dental professionals directly.</li>
              <li><strong>Agreements between Users:</strong> Any employment or locum engagement, including terms of service, payment, and working hours, is strictly between the dental professional and the hiring clinic. DentMatch KE is not a party to these agreements and holds no liability for disputes arising from them.</li>
              <li><strong>Disputes:</strong> Users agree to attempt to resolve any disputes directly with each other before pursuing external action.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-headline-md text-on-surface mb-3">5. Professional Conduct</h2>
            <p className="text-on-surface-variant">All users are expected to conduct themselves professionally and adhere to the ethical guidelines set forth by the KMPDC. Any reports of unprofessional conduct, malpractice, or abuse on the platform may result in immediate suspension pending investigation.</p>
          </section>

          <section>
            <h2 className="font-headline-md text-on-surface mb-3">6. Intellectual Property</h2>
            <p className="text-on-surface-variant">
              The Service and its original content, features, and functionality are and will remain the exclusive property of DentMatch KE and its licensors. The Service is protected by copyright, trademark, and other laws of Kenya. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of DentMatch KE.
            </p>
          </section>

          <section>
            <h2 className="font-headline-md text-on-surface mb-3">7. Limitation of Liability</h2>
            <p className="text-on-surface-variant">
              In no event shall DentMatch KE, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Service; (ii) any conduct or content of any third party on the Service; (iii) any content obtained from the Service; and (iv) unauthorized access, use or alteration of your transmissions or content.
            </p>
          </section>

          <section>
            <h2 className="font-headline-md text-on-surface mb-3">8. Changes to Terms</h2>
            <p className="text-on-surface-variant">
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
            </p>
          </section>

          <section>
            <h2 className="font-headline-md text-on-surface mb-3">9. Contact Us</h2>
            <p className="text-on-surface-variant">
              If you have any questions about these Terms, please contact us at legal@dentmatch.co.ke.
            </p>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
