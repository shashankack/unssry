import { Button, Typography, Stack, Grid, TextField } from "@mui/material";

import MarqueeText from "./MarqueeText";

import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";

const Footer = () => {
  const footerLinks = [
    {
      title: "01/ Unnssry",
      links: [
        { label: "about unnssry", redirect: "/#" },
        { label: "contact us", redirect: "/#" },
        { label: "become a dealer", redirect: "/#" },
        { label: "shop", redirect: "/#" },
      ],
    },
    {
      title: "02/ CUSTOMER SERVICE",
      links: [
        { label: "faq", redirect: "/#" },
        { label: "RETURN", redirect: "/#" },
        { label: "delivery", redirect: "/#" },
        { label: "size guide", redirect: "/#" },
        { label: "my account", redirect: "/#" },
        { label: "cookie policy", redirect: "/#" },
        { label: "privacy policy", redirect: "/#" },
        { label: "terms of trade", redirect: "/#" },
      ],
    },
    {
      title: "03/ popular now",
      links: [
        { label: "fleece", redirect: "/#" },
        { label: "outdoor", redirect: "/#" },
        { label: "essentials", redirect: "/#" },
        { label: "unnssry x baw", redirect: "/#" },
      ],
    },
  ];

  return (
    <>
      <MarqueeText />
      <Grid
        container
        height={300}
        width="100%"
        bgcolor="#ebe9e3"
        overflow="hidden"
        borderBottom={1}
      >
        <Grid
          size={3.2}
          height="100%"
          borderRight={1}
          display="flex"
          flexDirection="column"
          justifyContent="start"
          alignItems="start"
          p={4}
          gap={4}
        >
          <Typography
            fontSize="2.4em"
            textTransform="uppercase"
            fontWeight={900}
          >
            unnssry
          </Typography>
          <Typography
            fontSize=".8em"
            textTransform="uppercase"
            fontWeight={500}
          >
            @Baw Studio <br />
            25/26 BMT COMPLEX 560025 <br />
            BANGALORE, INDIA
          </Typography>

          <Stack gap={1}>
            <Typography
              fontSize=".8em"
              textTransform="uppercase"
              fontWeight={500}
            >
              follow us
            </Typography>
            <Stack direction="row">
              <InstagramIcon
                fontSize="large"
                sx={{
                  marginRight: 2,
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.1)",
                    color: "#fc6406",
                  },
                }}
              />
              <FacebookIcon
                fontSize="large"
                sx={{
                  marginRight: 2,
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.1)",
                    color: "#fc6406",
                  },
                }}
              />
            </Stack>
          </Stack>
        </Grid>

        {footerLinks.map((data, index) => (
          <Grid key={index} height="100%" borderRight={1} p={4} flex={1}>
            <Typography
              textTransform="uppercase"
              mb={2}
              fontSize=".7vw"
              fontWeight={600}
            >
              {data.title}
            </Typography>
            <Stack>
              {data.links.map((link, idx) => (
                <Typography
                  key={idx}
                  fontSize=".8em"
                  textTransform="uppercase"
                  fontWeight={500}
                  sx={{
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      color: "#fc6406",
                    },
                  }}
                  onClick={() => (window.location.href = link.redirect)}
                >
                  {link.label}
                </Typography>
              ))}
            </Stack>
          </Grid>
        ))}

        <Grid
          height="100%"
          size={2.5}
          p={4}
          display="flex"
          flexDirection="column"
          justifyContent="start"
          alignItems="start"
        >
          <Typography fontWeight={900} mb={2} fontSize="1vw">
            REACH OUT SAVE 10% ON <br /> EVERYTHING NEW
          </Typography>
          <TextField
            label="Email"
            variant="outlined"
            margin="normal"
            fullWidth
            sx={{
              "& label.Mui-focused": {
                color: "#fc6406",
              },
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "#fc6406",
                },
              },
              "& input": {
                color: "#fc6406",
              },
            }}
          />

          <Button
            variant="contained"
            sx={{
              mt: 1,
              backgroundColor: "#fc6406",
              borderRadius: 6,
              color: "#fff",
              textTransform: "uppercase",
              fontWeight: 600,
              "&:hover": {
                backgroundColor: "#e55b00",
              },
            }}
          >
            submit
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default Footer;
