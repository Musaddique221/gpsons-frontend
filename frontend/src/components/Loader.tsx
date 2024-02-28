import { Flex, Spinner } from "@chakra-ui/react";

const Loader = () => {
  return (
    <Flex alignItems="center" justifyContent="center">
      <Spinner
        mt="20px"
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="black"
        size="xl"
      ></Spinner>
    </Flex>
  );
};

export default Loader;
