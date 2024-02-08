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
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import * as Yup from "yup";
import { Formik } from "formik";

const schema = Yup.object().shape({
  prodName: Yup.string().required("email is a required field"),
  prodCategory: Yup.string().required("Category is required"),
  prodDescription: Yup.string().required("Description is required"),
  prodPrice: Yup.string().required("Price is required"),
  gender: Yup.string().required("gender is required"),
  prodDiscount: Yup.string().required("Discount is required"),
});
const initialValues = {
  prodName: "",
  prodCategory: "",
  prodDescription: "",
  prodPrice: "",
  gender: "",
  prodDiscount: "",
};

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
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
  const handleSubmit = (values) => {
    console.log(values);
  };

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
                <Formik
                  validationSchema={schema}
                  initialValues={initialValues}
                  onSubmit={(values) => {
                    handleSubmit(values);
                  }}
                >
                  {({
                    values,
                    errors,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    touched,
                    isSubmitting,
                  }) => (
                    <form onSubmit={handleSubmit}>
                      <Box>
                        <FormControl>
                          <TextField
                            id="prodName"
                            name="prodName"
                            error={(errors.prodName && touched.prodName) ? true : false}
                            helperText={
                              (errors.prodName && touched.prodName) ? "product name is required" : ""
                            }
                            label="Name"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.prodName}
                          />
                        </FormControl>
                        <FormControl>
                          <TextField
                            id="prodCategory"
                            name="prodCategory"
                            label="Category"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.prodCategory}
                            error={(errors.prodCategory && touched.prodCategory) ? true : false}
                            helperText={
                              (errors.prodCategory && touched.prodCategory)
                                ? "product category is required"
                                : ""
                            }
                          />
                        </FormControl>
                      </Box>
                      <Box>
                        <FormControl>
                          <TextField
                            id="prodDescription"
                            name="prodDescription"
                            label="Description"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.prodDescription}
                            error={(errors.prodDescription && touched.prodDescription) ? true : false}
                            helperText={
                              (errors.prodDescription && touched.prodDescription)
                                ? "product description is required"
                                : ""
                            }
                          />
                        </FormControl>
                        <FormControl>
                          <TextField
                            id="prodPrice"
                            name="prodPrice"
                            label="price"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.prodPrice}
                            error={(errors.prodPrice && touched.prodPrice) ? true : false}
                            helperText={
                              (errors.prodPrice && touched.prodPrice)
                                ? "product price is required"
                                : ""
                            }
                          />
                        </FormControl>
                      </Box>

                      <Box>
                        <FormControl sx={{ width: 200 }}>
                          <InputLabel id="prodGender">Gender</InputLabel>
                          <Select
                            id="prodGender"
                            label="Gender"
                            name="gender"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.gender}
                            error={(errors.gender && touched.gender) ? true : false}
                            helperText={
                              (errors.gender && touched.gender)
                                ? "gender is required"
                                : ""
                            }
                          >
                            <MenuItem value={10}>Male</MenuItem>
                            <MenuItem value={20}>Female</MenuItem>
                            <MenuItem value={30}>Unisex</MenuItem>
                          </Select>
                        </FormControl>

                        <FormControl>
                          <TextField
                            id="prodDiscount"
                            name="prodDiscount"
                            label="discount"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.prodDiscount}
                            error={(errors.prodDiscount && touched.prodDiscount) ? true : false}
                            helperText={
                              (errors.prodDiscount && touched.prodDiscount)
                                ? "product discount is required"
                                : ""
                            }
                          />
                        </FormControl>
                      </Box>

                      <Box sx={{ p: 6 }}>
                        <Button
                          disabled={isSubmitting}
                          color="success"
                          variant="contained"
                          type="submit"
                        >
                          Add Product
                        </Button>
                      </Box>
                    </form>
                  )}
                </Formik>
              </Box>
            </Item>
          </Grid>
          <Grid item xs={4}>
            <Item>
              <Box sx={{ p: 8, height: 370 }}>
                <img
                  src="https://iconicentertainment.in/wp-content/uploads/2013/11/dummy-image-square.jpg"
                  alt=""
                  height={200}
                  width={200}
                />
                <Button
                  sx={{ mt: 2 }}
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
