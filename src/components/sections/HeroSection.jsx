import React, { useState, useEffect, useRef } from "react";
import { Box, Typography, Stack } from "@mui/material";
import ShuffleAnimation from "../ShuffleAnimation.jsx";
import { gsap } from "gsap";

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
  const japaneseTextRef = useRef(null);
  const uTextRef = useRef(null);
  const nnecessaryTextRef = useRef(null);
  const taglineRef = useRef(null);
  const collectionRef = useRef(null);

  useEffect(() => {
    const getRandomTagline = () => {
      if (taglines.length > 0) {
        const randomIndex = Math.floor(Math.random() * taglines.length);
        return taglines[randomIndex];
      }
      return "BUILT FOR THE UNNECESSARY";
    };

    setCurrentTagline(getRandomTagline());
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentDate(formatDate(now));
      setCurrentTime(formatTime(now));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (japaneseTextRef.current) {
      gsap.fromTo(
        japaneseTextRef.current,
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 0.6,
          ease: "back.out",
          delay: 0.5,
        }
      );
    }
  }, []);

  useEffect(() => {
    if (uTextRef.current && nnecessaryTextRef.current) {
      gsap.set(uTextRef.current, {
        scale: 0,
        transformOrigin: "center center",
      });

      gsap.set(nnecessaryTextRef.current, {
        width: 0,
        overflow: "hidden",
        whiteSpace: "nowrap",
      });

      const tl = gsap.timeline({ delay: 1.2 });

      tl.to(uTextRef.current, {
        scale: 1,
        duration: 0.6,
        ease: "back.out(1.7)",
      }).to(
        nnecessaryTextRef.current,
        {
          width: "auto",
          duration: 0.8,
          ease: "power2.out",
        },
        "+=0.1"
      );
    }
  }, []);

  useEffect(() => {
    if (taglineRef.current && collectionRef.current) {
      gsap.set([taglineRef.current, collectionRef.current], {
        yPercent: -200,
      });

      const tl = gsap.timeline({ delay: 2.8 });

      tl.to(taglineRef.current, {
        yPercent: 0,
        duration: 0.8,
        ease: "power2.out",
      }).to(
        collectionRef.current,
        {
          yPercent: 0,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.4"
      );

      // Trigger navbar animation using class selector
      gsap.to(".navbar", {
        y: 0,
        opacity: 1,
        duration: 2,
        ease: "power2.out",
        delay: 2.6,
      });
    }
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
          ref={japaneseTextRef}
          variant="h1"
          fontSize={{
            xs: 200,
            sm: 300,
            md: 500,
          }}
          color="#dddddd"
          sx={{ opacity: 0 }}
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
        <ShuffleAnimation
          text={`${currentDate} • ${currentTime}`}
          variant="body1"
          fontSize="14px"
          color="secondary.main"
          textTransform="uppercase"
          mb={2}
          duration={0.8}
        />

        {/* Content */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          sx={{ position: "relative" }}
        >
          <Typography
            ref={uTextRef}
            variant="h1"
            fontSize={{
              xs: 50,
              sm: 80,
              md: 100,
            }}
            sx={{
              display: "inline-block",
              transformOrigin: "center center",
              color: "text.secondary",
            }}
          >
            UN
          </Typography>
          <Typography
            ref={nnecessaryTextRef}
            variant="h1"
            fontSize={{
              xs: 50,
              sm: 80,
              md: 100,
            }}
            sx={{
              display: "inline-block",
              overflow: "hidden",
              whiteSpace: "nowrap",
              width: 0,
            }}
          >
            NECESSARY
          </Typography>
        </Stack>
        <Box overflow="hidden">
          <Typography
            ref={taglineRef}
            variant="h1"
            fontSize={{
              xs: 20,
              sm: 32,
              md: 40,
            }}
            color="secondary.main"
            fontWeight={600}
            mt={2}
          >
            {currentTagline}
          </Typography>
        </Box>
        <Box overflow="hidden">
          <Typography
            ref={collectionRef}
            variant="h1"
            fontSize={{
              xs: 12,
              sm: 20,
              md: 24,
            }}
            border={2}
            p={2}
            mt={2}
          >
            {collectionHandle} COLLECTION
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
};

export default HeroSection;
