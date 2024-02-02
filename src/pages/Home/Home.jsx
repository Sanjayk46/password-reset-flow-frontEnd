import React from "react";
import {useNavigate} from'react-router-dom';
import {Button,Box,Container} from "@mui/material";
import {ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Home(){
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    const navigate = useNavigate();

    const handleSignin=()=>{
        navigate("/signin")
    }
    const handleLogout = () => {
      sessionStorage.removeItem("userData");
      navigate("/signin");
      toast.success("Logout successful", {
        position: "toast.POSITION.TOP_CENTER",
      });
    };
    return(
    <Container maxWidth='sm'>
    <Box 
    sx={{
      my: 4,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      padding: "20px",
      margin: "0 ",
      boxSizing: "border-box",
      textAlign: "center",
      overflowY: "hidden",
    }}
    >

    <h1>welcome to our website </h1>
    {userData ?(
      <>
      <h1>Welcome,{userData?.firstName} ! </h1>
      <h1>we are happy to see you again. please use our website properly!!! </h1>
      <Button
              color='primary'
              variant='contained'
              type='submit'
              style={{ marginTop: "20px" }}
              onClick={handleLogout}
            >Logout
            </Button>
      </>
    ):(
      <>
       <h1>Dear User, To access our website, please sign in properply</h1>
       <Button
              color='primary'
              variant='contained'
              type='submit'
              style={{ marginTop: "20px" }}
              onClick={handleSignin}
            >Signin
            </Button>
      </>
      
    )}
    <ToastContainer/>
     </Box>
     {/* <ToastContainer/> */}
     </Container>  
    );
} 