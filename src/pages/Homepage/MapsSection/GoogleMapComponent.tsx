import React, { forwardRef } from "react";

const GOOGLE_MAPS_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3105.00123456789!2d-77.0648!3d38.9433!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0:0x0!2zMzjCsDU2JzM2LjAiTiA3N8KwMDMnNTMuMyJX!5e0!3m2!1sen!2sus!4v1690000000000!5m2!1sen!2sus";

interface GoogleMapComponentProps {
  className?: string;
}

const GoogleMapComponent = forwardRef<HTMLDivElement, GoogleMapComponentProps>(
  ({ className = "" }, ref) => (
    <div
      ref={ref}
      className={`rounded-xl overflow-hidden border-2 border-sls-gold/30 ${className}`}
      style={{ boxShadow: "0 0 20px rgba(212, 175, 55, 0.2)" }}
    >
      <iframe
        title="Street Lawyer Services Location"
        src={GOOGLE_MAPS_EMBED_URL}
        width="100%"
        height="480"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  )
);

GoogleMapComponent.displayName = "GoogleMapComponent";

export default GoogleMapComponent;
