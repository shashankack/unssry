import React, { useEffect, useRef } from "react";
import { Box, Typography, keyframes } from "@mui/material";

const scrollKeyframes = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
`;

const MarqueeText = () => {
  const scrollRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (!scrollRef.current || !contentRef.current) return;

    const scrollContainer = scrollRef.current;
    const scrollContent = contentRef.current;

    // Clone content for seamless loop
    if (!scrollContainer.querySelector(".cloned")) {
      const cloned = scrollContent.cloneNode(true);
      cloned.classList.add("cloned");
      scrollContainer.appendChild(cloned);
    }
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        overflow: "hidden",
        backgroundColor: "#000",
        position: "relative",
        "&:hover .scroll-text": {
          animationPlayState: "paused",
        },
      }}
    >
      <Box
        ref={scrollRef}
        className="scroll-text"
        sx={{
          display: "inline-flex",
          whiteSpace: "nowrap",
          animation: `${scrollKeyframes} 40s linear infinite`,
          willChange: "transform",
        }}
      >
        <Box
          ref={contentRef}
          sx={{
            display: "inline-flex",
            alignItems: "center",
            color: "#fff",
          }}
        >
          {Array(12)
            .fill("*FREE SHIPPING ABOVE 10K*")
            .map((text, idx) => (
              <Typography
                key={idx}
                sx={{
                  px: 3,
                  py: 2,
                  fontSize: 16,
                  fontWeight: 600,
                  textTransform: "uppercase",
                  cursor: "default",
                }}
              >
                {text}
              </Typography>
            ))}
        </Box>
      </Box>
    </Box>
  );
};

export default MarqueeText;
