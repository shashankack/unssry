import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Container,
  Alert,
  Snackbar,
  CircularProgress,
} from "@mui/material";
import { Send, Email, Person, QuestionMark, CheckCircle } from "@mui/icons-material";

const ContactSection = () => {
  const scriptURL = import.meta.env.VITE_FORM_API_URL;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    query: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState({
    open: false,
    type: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleCloseNotification = () => {
    setNotification({ open: false, type: "", message: "" });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.query.trim()) {
      newErrors.query = "Query is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    const form = new FormData();
    form.append("name", formData.name);
    form.append("email", formData.email);
    form.append("query", formData.query);

    try {
      const response = await fetch(scriptURL, { method: "POST", body: form });
      
      setFormData({ name: "", email: "", query: "" });
      setNotification({
        open: true,
        type: "success",
        message: "Thank you for your message! We'll get back to you soon.",
      });
    } catch (error) {
      setNotification({
        open: true,
        type: "error",
        message: "There was an error! Please try again.",
      });
      console.error("Error!", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      id="contact"
      sx={{
        minHeight: "100vh",
        backgroundColor: "background.default",
        py: { xs: 8, md: 12 },
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Pattern */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.02,
          backgroundImage: `repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 30px,
            black 30px,
            black 31px
          )`,
        }}
      />

      <Container maxWidth="md" sx={{ position: "relative", zIndex: 2 }}>
        <Stack spacing={6} alignItems="center">
          {/* Header */}
          <Stack spacing={2} alignItems="center" textAlign="center">
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: "2.5rem", md: "4rem" },
                color: "primary.main",
                mb: 2,
              }}
            >
              GET IN TOUCH
            </Typography>
            <Typography
              variant="h6"
              sx={{
                fontSize: { xs: "1rem", md: "1.2rem" },
                color: "text.secondary",
                letterSpacing: 2,
                mb: 2,
              }}
            >
              DROP US A LINE
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontFamily: "Space Mono, monospace",
                fontSize: "0.95rem",
                color: "text.primary",
                maxWidth: 500,
                lineHeight: 1.6,
              }}
            >
              Have questions about our unnecessary products? Want to collaborate
              on something equally pointless? We'd love to hear from you.
            </Typography>
          </Stack>

          {/* Contact Form */}
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              width: "100%",
              maxWidth: 600,
              backgroundColor: "background.default",
              border: "3px solid",
              borderColor: "primary.main",
              p: { xs: 3, md: 4 },
              position: "relative",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 10,
                left: 10,
                right: -10,
                bottom: -10,
                border: "2px solid",
                borderColor: "text.secondary",
                zIndex: -1,
              },
            }}
          >
            <Stack spacing={4}>
              {/* Name Field */}
              <TextField
                fullWidth
                name="name"
                label="Name"
                value={formData.name}
                onChange={handleChange}
                error={!!errors.name}
                helperText={errors.name}
                InputProps={{
                  startAdornment: (
                    <Person sx={{ mr: 1, color: "text.secondary" }} />
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    fontFamily: "Space Mono, monospace",
                    "& fieldset": {
                      borderColor: "primary.main",
                      borderWidth: "2px",
                    },
                    "&:hover fieldset": {
                      borderColor: "text.secondary",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "text.secondary",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    fontFamily: "Oswald, sans-serif",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: 1,
                  },
                }}
              />

              {/* Email Field */}
              <TextField
                fullWidth
                name="email"
                label="Email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
                InputProps={{
                  startAdornment: (
                    <Email sx={{ mr: 1, color: "text.secondary" }} />
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    fontFamily: "Space Mono, monospace",
                    "& fieldset": {
                      borderColor: "primary.main",
                      borderWidth: "2px",
                    },
                    "&:hover fieldset": {
                      borderColor: "text.secondary",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "text.secondary",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    fontFamily: "Oswald, sans-serif",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: 1,
                  },
                }}
              />

              {/* Query Field */}
              <TextField
                fullWidth
                name="query"
                label="Your Query"
                multiline
                rows={4}
                value={formData.query}
                onChange={handleChange}
                error={!!errors.query}
                helperText={errors.query}
                InputProps={{
                  startAdornment: (
                    <QuestionMark
                      sx={{
                        mr: 1,
                        color: "text.secondary",
                        alignSelf: "flex-start",
                        mt: 1,
                      }}
                    />
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    fontFamily: "Space Mono, monospace",
                    alignItems: "flex-start",
                    "& fieldset": {
                      borderColor: "primary.main",
                      borderWidth: "2px",
                    },
                    "&:hover fieldset": {
                      borderColor: "text.secondary",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "text.secondary",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    fontFamily: "Oswald, sans-serif",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: 1,
                  },
                }}
              />

              {/* Submit Button */}
              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={isSubmitting}
                startIcon={
                  isSubmitting ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : (
                    <Send />
                  )
                }
                sx={{
                  backgroundColor: "primary.main",
                  color: "background.default",
                  fontFamily: "Oswald, sans-serif",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: 2,
                  py: 1.5,
                  fontSize: "1.1rem",
                  border: "2px solid transparent",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "background.default",
                    color: "primary.main",
                    borderColor: "primary.main",
                    transform: "translateY(-3px)",
                    boxShadow: "5px 5px 0px rgba(255, 0, 0, 0.3)",
                  },
                  "&:disabled": {
                    backgroundColor: "grey.400",
                    color: "grey.600",
                    transform: "none",
                    boxShadow: "none",
                  },
                }}
              >
                {isSubmitting ? "SUBMITTING..." : "SEND MESSAGE"}
              </Button>
            </Stack>
          </Box>

          {/* Brand Message */}
          <Box
            sx={{
              textAlign: "center",
              pt: 4,
              borderTop: "2px solid",
              borderColor: "primary.main",
              width: "100%",
              maxWidth: 400,
            }}
          >
            <Typography
              variant="body1"
              sx={{
                fontFamily: "Space Mono, monospace",
                fontSize: "0.85rem",
                color: "text.primary",
                opacity: 0.7,
                letterSpacing: 1,
              }}
            >
              "Building unnecessary connections, one message at a time"
            </Typography>
          </Box>
        </Stack>
      </Container>

      {/* Notification Snackbar */}
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseNotification}
          severity={notification.type}
          icon={notification.type === "success" ? <CheckCircle /> : undefined}
          sx={{
            fontFamily: "Space Mono, monospace",
            "& .MuiAlert-message": {
              fontWeight: 500,
            },
          }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ContactSection;
