import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Container from "@mui/material/Container";

const Shimmer = () => {
  return (
    <Container
      maxWidth="xl"
      sx={{ position: "relative", top:'200px',px:10 }}
    >
      <Grid container wrap="nowrap" >
        {Array.from(new Array(3)).map((item, index) => (
          <Box key={index} sx={{ width: 400, marginRight: 2, my: 5,px:2 }}>
            {<Skeleton variant="rectangular" width={400} height={118} />}
            {
              <Box sx={{ pt: 0.5 }}>
                <Skeleton />
                <Skeleton width="60%" />
              </Box>
            }
          </Box>
        ))}
      </Grid>
    </Container>
  );
};

export default Shimmer;
