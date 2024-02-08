import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home"
import Products from "./pages/Products"
import Layout from './components/Layout.jsx';
import AddProduct from './pages/AddProduct.jsx';
import Error from './pages/Error.jsx';

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
      }
    ],
    errorElement:<Error/>
  },
  
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={appRouter} />
  </React.StrictMode>,
)
