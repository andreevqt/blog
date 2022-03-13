import React from 'react';
import { useForm } from 'react-hook-form';
import { Redirect, useLocation } from 'react-router-dom';
import Base from '../layouts/base';
import Text from '../components/text';
import { Col, Row, Container } from '../components/grid';
import Input from '../components/input';
import Button from '../components/button';
import { EMAIL_PATTERN } from '../constants';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../services/slices/user';

const Login = () => {
  const dispatch = useDispatch();
  const { isLoading, user } = useSelector((store) => store.user);
  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: 'onTouched'
  });

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
          <form onSubmit={handleSubmit((data) => dispatch(loginUser(data)))}>
            <Input
              type="email"
              placeholder="Email"
              className="mb-15"
              error={!!errors.email}
              errorText={errors.email && errors.email.message}
              {...register('email', { required: 'Required field', pattern: { value: EMAIL_PATTERN, message: 'Should be valid email' } })}
            />
            <Input
              name="password"
              placeholder="Password"
              className="mb-20"
              error={!!errors.password}
              errorText={errors.password && errors.password.message}
              {...register('password', { required: 'Required field' })}
            />
            <Button
              fullWidth
              size="big"
              type="submit"
              loading={isLoading}
            >
              Submit
            </Button>
          </form>
        </Col>
      </Row>
    </Base>
  );
};

export default Login;
