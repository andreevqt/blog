import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Redirect } from 'react-router-dom';
import Base from '../layouts/base';
import Text from '../components/text';
import { Col, Row } from '../components/grid';
import Input from '../components/input';
import Button from '../components/button';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, reset } from '../services/slices/posts';

const CreatePost = () => {
  const dispatch = useDispatch();
  const { isLoading, submited } = useSelector((store) => store.posts);
  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: 'onTouched'
  });

  useEffect(() => {
    return () => {
      dispatch(reset());
    };
  }, []);

  if (submited) {
    return <Redirect to="/" />;
  }

  return (
    <Base>
      <Row $center>
        <Col md={5}>
          <Text variant="h3" className="mb-20">Create post</Text>
          <form onSubmit={handleSubmit((data) => dispatch(createPost(data)))}>
            <Input
              placeholder="Title"
              className="mb-15"
              error={!!errors.title}
              errorText={errors.title && errors.title.message}
              {...register('title', { required: 'Required field' })}
            />
            <Input
              placeholder="Content"
              className="mb-20"
              rows={5}
              error={!!errors.content}
              errorText={errors.content && errors.content.message}
              {...register('content', { required: 'Required field' })}
            />
            <Button fullWidth size="big" type="submit" loading={isLoading}>Submit</Button>
          </form>
        </Col>
      </Row>
    </Base>
  );
};

export default CreatePost;
