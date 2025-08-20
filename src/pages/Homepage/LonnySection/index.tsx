// src/pages/Homepage/components/LonnySection/index.tsx
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TitleBlock from "./TitleBlock";
import TextBlock from "./TextBlock";
import ImageBlock from "./ImageBlock";
import Background from "./Background";

gsap.registerPlugin(ScrollTrigger);

const LonnySection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const line1Ref = useRef<HTMLParagraphElement>(null);
  const line2Ref = useRef<HTMLParagraphElement>(null);
  const line3Ref = useRef<HTMLParagraphElement>(null);
  const line4Ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(
        [
          titleRef.current,
          line1Ref.current,
          line2Ref.current,
          line3Ref.current,
          line4Ref.current,
        ],
        {
          opacity: 0,
          y: 50,
        }
      );

      gsap.set(imageRef.current, {
        opacity: 0,
        x: 100,
        scale: 0.8,
      });

      // Create timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });

      // Animate image first
      tl.to(imageRef.current, {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 1.2,
        ease: "power3.out",
      })
        // Then animate title
        .to(
          titleRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.6"
        )
        // Animate text lines in sequence
        .to(
          line1Ref.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.4"
        )
        .to(
          line2Ref.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.3"
        )
        .to(
          line3Ref.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.3"
        )
        .to(
          line4Ref.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.3"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 overflow-hidden lg:py-32 bg-sls-charcoal-950"
    >
      {/* Background Elements */}
      <Background />

      <div className="relative z-10 px-8 mx-auto max-w-7xl">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Content Side */}
          <div className="lg:order-1">
            <TitleBlock ref={titleRef} />

            <div className="space-y-6">
              <TextBlock ref={line1Ref}>
                From Stanford University to Columbia Law School, from
                Baltimore's toughest courtrooms to DC's cannabis revolution—meet
                the legendary attorney behind Street Lawyer Services.
              </TextBlock>

              <TextBlock ref={line2Ref}>
                Named "D.C.'s King of Cannabis" by District Fray Magazine. Year
                after year, Lonny has been handpicked by his peers as a Super
                Lawyer — a formidable accolade granted only to the top
                attorneys, fueling his legacy of excellence. Host of DC101's
                "Lonny the Street Lawyer" radio show reaching thousands across
                the DMV.
              </TextBlock>

              <TextBlock ref={line3Ref}>
                Now channeling that legendary intensity into curating DC's most
                coveted cannabis collection—where every strain tells a story and
                every product meets the gold standard.
              </TextBlock>

              <TextBlock ref={line4Ref} variant="highlight">
                "This isn't just about cannabis—it's about justice, community,
                and creating something legendary that serves the people."
              </TextBlock>
            </div>
          </div>

          {/* Image Side */}
          <div className="lg:order-2">
            <ImageBlock
              ref={imageRef}
              src="/images/lonny/lonny-the-street-lawyer.png"
              alt="Lonny The Street Lawyer"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LonnySection;
