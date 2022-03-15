import React, { useEffect } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import Base from '../layouts/base';
import Text from '../components/text';
import { Col, Row } from '../components/grid';
import Input from '../components/input';
import Button from '../components/button';
import { useDispatch, useSelector } from 'react-redux';
import { updatePost, getPost, reset as resetPosts } from '../services/slices/posts';
import EditorField from '../components/editor-field';
import { serialize } from '../services/serializer';
import NoMatch from './no-match';

const schema = Yup.object({
  title: Yup.string().required()
});

const EditPost = () => {
  const dispatch = useDispatch();
  const { isLoading, submited, currentPost } = useSelector((store) => store.posts);
  const { user } = useSelector((store) => store.user);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getPost(id));
    return () => {
      dispatch(resetPosts());
    };
  }, []);

  useEffect(() => {
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
          {currentPost && (
            <Formik
              validationSchema={schema}
              initialValues={{
                title: currentPost.title,
                content: currentPost.content
              }}
              onSubmit={({ title, content }) => dispatch(updatePost({ id, title, content: serialize(content) }))}
            >
              {({ errors, touched, handleChange, handleBlur, handleSubmit, values }) => (
                <Form>
                  <Input
                    name="title"
                    placeholder="Title"
                    className="mb-15"
                    value={values.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.title && touched.title}
                    errorText={errors.title}
                  />
                  <EditorField
                    name="content"
                  />
                  <Button fullWidth size="big" type="submit" loading={isLoading}>Submit</Button>
                </Form>
              )}
            </Formik>
          )}

        </Col>
      </Row>
    </Base>
  );
};

export default EditPost;
