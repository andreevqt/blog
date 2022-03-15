import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Redirect } from 'react-router-dom';
import Base from '../layouts/base';
import Text from '../components/text';
import { Col, Row } from '../components/grid';
import Input from '../components/input';
import Button from '../components/button';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, reset } from '../services/slices/posts';
import EditorField from '../components/editor-field';
import { serialize, deserialize } from '../services/serializer';

const CreatePost = () => {
  const dispatch = useDispatch();
  const { isLoading, submited } = useSelector((store) => store.posts);
  const { control, register, handleSubmit, formState: { errors } } = useForm({
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
        <Col md={6}>
          <Text variant="h3" className="mb-20">Create post</Text>
          <form onSubmit={handleSubmit(({ title, content }) => {
            dispatch(createPost({ title, content: serialize(content) }));
          })}>
            <Input
              placeholder="Title"
              className="mb-15"
              error={!!errors.title}
              errorText={errors.title && errors.title.message}
              {...register('title', { required: 'Required field' })}
            />
            <EditorField
              name="content"
              control={control}
            />
            <Button fullWidth size="big" type="submit" loading={isLoading}>Submit</Button>
          </form>
        </Col>
      </Row>
    </Base>
  );
};

export default CreatePost;
