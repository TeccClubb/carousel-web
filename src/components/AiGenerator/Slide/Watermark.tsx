import React, { FC } from "react";

const Watermark: FC = () => {
  const domainName = "TechClub";

  return (
    // <div
    //   className="slide_watermark"
    //   style={{backgroundColor: "rgb(255, 255, 255)", color: "rgb(6, 6, 5)"}}
    // >
    //   <div className="slide_watermark_text">Created with CarouselMaker.co</div>
    // </div>
    <div
      className="slide_watermark"
      style={{ backgroundColor: "#FFFFFF", color: "#160910" }}
    >
      <div className="slide_watermark_text">Created with {domainName}</div>
    </div>
  );
};

export default Watermark;
