"use client";

import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";

// import Message from "@/components/Message";
import axios from "axios";

import { Alert, AlertIcon, AlertTitle } from "@chakra-ui/react";

import {
  FormControl,
  FormLabel,
  Input,
  Flex,
  Heading,
  Spacer,
  Button,
  FormHelperText,
  FormErrorMessage,
  Text,
  Link,
} from "@chakra-ui/react";

const LoginScreen = () => {
  const [input, setInput] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [info, setInfo] = useState(false);

  const router = useRouter();

  const submitHandler = async (e: any) => {
    e.preventDefault();
    try {
      const data = await axios.post("https://gpson-back-end.onrender.com/login", {
        email,
        password,
      });
      localStorage.setItem("user", JSON.stringify(data));
      setInfo(true);
      setMessage("Successfully loggedin ");
    } catch (err: any) {
      setError(true);
      setMessage(err.response.data.message + " ");
    }
  };

  const isError = input === "";
  return (
    <div>
      <Flex w="full" alignItems="center" justifyContent="center" py="10" h="vh">
        <Flex
          direction="column"
          boxShadow="md"
          backgroundColor="grey.100"
          p="10"
          width="xl"
        >
          {error ? (
            <Alert status="error">
              <AlertIcon />
              <AlertTitle>
                {msg}
                <Link href="/" className="text-black">
                  go back
                </Link>
              </AlertTitle>
            </Alert>
          ) : (
            ""
          )}

          <Heading as="h1" mb="40px">
            Login
          </Heading>
          <Spacer h="3" />
          {info ? (
            <Alert status="info">
              <AlertIcon />

              <AlertTitle>
                {msg}
                <a href="/" className="hover:underline">
                  {" "}
                  Go Back
                </a>
              </AlertTitle>
            </Alert>
          ) : (
            ""
          )}
          <form onSubmit={submitHandler}>
            <FormControl isInvalid={isError}>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="musaddique@example.com"
              />
              {!isError ? (
                <FormHelperText>Enter the email you wouldd like to.</FormHelperText>
              ) : (
                <FormErrorMessage>Email is required.</FormErrorMessage>
              )}
            </FormControl>
            <Spacer h="3" />
            <FormControl isInvalid={isError}>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                placeholder="************"
              />
              {!isError ? (
                <FormHelperText>
                  Enter the passowrd you would like to.
                </FormHelperText>
              ) : (
                <FormErrorMessage>Password is required.</FormErrorMessage>
              )}
            </FormControl>
            <Button type="submit" color="teal" mt="4">
              Login
            </Button>
          </form>
          <Flex pt="10">
            <Text fontWeight="semibod">
              New Customer? <Link href="/register">Click here to register</Link>
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </div>
  );
};

export default LoginScreen;
