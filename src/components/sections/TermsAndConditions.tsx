import React, { FC } from "react";
import Section from "./Section";

const TermsAndConditions: FC = () => {
  const str =
    "1. Introduction \nThese Terms of Service (“Terms”, “Terms of Service”) govern your use of our website located at carouselmaker.co (together or individually “Service”) operated by CarouselMaker. \nOur Privacy Policy also governs your use of our Service and explains how we collect, safeguard and disclose information that results from your use of our web pages. \nYour agreement with us includes these Terms and our Privacy Policy (“Agreements”). You acknowledge that you have read and understood Agreements, and agree to be bound of them. \nIf you do not agree with (or cannot comply with) Agreements, then you may not use the Service, but please let us know by emailing at support@carouselmaker.co so we can try to find a solution. These Terms apply to all visitors, users and others who wish to access or use Service. \n2. Communications \nBy using our Service, you agree to subscribe to newsletters, marketing or promotional materials and other information we may send. However, you may opt out of receiving any, or all, of these communications from us by following the unsubscribe link or by emailing at support@carouselmaker.co.";
  return (
    <Section showGradient>
      <h2 className="text-[40px] font-semibold">Terms of Service</h2>
      <p
        className="text-[20px] font-medium"
        dangerouslySetInnerHTML={{ __html: str }}
      ></p>
    </Section>
  );
};

export default TermsAndConditions;
