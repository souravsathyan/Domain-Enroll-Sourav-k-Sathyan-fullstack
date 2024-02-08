
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';



const  Shimmer = ()=> {
  return (
    <Grid container wrap="nowrap">
      {(Array.from(new Array(3))).map((item, index) => (
        <Box key={index} sx={{ width: 210, marginRight: 0.5, my: 5 }}>
          { (
            <Skeleton variant="rectangular" width={210} height={118} />
          )}
          {(
            <Box sx={{ pt: 0.5 }}>
              <Skeleton />
              <Skeleton width="60%" />
            </Box>
          )}
        </Box>
      ))}
    </Grid>
  );
}

export default Shimmer
