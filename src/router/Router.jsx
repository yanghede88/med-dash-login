import Layout from "@/pages/Layout/SiteLayout"; // src/pages/layout
import Login from "@/pages/Login/LoginSystem";
import {createBrowserRouter} from "react-router-dom";
import {AuthRoute} from '@/components/AuthRoute'
import Home from "@/pages/Home/HomePage";
import Visualization from "@/components/Visualization";
import HealthHabit from '@/components/HealthHabit';
import DiaryEntries from "@/pages/Diary/DiaryEntries.jsx";

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
                path:'diary',
                element: <DiaryEntries/>
            },
            {   
                path:'healthTracker',
                element: <HealthHabit/>
            },
            {
                path:'healthAnalysis',
                element: <Visualization />
            }
        ]
    },
    {
        path: "/login",
        element: <Login/>
    },
  ]);

  export default router