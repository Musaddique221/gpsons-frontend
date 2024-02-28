"use client";

import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import { useRouter } from "next/navigation";

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
import { Alert, AlertIcon, AlertTitle } from "@chakra-ui/react";

const RegisterScreen = () => {
  const [input, setInput] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState(false);

  const router = useRouter();

  const submitHandler = async (e: any) => {
    e.preventDefault();
    try {
      const data = await axios.post("https://gpson-back-end.onrender.com/register", {
        name,
        email,
        password,
      });
      router.push("/");
      console.log(data);
    } catch (err: any) {
      setError(true);
      setMsg(err.response.data.message + " ");
      console.log(err.message);
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
              <AlertTitle>{msg}</AlertTitle>
            </Alert>
          ) : (
            ""
          )}
          <Heading as="h1" mb="20px">
            Register
          </Heading>
          <Spacer />
          <form onSubmit={submitHandler}>
            <FormControl isInvalid={isError}>
              <FormLabel>Your Full Name</FormLabel>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Musaddique Shaikh"
              />
              {!isError ? (
                <FormHelperText>Enter the namd you would like to.</FormHelperText>
              ) : (
                <FormErrorMessage>Name is required.</FormErrorMessage>
              )}
            </FormControl>

            <Spacer h="3" />
            <FormControl isInvalid={isError}>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="username@domain.com"
              />
              {!isError ? (
                <FormHelperText>Enter the email you would like to.</FormHelperText>
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
            <Spacer h="3" />
            <Button type="submit" color="teal" mt="4">
              Register
            </Button>
          </form>
        </Flex>
      </Flex>
    </div>
  );
};

export default RegisterScreen;
