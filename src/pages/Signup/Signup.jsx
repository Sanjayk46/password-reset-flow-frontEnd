import React, { useState } from "react";
import AxiosService from "../../Api/Apiservice";
import { Link } from "react-router-dom";
import { toast ,ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import CircularProgress from "@mui/material/CircularProgress";

// const darkTheme = createTheme({
//   palette: {
//     mode: "dark",
//     primary: {
//       main: "#90caf9",
//     },
//     secondary: {
//       main: "#f48fb1",
//     },
//     error: {
//       main: "#f44336",
//     },
//   },
// });

export default function Signup()  {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required("FirstName Required"),
    lastName: Yup.string().required("LastName Required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email Required"),
    password: Yup.string()
      .required("Password Required")
      .matches(/^(?=.*[a-zA-Z])(?=.*\d).{12,}$/, "Make Strong password"),
  });

  const handleSignup = async (values) => {
    try {
      setLoading(true);
      const response = await AxiosService.post("http://localhost:8000/user/signup", values);
      const { message } = response.data;
      console.log(message);
      toast.success(message, {
        position: 'top-center',
      });
      navigate("/signin");
    } catch (error) {
      console.error(error.response.data);
      const errorMessage =
        error.response.data.message || "Registration failed. Please try again.";
      toast.error(errorMessage, {
        position: 'top-center',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <CssBaseline />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSignup}
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
                color: "black",
              },
            }}
            noValidate
            autoComplete='off'
          >
            <h2 style={{ marginBottom: "20px" }}>Signup</h2>
            <div>
              <Field
                name='firstName'
                type='text'
                as={TextField}
                label='First Name'
                variant='outlined'
                className='required'
              />
              <ErrorMessage
                name='firstName'
                component='div'
                className='required'
              />
            </div>
            <div>
              <Field
                name='lastName'
                type='text'
                as={TextField}
                label='Last Name'
                variant='outlined'
                className='required'
              />
              <ErrorMessage
                name='lastName'
                component='div'
                className='required'
              />
            </div>
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
                className='required'
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
              {loading ? <CircularProgress size={24} /> : "Signup"}
            </Button>
            <p style={{ marginTop: "20px" }}>
              Already have an account? <Link to='/signin'>Signin</Link>
            </p>
            <ToastContainer/>
          </Box>
        </Form>
      </Formik>
   </>
  );
};


