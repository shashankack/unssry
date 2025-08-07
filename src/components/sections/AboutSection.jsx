import React from "react";
import { Box, Typography, Stack } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const AboutSection = () => {
  const cardsData = [
    {
      title: "URBAN UTILITY",
      subTitle: "WF24 COLLECTION",
    },
    {
      title: "STREET ESSENTIAL",
      subTitle: "MINIMALIST APPROACH",
    },
    {
      title: "TECH WEAR",
      subTitle: "FUNCTIONALITY FIRST",
    },
  ];

  return (
    <Stack
      minHeight="100vh"
      width="100%"
      overflow="hidden"
      alignItems="center"
      id="about"
    >
      {/* Banner */}
      <Stack
        bgcolor={"primary.main"}
        width="100%"
        px={1}
        py={6}
        justifyContent="center"
        alignItems="center"
        gap={2}
      >
        <Typography
          variant="h1"
          color="text.secondary"
          fontSize={{
            xs: 18,
            md: 26,
          }}
        >
          THE UNNECESSARY PHILOSOPHY
        </Typography>
        <Typography
          maxWidth={800}
          textAlign="center"
          variant="h1"
          color="#aaa"
          fontSize={16}
          textTransform="none"
          letterSpacing={0.3}
          lineHeight={1.5}
        >
          Unnecessary® exists for the ones who don't fit the algorithm. Our
          clothes are made for movement across lanes, ideas, and expectations.
          With silhouettes that demand attention and details that make you look
          twice, we don't just sell fashion; we sell friction. If it feels like
          too much, it's probably just right.
        </Typography>
      </Stack>

      {/* Cards Swiper */}
      <Box
        width={{
          xs: "90%",
          md: "70%",
        }}
        mt={10}
        py={4}
      >
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
          style={{
            "--swiper-navigation-color": "#000",
            "--swiper-navigation-size": "25px",
            "--swiper-pagination-color": "#000",
            "--swiper-pagination-bullet-size": "8px",
            paddingBottom: "10px",
            paddingTop: "10px",
          }}
        >
          {cardsData.map((card, index) => (
            <SwiperSlide key={index}>
              <Box
                height={500}
                border={2}
                borderColor="primary.main"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  backgroundColor: "background.default",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    boxShadow: "10px 10px 0 rgba(0, 0, 0, 1)",
                    transform: "translateY(-5px)",
                  },
                }}
              >
                <Stack
                  padding={10}
                  justifyContent="center"
                  alignItems="center"
                  textAlign="center"
                >
                  <Typography
                    variant="h1"
                    fontSize={24}
                    color="text.primary"
                    fontWeight={600}
                    mb={2}
                  >
                    {card.title}
                  </Typography>
                  <Typography
                    variant="h6"
                    color="text.secondary"
                    fontWeight={600}
                  >
                    {card.subTitle}
                  </Typography>
                </Stack>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Stack>
  );
};

export default AboutSection;
