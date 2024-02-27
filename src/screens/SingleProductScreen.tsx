"use client";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Loader from "@/components/Loader";

const SingleProduct = () => {
  const [msg, setMessage] = useState("");
  const [error, setError] = useState<boolean>(false);
  const [data, setData] = useState<any>();
  const [show, setShow] = useState<boolean>(true);
  const [userFromLocal, setUserFromLocal] = useState<any>(undefined);

  const router = useRouter();
  const path = usePathname();

  const id = path.split("/")[2];

  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get<any>(
        `https://gpson-back-end.onrender.com/${id}`
      );
      setShow(false);
      setData(data);
    } catch (err: any) {
      setError(true);
      setMessage(err.response.data.message);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const storedData: any = window.localStorage.getItem("user");
      const user: any = JSON.parse(storedData);
      setUserFromLocal(user);
    }
  }, []);
  const submitHandler = async () => {
    try {
      const order: any = await axios.post(
        "https://gpson-back-end.onrender.com/order",
        {
          user: userFromLocal.data.user,
          name: data.name,
          image: data.image,
          brand: data.brand,
          category: data.category,
          description: data.description,
          price: data.price,
        }
      );
      router.push(`/cart/${userFromLocal.data.user}`);
      console.log(data, "39");
    } catch (err: any) {
      setError(true);
      setMessage(err.response.data.message);
    }
  };
  useEffect(() => {
    getSingleProduct();
  }, []);

  return (
    <>
      <a href="/">
        <button className="color-grey bg-gray-200 border-radius-1 p-2 m-5">
          Go Back
        </button>
      </a>
      {show ? (
        <Loader />
      ) : (
        <div className="container mx-auto py-8 grid grid-cols-2 md:grid-cols-2 gap-2">
          <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
            <img
              className="w-full object-cover"
              src={data.image}
              alt="Product Image"
            />
          </div>
          <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden">
            <div className="p-4">
              <div className="uppercase text-sm text-teal-500 font-semibold mb-5">
                {data.category}
              </div>
              <h2 className="text-gray-900 text-2xl font-bold">{data.name}</h2>
              <p className="mt-2 text-gray-600">{data.description}</p>
              <div className="mt-4">
                <span className="text-gray-700 font-bold">{data.price}</span>
              </div>
              <div className="mt-4">
                <button
                  className="bg-teal-500 text-white py-2 px-4 rounded hover:bg-teal-600"
                  onClick={submitHandler}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SingleProduct;
