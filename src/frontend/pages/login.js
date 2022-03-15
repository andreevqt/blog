import React from 'react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { Redirect, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Base from '../layouts/base';
import Text from '../components/text';
import { Col, Row } from '../components/grid';
import Input from '../components/input';
import Button from '../components/button';
import { loginUser } from '../services/slices/user';

const schema = Yup.object({
  email: Yup.string().email().required(),
  password: Yup.string().min(6).required()
});

const Login = () => {
  const dispatch = useDispatch();
  const { isLoading, user } = useSelector((store) => store.user);
  const location = useLocation();

  if (user) {
    return (
      <Redirect
        to={{
          pathname: location.state && location.state.from && location.state.from.pathname || '/',
          ...(location.state && { state: location.state.from.state })
        }}
      />
    );
  }

  return (
    <Base>
      <Row $center>
        <Col md={5}>
          <Text variant="h3" className="mb-20">Login</Text>
          <Formik
            validationSchema={schema}
            initialValues={{
              email: '',
              password: ''
            }}
            onSubmit={(data) => dispatch(loginUser(data))}
          >
            {({ errors, touched, handleChange, handleBlur, values }) => (
              <Form>
                <Input
                  name="email"
                  type="email"
                  placeholder="Email"
                  className="mb-15"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.email && touched.email}
                  errorText={errors.email}
                />
                <Input
                  name="password"
                  type="password"
                  placeholder="Password"
                  className="mb-15"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.password && touched.password}
                  errorText={errors.password}
                />
                <Button
                  fullWidth
                  size="big"
                  type="submit"
                  loading={isLoading}
                >
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </Base>
  );
};

export default Login;
