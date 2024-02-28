"use client";

import ProductCard from "@/components/ProductCard";
import { Product } from "@/types";
import { useState, useEffect } from "react";
import axios from "axios";

import { Grid, Heading } from "@chakra-ui/react";

import Loader from "@/components/Loader";

const HomeScreen = () => {
  interface products {
    _id: string;
    name: string;
    image: string;
    brand: string;
    category: string;
    description: string;
    price: number;
  }
  const [products, setProducts] = useState<products[]>([]);
  const [showLoader, setShowLoader] = useState<boolean>(true);

  const getProducts = async () => {
    try {
      const { data } = await axios.get<products[]>("https://gpson-back-end.onrender.com/");
      setShowLoader(false);
      setProducts(data);
    } catch (err: any) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div> */}
      {showLoader ? (
        <Loader />
      ) : (
        <Heading as="h2" mt="10" ml="10px" fontSize="3xl">
          Latest Products
        </Heading>
      )}
      <Grid
        templateColumns={{ sm: "1fr", md: "1fr 1fr", lg: "1fr 1fr 1fr 1fr" }}
        gap="8"
      >
        {products.map((product: any) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </Grid>
    </>
  );
};

export default HomeScreen;
