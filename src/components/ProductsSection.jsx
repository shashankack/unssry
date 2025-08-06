import { Box, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

const ProductsSection = ({ products }) => {
  return (
    <Box maxHeight={600} width="100%" border={1}>
      <Swiper slidesPerView={4}>
        {[...products, ...products].map((product) => (
          <SwiperSlide key={`${product.id}-${Math.random()}`}>
            <Box
              borderRight={1}
              bgcolor="#ebe9e3"
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="space-between"
              height="100%"
            >
              <Box overflow="hidden" width="100%" height={400}>
                <Box
                  component="img"
                  src={product.image}
                  alt={product.name}
                  onClick={() => {
                    window.location.href = `/shop/${product.slug}/${product.id}`;
                  }}
                  sx={{
                    width: "100%",
                    maxHeight: 400,
                    objectFit: "contain",
                    transition: "transform 0.3s ease",

                    "&:hover": {
                      transform: "scale(1.05)",
                    },
                  }}
                />
              </Box>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="start"
                width="100%"
                py={4}
                pl={3}
                borderTop={1}
              >
                <Typography textAlign="start" fontSize="1em" fontWeight={600}>
                  {product.name}
                </Typography>
              </Box>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default ProductsSection;
