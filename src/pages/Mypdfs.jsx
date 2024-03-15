import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { MdDeleteForever } from "react-icons/md";
import Loader from "../components/Loader";

const Mypdfs = () => {
  const { currUser } = useContext(UserContext);
  const token = currUser?.token;
  const id = currUser?.id;

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const [pdfs, setPdfs] = useState([]);

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [navigate, token]);

  useEffect(() => {
    const fetchPdfs = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/pdf/userpdfs/${id}`,
          {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setPdfs(response?.data?.pdfs);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchPdfs();
  }, [id, token]);

  // Function to truncate the PDF name
  const truncateName = (name, maxLength) => {
    if (name.length <= maxLength) return name;
    return name.substring(0, maxLength) + "...";
  };

  const deletePdf = async (id) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/pdf/deletepdf/${id}`,
        { withCredentials: true, headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 200) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <h1 className="text-sm sm:text-xl lg:text-2xl font-semibold mb-4">
        My PDF Files
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {pdfs.map((pdf) => (
          <div key={pdf.id} className="bg-white shadow-md rounded-lg p-4">
            <div className="flex justify-around">
              <a
                href={pdf.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-500 hover:underline"
              >
                {truncateName(pdf.name, 20)}
              </a>
              <button
                onClick={() => deletePdf(pdf._id)}
                className="text-red-500  text-xl hover:scale-125"
              >
                <MdDeleteForever />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Mypdfs;
