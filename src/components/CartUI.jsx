import React from "react";
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Stack,
  Button,
  LinearProgress,
  Alert,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import {
  Close,
  Add,
  Remove,
  ShoppingBag,
  DeleteOutline,
} from "@mui/icons-material";
import { useCart } from "../context/CartContext";

const CartItem = ({ item }) => {
  const { updateItemQuantity, removeItemFromCart, loading } = useCart();
  const merchandise = item.merchandise;
  const product = merchandise.product;

  const handleQuantityChange = async (newQuantity) => {
    try {
      await updateItemQuantity(item.id, newQuantity);
    } catch (error) {
      console.error("Failed to update quantity:", error);
    }
  };

  const handleRemoveItem = async () => {
    try {
      await removeItemFromCart(item.id);
    } catch (error) {
      console.error("Failed to remove item:", error);
    }
  };

  return (
    <Card
      sx={{
        display: "flex",
        mb: 2,
        boxShadow: 1,
        "&:hover": { boxShadow: 2 },
      }}
    >
      <CardMedia
        component="img"
        sx={{ width: 80, height: 80, objectFit: "cover" }}
        image={merchandise.image?.url || "/placeholder-image.jpg"}
        alt={product.title}
      />
      <CardContent sx={{ flex: 1, padding: 2, "&:last-child": { pb: 2 } }}>
        <Stack spacing={1}>
          <Typography
            variant="subtitle2"
            sx={{
              fontFamily: "Oswald, sans-serif",
              fontWeight: 600,
              fontSize: "14px",
              lineHeight: 1.2,
            }}
          >
            {product.title}
          </Typography>

          {merchandise.title !== "Default Title" && (
            <Typography variant="caption" color="text.secondary">
              {merchandise.title}
            </Typography>
          )}

          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="body2" fontWeight="bold">
              ${item.cost.subtotalAmount.amount}{" "}
              {item.cost.subtotalAmount.currencyCode}
            </Typography>

            <Stack direction="row" alignItems="center" spacing={1}>
              <IconButton
                size="small"
                onClick={() => handleQuantityChange(item.quantity - 1)}
                disabled={loading || item.quantity <= 1}
                sx={{
                  backgroundColor: "grey.100",
                  "&:hover": { backgroundColor: "grey.200" },
                }}
              >
                <Remove fontSize="small" />
              </IconButton>

              <Typography
                variant="body2"
                sx={{ minWidth: 20, textAlign: "center" }}
              >
                {item.quantity}
              </Typography>

              <IconButton
                size="small"
                onClick={() => handleQuantityChange(item.quantity + 1)}
                disabled={loading}
                sx={{
                  backgroundColor: "grey.100",
                  "&:hover": { backgroundColor: "grey.200" },
                }}
              >
                <Add fontSize="small" />
              </IconButton>

              <IconButton
                size="small"
                onClick={handleRemoveItem}
                disabled={loading}
                sx={{
                  color: "error.main",
                  "&:hover": { backgroundColor: "error.light", color: "white" },
                }}
              >
                <DeleteOutline fontSize="small" />
              </IconButton>
            </Stack>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

const CartUI = () => {
  const {
    cart,
    loading,
    error,
    isCartOpen,
    closeCart,
    cartItemCount,
    cartTotal,
    cartCurrency,
  } = useCart();

  const cartItems = cart?.lines?.edges || [];

  const handleCheckout = () => {
    if (cart?.checkoutUrl) {
      window.open(cart.checkoutUrl, "_blank");
    }
  };

  return (
    <Drawer
      anchor="right"
      open={isCartOpen}
      onClose={closeCart}
      sx={{
        "& .MuiDrawer-paper": {
          width: { xs: "100%", sm: 400 },
          maxWidth: "100vw",
        },
      }}
    >
      <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
        {/* Header */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ p: 2, borderBottom: 1, borderColor: "divider" }}
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            <ShoppingBag />
            <Typography
              variant="h6"
              sx={{
                fontFamily: "Oswald, sans-serif",
                fontWeight: 600,
                textTransform: "uppercase",
              }}
            >
              Cart ({cartItemCount})
            </Typography>
          </Stack>
          <IconButton onClick={closeCart}>
            <Close />
          </IconButton>
        </Stack>

        {/* Error Display */}
        {error && (
          <Alert severity="error" sx={{ m: 2 }}>
            {error}
          </Alert>
        )}

        {/* Loading State */}
        <Box sx={{ height: 4 }}>
          {loading && (
            <LinearProgress
              color="primary"
              sx={{
                backgroundColor: "grey.200",
                "& .MuiLinearProgress-bar": {
                  backgroundColor: "primary.main",
                },
              }}
            />
          )}
        </Box>

        {/* Cart Content */}
        <Box sx={{ flex: 1, overflow: "auto", p: 2 }}>
          {cartItems.length === 0 ? (
            <Stack
              spacing={2}
              alignItems="center"
              justifyContent="center"
              sx={{ height: "100%", textAlign: "center" }}
            >
              <ShoppingBag sx={{ fontSize: 64, color: "grey.400" }} />
              <Typography variant="h6" color="text.secondary">
                Your cart is empty
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Add some items to get started
              </Typography>
              <Button
                variant="contained"
                onClick={closeCart}
                sx={{
                  fontFamily: "Oswald, sans-serif",
                  fontWeight: 600,
                  textTransform: "uppercase",
                }}
              >
                Continue Shopping
              </Button>
            </Stack>
          ) : (
            <Stack spacing={2}>
              {cartItems.map((edge) => (
                <CartItem key={edge.node.id} item={edge.node} />
              ))}
            </Stack>
          )}
        </Box>

        {/* Footer with Total and Checkout */}
        {cartItems.length > 0 && (
          <Box sx={{ borderTop: 1, borderColor: "divider", p: 2 }}>
            <Stack spacing={2}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: "Oswald, sans-serif",
                    fontWeight: 600,
                    textTransform: "uppercase",
                  }}
                >
                  Total
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: "Oswald, sans-serif",
                    fontWeight: 700,
                  }}
                >
                  ${cartTotal} {cartCurrency}
                </Typography>
              </Stack>

              <Button
                variant="contained"
                fullWidth
                size="large"
                onClick={handleCheckout}
                disabled={loading || !cart?.checkoutUrl}
                sx={{
                  backgroundColor: "primary.main",
                  color: "white",
                  fontFamily: "Oswald, sans-serif",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  py: 1.5,
                  "&:hover": {
                    backgroundColor: "primary.dark",
                  },
                }}
              >
                Checkout
              </Button>

              <Button
                variant="outlined"
                fullWidth
                onClick={closeCart}
                sx={{
                  fontFamily: "Oswald, sans-serif",
                  fontWeight: 600,
                  textTransform: "uppercase",
                }}
              >
                Continue Shopping
              </Button>
            </Stack>
          </Box>
        )}
      </Box>
    </Drawer>
  );
};

export default CartUI;
