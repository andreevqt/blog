import React from 'react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { Redirect } from 'react-router-dom';
import Base from '../layouts/base';
import Text from '../components/text';
import { Col, Row, } from '../components/grid';
import Input from '../components/input';
import Button from '../components/button';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../services/slices/user';

const schema = Yup.object({
  name: Yup.string().required(),
  email: Yup.string().email().required(),
  password: Yup.string().min(6).required()
});

const Register = () => {
  const dispatch = useDispatch();
  const { isLoading, user } = useSelector((store) => store.user);

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <Base>
      <Row $center>
        <Col md={5}>
          <Text variant="h3" className="mb-20">Register</Text>
          <Formik
            validationSchema={schema}
            initialValues={{
              name: '',
              email: '',
              password: ''
            }}
            onSubmit={(data) => dispatch(registerUser(data))}
          >
            {({ errors, touched, handleChange, handleBlur, values }) => (
              <Form>
                <Input
                  name="name"
                  type="text"
                  placeholder="Name"
                  className="mb-15"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.name && touched.name}
                  errorText={errors.name}
                />
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

export default Register;
