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

export const API_URL = 'https://app-019a69e1-fff7-4eee-816c-52fcf0097ff0.cleverapps.io'
export const API_URL1 = 'http://localhost:8080';
export const API_KEY = 'f2009b910b271d1f147d2cb091fbe166'

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

