import React, { useEffect } from "react";
import { HotelCard as HotelCardUI } from "@bwoty-web/ui-kit";

export interface ContentProps {
  content?: string;
}

console.log("React", React);
console.log("UseEffect", useEffect);

const Content: React.FC<ContentProps> = (props: ContentProps) => {
  useEffect(() => {
    console.log("App 2: Content component mounted!");
    return () => {
      console.log("App 2: Content component unmounted!");
    };
  }, []);
  return (
    <>
      <div
        style={{
          padding: "1rem",
          borderRadius: "0.25rem",
          border: "4px dashed #228b22",
        }}
        data-e2e="APP_2_CONTENT_BLOCK"
      >
        <h2>App 2: Content :)</h2>
        <p>This is the content from app2.</p>
        <p>
          Custom text: <strong>{props.content}</strong>
        </p>
      </div>
      <HotelCardUI
        image={{
          cloudinaryUriTemplate: `https://img.ving.se/image/upload/{+transform}${"/dam/Hotel/Mauritius/MRU/xtm9zx4/MU_MRU_The_Oberoi_Beach_Res_xtm9zx4_00121.t661fa727.m2400.xgN1AxzmYbQHWXqW_C9aPDmg8YyjGnwzWMudneKx5iUE.jpg"}`,
        }}
        tags={[]}
        title={"name"}
        subtitle={"subtitle"}
        imageTags={[]}
        description={"description"}
        bullets={[]}
        ksps={[]}
        rating={11}
        tripadvisorRating={11}
        guestRating={11} // TODO: Check styling for Ving (not present for Globetrotter)
        price={0}
        buttonText={"buttonText"}
        originalPrice={0}
        pricePerPerson={0}
        footerDescription={"footerDescription"}
        url={"url"}
      />
    </>
  );
};

export default Content;
