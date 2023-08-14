import { Box, Heading } from "@chakra-ui/react";

interface ChakraTestProps {
  text: string;
}

const ChakraTest: React.FC<ChakraTestProps> = ({ text }) => {
  return (
    <Box p={4} shadow="md" borderWidth="1px" borderRadius="md">
      <Heading as="h2" size="lg" mb={2}>
        {text}
      </Heading>
      <p>This is a Chakra UI component created using Next.js and TypeScript!</p>
    </Box>
  );
};

export default ChakraTest;
