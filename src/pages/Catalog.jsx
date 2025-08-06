import { useParams } from "react-router-dom";
import { Grid, Typography, Box } from "@mui/material";
import { products } from "../assets/data";

const Catalog = () => {
  const { slug } = useParams();

  return (
    <Box overflow="hidden" width="100%" minHeight="100vh" bgcolor="#ebe9e3">
      <Typography
        variant="h4"
        fontWeight={700}
        textTransform="uppercase"
        mt={12}
        ml={4}
      >
        {slug} Collection
      </Typography>

      <Grid container borderTop={1}>
        {products.length > 0 ? (
          [...products, ...products.reverse(), ...products.reverse()].map(
            (product) => (
              <Grid
                borderRight={1}
                size={{
                  xs: 12,
                  sm: 6,
                  md: 3,
                }}
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                key={product.id}
              >
                <Box overflow="hidden">
                  <Box
                    component="img"
                    src={product.image}
                    alt={product.name}
                    onClick={() => {
                      window.location.href = `/shop/${product.slug}/${product.name}`;
                    }}
                    sx={{
                      maxHeight: 400,
                      objectFit: "contain",
                      transition: "transform 0.3s ease",
                      cursor: "pointer",
                      transform: "scale(1.05)",
                      "&:hover": {
                        transform: "scale(1.1)",
                      },
                    }}
                  />
                </Box>
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="start"
                  width="100%"
                  py={2}
                  pl={4}
                  borderTop={1}
                  borderBottom={1}
                >
                  <Typography fontWeight={600}>{product.name}</Typography>
                  <Typography>{product.price}</Typography>
                </Box>
              </Grid>
            )
          )
        ) : (
          <Grid size={12}>
            <Typography>No products found in "{slug}"</Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default Catalog;
