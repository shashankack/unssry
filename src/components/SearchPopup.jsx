import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
  CircularProgress,
  LinearProgress,
  IconButton,
  InputAdornment,
  Typography,
  Box,
  Chip,
} from "@mui/material";
import {
  Close,
  SearchOutlined,
  ShoppingCart,
  Block,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { searchProducts } from "../utils/shopify";
import { slugify } from "../utils/slugify";
import { useCart } from "../context/CartContext";

const SearchPopup = ({ open, onClose }) => {
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [addingToCart, setAddingToCart] = useState(null);

  const navigate = useNavigate();
  const { addItemToCart } = useCart();

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!keyword || keyword.trim().length < 2) {
      setError("Please enter at least 2 characters to search.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const res = await searchProducts(keyword.trim());
      setResults(res);

      if (res.length === 0) {
        setError("No products found matching your search.");
      }
    } catch (err) {
      setError("Error searching products. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (e, product) => {
    e.stopPropagation();

    if (
      !product.variantId ||
      !product.availableForSale ||
      product.quantityAvailable <= 0
    ) {
      return;
    }

    setAddingToCart(product.id);

    try {
      await addItemToCart(product.variantId, 1);
    } catch (error) {
    } finally {
      setAddingToCart(null);
    }
  };

  const formatPrice = (price) => {
    if (!price) return "Price not available";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: price.currencyCode || "USD",
    }).format(price.amount);
  };

  const isOutOfStock = (product) => {
    return !product.availableForSale || product.quantityAvailable <= 0;
  };

  const handleResultClick = (product) => {
    const productTypeSlug = slugify(product.productType);
    const productNameSlug = slugify(product.title);
    setKeyword("");
    setResults([]);
    onClose();
    navigate(`/shop/${productTypeSlug}/${productNameSlug}`);
  };

  const handleInputChange = (e) => {
    setKeyword(e.target.value);
    setError(null);
    if (e.target.value.length < 2) {
      setResults([]);
    }
  };

  // Debounced search effect
  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      if (keyword && keyword.trim().length >= 2) {
        handleSearchDebounced();
      }
    }, 500);

    return () => clearTimeout(delayedSearch);
  }, [keyword]);

  const handleSearchDebounced = async () => {
    if (!keyword || keyword.trim().length < 2) {
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const res = await searchProducts(keyword.trim());
      setResults(res);

      if (res.length === 0) {
        setError("No products found matching your search.");
      }
    } catch (err) {
      setError("Error searching products. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (!open) {
      setKeyword("");
      setResults([]);
      setLoading(false);
      setError(null);
      setAddingToCart(null);
    }
  }, [open]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        Search Products
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSearch}>
          <TextField
            value={keyword}
            onChange={handleInputChange}
            placeholder="Type to search products (min 2 characters)"
            autoComplete="off"
            variant="outlined"
            fullWidth
            autoFocus
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      type="submit"
                      disabled={loading || keyword.length < 2}
                    >
                      <SearchOutlined />
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch(e);
            }}
            sx={{ mb: 2 }}
            helperText={
              keyword.length > 0 && keyword.length < 2
                ? "Enter at least 2 characters"
                : ""
            }
          />
        </form>

        {loading && (
          <Box sx={{ width: "100%", mt: 2 }}>
            <LinearProgress />
          </Box>
        )}

        {error && <Typography color="error">{error}</Typography>}

        {!loading && results.length > 0 && (
          <List dense>
            {results.map((product) => (
              <ListItem
                key={product.id}
                onClick={() => handleResultClick(product)}
                sx={{
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "action.hover",
                  },
                  pr: 8,
                }}
              >
                <ListItemAvatar>
                  <Avatar
                    src={product.image}
                    alt={product.title}
                    variant="rounded"
                    sx={{ width: 56, height: 56 }}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        marginBottom: "4px",
                      }}
                    >
                      <Typography variant="body1" component="span">
                        {product.title}
                      </Typography>
                      {product.price && (
                        <Chip
                          label={formatPrice(product.price)}
                          size="small"
                          color="primary"
                          variant="outlined"
                        />
                      )}
                      {isOutOfStock(product) && (
                        <Chip
                          label="Out of Stock"
                          size="small"
                          color="error"
                          variant="outlined"
                        />
                      )}
                    </span>
                  }
                  secondary={
                    <span>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        component="span"
                      >
                        {product.productType}
                      </Typography>
                      {product.quantityAvailable > 0 &&
                        product.quantityAvailable <= 5 && (
                          <>
                            <br />
                            <Typography
                              variant="caption"
                              color="warning.main"
                              component="span"
                            >
                              Only {product.quantityAvailable} left in stock
                            </Typography>
                          </>
                        )}
                    </span>
                  }
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label={
                      isOutOfStock(product) ? "out of stock" : "add to cart"
                    }
                    onClick={(e) => handleAddToCart(e, product)}
                    disabled={
                      isOutOfStock(product) || addingToCart === product.id
                    }
                    sx={{
                      "&:hover": {
                        backgroundColor: isOutOfStock(product)
                          ? "transparent"
                          : "primary.main",
                        color: isOutOfStock(product)
                          ? "inherit"
                          : "primary.contrastText",
                      },
                    }}
                  >
                    {addingToCart === product.id ? (
                      <CircularProgress size={20} color="inherit" />
                    ) : isOutOfStock(product) ? (
                      <Block color="error" />
                    ) : (
                      <ShoppingCart />
                    )}
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        )}

        {!loading && results.length === 0 && keyword && !error && (
          <Typography color="text.secondary">No results found.</Typography>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SearchPopup;
