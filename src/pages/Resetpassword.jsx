
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import CssBaseline from "@mui/material/CssBaseline";
import 'react-toastify/dist/ReactToastify.css';
import AxiosService from '../Api/Apiservice';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from 'yup';

export default function ResetPassword (){
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    OTP: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object({
    OTP: Yup.string().required("OTP Required"),
    password: Yup.string()
      .required("Password Required")
      .matches(/^(?=.*[a-zA-Z])(?=.*\d).{12,}$/, "Make Strong password"),
    confirmPassword: Yup.string()
      .required("ConfirmPassword Required")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleResetPassword = async (values) => {
    try {
      setLoading(true);

      if (values.password !== values.confirmPassword) {
        console.error("Passwords do not match");
        toast.error("Passwords do not match", {
          position: 'top-center',
        });
        return;
      }

      const response = await AxiosService.post("https://password-reset-y8xp.onrender.com/user/reset-password", values);
      console.log(response.data);

      if (response.data.message) {
        toast.success(response.data.message, {
          position: 'top-center',
        });
      }

      navigate("/signin");
    } catch (error) {
      console.error(error.response.data);

      if (error.response.data.message) {
        toast.error(error.response.data.message, {
          position: 'top-center',
        });
      } else {
        toast.error("Failed to reset password. Please try again.", {
          position: 'top-center',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <CssBaseline />
      <Formik
        initialValues={formData}
        onSubmit={handleResetPassword}
        validationSchema={validationSchema}
      >
        {() => (
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
                  color: "#f44336",
                },
              }}
              noValidate
              autoComplete='off'
            >
              <h2 style={{ marginBottom: "20px" }}>Reset Password</h2>
              <p>Enter the OTP and set a new password.</p>
              <div>
                <Field
                  name='OTP'
                  type='text'
                  as={TextField}
                  label='OTP'
                  variant='outlined'
                  className='required'
                />
                <ErrorMessage name='OTP' component='div' className='required' />
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
              <div>
                <Field
                  name='confirmPassword'
                  type={showConfirmPassword ? "text" : "password"}
                  as={TextField}
                  label='Confirm Password'
                  variant='outlined'
                  className='required'
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          edge='end'
                        >
                          {showConfirmPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <ErrorMessage
                  name='confirmPassword'
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
                {loading ? <CircularProgress size={24} /> : "Submit"}
              </Button>
              <ToastContainer/>
            </Box>
            
          </Form>
        )}
        
      </Formik>
    </>
  );
};

