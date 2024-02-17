import Layout from "@/pages/Layout"; // src/pages/layout
import Login from "@/pages/Login";
import {createBrowserRouter} from "react-router-dom";
import {AuthRoute} from '@/components/AuthRoute'
// import Home from "@/pages/Home";
import Article from "@/pages/Article";
import Publish from "@/pages/Publish";
import Visualization from "@/components/Visualization";
// import Vis from '@/components/Vis.jsx"'
const Home = () => {
    return <div>hello world</div>
  }
  

const router = createBrowserRouter([
    {
        path: "/",
        element: <AuthRoute> <Layout/> </AuthRoute>,
        children:[
            {   
                path:'home',
                element: <Home/>
            },
            {
                path:'article',
                element: <Article/>
            },
            {
                path:'publish',
                element: <Publish/>
            },
            {
                path:'visualization',
                element: <Visualization />
            }
            // {
            //     path:'Vis',
            //     element: <Vis/>
            // },
        ]
    },
    {
        path: "/login",
        element: <Login/>
    },
  ]);

  export default router