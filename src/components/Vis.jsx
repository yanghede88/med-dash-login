// test if token is taken
// import { request } from '@/utils'
// import { useEffect } from 'react'

// const Layout=() =>{
//     useEffect(()=>{
//         request.get('/user/profile')
//     },[])
//     return <div>this is layout</div>
// }

// export default Layout

import { Layout, Menu, Popconfirm } from "antd";
import { BrowserRouter as Router, Link, Routes, Route } from "react-router-dom";
import {
  HomeOutlined,
  DiffOutlined,
  EditOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

import { Outlet } from "react-router-dom";
// import Main1 from "./Main.jsx";

import React from 'react';

function Vis() {
    return (
        <div>
            <h1>Visualization Page</h1>
            {/* Add your visualization components or content here */}
        </div>
    );
}

export default Vis;

