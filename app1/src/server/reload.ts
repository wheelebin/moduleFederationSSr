import { reloadRemotes } from "../shared/getComponent";

export default (req, res, next) => {
    console.log("[RELOADING]");
  const componentsToRender = [
    {
      app: "app2",
      entries: {
        client: "http://localhost:3001/static/mf-manifest.json",
        server: "http://localhost:3001/server/mf-manifest.json",
      },
      name: "app2/Content",
      props: {
        content: "Hello",
      },
    },
    /* {
      app: "tripresultkit",
      entries: {
        client: "http://localhost:7779/static/comp/client/mf-manifest.json",
        server: "http://localhost:7779/static/comp/server/mf-manifest.json",
      },
      name: "tripresultkit/HotelCard",
      props: {
        guestRating: 0,
        imageTags: [],
        description: "HOLLA",
        bullets: ["WiFi: Ja", "Restaurang: Ja", "Bar: Ja"],
        ksps: ["Gym", "Spa"],
        image: "/dp1/lodging/1000000/20000/17800/17762/72603f9a_z.jpg",
        price: 23690,
        pricePerPerson: 11845,
        rating: 10,
        subtitle: "Bologna",
        name: "Grand Hotel Majestic",
        tripadvisorRating: 4.5,
        buttonText: "TREK",
        numberOfAdults: 2,
        numberOfChildren: 0,
        url: "/italien/bologna/grand-hotel-majestic-gia-baglioni?QueryDepID=26178&QueryResID=25021&HotelId=166532&ItemId=166532&QueryDepDate=20240811&QueryAges=42,42&QueryRoomAges=42,42&QueryUnits=1&QueryRetDate=20240818&QueryChkInDate=20240811&QueryChkOutDate=20240818&QueryDur=-1&QueryType=IndependentPackage&&qf=flowDynamic",
        includedText: "Flyg och hotell, 2 natter, 2 vuxna",
        departureText: "Avresa 11 augusti 2024 fran Stockholm Arlanda",
        _classifications: {
          mainKey: "classifications",
          queryKey: "filterCl",
          data: [
            {
              uniqueID: "SPA_MASSAGE",
              shortID: "SPMA0C",
              name: "Spa",
              parents: ["WELLNESS"],
            },
          ],
        },
        originalPrice: null,
      },
    }, */
  ];
  try {
    reloadRemotes(componentsToRender, true);
  } catch (error) {
    console.log("RELOAD ERROR: ")
    console.log(error);
  }
  res.send("done");
};
