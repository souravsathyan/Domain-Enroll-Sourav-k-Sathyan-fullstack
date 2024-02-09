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
import * as Yup from "yup";
import { Formik } from "formik";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useState } from "react";
import axios from "axios";
import {
  DUMMY_PRODUCT_iMAGE,
  SERVER_API,
  UPLOAD_API,
  UPLOAD_PRESET,
} from "../Utils/constants";
import { InfinitySpin } from "react-loader-spinner";
import AlertComponent from "../components/Alert";

// import useImageUpload from "../Utils/Hooks/useImageUpload";

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
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(null);

  const handleOnChange = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedImage(null);
    }
  };

  const handleSubmit = async (values) => {
    setIsLoading(true);
    // uploading to cloudinary
    const data = new FormData();
    data.append("file", selectedImage);
    data.append("upload_preset", UPLOAD_PRESET);
    try {
      let api = UPLOAD_API;
      const cloudRes = await axios.post(api, data);
      const { secure_url } = cloudRes.data;
      const updatedValues = { ...values, prodImage: secure_url };

      const res = await axios.post(SERVER_API + "/add", updatedValues);
      setIsLoading(false);
      setIsSuccess(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1, m: 2, p: 2, position: "relative", top: 100 }}>
        {isSuccess && <AlertComponent setIsSuccess={setIsSuccess} />}
        <Grid container spacing={2}>
          <Grid item xs={12} xl={8}>
            <Item sx={{ p: 8, height: 370 }}>
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
                            error={
                              errors.prodName && touched.prodName ? true : false
                            }
                            helperText={
                              errors.prodName && touched.prodName
                                ? "product name is required"
                                : ""
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
                            error={
                              errors.prodCategory && touched.prodCategory
                                ? true
                                : false
                            }
                            helperText={
                              errors.prodCategory && touched.prodCategory
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
                            error={
                              errors.prodDescription && touched.prodDescription
                                ? true
                                : false
                            }
                            helperText={
                              errors.prodDescription && touched.prodDescription
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
                            error={
                              errors.prodPrice && touched.prodPrice
                                ? true
                                : false
                            }
                            helperText={
                              errors.prodPrice && touched.prodPrice
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
                            error={
                              errors.gender && touched.gender ? true : false
                            }
                            helperText={
                              errors.gender && touched.gender
                                ? "gender is required"
                                : ""
                            }
                          >
                            <MenuItem value={"male"}>Male</MenuItem>
                            <MenuItem value={"female"}>Female</MenuItem>
                            <MenuItem value={"unisex"}>Unisex</MenuItem>
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
                            error={
                              errors.prodDiscount && touched.prodDiscount
                                ? true
                                : false
                            }
                            helperText={
                              errors.prodDiscount && touched.prodDiscount
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
                        <Button
                          sx={{ ml: 2 }}
                          component="label"
                          variant="contained"
                          startIcon={<CloudUploadIcon />}
                        >
                          Upload file
                          <VisuallyHiddenInput
                            type="file"
                            name="prodImage"
                            id="prodImage"
                            onChange={(e) => handleOnChange(e.target.files[0])}
                          />
                        </Button>
                      </Box>
                    </form>
                  )}
                </Formik>
              </Box>
            </Item>
          </Grid>
          <Grid item xs={12} xl={4} sx={{}}>
            <Item>
              <Box
                display="flex"
                height={{ xs: 500, xl: 370 }}
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                sx={{ p: 8 }}
              >
                {isLoading ? (
                  <InfinitySpin
                    visible={true}
                    width="200"
                    color="#4fa94d"
                    ariaLabel="infinity-spin-loading"
                  />
                ) : (
                  <>
                    <Box>
                      <Typography sx={{ fontSize: "h6.fontSize", mb: 4 }}>
                        Image Preview
                      </Typography>
                    </Box>
                    <Box>
                      <img
                        src={
                          selectedImage ? selectedImage : DUMMY_PRODUCT_iMAGE
                        }
                        alt="product image coming soon"
                        style={{
                          objectFit: "cover",
                          maxHeight: "300px",
                          maxWidth: "300px",
                        }}
                      />
                    </Box>
                  </>
                )}
              </Box>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default AddProduct;
