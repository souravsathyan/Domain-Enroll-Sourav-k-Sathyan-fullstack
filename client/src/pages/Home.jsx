import Shimmer from "../components/Skeleton";
import Container from "@mui/material/Container";
import useProductList from "../Utils/Hooks/useProductList";
import MediaCard from "../components/Card";
import Snackbar from '@mui/material/Snackbar';
import { useState } from "react";

const Home = () => {
  const [products, setProducts] = useState([]);
  useProductList(0, "", setProducts);
  const [open, setOpen] = useState(false);


  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  if (products.length === 0) {
    return <Shimmer />;
  }
  return (
    <>
    <Container
      sx={{
        position: "relative",
        top: "200px",
        px: 10,
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
      }}
    >
      {/* Card component */}
      {products.products.map((el) => (
        <MediaCard key={el._id} product={el} handleClick={handleClick}/>
      ))}
    </Container>
    <Snackbar
        open={open}
        autoHideDuration={5000}
        anchorOrigin={{ vertical:'top',horizontal: 'center'}}
        onClose={handleClose}
        message="Product added to the cart successfully"
      />
    </>
  );
};

export default Home;
