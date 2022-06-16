import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Row, Button, Form as FormRB } from "react-bootstrap";
import "./styles.css";
import { login } from "../../redux/slices/auth";
import toast, { Toaster } from "react-hot-toast";
import { clearMessage } from "../../redux/slices/message";

const Login = (props) => {
  const [loading, setLoading] = useState(false);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required.")
      .email("Email is invalid"),
    password: Yup.string()
      .required("Password is required.")
      .min(6, "Password must be at least 6 characters.")
      .max(20, "Password must not exceed 20 characters."),
  });

  const handleLogin = (formValue) => {
    const { email, password } = formValue;

    setLoading(true);
    dispatch(login({ email, password }))
      .unwrap()
      .then(() => {
        props.history.push("/profile");
        window.location.reload();
      })
      .catch(() => {
        setLoading(false);
      });
  };

  // if (isLoggedIn) {
  //   return navigate("/profile");
  // }

  //TODO : SETUP TOAST
  const notify = () => {
    return message === "200"
      ? toast.success("Account verified!")
      : toast.error("Something went wrong. Please try again.");
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleLogin}
    >
      <Form>
        <Row className="text-center mb-5">
          <h6>LOGIN</h6>
          <p style={{ fontSize: 12 }}>To access your account</p>
        </Row>
        <Row>
          <FormRB.Group className="mb-5" controlId="formBasicEmail">
            <Field
              type="email"
              name="email"
              placeholder="*Email address"
              className={`shadow-none form-control`}
            />
            <ErrorMessage
              name="email"
              component="div"
              className="alert alert-danger"
            />
          </FormRB.Group>
        </Row>
        <Row>
          <FormRB.Group className="mb-5" controlId="formBasicPassword">
            <Field
              type="password"
              name="password"
              placeholder="*Password"
              className={`shadow-none form-control`}
            />
            <ErrorMessage
              name="password"
              component="div"
              className="alert alert-danger"
            />
          </FormRB.Group>
        </Row>
        <Row className="m-auto">
          <Button
            variant="primary"
            type="submit"
            className="btn-login mb-5"
            // disabled={loading}
          >
            {loading && (
              <span className="spinner-border spinner-border-sm"></span>
            )}
            SIGN IN
          </Button>
        </Row>
        <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={8}
          containerClassName=""
          containerStyle={{}}
          toastOptions={{
            // Define default options
            className: "",
            duration: 5000,
            style: {
              background: "#363636",
              color: "#fff",
            },
          }}
        />
      </Form>
    </Formik>
  );
};

export default Login;
