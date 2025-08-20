import React, { Suspense } from "react";

const ContactForm = React.lazy(() => import("../../../components/ContactForm"));

const ContactFormSection: React.FC = () => (
  <section className="py-16 bg-sls-charcoal-950">
    <div className="max-w-lg px-4 py-8 mx-auto my-12 bg-white shadow-lg rounded-xl bg-opacity-5">
      {/* <h2 className="mb-6 text-3xl font-bold text-center text-white drop-shadow-lg">
        Contact Us
      </h2> */}
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
