import React, { useState, useMemo, useCallback } from 'react';
import imageExtensions from 'image-extensions';
import { createEditor, Transforms, Editor as BaseEditor, Node, Path, Range } from 'slate';
import styled from 'styled-components';
import {
  Slate,
  Editable,
  withReact,
  useSlateStatic,
  useSelected,
  useFocused,
  ReactEditor
} from 'slate-react';
import { withHistory } from 'slate-history';
import isUrl from 'is-url';
import Picture from '../icons/picture';

const withCorrectVoidBehavior = (editor) => {
  const { deleteBackward, insertBreak } = editor;

  // if current selection is void node, insert a default node below
  editor.insertBreak = () => {
    if (!editor.selection || !Range.isCollapsed(editor.selection)) {
      return insertBreak();
    }

    const selectedNodePath = Path.parent(editor.selection.anchor.path)
    const selectedNode = Node.get(editor, selectedNodePath)
    if (BaseEditor.isVoid(editor, selectedNode)) {
      BaseEditor.insertNode(editor, {
        type: 'paragraph',
        children: [{ text: '' }],
      });
      return;
    };

    insertBreak();
  };

  // if prev node is a void node, remove the current node and select the void node
  editor.deleteBackward = unit => {
    if (
      !editor.selection ||
      !Range.isCollapsed(editor.selection) ||
      editor.selection.anchor.offset !== 0
    ) {
      return deleteBackward(unit);
    }

    const parentPath = Path.parent(editor.selection.anchor.path);
    const parentNode = Node.get(editor, parentPath);
    const parentIsEmpty = Node.string(parentNode).length === 0;

    if (parentIsEmpty && Path.hasPrevious(parentPath)) {
      const prevNodePath = Path.previous(parentPath);
      const prevNode = Node.get(editor, prevNodePath);
      if (Editor.isVoid(editor, prevNode)) {
        return Transforms.removeNodes(editor);
      }
    }

    deleteBackward(unit);
  }

  return editor;
};

const isImageUrl = (url) => {
  if (!url) {
    return false;
  };

  if (!isUrl(url)) {
    return false;
  };

  const ext = new URL(url).pathname.split('.').pop();
  return imageExtensions.includes(ext);
};

const PictureBtn = styled(({ className }) => {
  const editor = useSlateStatic();
  const onClick = (e) => {
    e.preventDefault();
    const url = window.prompt('Enter the URL of the image:');
    if (url && !isImageUrl(url)) {
      alert('URL is not an image');
      return;
    }
    if (url) {
      insertImage(editor, url);
    }
  };

  return (
    <div
      className={className}
      onClick={onClick}
    >
      <Picture width="20" height="20" />
    </div>
  );
})`
  cursor: pointer;
  font-size: 0;
`;

const Toolbar = styled.div`
  ${({ theme }) => `
    padding: 15px 20px;
    border-bottom: 1px solid ${theme.inputBorderColor};
    background-color: ${theme.colors.white.base};
  `}
`;

const EditorWrapper = styled.div`
  ${({ theme }) => `
    border-radius: 3px;
    border: 1px solid ${theme.inputBorderColor};
    margin-bottom: 15px;
    overflow: hidden;
  `}
`;

const StlyedEditable = styled(Editable)`
  ${({ theme }) => `
    background-color: ${theme.inputBgColor};
    padding: 20px;
    min-height: 150px !important;
    p,
    img {
      margin-bottom: 15px;
    }
  `}
`;

const StyledImage = styled.img`
  ${({ selected, focused, theme }) => `
    width: 100%;
    height: auto;
    box-shadow: ${selected && focused ? `0 0 0 3px ${theme.colors.primary.base}` : 'none'};
    margin-bottom: 15px;
  `}
`;

const Image = ({ attributes, children, element }) => {
  const editor = useSlateStatic()
  const path = ReactEditor.findPath(editor, element);

  const selected = useSelected();
  const focused = useFocused();
  return (
    <div {...attributes}>
      {children}
      <div
        contentEditable={false}
        style={{ position: 'relative' }}
      >
        <StyledImage
          focused={focused}
          selected={selected}
          src={element.url}
        />
      </div>
    </div>
  );
};

const Element = (props) => {
  const { attributes, children, element } = props;
  switch (element.type) {
    case 'image':
      return <Image {...props} />;
    default:
      return <p {...attributes}>{children}</p>;
  }
};

const insertImage = (editor, url) => {
  const text = { text: '' };
  const image = { type: 'image', url, children: [text] };
  const paragraph = { type: 'paragraph', children: [text] };
  Transforms.insertNodes(editor, [image, paragraph]);
};

const withImages = (editor) => {
  const { insertData, isVoid } = editor;

  editor.isVoid = (element) => {
    return element.type === 'image' ? true : isVoid(element);
  };

  editor.insertData = (data) => {
    const text = data.getData('text/plain');
    const { files } = data;

    if (files && files.length > 0) {
      for (const file of files) {
        const reader = new FileReader();
        const [mime] = file.type.split('/');

        if (mime === 'image') {
          reader.addEventListener('load', () => {
            const url = reader.result;
            insertImage(editor, url);
          })

          reader.readAsDataURL(file);
        }
      }
    } else if (isImageUrl(text)) {
      insertImage(editor, text);
    } else {
      insertData(data);
    }
  }

  return editor;
};

const initialValue = [{
  type: 'paragraph',
  children: [{ text: '' }],
}];

const Editor = ({
  name,
  value,
  onChange,
  onBlur,
  error
}) => {
  const editor = useMemo(
    () => withCorrectVoidBehavior(withImages(withHistory(withReact(createEditor())))),
    []
  );
  const renderElement = useCallback((props) => <Element {...props} />, []);
  return (
    <Slate
      editor={editor}
      value={value || initialValue}
      onChange={onChange}

    >
      <EditorWrapper>
        <Toolbar>
          <PictureBtn onClick={() => console.log('clicked')} />
        </Toolbar>
        <StlyedEditable
          placeholder="Content"
          renderElement={renderElement}
          name={name}
          onBlur={onBlur}
        />
      </EditorWrapper>
      {error}
    </Slate >
  );
};

export default Editor;
