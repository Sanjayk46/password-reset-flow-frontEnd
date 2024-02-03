import React from "react";
import{Navigate, Route,Routes} from 'react-router-dom';
import Home from '../pages/Home';
import Signin from '../pages/Signin';
import Signup from '../pages/Signup';
import Forgotpassword from '../pages/Forgotpassword';
import Resetpassword from '../pages/Resetpassword';

export default function AppRouters(){
    return(
        <>
        <Routes>
            <Route path="/*" element={<Navigate to={"/*"}/>}></Route>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/signup" element={<Signup/>}></Route>
            <Route path="/signin" element={<Signin/>}></Route>
            <Route path="/forgot-password" element={<Forgotpassword/>}></Route>
            <Route path="/reset-password" element={<Resetpassword/>}></Route>
        </Routes>
        </>
    )
}