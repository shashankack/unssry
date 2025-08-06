import React from "react";
import {
  Container,
  Typography,
  Box,
  Stack,
  Divider,
  List,
  ListItem,
  ListItemText,
  Paper,
} from "@mui/material";

const PrivacyPolicy = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      {/* Header Section */}
      <Box sx={{ mb: 6, textAlign: "center" }}>
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: "2.5rem", md: "4rem" },
            mb: 2,
            color: "primary.main",
          }}
        >
          PRIVACY POLICY
        </Typography>
        <Typography
          variant="h6"
          sx={{
            fontSize: { xs: "1rem", md: "1.2rem" },
            color: "text.secondary",
            mb: 4,
          }}
        >
          WE EXIST FOR THE ONES WHO DON'T FIT THE ALGORITHM
        </Typography>
        <Typography
          variant="h6"
          sx={{
            fontSize: { xs: "1rem", md: "1.2rem" },
            color: "text.secondary",
          }}
        >
          WE DON'T JUST SELL FASHION; WE SELL FRICTION
        </Typography>
      </Box>

      <Divider sx={{ mb: 4, bgcolor: "primary.main", height: 2 }} />

      {/* Introduction */}
      <Paper
        elevation={0}
        sx={{ p: 4, mb: 4, border: 2, borderColor: "primary.main" }}
      >
        <Typography
          variant="body1"
          sx={{ lineHeight: 1.8, fontSize: "1.1rem" }}
        >
          UNNECESSARY ("we", "us", "our") is committed to protecting your
          privacy. This Privacy Policy explains how we collect, use, share, and
          safeguard your information when you visit our website [unnssry.in],
          shop with us, or otherwise interact with our brand.
        </Typography>
      </Paper>

      {/* Section 1 */}
      <Stack spacing={4}>
        <Box>
          <Typography
            variant="h6"
            sx={{
              fontSize: { xs: "1.3rem", md: "1.5rem" },
              mb: 3,
              color: "primary.main",
            }}
          >
            1. INFORMATION WE COLLECT
          </Typography>

          <Box sx={{ mb: 3 }}>
            <Typography
              variant="h6"
              sx={{
                fontSize: "1.2rem",
                mb: 2,
                color: "text.secondary",
              }}
            >
              A. INFORMATION YOU PROVIDE
            </Typography>
            <List sx={{ pl: 2 }}>
              <ListItem disablePadding>
                <ListItemText
                  primary="Account data: Name, email, phone, address (for orders and account creation)"
                  primaryTypographyProps={{ fontSize: "1rem", lineHeight: 1.6 }}
                />
              </ListItem>
              <ListItem disablePadding>
                <ListItemText
                  primary="Order/payment data: Shipping/billing address, payment method, order details (Note: payments handled by secure third parties)"
                  primaryTypographyProps={{ fontSize: "1rem", lineHeight: 1.6 }}
                />
              </ListItem>
              <ListItem disablePadding>
                <ListItemText
                  primary="Messages: Contact form, support, survey, or email messages"
                  primaryTypographyProps={{ fontSize: "1rem", lineHeight: 1.6 }}
                />
              </ListItem>
            </List>
          </Box>

          <Box>
            <Typography
              variant="h6"
              sx={{
                fontSize: "1.2rem",
                mb: 2,
                color: "text.secondary",
              }}
            >
              B. AUTOMATICALLY COLLECTED DATA
            </Typography>
            <List sx={{ pl: 2 }}>
              <ListItem disablePadding>
                <ListItemText
                  primary="Device type, browser type, IP address, location"
                  primaryTypographyProps={{ fontSize: "1rem", lineHeight: 1.6 }}
                />
              </ListItem>
              <ListItem disablePadding>
                <ListItemText
                  primary="Cookies (see below), web beacons, analytics pixel data"
                  primaryTypographyProps={{ fontSize: "1rem", lineHeight: 1.6 }}
                />
              </ListItem>
            </List>
          </Box>
        </Box>

        <Divider sx={{ bgcolor: "primary.main", opacity: 0.3 }} />

        {/* Section 2 */}
        <Box>
          <Typography
            variant="h6"
            sx={{
              fontSize: { xs: "1.3rem", md: "1.5rem" },
              mb: 3,
              color: "primary.main",
            }}
          >
            2. HOW WE USE YOUR INFORMATION
          </Typography>
          <List sx={{ pl: 2 }}>
            <ListItem disablePadding>
              <ListItemText
                primary="To process, fulfill, and deliver your orders"
                primaryTypographyProps={{ fontSize: "1rem", lineHeight: 1.6 }}
              />
            </ListItem>
            <ListItem disablePadding>
              <ListItemText
                primary="To communicate (order status, drops, updates, support)"
                primaryTypographyProps={{ fontSize: "1rem", lineHeight: 1.6 }}
              />
            </ListItem>
            <ListItem disablePadding>
              <ListItemText
                primary="For legal obligations (tax, fraud prevention, compliance)"
                primaryTypographyProps={{ fontSize: "1rem", lineHeight: 1.6 }}
              />
            </ListItem>
            <ListItem disablePadding>
              <ListItemText
                primary="To analyze usage and improve website and product experience"
                primaryTypographyProps={{ fontSize: "1rem", lineHeight: 1.6 }}
              />
            </ListItem>
            <ListItem disablePadding>
              <ListItemText
                primary="With your permission, for marketing drops and brand news"
                primaryTypographyProps={{ fontSize: "1rem", lineHeight: 1.6 }}
              />
            </ListItem>
          </List>
        </Box>

        <Divider sx={{ bgcolor: "primary.main", opacity: 0.3 }} />

        {/* Section 3 */}
        <Box>
          <Typography
            variant="h6"
            sx={{
              fontSize: { xs: "1.3rem", md: "1.5rem" },
              mb: 3,
              color: "primary.main",
            }}
          >
            3. HOW YOUR DATA IS SHARED
          </Typography>
          <List sx={{ pl: 2 }}>
            <ListItem disablePadding>
              <ListItemText
                primary="With trusted service providers: Shipping, payments, IT, analytics, marketing; all bound by confidentiality"
                primaryTypographyProps={{ fontSize: "1rem", lineHeight: 1.6 }}
              />
            </ListItem>
            <ListItem disablePadding>
              <ListItemText
                primary="Legal authorities: Where required by law (fraud, compliance)"
                primaryTypographyProps={{ fontSize: "1rem", lineHeight: 1.6 }}
              />
            </ListItem>
            <ListItem disablePadding>
              <ListItemText
                primary="No selling of data: Your data is NEVER sold to third parties for advertising"
                primaryTypographyProps={{
                  fontSize: "1rem",
                  lineHeight: 1.6,
                  fontWeight: 600,
                }}
              />
            </ListItem>
          </List>
        </Box>

        <Divider sx={{ bgcolor: "primary.main", opacity: 0.3 }} />

        {/* Section 4 */}
        <Box>
          <Typography
            variant="h6"
            sx={{
              fontSize: { xs: "1.3rem", md: "1.5rem" },
              mb: 3,
              color: "primary.main",
            }}
          >
            4. COOKIES & TRACKING
          </Typography>
          <Typography
            variant="body1"
            sx={{ mb: 2, lineHeight: 1.8, fontSize: "1rem" }}
          >
            We use cookies (small files on your browser) for:
          </Typography>
          <List sx={{ pl: 2, mb: 2 }}>
            <ListItem disablePadding>
              <ListItemText
                primary="Website functionality (login, cart, checkout)"
                primaryTypographyProps={{ fontSize: "1rem", lineHeight: 1.6 }}
              />
            </ListItem>
            <ListItem disablePadding>
              <ListItemText
                primary="Analytics (Google Analytics, etc.)"
                primaryTypographyProps={{ fontSize: "1rem", lineHeight: 1.6 }}
              />
            </ListItem>
            <ListItem disablePadding>
              <ListItemText
                primary="Preference and language settings"
                primaryTypographyProps={{ fontSize: "1rem", lineHeight: 1.6 }}
              />
            </ListItem>
          </List>
          <Typography
            variant="body1"
            sx={{ lineHeight: 1.8, fontSize: "1rem" }}
          >
            You can disable cookies in your browser, but the website may lose
            some functionality.
          </Typography>
        </Box>

        <Divider sx={{ bgcolor: "primary.main", opacity: 0.3 }} />

        {/* Section 5 */}
        <Box>
          <Typography
            variant="h6"
            sx={{
              fontSize: { xs: "1.3rem", md: "1.5rem" },
              mb: 3,
              color: "primary.main",
            }}
          >
            5. DATA RETENTION
          </Typography>
          <Typography
            variant="body1"
            sx={{ mb: 2, lineHeight: 1.8, fontSize: "1rem" }}
          >
            We retain your data as long as required for the purposes above, and
            to comply with Indian law (Digital Personal Data Protection Act 2023
            & IT Rules 2011).
          </Typography>
          <Typography
            variant="body1"
            sx={{ lineHeight: 1.8, fontSize: "1rem" }}
          >
            You may delete your account or request deletion of your data at any
            time.
          </Typography>
        </Box>

        <Divider sx={{ bgcolor: "primary.main", opacity: 0.3 }} />

        {/* Section 6 */}
        <Box>
          <Typography
            variant="h6"
            sx={{
              fontSize: { xs: "1.3rem", md: "1.5rem" },
              mb: 3,
              color: "primary.main",
            }}
          >
            6. CHILDREN'S PRIVACY
          </Typography>
          <Typography
            variant="body1"
            sx={{ lineHeight: 1.8, fontSize: "1rem" }}
          >
            We do not knowingly collect data from children under 18. If you
            believe your child has provided us data, please email us and we'll
            delete it promptly.
          </Typography>
        </Box>

        <Divider sx={{ bgcolor: "primary.main", opacity: 0.3 }} />

        {/* Section 7 */}
        <Box>
          <Typography
            variant="h6"
            sx={{
              fontSize: { xs: "1.3rem", md: "1.5rem" },
              mb: 3,
              color: "primary.main",
            }}
          >
            7. SECURITY
          </Typography>
          <Typography
            variant="body1"
            sx={{ lineHeight: 1.8, fontSize: "1rem" }}
          >
            We use physical, electronic, and managerial safeguards to protect
            your data. While no system is 100% secure, we work with trusted
            vendors and industry standards to ensure best protection.
          </Typography>
        </Box>

        <Divider sx={{ bgcolor: "primary.main", opacity: 0.3 }} />

        {/* Section 8 */}
        <Box>
          <Typography
            variant="h6"
            sx={{
              fontSize: { xs: "1.3rem", md: "1.5rem" },
              mb: 3,
              color: "primary.main",
            }}
          >
            8. INTERNATIONAL USERS
          </Typography>
          <Typography
            variant="body1"
            sx={{ lineHeight: 1.8, fontSize: "1rem" }}
          >
            If you access [unnssry.in] from outside India, your information may
            be transferred to, stored, and processed in India. By using this
            site, you consent to this transfer.
          </Typography>
        </Box>

        <Divider sx={{ bgcolor: "primary.main", opacity: 0.3 }} />

        {/* Section 9 */}
        <Box>
          <Typography
            variant="h6"
            sx={{
              fontSize: { xs: "1.3rem", md: "1.5rem" },
              mb: 3,
              color: "primary.main",
            }}
          >
            9. YOUR RIGHTS
          </Typography>
          <Typography
            variant="body1"
            sx={{ mb: 2, lineHeight: 1.8, fontSize: "1rem" }}
          >
            Subject to law, you may:
          </Typography>
          <List sx={{ pl: 2, mb: 2 }}>
            <ListItem disablePadding>
              <ListItemText
                primary="Access the personal data we hold about you"
                primaryTypographyProps={{ fontSize: "1rem", lineHeight: 1.6 }}
              />
            </ListItem>
            <ListItem disablePadding>
              <ListItemText
                primary="Correct or update your information"
                primaryTypographyProps={{ fontSize: "1rem", lineHeight: 1.6 }}
              />
            </ListItem>
            <ListItem disablePadding>
              <ListItemText
                primary='Request deletion ("right to be forgotten")'
                primaryTypographyProps={{ fontSize: "1rem", lineHeight: 1.6 }}
              />
            </ListItem>
            <ListItem disablePadding>
              <ListItemText
                primary="opt out of marketing at any time"
                primaryTypographyProps={{ fontSize: "1rem", lineHeight: 1.6 }}
              />
            </ListItem>
          </List>
          <Typography
            variant="body1"
            sx={{ lineHeight: 1.8, fontSize: "1rem" }}
          >
            To exercise rights, email: privacy@unnssry.in
          </Typography>
        </Box>

        <Divider sx={{ bgcolor: "primary.main", opacity: 0.3 }} />

        {/* Section 10 */}
        <Box>
          <Typography
            variant="h6"
            sx={{
              fontSize: { xs: "1.3rem", md: "1.5rem" },
              mb: 3,
              color: "primary.main",
            }}
          >
            10. THIRD-PARTY SERVICES
          </Typography>
          <Typography
            variant="body1"
            sx={{ lineHeight: 1.8, fontSize: "1rem" }}
          >
            Our site may link to external platforms (Instagram, Shopify,
            Razorpay, etc.). Their privacy practices are governed by their own
            policies.
          </Typography>
        </Box>

        <Divider sx={{ bgcolor: "primary.main", opacity: 0.3 }} />

        {/* Section 11 */}
        <Box>
          <Typography
            variant="h6"
            sx={{
              fontSize: { xs: "1.3rem", md: "1.5rem" },
              mb: 3,
              color: "primary.main",
            }}
          >
            11. DATA BREACH NOTIFICATION
          </Typography>
          <Typography
            variant="body1"
            sx={{ lineHeight: 1.8, fontSize: "1rem" }}
          >
            If there's a data breach affecting your data, we will notify you and
            relevant authorities as required by law.
          </Typography>
        </Box>

        <Divider sx={{ bgcolor: "primary.main", opacity: 0.3 }} />

        {/* Section 12 */}
        <Box>
          <Typography
            variant="h6"
            sx={{
              fontSize: { xs: "1.3rem", md: "1.5rem" },
              mb: 3,
              color: "primary.main",
            }}
          >
            12. CHANGES TO THIS POLICY
          </Typography>
          <Typography
            variant="body1"
            sx={{ lineHeight: 1.8, fontSize: "1rem" }}
          >
            We may update this policy when needed. Changes will be posted on
            this page, with revision date above.
          </Typography>
        </Box>

        <Divider sx={{ bgcolor: "primary.main", opacity: 0.3 }} />

        {/* Section 13 */}
        <Box>
          <Typography
            variant="h6"
            sx={{
              fontSize: { xs: "1.3rem", md: "1.5rem" },
              mb: 3,
              color: "primary.main",
            }}
          >
            13. CONTACT US
          </Typography>
          <Typography
            variant="body1"
            sx={{ mb: 2, lineHeight: 1.8, fontSize: "1rem" }}
          >
            For privacy questions, issues, or requests:
          </Typography>
          <List sx={{ pl: 2 }}>
            <ListItem disablePadding>
              <ListItemText
                primary="Email: privacy@unnssry.in"
                primaryTypographyProps={{ fontSize: "1rem", lineHeight: 1.6 }}
              />
            </ListItem>
            <ListItem disablePadding>
              <ListItemText
                primary="Website: [unnssry.in]"
                primaryTypographyProps={{ fontSize: "1rem", lineHeight: 1.6 }}
              />
            </ListItem>
            <ListItem disablePadding>
              <ListItemText
                primary="Location: Mumbai, India"
                primaryTypographyProps={{ fontSize: "1rem", lineHeight: 1.6 }}
              />
            </ListItem>
          </List>
        </Box>

        {/* Footer */}
        <Paper
          elevation={0}
          sx={{
            p: 4,
            border: 2,
            borderColor: "primary.main",
            bgcolor: "primary.main",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontSize: { xs: "1.2rem", md: "1.5rem" },
              color: "background.default",
              mb: 2,
            }}
          >
            WE DON'T JUST SELL FASHION; WE SELL FRICTION
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontSize: { xs: "1rem", md: "1.2rem" },
              color: "text.secondary",
            }}
          >
            UNNECESSARY | unnssry.in
          </Typography>
        </Paper>
      </Stack>
    </Container>
  );
};

export default PrivacyPolicy;
