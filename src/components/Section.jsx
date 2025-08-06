import { Box, Stack, Typography, Button } from "@mui/material";

const Section = ({ thumbnail, tagline, products, redirect }) => {
  console.log(products);

  return (
    <Box height="100vh" position="relative">
      <Box
        component="img"
        src={thumbnail}
        sx={{
          height: "100%",
          width: "100%",
          objectFit: "cover",
        }}
      />

      <Stack
        width="100%"
        height={100}
        position="absolute"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        px={4}
        sx={{
          bottom: 0,
          left: 0,
        }}
      >
        <Typography
          color="white"
          fontWeight={900}
          fontSize="2.2vw"
          textTransform="uppercase"
          sx={{
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
          }}
        >
          {tagline}
        </Typography>

        <Button
          onClick={() => {
            window.location.href = redirect;
          }}
          sx={{
            backgroundColor: "white",
            color: "black",
            fontWeight: 700,
            textTransform: "uppercase",
            borderRadius: 6,
            padding: "10px 20px",
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: "#f0f0f0",
              transform: "scale(1.05)",
            },
          }}
        >
          Discover Now
        </Button>
      </Stack>
    </Box>
  );
};

export default Section;
