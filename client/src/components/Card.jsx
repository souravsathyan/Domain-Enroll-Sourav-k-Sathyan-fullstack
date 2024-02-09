import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {useDispatch} from "react-redux"
import {addToCart} from '../Utils/store/slice/cartSlice'


const MediaCard = ({ product , handleClick}) => {
  const dispatch = useDispatch()
  const handleProductClick=(product)=>{
    console.log(product)
    dispatch(addToCart(product))
    handleClick()
  }
  
  return (
    <Card sx={{ maxWidth: 345, height: 300, width: 300, mt:4, mb:4, p:4}}>
      <CardMedia
        sx={{ height: 200, width: 300, objectFit: "cover" }}
        image={product?.image}
        title={product?.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product?.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product?.description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
        ₹{product?.price}
        </Typography>
        <Typography variant="button" sx={{cursor:'pointer'}}  color="initial" onClick={() => handleProductClick(product)}>
          Add to Cart <i className="fa-solid fa-cart-shopping"></i>
        </Typography>
      </CardContent>
    </Card>
  );
};
export default MediaCard;
