"use client";
import React from "react";
import { useState, useEffect, MouseEvent } from "react";
import Loader from "@/components/Loader";
import { usePathname } from "next/navigation";
// import Image from "next/image";

import { Box, Grid, Image, Heading, Text, Button } from "@chakra-ui/react";

import axios from "axios";
const CartScreen: React.FC = () => {
  const [showLoader, setShowLoader] = useState<boolean>(true);
  const [orders, setOrders] = useState<products[]>([]);
  const [userFromLocal, setUserFromLocal] = useState<any>();
  const path = usePathname();

  const id = path.split("/")[2];

  interface products {
    _id: string;
    name: string;
    image: string;
    brand: string;
    category: string;
    description: string;
    price: number;
  }

  const getMyOrders = async () => {
    try {
      const { data } = await axios.get<products[]>(
        `https://gpson-back-end.onrender.com/cart/${id}`
      );
      console.log(data, "19");
      setShowLoader(false);
      setOrders(data);
    } catch (err: any) {
      console.log(err.message);
    }
  };

  const deleteHandler = async (productId: string) => {
    try {
      const { data } = await axios.delete(
        `https://gpson-back-end.onrender.com/cart/${productId}`
      );
      window.location.reload();
    } catch (err: any) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const storedData: any = window.localStorage.getItem("user");
      const user: any = JSON.parse(storedData);
      setUserFromLocal(user);
    }
  }, []);

  useEffect(() => {
    getMyOrders();
  }, []);
  return (
    <>
      <div className="container w-full mx-auto pt-20">
        <div className="w-full mb-8">
          <Heading as="h3" m="2">
            Your Shopping Cart
          </Heading>
        </div>
        {orders.map((product: any) => {
          return (
            <>
              {/* <div className="flex flex-col">
                <div className="flex items-center mb-5 pl-10">
                  <img
                    className="h-16 w-16 object-cover rounded"
                    src={product.image}
                    alt="Item Image"
                  />

                  <div className="ml-4">
                    <h2 className="text-lg font-semibold">{product.name}</h2>
                    <p className="text-sm text-gray-600">
                      {product.description}
                    </p>
                    <p className="text-sm text-gray-600">{product.price}</p>
                  </div>
                </div>

                <div className="mt-8 flex justify-center">
                  <button
                    className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => deleteHandler(product._id)}
                  >
                    Delete
                  </button>
                </div>
              </div> */}
              <Box p={8}>
                <Grid templateColumns="repeat(3, 1fr)" gap={4}>
                  <Box>
                    <Image src={product.image} alt="image" h="150px" />
                  </Box>
                  <Box>
                    <Heading as="h1" size="lg">
                      {product.name}
                    </Heading>
                    <Text fontSize="md" color="gray.600" mt={2}>
                      {product.brand}
                    </Text>
                  </Box>
                  <Box>
                    <Text fontSize="lg" fontWeight="bold">
                      {product.price}
                    </Text>
                    <Button
                      colorScheme="red"
                      size="sm"
                      mt={2}
                      onClick={() => deleteHandler(product._id)}
                    >
                      Remove
                    </Button>
                  </Box>
                </Grid>
              </Box>
            </>
          );
        })}
      </div>
    </>
  );
};

export default CartScreen;
