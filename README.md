# S-cart E-commerce web application
- An ecommerce application with product crud operations and cart feature
- One can seamlessly create product as well as add the product to cart with the redux store management changes in the cart is quickly reflected in the ui

## technology used
### frontend
- React + Vite
- Redux toolkit and react-redux for state management
- Material ui for responsive design
- Cloudinary for Image upload
- React router dom for easier navigation
- Formik and Yup
### Backend
- MongoDb for database
- Node and Express for server side

### Scripts
- FrontEnd
 - "dev": "vite",
 - "build": "vite build",
 - "lint": "eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0",
 - "preview": "vite preview"
- Backend
 - "start": "nodemon ./src/server.js"

## Routes Used
 - router.route('/').get(getAllProducts);
    - for getting all products

 - router.route('/add').post(addProduct);
    - for creating product

 - router.route('/getProduct').get(getProduct);
    - for getting a product based on id

 - router.route('/editProduct/:id').put(updateProduct);
    - for pdating the product

 - router.route('/delete/:id').delete(deleteProduct);
    - for deleting the product

## Response structure
 - ```{
    error:false,
    data:{
        info:{},
        message:{}
    }
 }```
