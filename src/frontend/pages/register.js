import React from 'react';
import { useForm } from 'react-hook-form';
import { Redirect } from 'react-router-dom';
import Base from '../layouts/base';
import Text from '../components/text';
import { Col, Row, Container } from '../components/grid';
import Input from '../components/input';
import Button from '../components/button';
import { EMAIL_PATTERN } from '../constants';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../services/slices/user';

const Register = () => {
  const dispatch = useDispatch();
  const { isLoading, user } = useSelector((store) => store.user);
  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: 'onTouched'
  });

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <Base>
      <Row $center>
        <Col md={5}>
          <Text variant="h3" className="mb-20">Register</Text>
          <form onSubmit={handleSubmit((data) => dispatch(registerUser(data)))}>
            <Input
              type="text"
              placeholder="Name"
              className="mb-15"
              error={!!errors.name}
              errorText={errors.name && errors.name.message}
              {...register('name', { required: 'Required field' })}
            />
            <Input
              type="email"
              placeholder="Email"
              className="mb-15"
              error={!!errors.email}
              errorText={errors.email && errors.email.message}
              {...register('email', { required: 'Required field', pattern: { value: EMAIL_PATTERN, message: 'Should be valid email' } })}
            />
            <Input
              type="password"
              placeholder="Password"
              className="mb-20"
              error={!!errors.password}
              errorText={errors.password && errors.password.message}
              {...register('password', { required: 'Required field', minLength: { value: 6, message: 'Minimum length is 6 characters' } })}
            />
            <Button fullWidth size="big" type="submit" loading={isLoading}>Submit</Button>
          </form>
        </Col>
      </Row>
    </Base>
  );
};

export default Register;
