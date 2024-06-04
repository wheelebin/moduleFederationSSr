import React from "react";
import { Helmet } from "react-helmet";

const App = ({ items }) => {
  const [state, setState] = React.useState<string>("");

  return (
    <>
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
        <div style={{ padding: "1rem" }}>
          <h3>Type something into this input</h3>
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            placeholder="Luke, I am your father..."
          />
        </div>
        <div>
          <h1>Remote loaded components</h1>
          {items.map(({ moduleId, Component, props }, index) => (
            <>
              <h2 style={{ color: "red" }}>{moduleId}</h2>
              <Component {...props} key={index} content={state} />
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default App;
