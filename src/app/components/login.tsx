"use client";

import { ErrorMessage, Field, Form, Formik } from "formik";
import Image from "next/image";
import * as Yup from "yup";
import { useRouter } from "next/navigation";



export default function Login() {
    const router = useRouter();
    const validationSchema = Yup.object().shape({
      email: Yup.string()
        .email("Invalid email address")
        .required("Please enter your email"),
      password: Yup.string()
        .min(6, "Password must be at least 8 characters")
        .required("Please enter password"),
    });
    
    const handleSubmit = (value: Object) => {
      console.log("=-==-=-=--=values",value)
      router.push('profile')
    };

  return (
    <main>
      <style>{`
               .auth-container {
                    background-color: #fff;
                    display: flex;
                    height: 100vh;
                    justify-content: center;
                    align-items: center;
                    flex-direction: column;
                    padding: 20px;
                }
               .logo-container {
                    margin-bottom: 20px;
                }
               .logo-container img {
                    width: 100px;
                    height: 100px;
                    object-fit: contain;
                }
               .form-container {
                    width: 300px;
                    padding: 20px;
                    border: 1px solid #ddd;
                    border-radius: 10px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
               .form-group {
                    margin-bottom: 20px;
                }
               .form-group label {
                    display: block;
                    margin-bottom: 10px;
                }
               .form-group input {
                    width: 100%;
                    padding: 10px;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                }
               .error-text {
                    color: red;
                    font-size: 12px;
                    margin-top: 5px;
                }
               .mb-20 {
                    margin-bottom: 20px;
                }
               .btn_login {
                    background-color: #4CAF50;
                    color: #fff;
                    padding: 10px 20px;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                }
               .btn_login:hover {
                    background-color: #3e8e41;
                }
            `}</style>
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
              <div className="mb-20">
                <button
                  id="loginBtn"
                  className="create-account cursor btn_login"
                  type="submit"
                >
                  Sign in
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </main>
  );
}