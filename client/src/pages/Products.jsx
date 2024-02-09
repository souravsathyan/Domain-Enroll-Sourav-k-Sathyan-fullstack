import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
} from "@mui/material";
import { useState } from "react";
import useProductList from "../Utils/Hooks/useProductList";
// import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector, useDispatch } from "react-redux";
import { updateProduct, clearProduct } from "../Utils/store/slice/productSlice";
import { styled } from "@mui/material/styles";
import DialogContentText from '@mui/material/DialogContentText';
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Shimmer from "../components/Skeleton";
import { SERVER_API } from "../Utils/constants";
import axios from "axios";

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

const Products = () => {
  const [rows, rowchange] = useState([]);
  const [page, pagechange] = useState(0);
  const [rowperpage, rowperpagechange] = useState(5);
  const [openAlert, setOpenAlert] = useState(false);
  const [open, openchange] = useState(false);
  const dispatch = useDispatch();
  const prodSelecor = useSelector((store) => store.product);
  useProductList(page, rowperpage, rowchange, rows);


  const columns = [
    { id: "image", name: "Image" },
    { id: "name", name: "Name" },
    { id: "category", name: "Category" },
    { id: "price", name: "Price" },
    { id: "gender", name: "Gender" },
    { id: "actions", name: "Actions" },
  ];

  const handlechangepage = (event, newpage) => {
    if (newpage < page) {
      pagechange(newpage - 1);
    } else if (newpage == 0) {
      pagechange(0);
    } else {
      pagechange(newpage + 1);
    }
    rowchange(newpage + 1);
  };
  const handleRowsPerPage = (event) => {
    rowperpagechange(+event.target.value);
    pagechange(0);
  };

//--------- deleting the product Calling api-------
  const handleDelete = async (row) => {
    try {
      const url = `${SERVER_API}/delete/${row._id}`;
      const response = await axios.delete(url);
      if (!response.data.data.error) {
        const updatedList = rows.products.filter(
          (prod) => prod._id !== row._id
        );
        rowchange(updatedList);
        setOpenAlert(false);
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  // ---------------------------------------

  // for alerts and modals-------------
  const handleClickOpen = () => {
    setOpenAlert(true);
  };

  const handleClose = () => {
    setOpenAlert(false);
  };

  const handleOnChange = (file) => {
    console.log(file);
  };

  const handleClick = (prod) => {
    dispatch(updateProduct(prod));
    functionopenpopup();
  };

  const functionopenpopup = () => {
    openchange(true);
  };

  const closepopup = () => {
    dispatch(clearProduct());
    openchange(false);
  };
// -------------------------------------
  if (rows.length === 0) {
    return <Shimmer />;
  }
  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Products List</h1>

      <Paper sx={{ width: "90%", marginLeft: "5%" }}>
        <TableContainer sx={{ maxHeight: 450 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    style={{ backgroundColor: "black", color: "white" }}
                    key={column.id}
                  >
                    {column.name}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.products &&
                rows.products.map((row) => {
                  return (
                    <TableRow key={row._id}>
                      {columns.map((column) =>
                        column.id !== "image" ? (
                          <TableCell key={column.id}>
                            {column.id === "actions" ? (
                              <div>
                                <Button
                                  sx={{ mr: 2 }}
                                  variant="contained"
                                  color="info"
                                  onClick={() => handleClick(row)}
                                >
                                  Edit
                                </Button>
                                <Button
                                  variant="outlined"
                                  color="error"
                                  onClick={handleClickOpen}
                                >
                                 Delete
                                </Button>
                                <Dialog
                                  open={openAlert}
                                  onClose={handleClose}
                                  aria-labelledby="alert-dialog-title"
                                  aria-describedby="alert-dialog-description"
                                >
                                  <DialogTitle id="alert-dialog-title">
                                    {"Delete product?"}
                                  </DialogTitle>
                                  <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                      You are going to delete the product.
                                    </DialogContentText>
                                  </DialogContent>
                                  <DialogActions>
                                    <Button onClick={handleClose}>
                                      Disagree
                                    </Button>
                                    <Button onClick={()=>handleDelete(row)} autoFocus>
                                      Agree
                                    </Button>
                                  </DialogActions>
                                </Dialog>
                              </div>
                            ) : (
                              row[column.id]
                            )}
                          </TableCell>
                        ) : (
                          <TableCell key={column.id}>
                            <img
                              src={row[column.id]}
                              style={{ width: "50px", height: "50px" }}
                            />
                          </TableCell>
                        )
                      )}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          rowsPerPage={rowperpage}
          page={page}
          count={rows.totalProducts}
          component="div"
          onPageChange={handlechangepage}
          onRowsPerPageChange={handleRowsPerPage}
        />
      </Paper>

      <Dialog
        // fullScreen
        open={open}
        onClose={closepopup}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          Update Product
          <IconButton onClick={closepopup} style={{ float: "right" }}>
            <CloseIcon color="primary"></CloseIcon>
          </IconButton>{" "}
        </DialogTitle>
        <DialogContent>
          {/* <DialogContentText>Do you want remove this user?</DialogContentText> */}
          <Stack spacing={2} margin={2}>
            <Box sx={{ p: 2 }}>
              <img
                style={{ width: "100px", height: "100px" }}
                src={prodSelecor?.product?.image || ""}
                alt=""
              />
            </Box>

            <form style={{ padding: "10px" }}>
              <TextField
                variant="outlined"
                label="Product name"
                value={prodSelecor?.product?.name}
              ></TextField>
              <TextField variant="outlined" label="Category"></TextField>
              <TextField variant="outlined" label="Price"></TextField>
              <TextField variant="outlined" label="gender"></TextField>

              <Box sx={{ p: 2 }}>
                <Button color="primary" variant="contained">
                  Submit
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
          </Stack>
        </DialogContent>
        <DialogActions>
          {/* <Button color="success" variant="contained">Yes</Button>
                    <Button onClick={closepopup} color="error" variant="contained">Close</Button> */}
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default Products;
