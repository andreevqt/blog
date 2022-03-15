import React from 'react';
import { Controller } from 'react-hook-form';
import { useField } from 'formik';
import Editor from './editor';

const EditorField = (props) => {
  const [field, meta, helpers] = useField(props);
  console.log(field.value);
  return (
    <Editor
      name={field.name}
      value={field.value}
      onChange={field.onChange}
      onBlur={field.onBlur}
    />
  );
};

export default EditorField;
