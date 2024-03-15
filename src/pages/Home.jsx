import React, { useContext, useEffect, useState } from "react";

import { FaUpload } from "react-icons/fa6";
import Pdf from "../components/Pdf";
import axios from "axios";
import ViewPdf from "../components/ViewPdf";
import { UserContext } from "../context/userContext";
import Loader from "../components/Loader";

const Home = () => {
  const { currUser } = useContext(UserContext);
  const token = currUser ? currUser.token : null;

  const [pdfFile, setPdfFile] = useState(null);
  const [selectedpages, setSelectedPages] = useState("");
  const [processedFileUrl, setPrcessedFileUrl] = useState("");
  const [viewProcessedPdf, setViewProcessedPdf] = useState(false);
  const [viewPdf, setViewPdf] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setPdfFile(e.target.files[0]);
  };

  const handlePageChange = (e) => {
    setSelectedPages(e.target.value);
  };

  const formSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formdata = new FormData();
      formdata.set("pdfFile", pdfFile);
      formdata.set("pageNumbers", selectedpages);

      let response;

      if (currUser) {
        response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/pdf/uploadPdf`,
          formdata,
          {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      } else {
        response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/pdf/uploadPdf`,
          formdata
        );
      }
      const tempProcessedFileUrl = await response?.data?.processedFileUrl;
      setPrcessedFileUrl(tempProcessedFileUrl);
      alert("succefully processed Pdf");
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message);
    }
    setLoading(false);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className=" pt-20 px-4 h-screen lg:pt-28">
      {!viewPdf && !viewProcessedPdf && (
        <div>
          <div className="text-center">
            <div className="font-semibold text-xl md:text-2xl lg:text-3xl ">
              <span className="text-red-700 pr-2">PDF</span>
              <span>Page Extractor</span>
            </div>
            <div className="mt-2">
              <small className=" block text-xs sm:text-sm lg:text-lg text-zinc-500">
                Seperate one page or a whole set for <br /> easy conversion into
                indipendent PDF <br />
                files
              </small>
            </div>
          </div>
          <div>
            <form onSubmit={formSubmit}>
              <label htmlFor="PDF" className="mt-5 grid place-content-center">
                <div className="flex text-xs md:text-md lg:text-lg text-white hover:scale-110  gap-2 items-center bg-[#2b2d42] w-fit px-3 py-2 rounded-md font-semibold">
                  <FaUpload />
                  <p> Choose a PDF file</p>
                </div>
              </label>
              <input
                type="file"
                id="PDF"
                accept="application/pdf"
                onChange={handleFileChange}
                className="hidden"
              />
              {pdfFile && (
                <div className="flex justify-center mt-5">
                  <button
                    onClick={() => setViewPdf(true)}
                    className="text-xs md:text-md lg:text-lg px-3 py-1 bg-red-500 font-semibold rounded-md hover:scale-110 text-white ease-in-out"
                  >
                    View PDF
                  </button>
                </div>
              )}
              {pdfFile && (
                <div className="grid place-content-center  mt-20">
                  <label
                    htmlFor="pageNumberInput"
                    className=" text-xs md:text-md lg:text-lg block text-sm font-medium text-gray-700"
                  >
                    Enter Page Numbers:
                  </label>
                  <input
                    id="pageNumberInput"
                    name="pageNumberInput"
                    type="text"
                    placeholder="e.g., 1, 2, 4, 6"
                    className="px-2 py-1 border mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm text-xs sm:text-sm lg:text-lg border-gray-300 rounded-md"
                    value={selectedpages}
                    onChange={handlePageChange}
                  />
                  <button
                    type="submit"
                    className="text-xs md:text-md lg:text-lg px-3 py-1 bg-[#2b2d42] text-white rounded-md font-semibold mt-3 hover:scale-110"
                  >
                    Process PDF
                  </button>
                </div>
              )}
            </form>
            {processedFileUrl && (
              <div className="flex justify-center mt-5">
                <button
                  onClick={() => setViewProcessedPdf(true)}
                  className="text-xs md:text-md lg:text-lg px-3 py-1 bg-red-500 font-semibold rounded-md hover:scale-110 text-white ease-in-out"
                >
                  View Processed PDF
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      {viewPdf && (
        <div>
          <div className="bg-zinc-200 fixed top-20 left-1/2 -translate-x-1/2 z-10">
            <button
              className="text-xs sm:text-sm md:tex-md px-3 py-1 bg-red-500 font-semibold rounded-md hover:scale-110 "
              onClick={() => setViewPdf(false)}
            >
              close
            </button>
          </div>
          <div className="mt-5">
            <Pdf file={pdfFile} />
          </div>
        </div>
      )}
      {viewProcessedPdf && (
        <div>
          <div className="bg-zinc-200 fixed top-20 left-1/2 -translate-x-1/2 z-10">
            <button
              className="text-xs sm:text-sm md:tex-md px-3 py-1 bg-red-500 font-semibold rounded-md hover:scale-110 "
              onClick={() => setViewProcessedPdf(false)}
            >
              close
            </button>
          </div>
          <div className="mt-10">
            <ViewPdf url={processedFileUrl} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
