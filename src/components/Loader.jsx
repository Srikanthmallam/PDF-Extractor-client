import React from "react";
import loader from "../assets/Spinner-1s-200px.gif";
const Loader = () => {
  return (
    <div className="grid place-content-center h-screen">
      <img src={loader} alt="" />
    </div>
  );
};

export default Loader;
