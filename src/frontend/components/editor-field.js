import React from 'react';
import { useField } from 'formik';
import Editor from './editor';

const EditorField = (props) => {
  const [field, meta, helpers] = useField(props);
  return (
    <Editor
      name={field.name}
      value={field.value}
      onChange={(value) => helpers.setValue(value)}
      onBlur={() => helpers.setTouched()}
      error={meta.error}
      errorText={meta.error}
    />
  );
};

export default EditorField;
