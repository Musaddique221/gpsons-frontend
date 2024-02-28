"use client";

import { Product } from "@/types";
import { useState } from "react";
import Image from "next/image";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";

import { RxEyeOpen } from "react-icons/rx";

import { useDisclosure } from "@chakra-ui/react";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden mt-10 w-80 mx-auto ">
        <a className="hover:cursor-pointer" href={`product/${product._id}`}>
          <img
            className="h-70 object-cover"
            src={product.image}
            alt={product.name}
          />
        </a>
        <div className="p-4">
          <h2 className="text-gray-800 text-xl font-semibold mb-2">
            {product.name}
          </h2>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <div className="flex justify-between items-center">
            <span className="text-gray-700 font-semibold">
              ₹{product.price}
            </span>
            <button
              className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600"
              onClick={onOpen}
            >
              <RxEyeOpen />
            </button>
            <Modal
              isCentered
              onClose={onClose}
              isOpen={isOpen}
              motionPreset="slideInBottom"
            >
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>{product.name}</ModalHeader>

                <ModalCloseButton />
                <ModalBody>
                  <img
                    className="h-50 object-cover"
                    src={product.image}
                    alt={product.name}
                  />
                  <p className="text-gray-600 mb-4 mt-4 ">
                    {product.description}
                  </p>
                  <span className="text-gray-700 font-semibold">
                    ₹{product.price}
                  </span>
                </ModalBody>
                <ModalFooter>
                  <Button colorScheme="teal" mr={3} onClick={onClose}>
                    Close
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
