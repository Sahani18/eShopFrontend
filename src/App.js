import React from "react";
import "./index.css";
import Base from "./core/Base";
import Card from "./core/Card";

const App = () => {
  return (
    <Base title="Let's do Shopping" description="Welcome to the Store">
      <Card/>
    </Base>
  );
};

export default App;
