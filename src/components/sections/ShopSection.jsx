import React, { useState, useEffect } from "react";
import {
  Box,
  Stack,
  Typography,
  Button,
  Chip,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ShoppingCart } from "@mui/icons-material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { fetchAllCollections, fetchCollection } from "../../utils/shopify";
import { useCart } from "../../contexts/CartContext";
import { slugify } from "../../utils/slugify";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ShopSection = ({
  collectionHandle = "RIPPED REALITY",
  dropStatus = "Coming Soon",
  title = "TITLE",
  subTitle = "SUBTITLE",
}) => {
  const [products, setProducts] = useState([]);
  const [collectionInfo, setCollectionInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { addItemToCart, loading: cartLoading } = useCart();
  const isMobile = window.innerWidth < 768;

  useEffect(() => {
    const getCollectionData = async () => {
      try {
        setLoading(true);
        const { collection, products: collectionProducts } =
          await fetchCollection(collectionHandle, 12);
        setCollectionInfo(collection);
        setProducts(collectionProducts);
        console.log("Collection Info:", collection);
        console.log("Products:", collectionProducts);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching collection:", err);
      } finally {
        setLoading(false);
      }
    };

    getCollectionData();
  }, [collectionHandle]);

  if (loading) {
    return (
      <Stack
        minHeight="100vh"
        justifyContent="center"
        alignItems="center"
        sx={{ padding: 4 }}
      >
        <Typography variant="h6">Loading collection...</Typography>
      </Stack>
    );
  }

  if (error) {
    return (
      <Stack
        minHeight="100vh"
        justifyContent="center"
        alignItems="center"
        sx={{ padding: 4 }}
      >
        <Typography variant="h6" color="error">
          Error loading collection: {error}
        </Typography>
      </Stack>
    );
  }

  return (
    <Stack justifyContent="flex-start" alignItems="center" spacing={4} id="shop">
      {isMobile ? (
        <Stack
          bgcolor="primary.main"
          width="100%"
          px={2}
          py={6}
          justifyContent="space-between"
          alignItems="center"
          gap={6}
        >
          <Stack
            width="100%"
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography
              variant="h1"
              fontSize={22}
              color="background.default"
              whiteSpace="nowrap"
            >
              Latest Drop
            </Typography>
            <Chip
              label={dropStatus}
              sx={{
                backgroundColor: "secondary.main",
                color: "background.default",
                fontWeight: 600,
                textTransform: "uppercase",
              }}
            />
          </Stack>
          <Stack height="100%" justifyContent="end">
            <Typography
              variant="h1"
              color="text.secondary"
              fontSize={26}
              textAlign="center"
              mb={2}
            >
              {collectionInfo?.title}
            </Typography>
            <Typography
              variant="h1"
              color="#aaa"
              fontSize={14}
              textTransform="none"
              letterSpacing={0.3}
              sx={{
                textAlign: "justify",
                textAlignLast: "center",
              }}
            >
              {collectionInfo?.description}
            </Typography>
          </Stack>
        </Stack>
      ) : (
        <Stack
          bgcolor="primary.main"
          width="100%"
          height={300}
          padding={4}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack height="100%">
            <Typography
              variant="h1"
              fontSize={22}
              color="background.default"
              whiteSpace="nowrap"
            >
              Latest Drop
            </Typography>
          </Stack>
          <Stack height="100%" justifyContent="end" width={1400}>
            <Typography
              variant="h1"
              color="text.secondary"
              fontSize={32}
              textAlign="center"
              mb={2}
            >
              {collectionInfo?.title}
            </Typography>
            <Typography
              textAlign="center"
              variant="h1"
              color="#aaa"
              fontSize={16}
              textTransform="none"
              letterSpacing={0.3}
            >
              {collectionInfo?.description}
            </Typography>
          </Stack>
          <Stack height="100%">
            <Chip
              label={dropStatus}
              sx={{
                backgroundColor: "secondary.main",
                color: "background.default",
                fontWeight: 600,
                textTransform: "uppercase",
              }}
            />
          </Stack>
        </Stack>
      )}

      {/* Product Swiper */}
      <Box
        width="90%"
        py={{
          xs: 10,
          md: 20,
        }}
      >
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
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
            1280: {
              slidesPerView: 4,
              spaceBetween: 30,
            },
          }}
          style={{
            "--swiper-navigation-color": "#000",
            "--swiper-navigation-size": "25px",
            "--swiper-pagination-color": "#000",
            "--swiper-pagination-bullet-size": "8px",
            paddingBottom: "50px",
          }}
        >
          {products.map((product) => {
            const mainImage = product.images?.edges?.[0]?.node?.url;
            const firstVariant = product.variants?.edges?.[0]?.node;
            const price = firstVariant?.price;
            const isAvailable =
              firstVariant?.availableForSale &&
              firstVariant?.quantityAvailable > 0;
            const quantityAvailable = firstVariant?.quantityAvailable || 0;

            // Create slugified URLs
            const productTypeSlug = slugify(product.productType);
            const productNameSlug = slugify(product.title);

            return (
              <SwiperSlide key={product.id}>
                <Box
                  height={500}
                  border={2}
                  position="relative"
                  onClick={() =>
                    navigate(`/shop/${productTypeSlug}/${productNameSlug}`)
                  }
                  sx={{
                    overflow: "hidden",
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                    "&:hover": {
                      boxShadow: "10px 10px 0 rgba(0, 0, 0, 1)",

                      "& img": {
                        transform: "scale(.95)",
                      },

                      "& .overlay": {
                        opacity: 1,
                      },
                    },
                  }}
                >
                  <Box
                    component="img"
                    src={mainImage}
                    sx={{
                      transform: "scale(1.05)",
                      transition: "all 0.3s ease",
                      width: "100%",
                      height: "auto",
                      objectFit: "cover",
                    }}
                  />

                  {/* Subtle overlay with product details hint */}
                  <Box
                    className="overlay"
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 100, // Leave space for the product info section
                      backgroundColor: "rgba(0, 0, 0, 0.3)",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      opacity: 0,
                      transition: "opacity 0.3s ease",
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        color: "white",
                        backgroundColor: "rgba(0, 0, 0, 0.6)",
                        padding: "8px 16px",
                        borderRadius: "4px",
                        fontFamily: "Oswald, sans-serif",
                        fontWeight: 400,
                        textTransform: "uppercase",
                        fontSize: "12px",
                        letterSpacing: "1px",
                      }}
                    >
                      View Details
                    </Typography>
                  </Box>

                  <Stack
                    sx={{
                      height: 100,
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      backgroundColor: "white",
                      padding: 1,
                    }}
                  >
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Stack flex={1}>
                        <Typography
                          variant="h6"
                          sx={{
                            fontFamily: "Oswald, sans-serif",
                            fontWeight: 600,
                            textTransform: "uppercase",
                            fontSize: "14px",
                          }}
                        >
                          {product.title}
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{ color: "text.secondary", fontSize: "12px" }}
                        >
                          {price?.amount} {price?.currencyCode}
                        </Typography>
                        {!isAvailable && (
                          <Typography
                            variant="caption"
                            sx={{
                              color: "error.main",
                              fontSize: "10px",
                              fontFamily: "Oswald, sans-serif",
                              fontWeight: 600,
                              textTransform: "uppercase",
                            }}
                          >
                            Out of Stock
                          </Typography>
                        )}
                        {isAvailable && quantityAvailable <= 5 && (
                          <Typography
                            variant="caption"
                            sx={{
                              color: "warning.main",
                              fontSize: "10px",
                              fontFamily: "Oswald, sans-serif",
                              fontWeight: 600,
                              textTransform: "uppercase",
                            }}
                          >
                            Only {quantityAvailable} left
                          </Typography>
                        )}
                      </Stack>

                      {isAvailable ? (
                        <IconButton
                          onClick={(e) => {
                            e.stopPropagation();
                            const variantId = firstVariant?.id;
                            if (variantId && isAvailable) {
                              addItemToCart(variantId, 1);
                            } else {
                              console.error(
                                "No variant ID found for product:",
                                product.title
                              );
                            }
                          }}
                          disabled={cartLoading || !firstVariant?.id}
                          sx={{
                            backgroundColor: "primary.main",
                            color: "white",
                            "&:hover": {
                              backgroundColor: "primary.dark",
                            },
                            "&:disabled": {
                              backgroundColor: "grey.400",
                              color: "grey.600",
                            },
                          }}
                        >
                          <ShoppingCart fontSize="small" />
                        </IconButton>
                      ) : (
                        <Box
                          sx={{
                            backgroundColor: "error.main",
                            color: "white",
                            padding: "8px 12px",
                            borderRadius: "4px",
                            minWidth: "80px",
                            textAlign: "center",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            height: "40px",
                          }}
                        >
                          <Typography
                            variant="caption"
                            sx={{
                              fontFamily: "Oswald, sans-serif",
                              fontWeight: 600,
                              textTransform: "uppercase",
                              fontSize: "10px",
                              lineHeight: 1,
                            }}
                          >
                            Out of Stock
                          </Typography>
                        </Box>
                      )}
                    </Stack>
                  </Stack>
                </Box>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </Box>
    </Stack>
  );
};

export default ShopSection;
