import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home"
import Products from "./pages/Products"
import Layout from './components/Layout.jsx';
import AddProduct from './pages/AddProduct.jsx';
import Error from './pages/Error.jsx';
import {Provider} from "react-redux"
import appStore from './Utils/store/appStore.js';
import Cart from './pages/Cart.jsx';


const appRouter = createBrowserRouter([
  {
    path:"/",
    element:<Layout/>,
    children: [
      {
        path:'/',
        element:<Home/>
      },
      {
        path:"/products",
        element:<Products/>
      },
      {
        path:"/addProducts",
        element:<AddProduct/>
      },
      {
        path:"/cart",
        element:<Cart/>
      }
    ],
    errorElement:<Error/>
  },
  
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={appStore}>
    <RouterProvider router={appRouter} />
    </Provider>
  </React.StrictMode>,
)
