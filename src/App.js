import React from "react";
import Base from "./core/Base";
import Card from "./core/Card";
import Navbar from "./core/Navbar";
import "./index.css";

const App = () => {
  return (
    <>
      <Navbar />
      <Base title="Let's do Shopping" description="Welcome to the Store">
        <Card />
      </Base>
    </>
  );
};

export default App;
