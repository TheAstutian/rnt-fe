import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Route
} from "react-router-dom";


import Login from './pages/Login';
import Write from './pages/Write';
import Home from './pages/Home';
import Single from './pages/Single';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Register from "./pages/Register"; 
import './style.scss';

export const API_URL = 'https://rnt-api.onrender.com'

const Layout =()=>{
  return (
    <>
    <Navbar/>
    <Outlet/>
    <Footer/>
    </>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children:[
      {
        path:'/',
        element:<Home/>
      },
      {
        path:'/write',
        element:<Write/>
      },
      {
        path:'/post/:id',
        element:<Single/>
      }
    ]
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);


function App() {

  return (
        <div className="app">
          <div className="container">
            <RouterProvider router={router} />
          </div>
        </div>
  ) 
    
}

export default App;

