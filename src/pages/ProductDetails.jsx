import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Stack,
  Chip,
  Divider,
  Grid,
  Paper,
  Container,
  Rating,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  ShoppingCart,
  FavoriteBorder,
  Share,
  Add,
  Remove,
  ArrowBack,
  LocalShipping,
  Security,
  Verified,
  ExpandMore,
  Star,
} from "@mui/icons-material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Thumbs, FreeMode } from "swiper/modules";
import { fetchProductByTitle } from "../utils/shopify";
import { unslugify } from "../utils/slugify";
import { useCart } from "../context/CartContext";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import "swiper/css/free-mode";

const ProductDetails = () => {
  const { productType, productName } = useParams();
  const navigate = useNavigate();
  const { addItemToCart, cartLoading } = useCart();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // State management
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Convert slug back to product title for API search
  const productTitle = unslugify(productName);

  // Cleanup function for Swiper
  useEffect(() => {
    return () => {
      if (thumbsSwiper && !thumbsSwiper.destroyed) {
        thumbsSwiper.destroy(true, true);
      }
    };
  }, [thumbsSwiper]);

  useEffect(() => {
    const getProduct = async () => {
      try {
        setLoading(true);
        const productData = await fetchProductByTitle(productTitle);
        setProduct(productData);

        // Set first available variant as default
        if (productData?.variants?.length > 0) {
          setSelectedVariant(productData.variants[0]);
        }
      } catch (err) {
        setError(err.message);
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    if (productName) {
      getProduct();
    }
  }, [productName, productTitle]);

  // Quantity handlers
  const handleQuantityChange = (newQuantity) => {
    const maxQuantity = selectedVariant?.quantityAvailable || 0;
    if (newQuantity >= 1 && newQuantity <= maxQuantity) {
      setQuantity(newQuantity);
    }
  };

  // Add to cart handler
  const handleAddToCart = async () => {
    if (!selectedVariant?.id) return;

    try {
      await addItemToCart(selectedVariant.id, quantity);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "50vh",
          }}
        >
          <Typography variant="h5" color="text.secondary">
            Loading product...
          </Typography>
        </Box>
      </Container>
    );
  }

  if (error || !product) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            minHeight: "50vh",
          }}
        >
          <Typography variant="h4" color="error" mb={2}>
            Product Not Found
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate("/")}
            startIcon={<ArrowBack />}
          >
            Return Home
          </Button>
        </Box>
      </Container>
    );
  }

  const isAvailable =
    selectedVariant?.availableForSale && selectedVariant?.quantityAvailable > 0;
  const price = selectedVariant?.price;

  return (
    <Box
      sx={{ backgroundColor: "background.default", minHeight: "100vh" }}
      mt={10}
    >
      {/* Navigation Header */}
      <Container maxWidth="lg">
        <Stack direction="row" alignItems="center" spacing={2} sx={{ py: 2 }}>
          <IconButton
            onClick={() => navigate(-1)}
            sx={{ color: "text.primary" }}
          >
            <ArrowBack />
          </IconButton>
          <Typography variant="body2" color="text.secondary">
            Home / {productType} / {product.title}
          </Typography>
        </Stack>
      </Container>

      <Container maxWidth="lg" sx={{ pb: 6 }}>
        <Grid container spacing={4}>
          {/* Image Gallery */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper
              elevation={0}
              sx={{
                position: "sticky",
                top: 20,
                backgroundColor: "white",
                borderRadius: 2,
                overflow: "hidden",
              }}
            >
              {/* Main Image */}
              <Box sx={{ position: "relative", aspectRatio: "1/1" }}>
                {product.images && product.images.length > 0 ? (
                  <Swiper
                    modules={[Navigation, Pagination, Thumbs]}
                    navigation={!isMobile}
                    pagination={{ clickable: true }}
                    thumbs={{
                      swiper:
                        thumbsSwiper && !thumbsSwiper.destroyed
                          ? thumbsSwiper
                          : null,
                    }}
                    onSlideChange={(swiper) => {
                      if (swiper && typeof swiper.activeIndex !== "undefined") {
                        setSelectedImageIndex(swiper.activeIndex);
                      }
                    }}
                    style={{
                      height: "100%",
                      "--swiper-navigation-color": "#000",
                      "--swiper-navigation-size": "25px",
                      "--swiper-pagination-color": "#000",
                      // "--swiper-pagination-bullet-size": "8px",
                      // "--swiper-pagination-bullet-width": "20px",
                      // "--swiper-pagination-bullet-border-radius": "10px",
                    }}
                  >
                    {product.images.map((image, index) => (
                      <SwiperSlide key={index}>
                        <Box
                          component="img"
                          src={image.url}
                          alt={`${product.title} - Image ${index + 1}`}
                          sx={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                ) : (
                  <Box
                    sx={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "grey.100",
                    }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      No images available
                    </Typography>
                  </Box>
                )}
              </Box>

              {/* Thumbnail Navigation */}
              {product.images?.length > 1 && (
                <Box sx={{ p: 2 }}>
                  <Swiper
                    onSwiper={(swiper) => {
                      if (swiper && !swiper.destroyed) {
                        setThumbsSwiper(swiper);
                      }
                    }}
                    modules={[FreeMode, Thumbs]}
                    spaceBetween={10}
                    slidesPerView={4}
                    freeMode={true}
                    watchSlidesProgress={true}
                    style={{ height: "80px" }}
                  >
                    {product.images.map((image, index) => (
                      <SwiperSlide key={index}>
                        <Box
                          component="img"
                          src={image.url}
                          alt={`Thumbnail ${index + 1}`}
                          sx={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            borderRadius: 1,
                            cursor: "pointer",
                            border:
                              selectedImageIndex === index
                                ? "2px solid"
                                : "2px solid transparent",
                            borderColor:
                              selectedImageIndex === index
                                ? "primary.main"
                                : "transparent",
                            transition: "border-color 0.2s",
                          }}
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </Box>
              )}
            </Paper>
          </Grid>

          {/* Product Information */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Stack spacing={3}>
              {/* Product Title & Rating */}
              <Box>
                <Typography
                  variant="h4"
                  component="h1"
                  gutterBottom
                  sx={{ fontWeight: 600 }}
                >
                  {product.title}
                </Typography>
                <Chip
                  label={product.productType}
                  size="large"
                  variant="outlined"
                  sx={{ mb: 2 }}
                />
              </Box>

              {/* Price */}
              <Box>
                <Typography
                  variant="h3"
                  color="primary"
                  sx={{ fontWeight: 700 }}
                >
                  ${price?.amount} {price?.currencyCode}
                </Typography>
                <Stack direction="row" alignItems="center" spacing={1} mt={1}>
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      backgroundColor: isAvailable
                        ? "success.main"
                        : "error.main",
                    }}
                  />
                  <Typography variant="body2" color="text.secondary">
                    {isAvailable
                      ? `${selectedVariant?.quantityAvailable} in stock`
                      : "Out of stock"}
                  </Typography>
                </Stack>
              </Box>

              {/* Product Options */}
              {product.options?.map((option, index) => (
                <Box key={index}>
                  <Typography variant="h6" gutterBottom>
                    {option.name}
                  </Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap">
                    {option.values?.map((value, valueIndex) => (
                      <Button
                        key={valueIndex}
                        variant="outlined"
                        size="small"
                        sx={{ minWidth: 60 }}
                      >
                        {value}
                      </Button>
                    ))}
                  </Stack>
                </Box>
              ))}

              {/* Quantity & Add to Cart */}
              <Stack spacing={2}>
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Quantity
                  </Typography>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <IconButton
                      onClick={() => handleQuantityChange(quantity - 1)}
                      disabled={quantity <= 1}
                      size="small"
                      sx={{ border: 1, borderColor: "divider" }}
                    >
                      <Remove />
                    </IconButton>
                    <Typography
                      variant="h6"
                      sx={{ minWidth: 40, textAlign: "center" }}
                    >
                      {quantity}
                    </Typography>
                    <IconButton
                      onClick={() => handleQuantityChange(quantity + 1)}
                      disabled={
                        quantity >= (selectedVariant?.quantityAvailable || 0)
                      }
                      size="small"
                      sx={{ border: 1, borderColor: "divider" }}
                    >
                      <Add />
                    </IconButton>
                  </Stack>
                </Box>

                {/* Action Buttons */}
                <Stack spacing={2}>
                  <Button
                    variant="contained"
                    size="large"
                    fullWidth
                    disabled={!isAvailable || cartLoading}
                    onClick={handleAddToCart}
                    startIcon={<ShoppingCart />}
                    sx={{ py: 1.5 }}
                  >
                    {cartLoading
                      ? "Adding..."
                      : isAvailable
                      ? "Add to Cart"
                      : "Out of Stock"}
                  </Button>
                </Stack>
              </Stack>

              {/* Product Features */}
              <Paper sx={{ p: 2, backgroundColor: "grey.50" }}>
                <Stack spacing={1}>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <LocalShipping color="primary" />
                    <Typography variant="body2">
                      Free shipping on orders over $100
                    </Typography>
                  </Stack>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Security color="primary" />
                    <Typography variant="body2">
                      Secure payment & 30-day returns
                    </Typography>
                  </Stack>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Verified color="primary" />
                    <Typography variant="body2">
                      Authentic UNNECESSARY product
                    </Typography>
                  </Stack>
                </Stack>
              </Paper>

              {/* Product Details Accordion */}
              <Box>
                <Accordion defaultExpanded>
                  <AccordionSummary expandIcon={<ExpandMore />}>
                    <Typography variant="h6">Product Details</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      sx={{ lineHeight: 1.7 }}
                      dangerouslySetInnerHTML={{
                        __html: product.descriptionHtml,
                      }}
                    />
                  </AccordionDetails>
                </Accordion>

                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMore />}>
                    <Typography variant="h6">Shipping & Returns</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="body1" color="text.secondary">
                      Free standard shipping on orders over $100. Express
                      shipping available. 30-day return policy for unworn items
                      in original packaging.
                    </Typography>
                  </AccordionDetails>
                </Accordion>

                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMore />}>
                    <Typography variant="h6">Size Guide</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="body1" color="text.secondary">
                      Please refer to our size chart for the best fit. If you're
                      between sizes, we recommend sizing up for comfort.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ProductDetails;
