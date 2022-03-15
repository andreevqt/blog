import { Node } from 'slate';

export const serialize = (data) => {
  return data.reduce((acc, node) => {
    switch (node.type) {
      case 'paragraph': {
        acc += `<p>${Node.string(node)}</p>`;
        return acc;
      }
      case 'image': {
        acc += `<img src="${node.url}" />`;
        return acc;
      }
      default: {
        return acc;
      }
    }
  }, '');
};

export const deserialize = (str) => {
  const parser = new DOMParser()
  const doc = parser.parseFromString(str, 'text/html');
  const kids = Array.from(doc.body.children);
  return kids.reduce((acc, el) => {
    switch (el.tagName) {
      case 'P': {
        const text = { text: el.textContent };
        acc.push({ type: 'paragraph', children: [text] });
        return acc;
      }
      case 'IMG': {
        const text = { text: '' };
        acc.push({ type: 'image', url: el.src, children: [text] });
        return acc;
      }
      default: {
        return acc;
      }
    }
  }, []);
};
