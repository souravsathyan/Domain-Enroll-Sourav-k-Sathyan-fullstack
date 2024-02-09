import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useSelector, useDispatch } from "react-redux";
import {
  clearCart,
  addToCart,
  reduceCount,
  removeCartItem,
} from "../Utils/store/slice/cartSlice";
import DeleteIcon from "@mui/icons-material/Delete";

const Cart = () => {
  const dispatch = useDispatch();
  const cartSelector = useSelector((store) => store.cart);

  const handleIncreaseCount = (product) => {
    dispatch(addToCart(product));
  };

  const handleDecreaseCount = (product) => {
    dispatch(reduceCount(product));
  };

  const handleRemoveCartItem = (product) => {
    dispatch(removeCartItem(product));
  };

  const handleClearCart = ()=>{
    dispatch(clearCart())
  }

  if(cartSelector.length===0){
    return (
      <Container
      sx={{
        position: "relative",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        top: 100,
      }}
      maxWidth="xl"
    >
      <Typography sx={{ p: 2 }} variant="h3" color="initial">
        Cart is Empty.
      </Typography>
    </Container>
    )
  }

  return (
    <Container
      sx={{
        position: "relative",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        top: 100,
      }}
      maxWidth="xl"
    >
      <Typography sx={{ p: 2 }} variant="h3" color="initial">
        Cart
      </Typography>
      <Box sx={{ width: "100%" }}>
        <Box   sx={{ display: 'flex', justifyContent: 'flex-end',p:2 }}>
        <Button
          variant="outlined"
          startIcon={<DeleteIcon />}
          onClick={() => handleClearCart()}
        >
          Delete
        </Button>
        </Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Image</TableCell>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Price</TableCell>
                <TableCell align="center">Count</TableCell>
                <TableCell align="center">Qty</TableCell>
                <TableCell align="center">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cartSelector.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" align="center" scope="row">
                    <div>
                      <img
                        src={row.image}
                        alt=""
                        style={{ width: 100, height: 100 }}
                      />
                    </div>
                  </TableCell>
                  <TableCell align="center">{row.name}</TableCell>
                  <TableCell align="center">{row.price}</TableCell>
                  <TableCell align="center">{row.count}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="container"
                      color="primary"
                      onClick={() => handleDecreaseCount(row)}
                    >
                      -
                    </Button>
                    {row.count}
                    <Button
                      variant="container"
                      color="primary"
                      onClick={() => handleIncreaseCount(row)}
                    >
                      +
                    </Button>
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      startIcon={<DeleteIcon />}
                      onClick={() => handleRemoveCartItem(row)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default Cart;
