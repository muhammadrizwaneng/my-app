"use client";

import { ErrorMessage, Field, Form, Formik } from "formik";
import Image from "next/image";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { UseDispatch,useDispatch,useSelector } from "react-redux";
import { login, signup } from "@/app/store/authSlice";
// import { loginStart } from "../store/authSlice";


export default function Signup() {
  const router = useRouter();
  const dispatch = useDispatch()
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Please enter your email"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Please enter password"),
    first_name: Yup.string()
    .required("Please enter your first name"),
    last_name: Yup.string()
    .required("Please enter your last name"),
    number: Yup.number()
    .required("Please enter your number")
  });
  
  const handleSubmit = (value: Object) => {
    console.log("=-==-=-=--=values",value)
    
    dispatch(signup(value))
    .unwrap()
    .then(async(response:any)=>{
      console.log("response",response)
      if(response?.data?.code == 200){
        const currentDate = new Date();
          const expirationDate = new Date(currentDate);
          expirationDate.setMonth(currentDate.getMonth() + 3);
          const expirationDateString = expirationDate.toUTCString();
          document.cookie = `tokenforpython=${response?.data?.token}; expires=${expirationDateString}; path=/`
          router.push('/profile')
      }
    })
  };

  const handleSignUpClick = () => {
    router.push("/login"); 
  };

return (
  <main>
    <div className="auth-container">
      <div className="logo-container">
        <Image
          src="https://d111rsbtkze0ke.cloudfront.net/img/logo.svg"
          width={100}
          height={100}
          alt="Seebiz logo"
        />
      </div>
      <div className="form-container">
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
          <div className="form-group">
              <label>First Name</label>
              <Field
                type="text"
                id="first_name"
                name="first_name"
                placeholder="enter your first Name"
              />
              <ErrorMessage
                name="first_name"
                component={"div"}
                className="error-text"
              />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <Field
                type="text"
                id="last_name"
                name="last_name"
                placeholder="enter your Last Name"
              />
              <ErrorMessage
                name="last_name"
                component={"div"}
                className="error-text"
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <Field
                type="text"
                id="email"
                name="email"
                placeholder="enter your email"
              />
              <ErrorMessage
                name="email"
                component={"div"}
                className="error-text"
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <Field
                type="password"
                id="password"
                name="password"
                placeholder="enter your password"
              />
              <ErrorMessage
                name="password"
                component={"div"}
                className="error-text"
              />
            </div>
            <div className="form-group">
              <label>Number</label>
              <Field
                type="text"
                id="number"
                name="number"
                placeholder="enter your Number"
              />
              <ErrorMessage
                name="number"
                component={"div"}
                className="error-text"
              />
            </div>
            <div className="mb-20">
              <button
                id="loginBtn"
                className="create-account cursor btn_login"
                type="submit"
              >
                Sign up
              </button>
            </div>
            <div className="mb-20">
                <button
                  id="signUpBtn"
                  className="create-account cursor btn_signup"
                  onClick={handleSignUpClick}
                >
                  Login
                </button>
              </div>
          </Form>
        </Formik>
      </div>
    </div>
  </main>
);
  }
  