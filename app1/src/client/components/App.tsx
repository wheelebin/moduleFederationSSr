import React from "react";
import { Helmet } from "react-helmet";
import type { ContentProps } from "app2/Content";
import type { UserDTO } from "app2/userRoute";
import { Globals } from "@bwoty-web/ui-kit";

/* const Content = React.lazy(
  () => import("app2/Content") as Promise<{ default: React.FC<ContentProps> }>
);

const TReKHotelCard = React.lazy(
  () =>
    import("tripresultkit/HotelCard") as Promise<{
      default: React.FC<ContentProps>;
    }>
); */

const Props = {
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
};

const fetchUserData = async () => {
  // fetch the data from its own server (localhost:3000)
  const response = await fetch("/api/user");
  return response.json();
};

const App = ({ items }) => {
  console.log("[APP]");
  const [state, setState] = React.useState<string>("");
  const [userInfo, setUserInfo] = React.useState<UserDTO>();

  React.useEffect(() => {
    // IIEF
    (async () => {
      const userData = await fetchUserData();
      setUserInfo(userData);
    })();
  }, []);

  return (
    <Globals siteId="18">
      <div
        style={{
          padding: "1rem",
          borderRadius: "0.25rem",
          border: "4px dashed #fc451e",
        }}
      >
        <Helmet>
          <title>SSR MF Example</title>
        </Helmet>
        <div>
          <h1>TEST</h1>
          {items.map((item, index) => (
            <>
              <h2 style={{color: "red"}}>{item.name}</h2>
              <item.component key={index} {...item.props} content={state} />
            </>
          ))}
        </div>
        <div style={{ padding: "1rem" }}>
          <h1>Module Federation Example: Server Side Rendering</h1>

          <h2>This is the App 1 application.</h2>

          <p>You can try to disable JavaScript and reload the page.</p>
        </div>
        <div style={{ padding: "1rem" }}>
          <h3>User info</h3>

          {!userInfo && <p>loading user info...</p>}
          {userInfo && (
            <>
              <p data-e2e="ID">ID: {userInfo.id}</p>
              <p data-e2e="Name">Name: {userInfo.name}</p>
              <p data-e2e="Company">Company: {userInfo.company}</p>
            </>
          )}
        </div>
        <div style={{ padding: "1rem" }}>
          <h3>Type something into this input</h3>
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            placeholder="Luke, I am your father..."
          />
        </div>
        {/* <h1>App2/Content</h1>
        <React.Suspense fallback={<h1>Loading....</h1>}>
          <Content content={state} />
        </React.Suspense>
        <h1>tripresultkit/HotelCard</h1>
        <React.Suspense fallback={<h1>Loading....</h1>}>
          <TReKHotelCard {...Props} />
        </React.Suspense> */}
      </div>
    </Globals>
  );
};

export default App;
