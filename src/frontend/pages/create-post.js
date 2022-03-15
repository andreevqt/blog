import React, { useEffect } from 'react';
import * as Yup from 'yup';
import { Redirect } from 'react-router-dom';
import { Form, Formik } from 'formik';
import Base from '../layouts/base';
import Text from '../components/text';
import { Col, Row } from '../components/grid';
import Input from '../components/input';
import Button from '../components/button';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, reset } from '../services/slices/posts';
import EditorField from '../components/editor-field';
import { serialize } from '../services/serializer';

const schema = Yup.object({
  title: Yup.string().required()
});

const CreatePost = () => {
  const dispatch = useDispatch();
  const { isLoading, submited } = useSelector((store) => store.posts);

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
          <Formik
            validationSchema={schema}
            initialValues={{
              title: '',
              content: null
            }}
            onSubmit={({ title, content }) => dispatch(createPost({ title, content: serialize(content) }))}
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
        </Col>
      </Row>
    </Base>
  );
};

export default CreatePost;
