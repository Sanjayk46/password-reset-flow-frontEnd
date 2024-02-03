
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Formik, Field, Form, ErrorMessage } from "formik";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import CircularProgress from "@mui/material/CircularProgress";
import 'react-toastify/dist/ReactToastify.css';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from 'yup';
import AxiosService from '../Api/Apiservice';

export default function Signin(){
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);


  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email Required"),
    password: Yup.string()
      .required("Password Required")
      .matches(/^(?=.*[a-zA-Z])(?=.*\d).{12,}$/, "Make Strong password"),
  });

  // const handleSignin = async (values) => {
  //   try {
  //     setLoading(true);
  //     const response = await AxiosService.post("http://localhost:8000/user/signin", values);
  //     console.log(response.data);

  //     const { message, token, userData } = response.data;

  //     if (message) {
  //       // toast.success(message, {
  //       //   position: toast.POSITION.TOP_CENTER,
  //       // });
  //       toast.success(message, {
  //         position: toast.POSITION.TOP_CENTER,
  //       });
  //       sessionStorage.setItem("token", token);
  //       sessionStorage.setItem("userData", JSON.stringify(userData));
  //       navigate("/home");
  //     }
  //   } catch (error) {
  //     console.error(error.response.data);

  //     if (error.response) {
  //       if (error.response.status === 401) {
  //         toast.error(error.response.data.message, {
  //           position: toast.POSITION.TOP_CENTER,
  //         });
  //       } else if (error.response.status === 404) {
  //         toast.error(error.response.data.message,{
  //           position: toast.POSITION.TOP_CENTER,
  //         });
  //       } else {
  //         toast.error("Failed to sign in. Please try again.", {
  //           position: toast.POSITION.TOP_CENTER,
  //         });
  //       }
  //     }
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const handleSignin = async (values) => {
    try {
      setLoading(true);
      const response = await AxiosService.post("https://password-reset-y8xp.onrender.com/user/signin", values);
  
      if (response && response.data) {
        const { message, token, userData } = response.data;
  
        if (message) {
          toast.success(message, {
            position: 'top-center',
          });
          sessionStorage.setItem("token", token);
          sessionStorage.setItem("userData", JSON.stringify(userData));
          navigate("/");
        }
      } else {
        // Handle the case where the response or its data is undefined
        console.error("Invalid response format:", response);
      }
    } catch (error) {
      console.error(error.response?.data);
  
      if (error.response) {
        if (error.response.status === 401) {
          toast.error(error.response.data.message, {
            position: 'top-center',
          });
        } else if (error.response.status === 404) {
          toast.error(error.response.data.message, {
            position: 'top-center',
          });
        } else {
          toast.error("Failed to sign in. Please try again.", {
            position: 'top-center',
          });
        }
      }
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <>
      <CssBaseline />
      <Formik
        initialValues={initialValues}
        onSubmit={handleSignin}
        validationSchema={validationSchema}
      >
        <Form>
          <Box
            component='div'
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100vh",
              "& .MuiTextField-root": {
                m: 1,
                width: "25ch",
                marginBottom: "20px",
              },
              "& .required": {
                color: 'red',
              },
            }}
            noValidate
            autoComplete='off'
          >
            <h2 style={{ marginBottom: "20px" }}>Signin</h2>
            <div>
              <Field
                name='email'
                type='text'
                as={TextField}
                label='Email'
                variant='outlined'
                className='required'
              />
              <ErrorMessage name='email' component='div' className='required' />
            </div>
            <div>
              <Field
                name='password'
                type={showPassword ? "text" : "password"}
                as={TextField}
                label='Password'
                variant='outlined'
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge='end'
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                className='required'
              />
              <ErrorMessage
                name='password'
                component='div'
                className='required'
              />
            </div>
            <Button
              color='primary'
              variant='contained'
              type='submit'
              style={{ marginTop: "20px" }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Signin"}
            </Button>
            <p style={{ marginTop: "20px" }}>
              <Link to='/forgot-password'>Forgot Password?</Link>
            </p>
            <p>
              Don't have an account? <Link to='/signup'>Signup</Link>
            </p>
          </Box>
          <ToastContainer/>
        </Form>
      </Formik>
    </>
  );
};

// San@804512311
// sanjayks291199@gmail.com
