import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import Button from "react-bootstrap/Button";
import { Col, Container, Form as FormRB, Row } from "react-bootstrap";
import "./styles.css";
import axios from "axios";
import { register as registration } from "../../redux/slices/auth";
import toast, { Toaster } from "react-hot-toast";
import { Formik, Field, Form, ErrorMessage } from "formik";

const GenericForm = () => {
  const initialValues = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    country: "",
    street: "",
    apt: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
  };
  const [checked, setChecked] = useState(false);
  const [countries, setCountries] = useState([]);
  const [successful, setSuccessful] = useState(false);
  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    street: Yup.string().required("Street Address is required"),
    country: Yup.string().required("Country is required"),
    city: Yup.string().required("City is required"),
    zip: Yup.number().typeError("Zip / Postal Code is required"),
    state: Yup.string().required("State / Province is required"),
    phone: Yup.number()
      .typeError("A valid phone number is requried")
      .min(10, "Must be 10 characters"),
    email: Yup.string()
      .required("Email is required.")
      .email("Email is invalid"),
    password: Yup.string()
      .test(
        "len",
        "The password must be between 6 and 40 characters.",
        (val) =>
          val && val.toString().length >= 6 && val.toString().length <= 40
      )
      .required("This field is required!"),
  });

  const handleRegister = (formValue) => {
    const {
      email,
      password,
      firstName,
      lastName,
      country,
      street,
      apt,
      city,
      state,
      zip,
      phone,
    } = formValue;
    setSuccessful(false);
    dispatch(
      registration({
        email,
        password,
        firstName,
        lastName,
        country,
        street,
        apt,
        city,
        state,
        zip,
        phone,
      })
    )
      .unwrap()
      .then(() => {
        setSuccessful(true);
      })
      .catch(() => {
        setSuccessful(false);
      });
  };

  useEffect(() => {
    const countryList = async () => {
      try {
        const res = await axios.get(
          `https://raw.githubusercontent.com/mledoze/countries/master/dist/countries.json`
        );
        setCountries(res.data);
      } catch (err) {}
    };
    countryList();
  }, []);

  // useEffect(() => {
  //   const userCountry = async () => {
  //     try {
  //       const res = await axios.get(`http://ipinfo.io`);
  //       setCurrentCountry(res.data);
  //     } catch (err) {}
  //   };
  //   userCountry();
  // }, []);

  return (
    <Container className="pt-5 register-form">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleRegister}
      >
        <Form>
          <Row className="text-center mb-5">
            <h6>CREATE AN ACCOUNT</h6>
          </Row>
          <Row>
            <Col>
              <p style={{ fontSize: 12 }}>YOUR LOGIN INFORMATION</p>
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
            </Col>
            <Col>
              <p style={{ fontSize: 12, textAlign: "right" }}>Required *</p>
              <FormRB.Group className="mb-3" controlId="formBasicPassword">
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
            </Col>
          </Row>
          <Row>
            <p style={{ fontSize: 12 }}>SHIPPING ADDRESS</p>
            <Col>
              <FormRB.Group className="mb-5" controlId="formBasicText">
                <Field
                  type="text"
                  name="firstName"
                  placeholder="*First Name"
                  className={`shadow-none
                    form-control`}
                />
                <ErrorMessage
                  name="firstName"
                  component="div"
                  className="alert alert-danger"
                />
              </FormRB.Group>
            </Col>
            <Col>
              <FormRB.Group className="mb-5" controlId="formBasicText">
                <Field
                  type="text"
                  name="lastName"
                  placeholder="*Last Name"
                  className={`shadow-none form-control`}
                />
                <ErrorMessage
                  name="lastName"
                  component="div"
                  className="alert alert-danger"
                />
              </FormRB.Group>
            </Col>
          </Row>
          <FormRB.Group className="mb-5" controlId="formBasicText">
            <Field
              as="select"
              name="country"
              className={`shadow-none form-control`}
            >
              <option>United States</option>
              {countries.map((country) => (
                <option>{country.name.common}</option>
              ))}
            </Field>
            <ErrorMessage
              name="country"
              component="div"
              className="alert alert-danger"
            />
          </FormRB.Group>
          <FormRB.Group className="mb-5" controlId="formBasicText">
            <Field
              type="text"
              name="street"
              placeholder="*Street Address (No P.O. Box)"
              className={`shadow-none form-control`}
            />
            <ErrorMessage
              name="street"
              component="div"
              className="alert alert-danger"
            />
          </FormRB.Group>
          <FormRB.Group className="mb-5" controlId="formBasicText">
            <Field
              type="text"
              name="apt"
              placeholder="Apt / Floor / Suite"
              className={`shadow-none form-control`}
            />
            <ErrorMessage
              name="apt"
              component="div"
              className="alert alert-danger"
            />
          </FormRB.Group>
          <Row>
            <Col>
              <FormRB.Group className="mb-5" controlId="formBasicText">
                <Field
                  type="text"
                  name="city"
                  placeholder="*City"
                  className={`shadow-none form-control`}
                />
                <ErrorMessage
                  name="city"
                  component="div"
                  className="alert alert-danger"
                />
              </FormRB.Group>
              <FormRB.Group className="mb-3" controlId="formBasicText">
                <Field
                  type="text"
                  name="zip"
                  placeholder="*Zip / Postal Code"
                  className={`shadow-none form-control`}
                />
                <ErrorMessage
                  name="zip"
                  component="div"
                  className="alert alert-danger"
                />
              </FormRB.Group>
            </Col>
            <Col>
              <FormRB.Group className="mb-5" controlId="formBasicText">
                <Field
                  type="text"
                  name="state"
                  placeholder="*State / Province"
                  className={`shadow-none form-control`}
                />
                <ErrorMessage
                  name="state"
                  component="div"
                  className="alert alert-danger"
                />
              </FormRB.Group>
              <FormRB.Group className="mb-3" controlId="formBasicText">
                <Field
                  type="text"
                  name="phone"
                  placeholder="*Phone"
                  className={`shadow-none form-control`}
                />
                <ErrorMessage
                  name="phone"
                  component="div"
                  className="alert alert-danger"
                />
              </FormRB.Group>
            </Col>
          </Row>
          <FormRB.Group
            className="mb-5 terms-check"
            controlId="formBasicCheckbox"
          >
            <FormRB.Check
              type="checkbox"
              onClick={() => setChecked(true)}
              label="I have read the privacy policy and consent to the processing of my personal data in order for my account to be created. I wish to receive promotions and coupons. I wish to receive Fashion & Accessories news."
            />
          </FormRB.Group>
          <Row className="m-auto">
            <Button
              variant="primary"
              type="submit"
              className="btn-register mb-5"
              disabled={checked ? false : true}
            >
              CREATE AN ACCOUNT
            </Button>
          </Row>
          {message && (
            <div className="form-group">
              <div>
                {successful ? toast.success(message) : toast.error(message)}
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
              </div>
            </div>
          )}
        </Form>
      </Formik>
      <p className="terms-check">
        By clicking on “Create an Account” you confirm you have read the Privacy
        Statement and consent to the processing of your personal data by AMFM
        for the management of your account, and AMFM client relationship in the
        conditions set forth in the Privacy Statement available in the footer
        and accessible here. By clicking on "Save" once your profile is
        completed and by validating the "Contact options", AMFM Couture and / or
        Parfums AMFM can contact you for communications purposes, including
        direct marketing, which may be tailored based on the personal data we
        know about you and your preferences. In order to provide you with the
        same personalized service worldwide, your personal data may be
        communicated to AMFM entities in France and abroad. As per applicable
        laws and regulations, you are entitled to access, correct and delete any
        data that may relate to you. You may also ask us not to send you
        personalized communications on our products and services. You may
        exercise these rights at any time directly in the menu “My Account”, or
        contacting us as set forth in our Privacy Statement.
      </p>
    </Container>
  );
};

export default GenericForm;
