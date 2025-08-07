import React, { useEffect, useRef } from "react";
import { Typography } from "@mui/material";
import { gsap } from "gsap";

const ShuffleAnimation = ({
  text,
  variant = "body1",
  fontSize = "14px",
  color = "secondary.main",
  textTransform = "uppercase",
  mb = 2,
  duration = 0.5,
  ...typographyProps
}) => {
  const textRef = useRef(null);
  const originalText = text;
  const intervalRef = useRef(null);
  const hasAnimated = useRef(false); // Flag to track if animation has run

  // Characters to use for shuffling effect
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  // Generate initial random text
  const generateRandomText = () => {
    return originalText
      .split("")
      .map((char) => {
        // Keep spaces and special characters like bullets
        if (char === " " || char === "•" || char === ":") {
          return char;
        }
        return chars[Math.floor(Math.random() * chars.length)];
      })
      .join("");
  };

  const shuffle = () => {
    if (!textRef.current) return;

    const element = textRef.current;
    const textLength = originalText.length;
    let iterations = 0;

    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      element.textContent = originalText
        .split("")
        .map((char, index) => {
          // Keep spaces and special characters like bullets
          if (char === " " || char === "•" || char === ":") {
            return char;
          }

          if (index < iterations) {
            return originalText[index];
          }

          // Return random character for positions that haven't been revealed yet
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join("");

      if (iterations >= textLength) {
        clearInterval(intervalRef.current);
        element.textContent = originalText; // Ensure final text is correct
        hasAnimated.current = true; // Mark animation as completed
      }

      iterations += 1 / 3; // Control speed of reveal
    }, 30); // Animation frame rate
  };

  useEffect(() => {
    if (!textRef.current || hasAnimated.current) {
      return;
    }

    // Step 1: Set initial random text immediately
    textRef.current.textContent = generateRandomText();

    // Step 2: Start the reveal animation after a brief delay
    const timer = setTimeout(() => {
      shuffle();
    }, 300); // Brief delay to show the scrambled text first

    return () => {
      clearTimeout(timer);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []); // Empty dependency array - only run once on mount

  // Separate useEffect to handle text updates after animation
  useEffect(() => {
    if (textRef.current && hasAnimated.current) {
      textRef.current.textContent = text;
    }
  }, [text]);

  // GSAP fade-in animation for the component
  useEffect(() => {
    if (textRef.current) {
      gsap.fromTo(
        textRef.current,
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: duration,
          ease: "power2.out",
        }
      );
    }
  }, [duration]);

  return (
    <Typography
      ref={textRef}
      variant={variant}
      fontSize={fontSize}
      color={color}
      textTransform={textTransform}
      mb={mb}
      sx={{
        fontFamily: "Space Mono, monospace",
        letterSpacing: "0.5px",
        fontWeight: 500,
        ...typographyProps.sx,
      }}
      {...typographyProps}
    >
      {originalText}
    </Typography>
  );
};

export default ShuffleAnimation;
