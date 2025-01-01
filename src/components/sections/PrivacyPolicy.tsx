import React, { FC } from "react";
import Section from "./Section";

const PrivacyPolicy: FC = () => {
  const str =
    'This privacy policy ("Policy") describes how the personally identifiable information ("Personal Information") you may provide on the carouselmaker.co website ("Website" or "Service") and any of its related products and services (collectively, "Services") is collected, protected and used. It also describes the choices available to you regarding our use of your Personal Information and how you can access and update this information. This Policy is a legally binding agreement between you ("User", "you" or "your") and CarouselMaker ("CarouseMaker", "we", "us" or "our"). By accessing and using the Website and Services, you acknowledge that you have read, understood, and agree to be bound by the terms of this Agreement. This Policy does not apply to the practices of companies that we do not own or control, or to individuals that we do not employ or manage. Automatic collection of information When you open the Website, our servers automatically record information that your browser sends. This data may include information such as your device"s IP address, browser type and version, operating system type and version, language preferences or the webpage you were visiting before you came to the Website and Services, pages of the Website and Services that you visit, the time spent on those pages, information you search for on the Website, access times and dates, and other statistics.';
  return (
    <Section showGradient>
      <h2 className="text-[40px] font-semibold">Privacy policy</h2>
      <p
        className="text-[20px] font-medium"
        dangerouslySetInnerHTML={{ __html: str }}
      ></p>
    </Section>
  );
};

export default PrivacyPolicy;
