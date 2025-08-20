// src/pages/Homepage/ContactForm.tsx
import React, { Suspense } from "react";

const ContactForm = React.lazy(() => import("../../components/ContactForm"));

const ContactFormSection: React.FC = () => (
  <section className="bg-sls-charcoal-950 py-16">
    <div className="max-w-lg px-4 py-8 mx-auto my-12 shadow-lg rounded-xl bg-white bg-opacity-5">
      <h2 className="text-3xl font-bold text-white mb-6 text-center drop-shadow-lg">
        Contact Us
      </h2>
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-32 text-white">
            Loading contact form...
          </div>
        }
      >
        <ContactForm />
      </Suspense>
    </div>
  </section>
);

export default ContactFormSection;
