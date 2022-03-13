import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Redirect, useParams } from 'react-router-dom';
import Base from '../layouts/base';
import Text from '../components/text';
import { Col, Row } from '../components/grid';
import Input from '../components/input';
import Button from '../components/button';
import { useDispatch, useSelector } from 'react-redux';
import { updatePost, getPost, reset as resetPosts } from '../services/slices/posts';
import NoMatch from './no-match';

const EditPost = () => {
  const dispatch = useDispatch();
  const { isLoading, submited, currentPost } = useSelector((store) => store.posts);
  const { user } = useSelector((store) => store.user);
  const { register, reset, handleSubmit, formState: { errors } } = useForm({
    mode: 'onTouched'
  });

  const { id } = useParams();

  useEffect(() => {
    dispatch(getPost(id));
    return () => {
      dispatch(resetPosts());
    };
  }, []);

  useEffect(() => {
    reset(currentPost);
  }, [currentPost])

  if (submited) {
    return <Redirect to="/" />;
  };


  if (currentPost && user.id !== currentPost.author.id) {
    return <Redirect to="/" />;
  }

  if (!isLoading && !currentPost) {
    return <NoMatch />;
  }

  return (
    <Base>
      <Row $center>
        <Col md={5}>
          <Text variant="h3" className="mb-20">Edit post</Text>
          <form onSubmit={handleSubmit(({ title, content }) => dispatch(updatePost({ id, title, content })))}>
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

export default EditPost;
