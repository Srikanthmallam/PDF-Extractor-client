import React, { useEffect, useState } from "react";
import Loader from "./Loader";

const ViewPdf = ({ url }) => {
  const isCloudinary = url.includes("cloudinary.com");

  return (
    <div>
      {url ? (
        isCloudinary ? (
          <embed src={url} type="application/pdf" width="100%" height="600px" />
        ) : (
          <embed
            src={`${process.env.REACT_APP_BASE_URL}${url}`}
            type="application/pdf"
            width="100%"
            height="600px"
          />
        )
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default ViewPdf;
