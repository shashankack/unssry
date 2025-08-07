import React, { useState, useEffect } from "react";
import { Box, Typography, Stack } from "@mui/material";

const HeroSection = ({
  collectionHandle = "collection_name",
  taglines = [],
}) => {
  const formatDate = (date) => {
    return date.toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  };

  const formatTime = (date) => {
    return date.toLocaleString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  };

  const [currentDate, setCurrentDate] = useState(formatDate(new Date()));
  const [currentTime, setCurrentTime] = useState(formatTime(new Date()));
  const [currentTagline, setCurrentTagline] = useState("");

  // Set random tagline on component mount
  useEffect(() => {
    const getRandomTagline = () => {
      if (taglines.length > 0) {
        const randomIndex = Math.floor(Math.random() * taglines.length);
        return taglines[randomIndex];
      }
      return "BUILT FOR THE UNNECESSARY"; // fallback
    };

    setCurrentTagline(getRandomTagline());
  }, []); // Empty dependency array ensures this runs once on mount

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentDate(formatDate(now));
      setCurrentTime(formatTime(now));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box position="relative" minHeight="100vh" width="100%" overflow="hidden">
      <Box
        sx={{
          zIndex: 1,
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.05,
          backgroundImage: `repeating-linear-gradient(
                  45deg,
                  transparent,
                  transparent 20px,
                  black 20px,
                  black 21px
                )`,
        }}
      />
      <Box
        position="absolute"
        width="100%"
        height="100%"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 2,
        }}
      >
        <Typography
          variant="h1"
          fontSize={{
            xs: 200,
            sm: 300,
            md: 500,
          }}
          color="#dddddd"
          // sx={{ opacity: 0.1 }}
        >
          不要
        </Typography>
      </Box>
      <Stack
        mt={5}
        position="absolute"
        sx={{
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: 3,
        }}
      >
        {/* Date and Time */}
        <Typography
          textTransform="uppercase"
          color="secondary.main"
          variant="body1"
          fontSize="14px"
          mb={2}
        >
          {currentDate} • {currentTime}
        </Typography>

        {/* Content */}
        <Typography
          variant="h1"
          fontSize={{
            xs: 50,
            sm: 80,
            md: 100,
          }}
        >
          UNNECESSARY
        </Typography>
        <Typography
          variant="h1"
          fontSize={{
            xs: 20,
            sm: 32,
            md: 40,
          }}
          color="secondary.main"
          fontWeight={600}
        >
          {currentTagline}
        </Typography>
        <Typography
          variant="h1"
          fontSize={{
            xs: 12,
            sm: 20,
            md: 24,
          }}
          border={2}
          p={2}
          my={4}
        >
          {collectionHandle} COLLECTION
        </Typography>
      </Stack>
    </Box>
  );
};

export default HeroSection;
