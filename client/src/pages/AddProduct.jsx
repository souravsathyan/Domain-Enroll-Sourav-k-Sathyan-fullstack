import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { FormControl } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const AddProduct = () => {
  return (
    <div>
      <Box sx={{ flexGrow: 1, m: 2, p: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Item>
              <Typography sx={{ fontSize: "h6.fontSize", mb: 4 }}>
                Add Product
              </Typography>
              <Box
                sx={{
                  "& .MuiTextField-root": { m: 1, width: "25ch" },
                }}
                noValidate
                autoComplete="off"
              >
                <form>
                  <Box>
                    <FormControl>
                      <TextField id="prodName" label="prodName" />
                    </FormControl>
                    <FormControl>
                      <TextField id="prodCategory" label="Category" />
                    </FormControl>
                  </Box>
                  <Box>
                    <FormControl>
                      <TextField id="prodDesc" label="Description" />
                    </FormControl>
                    <FormControl>
                      <TextField id="prodPrice" label="price" />
                    </FormControl>
                  </Box>

                  <Box>
                    <FormControl sx={{ width: 200 }}>
                      <InputLabel id="demo-simple-select-label">Age</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={""}
                        label="Age"
                      >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                      </Select>
                    </FormControl>

                    <FormControl>
                      <TextField id="prodDiscount" label="discount" />
                    </FormControl>
                  </Box>

                  <Box sx={{ p: 6 }}>
                    <Button color="success" variant="contained" type="submit">
                      Add Product
                    </Button>
                  </Box>
                </form>
              </Box>
            </Item>
          </Grid>
          <Grid item xs={4}>
            <Item>
              <Box sx={{ p: 8, height:280}}>
                <img
                  src="https://iconicentertainment.in/wp-content/uploads/2013/11/dummy-image-square.jpg"
                  alt=""
                  height={200}
                  width={200}
                />
                <Button
                sx={{mt:2}}
                  component="label"
                  variant="contained"
                  startIcon={<CloudUploadIcon />}
                >
                  Upload file
                  <VisuallyHiddenInput type="file" />
                </Button>
              </Box>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default AddProduct;
