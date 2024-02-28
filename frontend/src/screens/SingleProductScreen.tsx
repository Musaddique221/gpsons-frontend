"use client";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Loader from "@/components/Loader";

import { Box, Heading, Grid, Text, Image, Button } from "@chakra-ui/react";

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
        `https://gpson-back-end.onrender.com/product/${id}`
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
        <Button bgColor="grey.600" m="4">
          Go Back
        </Button>
      </a>

      {show ? (
        <Loader />
      ) : (
        <>
          <Box p={8}>
            <Grid templateColumns="repeat(2, 1fr)" gap={8}>
              <Box>
                <Image
                  src={data.image}
                  alt="Product Image"
                  h="440"
                  w="full"
                  objectFit="contain"
                />
              </Box>
              <Box>
                <Heading as="h1" size="md" mb={4}>
                  {data.brand}
                </Heading>
                <Heading as="h1" size="xl" mb={4}>
                  {data.name}
                </Heading>
                <Text fontSize="lg" color="gray.700" mb={4}>
                  {data.description}
                </Text>
                <Text fontSize="xl" fontWeight="bold" mb={4}>
                  {data.price}
                </Text>
                <Button colorScheme="teal" size="lg" onClick={submitHandler}>
                  Add to Cart
                </Button>
              </Box>
            </Grid>
          </Box>
        </>
      )}
    </>
  );
};

export default SingleProduct;
